function Enemy_Bullet_Trace(loc,vel,world){
	this.world = world
	this.context = this.world.context;
	
	this.loc = loc.copy();
	this.vel = vel;
	this.acc = new DataSet(0,0)
	this.vel.setMag(this.speed);
	this.parent_loc = this.world.player.loc;

	this.img = new Image()
   this.img.src= "./Image/type3.png"

}
Enemy_Bullet_Trace.prototype.speed = 1.5;
Enemy_Bullet_Trace.prototype.color ="#ff0000";
Enemy_Bullet_Trace.prototype.R = 10;
Enemy_Bullet_Trace.prototype.isDead = false;
Enemy_Bullet_Trace.prototype.isKilled = false;
Enemy_Bullet_Trace.prototype.isMother = false;
Enemy_Bullet_Trace.prototype.deathEvent = false;
Enemy_Bullet_Trace.prototype.isKilled = false;
Enemy_Bullet_Trace.prototype.life = 1;

Enemy_Bullet_Trace.prototype.side = ENEMY_BULLET;

Enemy_Bullet_Trace.prototype.dead = function(){
	this.isDead = true;
}

Enemy_Bullet_Trace.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}


Enemy_Bullet_Trace.prototype.trace_cnt =3 ;
Enemy_Bullet_Trace.prototype.trace_delay = 0;
Enemy_Bullet_Trace.prototype.update = function(){
	
	if(this.trace_cnt >0 && this.trace_delay >= 100){
		this.vel = this.loc.getVec(this.parent_loc);
		this.vel.setMag(this.speed);
		this.trace_delay=0;
		this.trace_cnt --;
	}else{
		this.trace_delay++;
	}



	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}
	 move(this.loc,this.vel,this.acc)
}


Enemy_Bullet_Trace.prototype.degree = 0
Enemy_Bullet_Trace.prototype.draw = function(){
	//this.context.fillStyle = this.color;
	
	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(Math.PI*this.degree/180)
	this.world.context.drawImage(this.img,1,1,32,32,-this.R,-this.R,2*this.R,2*this.R);
	this.context.rotate(-Math.PI*this.degree/180);
	this.context.translate(-this.loc.x,-this.loc.y)
	this.degree++;
	if(this.degree >360){this.degree-=360;}

}

