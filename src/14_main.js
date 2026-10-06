let last=performance.now();
try{Promise.all([document.fonts.load('46px Fell'),document.fonts.load('italic 15px Fell')]).then(()=>FREADY=1)}catch(e){FREADY=1}setTimeout(()=>FREADY=1,2500);
function step(dt){
 if(scene=='title'||scene=='intro'||(scene=='options'&&optFrom=='title')){tT+=dt;upd(dt);
  if(PT.length<120&&Math.random()<.5)PT.push({x:cx+(Math.random()-.5)*12,y:cy+(Math.random()-.5)*12,z:Math.random()*30,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,vz:15+Math.random()*25,t:0,l:2+Math.random()*2,c:2});
  if(scene!='intro'){cx=17.4+Math.sin(t*.13);cy=15.9+Math.cos(t*.1)*.6}}
 else upd(dt)}
function loop(n){const dt=Math.min(.05,(n-last)/1000);last=n;if(READY&&FREADY&&!booted){booted=1;toTitle()}
 pollPad();if(scene=='intro'&&ti<LINES[il].length)ti+=dt*28;step(dt);render();requestAnimationFrame(loop)}
requestAnimationFrame(loop);C.focus();
