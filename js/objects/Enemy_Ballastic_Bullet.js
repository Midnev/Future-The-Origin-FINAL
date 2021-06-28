function Enemy_Ballastic_Bullet(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	
	this.parent_loc = this.world.player.loc.copy()

	this.loc = loc.copy();
	this.vel = vel;
	this.acc = new DataSet(0,0)
	
	this.vel.setMag(this.speed);
	this.rad = this.vel.getRad();
	this.img = new Image()
    this.img.src= "./Image/type4.png"

	this.life_cnt = 400

}
Enemy_Ballastic_Bullet.prototype.speed = 5;
Enemy_Ballastic_Bullet.prototype.color ="#ff0000";
Enemy_Ballastic_Bullet.prototype.R = 3;
Enemy_Ballastic_Bullet.prototype.isDead = false;
Enemy_Ballastic_Bullet.prototype.isKilled = false;
Enemy_Ballastic_Bullet.prototype.isMother = false;
Enemy_Ballastic_Bullet.prototype.deathEvent = false;
Enemy_Ballastic_Bullet.prototype.isKilled = false;
Enemy_Ballastic_Bullet.prototype.life = 1;

Enemy_Ballastic_Bullet.prototype.side = ENEMY_BULLET;

Enemy_Ballastic_Bullet.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Ballastic_Bullet.prototype.dead = function(){
	this.isDead = true;
}

Enemy_Ballastic_Bullet.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}


Enemy_Ballastic_Bullet.prototype.update = function(){
	
	this.acc = this.loc.getVec( this.parent_loc ) 
	this.acc.setMag(0.3)
	this.vel.setMag(this.speed)
	
	this.rad = this.vel.getRad()

	if(this.life_cnt <= 0){
		this.isDead = true;
	}else{
		this.life_cnt --;
		this.speed -= 0.01
		}
	
	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
   	if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}
	
	 move(this.loc,this.vel,this.acc);
}

Enemy_Ballastic_Bullet.prototype.draw = function(){
	//this.context.fillStyle = this.color;
	//drawCircle(this.context, this.loc.x, this.loc.y, this.R);
	//this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);
	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(this.rad - Math.PI/2)//- Math.PI)
	this.world.context.drawImage(this.img,1,1,32,32,-3*this.R,-3*this.R,6*this.R,6*this.R);
	this.context.rotate(-this.rad + Math.PI/2)//+ Math.PI);
	this.context.translate(-this.loc.x,-this.loc.y)
	
}

