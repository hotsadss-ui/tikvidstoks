(()=>{
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
const c=document.createElement('canvas');c.id='fx';c.setAttribute('aria-hidden','true');document.body.prepend(c);
const g=c.getContext('2d');let W,H,P=[],T=[];
const size=()=>{W=c.width=innerWidth;H=c.height=innerHeight;P=Array.from({length:Math.min(90,Math.round(W*H/16000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3}))};
size();addEventListener('resize',()=>{size();if(reduce)draw(0)});
function draw(now){
  g.clearRect(0,0,W,H);
  for(const p of P){if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1}
    g.fillStyle='rgba(255,255,255,.28)';g.beginPath();g.arc(p.x,p.y,1.2,0,6.3);g.fill()}
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);
    if(d<130){g.strokeStyle=`rgba(255,255,255,${(1-d/130)*.1})`;g.beginPath();g.moveTo(P[i].x,P[i].y);g.lineTo(P[j].x,P[j].y);g.stroke()}}
  T=T.filter(p=>now-p.t<500);g.lineCap='round';
  for(let i=1;i<T.length;i++){const a=1-(now-T[i].t)/500;g.strokeStyle=`rgba(255,90,110,${a*.7})`;g.lineWidth=2.5*a+.5;g.beginPath();g.moveTo(T[i-1].x,T[i-1].y);g.lineTo(T[i].x,T[i].y);g.stroke()}
  g.lineWidth=1;if(!reduce)requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
if(fine){
  const d=document.createElement('div'),r=document.createElement('div');d.id='cur';r.id='ring';document.body.append(d,r);
  document.documentElement.classList.add('cc');
  let mx=-99,my=-99,rx=-99,ry=-99;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(rx===-99){rx=mx;ry=my}
    if(!reduce){T.push({x:mx,y:my,t:performance.now()});if(T.length>80)T.shift()}
    r.classList.toggle('hot',!!(e.target.closest&&e.target.closest('a,button,input,select,textarea,label,[data-t]')))});
  (function m(){const k=reduce?1:.18;rx+=(mx-rx)*k;ry+=(my-ry)*k;d.style.transform=`translate(${mx}px,${my}px)`;r.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(m)})();
}
})();
