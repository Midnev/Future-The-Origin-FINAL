const BOSS2_NORMAL = 0
const BOSS2_ANGRY = 1
const BOSS2_FURIOUS = 2

const BOSS2_ST0 = 0 //없음.
const BOSS2_ST1 = 1 //
const BOSS2_ST2 = 2 //우측 상단으로 이동
const BOSS2_ST3 = 3 //중앙 상단으로 이동
const BOSS2_ST4 = 4


function Enemy_Boss2(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	this.loc = loc ;
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);

	this.img = new Image()
    this.img.src= "./Image/boss2-solid.png"

	this.img2 = new Image()
    this.img2.src= "./Image/boss2-clear.png"

	this.img3 = new Image()
    this.img3.src= "./Image/nblz.png"


	this.pattern = 0;
	this.pattern_datas = [];
	for(var i = 0; i<8 ; i++){
		this.pattern_datas[i] = new PatternData(i)
	}
	this.patterns = [];
	
	this.boss_pat = [new DataSet(26,-28),
					new DataSet(-26,-28),
					new DataSet(0,0)
						]
	this.boss_pat2 =[new DataSet(60,-14),
					new DataSet(-60,-14),
					new DataSet(50,14),
					new DataSet(-50,14),
					new DataSet(20,23),
					new DataSet(-20,23)

						]
	
	this.boss_cnt =0;
	this.boss_max =200
	this.state =  BOSS2_NORMAL;
	//this.state =  BOSS2_FURIOUS
	this.moveto = BOSS2_ST0;

	this.nbl_zone = false
	this.nbl_cnt = 400;
	this.nbl_R = 100;

	this.coord = [new DataSet(this.world.width/2, this.world.height/4),
					new DataSet(this.world.width/4, this.world.height/6),
					new DataSet(this.world.width/2, this.world.height/8),
					new DataSet(this.world.width*(3/4), this.world.height/6),
					]

}
Enemy_Boss2.prototype.time = 1;
Enemy_Boss2.prototype.speed = 5;
Enemy_Boss2.prototype.color ="#ff0000";
Enemy_Boss2.prototype.R = 10;
Enemy_Boss2.prototype.isDead = false;
Enemy_Boss2.prototype.isKilled = false;
Enemy_Boss2.prototype.isMother = true;
Enemy_Boss2.prototype.deathEvent = false;
Enemy_Boss2.prototype.life = 3;
Enemy_Boss2.prototype.max_life = 3;
Enemy_Boss2.prototype.side = ENEMY;


Enemy_Boss2.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Boss2.prototype.type = 0;
Enemy_Boss2.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy_Boss2.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy_Boss2.prototype.killed = function(){
	return new Item(this.type,this.loc,this.world);
}

Enemy_Boss2.prototype.setLife = function(life){
	this.life = life;
	this.max_life = this.life;
}

Enemy_Boss2.prototype.bullet_cnt=0;
Enemy_Boss2.prototype.max_bullet_cnt=10;
Enemy_Boss2.prototype.freq_unit=10;
Enemy_Boss2.prototype.setFreq= function(num){}

Enemy_Boss2.prototype.unit_cnt=0;
Enemy_Boss2.prototype.max_unit_cnt=1000;

Enemy_Boss2.prototype.create = function(){
	var bullets =[];
	if(this.boss_cnt>this.boss_max){
		this.boss_cnt = 0;
			if(this.state == BOSS2_ANGRY){
				for(var idx in this.boss_pat){
					var l = this.loc.copy()
					l.add(this.boss_pat[idx])
					bullets.push(new Enemy_Ballastic_Bullet(l,new DataSet(0,1),this.world))
				}
			}else if(this.state == BOSS2_FURIOUS){
				for(var idx in this.boss_pat2){
					var l = this.loc.copy()
					l.add(this.boss_pat2[idx])
					bullets.push(new Enemy_Ballastic_Bullet(l,new DataSet(0,1),this.world))
				}
			}
	}else{
		this.boss_cnt++;
	}

	for(var idx in this.pattern_datas){
		var obj = this.pattern_datas[idx]
		if(obj.isAlive){
			if(obj.check()){
				//bullets = bullets.concat(this.world.pm.getPattern(parseInt(idx)  ,this.loc )) ;
				bullets = bullets.concat( obj.fire(this.loc) ) ;
			}
		}
	}
	/*
	if(this.unit_cnt >= this.max_unit_cnt){
		var add1 = new Enemy3(this.world.width/6,new DataSet(0,1),this.world);
		var add2 = new Enemy3(this.world.width*5/6,new DataSet(0,1),this.world);
		add1.life = 7+this.world.sc.world_level*2
		add2.life = 7+this.world.sc.world_level*2
		

		this.world.add_objs.push(add1);
		this.world.add_objs.push(add2);

	}else{this.unit_cnt++}
	*/
	
	return bullets;
}



Enemy_Boss2.prototype.update = function(){
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



	if(this.nbl_zone){
		this.nbl_cnt--;
		if(this.nbl_cnt < 0){
			this.nbl_zone = false;
			
		}
		for(var idx in this.world.objs){
		var obj = this.world.objs[idx]
		if( (obj.side == PLAYER_BULLET) &&phys_R(this.loc,obj.loc,this.nbl_R,obj.R) ){	
			obj.kill();
		}
   	 }
		
	}else{
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
	}
	
	if(this.state == BOSS2_ANGRY){
		if( (this.life*100 / this.max_life)<40 ){
			this.nbl_zone = true;
			this.nbl_cnt = 1200;
			this.state = BOSS2_FURIOUS
			this.nbl_R = 200;
		}
	}else if(this.state == BOSS2_FURIOUS){
		if( (this.life*100 / this.max_life)<10 ){
			this.nbl_zone = true;
			this.nbl_cnt = 1200;
			this.nbl_R = 300;
		}

	}else{
		if( (this.life*100 / this.max_life)<70 ){
			this.nbl_zone = true;
			this.nbl_cnt = 400;
			this.state = BOSS2_ANGRY
		}
		
	}
	
	if(this.moveto == BOSS2_ST0){//first move ==>
		if( this.loc.y>this.world.height/3){
			this.moveto = BOSS2_ST1
			this.vel = this.loc.getVec(this.coord[0])
			//this.vel.set(0,0)
		}
	}else if(this.moveto == BOSS2_ST1){//this.world.width/2 this.world.height/2
		if(phys_R(this.loc,this.coord[0],1,1) ){
			this.moveto = BOSS2_ST2
		}else{
			this.vel = this.loc.getVec(this.coord[0])
		}
	}else if(this.moveto == BOSS2_ST2){//this.world.width/4 this.world.height/4
		if(phys_R(this.loc,this.coord[1],1,1) ){
			this.moveto = BOSS2_ST3
		}else{
			this.vel = this.loc.getVec(this.coord[1])
		}
	}else if(this.moveto == BOSS2_ST3){//this.world.width/2 this.world.height/8
		if(phys_R(this.loc,this.coord[2],1,1) ){
			this.moveto = BOSS2_ST4
		}else{
			this.vel = this.loc.getVec(this.coord[2])
		}
	}else if(this.moveto == BOSS2_ST4){//this.world.width*3/4 this.world.height/4
		if(phys_R(this.loc,this.coord[3],1,1) ){
			this.moveto = BOSS2_ST1
				
		}else{
			this.vel = this.loc.getVec(this.coord[3])
		}
	}
			this.vel.setMag(2)


	if( this.loc.x<0||this.loc.x>this.world.width){
		if(phys_R(this.loc,this.coord[3],1,1)){
			this.moveto = BOSS2_ST1
			this.vel.setVec(this.coord[0])
			this.vel.setMag(5)
		}
	}
    if( this.loc.y>this.world.height){//this.loc.y<0||
		if(phys_R(this.loc,this.coord[3],1,1)){
			this.moveto = BOSS2_ST1
			this.vel.setVec(this.coord[0])
			this.vel.setMag(5)
		}
	}
	
    if(this.life <=0){
		this.kill();
	}
	 move(this.loc,this.vel,this.acc)
}

Enemy_Boss2.prototype.draw = function(){

	if(this.nbl_zone){
		this.world.context.drawImage(this.img3,1,1,128,128,this.loc.x- this.nbl_R,this.loc.y-this.nbl_R,2*this.nbl_R,2*this.nbl_R);
	}
	
	if(this.state == BOSS2_ANGRY){
		this.world.context.drawImage(this.img2,65,1,64,64,this.loc.x- 6*this.R,this.loc.y-6*this.R,12*this.R,12*this.R);
	}else if(this.state == BOSS2_FURIOUS){
		this.world.context.drawImage(this.img2,129,1,64,64,this.loc.x- 6*this.R,this.loc.y-6*this.R,12*this.R,12*this.R);
	}
	
	

	this.world.context.drawImage(this.img,1,1,64,64,this.loc.x- 6*this.R,this.loc.y-6*this.R,12*this.R,12*this.R);
	drawHP(this.context,(this.life/this.max_life))
}


