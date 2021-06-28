const B3_ARMED = 0;
const B3_CORE = 1;
const B3_GEN = 2;

const B3_SP_BUL = 0
const B3_SP_LASER = 1

function Enemy_Boss3(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	this.loc = loc ;
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);

	this.img = new Image()
    this.img.src= "./Image/boss3-1.png"
	

	this.pattern = 0;
	this.pattern_datas = [];
	for(var i = 0; i<8 ; i++){
		this.pattern_datas[i] = new PatternData(i)
	}

	this.patterns = [];
	
	this.boss_pat_load = true;
	this.boss_pat = []
	
	this.state = B3_GEN;
	this.parts = [ new Enemy_Boss3_Part_2(this.loc,new DataSet(0,90),this.world),
					new Enemy_Boss3_Part_3(this.loc,new DataSet(-60,30),this.world),
					new Enemy_Boss3_Part_4(this.loc,new DataSet(60,30),this.world)
					];
	
	this.effect_charge = new Effect_Charge(this.loc,this.world);
	this.effect_charge.R=30;
	this.effect_charge.light_R=3;
	this.effect_charge.color = "#ff0000"
	this.effect_charge.isAlive = true;
	this.effect_charge.max_cnt = 15;
	this.charge = false

}
Enemy_Boss3.prototype.time = 1;
Enemy_Boss3.prototype.speed = 1;
Enemy_Boss3.prototype.color ="#ff0000";
Enemy_Boss3.prototype.R = 35;
Enemy_Boss3.prototype.R2 = 20;
Enemy_Boss3.prototype.isDead = false;
Enemy_Boss3.prototype.isAlive = true;
Enemy_Boss3.prototype.isKilled = false;
Enemy_Boss3.prototype.isMother = true;
Enemy_Boss3.prototype.deathEvent = false;
Enemy_Boss3.prototype.life = 3;
Enemy_Boss3.prototype.max_life = 3;
Enemy_Boss3.prototype.side = ENEMY;


Enemy_Boss3.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Boss3.prototype.type = 0;
Enemy_Boss3.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy_Boss3.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy_Boss3.prototype.killed = function(){}

Enemy_Boss3.prototype.setLife = function(life){
	this.life = life;
	this.max_life = this.life;
	for(var idx in this.parts){
		this.parts[idx].setLife(this.life)
	}
}

Enemy_Boss3.prototype.bullet_cnt=0;
Enemy_Boss3.prototype.max_bullet_cnt=40;
Enemy_Boss3.prototype.freq_unit=10;
Enemy_Boss3.prototype.setFreq= function(num){}

Enemy_Boss3.prototype.create = function(){
	var bullets =[];

	for(var idx in this.pattern_datas){
		var obj = this.pattern_datas[idx]
		if(obj.isAlive){
			if(obj.check()){
				//bullets = bullets.concat(this.world.pm.getPattern(parseInt(idx)  ,this.loc )) ;
				bullets = bullets.concat( obj.fire(this.loc) ) ;
			}
		}
	}

		if(this.max_bullet_cnt<=this.bullet_cnt&&distsq(this.loc,this.world.player.loc) <= 200*200){
			this.bullet_cnt =0
			bullets = bullets.concat(this.world.pm.getPattern(1,this.loc))
		}else{
			this.bullet_cnt++	
		}


	return bullets;
}

Enemy_Boss3.prototype.tes = false
Enemy_Boss3.prototype.update = function(){

	if( (this.patterns.length>0)&& (this.patterns[0][0]>= (this.life*100/this.max_life)  ) ){
		var pat = this.pattern_datas[this.patterns[0][2]]
		
		if(this.patterns[0][1] == 1){
			pat.isAlive = true;
			pat.setFreq(this.patterns[0][3]);
		}else{
			pat.isAlive = false;
		}
		this.patterns.splice(0,1)
	}

	if( ((this.world.width/2 + 10)>this.loc.x && (this.world.width/2 - 10)<this.loc.x ) 
			||  ((this.world.height/3 + 10)>this.loc.y && (this.world.height/3 - 10)<this.loc.y)   ){
		this.vel.getVec(this.world.width/2,this.world.height/3)
		this.vel.setMag(this.speed);
	}
	
	if( this.loc.y>this.world.height/8){//this.loc.y<0||
		this.vel.set(0,0)
	}

	if(this.state == B3_ARMED){
		
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
			this.state = B3_CORE
			this.life = this.max_life
			this.R = this.R2
			this.parts[0].life = 100
		}
		
	
	}else if(this.state == B3_CORE){
		this.tes = (this.parts[0].life>0) | (this.parts[1].life>0) | (this.parts[2].life>0)
		for(var idx in this.world.objs){
			var obj = this.world.objs[idx]
			if((obj.side == PLAYER_BULLET) &&phys_R(this.loc,obj.loc,this.R2,obj.R) ){	
				obj.kill();
				this.life -=obj.life;
				for(var i = 0 ; i<=3 ; i++){
					this.world.effect.push(new Effect_Hits(obj.loc,this.world))
				}
			}
		 }

		if(this.life/this.max_life*100 < 90){
			this.charge = true
			this.effect_charge.update()
				this.life+= 0.1//===============================
		}else{
			this.charge = false
		}



		 if(this.life <=0){
			for(var idx in this.parts){
				this.parts[idx].isDead = true;
			}
			this.kill();
		}

	}else{
		
		this.world.add_objs = this.world.add_objs.concat(this.parts)
		this.state = B3_ARMED;
	}
	
	if( this.world.width < this.loc.x && 0>this.loc.x  
			||  this.world.height < this.loc.y && 0>this.loc.y     ){
		this.vel.getVec(this.world.width/2,this.world.height/3)
		this.vel.setMag(this.speed);
	}

	 move(this.loc,this.vel,this.acc)
}

Enemy_Boss3.prototype.img_size = 100;
Enemy_Boss3.prototype.draw = function(){
	
	if(this.charge){
		this.effect_charge.draw()
	}


	var i = this.img_size
	this.context.translate(0,42)
	this.world.context.drawImage(this.img,1,1,128,128,this.loc.x-i,this.loc.y-i,2*i,2*i);
		if(this.state == B3_ARMED){
			this.world.context.drawImage(this.img,129,1,128,128,this.loc.x-i,this.loc.y-i,2*i,2*i);
		}else if(!this.tes){
		
		}
	this.context.translate(0,-42)

	drawHP(this.context,(this.life/this.max_life))
}


