function Enemy_Boss(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	this.loc = loc ;
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);

	this.img = new Image()
    this.img.src= "./Image/boss.png"
	
	this.pattern = 0;
	this.pattern_datas = [];
	for(var i = 0; i<8 ; i++){
		this.pattern_datas[i] = new PatternData(i)
	}
	this.patterns = [];
	
	this.boss_pat_load = true;
	this.boss_pat = [new Enemy_Boss_Laser(this.loc,new DataSet(0,41),this.world),
					new Enemy_Boss_Laser(this.loc,new DataSet(34,-8),this.world),
					new Enemy_Boss_Laser(this.loc,new DataSet(-34,-8),this.world)
					]

}
Enemy_Boss.prototype.time = 1;
Enemy_Boss.prototype.speed = 1;
Enemy_Boss.prototype.color ="#ff0000";
Enemy_Boss.prototype.R = 30;
Enemy_Boss.prototype.isDead = false;
Enemy_Boss.prototype.isKilled = false;
Enemy_Boss.prototype.isMother = true;
Enemy_Boss.prototype.deathEvent = false;
Enemy_Boss.prototype.life = 3;
Enemy_Boss.prototype.max_life = 3;
Enemy_Boss.prototype.side = ENEMY;

Enemy_Boss.prototype.clearable = false;

Enemy_Boss.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Boss.prototype.type = 0;
Enemy_Boss.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy_Boss.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy_Boss.prototype.killed = function(){}

Enemy_Boss.prototype.setLife = function(life){
	this.life = life;
	this.max_life = this.life;
}

Enemy_Boss.prototype.bullet_cnt=0;
Enemy_Boss.prototype.max_bullet_cnt=10;
Enemy_Boss.prototype.freq_unit=10;
Enemy_Boss.prototype.setFreq= function(num){}

Enemy_Boss.prototype.create = function(){
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
	return bullets;
}


Enemy_Boss.prototype.update = function(){

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

	if(this.boss_pat_load &&  ((this.life*100/this.max_life)%30<1)){
		this.life--;
		this.boss_pat_load = false;
		this.boss_pat[0].on()
		this.boss_pat[1].on()
		this.boss_pat[2].on()
	}else if(!this.boss_pat_load &&  ((this.life*100/this.max_life)%30<1)){

		this.boss_pat_load =true;
	}
	


	if( this.loc.y>this.world.height/3){//this.loc.y<0||
		this.vel.set(0,0)
	}
	if( ((this.world.width/2 + 10)>this.loc.x && (this.world.width/2 - 10)<this.loc.x ) 
			||  ((this.world.height/3 + 10)>this.loc.y && (this.world.height/3 - 10)<this.loc.y)   ){
		this.vel.getVec(this.world.width/2,this.world.height/3)
		this.vel.setMag(this.speed);
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

	//레이져 업데이트
	for(var idx in this.boss_pat){
		this.boss_pat[idx].update()
   	 }
	 move(this.loc,this.vel,this.acc)
}

Enemy_Boss.prototype.draw = function(){
	
	this.world.context.drawImage(this.img,65,1,64,64,this.loc.x- 3/2*this.R,this.loc.y-3/2*this.R,3*this.R,3*this.R);
	this.world.context.drawImage(this.img,1,1,64,64,this.loc.x-3/2*this.R,this.loc.y-3/2*this.R,3*this.R,3*this.R);
	
	for(var idx in this.boss_pat){
		this.boss_pat[idx].draw()
   	 }
	drawHP(this.context,(this.life/this.max_life))
}


