const ld=u=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src=u});
let READY=0,KA,TS,CP=[],SPK=[],HS=0,SPI;const SH={};
Promise.all([ld(AS.tiles),ld(KN),ld(SHEETS.spark)].concat(['ren','cin','car','bra','spe','dag','cas'].flatMap(k=>{const S=SH[k]={cell:SHEETS[k].cell,ax:SHEETS[k].ax,ay:SHEETS[k].ay};return[ld(SHEETS[k].sh).then(i=>S.sh=i)].concat(Object.keys(SHEETS[k].an).map(a=>ld(SHEETS[k].an[a]).then(i=>S[a]=i)))}))).then(a=>{TS=a[0];KA=a[1];SPI=a[2];READY=1});
