/* ---- update ---- */
const atkCount=()=>H.filter(h=>h.st=='wind'||h.st=='atk'||h.st=='charge').length;
function upd(dt){t+=dt;shake*=.85;texts.forEach(x=>x.t-=dt);texts=texts.filter(x=>x.t>0);zt-=dt;SPK.forEach(s=>s.t+=dt);SPK=SPK.filter(s=>s.t<.3);CP.forEach(c=>c.t+=dt);
 PT.forEach(p=>{p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;if(p.c!=2)p.vz-=240*dt});PT=PT.filter(p=>p.t<p.l&&p.z>-4);fade=Math.max(0,fade-dt*1.4);
 if(scene!='play')return;cx+=(R.x-cx)*Math.min(1,dt*5);cy+=(R.y-cy)*Math.min(1,dt*5);
 BRZ.forEach(b=>{if(Math.abs(b[0]-R.x)<9&&Math.abs(b[1]-R.y)<9&&Math.random()<.02)PT.push({x:b[0],y:b[1],z:24,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,vz:20+Math.random()*25,t:0,l:1.2+Math.random(),c:2})});
 if(drone)drone.lp.frequency.value=(bossOn&&!bossDone)||(bramOn&&!bramDone)?320:180;
 if(dead){R.t+=dt;return}if(HS>0){HS-=dt;return}
 R.time+=dt;R.t+=dt;R.inv-=dt;R.vcd-=dt;R.dwin-=dt;R.ct-=dt;R.cnt-=dt;
 if(R.ct<=0&&R.chain>0){R.chain=0;say(R.x,R.y-.6,'CHAIN BROKEN',.9)}
 if(R.buf){R.buf.t-=dt;if(R.buf.t<=0)R.buf=null;else if(canAct()&&tryAtk(R.buf.k))R.buf=null}
 if(R.jb>0){R.jb-=dt;if(jump())R.jb=0}if(R.db>0){R.db-=dt;if(dash())R.db=0}
 let dx=(K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0)+pad.x+tpad.x,dy=(K.s||K.arrowdown?1:0)-(K.w||K.arrowup?1:0)+pad.y+tpad.y;R.moving=0;
 if(R.st=='free'){if(dx||dy){let vx=dx+dy,vy=dy-dx;const l=Math.hypot(vx,vy);vx/=l;vy/=l;const s=3.2*dt*(R.z>0?.85:1);mv(R,vx*s,vy*s);R.f=[vx,vy];R.d=dirOf(vx,vy);R.moving=1;R.mv+=dt}}
 else if(R.st=='dash'){if(R.t<.3)mv(R,R.dv[0]*8.5*dt,R.dv[1]*8.5*dt);if(R.t>.42)R.st='free'}
 else if(R.st=='stun'){if(R.t>R.stun)R.st='free'}
 else if(R.st=='atk'){const a=R.at,A=AD[a.s];a.t+=dt;const fr=a.t*14*R.sp;if(!A.air&&fr<3)mv(R,R.f[0]*1.4*dt,R.f[1]*1.4*dt);A.hf.forEach(f=>{if(!a.h[f]&&fr>=f){a.h[f]=1;doHit(a.s)}});if(fr>=6){R.st='free';R.cnt=.4;R.at=null}}
 if(R.z>0||R.vz!=0){R.vz-=560*dt;R.z+=R.vz*dt;if(R.z<=0){R.z=0;R.vz=0;if(R.st=='atk'&&R.at.s=='plunge'){doHit('plunge');shake=7;SPK.push({x:R.x,y:R.y,z:4,t:0});emb(R.x,R.y,2,20,2.4)}}}
 /* pressing */
 const pt=H.find(h=>((h.broken>0&&!h.boss&&h.st!='air')||h.st=='yield')&&Math.hypot(h.x-R.x,h.y-R.y)<(h.st=='yield'?2.4:1.8));R.pt=pt;
 if(K.e&&pt&&R.st=='free'&&(pt.k=='bra'||R.ash>=2)){R.press+=dt/.8;if(R.press>=1){R.press=0;doPress(pt)}}else R.press=Math.max(0,R.press-dt*2);
 const z=ZONES.find(z=>R.x>=z[0]&&R.x<z[2]&&R.y>=z[1]&&R.y<z[3]);if(z&&z[4]!=zone){zone=z[4];zt=3.5;if(zone.indexOf('Depth')==0&&zone.indexOf('Depth I ')!=0){fade=.9;sfx('stamp')}}
 if(R.panel&&Math.hypot(R.x-16.5,R.y-15.5)>3.8)R.panel=0;
 if(!bossOn&&R.y>25.6&&R.x>23){bossOn=1;M[24][29]=1;M[24][30]=1;H.push(mkH(30.5,29.5,0,'car'));say(30,28,'THE WAY CLOSES',2.5)}
 if(!bramOn&&R.y>39.6){bramOn=1;M[38][29]=1;M[38][30]=1;const b=mkH(30.5,43.5,0,'bra');b.cd=1.6;H.push(b);say(30,41,'THE WAY CLOSES',2.5)}
 /* projectiles */
 PR.forEach(p=>{p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(solid(p.x,p.y)||p.t>3){p.dead=1;emb(p.x,p.y,10,5,1.2);return}
  if(!p.rf&&Math.hypot(R.x-p.x,R.y-p.y)<.55&&R.z<10&&R.st!='dash'&&R.inv<=0){if(!p.u&&R.dwin>0&&R.st=='atk'&&R.at.s=='attack1'){p.rf=1;p.vx*=-1.3;p.vy*=-1.3;say(R.x,R.y-.5,'REFLECT',1);sfx('deflect');R.chain++;R.ct=R.ctw;HS=.06}else{p.dead=1;hurt(p.u,p.x,p.y)}}
  if(p.rf)H.slice().forEach(h=>{if(!p.dead&&Math.hypot(h.x-p.x,h.y-p.y)<.8){p.dead=1;sealDmg(h,3.5);SPK.push({x:h.x,y:h.y,z:22,t:0})}})});PR=PR.filter(p=>!p.dead);
 /* allies */
 AL.forEach(a=>{a.t+=dt;a.cd-=dt;const tg=H.filter(h=>!['sl','kneel','yield','getup'].includes(h.st)).sort((p,q)=>Math.hypot(p.x-a.x,p.y-a.y)-Math.hypot(q.x-a.x,q.y-a.y))[0],td=tg?Math.hypot(tg.x-a.x,tg.y-a.y):99,A=HA[a.k][0],reach=a.k=='bra'?2.2:A.pr?4:Math.min(2.4,A.r);a.mvd=0;
  if(a.st=='atk'){const fr=a.t*14*.9;if(!a.hit&&fr>=A.hf){a.hit=1;H.slice().forEach(h=>{if(['sl','kneel','yield'].includes(h.st))return;if(Math.hypot(h.x-a.x,h.y-a.y)<(a.k=='bra'?2.3:A.pr?5:A.r+.2)){if(!sealDmg(h,a.k=='bra'?1.4:1.1)){SPK.push({x:h.x,y:h.y,z:22,t:0});if(!h.big&&!['air','down'].includes(h.st))mv(h,(h.x-a.x)*.08,(h.y-a.y)*.08)}}})}if(fr>=6){a.st='f';a.cd=a.k=='bra'?1.4:1.1}return}
  if(tg&&td<7){a.d=dirOf(tg.x-a.x,tg.y-a.y);if(td>reach-.4){mv(a,(tg.x-a.x)/td*2.6*dt,(tg.y-a.y)/td*2.6*dt);a.mvd=1}if(td<reach&&a.cd<=0){a.st='atk';a.t=0;a.hit=0}}
  else{const rx=R.x-a.x,ry=R.y-a.y,rd=Math.hypot(rx,ry);if(rd>2.2){mv(a,rx/rd*3*dt,ry/rd*3*dt);a.mvd=1;a.d=dirOf(rx,ry)}}});
 /* hosts */
 H.slice().forEach(h=>{h.fl-=dt;h.t+=dt;if(h.broken>0)h.broken-=dt;const dx=R.x-h.x,dy=R.y-h.y,d=Math.hypot(dx,dy)||.01,A=HA[h.k],T=TY[h.k];
  if(h.st=='kneel')return;if(h.st=='yield'){if(h.broken<=0)resolveBram(0);return}
  if(h.st=='air'){h.vz-=560*dt;h.z+=h.vz*dt;if(h.z<=0){h.z=0;h.vz=0;if(h.sk){h.sk=0;if(!sealDmg(h,3)){shake=7;SPK.push({x:h.x,y:h.y,z:4,t:0});emb(h.x,h.y,2,16,2.2)}}if(H.includes(h)){h.st=h.broken>0?'broken':'down';h.t=0}}return}
  if(h.st=='sl'){if(d<4.5){h.st='getup';h.t=0;h.d=dirOf(dx,dy)}return}
  if(h.st=='getup'){if(h.t>.75){h.st='ap';h.cd=.6}return}
  if(h.st=='down'){if(h.t>.6){h.st='getup';h.t=0}return}
  if(h.st=='broken'){if(h.broken<=0){h.seal=h.smax;h.st='ap';h.cd=1}return}
  h.reg+=dt;if(h.seal<h.smax&&h.reg>.6&&h.k!='bra')h.seal=Math.min(h.smax,h.seal+(R.chain?.4:1.6)*dt);
  if(h.k=='bra'){bramAI(h,dt,dx,dy,d);return}
  if(h.st=='ap'){h.d=dirOf(dx,dy);h.cd-=dt;h.mvd=0;
   if(h.k=='cas'){if(d<T.keep-1){mv(h,-dx/d*h.sp*dt,-dy/d*h.sp*dt);h.mvd=1}else if(d>T.keep+1){mv(h,dx/d*h.sp*dt,dy/d*h.sp*dt);h.mvd=1}}
   else if(d>T.keep){mv(h,dx/d*h.sp*dt,dy/d*h.sp*dt);h.mvd=1}
   if(h.cd<=0){if(d<T.rng&&atkCount()<2){const i=h.k=='car'?Math.floor(Math.random()*3):(Math.random()<.4?1:0);h.ty=i;h.st='wind';h.t=0;h.mt=A[i].u?T.w[1]:T.w[0];if(A[i].u)say(h.x,h.y-.9,'UNBLOCKABLE',1)}else h.cd=.3}}
  else if(h.st=='wind'){h.d=dirOf(dx,dy);if(h.t>=h.mt){h.st='atk';h.t=0;h.ah=0}}
  else if(h.st=='atk'){const fr=h.t*14*.8;if(!h.ah&&fr>=A[h.ty].hf){h.ah=1;hostResolve(h)}if(fr>=6){h.st='rec';h.t=0}}
  else if(h.st=='rec'){if(h.t>(h.k=='dag'?.3:.5)){h.st='ap';h.cd=(h.k=='car'?.6:h.k=='dag'?.5:1)+Math.random()*.7}}
  else if(h.st=='stag'){if(h.t>h.tm){h.st='ap';h.cd=.7}}})}
