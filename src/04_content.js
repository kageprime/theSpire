Object.assign(FP,{guard:12,block_hit:14});
const TY={cin:{sp:1.2,seal:8,rng:2.3,keep:1.1,w:[.55,1]},spe:{sp:1.1,seal:8,rng:3.0,keep:2.3,w:[.6,1]},dag:{sp:2.0,seal:6,rng:1.7,keep:1.0,w:[.35,.5]},cas:{sp:1.0,seal:6,rng:6.5,keep:4.2,w:[.7,.8]},car:{sp:1.3,seal:16,rng:2.6,keep:1.1,w:[.5,.85]},bra:{sp:1.25,seal:18,rng:3,keep:1.2,w:[.5,1]}};
Object.assign(HA,{spe:[{an:'attack1',hf:2,r:2.7,u:0},{an:'attack2',hf:3,r:3.0,u:1}],dag:[{an:'attack2',hf:2,r:1.5,u:0},{an:'attack1',hf:1,r:1.6,u:0}],cas:[{an:'attack1',hf:3,r:0,pr:1,u:0},{an:'attack2',hf:3,r:0,pr:1,u:1}],bra:[{an:'attack2',hf:3,r:2.2,u:0},{an:'attack1',hf:3,r:2.0,u:1},{an:'attack3',hf:2,r:1.1,u:1}]});
const BGS=[{id:'ink',n:'QUICKENED INK',g:'Chain window +50%',p:'Take a crack now',on(){R.ctw=2.1;if(R.seal>1)R.seal--}},
{id:'veins',n:'EMBER VEINS',g:'+3 Ash now, Ash cap 7',p:'Seal holds 3 cracks',on(){R.ac=7;R.ash=Math.min(7,R.ash+3);R.max=3;R.seal=Math.min(R.seal,3)}},
{id:'iron',n:'IRON MARGIN',g:'Deflect window +50%',p:'Cinder Wheel costs 3 Ash',on(){R.dw=.45;R.wc=3}},
{id:'page',n:'HUNGRY PAGE',g:'Kills restore a crack',p:'Hosts hold 25% more seal',on(){R.kh=1;R.hm=1.25;H.forEach(h=>{h.smax*=1.25;h.seal*=1.25})}}];
let SV={bank:0,brand:0,slots:1,bram:0,veins:0,plain:0,intro:0,vol:.8,shk:1,touch:0};try{Object.assign(SV,JSON.parse(localStorage.getItem('vsp_save')||'{}'))}catch(e){}
const sv=()=>{try{localStorage.setItem('vsp_save',JSON.stringify(SV))}catch(e){}};
let PT=[],PR=[],AL=[],ILL=[],leverDone=0,showLed=0,ledA=0,fade=0,CPX=0,CPY=0,bramOn=0,bramDone=0,locT=0,locP=[];const pad={x:0,y:0,b:[]},LEV=[26.5,5.5];
