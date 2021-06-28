function Totem(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	this.loc = loc//new DataSet() ;
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);
	
	this.rad = this.vel.getRad();
	this.img = new Image()
    this.img.src= "./Image/totem.png"

	this.pattern_datas = [];
	for(var i = 0; i<10 ; i++){
		this.pattern_datas[i] = new PatternData(i)
	}

	this.fo = true;
	 if(this.fo){
		this.fo = false
		this.pattern_datas[9].isAlive = true;
		this.pattern_datas[9].setFreq(19);
		this.pattern_datas[8].isAlive = true;
		this.pattern_datas[8].setFreq(20);

		this.pattern_datas[1].isAlive = true;
		this.pattern_datas[1].setFreq(19);
		this.pattern_datas[3].isAlive = true;
		this.pattern_datas[3].setFreq(22);
		this.pattern_datas[4].isAlive = true;
		this.pattern_datas[4].setFreq(23);
		this.pattern_datas[6].isAlive = true;
		this.pattern_datas[6].setFreq(24);

	 }
}
Totem.prototype.time = 1;
Totem.prototype.speed = 1;
Totem.prototype.color ="#ff0000";
Totem.prototype.R = 15;
Totem.prototype.isDead = false;
Totem.prototype.isKilled = false;
Totem.prototype.isMother = true;
Totem.prototype.deathEvent = false;
Totem.prototype.life = 100;
Totem.prototype.max_life = 100;
Totem.prototype.pattern = 0;
Totem.prototype.side = NEUTRAL;

Totem.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Totem.prototype.type = 0;
Totem.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Totem.prototype.kill = function(){
	//this.isKilled = true;
	//this.isDead = true;
}
Totem.prototype.bullet_cnt=0;
Totem.prototype.max_bullet_cnt=25;
Totem.prototype.setFreq= function(num){
		for(var idx in this.pattern_datas){
			this.pattern_datas[idx].setFreq(num)
		}
}
Totem.prototype.create = function(){
	var bullets =[];
		for(var idx in this.pattern_datas){
			var obj = this.pattern_datas[idx]
			if(obj.isAlive){
				if(obj.check()){
					bullets = bullets.concat( obj.fire(this.loc) ) ;
				}
			}
		}
	return bullets;
}


Totem.prototype.update = function(){
	for(var idx in this.world.objs){
		var obj = this.world.objs[idx]
		if( (obj.side == PLAYER_BULLET) &&phys_R(this.loc,obj.loc,this.R,obj.R) ){	
			obj.kill();
			this.world.score++;
			for(var i = 0 ; i<=3 ; i++){
				this.world.effect.push(new Effect_Hits(obj.loc,this.world))
			}
		}
   	 }
	if(this.bullet_cnt>=this.max_bullet_cnt){
	this.bullet_cnt = 0
		for(var idx in this.pattern_datas){
			if(this.pattern_datas[idx].freq>10){
				this.pattern_datas.freq--
			}
		 }
	}else{this.bullet_cnt++}

}
Totem.prototype.killed = function(){}

Totem.prototype.image_size = 30;
Totem.prototype.draw = function(){

	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(this.rad - Math.PI/2)//- Math.PI)
	this.world.context.drawImage(this.img,1,1,32,32,-this.image_size/2,-this.image_size/2,this.image_size,this.image_size);
	this.context.rotate(-this.rad + Math.PI/2)//+ Math.PI);
	this.context.translate(-this.loc.x,-this.loc.y)


}




