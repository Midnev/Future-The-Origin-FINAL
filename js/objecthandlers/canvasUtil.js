function drawOval(context,x,y,r1,r2){
    var ratio = r2/r1
    context.save()
    context.scale(1,ratio)
    context.beginPath();
    context.arc(x,y/ratio, r1, 0, Math.PI*2,false);
    context.fill();
    context.closePath();
    context.restore()
}

function drawCircle(context,x,y,r){
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2,false);
    context.fill();
    context.closePath();
}

function drawSquare(context,x,y,r){
    context.fillRect(x-r,y-r,2*r,2*r)   
}

function drawRect(context,x,y,w,h){
    context.fillRect(x,y,w,h)   
}

function drawRectR(context,x,y,w,h){
    context.fillRect(x-w,y-h,2*w,2*h)   
}

function drawText(context,text,x,y){
    context.fillText(text,x,y)
}

function drawLine(context,x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1)
    context.lineTo(x2,y2)
    context.stroke();
    context.closePath();
}

function drawRing(context,x,y,r){
    context.beginPath();
    context.arc(x, Y(y), r, 0, Math.PI*2,false);
    context.stroke()
    context.closePath();
}

function drawPiece(context,x,y,r,ratio){
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2*ratio,false);
    context.stroke();
    context.closePath();
}

function drawHP(context,ratio){
	context.strokeStyle = "#ff0000";
	context.lineWidth = 10
    context.beginPath();
    context.arc(width-50,50,30, 0, Math.PI*2*ratio,false);
    context.stroke();
    context.closePath();
	
}

