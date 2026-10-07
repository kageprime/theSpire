/* ---- M2: light map, post pass, depth grades, dressing, depth wipe, camera ---- */
const mkc=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
let ZM=1,ZT=1,ZH=0,LA=[0,0],W={t:-1},seenD={},hbT=0,hbAt=-9,lstep=-1,FXf=0,FXc=0,FXcol=BONE,LTms=0,LTn=0,lastLP=performance.now(),pendOpen=0,RT={},DEC=[],PROPS=[],curDepth=0;
/* depth grades: multiply tint, desaturation, ambient darkness, mist colour (spec section 3) */
const GR=[{mul:[236,228,214],sat:.32,amb:[14,12,16,.64],mist:[150,146,136]},
 {mul:[255,196,172],sat:0,amb:[36,6,6,.66],mist:[170,70,50]},
 {mul:[170,238,216],sat:0,amb:[3,22,20,.70],mist:[70,150,130]},
 {mul:[162,192,255],sat:0,amb:[6,10,32,.70],mist:[90,110,170]}];
const GC=JSON.parse(JSON.stringify(GR[0]));
const depthAt=(x,y)=>y>=38?3:y>=24?2:x>=26&&y<24?1:0;
/* zoom-aware world to screen (matches the transform applied to the world layer) */
const LP=(wx,wy,z)=>{const[sx,sy]=P(wx,wy);return[256+(sx-256)*ZM,165+(sy-(z||0)-165)*ZM]};
/* ---- sprites ---- */
function radial(sz,stops){const c=mkc(sz,sz),x=c.getContext('2d'),r=x.createRadialGradient(sz/2,sz/2,0,sz/2,sz/2,sz/2);stops.forEach(s=>r.addColorStop(s[0],s[1]));x.fillStyle=r;x.fillRect(0,0,sz,sz);return c}
const LS=radial(128,[[0,'rgba(255,255,255,1)'],[.3,'rgba(255,255,255,.8)'],[.65,'rgba(255,255,255,.26)'],[1,'rgba(255,255,255,0)']]);
const glow=(r,g_,b)=>radial(128,[[0,`rgba(${r},${g_},${b},.55)`],[.35,`rgba(${r},${g_},${b},.2)`],[1,`rgba(${r},${g_},${b},0)`]]);
const GL={warm:glow(255,150,60),pale:glow(190,205,230),brand:glow(230,140,60),red:glow(200,40,30)};
const LM=mkc(256,160),lm=LM.getContext('2d');
const VG=(()=>{const c=mkc(512,320),x=c.getContext('2d'),r=x.createRadialGradient(256,150,90,256,150,320);r.addColorStop(0,'rgba(6,5,8,0)');r.addColorStop(1,'rgba(6,5,8,.7)');x.fillStyle=r;x.fillRect(0,0,512,320);return c})();
const RE=(()=>{const c=mkc(512,320),x=c.getContext('2d'),r=x.createRadialGradient(256,160,120,256,160,300);r.addColorStop(0,'rgba(160,20,20,0)');r.addColorStop(1,'rgba(160,20,20,.9)');x.fillStyle=r;x.fillRect(0,0,512,320);return c})();
const MS=radial(128,[[0,'rgba(255,255,255,.5)'],[1,'rgba(255,255,255,0)']]),MSt=mkc(128,128),mst=MSt.getContext('2d');
const BL=mkc(128,80),bl=BL.getContext('2d');
const CT1=mkc(512,320),CT2=mkc(512,320),ct1=CT1.getContext('2d'),ct2=CT2.getContext('2d');
const GN=[0,1,2,3].map(()=>{const c=mkc(128,128),x=c.getContext('2d'),d=x.createImageData(128,128);for(let i=0;i<d.data.length;i+=4){const v=Math.random()<.5?255:0;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=Math.random()*34|0}x.putImageData(d,0,0);return c});
const MOTES=Array.from({length:34},()=>({x:Math.random()*512,y:Math.random()*320,vx:(Math.random()-.5)*5,vy:-2-Math.random()*5,ph:Math.random()*6.28}));
/* decal sprites (flat, drawn in screen space; no art files needed) */
const DS=(()=>{const S={},bone='#cfc6ae',dim='#8f8874',ink='#0e0d10';
 const ln=(x,a,b,c,d,col,w)=>{x.fillStyle=col;const n=Math.max(Math.abs(c-a),Math.abs(d-b))||1;for(let i=0;i<=n;i++)x.fillRect(Math.round(a+(c-a)*i/n),Math.round(b+(d-b)*i/n),w||1,w||1)};
 let c=mkc(26,14),x=c.getContext('2d');ln(x,3,3,22,10,bone,2);ln(x,4,10,20,3,dim,2);[[2,2],[2,4],[21,9],[21,11],[3,9],[3,11],[19,2],[19,4]].forEach(p=>{x.fillStyle=bone;x.fillRect(p[0],p[1],2,2)});S.b0=c;
 c=mkc(14,12);x=c.getContext('2d');x.fillStyle=bone;x.fillRect(3,1,8,2);x.fillRect(2,3,10,4);x.fillRect(3,7,8,2);x.fillStyle=dim;x.fillRect(2,6,10,1);x.fillStyle=ink;x.fillRect(4,4,2,2);x.fillRect(8,4,2,2);x.fillRect(6,6,2,1);x.fillStyle=bone;x.fillRect(4,9,1,2);x.fillRect(6,9,2,2);x.fillRect(9,9,1,2);S.b1=c;
 c=mkc(24,14);x=c.getContext('2d');for(let i=0;i<4;i++){ln(x,2+i*5,2+i%2,6+i*5,11,i%2?dim:bone,1)}ln(x,1,12,22,12,dim,2);S.b2=c;
 c=mkc(72,38);x=c.getContext('2d');x.strokeStyle='rgba(216,208,188,.62)';x.lineWidth=1;[[33,16],[24,11]].forEach((r,k)=>{x.setLineDash(k?[3,3]:[]);x.beginPath();x.ellipse(36,19,r[0],r[1],0,0,6.283);x.stroke()});x.setLineDash([]);
 for(let a=0;a<8;a++){const q=a/8*6.283;x.beginPath();x.moveTo(36+Math.cos(q)*24,19+Math.sin(q)*11);x.lineTo(36+Math.cos(q)*33,19+Math.sin(q)*16);x.stroke()}
 x.beginPath();x.moveTo(36,11);x.lineTo(42,19);x.lineTo(36,27);x.lineTo(30,19);x.closePath();x.stroke();x.fillStyle='rgba(216,208,188,.62)';x.fillRect(35,15,2,5);x.fillRect(35,21,2,2);S.ch=c;
 [0,1].forEach(v=>{c=mkc(14,10);x=c.getContext('2d');x.save();x.translate(7,5);x.rotate(v?.5:-.35);x.fillStyle='#c9c0a6';x.fillRect(-5,-3,10,6);x.clearRect(-5,-3,2,1);x.clearRect(3,2,2,1);x.fillStyle='#5a5446';[-2,0,2].forEach(y=>x.fillRect(-3,y,6-(y==2?2:0),1));x.restore();S['pg'+v]=c});
 c=mkc(7,9);x=c.getContext('2d');x.fillStyle='#d8d0bc';x.fillRect(2,3,3,6);x.fillStyle='#9a9484';x.fillRect(4,3,1,6);S.cd=c;return S})();
function mkCrack(i,j,x,y){const pts=[[0,0]];let px=0,py=0,a=(hsh(i,j)%628)/100;for(let k=0;k<5;k++){a+=((hsh(i+k,j*3)%100)/100-.5)*1.3;px+=Math.cos(a)*7;py+=Math.sin(a)*3.6;pts.push([px,py])}return{k:'cr',x,y,pts}}
function buildDressing(){DEC=[];PROPS=[];const avoid=[[16.5,15.5,2.7],[4.5,4.9,1.6],[16.5,21.6,1.9],[16.5,20.5,1.4],[26.5,5.5,1.3]].concat(CS.map(c=>[c.x,c.y,1.1]),BRZ.map(b=>[b[0],b[1],.9]));
 for(let j=0;j<MH;j++)for(let i=0;i<MW;i++){if(M[j][i]!=0)continue;const h=hsh(i*5+1,j*3+7),r=h%1000,x=i+.15+((h>>3)%70)/100,y=j+.15+((h>>10)%70)/100;
  if(avoid.some(a=>Math.hypot(x-a[0],y-a[1])<a[2]))continue;const d=depthAt(x,y);
  if(r<36)DEC.push({k:'b'+(r%3),x,y});else if(r<52)DEC.push({k:'pg'+(r%2),x,y});else if(r<82+(d==1?40:0))DEC.push(mkCrack(i,j,x,y));
  else if(r<90&&d!=2)DEC.push({k:'ch',x:i+.5,y:j+.5});else if(r<97)PROPS.push({k:'cd',x,y,d:x+y,n:1+r%3})}
 for(let j=1;j<MH-1;j++)for(let i=1;i<MW-1;i++){if(M[j][i]!=0||hsh(i*11+5,j*7+2)%100>=11)continue;if(BRZ.some(b=>Math.hypot(b[0]-i-.5,b[1]-j-.5)<1.6))continue;
  if(M[j-1][i]==1&&M[j][i-1]==0&&M[j][i+1]==0&&M[j-1][i-1]==1&&M[j-1][i+1]==1)PROPS.push({k:'bn',x:i+.5,y:j,f:'x',d:i+j+.3,w:i*3+j});
  else if(M[j][i-1]==1&&M[j-1][i]==0&&M[j+1][i]==0&&M[j-1][i-1]==1&&M[j+1][i-1]==1)PROPS.push({k:'bn',x:i,y:j+.5,f:'y',d:i+j+.3,w:i*3+j})}}
function drawDecals(){const v=(d)=>Math.abs(d.x-cx)<12&&Math.abs(d.y-cy)<12;
 DEC.forEach(d=>{if(!v(d))return;const[sx,sy]=P(d.x,d.y);if(d.k=='cr'){g.strokeStyle='rgba(6,5,8,.85)';g.lineWidth=1.5;g.beginPath();d.pts.forEach((p,i)=>i?g.lineTo(Math.round(sx+p[0]),Math.round(sy+p[1])):g.moveTo(Math.round(sx),Math.round(sy)));g.stroke();g.lineWidth=1;return}
  const s=DS[d.k];g.globalAlpha=d.k=='ch'?.9:.95;g.drawImage(s,Math.round(sx-s.width/2),Math.round(sy-s.height/2));g.globalAlpha=1})}
function drawProp(p){const[sx,sy]=P(p.x,p.y);
 if(p.k=='cd'){for(let q=0;q<p.n;q++)g.drawImage(DS.cd,Math.round(sx-9+q*6),Math.round(sy-7+(q%2)*3));return}
 const sw=Math.sin(t*1.3+p.w)*1.6,dx=p.f=='x'?5.4:-5.4,dy=p.f=='x'?2.7:2.7,b=GR[depthAt(p.x,p.y)].mist;
 const A=[sx-dx,sy-dy-40],B=[sx+dx,sy+dy-40],Cc=[sx+dx+sw*.4,sy+dy-9+sw],Dd=[sx+sw*.4,sy-16+sw],E_=[sx-dx+sw*.4,sy-dy-9+sw];
 g.fillStyle='rgb('+Math.round(b[0]*.38+20)+','+Math.round(b[1]*.3+14)+','+Math.round(b[2]*.3+14)+')';g.beginPath();g.moveTo(...A);g.lineTo(...B);g.lineTo(...Cc);g.lineTo(...Dd);g.lineTo(...E_);g.closePath();g.fill();
 g.fillStyle='#2a2326';g.fillRect(Math.round(A[0]-1),Math.round(A[1]-2),Math.round(B[0]-A[0]+2),2);g.strokeStyle='rgba(216,208,188,.7)';g.beginPath();const mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2+10;g.moveTo(mx,my-5);g.lineTo(mx+3,my);g.lineTo(mx,my+5);g.lineTo(mx-3,my);g.closePath();g.stroke()}
/* ---- lights ---- */
const fk=k=>SV.plain?1:.9+.07*Math.sin(t*11+k*2.3)+.04*Math.sin(t*23+k*1.7);
function gatherLights(){const L=[],add=(x,y,z,r,i,c)=>{const[sx,sy]=LP(x,y,z);if(sx<-r||sx>512+r||sy<-r||sy>340+r)return;L.push({sx,sy,r:r*ZM,i,c})};
 BRZ.forEach((b,k)=>{if(Math.abs(b[0]-cx)<13&&Math.abs(b[1]-cy)<13)add(b[0],b[1],26,100,fk(k),'warm')});
 add(16.5,15.5,4,76+(SV.plain?0:Math.sin(t*1.7)*5),.95,'pale');
 if(scene!='title'||1)add(R.x,R.y,24,66+R.ash*9,fk(99),SV.brand?'brand':'warm');
 H.forEach(h=>{if(h.k=='bra'&&h.st!='kneel')add(h.x,h.y,30,50+h.str*8,.9,'warm');else if(h.st=='wind'||h.st=='atk')add(h.x,h.y,26,44,.7,'pale')});
 AL.forEach((a,k)=>add(a.x,a.y,28,a.k=='bra'?58:42,fk(k+40),'warm'));
 PR.forEach(p=>add(p.x,p.y,16,40,1,'warm'));SPK.forEach(s=>add(s.x,s.y,s.z,64,1-s.t/.3,'pale'));
 PROPS.forEach(p=>{if(p.k=='cd'&&Math.abs(p.x-cx)<12&&Math.abs(p.y-cy)<12)add(p.x,p.y,8,34,fk(p.n*7+p.x),'warm')});
 CS.forEach(c=>{if(!c.hid&&!c.o)add(c.x,c.y,10,34,.8,'warm')});return L}
function lightPass(ox,oy){const t0=performance.now(),now=t0,dt=Math.min(.1,(now-lastLP)/1000);lastLP=now;
 const dep=scene=='title'||scene=='intro'?0:depthAt(R.x,R.y),T=GR[dep],k=Math.min(1,dt*1.4);curDepth=dep;
 for(let i=0;i<3;i++)GC.mul[i]+=(T.mul[i]-GC.mul[i])*k,GC.amb[i]+=(T.amb[i]-GC.amb[i])*k,GC.mist[i]+=(T.mist[i]-GC.mist[i])*k;GC.sat+=(T.sat-GC.sat)*k;GC.amb[3]+=(T.amb[3]-GC.amb[3])*k;
 const L=gatherLights(),a=GC.amb;lm.globalCompositeOperation='source-over';lm.globalAlpha=1;lm.fillStyle=`rgba(${a[0]|0},${a[1]|0},${a[2]|0},${a[3]})`;lm.clearRect(0,0,256,160);lm.fillRect(0,0,256,160);
 lm.globalCompositeOperation='destination-out';L.forEach(l=>{const rx=l.r/2,ry=rx*.64;lm.globalAlpha=Math.max(0,Math.min(1,l.i));lm.drawImage(LS,(l.sx+ox)/2-rx,(l.sy+oy)/2-ry,rx*2,ry*2)});lm.globalAlpha=1;voidMask(ox,oy);lm.globalCompositeOperation='destination-out';lm.imageSmoothingEnabled=true;lm.drawImage(VM,0,0,256,160);lm.globalCompositeOperation='source-over';
 g.save();g.setTransform(SC,0,0,SC,0,0);g.imageSmoothingEnabled=true;g.drawImage(LM,0,0,512,320);g.drawImage(VG,0,0);g.imageSmoothingEnabled=false;
 g.globalCompositeOperation='multiply';g.fillStyle=`rgb(${GC.mul[0]|0},${GC.mul[1]|0},${GC.mul[2]|0})`;g.fillRect(0,0,512,320);
 if(GC.sat>.01){g.globalCompositeOperation='saturation';g.fillStyle=`rgba(128,128,128,${GC.sat})`;g.fillRect(0,0,512,320)}
 g.globalCompositeOperation='lighter';g.imageSmoothingEnabled=true;L.forEach(l=>{const s=GL[l.c]||GL.warm,w=l.r*1.9;g.globalAlpha=Math.max(0,Math.min(1,l.i))*.8;g.drawImage(s,l.sx+ox-w/2,l.sy+oy-w*.32,w,w*.64)});
 /* emissive: ember in the cracks of Depth II, candle flames */
 DEC.forEach(d=>{if(d.k!='cr'||depthAt(d.x,d.y)!=1||Math.abs(d.x-cx)>12||Math.abs(d.y-cy)>12)return;const[sx,sy]=LP(d.x,d.y,0);g.globalAlpha=.55+(SV.plain?0:.25*Math.sin(t*3+d.x*2));g.strokeStyle='#e8842a';g.lineWidth=1;g.beginPath();d.pts.forEach((p,i)=>i?g.lineTo(sx+ox+p[0]*ZM,sy+oy+p[1]*ZM):g.moveTo(sx+ox,sy+oy));g.stroke()});
 g.imageSmoothingEnabled=false;PROPS.forEach(p=>{if(p.k!='cd'||Math.abs(p.x-cx)>12||Math.abs(p.y-cy)>12)return;const[sx,sy]=LP(p.x,p.y,0);for(let q=0;q<p.n;q++){g.globalAlpha=.8*fk(p.n+q);g.fillStyle='#f6c880';g.fillRect(Math.round(sx+ox-8+q*6*ZM),Math.round(sy+oy-9+(q%2)*3*ZM),2,2)}});
 g.globalAlpha=1;g.restore();
 if(!SV.plain||1){bloom();mist();dust();envGlow(ox,oy,dt)}
 LTms+=performance.now()-t0;LTn++}
let bn=0;
function bloom(){if(bn++%3==0){bl.globalCompositeOperation='copy';bl.imageSmoothingEnabled=true;bl.drawImage(C,0,0,128,80);bl.globalCompositeOperation='multiply';bl.drawImage(BL,0,0)}
 g.save();g.setTransform(SC,0,0,SC,0,0);g.globalCompositeOperation='lighter';g.globalAlpha=SV.plain?.18:.3;g.imageSmoothingEnabled=true;g.drawImage(BL,0,0,512,320);g.restore();g.imageSmoothingEnabled=false}
function mist(){const m=GC.mist;mst.globalCompositeOperation='copy';mst.drawImage(MS,0,0);mst.globalCompositeOperation='source-in';mst.fillStyle=`rgb(${m[0]|0},${m[1]|0},${m[2]|0})`;mst.fillRect(0,0,128,128);
 g.save();g.setTransform(SC,0,0,SC,0,0);g.globalCompositeOperation='screen';g.imageSmoothingEnabled=true;const sp=SV.plain?0:1;
 [[0,300,-9,.5],[1,40,6,.4],[2,270,-5,.38],[3,10,8,.34]].forEach((q,i)=>{const x=((t*q[2]*sp+q[0]*190)%720+720)%720-150,y=q[1];g.globalAlpha=q[3]*.34;g.drawImage(MSt,x,y-40,260,110)});g.globalAlpha=.16;g.drawImage(MSt,-60,-40,300,70);g.drawImage(MSt,300,-44,300,70);
 g.restore();g.imageSmoothingEnabled=false}
function dust(){const[rx,ry]=LP(R.x,R.y,24);g.save();g.setTransform(SC,0,0,SC,0,0);g.globalCompositeOperation='lighter';g.fillStyle='#e9d6b4';const dt=.016;
 MOTES.forEach(m=>{if(!SV.plain||1){m.x+=m.vx*dt*(SV.plain?.3:1);m.y+=m.vy*dt*(SV.plain?.3:1)}if(m.y<-4)m.y=324;if(m.x<-4)m.x=516;if(m.x>516)m.x=-4;const d=Math.hypot(m.x-rx,(m.y-ry)*1.5),lit=Math.max(0,1-d/150);g.globalAlpha=(.06+.5*lit)*(.6+.4*Math.sin(t*2+m.ph));g.fillRect(Math.round(m.x),Math.round(m.y),1,1)});g.restore()}
/* ---- post: grain, chroma split, hit flash, red edge ---- */
const heart=()=>{const s=t-hbAt;return s<0?0:Math.exp(-s*8)+.6*Math.exp(-Math.pow((s-.2)*9,2))};
function postPass(){if(SV.plain)return;g.save();g.setTransform(SC,0,0,SC,0,0);
 if(scene=='play'&&!dead&&R.seal<=1){const p=Math.min(1,.18+.55*heart());g.globalAlpha=p*.55;g.drawImage(RE,0,0)}
 if(FXc>0){const o=1+Math.round(FXc*5);ct1.globalCompositeOperation='copy';ct1.drawImage(C,0,0,512,320);ct1.globalCompositeOperation='multiply';ct1.fillStyle='rgb(255,30,30)';ct1.fillRect(0,0,512,320);
  ct2.globalCompositeOperation='copy';ct2.drawImage(C,0,0,512,320);ct2.globalCompositeOperation='multiply';ct2.fillStyle='rgb(30,255,255)';ct2.fillRect(0,0,512,320);
  g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(.7,FXc*1.6);g.drawImage(CT1,-o,0);g.drawImage(CT2,o,0);g.globalCompositeOperation='source-over'}
 if(FXf>0){g.globalAlpha=Math.min(.9,FXf*1.8);g.strokeStyle=FXcol;g.lineWidth=12;g.strokeRect(0,0,512,320);g.globalAlpha=Math.min(.18,FXf*.4);g.fillStyle=FXcol;g.fillRect(0,0,512,320)}
 g.globalAlpha=.22;for(let y=0;y<320;y+=128)for(let x=0;x<512;x+=128)g.drawImage(GN[(Math.random()*4)|0],x-((Math.random()*64)|0),y-((Math.random()*64)|0));
 g.restore()}
function fxHurt(){FXf=.3;FXcol='#a02a22';FXc=.28;if(!RT.crack){RT.crack=1;setTimeout(()=>bark('voice',R.x,R.y,'A crack. Filed.'),500)}}
function fxFlash(a,c){FXf=Math.max(FXf,a);FXcol=c||BONE}
function pushIn(z,d){if(SV.plain)return;ZT=z;ZH=d}
/* ---- depth wipe: falling curtain, stamped depth card ---- */
const DNAME=[['DEPTH I','The Ash Hall'],['DEPTH II','The Pressing Floor'],['DEPTH III','The Carapace'],['DEPTH IV','Bram Holt']];
function startWipe(name){const d=['Depth II','Depth III','Depth IV'].findIndex(s=>name.indexOf(s)==0)+1;if(!d||seenD[d])return false;seenD[d]=1;W={t:0,d,st:0};return true}
function drawWipe(){if(W.t<0)return;const t_=W.t,fall=Math.min(1,t_/.45),lift=Math.max(0,Math.min(1,(t_-1.7)/.5)),e=q=>q*q*(3-2*q);
 const top=lift?e(lift)*320:0,bot=e(fall)*320;g.save();g.setTransform(SC,0,0,SC,0,0);g.fillStyle='#08070a';g.fillRect(0,top,512,Math.max(0,bot-top));
 g.fillStyle='rgba(216,208,188,.35)';if(bot<320)g.fillRect(0,bot-1,512,1);
 if(t_>.5&&lift<.6){const s=Math.min(1,(t_-.5)/.14),n=DNAME[W.d];g.globalAlpha=(1-lift/.6)*Math.min(1,s*1.4);g.textAlign='center';g.fillStyle=BONE;g.save();g.translate(256,150);const sc=1+(1-s)*.35;g.scale(sc,sc);g.font='38px '+FELL;try{g.letterSpacing='8px'}catch(e){}g.fillText(n[0],4,0);try{g.letterSpacing='0px'}catch(e){}g.restore();
  g.font='italic 15px '+FELL;g.fillStyle='#9a9484';g.fillText(n[1],256,178);g.fillStyle='rgba(216,208,188,.5)';g.fillRect(196,190,120,1);g.textAlign='left'}
 g.restore()}
/* ---- per-frame logic (called from upd while scene=='play'); returns 1 to freeze the sim ---- */
function lightUpd(dt){FXf=Math.max(0,FXf-dt);FXc=Math.max(0,FXc-dt);
 if(ZH>0){ZH-=dt;if(ZH<=0)ZT=scene=='talk'?1.1:1}ZM+=(ZT-ZM)*Math.min(1,dt*3.5);if(Math.abs(ZT-ZM)<.002)ZM=ZT;
 if(W.t>=0){W.t+=dt;if(W.t>.55&&!W.st){W.st=1;sfx('stamp');shake=6}if(W.t>2.2)W.t=-1;return 1}
 if(TQ.length&&!T){const q=TQ.shift();talk(q[0],q[1]);return 0}
 if(pendOpen&&fade<.4){pendOpen=0;talk('open')}
 const e=H.find(h=>h.st=='kneel');if(e&&!RT.edda&&Math.hypot(e.x-R.x,e.y-R.y)<3.8){RT.edda=1;talk('edda',{fx:e.x,fy:e.y})}
 if(R.rev&&!RT.rev){RT.rev=1;setTimeout(()=>bark('voice',R.x,R.y,'The seal holds. Barely.'),400)}
 if(!dead&&R.seal<=1){hbT-=dt;if(hbT<=0){hbT=.88;hbAt=t;tone(52,.13,'sine',.2,34);setTimeout(()=>tone(46,.15,'sine',.14,30),190)}}else hbT=0;
 if(R.moving&&R.z<=0){const f=Math.floor(R.mv*10)%6;if(f!=lstep&&(f==0||f==3)){lstep=f;nois(.05,320+Math.random()*180,.045)}}
 AL.forEach(a=>{a.bt=(a.bt==null?5+Math.random()*5:a.bt)-dt;if(a.bt<=0){a.bt=9+Math.random()*7;if(H.some(h=>h.st!='sl'&&h.st!='kneel'&&Math.hypot(h.x-a.x,h.y-a.y)<8))allyBark(a)}});
 LA[0]+=((R.moving?R.f[0]*1.2:0)-LA[0])*Math.min(1,dt*2);LA[1]+=((R.moving?R.f[1]*1.2:0)-LA[1])*Math.min(1,dt*2);
 if(drone&&drone.os){const D=[[55,55.6,82.4,180],[58.3,58.9,87.3,230],[46.2,47.1,69.3,150],[41.2,41.7,61.7,200]][curDepth];drone.os.forEach((o,i)=>o.frequency.setTargetAtTime(D[i],AX.currentTime,1.2));drone.base=D[3]}
 return 0}
function resetFX(){TQ.length=0;RT={};W={t:-1};seenD={};ZM=ZT=1;ZH=0;LA=[0,0];FXf=FXc=0;hbT=0;pendOpen=1;buildDressing();resetEnvAll()}
