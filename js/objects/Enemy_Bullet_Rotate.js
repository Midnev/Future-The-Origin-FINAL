function Enemy_Bullet_Rotate(parent_loc,degree,world){
	this.world=world
	this.context = this.world.context;
	this.parent_loc = parent_loc;
	this.loc = parent_loc.copy();
	this.vel = vel;
	this.acc = new DataSet(0,0)
	this.vel.setMag(this.speed);

	this.length = 30;
}
Enemy_Bullet_Rotate.prototype.speed = 4;
Enemy_Bullet_Rotate.prototype.color ="#ff0000";
Enemy_Bullet_Rotate.prototype.R = 3;
Enemy_Bullet_Rotate.prototype.isDead = false;
Enemy_Bullet_Rotate.prototype.isKilled = false;
Enemy_Bullet_Rotate.prototype.isMother = false;
Enemy_Bullet_Rotate.prototype.deathEvent = false;
Enemy_Bullet_Rotate.prototype.isKilled = false;
Enemy_Bullet_Rotate.prototype.life = 1;

Enemy_Bullet_Rotate.prototype.side = NEUTRAL;

Enemy_Bullet_Rotate.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Bullet_Rotate.prototype.dead = function(){
	this.isDead = true;
}

Enemy_Bullet_Rotate.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}


Enemy_Bullet_Rotate.prototype.update = function(){
	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}
	


	this.loc.add(this.vel);//move
}

Enemy_Bullet_Rotate.prototype.draw = function(){
	//this.context.fillStyle = this.color;
	//drawCircle(this.context, this.loc.x, this.loc.y, this.R);
	
}

