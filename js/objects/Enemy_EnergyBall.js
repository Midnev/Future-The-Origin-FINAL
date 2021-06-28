function Enemy_EnergyBall(parent,world){
	this.world = world;
	this.context = world.context;
	
	this.state = PE_CHARGE ;

	this.parent_loc = parent.loc;

	this.loc = this.parent_loc.copy();
		

	this.vel = new DataSet(0,-1);
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);
	this.img = new Image();
    this.img.src= "./Image/energy-enemy.png"

	this.energy = 100
	this.max_energy = 250

	this.hyper_md = false;
}
Enemy_EnergyBall.prototype.speed = 3;
Enemy_EnergyBall.prototype.color ="#000000";
Enemy_EnergyBall.prototype.R = 1;
Enemy_EnergyBall.prototype.isDead = false;
Enemy_EnergyBall.prototype.isAlive = false;
Enemy_EnergyBall.prototype.isKilled = false;
Enemy_EnergyBall.prototype.isMother = false;
Enemy_EnergyBall.prototype.deathEvent = false;
Enemy_EnergyBall.prototype.isKilled = false;
Enemy_EnergyBall.prototype.life = 1;

Enemy_EnergyBall.prototype.side = ENEMY_BULLET;

Enemy_EnergyBall.prototype.dead = function(){
	this.isDead = true;
}

Enemy_EnergyBall.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}

Enemy_EnergyBall.prototype.fire = function(){
		this.state = PE_FIRE
}

Enemy_EnergyBall.prototype.update = function(){
	if(this.state == PE_FIRE ){
		for(var idx in this.world.objs){
				var obj = this.world.objs[idx]
				if(phys_R(this.loc,obj.loc,this.R,obj.R) && obj.life>0){
					if(obj.side == PLAYER ||obj.side == PLAYER_BULLET){		
							this.energy -= 40;
							obj.life --;
					}
				}
		}
		move(this.loc,this.vel,this.acc)
	}else if (this.state == PE_CHARGE) {
		this.energy+=3
		if(this.energy >= this.max_energy){
			this.loc = this.parent_loc.copy();
			this.vel = this.loc.getVec(world.player.loc);
			this.vel.setMag(this.speed)
			this.fire()
		}

	}
	
	

	this.R = 1+ this.energy/15

	
	if(this.energy < 0 || this.loc.x<-this.R|| this.loc.x>this.world.width+this.R || this.loc.y< -this.R) {
		this.state = PE_CHARGE;
		this.energy=0
		this.loc = this.parent_loc.copy()
		this.isDead = true;
	}

	
}

Enemy_EnergyBall.prototype.image_size = 10;
Enemy_EnergyBall.prototype.draw = function(){

	if(this.state == PE_FIRE || this.state == PE_CHARGE){	
		this.world.context.drawImage(this.img,1,1,64,64,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);
		this.world.context.drawImage(this.img,1,1,64,64,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);
			for(var i =0; i<=5 ;i++){
				var deg =  Math.PI*Math.random()
				this.context.translate(this.loc.x,this.loc.y)
				this.context.rotate(deg )
				this.world.context.drawImage(this.img,65,1,32,32,-this.R,-this.R,2*this.R,2*this.R);
				this.world.context.drawImage(this.img,97,1,32,32,-this.R,-this.R,2*this.R,2*this.R);
				this.world.context.drawImage(this.img,65,33,32,32,-this.R,-this.R,2*this.R,2*this.R);
				this.context.rotate(-deg );
				this.context.translate(-this.loc.x,-this.loc.y)
			}
	}
}

