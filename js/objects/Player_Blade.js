function Player_Blade(loc,world){
	this.world = world;
	this.context = world.context;
	
	this.loc = loc.copy() ;
	this.vel = new DataSet(0,-1);
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);
	this.img = new Image();
    this.img.src= "./Image/blade2.png"
	this.rad = this.vel.getRad();
	this.cnt = 30 + (this.world.sc.world_level*10)
}
Player_Blade.prototype.speed = 7;
Player_Blade.prototype.color ="#0000ff";
Player_Blade.prototype.R = 20;
Player_Blade.prototype.isDead = false;
Player_Blade.prototype.isKilled = false;
Player_Blade.prototype.isMother = false;
Player_Blade.prototype.deathEvent = false;
Player_Blade.prototype.isKilled = false;
Player_Blade.prototype.life = 2;

Player_Blade.prototype.side = PLAYER_BULLET;

Player_Blade.prototype.dead = function(){
	this.isDead = true;
}

Player_Blade.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}

Player_Blade.prototype.imverse = function(){
	//this.kill()
}
Player_Blade.prototype.update = function(){
	
	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    	if( this.loc.y<0||this.loc.y>this.world.height+10){
		this.isDead = true;
	}
	if(this.cnt<=0){
			this.isDead = true;
	}else{
		this.cnt --
	}
	if (this.life<=0) {
		this.isDead = true;
	}
	
	 move(this.loc,this.vel,this.acc)
}

Player_Blade.prototype.image_size = 10;
Player_Blade.prototype.draw = function(){
	//this.context.fillStyle = this.color;
	//drawCircle(this.context, this.loc.x, this.loc.y, this.R);

	//this.world.context.drawImage(this.img,1,1,64,64,this.loc.x-this.R, this.loc.y-this.R, 2*this.R,2*this.R);
	this.rad = this.vel.getRad();
	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(this.rad + Math.PI/2)//- Math.PI)
	this.world.context.drawImage(this.img,1 ,1,64,64,-this.R,-this.R,this.R*2,this.R*2);
	this.context.rotate(-this.rad - Math.PI/2)//+ Math.PI);
	this.context.translate(-this.loc.x,-this.loc.y)
}

