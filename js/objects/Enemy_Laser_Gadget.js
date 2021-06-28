const LG_OFF = 0;
const LG_ON = 1;



function Enemy_Laser_Gadget(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	this.loc = loc.copy();
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);

	this.img = new Image()
    this.img.src= "./Image/laser_gadget.png"

	this.lasers = [new Enemy_Laser(2,200,this.loc,this.world),
					new Enemy_Laser(600,2,this.loc,this.world)
					]
	
	this.idle_cnt = 200;
	this.run_cnt = 800

	this.state = LG_OFF;
	
	
}
Enemy_Laser_Gadget.prototype.time = 1;
Enemy_Laser_Gadget.prototype.speed = 1;
Enemy_Laser_Gadget.prototype.color ="#ff0000";
Enemy_Laser_Gadget.prototype.R = 10;
Enemy_Laser_Gadget.prototype.isDead = false;
Enemy_Laser_Gadget.prototype.isKilled = false;
Enemy_Laser_Gadget.prototype.isMother = true;
Enemy_Laser_Gadget.prototype.deathEvent = false;
Enemy_Laser_Gadget.prototype.life = 10;
Enemy_Laser_Gadget.prototype.pattern = 0;
Enemy_Laser_Gadget.prototype.side = ENEMY;

Enemy_Laser_Gadget.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Laser_Gadget.prototype.type = 0;
Enemy_Laser_Gadget.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy_Laser_Gadget.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy_Laser_Gadget.prototype.bullet_cnt=0;
Enemy_Laser_Gadget.prototype.max_bullet_cnt=25;
Enemy_Laser_Gadget.prototype.setFreq= function(num){
		this.max_bullet_cnt +=this.max_bullet_cnt*num;
}
Enemy_Laser_Gadget.prototype.create = function(){
	var bullets =[];
	if(this.bullet_cnt>this.max_bullet_cnt){
		this.bullet_cnt = 0;
		//bullets.push( new Enemy_Bullet(this.loc,new DataSet(0,1),world) );
		//bullets = this.world.pm.getPattern(this.pattern,this.loc) ;
	}else{
		this.bullet_cnt++;
	}
	return bullets;
}
Enemy_Laser_Gadget.prototype.update = function(){
	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}

	if(this.state == LG_ON){
		for(var idx in this.lasers){
			this.lasers[idx].update()
		}
		this.run_cnt--
			if(this.run_cnt < 0){this.isDead = true;}
	}else{
		this.idle_cnt--
		if(this.idle_cnt < 0){this.state = LG_ON}
	}

	for(var idx in this.world.objs){
		var obj = this.world.objs[idx]
		if( (obj.side == PLAYER_BULLET) &&phys_R(this.loc,obj.loc,this.R,obj.R) ){	
			obj.kill();
			this.life -=obj.life;
			for(var i = 0 ; i<=3 ; i++){
				this.world.effect.push(new Effect_Hits(obj.loc,this.world))
			}
		}
   	 }

    if(this.life <=0){
		this.kill();
	}
	
	move(this.loc,this.vel,this.acc)

}
Enemy_Laser_Gadget.prototype.killed = function(){

}

Enemy_Laser_Gadget.prototype.image_size = 30;
Enemy_Laser_Gadget.prototype.draw = function(){
	//this.context.fillStyle = this.color;
	//drawCircle(this.context, this.loc.x, this.loc.y, this.R);
	if(this.state == LG_ON){
		for(var idx in this.lasers){
			this.lasers[idx].draw()
		}
		this.world.context.drawImage(this.img,33,1,32,32,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);
	}else{
		this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);
	}

	
	
}




