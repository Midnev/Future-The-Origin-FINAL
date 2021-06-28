const E2_NORMAL = 0
const E2_LANCER = 1

function Enemy2(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	this.loc = loc ;
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);
	this.rad = this.vel.getRad();
	this.img = new Image()
    this.img.src= "./Image/enemy2.png"

	this.mode =  E2_NORMAL
	this.mode_cnt = 100
}
Enemy2.prototype.time = 5;
Enemy2.prototype.speed = 5;
Enemy2.prototype.color ="#ff0000";
Enemy2.prototype.R = 15;
Enemy2.prototype.isDead = false;
Enemy2.prototype.isKilled = false;
Enemy2.prototype.isMother = true;
Enemy2.prototype.deathEvent = false;
Enemy2.prototype.life = 3;
Enemy2.prototype.pattern = 0;
Enemy2.prototype.side = ENEMY;

Enemy2.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}
Enemy2.prototype.setLife = function(life){
	this.life = life;
	this.max_life = life
}
Enemy2.prototype.type = 0;
Enemy2.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy2.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy2.prototype.bullet_cnt=0;
Enemy2.prototype.max_bullet_cnt=25;
Enemy2.prototype.setFreq= function(num){
		this.max_bullet_cnt +=this.max_bullet_cnt*num;
}
Enemy2.prototype.create = function(){
	var bullets =[];
		if(this.bullet_cnt>this.max_bullet_cnt){
			this.bullet_cnt = 0;
			bullets = this.world.pm.getPattern(this.pattern,this.loc) ;
		}else{
			this.bullet_cnt++;
		}
		
	return bullets;
}
Enemy2.prototype.update = function(){


	if(this.mode != E2_LANCER && this.mode_cnt <= 0){
		this.mode = E2_LANCER
	}else{this.mode_cnt--;}

	if(this.mode == E2_LANCER){
		this.vel.setRad(this.rad)
		this.setSpeed(6)
			
		//var obj = this.world.player
		//if( phys_R(this.loc,obj.loc,this.R,obj.R)){
		//	obj.life--;
		//}
	}else{
		this.rad = this.loc.getVec( this.world.player.loc ).getRad()
	}


	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
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
Enemy2.prototype.killed = function(){
	return new Item(this.type,this.loc,this.world);
}

Enemy2.prototype.image_size = 34;
Enemy2.prototype.draw = function(){
	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(this.rad - Math.PI/2)//- Math.PI)
	this.world.context.drawImage(this.img,1+(this.type*32),1,32,32,-this.image_size/2,-this.image_size/2,this.image_size,this.image_size);
	this.context.rotate(-this.rad + Math.PI/2)//+ Math.PI);
	this.context.translate(-this.loc.x,-this.loc.y)
}




