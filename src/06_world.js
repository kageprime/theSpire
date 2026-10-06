function say(x,y,s,d){texts.push({x,y,s,t:d||1.6,m:d||1.6});sfx((d||1.6)<1?'tick':'stamp')}
function emb(x,y,z,n,sp,c){for(let i=0;i<n&&PT.length<280;i++){const a=Math.random()*6.283,r=Math.random();PT.push({x,y,z,vx:Math.cos(a)*sp*r,vy:Math.sin(a)*sp*r,vz:40+Math.random()*90,t:0,l:.5+Math.random()*.6,c:c||0})}}
/* ---- map ---- */
const ZONES2=[[3,8,6,11,'A Hidden Writ'],[14,18,20,23,'The Kneeling Room'],[8,10,13,13,'The Bone Alcove'],[14,14,20,18,'The Quiet Seal'],[20,5,30,11,'The Long Seam'],[24,39,36,49,'Depth IV · Bram Holt'],[24,25,36,34,'Depth III · The Carapace'],[26,11,34,20,'Depth II · The Pressing Floor'],[1,1,21,10,'Depth I · The Ash Hall']];
ZONES.length=0;ZONES2.forEach(z=>ZONES.push(z));
[[14.7,19.7],[19.3,22.3],[24.7,39.7],[35.3,39.7],[24.7,48.3],[35.3,48.3],[3.7,8.7]].forEach(b=>BRZ.push(b));
function build(){M=[];for(let y=0;y<MH;y++)M.push(new Array(MW).fill(1));
 const cv=(x,y,w,h)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)M[j][i]=0};
 cv(2,2,5,5);cv(7,4,6,2);cv(13,2,7,7);cv(16,9,2,5);cv(14,14,6,4);cv(20,15,6,2);cv(26,11,8,9);cv(29,20,2,5);cv(24,25,12,9);cv(13,11,3,1);cv(8,10,5,3);
 cv(3,8,3,3);cv(20,5,10,2);cv(28,7,2,4);cv(16,18,2,1);cv(14,19,6,4);cv(29,34,2,5);cv(24,39,12,10);
 [[15,5],[18,5],[16,7],[29,15],[31,15],[27,28],[32,28],[27,31],[32,31],[27,42],[32,42],[27,45],[32,45]].forEach(p=>M[p[1]][p[0]]=1);
 M[24][29]=3;M[24][30]=3;M[38][29]=3;M[38][30]=3;M[34][29]=1;M[34][30]=1;M[5][22]=1;M[6][22]=1;ILL=[[4,7]]}
function mkH(x,y,n,k){if(k===1)k='car';k=k||'cin';const T=TY[k],b=k=='car'||k=='bra',sm=T.seal*((typeof R!='undefined'&&R&&R.hm)||1);
 return{x,y,z:0,vz:0,seal:sm,smax:sm,n:k=='car'?'The Carapace':k=='bra'?'Bram Holt':n,k,st:b?'ap':'sl',t:0,tm:0,broken:0,fl:0,reg:0,cd:1,sp:T.sp,ty:0,boss:b,lives:b?2:1,big:b,d:2,ah:0,mt:.5,str:0,open:0,mvd:0,fx:0,fy:1,bf:0,q:0,sd:0}}
const newAlly=(x,y,k,n)=>({x,y,k,n,d:1,st:'f',t:0,cd:1,hit:0,mvd:0});
function reset(){build();R={x:4.5,y:4.5,z:0,vz:0,f:[1,0],d:1,seal:4,max:4,rev:false,ash:Math.min(5,SV.veins),ac:5,chain:0,ct:0,ctw:1.4,dw:.3,wc:2,kh:0,hm:1,st:'free',t:0,at:null,cn:0,cnt:0,buf:null,jb:0,db:0,inv:0,vcd:0,dwin:0,mv:0,moving:0,sp:1,stun:0,sa:'hit',dv:[1,0],bg:[],press:0,test:0,earned:0,cracks:0,kills:0,pressed:0,seen:0,time:0,offer:null,panel:0,pt:null};
 const L=[[15.5,3.5,'cin'],[18.5,7.5,'spe'],[9.5,11.5,'dag'],[28.5,13.5,'cin'],[32.5,13.5,'spe'],[30.5,18.5,'cas'],[27.5,17.5,'dag'],[28.5,8.5,'dag'],[25.5,6,'cas']];
 H=L.map((p,i)=>mkH(p[0],p[1],NAMES[i%NAMES.length],p[2]));const e=mkH(16.5,20.5,'Edda Voss','cin');e.st='kneel';H.push(e);
 CS=[{x:11.5,y:11.5,s:'a bone fragment',ash:3,o:0,amb:1},{x:4.5,y:9.5,s:'a hidden writ',ash:4,o:0,off:1},{x:30.5,y:46.5,s:'the Ember Shard',ash:5,o:0,hid:1,fin:1}];
 dead=false;CP=[];SPK=[];PT=[];PR=[];AL=[];HS=0;texts=[];zone='';zt=0;bossOn=0;bossDone=0;bramOn=0;bramDone=0;leverDone=0;endT=0;scene='play';t=0;cx=R.x;cy=R.y;showLed=0;fade=1;
 if(SV.bram)AL.push(newAlly(3.5,4.5,'bra','Bram Holt'))}
function near(){let b=null,bd=3.2;H.forEach(h=>{if(h.st=='sl'||h.st=='kneel'||h.st=='yield')return;const d=Math.hypot(h.x-R.x,h.y-R.y);if(d<bd){bd=d;b=h}});return b}
