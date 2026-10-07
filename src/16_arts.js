/* ---- M2.5 combat feel (Sekiro-inspired): slash arcs, impacts, clash, perilous counters, deathblows, Ash arts ---- */
let SLO={k:1,t:0},FXL=[],STK=[],CRS=[],GH=[],FDK=0,FSL=0,vcT=-9,fcd=0,quietDB=0,ghT=0;
const SILC=new Map(),angOf=v=>Math.atan2(v[1],v[0]),nrm=v=>{const l=Math.hypot(v[0],v[1])||1;return[v[0]/l,v[1]/l]};
/* time scale: slow-motion on clashes, counters and finishers (real-time timer, game-time scale) */
function slowmo(k,d){SLO.k=Math.min(SLO.k,k);SLO.t=Math.max(SLO.t,d)}
function slowK(r){if(SLO.t>0){SLO.t-=r;return SLO.k}SLO.k+=(1-SLO.k)*Math.min(1,r*10);if(SLO.k>.97)SLO.k=1;return SLO.k}
/* ---- sounds ---- */
Object.assign(SFX,{clang(){tone(2100,.25,'square',.05,1900);tone(3100,.2,'triangle',.04,2800);tone(880,.3,'sine',.07,860);nois(.08,6000,.12,1)},
 art(){tone(180,.3,'sawtooth',.06,820);nois(.25,2000,.07,1)},
 finish(){tone(70,.5,'sawtooth',.16,28);nois(.18,1200,.14);tone(1320,.5,'sine',.05,1300);setTimeout(()=>tone(990,.6,'sine',.04,980),90)},
 peril(){tone(1500,.09,'square',.05);setTimeout(()=>tone(1900,.12,'square',.05),110)},
 veil(){nois(.2,900,.07,1);tone(500,.18,'triangle',.04,200)},
 bell(){[220,330,440,660].forEach((f,i)=>setTimeout(()=>tone(f,.9,'sine',.08),i*30))},
 finale(){tone(50,.9,'sawtooth',.22,22);nois(.5,700,.2);[110,165,220].forEach(f=>tone(f,1.2,'sine',.1))}});
SFX.deflect=SFX.clang;
/* ---- art moves added to the combat tables ---- */
AD.crescent={hf:[2],cf:5,dm:.5,r:1.7,arc:1};AD.finale={hf:[],cf:99,dm:0,r:0,air:1};NM.crescent='EMBER CRESCENT';NM.finale='FINAL ENTRY';
/* ---- helpers ---- */
function addFX(o,delay){if(FXL.length<160)FXL.push(Object.assign({t:-(delay||0),l:.2,z:0},o))}
function streaks(x,y,z,a0,spread,n,spd,col,l){for(let i=0;i<n&&STK.length<280;i++){const a=a0+(Math.random()-.5)*spread,s=spd*(.5+Math.random()*.9);STK.push({x,y,z,vx:Math.cos(a)*s,vy:Math.sin(a)*s,vz:(Math.random()-.3)*70,t:0,l:(l||.28)*(.6+Math.random()*.6),c:col||'#ffe9b0'})}}
function fxUpd(dt){FXL.forEach(f=>f.t+=dt);FXL=FXL.filter(f=>f.t<f.l);STK.forEach(s=>{s.t+=dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.z+=s.vz*dt;s.vz-=170*dt;s.vx*=1-dt*2;s.vy*=1-dt*2});STK=STK.filter(s=>s.t<s.l&&s.z>-6);
 GH.forEach(q=>q.t+=dt);GH=GH.filter(q=>q.t<q.l);FDK=Math.max(0,FDK-dt);FSL=Math.max(0,FSL-dt);
 if(scene=='play')PR.forEach(p=>{if(PT.length<270&&Math.random()<.7)PT.push({x:p.x,y:p.y,z:15+Math.random()*5,vx:0,vy:0,vz:4,t:0,l:.35,c:0})})}
function silhouette(k,an,fr,dir,col){const S=SH[k];if(!S||!S[an])return null;const key=k+an+fr+dir+col;let c=SILC.get(key);if(!c){if(SILC.size>500)SILC.clear();c=mkc(S.cell,S.cell);const q=c.getContext('2d');q.drawImage(S[an],fr*S.cell,dir*S.cell,S.cell,S.cell,0,0,S.cell,S.cell);q.globalCompositeOperation='source-in';q.fillStyle=col;q.fillRect(0,0,S.cell,S.cell);SILC.set(key,c)}return c}
function drawSil(k,an,fr,dir,x,y,z,al,col){const c=silhouette(k,an,fr,dir,col),S=SH[k];if(!c)return;g.globalAlpha=al;g.drawImage(c,Math.round(x-S.ax),Math.round(y-S.ay-z));g.globalAlpha=1}
function drawGhost(q){const[sx,sy]=P(q.x,q.y);g.globalCompositeOperation='lighter';drawSil('ren','dash',q.fr,q.d,Math.round(sx),Math.round(sy),0,.5*(1-q.t/q.l),'#8fb4d6');g.globalCompositeOperation='source-over'}
function dashFx(dt){ghT-=dt;if(ghT<=0){ghT=.035;GH.push({x:R.x,y:R.y,d:R.d,fr:fi(R.t,16),t:0,l:.28})}}
function fxDash(){const a=angOf(R.dv)+Math.PI;streaks(R.x,R.y,18,a,.7,12,7,'#bcd4ea',.3);addFX({k:'ring',x:R.x,y:R.y,r0:.2,r1:1.1,col:'#9ec0d8',lw:2,l:.25});sfx('veil');ghT=0}
/* ---- Ren's slash arcs ---- */
function fxSwing(s){const a=angOf(R.f),pw=R.at&&R.at.pw||1,C1='#e8dcc0';
 if(s=='attack1')addFX({k:'arc',follow:1,a0:a+1.15,a1:a-1.15,r:1.5,w:.55,z:22,col:C1,l:.2},.03);
 else if(s=='attack2'){addFX({k:'arc',follow:1,a0:a-1.1,a1:a+1.1,r:1.45,w:.5,z:22,col:C1,l:.18},.02);addFX({k:'arc',follow:1,a0:a+1,a1:a-1,r:1.7,w:.4,z:26,col:C1,l:.16},.13)}
 else if(s=='attack3'){if(pw>1){addFX({k:'arc',follow:1,a0:a,a1:a+6.1,r:2,w:.75,z:20,col:'#ff9a40',core:'#fff0c8',l:.3},.03);addFX({k:'ring',x:R.x,y:R.y,r0:.4,r1:2.4,col:'#ff9a40',lw:3,l:.35,lit:70},.1);addFX({k:'star',x:R.x,y:R.y,z:24,s:22,l:.14,col:'#ffd9a0'},.1)}else addFX({k:'arc',follow:1,a0:a+1.6,a1:a-1.6,r:1.9,w:.6,z:20,col:C1,l:.22},.05)}
 else if(s=='launcher')addFX({k:'arc',follow:1,a0:a-.55,a1:a+.55,r:1.2,w:.45,z:4,zr:62,col:C1,l:.2},.03);
 else if(s=='air1')addFX({k:'arc',follow:1,a0:a+1,a1:a-1,r:1.5,w:.5,z:34,col:C1,l:.18},.03)}
function fxLand(){addFX({k:'ring',x:R.x,y:R.y,r0:.3,r1:2.4,col:'#d8d0bc',lw:3,l:.35,lit:60});streaks(R.x,R.y,6,0,6.28,16,6,'#d8d0bc',.3);fxFlash(.15,'#d8d0bc')}
function fxImpact(h,ux,uy,s){const z=h.z+24,big=s=='attack3'||s=='plunge';addFX({k:'star',x:h.x,y:h.y,z,l:.13,s:big?18:12,col:'#fff2d0',lit:50,rot:Math.random()});streaks(h.x,h.y,z,Math.atan2(uy,ux),.9,big?14:9,big?9:6,'#ffe0a0',.26);emb(h.x,h.y,z,5,1.2,1)}
/* ---- deflect: sparks, shockwave, perfect timing ---- */
function fxClash(h,pf){const x=(R.x+h.x)/2,y=(R.y+h.y)/2;addFX({k:'star',x,y,z:26,s:pf?34:26,l:.2,col:'#fff6e0',lit:90});addFX({k:'ring',x,y,z:26,r0:.1,r1:pf?2:1.4,col:'#ffe8b0',lw:2,l:.3});
 streaks(x,y,26,0,6.28,pf?30:20,8,'#ffe8b0',.3);FXc=Math.max(FXc,pf?.3:.18);slowmo(pf?.12:.2,pf?.2:.12);if(pf){fxFlash(.5,'#fff6e0');SFX.bell()}}
/* ---- enemy swings and perilous attacks ---- */
function fxEnemySlash(h,A){const a=Math.atan2(R.y-h.y,R.x-h.x),col=A.u?'#ff7a3a':'#c8d4e6';
 if(h.k=='bra'&&h.ty==1){addFX({k:'ring',x:h.x,y:h.y,r0:.3,r1:h.q?Math.min(3,1.6+h.q*.17):1.3,col:'#ff9a40',lw:3,l:.3,lit:80});return}
 if(!A.r)return;addFX({k:'arc',x:h.x,y:h.y,a0:a+1,a1:a-1,r:Math.min(A.r,2.4)*.85,w:.45,z:22+h.z,col,l:.17})}
function fxPeril(h){sfx('peril');addFX({k:'ring',x:h.x,y:h.y,r0:.2,r1:1.8,col:'#ff7a3a',lw:2,l:.25});addFX({k:'star',x:h.x,y:h.y,z:h.z+58,s:16,l:.22,col:'#ff9a40',lit:60});shake=Math.max(shake,2)}
function perilGlyph(sx,sy,p){g.save();g.translate(sx,sy);const s=1+.25*Math.sin(p*30)+(p<.2?.6*(1-p/.2):0);g.scale(s,s);g.fillStyle='#d9772b';g.strokeStyle='#0e0d10';g.lineWidth=2;g.beginPath();g.moveTo(0,-11);g.lineTo(9,0);g.lineTo(0,11);g.lineTo(-9,0);g.closePath();g.fill();g.stroke();g.fillStyle='#0e0d10';g.fillRect(-1,-6,2,7);g.fillRect(-1,3,2,2);
 if(p<.25){g.strokeStyle='rgba(255,200,120,'+(1-p/.25)+')';g.lineWidth=1;for(let i=0;i<8;i++){const a=i*.785;g.beginPath();g.moveTo(Math.cos(a)*13,Math.sin(a)*13);g.lineTo(Math.cos(a)*(20+p*40),Math.sin(a)*(20+p*40));g.stroke()}}g.restore()}
/* Sekiro-style answers to a perilous attack: dash through it (veil counter) or jump it (leap) */
function perilEvade(h,how){if(t-vcT<.7)return;vcT=t;const a=Math.atan2(h.y-R.y,h.x-R.x);R.f=[h.x-R.x,h.y-R.y];R.d=dirOf(R.f[0],R.f[1]);R.chain+=how=='veil'?2:1;R.ct=R.ctw;
 if(how=='veil'){R.ash=Math.min(R.ac,R.ash+1);say(R.x,R.y-.7,'VEIL COUNTER',1.4);addFX({k:'slash',x:h.x,y:h.y,z:30,ang:-.5,len:110,w:7,l:.24,col:'#fff2d0'});addFX({k:'star',x:h.x,y:h.y,z:30,s:30,l:.2,col:'#fff2d0',lit:90});streaks(h.x,h.y,30,a,1.6,22,9,'#ffe0a0',.3);slowmo(.14,.4);fxFlash(.4,'#fff2d0');shake=8;sfx('finish');sealDmg(h,4.5)}
 else{say(R.x,R.y-.7,'OVER THE SWEEP',1.3);addFX({k:'ring',x:h.x,y:h.y,r0:.3,r1:2.2,col:'#d8d0bc',lw:2,l:.35});addFX({k:'star',x:R.x,y:R.y,z:R.z+10,s:16,l:.15,col:'#fff2d0'});slowmo(.3,.25);shake=5;sfx('clang');sealDmg(h,2.2)}
 if(h.k=='bra'){h.st='open';h.t=0;h.open=1.6}else if(!h.big&&h.st!='broken'&&H.includes(h)){h.st='stag';h.t=0;h.tm=.85}}
/* ---- deathblow: every kill is a finisher; bigger on the last host in a room and on bosses ---- */
function deathblow(h){if(quietDB)return;const boss=h.boss,last=!H.some(o=>o!=h&&!['kneel','yield'].includes(o.st)&&Math.hypot(o.x-h.x,o.y-h.y)<10),z=h.z+26;
 addFX({k:'slash',x:h.x,y:h.y,z,l:.22,len:boss?130:84,ang:-.6,w:boss?8:5,col:'#fff2d0'});addFX({k:'star',x:h.x,y:h.y,z,s:boss?32:20,l:.18,col:'#fff2d0',lit:70});addFX({k:'ring',x:h.x,y:h.y,r0:.2,r1:boss?3.2:2,col:'#d8d0bc',lw:2,l:.4});
 streaks(h.x,h.y,z,0,6.28,boss?30:16,8,'#ffe0a0',.35);fxFlash(boss?.7:.3,'#fff2d0');sfx('finish');slowmo(boss?.12:last?.18:.4,boss?.9:last?.65:.2);if(last||boss){pushIn(boss?1.16:1.1,boss?1:.7);FSL=boss?.5:.35}}
/* ---- Ash arts: U Ember Crescent (ranged), I Final Entry (desperation) ---- */
const finaleReady=()=>!dead&&scene=='play'&&R.ash>=3&&R.seal<=2&&fcd<=0&&R.st!='dead';
function startArt(k){
 if(k=='u'){if(R.ash<1){say(R.x,R.y-.5,'NO ASH',.8);sfx('tick');return 1}R.ash-=1;const n=near();if(n){R.f=[n.x-R.x,n.y-R.y];R.d=dirOf(R.f[0],R.f[1])}
  R.st='atk';R.t=0;R.at={s:'crescent',t:0,h:{},pw:1};R.sp=1.1;R.dwin=0;say(R.x,R.y-.3,'EMBER CRESCENT',.9);sfx('swing');return 1}
 if(!finaleReady()){say(R.x,R.y-.5,R.ash<3?'THE ENTRY NEEDS 3 ASH':fcd>0?'THE PAGE IS STILL WET':'THE SEAL IS TOO WHOLE',1.1);sfx('tick');return 1}
 R.ash=0;R.st='atk';R.t=0;R.at={s:'finale',t:0,h:{},pw:1};R.sp=.4;R.inv=1.4;R.vz=300;R.z=.1;R.dwin=0;fcd=10;FDK=1.2;say(R.x,R.y-.4,'FINAL ENTRY',1.6);
 addFX({k:'ring',x:R.x,y:R.y,r0:3.2,r1:.3,col:'#d8d0bc',lw:2,l:.5,lit:60});slowmo(.35,.3);sfx('bell');return 1}
function artAnim(){const a=R.at;if(a.s=='crescent')return['attack2',fi(a.t,14*R.sp)];
 if(a.s=='finale')return R.vz>0&&!a.dived?['air1',Math.min(5,Math.floor(a.t*9))]:['plunge',Math.max(0,Math.min(5,Math.floor((a.t-.48)*16)))];return[a.s,fi(a.t,14*R.sp)]}
function artTick(a,fr){
 if(a.s=='crescent'&&!a.fired&&fr>=2){a.fired=1;const f=nrm(R.f),an=angOf(f);CRS.push({x:R.x+f[0]*.6,y:R.y+f[1]*.6,vx:f[0]*9,vy:f[1]*9,a:an,t:0,l:.75,hit:[]});
  addFX({k:'arc',follow:1,a0:an+1.3,a1:an-1.3,r:1.7,w:.7,z:22,col:'#ff9a40',core:'#fff0c8',l:.2});streaks(R.x,R.y,22,an,.6,10,8,'#ffb060',.3);sfx('art');shake=Math.max(shake,2)}
 else if(a.s=='finale'&&!a.dived&&a.t>.5){a.dived=1;R.vz=-600;streaks(R.x,R.y,40,-1.57,.4,14,4,'#fff6e0',.3)}}
function finaleLand(){const ex=R.x,ey=R.y;quietDB=1;let n=0;
 H.slice().forEach(h=>{if(['kneel','yield'].includes(h.st)||Math.hypot(h.x-ex,h.y-ey)>6.5)return;if(h.boss)sealDmg(h,8);else{h.seal=0;h.broken=1;killH(h);n++}});quietDB=0;
 [0,.08,.16].forEach((d,i)=>addFX({k:'ring',x:ex,y:ey,r0:.3,r1:6.5-i,col:i?'#d8d0bc':'#ff9a40',lw:4-i,l:.5+i*.05,lit:i?0:140},d));
 addFX({k:'pillar',x:ex,y:ey,w:46,h:230,l:.5});addFX({k:'star',x:ex,y:ey,z:24,s:48,l:.25,col:'#fff6e0',lit:160});streaks(ex,ey,12,0,6.28,46,10,'#ffe8b0',.5);emb(ex,ey,6,40,3,1);emb(ex,ey,6,30,3);
 shake=16;HS=.16;slowmo(.18,.8);pushIn(1.15,.9);fxFlash(.9,'#fff6e0');FDK=.35;FSL=.6;sfx('finale');say(ex,ey-.6,n?'THE ROOM IS FILED':'ENTRY FILED',2.2)}
function artsUpd(dt){fcd-=dt;
 CRS.forEach(c=>{c.t+=dt;c.x+=c.vx*dt;c.y+=c.vy*dt;if(solid(c.x,c.y)||c.t>c.l){c.dead=1;if(solid(c.x,c.y))streaks(c.x-c.vx*.05,c.y-c.vy*.05,18,c.a+Math.PI,1.6,10,5,'#ffb060',.25);return}
  if(Math.random()<.8)emb(c.x,c.y,16,1,.3);
  H.slice().forEach(h=>{if(c.dead||c.hit.includes(h)||['kneel','yield'].includes(h.st))return;if(Math.hypot(h.x-c.x,h.y-c.y)<.85){c.hit.push(h);if(h.st=='sl')h.st='ap';SPK.push({x:h.x,y:h.y,z:h.z+22,t:0});fxImpact(h,c.vx,c.vy,'attack3');R.ash=Math.min(R.ac,R.ash+.25);R.chain++;R.ct=R.ctw;
   if(!sealDmg(h,1.7)&&!h.big&&!['air','down','broken'].includes(h.st)){h.st='stag';h.t=0;h.tm=.35;mv(h,c.vx*.02,c.vy*.02)}}});
  PR.forEach(p=>{if(!p.dead&&Math.hypot(p.x-c.x,p.y-c.y)<.8){p.dead=1;streaks(p.x,p.y,18,0,6.28,8,5,'#ffb060',.22);sfx('deflect')}})});
 CRS=CRS.filter(c=>!c.dead)}
/* ---- drawing (world layer, additive, after lighting so it glows) ---- */
function arcShape(x,y,tl,hd,r,w,z,zr,a0,span,col,al){if(al<=.01||Math.abs(hd-tl)<.02)return;const N=16,o=[],n=[];
 for(let i=0;i<=N;i++){const u=i/N,th=tl+(hd-tl)*u,tp=Math.pow(Math.sin(Math.PI*u),.6),zz=z+zr*((th-a0)/(span||1)),po=P(x+Math.cos(th)*r,y+Math.sin(th)*r),pi=P(x+Math.cos(th)*(r-w*tp),y+Math.sin(th)*(r-w*tp));o.push([po[0],po[1]-zz]);n.push([pi[0],pi[1]-zz])}
 g.globalAlpha=Math.min(1,al);g.fillStyle=col;g.beginPath();o.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));for(let i=N;i>=0;i--)g.lineTo(n[i][0],n[i][1]);g.closePath();g.fill()}
function drawFX(){g.save();g.globalCompositeOperation='lighter';
 FXL.forEach(f=>{if(f.t<0)return;const p=f.t/f.l,al=Math.max(0,1-p);
  if(f.k=='arc'){const x=f.follow?R.x:f.x,y=f.follow?R.y:f.y,zb=f.follow?R.z:0,span=f.a1-f.a0,q=Math.min(1,p/.55),hd=f.a0+span*(1-Math.pow(1-q,3)),tp=Math.max(0,(p-.12)/.88),tl=f.a0+span*(1-Math.pow(1-tp,2))*.94;
   arcShape(x,y,tl,hd,f.r,f.w*1.6,f.z+zb,f.zr||0,f.a0,span,f.col,al*(1-p*p)*.4);arcShape(x,y,tl,hd,f.r,f.w*.7,f.z+zb,f.zr||0,f.a0,span,f.core||'#fffaf0',al*(1-p*p))}
  else if(f.k=='ring'){const rr=f.r0+(f.r1-f.r0)*(1-Math.pow(1-p,2));g.globalAlpha=al;g.strokeStyle=f.col;g.lineWidth=(f.lw||2)*(.4+al);g.beginPath();for(let i=0;i<=28;i++){const a=i/28*6.283,q=P(f.x+Math.cos(a)*rr,f.y+Math.sin(a)*rr);i?g.lineTo(q[0],q[1]-(f.z||0)):g.moveTo(q[0],q[1]-(f.z||0))}g.stroke()}
  else if(f.k=='star'){const[sx,sy]=P(f.x,f.y),L=f.s*(1-p*.5),rot=f.rot||0;g.globalAlpha=al;g.strokeStyle=f.col;g.lineWidth=2;g.beginPath();for(let i=0;i<8;i++){const a=rot+i*.7854,l=i%2?L*.55:L;g.moveTo(sx,sy-f.z);g.lineTo(sx+Math.cos(a)*l,sy-f.z+Math.sin(a)*l*.7)}g.stroke();g.fillStyle=f.col;g.beginPath();g.arc(sx,sy-f.z,f.s*.3*al,0,6.283);g.fill()}
  else if(f.k=='slash'){const[sx,sy]=P(f.x,f.y),len=f.len*(.25+.75*Math.min(1,p*5)),w=f.w*al,dx=Math.cos(f.ang)*len/2,dy=Math.sin(f.ang)*len/2,px=-Math.sin(f.ang)*w,py=Math.cos(f.ang)*w;g.globalAlpha=al;g.fillStyle=f.col||'#fff';g.beginPath();g.moveTo(sx-dx,sy-f.z-dy);g.lineTo(sx+px,sy-f.z+py);g.lineTo(sx+dx,sy-f.z+dy);g.lineTo(sx-px,sy-f.z-py);g.closePath();g.fill()}
  else if(f.k=='pillar'){const[sx,sy]=P(f.x,f.y),w=f.w*(1-p*.6),gr=g.createLinearGradient(0,sy-f.h,0,sy);gr.addColorStop(0,'rgba(255,240,208,0)');gr.addColorStop(1,'rgba(255,240,208,.85)');g.globalAlpha=al;g.fillStyle=gr;g.fillRect(sx-w/2,sy-f.h,w,f.h)}});
 CRS.forEach(c=>{arcShape(c.x,c.y,c.a-1.15,c.a+1.15,.55,.34,18,0,c.a-1.15,2.3,'#ff9a40',.55);arcShape(c.x,c.y,c.a-1.15,c.a+1.15,.55,.14,18,0,c.a-1.15,2.3,'#fff0c8',1)});
 g.lineWidth=1.5;STK.forEach(s=>{const[sx,sy]=P(s.x,s.y),[px,py]=P(s.x-s.vx*.05,s.y-s.vy*.05);g.globalAlpha=Math.max(0,1-s.t/s.l);g.strokeStyle=s.c;g.beginPath();g.moveTo(sx,sy-s.z);g.lineTo(px,py-s.z+s.vz*.05);g.stroke()});
 if(finaleReady()&&!R.panel){const[sx,sy]=P(R.x,R.y);g.globalCompositeOperation='source-over';g.globalAlpha=.55+.4*Math.sin(t*6);g.fillStyle=BONE;g.font='9px '+MONO;g.textAlign='center';g.fillText(TOUCHON()?'FINAL ENTRY':'I : FINAL ENTRY',sx,sy-84);g.textAlign='left'}
 g.restore()}
const SLA=Array.from({length:40},()=>Math.random()*6.283);
function drawFXScreen(){if(SV.plain)return;g.save();g.setTransform(SC,0,0,SC,0,0);
 if(FDK>0){g.globalAlpha=Math.min(.5,FDK*.5);g.fillStyle='#050406';g.fillRect(0,0,512,320)}
 if(FSL>0){g.globalCompositeOperation='lighter';g.strokeStyle='#fff6e0';g.lineWidth=1;g.globalAlpha=Math.min(.5,FSL);g.beginPath();SLA.forEach((a,i)=>{const r0=150+((i*37+t*400)%60),r1=r0+60+(i%5)*20;g.moveTo(256+Math.cos(a)*r0*1.5,160+Math.sin(a)*r0*.95);g.lineTo(256+Math.cos(a)*r1*1.5,160+Math.sin(a)*r1*.95)});g.stroke()}
 g.restore()}
function resetArts(){FXL=[];STK=[];CRS=[];GH=[];SLO={k:1,t:0};FDK=FSL=0;fcd=0;quietDB=0}
