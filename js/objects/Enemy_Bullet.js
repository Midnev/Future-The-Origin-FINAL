function Enemy_Bullet(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	
	this.loc = loc.copy();
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);
	this.rad = this.vel.getRad();
	this.img = new Image()
    this.img.src= "./Image/type2-clear.png"//bullet2
	
}
Enemy_Bullet.prototype.speed = 4.4;
Enemy_Bullet.prototype.color ="#ff0000";
Enemy_Bullet.prototype.R = 4;
Enemy_Bullet.prototype.isDead = false;
Enemy_Bullet.prototype.isKilled = false;
Enemy_Bullet.prototype.isMother = false;
Enemy_Bullet.prototype.deathEvent = false;
Enemy_Bullet.prototype.isKilled = false;
Enemy_Bullet.prototype.life = 1;

Enemy_Bullet.prototype.side = ENEMY_BULLET;

Enemy_Bullet.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Bullet.prototype.dead = function(){
	this.isDead = true;
}

Enemy_Bullet.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}


Enemy_Bullet.prototype.update = function(){
	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}
	
	 move(this.loc,this.vel,this.acc);
}

Enemy_Bullet.prototype.draw = function(){
	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(this.rad - Math.PI/2)//- Math.PI)
	this.world.context.drawImage(this.img,1,1,32,32,-3*this.R,-3*this.R,6*this.R,6*this.R);
	this.context.rotate(-this.rad + Math.PI/2)//+ Math.PI);
	this.context.translate(-this.loc.x,-this.loc.y)
}

