function Enemy_Bullet_Freezer(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	
	this.loc = loc.copy();
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);
	this.rad = this.vel.getRad();
	//this.img = new Image()
    //this.img.src= "./Image/type2-clear.png"
	this.life = 100;
}
Enemy_Bullet_Freezer.prototype.speed = 4;
Enemy_Bullet_Freezer.prototype.color ="#9999ff";
Enemy_Bullet_Freezer.prototype.R = 1;
Enemy_Bullet_Freezer.prototype.isDead = false;
Enemy_Bullet_Freezer.prototype.isKilled = false;
Enemy_Bullet_Freezer.prototype.isMother = false;
Enemy_Bullet_Freezer.prototype.deathEvent = false;
Enemy_Bullet_Freezer.prototype.isKilled = false;
Enemy_Bullet_Freezer.prototype.life = 1;

Enemy_Bullet_Freezer.prototype.side = NEUTRAL_ENEMY

Enemy_Bullet_Freezer.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Bullet_Freezer.prototype.dead = function(){
	this.isDead = true;
}

Enemy_Bullet_Freezer.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}


Enemy_Bullet_Freezer.prototype.update = function(){
	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
   	 if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}
	
	var obj = this.world.player
	if(phys_R(this.loc,obj.loc,this.R,obj.R) ){	
		this.kill();
		obj.frozen_cnt = 30;
		obj.frozen = true;
	}

	if(this.life<=0){
		this.isDead = true;
	}else{
		this.life--;
	}

	move(this.loc,this.vel,this.acc);
}

Enemy_Bullet_Freezer.prototype.draw = function(){
	this.context.fillStyle = this.color;
	drawCircle(this.context, this.loc.x, this.loc.y, this.R);
}

