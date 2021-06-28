const PE_HIDE = 0
const PE_CHARGE = 1
const PE_FIRE = 2

function Player_EnergyBall(loc,world){
	this.world = world;
	this.context = world.context;
	
	this.state = PE_HIDE ;

	this.parent_loc = loc;
	this.loc_fix = new DataSet(0,-30)
	this.loc = loc.copy;
	this.loc = this.parent_loc.copy()
	this.loc.add(this.loc_fix)
	this.vel = new DataSet(0,-1);
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);
	this.img = new Image();
    this.img.src= "./Image/energy.png"

	this.energy = 0
	this.max_energy = 200

	this.hyper_md = false;
}
Player_EnergyBall.prototype.speed = 3;
Player_EnergyBall.prototype.color ="#000000";
Player_EnergyBall.prototype.R = 1;
Player_EnergyBall.prototype.isDead = false;
Player_EnergyBall.prototype.isAlive = false;
Player_EnergyBall.prototype.isKilled = false;
Player_EnergyBall.prototype.isMother = false;
Player_EnergyBall.prototype.deathEvent = false;
Player_EnergyBall.prototype.isKilled = false;
Player_EnergyBall.prototype.life = 1;

Player_EnergyBall.prototype.side = NEUTRAL;

Player_EnergyBall.prototype.dead = function(){
	this.isDead = true;
}

Player_EnergyBall.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}

Player_EnergyBall.prototype.fire = function(){
	if(this.energy > 70){
		this.state = PE_FIRE
	}else{this.isDead = true;}

}

Player_EnergyBall.prototype.update = function(){
	if(this.state == PE_FIRE ){
		for(var idx in this.world.objs){
				var obj = this.world.objs[idx]
				if(phys_R(this.loc,obj.loc,this.R,obj.R) && obj.life>0){
					if(obj.side == ENEMY){
						
							this.energy -= 10;
							obj.life --;
						
					}else if( obj.side == ENEMY_BULLET ){	
						obj.kill();
						this.energy -= 5
					}
				}
		}

		
		
		this.R = 1+ this.energy/12
		move(this.loc,this.vel,this.acc)
	}else if (this.state == PE_CHARGE) {
		this.energy+=1;
		
		this.loc = this.parent_loc.copy()
		this.loc.add(this.loc_fix)
		if(this.energy >=70){	
			for(var idx in this.world.objs){
					var obj = this.world.objs[idx]
					if(phys_R(this.loc,obj.loc,this.R,obj.R) ){
						if( obj.side == ENEMY_BULLET ){	
							obj.kill();
							this.energy =0;	
						}
					}
			}
		}
		if(this.energy>this.max_energy && !this.hyper_md){
			this.energy=this.max_energy
		}
		this.R = 1+ this.energy/25
	}
	
	

	

	
	if(this.energy < 0 || this.loc.x<-this.R|| this.loc.x>this.world.width+this.R || this.loc.y< -this.R) {
		this.state = PE_HIDE;
		this.energy=0
		this.loc = this.parent_loc.copy()
		this.loc.add(this.loc_fix)
		this.isDead = true;
	}

	
}

Player_EnergyBall.prototype.image_size = 10;
Player_EnergyBall.prototype.draw = function(){

	if(this.state == PE_FIRE || this.state == PE_CHARGE){	
		//this.context.fillStyle = this.color;
		//drawCircle(this.context, this.loc.x, this.loc.y, this.R);
		this.world.context.drawImage(this.img,1,1,64,64,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);
		this.world.context.drawImage(this.img,1,1,64,64,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);
		if(this.energy > 70){
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
	
	
}

