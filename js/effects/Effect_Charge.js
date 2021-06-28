function Effect_Charge(loc,world){
	this.world= world

	this.context = this.world.context;
	
	this.loc = loc;
	this.vel = new DataSet(0,0);
	this.lights = []
}
Effect_Charge.prototype.speed = 1;
Effect_Charge.prototype.color ="#ffffff";
Effect_Charge.prototype.R = 100;
Effect_Charge.prototype.light_R = 1;
Effect_Charge.prototype.isDead = false;
Effect_Charge.prototype.isAlive = false;
Effect_Charge.prototype.isKilled = false;
Effect_Charge.prototype.isMother = false;
Effect_Charge.prototype.deathEvent = false;
Effect_Charge.prototype.isKilled = false;
Effect_Charge.prototype.life = 1;

Effect_Charge.prototype.side = NEUTRAL;

Effect_Charge.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;;
}

Effect_Charge.prototype.create = function(){
	
}

Effect_Charge.prototype.dies = function(){
	
}

Effect_Charge.prototype.killed = function(){
	
}


Effect_Charge.prototype.cnt =0;
Effect_Charge.prototype.max_cnt =6;
Effect_Charge.prototype.update = function(){
	if(this.cnt>=this.max_cnt){
		
		this.cnt =0;
		var x = Math.cos(Math.random()*2*Math.PI)*this.R+this.loc.x
		var y = Math.sin(Math.random()*2*Math.PI)*this.R+this.loc.y
		var l =new Effect_Lights(this.loc,new DataSet(x,y),this.world);
		l.color = this.color;
		l.R = this.light_R;
		this.lights.push(l);
	}else{this.cnt++;}

    for(var idx in this.lights){
		this.lights[idx].update();
		if(this.lights[idx].isDead){
			this.lights.splice(idx,1);
		}
	}
		
}

Effect_Charge.prototype.draw = function(){
	if(this.isAlive){
		for(var idx in this.lights){
			this.lights[idx].draw()
	}
	
	}
	
}



