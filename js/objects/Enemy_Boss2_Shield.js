function Enemy_Shield(parent_loc,world){
	this.world = world
	this.context = this.world.context;
	this.parent_loc = parent_loc
	this.loc = parent_loc.copy() ;
	this.vel = new DataSet(0,0);

	this.img = new Image()
  	this.img.src= "./Image/player_Shield.png"
}
Enemy_Shield.prototype.speed = 3;
Enemy_Shield.prototype.color ="#ff0000";
Enemy_Shield.prototype.R = 30;
Enemy_Shield.prototype.isDead = false;
Enemy_Shield.prototype.isAlive = false;
Enemy_Shield.prototype.isKilled = false;
Enemy_Shield.prototype.isMother = false;
Enemy_Shield.prototype.deathEvent = false;
Enemy_Shield.prototype.isKilled = false;
Enemy_Shield.prototype.life = 10;

Enemy_Shield.prototype.side = NEUTRAL_ENEMY;

Enemy_Shield.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}


Enemy_Shield.prototype.create = function(){}


Enemy_Shield.prototype.update = function(){
    
	if (this.life<=0) {
		this.isAlive = true;
	}
	for(var idx in this.world.objs){
		var obj = this.world.objs[idx]
		if(obj.side == PLAYER_BULLET &&phys_R(this.loc,obj.loc,this.R,obj.R) ){
			obj.kill();
		}
   	 }

	//Player_Shield
	this.loc = this.parent_loc;
}

Enemy_Shield.prototype.draw = function(){
	this.context.fillStyle = this.color;
	//drawCircle(this.context, this.loc.x, this.loc.y, this.R);

	this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);
}


