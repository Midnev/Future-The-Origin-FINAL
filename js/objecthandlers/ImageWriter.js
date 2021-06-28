function ImageWriter(context){
	this.context = context;
	this.img = new Image()
	this.img.src = './Image/num-clear.png';
	this.imgset = new DataSet(24,32);//3/4
	this.letterSize = 6

	
}
ImageWriter.prototype.writeNum = function(size,locx,locy,str){
	var x = locx;
	var y = locy;
	var arr = str.toString().split("")
	

	for(var idx in arr){
		var now_x = x + (size * idx)
		this.context.drawImage(this.img, 1+(this.imgset.x*arr[idx]),1 ,this.imgset.x,this.imgset.y, now_x,y, (size*3)/4, size);
	}
}

ImageWriter.prototype.writeNumLeft = function(size,locx,locy,str){
	var x = locx;
	var y = locy;
	var arr = str.toString().split("")
	
	arr.length

	for(var idx in arr){
		var now_x = x + (size * idx)
		this.context.drawImage(this.img, 1+(this.imgset.x*arr[idx]),1 ,this.imgset.x,this.imgset.y, now_x,y, (size*3)/4, size);
	}
}

