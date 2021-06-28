function Player_Bullet(loc,world){
	this.world = world;
	this.context = world.context;
	
	this.loc = loc.copy() ;
	this.vel = new DataSet(0,-1);
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);
	this.img = new Image();
    this.img.src= "./Image/bullet-clear.png"
}
Player_Bullet.prototype.speed = 6.2;
Player_Bullet.prototype.color ="#0000ff";
Player_Bullet.prototype.R = 2;
Player_Bullet.prototype.isDead = false;
Player_Bullet.prototype.isKilled = false;
Player_Bullet.prototype.isMother = false;
Player_Bullet.prototype.deathEvent = false;
Player_Bullet.prototype.isKilled = false;
Player_Bullet.prototype.life = 1;

Player_Bullet.prototype.side = PLAYER_BULLET;

Player_Bullet.prototype.dead = function(){
	this.isDead = true;
}

Player_Bullet.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}

Player_Bullet.prototype.imverse = function(){
	this.vel.x = -this.vel.x
	this.vel.y = -this.vel.y
	this.vel.setMag(2);
	this.side = ENEMY_BULLET;
	this.img.src= "./Image/bullet2.png"

}
Player_Bullet.prototype.update = function(){
	
	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    if( this.loc.y<0||this.loc.y>this.world.height+10){
		this.isDead = true;
	}
	if (this.life<=0) {
		this.isDead = true;
	}
	 move(this.loc,this.vel,this.acc)
}

Player_Bullet.prototype.image_size = 10;
Player_Bullet.prototype.draw = function(){
	this.context.fillStyle = this.color;
	//drawCircle(this.context, this.loc.x, this.loc.y, this.R);

	this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2,this.image_size,this.image_size);
}

