/* scene manager: boot > title > intro > play <> pause/options/moves > death/end */
const FELL='Fell,Georgia,serif';
let HIDE=0,mi=0,optFrom='title',tT=0,tStamped=0,FREADY=0,booted=0,MR=[];
const SMPMAP={mtick:'click',confirm:'confirm',back:'back',tstamp:'thud'},SMPB={};
SFX.mtick=SFX.tick;SFX.confirm=SFX.pickup;SFX.back=SFX.tick;SFX.tstamp=SFX.stamp;
function loadSamples(){if(!AX||typeof AUD=='undefined')return;Object.keys(AUD).forEach(k=>fetch(AUD[k]).then(r=>r.arrayBuffer()).then(b=>AX.decodeAudioData(b)).then(d=>SMPB[k]=d).catch(()=>{}))}
function playSmp(n){const b=SMPB[SMPMAP[n]];if(!b||!AX||!MG)return 0;const s=AX.createBufferSource(),q=AX.createGain();s.buffer=b;q.gain.value=.6;s.connect(q);q.connect(MG);s.start();return 1}
const MOVES=[['WASD / stick','move'],['J','attack, chain J J J'],['K','launcher, plunge in air'],['Space','jump'],['Shift','Ash-veil dash'],['J as a hit lands','deflect'],['E','use; hold E: Rite of Pressing'],['1 2 3','sign a writ; spare, press, break'],['Tab','open the Ledger'],['P','plain readout'],['Esc','pause']];
const toggleFS=()=>{try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch(e){}};
const optItems=()=>[
 {t:'Volume',v:()=>'|'.repeat(Math.round(SV.vol*10))+'.'.repeat(10-Math.round(SV.vol*10)),l:d=>{SV.vol=Math.max(0,Math.min(1,Math.round((SV.vol+d*.1)*10)/10));if(MG)MG.gain.value=SV.vol;sv();sfx('mtick')}},
 {t:'Screen shake',v:()=>['off','half','full'][Math.round(SV.shk*2)],l:d=>{SV.shk=Math.max(0,Math.min(1,SV.shk+d*.5));sv();sfx('mtick')}},
 {t:'Plain readout',v:()=>SV.plain?'on':'off',l:()=>{SV.plain=SV.plain?0:1;sv();sfx('mtick')}},
 {t:'Touch controls',v:()=>['auto','on','off'][SV.touch],l:d=>{SV.touch=(SV.touch+d+3)%3;sv();sfx('mtick')}},
 {t:'Pixel fit',v:()=>SV.fit?'fill':'sharp',l:()=>{SV.fit^=1;sv();fitCanvas();sfx('mtick')}},
 {t:'Voices',v:()=>['off','blips','speech'][SV.vox],l:d=>{SV.vox=(SV.vox+d+3)%3;hush();sv();sfx('mtick')}}]
 .concat(document.fullscreenEnabled?[{t:'Fullscreen',v:()=>document.fullscreenElement?'on':'off',l:toggleFS}]:[]).concat([{t:'Back',f:()=>closeOptions()}]);
const titleItems=()=>[{t:'Descend',f:()=>startRun()},{t:'Options',f:()=>openOptions('title')}];
const pauseItems=()=>[{t:'Resume',f:()=>resume()},{t:'Moves',f:()=>{scene='moves'}},{t:'Options',f:()=>openOptions('pause')},{t:'Abandon dive',f:()=>abandon()}];
function toTitle(){reset();pendOpen=0;H=[];scene='title';tT=0;tStamped=0;mi=0;R.x=18.6;R.y=15.8;AL.forEach(a=>{a.x=R.x+.9;a.y=R.y-.3});cx=17.4;cy=15.9}
function startRun(){sfx('confirm');if(!SV.intro){scene='intro';il=0;ti=0;tT=0}else reset()}
function openOptions(f){optFrom=f;scene='options';mi=0;sfx('confirm')}
function closeOptions(){scene=optFrom;mi=0;sfx('back')}
function pauseGame(){for(const k in K)K[k]=0;tpad.x=tpad.y=0;scene='pause';mi=0;sfx('mtick')}
function resume(){scene='play';sfx('back')}
function abandon(){SV.bank+=Math.floor(R.earned);sv();toTitle()}
function menuAct(k,it,back){const n=it.length;
 if(k=='arrowup'||k=='w'){mi=(mi+n-1)%n;sfx('mtick')}else if(k=='arrowdown'||k=='s'){mi=(mi+1)%n;sfx('mtick')}
 else if(k=='arrowleft'||k=='a'){it[mi].l&&it[mi].l(-1)}else if(k=='arrowright'||k=='d'){it[mi].l&&it[mi].l(1)}
 else if(k=='enter'||k==' '||k=='e'||k=='j'){const o=it[mi];if(o.f){o.f();sfx('confirm')}else if(o.l)o.l(1)}
 else if(back&&(k=='escape'||k=='shift'||k=='backspace'))back()}
function routeAct(k){
 if(!booted)return 1;
 if(scene=='title'){menuAct(k,titleItems(),null);return 1}
 if(scene=='options'){menuAct(k,optItems(),closeOptions);return 1}
 if(scene=='pause'){menuAct(k,pauseItems(),resume);return 1}
 if(scene=='talk'){talkAct(k);return 1}
 if(scene=='moves'){if(['escape','enter',' ','shift','backspace','e'].includes(k)){scene='pause';mi=1;sfx('back')}return 1}
 if(scene=='intro'&&k=='escape'){SV.intro=1;sv();reset();return 1}
 if(scene=='play'&&!dead&&k=='escape'){pauseGame();return 1}
 return 0}
function menuTap(x,y){if(scene=='moves'){routeAct('escape');return}
 const r=MR.find(r=>x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h);if(!r)return;mi=r.i;
 const o=(scene=='title'?titleItems():scene=='options'?optItems():pauseItems())[r.i];
 if(o.f){o.f();sfx('confirm')}else if(o.l)o.l(x<r.x+r.w*.5?-1:1)}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&scene=='play'&&!dead)pauseGame()});
function drawMenu(it,x,y,lh,w,fs,ctr){MR=[];g.textBaseline='alphabetic';it.forEach((o,i)=>{const yy=y+i*lh,sel=i==mi;MR.push({x:x-w/2,y:yy-lh*.7,w,h:lh,i});
 g.font='italic '+fs+'px '+FELL;g.textAlign=ctr?'center':'left';g.fillStyle=sel?BONE:'#7a766c';g.fillText(o.t,ctr?x:x-w/2+24,yy);
 if(sel){g.save();g.translate(ctr?x-g.measureText(o.t).width/2-16:x-w/2+10,yy-fs*.32);g.scale(.8,.8);glyph(0,0);g.restore()}
 if(o.v){g.textAlign='right';g.font='11px '+MONO;g.fillText(o.v(),x+w/2-8,yy)}});g.textAlign='left'}
function drawTitle(){
 let gr=g.createLinearGradient(0,170,0,320);gr.addColorStop(0,'rgba(8,7,10,0)');gr.addColorStop(1,'rgba(8,7,10,.92)');g.fillStyle=gr;g.fillRect(0,170,512,150);
 gr=g.createLinearGradient(0,0,0,135);gr.addColorStop(0,'rgba(8,7,10,.92)');gr.addColorStop(.75,'rgba(8,7,10,.8)');gr.addColorStop(1,'rgba(8,7,10,0)');g.fillStyle=gr;g.fillRect(0,0,512,135);
 const s=Math.min(1,tT/.5);if(s>=.9&&!tStamped){tStamped=1;sfx('tstamp');shake=6}
 g.save();g.translate(256,76);const sc=1+(1-s)*.3;g.scale(sc,sc);g.globalAlpha=s;g.textAlign='center';g.fillStyle=BONE;g.font='46px '+FELL;
 try{g.letterSpacing='9px'}catch(e){}g.fillText('VEILSPIRE',4,0);try{g.letterSpacing='0px'}catch(e){}
 if(SV.brand){g.strokeStyle='#0e0d10';g.lineWidth=2;g.beginPath();g.moveTo(-22,-40);g.lineTo(-10,-22);g.lineTo(-24,-8);g.lineTo(-8,8);g.stroke()}
 g.restore();g.globalAlpha=Math.min(1,Math.max(0,(tT-.8)*1.5));g.textAlign='center';g.fillStyle='#9a9484';g.font='italic 14px '+FELL;g.fillText('Hollow I: Cinder Hall',256,100);g.globalAlpha=1;
 drawMenu(titleItems(),256,214,26,200,19,1);g.textAlign='center';
 if(SV.bank){g.font='10px '+MONO;g.fillStyle=EM;g.fillText('ASH IN THE BANK  '+SV.bank,256,270)}
 g.font='9px '+MONO;g.fillStyle=DIM;g.fillText(TOUCHON()?'tap to choose':'W S choose   Enter confirm',256,306);g.textAlign='left'}
function dimWorld(){g.fillStyle='rgba(8,7,10,.55)';g.fillRect(0,0,512,320);g.globalCompositeOperation='saturation';g.fillStyle='rgba(128,128,128,.8)';g.fillRect(0,0,512,320);g.globalCompositeOperation='source-over'}
function drawMenuScene(){dimWorld();
 if(scene=='options'){const it=optItems();panel(96,36,320,44+it.length*28,'OPTIONS',1);drawMenu(it,256,100,28,296,16)}
 else if(scene=='moves'){panel(52,26,408,50+MOVES.length*18,'MOVES',1);g.font='10px '+MONO;MOVES.forEach((m,i)=>{g.fillStyle=BONE;g.fillText(m[0],66,60+i*18);g.fillStyle='#9a9484';g.fillText(m[1],196,60+i*18)});g.fillStyle=DIM;g.fillText('any key to return',66,60+MOVES.length*18+10)}
 else{panel(36,36,200,156,'THE LEDGER IS CLOSED',1);drawMenu(pauseItems(),136,84,32,176,17);
  panel(250,36,226,156,'THIS DIVE',1);g.font='italic 12px '+FELL;g.fillStyle=BONE;g.fillText(zone||'Cinder Hall',260,66);g.font='10px '+MONO;
  [['TIME',Math.floor(R.time)+'s'],['CRACKS',R.cracks],['PRESSED',R.pressed],['ASH',Math.floor(R.ash)+' / '+R.ac],['WRITS',R.bg.length?R.bg.length+' signed':'none'],['BRAND',SV.brand?'marked':'clear']].forEach((r,i)=>{g.fillStyle='#9a9484';g.fillText(r[0],260,86+i*17);g.fillStyle=BONE;g.fillText(String(r[1]),360,86+i*17)});
  g.font='9px '+MONO;g.fillStyle=DIM;g.fillText('Abandoning banks the Ash you earned.',40,212)}}
function renderIntro(){g.setTransform(SC,0,0,SC,0,0);g.fillStyle=CH;g.fillRect(0,0,512,320);drawPT();
 const bh=Math.round(40*Math.min(1,tT/1.2));g.fillStyle='#050406';g.fillRect(0,0,512,bh);g.fillRect(0,320-bh,512,bh);
 g.save();g.translate(256,112);const p=3.2+.12*Math.sin(t*2);g.scale(p,p);g.globalAlpha=.8;glyph(il>=3?-1.2:0,0);if(il>=3)glyph(1.2,0);g.restore();
 g.textAlign='center';if(il==0){g.fillStyle='#3a3a42';g.font='11px '+FELL;g.fillText('V E I L S P I R E',256,64)}
 const s=LINES[il].slice(0,Math.floor(ti));g.fillStyle=BONE;g.font='italic 15px '+FELL;g.fillText(s,256,204);
 g.fillStyle=DIM;g.font='10px '+FELL;g.fillText(il==LINES.length-1&&ti>=LINES[il].length?'press space to enter the Hollow':'space to continue   esc to skip',256,300);g.textAlign='left'}
function render(){
 if(!booted){g.setTransform(SC,0,0,SC,0,0);g.fillStyle='#0e0d10';g.fillRect(0,0,512,320);g.fillStyle=DIM;g.font='11px Georgia';g.textAlign='center';g.fillText('reading the Ledger…',256,160);g.textAlign='left';return}
 if(scene=='intro'){renderIntro();return}
 HIDE=scene=='title'||scene=='talk'||(scene=='options'&&optFrom=='title')?1:0;renderPlay();HIDE=0;
 if(scene=='title')drawTitle();else if(scene=='options'||scene=='pause'||scene=='moves')drawMenuScene();else if(scene=='play')drawTouch();else if(scene=='talk')drawTalk()}
