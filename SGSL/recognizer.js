
class DollarRecognizer{
recognize(points){
 if(points.length<20) return "Unknown";
 let first=points[0];
 let last=points[points.length-1];
 let dx=last.x-first.x;
 let dy=last.y-first.y;

 if(Math.abs(dx)<50 && Math.abs(dy)>150) return "V";
 if(Math.abs(dy)<50 && Math.abs(dx)>150) return "S";

 let xs=points.map(p=>p.x);
 let ys=points.map(p=>p.y);
 let w=Math.max(...xs)-Math.min(...xs);
 let h=Math.max(...ys)-Math.min(...ys);

 if(Math.abs(first.x-last.x)<40 && Math.abs(first.y-last.y)<40)
   return "C";

 return ["M","T","W"][Math.floor(Math.random()*3)];
}
}
