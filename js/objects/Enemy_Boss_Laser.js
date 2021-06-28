const L_OFF = 0;
const L_ON = 1;
const L_CHARGE = 2;


function Enemy_Boss_Laser(loc,plus,world){
	this.world = world;
	this.context = this.world.context;
	

	this.p_loc = loc;
	this.plus = plus
	this.loc = this.p_loc.copy()
	this.loc.add(plus)
	this.vel = new DataSet(0,0)
	this.acc = new DataSet(0,0);
	this.img = new Image()
    this.img.src= "./Image/laser_red.png"
	
	this.img2 = new Image()
    this.img2.src= "./Image/Warning.png"


	this.width = 4;
	this.height = this.world.height;
	
	this.state = L_OFF;

	this.effect_charge = new Effect_Charge(this.loc,this.world);
	this.effect_charge.R=30;
	this.effect_charge.light_R=3;
	this.effect_charge.color = "#ff0000"
	this.effect_charge.isAlive = true;
	this.effect_charge.max_cnt = 15;

	this.charge_cnt = 0;
	this.laser_cnt = 0;
	

}
Enemy_Boss_Laser.prototype.speed = 0;
Enemy_Boss_Laser.prototype.color ="#ff0000";
Enemy_Boss_Laser.prototype.R = 3;
Enemy_Boss_Laser.prototype.isDead = false;
Enemy_Boss_Laser.prototype.isAlive = true;
Enemy_Boss_Laser.prototype.isKilled = false;
Enemy_Boss_Laser.prototype.isMother = false;
Enemy_Boss_Laser.prototype.deathEvent = false;
Enemy_Boss_Laser.prototype.isKilled = false;
Enemy_Boss_Laser.prototype.life = 0.3;

Enemy_Boss_Laser.prototype.side = ENEMY_BULLET;

Enemy_Boss_Laser.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Boss_Laser.prototype.dead = function(){
	this.isDead = true;
}

Enemy_Boss_Laser.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}

Enemy_Boss_Laser.prototype.on = function(){
	this.state = L_CHARGE;
	this.charge_cnt = 0;
	this.laser_cnt = 0;
}
Enemy_Boss_Laser.prototype.update = function(){
	if(this.state == L_CHARGE){
		this.effect_charge.update()
		if(this.charge_cnt>200){this.state = L_ON}else{this.charge_cnt++}

	}else if(this.state == L_ON){
		for(var idx in this.world.objs){
		var obj = this.world.objs[idx]
			if( obj.side == PLAYER && this.phys_sq(obj.loc,obj.R)  ){	
					obj.life-=this.life;
			}
   		}
		if(this.laser_cnt>320){this.state = L_OFF}else{this.laser_cnt++}
	}
	this.loc = this.p_loc.copy()
	this.loc.add(this.plus)
	this.effect_charge.loc = this.loc
}

Enemy_Boss_Laser.prototype.draw = function(){
	if(this.state == L_CHARGE){
		this.effect_charge.draw()
		this.world.context.drawImage(this.img2,1,1,64,64,this.loc.x-10 ,this.world.player.loc.y-10,20,20);
	}else if(this.state == L_ON){
		//this.context.fillStyle = "#ff0000";
		//this.context.fillRect(this.loc.x-this.width/2 ,this.loc.y,this.width,this.height);
		this.world.context.drawImage(this.img,1,1,18,260,this.loc.x-this.width/2 ,this.loc.y,this.width,this.height);
	}
	
}

Enemy_Boss_Laser.prototype.phys_sq = function(v1 , r){
	if(this.loc.y < v1.y ){
		if(this.loc.x-this.width/2 < (v1.x+r)  && this.loc.x+this.width/2> (v1.x-r)){
			return true;
		}
	}
	
}