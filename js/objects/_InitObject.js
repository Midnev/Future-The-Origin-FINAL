function Object(world){
	this.world= world
	this.keys = this.world.keyset.keys;

	this.context = this.world.context;
	
	this.loc = new DataSet(0,0) ;
	this.vel = new DataSet(0,0);



}
Object.prototype.speed = 1;
Object.prototype.color ="#000000";
Object.prototype.R = 1;
Object.prototype.isDead = false;
Object.prototype.isKilled = false;
Object.prototype.isMother = false;
Object.prototype.deathEvent = false;
Object.prototype.isKilled = false;
Object.prototype.life = 1;

Object.prototype.side = ENEMY;

Object.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;;
}

Object.prototype.create = function(){
	
}

Object.prototype.dies = function(){
	
}

Object.prototype.killed = function(){
	
}

Object.prototype.update = function(){


    
	
	this.loc.add(this.vel);//move
	
}

Object.prototype.draw = function(){
	this.context.fillStyle = this.color;
	drawCircle(this.context, this.loc.x, this.loc.y, this.R);
	
}



