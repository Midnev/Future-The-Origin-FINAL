function Warining(loc,world){
	this.world= world

	this.context = this.world.context;

	this.loc = loc.copy();

	this.vel = new DataSet(0,0);
	this.vel.setRad(Math.PI*2*Math.random())

}
Warining.prototype.speed = 0;
Warining.prototype.color ="#ff0000";
Warining.prototype.R = 1;
Warining.prototype.isDead = false;
Warining.prototype.isKilled = false;
Warining.prototype.isMother = false;
Warining.prototype.deathEvent = false;
Warining.prototype.isKilled = false;
Warining.prototype.life = 1;

Warining.prototype.side = NEUTRAL;

Warining.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Warining.prototype.kill = function(){}
Warining.prototype.create = function(){}
Warining.prototype.dies = function(){}
Warining.prototype.killed = function(){}



Warining.prototype.update = function(){

}

Warining.prototype.draw = function(){


}



