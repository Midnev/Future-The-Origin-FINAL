function Star(loc,vel,sc){
	this.sc = sc
	this.context = sc.context;
	
	
	this.loc = loc ;
	this.vel = vel ;
	this.R = 1;

	this.img = new Image();
	this.img.src= "./Image/star.png"
	this.size = 1

}

Star.prototype.update = function(){
	this.size = this.R* (Math.random()/2+1/2)
	this.loc.add(this.vel)
	if( this.loc.x<0||this.loc.x>this.sc.width){
		this.isDead = true;
	}
    if( this.loc.y<0||this.loc.y>this.sc.height){
		this.isDead = true;
	}
}

Star.prototype.draw = function(){
	this.context.drawImage(this.img,1,1,64,64,this.loc.x-this.size,this.loc.y-this.size,2*this.size,2*this.size);
}
