function Effect_Hits(loc,world){
	this.world= world

	this.context = this.world.context;

	this.loc = loc.copy();

	this.vel = new DataSet(0,0);
	this.vel.setRad(Math.PI*2*Math.random())
	this.setSpeed( 1 + Math.random()*2 );

	this.life_cnt = 20 +  (Math.random()*70) ;
}
Effect_Hits.prototype.speed = 0;
Effect_Hits.prototype.color ="#ff0000";
Effect_Hits.prototype.R = 1;
Effect_Hits.prototype.isDead = false;
Effect_Hits.prototype.isKilled = false;
Effect_Hits.prototype.isMother = false;
Effect_Hits.prototype.deathEvent = false;
Effect_Hits.prototype.isKilled = false;
Effect_Hits.prototype.life = 1;

Effect_Hits.prototype.side = NEUTRAL;

Effect_Hits.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Effect_Hits.prototype.kill = function(){}
Effect_Hits.prototype.create = function(){}
Effect_Hits.prototype.dies = function(){}
Effect_Hits.prototype.killed = function(){}



Effect_Hits.prototype.update = function(){
	if(this.life_cnt<0){
		this.isDead = true;
		
	}
	this.life_cnt--
	this.loc.add(this.vel)
}

Effect_Hits.prototype.draw = function(){
	this.context.fillStyle = this.color;
	drawCircle(this.context, this.loc.x, this.loc.y,this.R);

}



