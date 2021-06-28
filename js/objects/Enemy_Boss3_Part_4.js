

function Enemy_Boss3_Part_4(loc,pos,world){
	this.world = world;
	this.context = this.world.context;

	this.parent_loc = loc;
	this.loc = loc.copy() ;
	this.pos = pos;
	this.vel = new DataSet(0,0);
	this.acc = new DataSet(0,0);
	
	this.loc.add(this.pos);

	this.img = new Image()
    this.img.src= "./Image/boss3-4.png"
	
	this.state = B3_SP_BUL;

	this.boss_pat_load = true;
	this.boss_pat = new Enemy_Boss_Laser(this.loc,new DataSet(-5,65),this.world)
}
Enemy_Boss3_Part_4.prototype.time = 1;
Enemy_Boss3_Part_4.prototype.speed = 1;
Enemy_Boss3_Part_4.prototype.color ="#ff0000";
Enemy_Boss3_Part_4.prototype.R = 30;
Enemy_Boss3_Part_4.prototype.isDead = false;
Enemy_Boss3_Part_4.prototype.isKilled = false;
Enemy_Boss3_Part_4.prototype.isMother = true;
Enemy_Boss3_Part_4.prototype.deathEvent = false;
Enemy_Boss3_Part_4.prototype.life = 3;
Enemy_Boss3_Part_4.prototype.max_life = 3;
Enemy_Boss3_Part_4.prototype.side = ENEMY;


Enemy_Boss3_Part_4.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Boss3_Part_4.prototype.type = 0;
Enemy_Boss3_Part_4.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy_Boss3_Part_4.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy_Boss3_Part_4.prototype.killed = function(){}

Enemy_Boss3_Part_4.prototype.setLife = function(life){
	this.life = life;
	this.max_life = life;
}

Enemy_Boss3_Part_4.prototype.bullet_cnt=0;
Enemy_Boss3_Part_4.prototype.max_bullet_cnt=150;
Enemy_Boss3_Part_4.prototype.freq_unit=10;
Enemy_Boss3_Part_4.prototype.setFreq= function(num){}

Enemy_Boss3_Part_4.prototype.create = function(){
	var bullets =[];
		if(this.life >0 && this.state ==  B3_SP_BUL){
			if(this.bullet_cnt>this.max_bullet_cnt){
				this.bullet_cnt = 0;
				var bull= new Enemy_Ballastic_Bullet(this.loc,new DataSet(1,-1),this.world) 
					bull.life_cnt =200
				bullets.push(bull);
			}else{
				this.bullet_cnt++;
			}
		}
	return bullets;
}


Enemy_Boss3_Part_4.prototype.wait_cnt = 0
Enemy_Boss3_Part_4.prototype.update = function(){
	if(this.life>0){
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
		//레이져 업데이트
	this.boss_pat.update()
		if(this.state ==B3_SP_LASER){
			//this.boss_pat.update()
			if(this.boss_pat_load){
				this.boss_pat.on()
				this.boss_pat_load =false
			}
			if(this.wait_cnt>1000){
				this.wait_cnt =0;
				this.state = B3_SP_BUL
			}else{this.wait_cnt++}
		}else{
			if(this.wait_cnt>500){
				this.wait_cnt =0;
				this.boss_pat_load = true
				this.state =B3_SP_LASER
			}else{this.wait_cnt++}
		}


	}

	this.loc = this.parent_loc.copy()
	this.boss_pat.p_loc = this.loc
    this.loc.add(this.pos);

	
}

Enemy_Boss3_Part_4.prototype.img_size = 30;
Enemy_Boss3_Part_4.prototype.draw = function(){
	if(this.life>0){
		var i = this.img_size
			this.world.context.drawImage(this.img,1,1,32,84,this.loc.x-i,this.loc.y-i-42,2*i,5*i);
			this.boss_pat.draw()
	}
}


