/* ---- M3 environment: tall walls with surface treatment, floor occlusion, puddles, smoke, void backdrop with the Veilspire,
   ambient sound, and the overlook reveal. Everything is generated in code and cached. ---- */
let VV=0,VVt=0,SMK=[],smkT=0,ambT=[3,9,30,50],WALLC=new Map();
const rng=s=>()=>((s=Math.imul(s^s>>>15,2246822507)^Math.imul(s^s>>>13,3266489909))>>>0)/4294967296;
/* ---- walls: raise back faces, then paint grime, mortar, damp, moss, cracks onto the cached composite ---- */
const wallExtra=(i,j)=>{const d=depthAt(i,j),n=(Math.sin(i*.37+j*.21)+Math.sin(i*.11-j*.33)+2)/4;return Math.min(3,Math.floor([0,.6,1,1.6][d]+n*2.2))};
function wallComposite(k,seed,d,extra){const key=k+'|'+seed+'|'+d+'|'+extra;let c=WALLC.get(key);if(c)return c;const m=KM[k],w=m[2],h=m[3],cap=24,sl=24,n=k.indexOf('Half')>0?0:extra,H_=h+n*sl;
 c=mkc(w,H_);const x=c.getContext('2d');x.imageSmoothingEnabled=false;const src=(sy,sh,dy)=>x.drawImage(KA,m[0],m[1]+sy,w,sh,0,dy,w,sh);
 if(n){src(cap,h-cap,n*sl+cap);for(let q=0;q<n;q++)src(cap,sl,cap+q*sl);src(0,cap,0)}else src(0,h,0);
 const r=rng(seed*977+d*31+n),tint=[[236,228,214],[255,196,172],[170,238,216],[162,192,255]][d];
 x.globalCompositeOperation='source-atop';
 for(let q=3+(r()*5|0);q<H_;q+=10+(r()*5|0)){let sx0=0;while(sx0<w){const sw=5+(r()*12|0);if(r()<.78){x.fillStyle='rgba(255,255,255,.05)';x.fillRect(sx0,q,sw,1);x.fillStyle='rgba(0,0,0,.14)';x.fillRect(sx0,q+1,sw,1)}sx0+=sw}}                 /* mortar courses */
 for(let q=0;q<9;q++){const bx=(r()*w)|0,by=(r()*H_)|0,bw=6+(r()*10|0),bh=5+(r()*6|0);x.fillStyle=r()<.5?'rgba(255,255,255,.05)':'rgba(0,0,0,.09)';x.fillRect(bx,by,bw,bh)} /* block variation */
 for(let q=0;q<5;q++){const gx=(r()*w)|0,gl=10+(r()*H_*.6|0),gr=x.createLinearGradient(0,0,0,gl);gr.addColorStop(0,'rgba(0,0,0,.32)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(gx,0,1+(r()*2|0),gl)} /* grime runs from the top */
 const bg=x.createLinearGradient(0,H_-16,0,H_);bg.addColorStop(0,'rgba(0,0,0,0)');bg.addColorStop(1,'rgba(0,0,0,.45)');x.fillStyle=bg;x.fillRect(0,H_-16,w,16); /* damp and occlusion at the base */
 if(d==2||d==0&&r()<.5){const mc=d==2?'rgba(70,120,96,.55)':'rgba(84,98,66,.4)';for(let q=0;q<6;q++){const mx=(r()*w)|0,my=H_-5-(r()*14|0);x.fillStyle=mc;x.fillRect(mx,my,2+(r()*4|0),1+(r()*3|0));x.fillRect(mx+1,my-1,2,1)}}
 if(r()<.55){let px=4+(r()*(w-8)|0),py=(r()*H_*.5|0);x.strokeStyle=d==1?'rgba(232,132,42,.85)':'rgba(0,0,0,.55)';x.lineWidth=1;x.beginPath();x.moveTo(px,py);for(let q=0;q<5;q++){px+=(r()*5|0)-2;py+=3+(r()*5|0);x.lineTo(px,py)}x.stroke()}
 x.fillStyle=`rgba(${tint[0]},${tint[1]},${tint[2]},.05)`;x.fillRect(0,0,w,H_);x.globalCompositeOperation='source-over';
 if(WALLC.size>400)WALLC.clear();WALLC.set(key,c);return c}
function kdw(k,sx,sy,i,j){const m=KM[k],d=depthAt(i,j),broken=k.indexOf('Broken')>0,face=/_(N|W)$/.test(k)&&k.indexOf('Half')<0,ex=face&&!broken?wallExtra(i,j):0,c=wallComposite(k,hsh(i,j)%6,d,ex);g.drawImage(c,Math.round(sx+m[4]),Math.round(sy+m[5]-(c.height-m[3])))}
/* ---- floor: occlusion where it meets walls, plus wear ---- */
const AON=mkc(64,37),AOW=mkc(64,37);[[AON,48,9,-.447,.894],[AOW,16,9,.447,.894]].forEach(a=>{const x=a[0].getContext('2d');x.beginPath();x.moveTo(0,18);x.lineTo(32,0);x.lineTo(64,18);x.lineTo(32,37);x.closePath();x.clip();const gr=x.createLinearGradient(a[1],a[2],a[1]+a[3]*26,a[2]+a[4]*26);gr.addColorStop(0,'rgba(0,0,0,.62)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(0,0,64,37)});
function aoTile(i,j,sx,sy){if(j>0&&M[j-1][i]==1)g.drawImage(AON,Math.round(sx-32),Math.round(sy));if(i>0&&M[j][i-1]==1)g.drawImage(AOW,Math.round(sx-32),Math.round(sy))}
(()=>{let c=mkc(30,14),x=c.getContext('2d'),r=rng(7);for(let q=0;q<26;q++){x.fillStyle=`rgba(${60+(r()*25|0)},${8+(r()*8|0)},${8+(r()*6|0)},${.25+r()*.4})`;const rr=1+r()*4;x.beginPath();x.ellipse(5+r()*20,2+r()*9,rr,rr*.5,0,0,6.283);x.fill()}DS.st=c;
 c=mkc(34,18);x=c.getContext('2d');let gr=x.createRadialGradient(17,9,1,17,9,16);gr.addColorStop(0,'rgba(0,0,0,.75)');gr.addColorStop(.6,'rgba(0,0,0,.35)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.save();x.scale(1,.55);x.translate(0,7);x.fillRect(0,0,34,34);x.restore();DS.sc=c;
 c=mkc(40,12);x=c.getContext('2d');r=rng(19);for(let q=0;q<60;q++){x.fillStyle=`rgba(${120+(r()*40|0)},${116+(r()*38|0)},${108+(r()*34|0)},${.08+r()*.18})`;x.fillRect((r()*38)|0,(r()*10)|0,1+(r()*3|0),1)}DS.ad=c})();
/* ---- props: rubble, puddles, fallen blocks, mid-room stains ---- */
let ENVP=[];
function buildEnv(){buildGeo();ENVP=[];WALLC.clear();SMK=[];const avoid=[[16.5,15.5,3],[4.5,4.9,2],[16.5,21.6,2]].concat(CS.map(c=>[c.x,c.y,1.4]),BRZ.map(b=>[b[0],b[1],1.2]));
 for(let j=2;j<MH-2;j++)for(let i=2;i<MW-2;i++){if(M[j][i]!=0)continue;const h=hsh(i*11+13,j*17+7),r=h%1000,x=i+.2+((h>>8)%60)/100,y=j+.2+((h>>14)%60)/100;if(avoid.some(a=>Math.hypot(x-a[0],y-a[1])<a[2]))continue;
  const wallN=M[j-1][i]==1,wallW=M[j][i-1]==1;
  if(r<30&&(wallN||wallW))ENVP.push({k:'rub',x:wallN?i+.5:i+.15,y:wallN?j+.12:j+.5,d:i+j+.1,s:h});
  else if(r<44)ENVP.push({k:'pud',x,y,d:i+j-.5,s:r,w:7+(h>>20)%7});
  else if(r<54)ENVP.push({k:'blk',x,y,d:x+y,s:h});
  else if(r<66)DEC.push({k:'st',x,y});else if(r<74)DEC.push({k:'sc',x,y});else if(r<92)DEC.push({k:'ad',x,y})}}
function drawEnv(p){const[sx,sy]=P(p.x,p.y),r=rng(p.s);
 if(p.k=='rub'){for(let q=0;q<7;q++){const a=r()*6.283,rr=3+r()*9,bx=Math.round(sx+Math.cos(a)*rr),by=Math.round(sy+Math.sin(a)*rr*.5),v=70+(r()*40|0),w=2+(r()*4|0);g.fillStyle=`rgb(${v},${v-3},${v-6})`;g.fillRect(bx,by-2,w,2);g.fillStyle=`rgb(${v+30},${v+27},${v+22})`;g.fillRect(bx,by-2,w,1);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(bx,by,w+1,1)}}
 else if(p.k=='pud'){const w=p.w,h=Math.round(w*.42),pl=.5+.5*Math.sin(t*.6+p.s);g.fillStyle='rgba(10,12,16,.62)';g.beginPath();g.ellipse(sx,sy,w,h,0,0,6.283);g.fill();g.strokeStyle='rgba(120,130,150,.22)';g.beginPath();g.ellipse(sx,sy,w-1,h-1,0,0,6.283);g.stroke();if(!SV.plain){const q=(t*.35+p.s*.13)%1;g.strokeStyle=`rgba(150,165,190,${(1-q)*.3})`;g.beginPath();g.ellipse(sx,sy,w*(.2+q*.7),h*(.2+q*.7),0,0,6.283);g.stroke()}}
 else if(p.k=='blk'){const s=5+(p.s>>5)%5,v=82+(p.s>>9)%24,z=Math.round(s*.7);g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(sx+1,sy+1,s+2,s*.5+1,0,0,6.283);g.fill();g.fillStyle=`rgb(${v+16},${v+13},${v+9})`;g.beginPath();g.moveTo(sx-s,sy-z);g.lineTo(sx,sy-z-s*.5);g.lineTo(sx+s,sy-z);g.lineTo(sx,sy-z+s*.5);g.closePath();g.fill();g.fillStyle=`rgb(${v-8},${v-9},${v-10})`;g.beginPath();g.moveTo(sx-s,sy-z);g.lineTo(sx,sy-z+s*.5);g.lineTo(sx,sy+s*.5);g.lineTo(sx-s,sy);g.closePath();g.fill();g.fillStyle=`rgb(${v-24},${v-24},${v-24})`;g.beginPath();g.moveTo(sx,sy-z+s*.5);g.lineTo(sx+s,sy-z);g.lineTo(sx+s,sy);g.lineTo(sx,sy+s*.5);g.closePath();g.fill()}}
/* ---- emissive: fire reflected in the puddles, smoke off the braziers ---- */
const SM=radial(64,[[0,'rgba(255,255,255,.5)'],[1,'rgba(255,255,255,0)']]);
function envGlow(ox,oy,dt){const near=[];BRZ.forEach(b=>{if(Math.abs(b[0]-cx)<13&&Math.abs(b[1]-cy)<13)near.push(b)});near.push([R.x,R.y]);
 g.save();g.globalCompositeOperation='lighter';
 ENVP.forEach(p=>{if(p.k!='pud'||Math.abs(p.x-cx)>12||Math.abs(p.y-cy)>12)return;let best=null,bd=6;near.forEach(b=>{const d=Math.hypot(b[0]-p.x,b[1]-p.y);if(d<bd){bd=d;best=b}});if(!best)return;const[sx,sy]=LP(p.x,p.y,0),k=(1-bd/6)*(SV.plain?1:.8+.2*Math.sin(t*9+p.s));
  g.globalAlpha=.55*k;g.fillStyle='#ff9a40';const w=p.w*ZM;g.beginPath();g.ellipse(sx+ox,sy+oy,w*.35,w*.12,0,0,6.283);g.fill();g.globalAlpha=.4*k;g.fillRect(Math.round(sx+ox-1),Math.round(sy+oy-w*.55),2,Math.round(w*.55));g.globalAlpha=.2*k;g.fillRect(Math.round(sx+ox-3),Math.round(sy+oy-w*.4),6,Math.round(w*.4))});
 if(scene=='play'||scene=='talk'){smkT-=dt;if(smkT<=0){smkT=.14;near.forEach(b=>{if(b[0]==R.x||SMK.length>90)return;SMK.push({x:b[0],y:b[1],z:34,vz:16+Math.random()*10,vx:(Math.random()-.5)*4,t:0,l:2+Math.random()*1.2})})}}
 SMK.forEach(s=>{s.t+=dt;s.z+=s.vz*dt;s.x+=s.vx*dt*.02;s.vz*=1-dt*.4});SMK=SMK.filter(s=>s.t<s.l);
 SMK.forEach(s=>{const[sx,sy]=LP(s.x,s.y,s.z),p=s.t/s.l,w=(8+p*26)*ZM;g.globalAlpha=(1-p)*(p<.15?p/.15:1)*.07;g.drawImage(SM,sx+ox-w/2,sy+oy-w/2,w,w)});g.restore()}
/* ---- the void: far architecture and the Veilspire. The lighting pass leaves the void bright (see voidMask),
   so this layer is what you see past the walls. Faint until the overlook, then it reveals. ---- */
const SPIRE=(()=>{const c=mkc(260,420),x=c.getContext('2d'),r=rng(5);
 const edge=y=>{const p=y/420;return[96-p*54+Math.sin(y*.07)*3,96+p*54+Math.sin(y*.05+2)*3]};
 for(let y=0;y<420;y++){const[a,b]=edge(y),L=a+34,Rr=b+34,mid=(L+Rr)/2,v=92+Math.sin(y*.3)*5-y*.04;x.fillStyle=`rgb(${v+26},${v+30},${v+44})`;x.fillRect(L,y,mid-L,1);x.fillStyle=`rgb(${v-26},${v-24},${v-8})`;x.fillRect(mid,y,Rr-mid,1)}
 for(let y=26;y<420;y+=46){const[a,b]=edge(y);x.fillStyle='rgb(30,32,44)';x.fillRect(a+28,y,b-a+12,5);x.fillStyle='rgba(190,200,230,.5)';x.fillRect(a+28,y,b-a+12,1);for(let q=0;q<4;q++){const wx=a+40+q*(b-a)/4;x.fillStyle='rgb(18,18,26)';x.fillRect(wx,y+10,3,10);if(r()<.3){x.fillStyle='rgb(240,150,70)';x.fillRect(wx,y+12,2,3)}}}
 x.strokeStyle='rgba(255,150,60,.95)';x.lineWidth=2;x.beginPath();let px=130;x.moveTo(px,0);for(let y=0;y<420;y+=14){px+=(r()-.5)*9;px=Math.max(112,Math.min(150,px));x.lineTo(px,y)}x.stroke();return c})();
const DEBRIS=Array.from({length:26},(_,i)=>{const r=rng(i*13+3);return{x:r()*700,y:r()*420,s:1.5+r()*4,par:.25+r()*.9,ph:r()*6.28,sp:.6+r()*1.6,v:38+(r()*34|0)}}),ASHF=Array.from({length:70},(_,i)=>({x:Math.random()*512,y:Math.random()*320,v:6+Math.random()*16,d:Math.random()*20-10,a:.15+Math.random()*.4}));
function drawBackdrop(ox,oy){const gr=g.createLinearGradient(0,0,0,320);gr.addColorStop(0,'#1b2030');gr.addColorStop(.55,'#20202e');gr.addColorStop(1,'#141319');g.fillStyle=gr;g.fillRect(0,0,512,320);
 const B=.28+(RT.vista?.2:0)+VV*.52,px=Math.round(-cx*2.4-cy*1.6+350),py=Math.round(cy*1.2-30);
 g.save();g.globalAlpha=.6;DEBRIS.forEach(d=>{const x=((d.x-cx*14*d.par-cy*6*d.par)%700+700)%700-90,y=((d.y+cy*5*d.par+t*d.sp*2)%460+460)%460-70+Math.sin(t*.4+d.ph)*3,s=d.s*(.6+d.par*.6);g.fillStyle=`rgb(${d.v},${d.v-2},${d.v+6})`;g.beginPath();g.moveTo(x-s,y);g.lineTo(x,y-s*.55);g.lineTo(x+s,y);g.lineTo(x,y+s*.55);g.closePath();g.fill();g.fillStyle=`rgb(${d.v-30},${d.v-30},${d.v-20})`;g.fillRect(Math.round(x-s),Math.round(y),Math.round(s*2),Math.max(1,Math.round(s*.5)))});g.restore();
 g.save();g.globalAlpha=Math.min(1,B+.3);g.drawImage(SPIRE,px-130,py-20);g.restore();
 g.save();g.globalCompositeOperation='lighter';const hl=g.createRadialGradient(px,py-20,2,px,py-20,170);hl.addColorStop(0,`rgba(255,170,90,${.14+VV*.5})`);hl.addColorStop(1,'rgba(255,170,90,0)');g.fillStyle=hl;g.fillRect(px-180,py-190,360,340);
 for(let q=0;q<46;q++){const a=q*.137+t*.03*(q%2?1:-1),rr=70+(q%7)*9;g.globalAlpha=.3+VV*.5;g.fillStyle='#ffbf80';g.fillRect(Math.round(px+Math.cos(a)*rr*1.7),Math.round(py+120+Math.sin(a)*rr*.34),1,1)}
 if(VV>.05){g.globalAlpha=VV*.14;for(let q=0;q<7;q++){const a=-1.57+(q-3)*.16;g.fillStyle='#ffd9a0';g.beginPath();g.moveTo(px,py-20);g.lineTo(px+Math.cos(a-.03)*520,py-20+Math.sin(a-.03)*520);g.lineTo(px+Math.cos(a+.03)*520,py-20+Math.sin(a+.03)*520);g.closePath();g.fill()}}
 g.globalAlpha=1;ASHF.forEach(a=>{const sp=SV.plain?.2:1;a.y+=a.v*sp*.016;a.x+=a.d*sp*.016;if(a.y>324){a.y=-4;a.x=Math.random()*512}g.globalAlpha=a.a;g.fillStyle='#c9bfae';g.fillRect(Math.round(a.x),Math.round(a.y),1,1)});
 g.restore()}
/* ---- void mask: ambient darkness is mostly removed outside the level so the backdrop shows ---- */
const VM=mkc(128,80),vm=VM.getContext('2d');let GEO=[];
function buildGeo(){GEO=[];for(let j=0;j<MH;j++){GEO[j]=[];for(let i=0;i<MW;i++){let v=M[j][i]!=1;if(!v)for(let a=-1;a<2&&!v;a++)for(let b=-1;b<2;b++){const y=j+b,x=i+a;if(y>=0&&x>=0&&y<MH&&x<MW&&M[y][x]!=1){v=true;break}}GEO[j][i]=v}}}
let vmN=0;function voidMask(ox,oy){if(vmN++%2)return;vm.globalCompositeOperation='source-over';vm.clearRect(0,0,128,80);vm.fillStyle='rgba(255,255,255,.9)';vm.fillRect(0,0,128,80);vm.globalCompositeOperation='destination-out';vm.fillStyle='#fff';vm.beginPath();
 const i0=Math.floor(cx)-11,j0=Math.floor(cy)-11;for(let j=j0;j<j0+23;j++)for(let i=i0;i<i0+23;i++){if(i<0||j<0||i>=MW||j>=MH||!GEO[j][i])continue;const[sx,sy]=LP(i,j,0);if(sx<-80||sx>600||sy<-120||sy>420)continue;const X=(sx+ox)/4,Y=(sy+oy)/4,z=ZM/4,wh=(M[j][i]==1?30+wallExtra(i,j)*24:6)*z;
  vm.moveTo(X,Y-wh);vm.lineTo(X+32*z,Y+16*z-wh);vm.lineTo(X+32*z,Y+16*z);vm.lineTo(X,Y+32*z);vm.lineTo(X-32*z,Y+16*z);vm.lineTo(X-32*z,Y+16*z-wh);vm.closePath()}
 vm.fill();vm.globalCompositeOperation='source-over'}
/* ---- ambience: silence with detail ---- */
function envAmb(dt){if(scene!='play')return;ambT=ambT.map(x=>x-dt);const dp=curDepth;
 if(ambT[0]<=0){ambT[0]=2.5+Math.random()*7;const f=1500+Math.random()*900;tone(f,.07,'sine',.03,f*.6);setTimeout(()=>tone(f*.98,.1,'sine',.012,f*.55),180);setTimeout(()=>tone(f*.96,.12,'sine',.006,f*.5),420)}
 if(ambT[1]<=0){ambT[1]=11+Math.random()*16;nois(1.8,300+dp*60,.035,0);setTimeout(()=>nois(1.2,220,.02,0),900)}
 if(ambT[2]<=0){ambT[2]=26+Math.random()*30;tone(46-dp*3,1.6,'sawtooth',.035,38-dp*3)}
 if(ambT[3]<=0){ambT[3]=40+Math.random()*50;tone(1180,.5,'triangle',.02,1170);setTimeout(()=>tone(1500,.4,'triangle',.014,1490),260)}}
Object.assign(SFX,{swell(){[110,165,220,330,440].forEach((f,i)=>setTimeout(()=>tone(f,3.2,'sine',.06,f*1.01),i*260))}});
/* ---- overlook reveal ---- */
SCR.vista=()=>SV.tk.vista?[]:[['voice','calm','Look up, porter.'],['voice','calm','That is the thing you have been asked to climb.'],['ren','strained','It does not end.'],['voice','amused','It does not begin, either. You are standing on the part in between.']];
function envUpd(dt){VV+=(VVt-VV)*Math.min(1,dt*.9);envAmb(dt);
 if(scene=='play'&&!RT.vista&&R.x>24.5&&R.x<29&&R.y>5.5&&R.y<10.5){RT.vista=1;if(!SV.tk.vista){talk('vista',{fx:R.x+3,fy:R.y-3,vista:1});SV.tk.vista=1;sv()}}
 VVt=T&&T.vista?1:0}
function resetEnvAll(){buildEnv();VV=VVt=0;ambT=[3,9,30,50]}

function drawCine(){const l=T.s[T.i],e=Math.min(1,T.age*1.6),bar=Math.round(34*Math.min(1,(T.i==0?T.age:9)*.9));g.save();g.setTransform(SC,0,0,SC,0,0);
 g.fillStyle='#050406';g.fillRect(0,0,512,bar);g.fillRect(0,320-bar,512,bar);
 if(T.i>=1){const a=Math.min(1,(T.i>1?1:T.age*.5))*.9;g.globalAlpha=a;g.textAlign='center';g.fillStyle=BONE;g.font='30px '+FELL;try{g.letterSpacing='9px'}catch(x){}g.fillText('THE VEILSPIRE',260,96);try{g.letterSpacing='0px'}catch(x){}g.font='italic 11px '+FELL;g.fillStyle=DIM;g.fillText('the Floor, and everything under it',256,114)}
 g.globalAlpha=e;g.textAlign='center';g.font='italic 15px '+FELL;g.fillStyle=BONE;const ln=wrap(l[2].slice(0,Math.floor(T.ch)),380),full=wrap(l[2],380);full.forEach((_,i)=>{if(ln[i]!=null)g.fillText(ln[i],256,320-bar-20-(full.length-1-i)*17+0)});
 if(T.ch>=l[2].length){g.globalAlpha=.6+.4*Math.sin(T.age*6);g.font='9px '+MONO;g.fillStyle=DIM;g.fillText(TOUCHON()?'tap':'space',256,320-bar+14)}
 g.restore()}
