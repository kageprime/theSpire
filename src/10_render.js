/* ---- sprites ---- */
function hostSpr(h){const A=HA[h.k],hh=h.k=='bra'?60:h.boss?84:56;let an='idle',fr=Math.floor(t*6)%6;
 if(h.st=='sl'||h.st=='kneel'||h.st=='yield'){an='knockdown';fr=5}else if(h.st=='getup'){an='getup';fr=fi(h.t,8)}else if(h.st=='down'){an='knockdown';fr=fi(h.t,10)}
 else if(h.st=='air'){if(h.vz>0&&SH[h.k].launch){an='launch';fr=fi(h.t,14)}else{an=SH[h.k].tumble?'tumble':'hit_heavy';fr=fi(h.t,12,1)}}
 else if(h.st=='broken'){an='hit_heavy';fr=3}else if(h.st=='stag'){an=h.tm>.5?'hit_heavy':'hit';fr=fi(h.t,12)}
 else if(h.st=='brace'||h.st=='stand'){if(h.bf>0&&SH.bra.block_hit){an='block_hit';fr=fi(.25-h.bf,14)}else{an='guard';fr=fi(h.t,12)}}
 else if(h.st=='open'){an='hit';fr=2}else if(h.st=='charge'){an='walk';fr=Math.floor(t*16)%6}
 else if(h.st=='wind'){an=A[h.ty].an;fr=Math.min(1,Math.floor(h.t/h.mt*2))}else if(h.st=='atk'){an=A[h.ty].an;fr=fi(h.t,14*.8)}
 else if(h.st=='ap'&&h.mvd){an='walk';fr=Math.floor(t*10)%6}
 if(!SH[h.k][an]){an='idle';fr=0}return[an,fr,hh]}
function ring(sx,sy,v,max,broken,col){g.strokeStyle=col||BONE;g.lineWidth=2;if(max==4){for(let i=0;i<4;i++){g.strokeStyle=i<v?(col||BONE):'#333339';const o=i>=v?(i%2?1.5:-1.5):0;g.beginPath();g.arc(sx+o,sy+(i>=v?1:0),7,i*1.571+.2,(i+1)*1.571-.2);g.stroke()}}
 else{if(broken){g.beginPath();g.arc(sx-2,sy,6,1.9,4.4);g.stroke();g.beginPath();g.arc(sx+2,sy+2,6,5,7.5);g.stroke()}else{g.beginPath();g.arc(sx,sy,6,-1.57,-1.57+6.283*Math.max(.02,v/max));g.stroke()}}g.lineWidth=1}
function circ(wx,wy,r,fill){g.beginPath();for(let a=0;a<=24;a++){const q=P(wx+Math.cos(a/24*6.283)*r,wy+Math.sin(a/24*6.283)*r);a?g.lineTo(...q):g.moveTo(...q)}g.stroke();if(fill){g.fill()}}
function glyph(x,y){g.save();g.strokeStyle=BONE;g.fillStyle=BONE;g.lineWidth=1;const f=Math.floor(t*8)%2;g.beginPath();g.moveTo(x,y-7);g.lineTo(x+6,y);g.lineTo(x,y+7);g.lineTo(x-6,y);g.closePath();g.stroke();g.fillRect(x-.5,y-4,1.5,5);g.fillRect(x-.5,y+2,1.5,1.5);if(f){g.fillRect(x-9,y-1,2,2);g.fillRect(x+8,y-1,2,2)}g.restore()}
function drawHost(h){const[sx0,sy0]=P(h.x,h.y),sx=Math.round(sx0),sy=Math.round(sy0);
 if(h.st=='wind'||(h.st=='atk'&&h.ah==0)){const A=HA[h.k][h.ty];g.strokeStyle='rgba(216,208,188,.6)';if(A.r>0){const r=h.k=='bra'&&h.ty==1?(h.q?Math.min(3,1.6+h.q*.17):1.3):A.r;g.fillStyle='rgba(216,208,188,'+(.1+.15*Math.min(1,h.t/h.mt))+')';circ(h.x,h.y,r,A.u)}else if(h.st=='wind'){const q=P(R.x,R.y);g.setLineDash([2,4]);g.beginPath();g.moveTo(sx,sy-24);g.lineTo(q[0],q[1]-14);g.stroke();g.setLineDash([])}
  if(h.k=='bra'&&h.ty==2&&h.st=='wind'){const q=P(h.x+h.fx*4,h.y+h.fy*4);g.beginPath();g.moveTo(sx,sy);g.lineTo(q[0],q[1]);g.stroke()}}
 if(h.st=='stand'){g.strokeStyle='rgba(216,208,188,.8)';g.fillStyle='rgba(216,208,188,.08)';circ(h.x,h.y,2.6,1);g.setLineDash([3,3]);circ(h.x,h.y,2.3,0);g.setLineDash([])}
 shd(h.k,sx,sy);const[an,fr,hh]=hostSpr(h);
 if(h.k=='bra'){g.shadowColor=EM;g.shadowBlur=h.str*1.8}
 sp(h.k,an,fr,h.d,sx,sy,h.z,h.fl>0?.55:1);g.shadowBlur=0;
 if(h.st!='sl'&&h.st!='getup'&&h.st!='kneel'){const ry=sy-h.z-hh;ring(sx,ry,h.seal,h.smax,h.broken>0);if(h.st=='wind'&&HA[h.k][h.ty].u)glyph(sx+15,ry-2)}}
function drawAlly(a){const[sx0,sy0]=P(a.x,a.y),sx=Math.round(sx0),sy=Math.round(sy0);shd(a.k,sx,sy);let an='idle',fr=Math.floor(t*6)%6;if(a.st=='atk'){an=HA[a.k][0].an;fr=fi(a.t,14*.9)}else if(a.mvd){an='walk';fr=Math.floor(t*10)%6}
 if(!SH[a.k][an]){an='idle';fr=0}g.shadowColor=EM;g.shadowBlur=4;sp(a.k,an,fr,a.d,sx,sy,0,.92);g.shadowBlur=0;g.fillStyle=EM;g.fillRect(sx-1,sy-58,3,3)}
function drawRen(){const[sx0,sy0]=P(R.x,R.y),sx=Math.round(sx0),sy=Math.round(sy0);shd('ren',sx,sy);
 let an='idle',fr=Math.floor(t*6)%6,al=1;
 if(R.st=='dead'){an='death';fr=fi(R.t,8)}else if(R.st=='stun'){an=R.sa;fr=fi(R.t,12)}else if(R.st=='atk'){an=R.at.s;fr=fi(R.at.t,14*R.sp)}
 else if(R.st=='dash'){an='dash';fr=fi(R.t,16);al=.6}else if(R.z>1){an='jump';fr=R.vz>60?1:R.vz>-40?2:3}else if(R.moving){an='walk';fr=Math.floor(R.mv*10)%6}
 if(!SH.ren[an]){an='idle';fr=0}
 g.shadowColor=EM;g.shadowBlur=R.st=='dead'?0:(SV.brand?3:0)+R.ash*2.2;if(R.inv>0&&R.st!='dash'&&Math.floor(t*30)%2)al=.5;sp('ren',an,fr,R.d,sx,sy,R.z,al);g.shadowBlur=0;
 if(R.st!='dead')ring(sx,sy-R.z-54,R.seal,4,0,SV.brand?'#c47a3a':BONE)}
function drawPT(){g.globalCompositeOperation='lighter';PT.forEach(p=>{const[sx,sy]=P(p.x,p.y);g.globalAlpha=Math.max(0,1-p.t/p.l);g.fillStyle=p.c==1?'#d8d0bc':'#e8842a';g.fillRect(Math.round(sx),Math.round(sy-p.z),2,2)});
 PR.forEach(p=>{const[sx,sy]=P(p.x,p.y);g.globalAlpha=.5;g.fillStyle='#e8842a';g.fillRect(Math.round(sx-4),Math.round(sy-18),8,8);g.globalAlpha=1;g.fillStyle='#f6c880';g.fillRect(Math.round(sx-2),Math.round(sy-16),4,4)});g.globalAlpha=1;g.globalCompositeOperation='source-over'}
/* ---- ledger interface ---- */
const MONO='"Courier New",monospace';
function panel(x,y,w,h,title,al){g.save();g.globalAlpha=al*(.94+.06*Math.sin(t*40));const c=7;g.beginPath();g.moveTo(x+c,y);g.lineTo(x+w,y);g.lineTo(x+w,y+h-c);g.lineTo(x+w-c,y+h);g.lineTo(x,y+h);g.lineTo(x,y+c);g.closePath();g.fillStyle='rgba(14,16,20,.84)';g.fill();g.strokeStyle='rgba(216,208,188,.8)';g.lineWidth=1;g.stroke();
 g.fillStyle='rgba(216,208,188,.06)';for(let i=0;i<h;i+=3)g.fillRect(x,y+i,w,1);g.fillStyle=BONE;g.font='bold 9px '+MONO;g.fillText(title,x+9,y+13);g.fillRect(x+7,y+18,w-14,1);g.restore()}
function tag(wx,wy,l1,l2,z){const[sx0,sy0]=P(wx,wy),sx=Math.round(sx0),sy=Math.round(sy0-(z||0));g.font='9px '+MONO;const w=Math.max(g.measureText(l1).width,l2?g.measureText(l2).width:0)+14,h=l2?30:19,bx=sx+16,by=sy-24-h;
 g.strokeStyle='rgba(216,208,188,.8)';g.lineWidth=1;g.beginPath();g.moveTo(sx,sy);g.lineTo(sx+10,sy-14);g.lineTo(bx,by+h);g.stroke();g.fillStyle='rgba(14,16,20,.78)';g.fillRect(bx,by,w,h);
 g.strokeStyle=BONE;g.beginPath();g.moveTo(bx,by+4);g.lineTo(bx,by);g.lineTo(bx+4,by);g.moveTo(bx+w-4,by+h);g.lineTo(bx+w,by+h);g.lineTo(bx+w,by+h-4);g.stroke();g.fillStyle=BONE;g.fillText(l1,bx+7,by+12);if(l2){g.fillStyle='#9a9484';g.fillText(l2,bx+7,by+24)}}
function bfs(tx,ty){const W=MW,sx=Math.floor(R.x),sy=Math.floor(R.y),tx0=Math.floor(tx),ty0=Math.floor(ty),st=sy*W+sx,prev=new Int16Array(W*MH).fill(-1),q=[st];prev[st]=-2;
 for(let i=0;i<q.length;i++){const c=q[i],x=c%W,y=(c-x)/W;if(x==tx0&&y==ty0)break;[[1,0],[-1,0],[0,1],[0,-1]].forEach(d=>{const nx=x+d[0],ny=y+d[1];if(nx<0||ny<0||nx>=W||ny>=MH||M[ny][nx]==1)return;const k=ny*W+nx;if(prev[k]==-1){prev[k]=c;q.push(k)}})}
 let c=ty0*W+tx0;if(prev[c]==-1)return[];const p=[];while(c>=0&&c!=st){p.push([c%W+.5,Math.floor(c/W)+.5]);c=prev[c]}return p.reverse()}
function objective(){if(bramDone)return CS[2].o?null:[CS[2].x,CS[2].y];if(bramOn)return null;if(bossDone)return[29.5,37.5];if(bossOn)return null;return R.seen?[29.5,23.5]:[16.5,15.5]}
function holoLayer(){
 g.globalCompositeOperation='lighter';drawPT();g.globalCompositeOperation='source-over';
 const[rx0,ry0]=P(R.x,R.y),rx=Math.round(rx0),ry=Math.round(ry0-R.z);
 /* spine: Ash cells + chain tempo, on Ren's body */
 if(R.st!='dead'){const n=R.ac;g.save();g.globalAlpha=R.ash>0||R.chain>0?.95:.4;g.strokeStyle='rgba(216,208,188,.85)';g.beginPath();g.moveTo(rx+12,ry-n*5-8);g.lineTo(rx+12,ry-2);g.moveTo(rx+12,ry-n*5-8);g.lineTo(rx+16,ry-n*5-8);g.moveTo(rx+12,ry-2);g.lineTo(rx+16,ry-2);g.stroke();
  for(let i=0;i<n;i++){g.fillStyle=i<Math.floor(R.ash)?EM:'rgba(70,64,60,.7)';g.fillRect(rx+16,ry-i*5-7,7,3)}const ch=Math.min(R.chain,10)*3;g.fillStyle=BONE;g.fillRect(rx+25,ry-2-ch,2,ch);g.restore()}
 /* rite progress */
 if(R.pt&&R.st=='free'){const h=R.pt,ok=h.k=='bra'||R.ash>=2;const[hx,hy]=P(h.x,h.y);tag(h.x,h.y,ok?'HOLD E : RITE OF PRESSING':'THE RITE NEEDS 2 ASH',h.k=='bra'?'CLAIM BRAM HOLT':h.n,52);
  if(R.press>0){g.strokeStyle=BONE;g.lineWidth=2;g.beginPath();g.arc(hx,hy-30,16,-1.57,-1.57+6.283*R.press);g.stroke();g.lineWidth=1}}
 /* prompts */
 if(Math.hypot(R.x-16.5,R.y-15.5)<1.9)tag(16.5,15.5,'E : REST AT THE SEAL','THE LEDGER WILL OFFER WRITS',10);
 if(!leverDone&&Math.hypot(R.x-LEV[0],R.y-LEV[1])<1.9)tag(LEV[0],LEV[1],'E : PULL THE BAR','SOMETHING SLIDES BEYOND',10);
 CS.forEach(c=>{if(!c.o&&!c.hid&&Math.hypot(R.x-c.x,R.y-c.y)<1.6)tag(c.x,c.y,'E : TAKE '+c.s.toUpperCase(),'',14)});
 H.forEach(h=>{if(h.st=='kneel'&&Math.hypot(h.x-R.x,h.y-R.y)<2.6)tag(h.x,h.y,'1 SPARE   2 PRESS   3 BREAK',h.n+' KNEELS. YIELDING.',40)});
 /* bram strain gauge */
 H.forEach(h=>{if(h.k=='bra'&&h.st!='yield'){const[sx0,sy0]=P(h.x,h.y),sx=Math.round(sx0)+22,sy=Math.round(sy0)-12;g.strokeStyle=BONE;g.beginPath();g.moveTo(sx-2,sy-46);g.lineTo(sx-2,sy+2);g.stroke();for(let i=0;i<8;i++){g.fillStyle=i<Math.floor(h.str)?EM:'rgba(70,64,60,.7)';g.fillRect(sx,sy-i*6-4,6,4)}g.fillStyle=BONE;g.font='8px '+MONO;g.fillText('STRAIN',sx-12,sy+12)}});
 /* world ledger text */
 texts.forEach(x=>{const[sx,sy]=P(x.x,x.y);g.globalAlpha=Math.min(1,x.t/x.m*2);g.font='italic 11px Fell,Georgia';g.fillStyle=BONE;const w=g.measureText(x.s).width;g.fillText(x.s,Math.round(sx-w/2),Math.round(sy-62-(x.m-x.t)*10));g.globalAlpha=1});
 /* locator */
 ledA+=((showLed?1:0)-ledA)*.2;
 if(showLed){const o=objective();if(t-locT>.25){locT=t;locP=o?bfs(o[0],o[1]):[]}
  let dist=0,px=R.x,py=R.y;g.fillStyle=BONE;locP.forEach((p,i)=>{dist+=Math.hypot(p[0]-px,p[1]-py);px=p[0];py=p[1];if(i%2==0&&i<28){const[sx,sy]=P(p[0],p[1]);g.globalAlpha=.35+.5*Math.max(0,Math.sin(t*5-i*.7));g.fillRect(Math.round(sx)-1,Math.round(sy)-1,3,3)}});g.globalAlpha=1;
  if(locP.length){const e=locP[Math.min(locP.length-1,27)],[sx,sy]=P(e[0],e[1]);g.font='9px '+MONO;g.fillText('OBJECTIVE  '+Math.round(dist)+'m',Math.round(sx)+6,Math.round(sy)-6)}}
 if(ledA>.02){const w=Math.round(176*ledA),x=rx+34,y=ry-132;panel(x,y,Math.max(40,w),128,'THE LEDGER',ledA);g.save();g.globalAlpha=ledA;g.font='9px '+MONO;g.fillStyle=BONE;
  const L=['SEAL     '+'o'.repeat(R.seal)+'.'.repeat(Math.max(0,R.max-R.seal)),'CHAIN    x'+R.chain,'HOSTS    '+AL.length+' pressed / '+SV.slots+' slots','WRITS    '+(R.bg.length?R.bg.map(b=>BGS.find(q=>q.id==b).n.split(' ')[0]).join(' '):'none'),'BRAND    '+(SV.brand?'marked':'clear'),'BANK     '+SV.bank+' ash','','TAB close   P plain readout'];
  L.forEach((s,i)=>{if(w>150)g.fillText(s,x+9,y+33+i*11)});if(w>150){g.fillStyle=EM;g.fillText(String(Math.floor(R.ash))+' / '+R.ac+' ASH',x+88,y+33+11*1+0);}g.restore()}
 /* bargain panel at the seal */
 if(R.panel&&R.offer){const[sx,sy]=P(16.5,15.5);const x=Math.round(sx)+30,y=Math.round(sy)-150;panel(x,y,214,112,'THE LEDGER OFFERS',1);g.font='9px '+MONO;
  if(!R.offer.length||R.bg.length>=3){g.fillStyle=BONE;g.fillText(R.bg.length>=3?'THREE WRITS ARE ALREADY SIGNED.':'NOTHING MORE TO SIGN.',x+9,y+36)}
  else R.offer.forEach((b,i)=>{const yy=y+32+i*26;g.fillStyle=BONE;g.fillText((i+1)+'  '+b.n,x+9,yy);g.fillStyle='#9a9484';g.fillText('+ '+b.g,x+22,yy+10);g.fillText('- '+b.p,x+22,yy+19)})}}
function plainHud(){g.fillStyle='rgba(14,16,20,.7)';g.fillRect(6,6,150,44);g.fillStyle=BONE;g.font='10px '+MONO;g.fillText('SEAL '+'o'.repeat(R.seal)+'.'.repeat(Math.max(0,R.max-R.seal)),12,20);g.fillText('ASH  '+Math.floor(R.ash)+'/'+R.ac+'  CHAIN x'+R.chain,12,32);const b=H.find(h=>h.boss&&h.st!='yield');if(b)g.fillText(b.n.toUpperCase().slice(0,12)+' '+Math.max(0,Math.round(b.seal))+'/'+Math.round(b.smax),12,44)}
function renderPlay(){g.setTransform(1,0,0,1,0,0);g.fillStyle='#0e0d10';g.fillRect(0,0,512,320);
 if(!READY){g.fillStyle=DIM;g.font='11px Fell,Georgia';g.textAlign='center';g.fillText('reading the Ledger…',256,160);g.textAlign='left';return}
 if(scene=='intro'){g.fillStyle=CH;g.fillRect(0,0,512,320);g.textAlign='center';if(il==0){g.fillStyle='#2a2a30';g.font='11px Fell,Georgia';g.fillText('V E I L S P I R E',256,40)}
  g.fillStyle=BONE;g.font='italic 17px Fell,Georgia';const s=LINES[il].slice(0,Math.floor(ti));g.fillText(s,256,160);g.fillStyle=DIM;g.font='11px Fell,Georgia';g.fillText(il==LINES.length-1&&ti>=s.length?'press space to enter the Hollow':'space to continue',256,290);g.textAlign='left';return}
 const ox=Math.round((Math.random()-.5)*shake*SV.shk+CPX*.3*SV.shk),oy=Math.round((Math.random()-.5)*shake*SV.shk+CPY*.3*SV.shk);CPX*=.82;CPY*=.82;
 g.save();g.translate(ox,oy);floor();floorText(16.5,21.6,'The Floor Voice sets the test:','SPARE WHAT YIELDS.');
 const E=[],i0=Math.floor(cx)-11,j0=Math.floor(cy)-11;
 for(let j=j0;j<j0+23;j++)for(let i=i0;i<i0+23;i++){if(i<0||j<0||i>=MW||j>=MH||!vis(i,j))continue;
  if(M[j][i]==3)E.push({d:i+j+1,f:()=>fogS(i,j)});
  else if(M[j][i]==1){let n=0;for(let a=-1;a<2;a++)for(let b=-1;b<2;b++){const y=j+b,x=i+a;if(y>=0&&x>=0&&y<MH&&x<MW&&M[y][x]!=1)n=1}if(n)E.push({d:i+j+1,f:()=>wallS(i,j)})}}
 BRZ.forEach(b=>{if(Math.abs(b[0]-cx)<12&&Math.abs(b[1]-cy)<12)E.push({d:b[0]+b[1],f:()=>brazier(b[0],b[1])})});
 CS.forEach(c=>{if(!c.hid)E.push({d:c.x+c.y,f:()=>chest(c)})});CP.forEach(c=>E.push({d:c.x+c.y-.2,f:()=>drawCorpse(c)}));
 E.push({d:R.x+R.y,f:drawRen});H.forEach(h=>E.push({d:h.x+h.y,f:()=>drawHost(h)}));AL.forEach(a=>E.push({d:a.x+a.y,f:()=>drawAlly(a)}));
 E.sort((a,b)=>a.d-b.d).forEach(e=>e.f());drawSpk();g.restore();
 const dk=g.createRadialGradient(256,150,50,256,150,240);dk.addColorStop(0,'rgba(8,7,10,0)');dk.addColorStop(1,'rgba(8,7,10,.95)');g.fillStyle=dk;g.fillRect(0,0,512,320);
 g.globalCompositeOperation='lighter';BRZ.concat([[16.5,15.5]]).forEach(b=>{const[sx,sy]=P(b[0],b[1]);if(sx<-80||sx>590||sy<-80||sy>400)return;const r=g.createRadialGradient(sx,sy-10,2,sx,sy-10,70);r.addColorStop(0,'rgba(217,119,43,.22)');r.addColorStop(1,'rgba(217,119,43,0)');g.fillStyle=r;g.fillRect(sx-70,sy-80,140,140)});g.globalCompositeOperation='source-over';
 g.save();g.translate(ox,oy);if(HIDE){g.globalCompositeOperation='lighter';drawPT();g.globalCompositeOperation='source-over'}else holoLayer();g.restore();
 if(fade>0){g.fillStyle='rgba(8,7,10,'+Math.min(1,fade)+')';g.fillRect(0,0,512,320)}
 if(zt>0&&scene=='play'){g.globalAlpha=Math.min(1,zt);g.fillStyle=BONE;g.font='italic 20px Fell,Georgia';g.textAlign='center';g.fillText(zone,256,288);g.textAlign='left';g.globalAlpha=1}
 if(SV.plain&&!HIDE)plainHud();
 if(!HIDE&&scene=='play'&&!TOUCHON()){g.fillStyle=DIM;g.font='9px Fell,Georgia';g.fillText('WASD move  J J J chain  K launch/plunge  Space jump  Shift veil  E use / hold: Rite  Tab Ledger  P plain  Esc pause',8,314)}
 const ov=(l,s,shop)=>{g.fillStyle='rgba(18,17,20,.88)';g.fillRect(0,0,512,320);g.textAlign='center';g.fillStyle=BONE;g.font='italic 22px Fell,Georgia';g.fillText(l[0],256,70);g.font='13px Fell,Georgia';l.slice(1).forEach((q,i)=>g.fillText(q,256,98+i*18));
  g.font='11px '+MONO;g.fillStyle=EM;g.fillText('ASH IN THE BANK: '+SV.bank,256,206);g.fillStyle=BONE;g.fillText('[1] Host slot +1 (40)   have '+SV.slots+'/3',256,222);g.fillText('[2] Ember Veins: start with +1 Ash (25)   have '+SV.veins+'/3',256,236);if(SV.brand)g.fillText('[3] Scour the brand (20)',256,250);
  g.fillStyle=DIM;g.font='11px Fell,Georgia';g.fillText(s,256,290);g.textAlign='left'};
 if(dead&&t>1.2)ov(['The seal scatters.','Ren Calder is filed as Ash. Ash is kept.','Banked from this run: '+R.earned],'press R to walk in again');
 if(scene=='end'&&R.verdict)ov(R.verdict,'press R to dive again')}
