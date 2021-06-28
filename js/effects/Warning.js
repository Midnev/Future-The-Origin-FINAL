function Warining(parent,world){
	this.world= world

	this.context = this.world.context;
	
	this.parent = parent
	this.loc;

	this.img = new Image()
    this.img.src= "./Image/Warning.png"

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
	this.world.context.drawImage(this.img,1,1,64,64,this.parent.loc.x-10 ,this.world.player.loc.y-10,20,20);

}



