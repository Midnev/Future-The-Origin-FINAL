function Player_Missle(loc,world){
	this.world = world
	this.context = world.context;
	
	this.loc = loc.copy() ;
	this.vel = new DataSet(0,1);
	this.vel.setMag(this.speed);
	this.acc =  new DataSet(0,0);
	this.org_acc =  new DataSet(0,-0.15);
	this.img = new Image()
    this.img.src= "./Image/player_Missle.png"
}
Player_Missle.prototype.speed = 4;
Player_Missle.prototype.color ="#0000ff";
Player_Missle.prototype.R = 2;
Player_Missle.prototype.isDead = false;
Player_Missle.prototype.isKilled = false;
Player_Missle.prototype.isMother = false;
Player_Missle.prototype.deathEvent = false;
Player_Missle.prototype.isKilled = false;
Player_Missle.prototype.life = 4;

Player_Missle.prototype.side = PLAYER_BULLET;

Player_Missle.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}

Player_Missle.prototype.imverse = function(){
	this.kill()
}

Player_Missle.prototype.update = function(){
	

	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}

    if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}
	this.acc.add(this.org_acc);
	move(this.loc,this.vel,this.acc)
}
Player_Missle.prototype.image_size = 16;
Player_Missle.prototype.draw = function(){
	this.context.fillStyle = this.color;
	drawCircle(this.context, this.loc.x, this.loc.y, this.R);
	this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2,this.image_size,this.image_size);
	
}

