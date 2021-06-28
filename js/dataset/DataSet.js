
function DataSet(x,y){
	this.x=x;
	this.y=y;
}

DataSet.prototype.setRad = function(rad){
	this.x = Math.cos(rad);
	this.y = Math.sin(rad);
}

DataSet.prototype.getRad = function(){
	var a = this.x/Math.sqrt(this.x*this.x+this.y*this.y) 
	var b = this.y/Math.sqrt(this.x*this.x+this.y*this.y) 
	if(b<0){
		return -Math.acos(a);
	}else{
		return Math.acos(a);	
	}
}

DataSet.prototype.set = function(x,y){
	this.x=x;
	this.y=y;
}

DataSet.prototype.getVec= function(v){
	return new DataSet(v.x-this.x , v.y-this.y);
}

DataSet.prototype.copy = function(){
	return new DataSet(this.x,this.y);
}

DataSet.prototype.setMag = function(m){
	var length= this.getMag();
	if(length==0){
     	   return;
   	 }
   	this.x = this.x*m/length;
    	this.y = this.y*m/length;
}

DataSet.prototype.getMag = function(){
	return Math.sqrt(this.x*this.x +this.y*this.y);
}

DataSet.prototype.add = function(vec){
    this.x += vec.x
    this.y += vec.y
}

DataSet.prototype.sub = function(vec){
    this.x -= vec.x
    this.y -= vec.y
}

DataSet.prototype.mul = function(c){
    this.x *= c
    this.y *= c
}

DataSet.prototype.div = function(c){
    this.x /= c
    this.y /= c
}
DataSet.add = function(v1,v2){
    return new DataSet(v1.x+v2.x, v1.y+v2.y)
}

DataSet.sub = function(v1,v2){
    return new DataSet(v1.x-v2.x, v1.y-v2.y)
}

DataSet.mul = function(vec,c){
    return new DataSet(vec.x*c, vec.y*c)
}

DataSet.div = function(vec,c){
    return new DataSet(vec.x/c, vec.y/c)
}

function distsq(v1,v2){
	return (v2.x-v1.x)*(v2.x-v1.x) + (v2.y-v1.y)*(v2.y-v1.y);
}

function phys_R(v1,v2,r1,r2){
	return ( distsq(v1,v2) <= (r1+r2)*(r1+r2) )
}