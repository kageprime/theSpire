/* pointer + touch layer */
const tpad={x:0,y:0},TP={};let usedTouch=0;
const TOUCHON=()=>SV.touch==1||(SV.touch==0&&usedTouch);
const BTN=[{k:'j',x:450,y:262,r:30,l:'J'},{k:'k',x:392,y:288,r:22,l:'K'},{k:' ',x:478,y:200,r:22,l:'JUMP'},{k:'shift',x:410,y:222,r:22,l:'VEIL'},{k:'escape',x:270,y:16,r:12,l:'II'},{k:'tab',x:242,y:16,r:12,l:'L'}];
const USEB={k:'e',x:340,y:270,r:24,l:'USE'},KB=[{k:'1',l:'SPARE',x:176},{k:'2',l:'PRESS',x:256},{k:'3',l:'BREAK',x:336}];
const kneelNear=()=>H.find(h=>h.st=='kneel'&&Math.hypot(h.x-R.x,h.y-R.y)<2.6);
const useShown=()=>R.pt||Math.hypot(R.x-16.5,R.y-15.5)<1.9||(!leverDone&&Math.hypot(R.x-LEV[0],R.y-LEV[1])<1.9)||CS.some(c=>!c.o&&!c.hid&&Math.hypot(R.x-c.x,R.y-c.y)<1.6);
const btns=()=>useShown()?BTN.concat([USEB]):BTN;
const cpos=e=>{const r=C.getBoundingClientRect();return[(e.clientX-r.left)/r.width*512,(e.clientY-r.top)/r.height*320]};
function touchDown(id,x,y){const b=btns().find(o=>Math.hypot(x-o.x,y-o.y)<=o.r+6);
 if(b){TP[id]={b};if(b.k=='e')K.e=1;act(b.k);return}
 if(kneelNear()){const c=KB.find(o=>Math.abs(x-o.x)<36&&Math.abs(y-44)<16);if(c){act(c.k);return}}
 if(R.panel&&R.offer&&PNL){const i=Math.floor((y-(PNL.y+27))/32);if(x>=PNL.x&&x<=PNL.x+214&&i>=0&&i<R.offer.length){act(String(i+1));return}}
 if(x<300&&y>90)TP[id]={s:1,ox:x,oy:y,kx:0,ky:0}}
C.addEventListener('pointerdown',e=>{e.preventDefault();aud();C.focus();if(e.pointerType=='touch')usedTouch=1;const[x,y]=cpos(e);
 try{C.setPointerCapture(e.pointerId)}catch(_){}
 if(!booted)return;
 if(scene=='intro'){act(' ');return}
 if(scene=='talk'){talkTap(x,y);return}
 if(scene=='title'||scene=='pause'||scene=='options'||scene=='moves'){menuTap(x,y);return}
 if(scene=='end'||dead){act(y>=214&&y<228?'1':y>=228&&y<242?'2':y>=242&&y<256?'3':'r');return}
 if(scene=='play'&&TOUCHON())touchDown(e.pointerId,x,y)});
addEventListener('pointermove',e=>{const p=TP[e.pointerId];if(!p||!p.s)return;const[x,y]=cpos(e),dx=x-p.ox,dy=y-p.oy,l=Math.hypot(dx,dy);
 p.kx=Math.max(-28,Math.min(28,dx));p.ky=Math.max(-28,Math.min(28,dy));if(l>10){tpad.x=dx/l;tpad.y=dy/l}else tpad.x=tpad.y=0});
const pUp=e=>{const p=TP[e.pointerId];if(!p)return;if(p.b&&p.b.k=='e')K.e=0;if(p.s)tpad.x=tpad.y=0;delete TP[e.pointerId]};
addEventListener('pointerup',pUp);addEventListener('pointercancel',pUp);
function drawTouch(){if(!TOUCHON()||dead)return;g.save();g.lineWidth=2;g.textAlign='center';g.font='9px '+MONO;
 const down=new Set(Object.values(TP).map(p=>p.b).filter(Boolean));
 btns().forEach(o=>{g.fillStyle=down.has(o)?'rgba(216,208,188,.35)':'rgba(14,16,20,.5)';g.strokeStyle='rgba(216,208,188,.6)';g.beginPath();g.arc(o.x,o.y,o.r,0,6.283);g.fill();g.stroke();g.fillStyle=BONE;g.fillText(o.l,o.x,o.y+3)});
 if(R.press>0&&useShown()){g.strokeStyle=EM;g.beginPath();g.arc(USEB.x,USEB.y,USEB.r+4,-1.57,-1.57+6.283*R.press);g.stroke()}
 const st=Object.values(TP).find(p=>p.s);g.strokeStyle='rgba(216,208,188,.35)';
 if(st){g.beginPath();g.arc(st.ox,st.oy,30,0,6.283);g.stroke();g.fillStyle='rgba(216,208,188,.4)';g.beginPath();g.arc(st.ox+st.kx,st.oy+st.ky,12,0,6.283);g.fill()}
 else{g.beginPath();g.arc(80,250,30,0,6.283);g.stroke()}
 if(kneelNear())KB.forEach(c=>{g.fillStyle='rgba(14,16,20,.7)';g.strokeStyle='rgba(216,208,188,.7)';g.fillRect(c.x-34,30,68,28);g.strokeRect(c.x-34,30,68,28);g.fillStyle=BONE;g.fillText(c.l,c.x,48)});
 g.restore()}
