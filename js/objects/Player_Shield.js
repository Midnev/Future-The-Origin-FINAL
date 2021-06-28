function Player_Shield(parent_loc,world){
	this.world = world
	this.context = this.world.context;
	this.parent_loc = parent_loc
	this.loc = parent_loc.copy() ;
	this.vel = new DataSet(0,0);

	this.img = new Image()
    this.img.src= "./Image/player_Shield.png"
}
Player_Shield.prototype.speed = 3;
Player_Shield.prototype.color ="#ffffff";
Player_Shield.prototype.R = 20;
Player_Shield.prototype.isDead = false;
Player_Shield.prototype.isKilled = false;
Player_Shield.prototype.isMother = false;
Player_Shield.prototype.deathEvent = false;
Player_Shield.prototype.isKilled = false;
Player_Shield.prototype.life = 2;

Player_Shield.prototype.side = PLAYER_BULLET;

Player_Shield.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}

Player_Shield.prototype.imverse = function(){}

Player_Shield.prototype.create = function(){}

Player_Shield.prototype.update = function(){
    
	if (this.life<=0) {
		this.isDead = true;
	}
	for(var idx in this.world.objs){
		var obj = this.world.objs[idx]
		if(obj.side == ENEMY_BULLET &&phys_R(this.loc,obj.loc,this.R,obj.R) ){
			obj.kill();
			this.life --;
		}
   	 }

	//Player_Shield
	this.loc = this.parent_loc;
}

Player_Shield.prototype.draw = function(){
	//this.context.fillStyle = this.color;
	//drawCircle(this.context, this.loc.x, this.loc.y, this.R);

	this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);
	this.context.fillStyle = this.color;
	this.context.fillText(this.life,this.loc.x+this.R,this.loc.y+this.R);
}

