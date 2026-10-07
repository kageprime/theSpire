/* ---- Dialogue with faces + voices (spec 5.6). Portraits are drawn in code (32x32 pixels, shown at 64x64);
   swap PORT() for real PNGs later without touching anything else. ---- */
SV.tk=SV.tk||{};if(SV.vox==null)SV.vox=1;
let T=null;
const NAMEOF={ren:'REN CALDER',bram:'BRAM HOLT',edda:'EDDA VOSS',voice:'THE FLOOR VOICE',page:'A TORN PAGE'};
/* ---- portraits ---- */
const PC={};
function PORT(sp,ex){const key=sp+':'+ex;if(PC[key])return PC[key];const c=mkc(64,64),o=mkc(32,32),x=o.getContext('2d');
 const r=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a,b,w,h)},el=(cx,cy,rx,ry,col)=>{x.fillStyle=col;for(let j=Math.floor(cy-ry);j<=cy+ry;j++)for(let i=Math.floor(cx-rx);i<=cx+rx;i++)if(((i+.5-cx)/rx)**2+((j+.5-cy)/ry)**2<=1)x.fillRect(i,j,1,1)};
 const bg=x.createLinearGradient(0,0,0,32);bg.addColorStop(0,'#1c1b1f');bg.addColorStop(1,'#101014');x.fillStyle=bg;x.fillRect(0,0,32,32);for(let j=3;j<32;j+=4)r(0,j,32,1,'rgba(216,208,188,.05)');
 const brow=(lx,rx,y,an,col)=>{[[lx,1],[rx,-1]].forEach(b=>{for(let i=0;i<4;i++)r(b[0]+i,y+Math.round(an*(b[1]>0?(3-i):i)/3),1,1,col)})};
 const eye=(a,b,w,h,col,pup)=>{r(a,b,w,h,col);if(pup)r(a+1,b,1,Math.max(1,h),pup)};
 if(sp=='ren'){const sk='#c8a285',sh='#9a7660',hr='#1d1a1c';
  r(3,26,26,6,'#3a3a42');r(5,25,22,2,'#2a2a30');r(13,22,6,5,sh);r(8,26,2,6,'#7a5a3a');r(11,25,10,2,'#2a2a30');
  el(16,14,6,8,sk);r(10,15,1,5,sh);r(21,15,1,5,sh);el(16,20,4,3,sk);r(11,21,10,1,sh);
  el(16,8,7,4,hr);r(9,8,3,8,hr);r(20,8,3,8,hr);r(12,6,3,1,'#34303a');r(17,5,4,1,'#34303a');r(11,11,4,2,hr);r(17,11,5,2,hr);r(15,10,2,2,hr);
  const st=ex=='strained',br=ex=='branded';
  brow(11,17,st?12:11,st?1:0,hr);eye(12,14,3,st?1:2,'#e8dcc8');eye(18,14,3,st?1:2,'#e8dcc8');r(13,14,1,st?1:2,br?'#e8842a':'#1d1a1c');r(19,14,1,st?1:2,br?'#e8842a':'#1d1a1c');
  if(st){r(12,16,3,1,sh);r(18,16,3,1,sh);r(22,12,1,2,'#9ec0d8');r(22,14,1,1,'#9ec0d8')}
  r(15,16,2,3,sh);r(13,21,6,1,st?'#5a3a30':'#8a5a4a');if(st)r(12,22,1,1,'#5a3a30');
  if(br){x.fillStyle='#c47a3a';[[10,16],[9,17],[10,18],[9,19],[10,20],[11,19],[11,17]].forEach(p=>x.fillRect(p[0],p[1],1,1));r(21,10,1,1,'#c47a3a')}}
 else if(sp=='bram'){const sk=ex=='pressed'?'#8f9298':'#b08a6e',sh=ex=='pressed'?'#5a5e66':'#7e5e48',hr='#6a6a70';
  r(2,25,28,7,'#4a4d55');r(2,25,5,3,'#6a6e78');r(25,25,5,3,'#6a6e78');r(9,24,14,3,'#33353c');r(12,22,8,4,sh);
  r(9,7,14,15,sk);r(10,22,12,1,sk);r(9,19,14,4,hr);r(11,23,10,1,hr);r(8,9,1,12,sh);r(23,9,1,12,sh);
  r(9,5,14,4,hr);r(8,7,2,3,hr);r(22,7,2,3,hr);r(11,4,10,1,'#8a8a90');
  const yl=ex=='yielding',pr=ex=='pressed';
  r(10,11,5,1,'#4a4a50');r(17,11,5,1,'#4a4a50');if(yl){r(11,13,3,1,'#2a2420');r(18,13,3,1,'#2a2420');r(12,14,2,1,sh);r(19,14,2,1,sh)}else if(pr){eye(11,13,3,2,'#0e0d10');eye(18,13,3,2,'#0e0d10');r(12,13,1,2,'#e8842a');r(19,13,1,2,'#e8842a')}else{eye(11,13,3,2,'#d8d0bc');eye(18,13,3,2,'#d8d0bc');r(12,13,1,2,'#2a2420');r(19,13,1,2,'#2a2420')}
  r(14,15,4,3,sh);r(19,10,3,1,'#9a5a50');r(20,11,1,3,'#9a5a50');r(12,20,8,1,yl?'#2a2420':'#3a2e28');
  if(pr){x.fillStyle='#e8842a';[[13,8],[14,9],[13,10],[19,17],[20,18],[19,19],[20,20]].forEach(p=>x.fillRect(p[0],p[1],1,1))}
  if(yl){r(10,17,1,2,'#6a2a22');r(11,19,1,1,'#6a2a22')}}
 else if(sp=='edda'){const sk='#d8b8a0',sh='#b08a78',hr='#5a2e22';
  r(4,26,24,6,'#4a3a36');r(11,25,10,2,'#2a2220');r(13,22,6,4,sh);r(24,18,3,12,hr);r(25,26,2,4,'#3a1c14');
  el(16,14,6,8,sk);el(16,20,4,3,sk);r(10,15,1,5,sh);r(21,15,1,5,sh);
  el(16,7,8,5,hr);r(8,8,3,11,hr);r(21,8,3,11,hr);r(12,6,2,1,'#7a4a38');r(18,5,3,1,'#7a4a38');r(13,10,6,1,hr);
  const af=ex=='afraid';brow(11,17,af?10:12,af?-1:1,hr);
  if(af){eye(11,13,4,3,'#f0e6d8');eye(18,13,4,3,'#f0e6d8');r(12,14,2,2,'#3a5a4a');r(19,14,2,2,'#3a5a4a');r(10,18,1,3,'#9ec0d8');r(12,21,8,1,'#8a4a40');r(14,22,4,1,'#4a1a14')}
  else{eye(11,14,4,2,'#f0e6d8');eye(18,14,4,2,'#f0e6d8');r(12,14,2,2,'#3a5a4a');r(19,14,2,2,'#3a5a4a');r(11,13,4,1,sh);r(18,13,4,1,sh);r(13,21,6,1,'#8a4a40');r(19,20,1,1,'#8a4a40')}
  r(15,16,2,3,sh);r(21,21,2,1,'#6a6a70');r(11,17,3,1,'#8a8a90');r(18,22,2,1,'#8a8a90')}
 else{ /* voice: a bone mask with the Ledger diamond */
  x.clearRect(0,0,32,32);x.fillStyle='#0a090c';x.fillRect(0,0,32,32);for(let k=0;k<9;k++)r((k*13+5)%31,(k*7+3)%30,1,1,'rgba(216,208,188,.35)');
  const am=ex=='amused';r(3,27,26,5,'#1a181c');r(11,24,10,5,'#26242a');
  el(16,14,8,11,'#d8d0bc');el(16,14,6,9,'#cfc6ae');r(8,14,1,8,'#9a9484');r(23,14,1,8,'#9a9484');for(let j=8;j<24;j+=4)r(9,j,14,1,'rgba(90,90,96,.28)');
  r(15,7,2,1,'#0e0d10');r(14,8,4,1,'#0e0d10');r(13,9,6,1,'#0e0d10');r(14,10,4,1,'#0e0d10');r(15,11,2,1,'#0e0d10');
  if(am){[[10,14],[11,13],[12,13],[13,14],[19,14],[20,13],[21,13],[22,14]].forEach(p=>r(p[0],p[1],1,1,'#0e0d10'));r(10,15,4,1,'#0e0d10');r(19,15,4,1,'#0e0d10');for(let i=0;i<12;i++)r(10+i,20+(i<3||i>8?-1:0),1,1,'#0e0d10');r(12,21,8,1,'#0e0d10');r(13,22,1,1,'#0e0d10');r(16,22,1,1,'#0e0d10');r(19,22,1,1,'#0e0d10');
   r(19,9,1,3,'#0e0d10');r(20,12,1,2,'#0e0d10');r(12,16,1,1,'#e8dcc8');r(21,16,1,1,'#e8dcc8')}
  else{r(10,14,5,1,'#0e0d10');r(10,15,5,1,'#0e0d10');r(18,14,5,1,'#0e0d10');r(18,15,5,1,'#0e0d10');r(12,15,1,1,'#9a9484');r(20,15,1,1,'#9a9484');r(13,21,7,1,'#0e0d10');r(15,16,2,4,'#bdb49c')}}
 const q=c.getContext('2d');q.imageSmoothingEnabled=false;q.drawImage(o,0,0,64,64);return PC[key]=c}
/* ---- voices: per-speaker babble (blips) or browser speech ---- */
const VOX={ren:{f:190,ty:'triangle',d:.055,v:.05,lp:2400},bram:{f:100,ty:'square',d:.08,v:.035,lp:520},edda:{f:300,ty:'triangle',d:.05,v:.05,lp:3200},voice:{f:80,ty:'sawtooth',d:.1,v:.05,lp:800,det:1.5},page:{f:520,ty:'sine',d:.025,v:.02,lp:3000}};
const SPEECH={ren:[1,.95],bram:[.35,.8],edda:[1.45,1],voice:[.1,.7]};
function blip(sp,ex,ch,i){if(SV.vox!=1)return;const A=aud(),V=VOX[sp];if(!A||!MG||!V)return;const c=ch.toLowerCase();if(!/[a-z0-9]/.test(c)||i%2)return;
 const vow='aeiou'.includes(c);let f=V.f*(1+((ch.charCodeAt(0)*13)%11-5)*.035)*(vow?1.12:1);
 if(ex=='afraid')f*=1.18*(1+Math.sin(i*1.7)*.05);else if(ex=='strained')f*=.93;else if(ex=='yielding')f*=.8;else if(ex=='amused')f*=1.1;
 const now=A.currentTime,q=A.createGain(),lp=A.createBiquadFilter();lp.type='lowpass';lp.frequency.value=V.lp;q.gain.setValueAtTime(V.v,now);q.gain.exponentialRampToValueAtTime(.001,now+V.d*(vow?1.3:1));lp.connect(q);q.connect(MG);
 [[1,0],[V.det||0,V.det?1:0],[ex=='pressed'||ex=='branded'?.5:0,1]].forEach(m=>{if(!m[1]&&m[0]!=1)return;const o=A.createOscillator();o.type=V.ty;o.frequency.setValueAtTime(f*(m[0]||1),now);if(c=='?')o.frequency.exponentialRampToValueAtTime(f*1.4,now+V.d);o.connect(lp);o.start(now);o.stop(now+V.d*1.4)})}
function speak(sp,s){if(SV.vox!=2||!window.speechSynthesis)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(s),p=SPEECH[sp];if(!p)return;u.pitch=p[0];u.rate=p[1];u.volume=SV.vol;speechSynthesis.speak(u)}catch(e){}}
const hush=()=>{try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}};
/* ---- scripts: [speaker, expression, text] ---- */
const SCR={
 open:()=>!SV.tk.open?[['voice','calm','Another body through the door. The Floor is open.'],['ren','neutral','Cinder Hall. The stone is still warm.'],['voice','calm','Porter. You carried a pack into the rift and walked out with a Ledger that will not close.'],['ren','strained','It talks. I am learning to answer.'],['voice','amused','Then answer this: DESCEND.']]
  :SV.bram?[['voice','calm','Again. And you bring a pressed man to carry your weight.'],['bram','pressed','I carry what I choose, Floor.']]
  :SV.brand?[['voice','amused','The brand suits you, Ren. DESCEND.']]:[['voice','calm','Again. DESCEND.']],
 edda:()=>!SV.tk.edda?[['voice','calm','Edda Voss. Her seal is spent and her knees are down. The Floor calls that yielding.'],['edda','afraid','Ren? Ren Calder? They said the rift took the porter too.'],['ren','neutral','It took everyone. I walked out.'],['edda','defiant','Then look at me. I did not beg them, and I will not beg you.'],['voice','amused','Spare her, press her, or break her. The Ledger wants an entry.']]
  :[['voice','calm','Edda Voss kneels again. Spare, press or break.'],['edda','afraid','Ren...']],
 eddaSpare:[['edda','defiant','...You are not what the Floor wants. Good.'],['voice','amused','Well writ. The Floor will remember that you spared her.']],
 eddaPress:[['edda','afraid','Ren, wait. Ren, I can still--'],['voice','calm','Pressed. She will fight beside you and she will not mind.'],['ren','strained','She will mind.']],
 eddaBreak:[['edda','afraid','No--'],['voice','amused','Broken, and BRANDED. The Floor likes a decisive man.'],['ren','branded','...']],
 carIntro:[['voice','calm','The Carapace. A pressing that never finished. It remembers being tall.'],['ren','neutral','Then I will help it forget.']],
 bramIntro:[['bram','stoic','Ren. You came down after all.'],['ren','strained','You are alive.'],['bram','stoic','The Hollow has my name, and my shield has my arm.'],['bram','stoic','Lift your hand, porter. I will answer it.']],
 bramKneel:[['bram','yielding','Enough. The shield was always heavier than I was.'],['ren','strained','Bram.'],['bram','yielding','Press me or file me. Do not leave me standing. That is the one cruelty I would name.'],['voice','calm','Hold E. The Rite.']],
 bramPressed:[['bram','pressed','Entry accepted. I will hold the line, porter.'],['ren','neutral','Do not call me porter.'],['bram','pressed','Then do not carry my pack.']],
 bramFiled:[['voice','calm','Filed. Neatly.'],['ren','strained','He deserved better than neat.']],
 page:[['page','','Ledger page, torn. A hand Ren knows: Orin\'s.'],['page','','"Rift opened under the third landing. Kade went first. Sera counted us out loud and stopped at six."'],['ren','strained','Six. There were seven of us.'],['voice','amused','Seven. Yes. Keep counting, Ren.']]};
const TQ=[];
function talk(id,o){if(T||SV.vox==null)return;if(W.t>=0){TQ.push([id,o]);return}let s=SCR[id];s=typeof s=='function'?s():s;if(!s||!s.length)return;o=o||{};
 if(!SV.tk[id]&&(id=='open'||id=='edda')){SV.tk[id]=1;sv()}
 for(const k in K)K[k]=0;tpad.x=tpad.y=0;for(const k in TP)delete TP[k];
 T={s,i:0,ch:0,fx:o.fx,fy:o.fy,from:scene,age:0,spk:0,vista:o.vista};scene='talk';if(!SV.plain){ZT=o.vista?.92:1.1;ZH=0}if(o.vista)SFX.swell();if(o.fx!=null)T.focus=1;beginLine()}
function beginLine(){const l=T.s[T.i];T.ch=0;T.pi=0;T.spk=l[0]=='page'?'page':l[0];T.age=0;speak(l[0],l[2])}
function endTalk(){if(!T)return;hush();scene=T.from=='talk'?'play':T.from;T=null;ZT=1;ZH=0}
function talkAct(k){if(!T)return;if(k=='escape'||k=='tab'){endTalk();sfx('back');return}
 if(![' ','enter','e','j','k','arrowdown'].includes(k))return;const l=T.s[T.i];
 if(T.ch<l[2].length){T.ch=l[2].length;return}hush();sfx('tick');T.i++;if(T.i>=T.s.length)endTalk();else beginLine()}
function talkTap(x,y){if(x>440&&y>212&&y<232)talkAct('escape');else talkAct(' ')}
function talkTick(dt){if(!T)return;T.age+=dt;const l=T.s[T.i],sp=SV.vox==2?15:36;
 if(T.ch<l[2].length){T.ch=Math.min(l[2].length,T.ch+dt*sp);while(T.pi<Math.floor(T.ch)){const c=l[2][T.pi];blip(T.spk,l[1],c,T.pi);T.pi++}}
 if(T.focus){cx+=(T.fx-cx)*Math.min(1,dt*2.5);cy+=(T.fy-cy)*Math.min(1,dt*2.5)}else{cx+=(R.x-cx)*Math.min(1,dt*3);cy+=(R.y-cy)*Math.min(1,dt*3)}
 ZM+=(ZT-ZM)*Math.min(1,dt*3.5)}
function wrap(s,w){const out=[];let cur='';s.split(' ').forEach(wd=>{const n=cur?cur+' '+wd:wd;if(g.measureText(n).width>w&&cur){out.push(cur);cur=wd}else cur=n});if(cur)out.push(cur);return out}
function drawTalk(){if(T.vista){drawCine();return}const l=T.s[T.i],sp=l[0],ex=sp=='ren'&&SV.brand&&l[1]=='neutral'?'branded':l[1],bx=10,by=226,bw=492,bh=86,hasP=sp!='page',slide=Math.min(1,T.age*6);
 g.save();g.setTransform(SC,0,0,SC,0,0);const gr=g.createLinearGradient(0,170,0,320);gr.addColorStop(0,'rgba(8,7,10,0)');gr.addColorStop(1,'rgba(8,7,10,.78)');g.fillStyle=gr;g.fillRect(0,170,512,150);
 g.fillStyle='rgba(14,16,20,.9)';g.fillRect(bx,by,bw,bh);g.strokeStyle='rgba(216,208,188,.85)';g.lineWidth=1;g.strokeRect(bx+.5,by+.5,bw-1,bh-1);
 g.fillStyle='rgba(216,208,188,.05)';for(let i=3;i<bh;i+=3)g.fillRect(bx,by+i,bw,1);
 const nm=NAMEOF[sp]||'',tx=hasP?bx+90:bx+16;g.font='bold 9px '+MONO;const nw=g.measureText(nm).width+18;g.fillStyle='rgba(14,16,20,.95)';g.fillRect(tx-6,by-12,nw,13);g.strokeStyle='rgba(216,208,188,.85)';g.strokeRect(tx-5.5,by-11.5,nw,13);g.fillStyle=BONE;g.fillText(nm,tx+3,by-2);
 if(hasP){const px=bx+10-(1-slide)*14;g.globalAlpha=slide;g.fillStyle='#0a090c';g.fillRect(px-2,by+9,68,68);g.drawImage(PORT(sp,ex),px,by+11);g.strokeStyle='rgba(216,208,188,.85)';g.strokeRect(px-1.5,by+9.5,67,67);g.globalAlpha=1}
 g.font='italic 14px '+FELL;g.fillStyle=BONE;const ln=wrap(l[2].slice(0,Math.floor(T.ch)),bw-(hasP?104:34)),full=wrap(l[2],bw-(hasP?104:34));
 full.forEach((_,i)=>{if(ln[i]!=null)g.fillText(ln[i],tx,by+22+i*17)});
 if(T.ch>=l[2].length){g.save();g.translate(bx+bw-18,by+bh-12+Math.sin(T.age*6)*1.5);g.scale(.7,.7);glyph(0,0);g.restore()}
 g.font='9px '+MONO;g.fillStyle=DIM;g.textAlign='right';g.fillText(TOUCHON()?'tap: next    skip >>':'space: next    esc: skip',bx+bw-8,by-3);g.textAlign='left';g.restore()}
/* ---- barks: spoken lines in the world, in bone lettering ---- */
const SHORT={ren:'Ren',bram:'Bram',edda:'Edda',voice:'The Floor'};
function bark(sp,x,y,s,lab){const d=Math.max(1.8,s.length*.07+1);texts.push({x,y,s:(lab||SHORT[sp]||'')+': '+s,t:d,m:d});
 const n=Math.min(10,s.length);for(let i=0;i<n;i++)setTimeout(()=>blip(sp,'calm',s[i*2%s.length]||'a',0),i*55)}
const BARKS={bra:['Hold.','Behind me.','Steady, Ren.','Shield up.'],cin:['Still standing.','Pressed, not broken.','Seal holds.'],spe:['Mine is the reach.','Stay at range.'],dag:['Flank open.','Quick, Ren.'],cas:['Covering you.','Eyes up.']};
function allyBark(a){const L=a.n=='Edda Voss'?['I remember the Floor.','Do not thank me.','Keep moving, Ren.']:BARKS[a.k]||BARKS.cin;const sp=a.k=='bra'?'bram':a.n=='Edda Voss'?'edda':'ren';
 bark(sp=='ren'?'edda':sp,a.x,a.y-.4,L[Math.floor(Math.random()*L.length)],a.n.split(' ')[0])}
