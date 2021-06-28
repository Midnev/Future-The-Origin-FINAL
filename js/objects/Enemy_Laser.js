function Enemy_Laser(width,height,loc,world){
	this.world = world;
	this.context = this.world.context;
	

	this.loc = loc;
	this.vel = new DataSet(0,0)
	this.acc = new DataSet(0,0);
	this.rad = Math.PI/2
	this.vel.setMag(this.speed);

	this.img = new Image()
    this.img.src= "./Image/laser.png"

	this.width = width;
	this.height=height;
}
Enemy_Laser.prototype.speed = 4;
Enemy_Laser.prototype.color ="#ff0000";
Enemy_Laser.prototype.R = 3;
Enemy_Laser.prototype.isDead = false;
Enemy_Laser.prototype.isKilled = false;
Enemy_Laser.prototype.isMother = false;
Enemy_Laser.prototype.deathEvent = false;
Enemy_Laser.prototype.isKilled = false;
Enemy_Laser.prototype.life = 1;

Enemy_Laser.prototype.side = ENEMY_BULLET;

Enemy_Laser.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Laser.prototype.dead = function(){
	this.isDead = true;
}

Enemy_Laser.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}


Enemy_Laser.prototype.update = function(){

	for(var idx in this.world.objs){
		var obj = this.world.objs[idx]
		if( (obj.side == PLAYER||obj.side == PLAYER_BULLET) && this.phys_sq(obj.loc,obj.R)  ){	
				obj.life-=this.life;
				//this.world.effect.push(new Effect_Hits(obj.loc,this.world))
		}
   	 }

	

}

Enemy_Laser.prototype.draw = function(){
	//this.world.context.drawImage(this.img,35,1,188,514,this.loc.x-this.width/2 ,this.loc.y -this.height/2,this.width,this.height);

	this.context.fillStyle = "#ff0000";
	this.context.fillRect(this.loc.x-this.width/2 ,this.loc.y -this.height/2,this.width,this.height);
}

Enemy_Laser.prototype.phys_sq = function(v1 , r){
	if(this.loc.y-this.height/2 < (v1.y+r) && this.loc.y+this.height/2 > (v1.y-r) ){
		if(this.loc.x-this.width/2 < (v1.x+r)  && this.loc.x+this.width/2> (v1.x-r)){
			return true;
		}
	}
	return false
}