
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
const recognizer=new DollarRecognizer();

function resize(){
 canvas.width=canvas.offsetWidth;
 canvas.height=canvas.offsetHeight;
}
resize();
window.addEventListener('resize',resize);

ctx.lineWidth=5;
ctx.lineCap='round';

let drawing=false;
let points=[];

function pos(e){
 const r=canvas.getBoundingClientRect();
 const t=e.touches?e.touches[0]:e;
 return {x:t.clientX-r.left,y:t.clientY-r.top};
}

function start(e){
 drawing=true;
 points=[];
 let p=pos(e);
 ctx.beginPath();
 ctx.moveTo(p.x,p.y);
 points.push(p);
}

function move(e){
 if(!drawing)return;
 e.preventDefault();
 let p=pos(e);
 ctx.lineTo(p.x,p.y);
 ctx.stroke();
 points.push(p);
}

function end(){
 if(!drawing)return;
 drawing=false;

 let g=recognizer.recognize(points);
 document.getElementById('result').textContent='Gesture: '+g;

 let usage=JSON.parse(localStorage.getItem('usage')||'{}');
 usage[g]=(usage[g]||0)+1;
 localStorage.setItem('usage',JSON.stringify(usage));
 renderStats();

 launch(g);
}

canvas.addEventListener('mousedown',start);
canvas.addEventListener('mousemove',move);
window.addEventListener('mouseup',end);

canvas.addEventListener('touchstart',start);
canvas.addEventListener('touchmove',move,{passive:false});
canvas.addEventListener('touchend',end);

document.getElementById('clearBtn').onclick=()=>{
 ctx.clearRect(0,0,canvas.width,canvas.height);
};

function launch(g){
 const map={
  C:'https://webcamtests.com',
  M:'https://music.youtube.com',
  S:'https://store.steampowered.com',
  T:'https://web.telegram.org',
  W:'https://web.whatsapp.com'
 };

 if(g==='V'){
   alert('Voice command aktif');
   return;
 }

 if(map[g]) window.open(map[g],'_blank');
}

function renderStats(){
 let usage=JSON.parse(localStorage.getItem('usage')||'{}');
 let html='<ul>';
 for(let k in usage) html+=`<li>${k}: ${usage[k]}x</li>`;
 html+='</ul>';
 document.getElementById('stats').innerHTML=html;
}
renderStats();

document.getElementById('saveBtn').onclick=()=>{
 alert('Template project siap dikembangkan.');
};
