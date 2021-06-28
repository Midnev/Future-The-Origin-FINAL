function Enemy_Bullet_Cluster(loc,vel,world){
	this.world=world
	this.context = this.world.context;
	
	this.loc = loc.copy();
	this.vel = vel;
	this.acc = new DataSet(0,0)
	this.vel.setMag(this.speed);
	this.child = []

}
Enemy_Bullet_Cluster.prototype.speed = 4;
Enemy_Bullet_Cluster.prototype.color ="#ff0000";
Enemy_Bullet_Cluster.prototype.R = 1;
Enemy_Bullet_Cluster.prototype.isDead = false;
Enemy_Bullet_Cluster.prototype.isKilled = false;
Enemy_Bullet_Cluster.prototype.isMother = false;
Enemy_Bullet_Cluster.prototype.deathEvent = false;
Enemy_Bullet_Cluster.prototype.isKilled = false;
Enemy_Bullet_Cluster.prototype.life = 1;

Enemy_Bullet_Cluster.prototype.side = NEUTRAL;

Enemy_Bullet_Cluster.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Bullet_Cluster.prototype.dead = function(){
	this.isDead = true;
}

Enemy_Bullet_Cluster.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}


Enemy_Bullet_Cluster.prototype.update = function(){
	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}

	this.loc.add(this.vel);//move
}

Enemy_Bullet_Cluster.prototype.draw = function(){
	//this.context.fillStyle = this.color;
	//drawCircle(this.context, this.loc.x, this.loc.y, this.R);
	
}

