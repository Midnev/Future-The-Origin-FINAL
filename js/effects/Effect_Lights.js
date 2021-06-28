function Effect_Lights(parent_loc,loc,world){
	this.world= world

	this.context = this.world.context;
	this.parent_loc = parent_loc;
	this.loc = loc.copy();
	this.vel = new DataSet(0,0);
	this.cnt = 150;
}
Effect_Lights.prototype.speed = 0;
Effect_Lights.prototype.color ="#ffffff";
Effect_Lights.prototype.R = 2;
Effect_Lights.prototype.isDead = false;
Effect_Lights.prototype.isKilled = false;
Effect_Lights.prototype.isMother = false;
Effect_Lights.prototype.deathEvent = false;
Effect_Lights.prototype.isKilled = false;
Effect_Lights.prototype.life = 1;

Effect_Lights.prototype.side = NEUTRAL;

Effect_Lights.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}


Effect_Lights.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;;
}

Effect_Lights.prototype.create = function(){
	
}

Effect_Lights.prototype.dies = function(){
	
}

Effect_Lights.prototype.killed = function(){
	
}

Effect_Lights.prototype.update = function(){
	
	if(distsq(this.loc,this.parent_loc)<5 ||this.cnt<0){
		this.vel.set(0,0)
		this.kill();
	}else{
		this.speed +=0.04;
		this.vel = this.loc.getVec(this.parent_loc)
		this.vel.setMag(this.speed)
		this.loc.add(this.vel)
		this.cnt--;
	}
	

	
}

Effect_Lights.prototype.draw = function(){
	if(!this.isDead){
		this.context.fillStyle = this.color;
		drawCircle(this.context, this.loc.x, this.loc.y,this.R);
	}
}



