const FP={idle:6,walk:10,jump:12,hit:12,hit_heavy:12,launch:14,tumble:12,knockdown:10,getup:8,dash:16,death:8,attack1:14,attack2:14,attack3:14,launcher:14,air1:14,plunge:14};
const AD={attack1:{hf:[2],cf:4,dm:1,r:1.7,arc:1},attack2:{hf:[1,2,3,4],cf:4,dm:.55,r:1.6,arc:1},attack3:{hf:[2,3,4],cf:5,dm:.85,r:2.1,arc:0},launcher:{hf:[2,3],cf:4,dm:.7,r:1.6,arc:1,lau:1},air1:{hf:[2,3],cf:4,dm:.7,r:1.9,arc:0,air:1},plunge:{hf:[],cf:5,dm:2.2,r:1.9,arc:0,air:1,spike:1}};
const CHAIN=['attack1','attack2','attack3'],HA={cin:[{an:'attack1',hf:2,r:1.6,u:0},{an:'attack3',hf:2,r:1.9,u:1}],car:[{an:'attack1',hf:2,r:1.9,u:0},{an:'attack2',hf:3,r:2.5,u:1},{an:'attack3',hf:3,r:2.4,u:0}]};
const dirOf=(vx,vy)=>((Math.round(Math.atan2(vx+vy,vx-vy)/.7854)%8)+8)%8;
const NM={attack1:'SURFACE CUT',attack2:'FLOWING CHAIN',attack3:'CINDER WHEEL',launcher:'RISING STRIKE',air1:'AERIAL CUT',plunge:'PLUNGE'};
function sp(k,an,fr,dir,x,y,z,al){const S=SH[k],im=S[an];if(!im)return;g.globalAlpha=al==null?1:al;g.drawImage(im,fr*S.cell,dir*S.cell,S.cell,S.cell,Math.round(x-S.ax),Math.round(y-S.ay-z),S.cell,S.cell);g.globalAlpha=1}
function shd(k,x,y){const S=SH[k];g.drawImage(S.sh,Math.round(x-S.ax),Math.round(y-S.ay))}
const fi=(tm,k,loop)=>{const f=Math.floor(tm*k);return loop?f%6:Math.min(5,f)};
const canAct=()=>R.st=='free'||(R.st=='atk'&&R.at.t*14*R.sp>=AD[R.at.s].cf)||(R.st=='dash'&&R.t>.25);
function jump(){if(R.st!='free'||R.z>0)return 0;R.vz=215;R.z=.1;snd(420,.08,'triangle');return 1}
function dash(){if(R.vcd>0||!canAct())return 0;let dx=(K.d?1:0)-(K.a?1:0),dy=(K.s?1:0)-(K.w?1:0);R.dv=dx||dy?[(dx+dy),(dy-dx)]:[R.f[0],R.f[1]];const l=Math.hypot(...R.dv)||1;R.dv=[R.dv[0]/l,R.dv[1]/l];R.f=R.dv;R.d=dirOf(R.dv[0],R.dv[1]);R.st='dash';R.t=0;R.inv=.4;R.vcd=.7;R.at=null;snd(520,.12,'triangle');return 1}
function mv(o,dx,dy){if(free(o.x+dx,o.y))o.x+=dx;if(free(o.x,o.y+dy))o.y+=dy}
function drawSpk(){SPK.forEach(s=>{const[sx,sy]=P(s.x,s.y),i=1+Math.floor(s.t/.3*20),m=i%6,r=Math.floor(i/6);g.drawImage(SPI,m*100,r*100,100,100,Math.round(sx-30),Math.round(sy-s.z-30),60,60)})}
function drawCorpse(c){const[sx,sy]=P(c.x,c.y);shd(c.k,Math.round(sx),Math.round(sy));sp(c.k,'death',fi(c.t,8),c.d,Math.round(sx),Math.round(sy),0,.95)}
const hsh=(i,j)=>((i*374761393+j*668265263)^(i*j*2654435761))>>>0;
const vis=(i,j)=>{const[x,y]=P(i+.5,j+.5);return x>-70&&x<582&&y>-60&&y<400};
function floorText(x,y,l1,l2){const[sx,sy]=P(x,y);g.save();g.translate(sx,sy);g.transform(1,.5,-1,.5,0,0);g.fillStyle=BONE;g.globalAlpha=.8;g.textAlign='center';g.font='italic 9px Fell,Georgia';g.fillText(l1,0,-4);g.font='bold 14px Fell,Georgia';g.fillText(l2,0,12);g.restore();g.textAlign='left'}
const kd=(k,sx,sy)=>{const m=KM[k];g.drawImage(KA,m[0],m[1],m[2],m[3],Math.round(sx+m[4]),Math.round(sy+m[5]),m[2],m[3])};
function fv(h,i,j){const r=h%20,pu=Math.sin(t*2+i+j*1.7)>0?1:0;if(h%11==0)return'f5';return r<8?'f0':r<12?'f1':r<14?'f2':r<15?'f6':r<17?'c'+pu:r<19?'c'+(2+pu):'f4'}
function floor(){const i0=Math.floor(cx)-11,j0=Math.floor(cy)-11;
 for(let j=j0;j<j0+23;j++)for(let i=i0;i<i0+23;i++){if(i<0||j<0||i>=MW||j>=MH||M[j][i]==1||!vis(i,j))continue;
  const[sx,sy]=P(i,j);kd(fv(hsh(i,j),i,j),sx,sy);aoTile(i,j,sx,sy)}
 drawDecals();const[a,b]=P(16.5,15.5);g.drawImage(TS,0,120,96,48,Math.round(a-48),Math.round(b-24),96,48);
 floorText(4.5,4.9,'The Floor Voice sets the test:','DESCEND.')}
function wallS(i,j){const[sx,sy]=P(i,j),h=hsh(i,j)%7,F=(a,b)=>{const y=j+b,x=i+a;return y>=0&&x>=0&&y<MH&&x<MW&&M[y][x]!=1},nm=['stoneWall','stoneWall','stoneWall','stoneWall','stoneWallAged','stoneWallAged','stoneWallBroken'][h];
 const n=F(0,1),w=F(1,0),s=F(0,-1),e=F(-1,0);
 if(n&&w&&s&&e){kd('col',sx,sy);return}
 if(s)kdw('stoneWallHalf_S',sx,sy,i,j);if(e)kdw('stoneWallHalf_E',sx,sy,i,j);if(n)kdw(nm+'_N',sx,sy,i,j);if(w)kdw(nm+'_W',sx,sy,i,j)}
function fogS(i,j){const[sx,sy]=P(i,j);g.drawImage(TS,256+(Math.floor(t*3)%2)*64,32,64,56,Math.round(sx-32),Math.round(sy-24),64,56)}
function brazier(x,y){const[sx,sy]=P(x,y);g.drawImage(TS,(Math.floor(t*9+x*3)%4)*24,88,24,32,Math.round(sx-12),Math.round(sy-30),24,32)}
function chest(c){const[sx,sy]=P(c.x,c.y),m=KM[c.o?'chest1':'chest0'],w=Math.round(m[2]*1.5),h=Math.round(m[3]*1.5);shadow(Math.round(sx),Math.round(sy),10);g.drawImage(KA,m[0],m[1],m[2],m[3],Math.round(sx-w/2),Math.round(sy+4-h),w,h)}
function shadow(sx,sy,r){g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(sx,sy,r,r/2.2,0,0,6.283);g.fill()}
