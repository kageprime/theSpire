/* ---- input ---- */
addEventListener('keydown',e=>{if(e.key=='Tab')e.preventDefault()});
function offerBg(){R.offer=BGS.filter(b=>!R.bg.includes(b.id)).sort(()=>Math.random()-.5).slice(0,3);R.panel=1}
function act(k){aud();if(routeAct(k))return;
 if(scene=='intro'){if(ti<LINES[il].length)ti=LINES[il].length;else{il++;ti=0;if(il>=LINES.length){SV.intro=1;sv();reset()}}return}
 if(scene=='end'||dead){if(k=='r'||k=='enter')reset();
  else if(k=='1'&&SV.slots<3&&SV.bank>=40){SV.bank-=40;SV.slots++;sv();sfx('pickup')}else if(k=='2'&&SV.veins<3&&SV.bank>=25){SV.bank-=25;SV.veins++;sv();sfx('pickup')}else if(k=='3'&&SV.brand&&SV.bank>=20){SV.bank-=20;SV.brand=0;sv();sfx('pickup')}return}
 if(k=='tab'){showLed^=1;sfx('tick');return}if(k=='p'){SV.plain^=1;sv();return}
 if(k=='1'||k=='2'||k=='3'){const n=+k,e=H.find(h=>h.st=='kneel'&&Math.hypot(h.x-R.x,h.y-R.y)<2.4);if(e){decide(e,n);return}
  if(R.panel&&R.offer&&Math.hypot(R.x-16.5,R.y-15.5)<3.6){const b=R.offer[n-1];if(b&&R.bg.length<3){b.on();R.bg.push(b.id);R.offer=R.offer.filter(o=>o!=b);sfx('stamp');say(R.x,R.y-.6,b.n,2.2);shake=4}}return}
 if(k=='j'||k=='k')R.buf={k,t:.3};else if(k==' ')R.jb=.15;else if(k=='shift'||k=='l')R.db=.15;else if(k=='e')use()}
function decide(e,n){H=H.filter(h=>h!=e);if(n==1){R.test=1;R.earned+=8;R.ash=Math.min(R.ac,R.ash+2);say(e.x,e.y-.8,'THE VOICE: WELL WRIT.',3);sfx('pickup');return}
 R.test=2;SV.brand=1;sv();shake=8;sfx('crack');
 if(n==2){AL.push(newAlly(e.x,e.y,'cin',e.n));R.pressed++;say(e.x,e.y-.8,'PRESSED: '+e.n,2.5)}else{CP.push({x:e.x,y:e.y,k:'cin',d:e.d,t:0});R.earned+=3;say(e.x,e.y-.8,'BROKEN: '+e.n,2.5)}
 say(R.x,R.y-.8,'THE VOICE BRANDS YOU',3.5)}
function use(){const sx=16.5,sy=15.5;
 if(Math.hypot(R.x-sx,R.y-sy)<1.8){R.seal=R.max;R.rev=false;R.seen=1;sfx('pickup');say(R.x,R.y,'THE LEDGER IS QUIET',2);offerBg();return}
 if(!leverDone&&Math.hypot(R.x-LEV[0],R.y-LEV[1])<1.8){leverDone=1;M[5][22]=0;M[6][22]=0;say(LEV[0],LEV[1],'A BAR SLIDES. THE SEAM OPENS.',2.6);sfx('crack');shake=5;return}
 CS.forEach(c=>{if(!c.o&&!c.hid&&Math.hypot(R.x-c.x,R.y-c.y)<1.5){c.o=1;sfx('pickup');R.ash=Math.min(R.ac,R.ash+c.ash);R.earned+=c.ash*2;say(c.x,c.y,'CLAIMED: '+c.s,2.5);emb(c.x,c.y,10,14,1.2);
  if(c.amb){say(c.x,c.y-.5,'IT WAS A WRIT. THEY WERE WAITING.',2.8);[[-1.5,1],[1.5,-1.5]].forEach((o,i)=>{const h=mkH(c.x+o[0],c.y+o[1],'Corrin','cin');if(free(h.x,h.y)){h.st='ap';H.push(h)}})}
  if(c.off)offerBg();if(c.fin)finish()}})}
function finish(){const pts=1+(R.test==1?1:0)+(R.cracks<=6?1:0)+(R.time<720?1:0)+(R.pressed>0?1:0),rk=pts>=5?'RANK SHARD III':pts>=3?'RANK SHARD II':'RANK SHARD I';R.earned+=pts*10;SV.bank+=R.earned;sv();
 R.verdict=['The Floor Voice judges the run.','Ren climbs: '+rk,'Test: '+(R.test==1?'passed':R.test==2?'failed, branded':'unmet')+(SV.bram?'   Bram walks with you':''),'Pressed: '+R.pressed+'   Cracks: '+R.cracks+'   Time: '+Math.floor(R.time)+'s','Ash banked: '+R.earned];scene='end';t=0;sfx('fin')}
