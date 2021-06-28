const PLAYER_ALIVE = 0
const PLAYER_DEAD = 1
const PLAYER_EXPLODE = 2


const PLAYER_TYPE1 = 0
const PLAYER_TYPE2 = 1


function Player(world){
	this.world = world;
	this.keys = this.world.keyset.keys;
	this.context = this.world.context;
	this.loc = new DataSet( (this.world.width)/2  , (this.world.height*3)/4) ;
	this.vel = new DataSet(0,0);
	this.acc = new DataSet(0,0);
	this.img = new Image()
  	this.img.src= "./Image/player-clear.png"
	
	this.img_iced = new Image()
  	this.img_iced.src= "./Image/iced.png"

	

	this.state = PLAYER_ALIVE;
	this.explode_rad = new DataSet(0,0);
	//=========laser
	
	this.laser = null;
	//=========ch
	this.effect_charge = null;
	this.energy_ball = new Player_EnergyBall(this.loc,this.world);
	
	//=========필살기
	this.blaster_energy = 0;
	this.blaster_max = 100;
	this.blaster = null;
	//==
	this.gravity_bullet = 0;
	//=========추가장비 확인용
	this.shield = null;
	this.rotate= [new Player_Support_Rotate(this,0,this.world),
					new Player_Support_Rotate(this,Math.PI/2,this.world),
					new Player_Support_Rotate(this,Math.PI,this.world),
					new Player_Support_Rotate(this,Math.PI*3/2,this.world)
						];
	this.follow = [new Player_Support_Follow(this,new DataSet(30,20),this.world),
					new Player_Support_Follow(this,new DataSet(-30,20),this.world)
						];
	
	//속도 
	this.charge_speed = 1.2
	this.normal_speed = this.speed
	this.frozen = false
	this.frozen_cnt = 10;
	

	//=========기본 공격 모드
	//this.bullet_type = PLAYER_N;
	this.bullet 
	this.bullet_changed = 0

}

Player.prototype.init = function(){
	this.bullet = new Type1(this)
	this.laser = new Player_Bullet_Laser(this.loc, this.world);
	this.blaster = new Player_Laser(this.loc,this.world);
	this.effect_charge = new Effect_Charge(this.loc,this.world);
	this.world.effect.push(this.effect_charge);
	//this.bullet_type = PLAYER_N;
	if(this.shield !=null ){
		this.world.add_objs.push(this.shield);
	}
	//if(this.rotate !=null ){
		//this.world.add_objs = this.world.add_objs.concat(this.rotate);
	//}
	this.energy_ball = new Player_EnergyBall(this.loc,this.world);
	this.frozen = false
	
}

Player.prototype.reset = function(){
	this.loc = new DataSet( (this.world.width)/2  , (this.world.height*3)/4) ;
	this.vel = new DataSet(0,0);
	this.acc = new DataSet(0,0);
	this.life = 1
	
	this.state = PLAYER_ALIVE;
	this.explosion_cnt = 100;
	this.isDead = false;
	this.isKilled = false;
	this.shield = null;
	this.rotate=	[new Player_Support_Rotate(this,0,this.world),
					new Player_Support_Rotate(this,Math.PI/2,this.world),
					new Player_Support_Rotate(this,Math.PI,this.world),
					new Player_Support_Rotate(this,Math.PI*3/2,this.world)
						];
	this.follow = [new Player_Support_Follow(this,new DataSet(30,20),this.world),
					new Player_Support_Follow(this,new DataSet(-30,20),this.world)
						];
	this.init()
}

Player.prototype.resetAll = function(){
	this.reset()
	this.bullet_level=1;
	this.blaster_energy = 0;
	this.gravity_bullet = 0;
	this.shield = null;
	
}

Player.prototype.speed = 3;
Player.prototype.color ="#00c0ff";
Player.prototype.R = 6;
Player.prototype.isDead = false;
Player.prototype.isKilled = false;
Player.prototype.isMother = true;
Player.prototype.deathEvent = false;
Player.prototype.isKilled = false;
Player.prototype.life = 1;

Player.prototype.side = PLAYER;

Player.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}

Player.prototype.bullet_level=1;

Player.prototype.create = function(){
	var bullets =[];
	if(this.state == PLAYER_ALIVE ){
		if(!this.laser.isAlive){
			if(this.bullet_level>=4+this.world.sc.world_level){
				this.bullet_level =4+this.world.sc.world_level;
			}
			bullets = bullets.concat( this.bullet.fire(this.bullet_level) )
		}
		if( this.keys[KEY_X] && this.gravity_bullet>0){
			this.gravity_bullet--;
			this.keys[KEY_X] =false;
			bullets.push(new Player_Gravity( this.loc,this.world ) );	
		}
		
		for(var idx in this.rotate){
			bullets = bullets.concat(this.rotate[idx].create())
		}
		for(var idx in this.follow){
			bullets = bullets.concat(this.follow[idx].create())
		}
	}

	return bullets;
}

Player.prototype.cleared = true;
Player.prototype.explosion_cnt = 100;//86 line reset
Player.prototype.update = function(){

	if(this.life<=0 && this.state !=PLAYER_EXPLODE){
		this.state =PLAYER_EXPLODE
		this.world.sc.shaker.on(10)
		for(var i = 0 ; i<=30 ; i++){
			var hit = new Effect_Hits(this.loc,this.world)
				hit.color = '#00c0ff'
			hit.vel.add(this.explode_rad)
			//hit.vel.setMag(hit.speed)
			this.world.effect.push(hit)
		}
	}else if(this.state ==PLAYER_EXPLODE){
			
		if(this.explosion_cnt <= 0){
			
			this.world.sc.changeState(STATE_DEAD);	
		}else{
			this.explosion_cnt--
		}
	
	}
	//에너지 충전
	if(this.state == PLAYER_ALIVE ){
		
		
		if( this.keys[KEY_C] ){
			this.speed = this.charge_speed;
			if(this.energy_ball.state == PE_HIDE){
				this.energy_ball.state = PE_CHARGE;
				this.effect_charge.isAlive = true;
			}
		}else{
			this.effect_charge.isAlive = false;
			
			this.speed = this.normal_speed
			
			if(this.energy_ball.state == PE_CHARGE ){
				this.energy_ball.fire()
				this.world.add_objs.push(this.energy_ball);
				this.energy_ball = new Player_EnergyBall(this.loc,this.world);
			}
		}
		
		if(this.frozen){
			this.speed = 1.2//this.speed/2
			this.frozen_cnt--;
			if(this.frozen_cnt <=0){
				this.frozen = false;
				this.frozen_cnt =10	
			}
		}
		
		//예속 오브젝트 

		for(var idx in this.world.objs){
				var obj = this.world.objs[idx]
				if( (obj.side == ENEMY_BULLET||obj.side == ENEMY) &&phys_R(this.loc,obj.loc,this.R,obj.R) ){	
					this.life -= obj.life;
					//this.explode_rad = obj.loc.getVec(this.loc)
					this.explode_rad = obj.vel.copy();
				}
		}

		//소형 레이저
		if( this.keys[KEY_Z] ){
			this.laser.isAlive = true;
		}else{this.laser.isAlive = false;}


		//미사일 발사기
		for(var idx in this.follow){
			this.follow[idx].update()
		}
		for(var idx in this.rotate){
			this.rotate[idx].update()
		}


		//필살기
		if(this.keys[SPACE] && this.blaster_energy > 0){
				this.blaster.isAlive = true;
		}
		if(this.blaster.isAlive ){
			this.blaster_energy--;
			if(this.blaster_energy<=0){
				this.blaster_energy=0;
				this.blaster.isAlive = false;
			}
		}
		this.blaster.update()
		this.laser.update()
		this.energy_ball.update()

		//기본 움직임
	   if((this.keys[UP] ^ this.keys[DOWN])){
			this.vel.y = (this.keys[DOWN]-0.5)*2*this.speed;
			if(this.world.height-18 < this.loc.y){this.loc.y = (this.world.height-17)}
			if(0 > this.loc.y){this.loc.y = 1}
		}else{
			this.vel.y = 0;
		}
		if( (this.keys[LEFT] ^ this.keys[RIGHT])){
			this.vel.x = (this.keys[RIGHT]-0.5)*2*this.speed;
			if(this.world.width-10 < this.loc.x){this.loc.x = (this.world.width-11)}
			if(10 > this.loc.x){this.loc.x = 11}
		}else{
			this.vel.x = 0;
		}
		
		this.loc.add(this.vel);//움직임 적용
	}
	
}

Player.prototype.image_size = 32;
Player.prototype.draw = function(){
	
	if(this.state == PLAYER_ALIVE ){
		for(var idx in this.follow){
			this.follow[idx].draw()
		}
		for(var idx in this.rotate){
			this.rotate[idx].draw()
		}
		this.blaster.draw();
		this.laser.draw();
		this.energy_ball.draw();
		if(this.vel.x>0){
			this.world.context.drawImage(this.img,65,33,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2,this.image_size,this.image_size);
		}else if(this.vel.x<0){
			this.world.context.drawImage(this.img,33,33,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2,this.image_size,this.image_size);
		}else{
			this.world.context.drawImage(this.img,1,33,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2,this.image_size,this.image_size);
		}

		if(this.vel.y>0){
			this.world.context.drawImage(this.img,33,1,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2,this.image_size,this.image_size);
		}else if(this.vel.y<0){
			this.world.context.drawImage(this.img,97,1,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2-2,this.image_size,this.image_size+4);
		}else{
			this.world.context.drawImage(this.img,65,1,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2,this.image_size,this.image_size);
		}
		
		if(this.frozen){
			this.world.context.drawImage(this.img_iced,1,1,64,64,this.loc.x-this.image_size/2-5,this.loc.y-this.image_size/2-5,this.image_size+10,this.image_size+10);
		}
	}
	

	
	
}

