/* ---- combat ---- */
function tryAtk(k){const air=R.z>2;let s;
 if(k=='k')s=air?'plunge':'launcher';else if(air)s='air1';
 else s=R.st=='atk'&&CHAIN.includes(R.at.s)?CHAIN[(CHAIN.indexOf(R.at.s)+1)%3]:(R.cnt>0?CHAIN[R.cn%3]:'attack1');
 const n=near();if(n){R.f=[n.x-R.x,n.y-R.y];R.d=dirOf(R.f[0],R.f[1])}
 R.st='atk';R.t=0;R.at={s,t:0,h:{},pw:1};R.sp=1+Math.min(R.chain,8)*.03;fxSwing(s);
 if(s=='attack3'&&R.ash>=R.wc){R.ash-=R.wc;R.at.pw=1.6;say(R.x,R.y-.5,'CINDER WHEEL',1.4);emb(R.x,R.y,18,12,1.4)}else say(R.x,R.y-.3,NM[s],.7);
 if(CHAIN.includes(s))R.cn=CHAIN.indexOf(s)+1;R.dwin=s=='attack1'?R.dw:0;if(s=='plunge')R.vz=-380;sfx('swing');return 1}
function sealDmg(h,d){if(h.st=='sl'){h.st='ap'}if(h.broken>0){killH(h);return 1}h.seal-=d;h.reg=0;h.fl=.12;if(h.seal<=0){h.seal=0;h.broken=2.5;if(h.st!='air'&&h.st!='brace'&&h.st!='stand'){h.st='broken';h.t=0}else if(h.k=='bra'){h.st='open';h.t=0;h.open=1.8}say(h.x,h.y,'SEAL BROKEN',1.4);sfx('crack')}return 0}
function killH(h){if(h.boss&&--h.lives>0){h.seal=h.smax;h.broken=0;h.st='down';h.t=0;h.str=0;say(h.x,h.y,h.k=='bra'?'BRAM HOLDS':'THE CARAPACE HOLDS',2.2);shake=10;sfx('fin');return}
 R.rev=false;R.kills++;R.ash=Math.min(R.ac,R.ash+1);if(R.kh&&R.seal<R.max)R.seal++;sfx('fin');HS=.1;shake=8;CPX=(h.x-R.x)*4;CPY=(h.y-R.y)*4;emb(h.x,h.y,20,26,2.2);deathblow(h);
 if(h.k=='bra'){h.st='yield';h.t=0;h.broken=14;h.seal=0;R.earned+=40;say(h.x,h.y-1,'BRAM KNEELS',3);say(h.x,h.y-1.5,'HOLD E: RITE OF PRESSING',5);HS=.2;pushIn(1.1,1.2);talk('bramKneel',{fx:h.x,fy:h.y});return}
 H=H.filter(o=>o!=h);CP.push({x:h.x,y:h.y,k:h.k,d:h.d,t:0});R.earned+=h.boss?15:3;say(h.x,h.y,'FILED: '+h.n,2.4);
 if(h.boss){bossDone=1;M[24][29]=0;M[24][30]=0;M[34][29]=0;M[34][30]=0;say(30.5,33.5,'A SEAM OPENS BELOW.',3)}}
function resolveBram(p){const h=H.find(o=>o.k=='bra');if(!h)return;H=H.filter(o=>o!=h);
 if(p){AL.push(newAlly(h.x,h.y,'bra','Bram Holt'));SV.bram=1;sv();R.pressed++;R.earned+=10;say(h.x,h.y-1,'PRESSED: BRAM HOLT',3.5);sfx('press');emb(h.x,h.y,20,40,2.5,1)}else{CP.push({x:h.x,y:h.y,k:'bra',d:h.d,t:0});say(h.x,h.y-1,'BRAM IS FILED.',3)}
 bramDone=1;CS[2].hid=0;say(30.5,45,'THE SHARD SURFACES.',3);talk(p?'bramPressed':'bramFiled')}
function doPress(h){if(h.k=='bra'){resolveBram(1);return}H=H.filter(o=>o!=h);R.ash-=2;R.pressed++;R.earned+=4;AL.push(newAlly(h.x,h.y,h.k,h.n));
 while(AL.filter(a=>a.k!='bra').length>SV.slots){const i=AL.findIndex(a=>a.k!='bra');say(AL[i].x,AL[i].y,'SCATTERS',1.4);AL.splice(i,1)}
 say(h.x,h.y-.8,'PRESSED: '+h.n,2.5);sfx('press');emb(h.x,h.y,20,30,2.2,1)}
function hurt(u,sx,sy){if(R.inv>0||R.st=='dash'||dead)return;R.seal--;R.cracks++;R.chain=0;R.inv=.8;R.at=null;R.cn=0;shake=7;HS=.06;sfx('crack');fxHurt();say(R.x,R.y,'CRACK',1);emb(R.x,R.y,24,8,1.6,1);
 const dx=R.x-sx,dy=R.y-sy,l=Math.hypot(dx,dy)||1;mv(R,dx/l*.5,dy/l*.5);
 if(R.seal<=0){if(!R.rev){R.rev=true;R.seal=1;say(R.x,R.y-.4,'THE SEAL HOLDS',2)}else{dead=true;R.st='dead';R.t=0;t=0;SV.bank+=R.earned;sv();return}}
 R.st='stun';R.t=0;R.stun=u?.5:.35;R.sa=u?'hit_heavy':'hit'}
function deflect(h){h.st='stag';h.t=0;h.tm=.9;sealDmg(h,3.5);R.chain++;R.ct=R.ctw;const _pf=t-R.dt<.12;fxClash({x:R.x,y:R.y,z:0},_pf);if(_pf){R.ash=Math.min(R.ac,R.ash+.5);say(R.x,R.y-.6,'PERFECT',1)};say(R.x,R.y-.5,'DEFLECT',1);fxFlash(.35);sfx('deflect');shake=_pf?8:5;HS=.08;SPK.push({x:(R.x+h.x)/2,y:(R.y+h.y)/2,z:24,t:0});emb((R.x+h.x)/2,(R.y+h.y)/2,24,16,2.2);CPX=(R.x-h.x)*3;CPY=(R.y-h.y)*3}
function shoot(h,A){const dx=R.x-h.x,dy=R.y-h.y,l=Math.hypot(dx,dy)||1;PR.push({x:h.x,y:h.y,vx:dx/l*5,vy:dy/l*5,u:A.u,t:0});sfx('swing')}
function hostResolve(h){const A=HA[h.k][h.ty],d=Math.hypot(R.x-h.x,R.y-h.y);if(A.pr){shoot(h,A);return}
 let r=A.r;const quake=h.k=='bra'&&h.ty==1;if(quake)r=h.q?Math.min(3,1.6+h.q*.17):1.3;if(d>=r)return;
 if(A.u){if(R.z<8)hurt(quake&&!h.q?0:1,h.x,h.y);if(quake){shake=10;emb(h.x,h.y,4,26,2.6)}return}
 if(R.dwin>0&&R.st=='atk'&&R.at.s=='attack1'){deflect(h);return}hurt(0,h.x,h.y)}
function hitHost(h,a,s,ux,uy){if(h.st=='kneel'||h.st=='yield')return;fxImpact(h,ux||R.f[0],uy||R.f[1],s);let dm=1.3*a.dm*R.at.pw*(1+R.chain*.1);
 if(h.k=='bra'){const fx=R.x-h.x,fy=R.y-h.y,fl=Math.hypot(fx,fy)||1,front=(fx*h.fx+fy*h.fy)/fl>.25;
  if((h.st=='brace'||h.st=='stand')&&front){h.str=Math.min(8,h.str+(s=='attack2'?2:1));h.bf=.25;dm*=s=='attack2'?.6:.2;say(h.x,h.y-.8,s=='attack2'?'CROSSING FANGS':'BLOCKED',.8);sfx('deflect');emb(h.x,h.y,22,6,1.6);
   if(h.str>=8){h.str=0;dm=h.smax*(h.st=='stand'?.5:.3);h.st='open';h.t=0;h.open=1.8;say(h.x,h.y-1,'THE GUARD CRACKS',1.8);shake=9}}
  else if(h.open>0)dm*=1.5;else if(h.st=='brace'||h.st=='stand')say(h.x,h.y-.8,'BACK OPEN',.8);
  if(h.st=='stand')dm*=.6}
 SPK.push({x:h.x,y:h.y,z:h.z+22,t:0});if(h.st=='sl')h.st='ap';
 const wasB=h.broken>0;if(sealDmg(h,dm))return;if(wasB)return;emb(h.x,h.y,20,4,1.4);
 if(a.lau&&!h.big){h.st='air';h.vz=200;h.t=0}
 else if(a.spike){if(h.z>3){h.vz=-430;h.sk=1;h.st='air'}else if(!h.big){h.st='down';h.t=0}}
 else if(a.air&&h.st=='air')h.vz=Math.max(h.vz,115);
 else if(!h.big&&!['down','air','broken'].includes(h.st)&&!((h.st=='atk'||h.st=='wind')&&HA[h.k][h.ty].u)){h.st='stag';h.t=0;h.tm=.4}
 if(!h.big&&h.st!='air')mv(h,ux*.12,uy*.12)}
function doHit(s){const a=AD[s];let hit=0;H.slice().forEach(h=>{if(h.st=='kneel'||h.st=='yield')return;const dx=h.x-R.x,dy=h.y-R.y,d=Math.hypot(dx,dy)||.01;if(d>a.r)return;
 if(a.arc&&(dx*R.f[0]+dy*R.f[1])/(d*Math.hypot(R.f[0],R.f[1])||1)<0)return;if(a.air){if(Math.abs(h.z-R.z)>52)return}else if(h.z>6)return;hit=1;hitHost(h,a,s,dx/d,dy/d)});
 ILL.slice().forEach(c=>{const dx=c[0]+.5-R.x,dy=c[1]+.5-R.y;if(Math.hypot(dx,dy)<2.2&&(dx*R.f[0]+dy*R.f[1])>0){M[c[1]][c[0]]=0;ILL=ILL.filter(o=>o!=c);say(c[0]+.5,c[1]+.5,'THE WALL WAS A WRIT',2.6);sfx('crack');shake=6;emb(c[0]+.5,c[1]+.5,14,22,1.8,1)}});
 if(hit){R.chain++;R.ct=R.ctw;R.ash=Math.min(R.ac,R.ash+.4);HS=.05;shake=3;sfx('hit')}}
/* ---- bram ---- */
function bramAI(h,dt,dx,dy,d){const A=HA.bra,l=Math.hypot(dx,dy)||1,fx=dx/l,fy=dy/l;h.open=Math.max(0,h.open-dt);h.bf-=dt;if(h.st!='brace'&&h.st!='stand')h.str=Math.max(0,h.str-dt*.12);
 if(h.st=='ap'){h.d=dirOf(dx,dy);h.cd-=dt;h.fx=fx;h.fy=fy;h.mvd=d>1.2;if(d>1.2)mv(h,fx*h.sp*dt,fy*h.sp*dt);
  if(h.cd<=0){
   if((!h.sf1&&h.seal<=h.smax*.66)||(!h.sf2&&h.seal<=h.smax*.33)){if(h.seal<=h.smax*.33)h.sf2=1;else h.sf1=1;h.st='stand';h.t=0;h.sd=6;say(h.x,h.y-1,'STAND FAST',2.5);return}
   if(h.str>=4&&d<3){h.ty=1;h.q=h.str;h.str=0;h.st='wind';h.t=0;h.mt=1;say(h.x,h.y-.9,'UNBLOCKABLE',1.2);return}
   if(d>3.4){h.ty=2;h.st='wind';h.t=0;h.mt=.6;say(h.x,h.y-.9,'SHIELD RAM',1);return}
   if((R.st=='atk'||R.chain>1)&&d<2.8&&Math.random()<.65){h.st='brace';h.t=0;h.sd=2.2;say(h.x,h.y-.9,'BRACE',.9);return}
   if(d<2.4){h.ty=0;h.st='wind';h.t=0;h.mt=.5;return}h.cd=.4}return}
 if(h.st=='brace'||h.st=='stand'){h.sd-=dt;h.d=dirOf(dx,dy);if(h.st=='brace'){h.fx=fx;h.fy=fy}if(h.sd<=0){h.st='ap';h.cd=.5}return}
 if(h.st=='wind'){h.d=dirOf(dx,dy);if(h.t>=h.mt){if(h.ty==2){h.st='charge';h.t=0;h.fx=fx;h.fy=fy}else{h.st='atk';h.t=0;h.ah=0}}return}
 if(h.st=='charge'){mv(h,h.fx*11*dt,h.fy*11*dt);if(d<1.1&&R.st!='dash'&&R.z<8){hurt(1,h.x,h.y);h.st='open';h.t=0;h.open=1.4;say(h.x,h.y-.8,'SHIELD ARM DROPS',1.4);return}if(h.t>.36){h.st='open';h.t=0;h.open=1.4;say(h.x,h.y-.8,'HE STUMBLES',1.4)}return}
 if(h.st=='atk'){const fr=h.t*14*.8;if(!h.ah&&fr>=A[h.ty].hf){h.ah=1;hostResolve(h)}if(fr>=6){h.st='open';h.t=0;h.open=h.ty==0?.9:1.3;say(h.x,h.y-.8,'SHIELD ARM DROPS',1)}return}
 if(h.st=='open'){if(h.t>(h.open>1?1.1:.7)||h.open<=0){h.st='ap';h.cd=.7}return}
 if(h.st=='stag'){if(h.t>h.tm){h.st='ap';h.cd=.7}}}
