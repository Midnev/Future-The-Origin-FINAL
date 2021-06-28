function Player_Laser(parent_loc,world){
	this.world = world;
	this.context = world.context;
	
	this.loc = parent_loc ;
	this.des = parent_loc.copy()

	this.vel = new DataSet(0,0);
	this.acc = new DataSet(0,0);
	this.img = new Image()
    this.img.src= "./Image/laser.png"

	this.width = 200;
	this.height = this.world.height;
	
}
Player_Laser.prototype.speed = 4;
Player_Laser.prototype.color ="#0000ff";
Player_Laser.prototype.R = 2;
Player_Laser.prototype.isDead = false;
Player_Laser.prototype.isAlive = false;
Player_Laser.prototype.isKilled = false;
Player_Laser.prototype.isMother = false;
Player_Laser.prototype.deathEvent = false;
Player_Laser.prototype.isKilled = false;
Player_Laser.prototype.life = 0.5;

Player_Laser.prototype.side = PLAYER_BULLET;

Player_Laser.prototype.dead = function(){
	this.isDead = true;
}

Player_Laser.prototype.kill = function(){
	this.isKilled = true;
	//this.isDead = true;
}


Player_Laser.prototype.update = function(){
	if(this.isAlive){
		for(var idx in this.world.objs){
			var obj = this.world.objs[idx]
			if( ((obj.side == ENEMY_BULLET)||(obj.side == ENEMY)) && this.phys_sq(obj.loc,obj.R)  ){	
				if(obj.side == ENEMY){
					obj.life-=this.life;
				}else{
					obj.kill();
				}
			}
		
		 }
}	
}


Player_Laser.prototype.draw = function(){
	if(this.isAlive){
		this.context.fillStyle = this.color;
		//drawCircle(this.context, this.loc.x, this.loc.y, this.R);
		this.world.context.drawImage(this.img,35,1,188,514,this.loc.x-this.width/2 ,this.loc.y -10,this.width,-this.height-100);
	}
}

Player_Laser.prototype.phys_sq = function(v1 , r){
	if(this.loc.y > v1.y ){
		if(this.loc.x-this.width/2 < (v1.x+r)  && this.loc.x+this.width/2> (v1.x-r)){
			return true;
		}
	}
}