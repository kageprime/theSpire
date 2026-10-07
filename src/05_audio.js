/* ---- audio ---- */
let AX,NB,drone,MG;
function aud(){if(AX)return AX;try{AX=new(window.AudioContext||window.webkitAudioContext)();MG=AX.createGain();MG.gain.value=SV.vol;MG.connect(AX.destination);loadSamples();const n=AX.sampleRate*.5,b=AX.createBuffer(1,n,AX.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;NB=b;
 const lp=AX.createBiquadFilter();lp.type='lowpass';lp.frequency.value=180;const gn=AX.createGain();gn.gain.value=.05;lp.connect(gn);gn.connect(MG);
 const os=[];[55,55.6,82.4].forEach((f,i)=>{const o=AX.createOscillator();o.type=i<2?'sawtooth':'triangle';o.frequency.value=f;o.connect(lp);o.start();os.push(o)});
 const lf=AX.createOscillator(),lg=AX.createGain();lf.frequency.value=.07;lg.gain.value=70;lf.connect(lg);lg.connect(lp.frequency);lf.start();drone={lp,os}}catch(e){}return AX}
function tone(f,d,ty,v,f2){const A=aud();if(!A)return;const o=A.createOscillator(),q=A.createGain();o.type=ty||'square';o.frequency.setValueAtTime(f,A.currentTime);if(f2)o.frequency.exponentialRampToValueAtTime(f2,A.currentTime+d);q.gain.value=v||.06;q.gain.exponentialRampToValueAtTime(.001,A.currentTime+d);o.connect(q);q.connect(MG);o.start();o.stop(A.currentTime+d)}
function nois(d,fq,v,hp){const A=aud();if(!A||!NB)return;const s=A.createBufferSource();s.buffer=NB;const f=A.createBiquadFilter();f.type=hp?'highpass':'lowpass';f.frequency.value=fq;const q=A.createGain();q.gain.value=v;q.gain.exponentialRampToValueAtTime(.001,A.currentTime+d);s.connect(f);f.connect(q);q.connect(MG);s.start();s.stop(A.currentTime+d)}
function snd(f,d,ty){tone(f,d,ty,.05)}
const SFX={stamp(){tone(70,.12,'sine',.18,40);nois(.04,3000,.08,1)},tick(){nois(.03,4000,.03,1)},hit(){nois(.09,1800,.14);tone(140,.08,'square',.05,70)},deflect(){tone(1200,.18,'triangle',.08,700);nois(.06,5000,.1,1)},fin(){tone(60,.35,'sawtooth',.15,30);nois(.25,900,.18)},swing(){nois(.12,2500,.05,1)},pickup(){tone(520,.1,'triangle',.07);setTimeout(()=>tone(780,.14,'triangle',.07),90)},crack(){nois(.2,700,.2);tone(90,.2,'square',.1,45)},press(){tone(110,.6,'sawtooth',.1,220)}};
const sfx=n=>{try{if(playSmp(n))return;SFX[n]()}catch(e){}};
