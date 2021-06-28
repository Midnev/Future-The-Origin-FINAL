function Enemy_Boss3_Part_2(loc,pos,world){
	this.world = world;
	this.context = this.world.context;

	this.parent_loc = loc;
	this.loc = loc.copy() ;
	this.pos = pos;
	this.vel = new DataSet(0,0);
	this.acc = new DataSet(0,0);
	
	this.loc.add(this.pos);

	this.img = new Image()
    this.img.src= "./Image/boss3-2.png"

}
Enemy_Boss3_Part_2.prototype.time = 1;
Enemy_Boss3_Part_2.prototype.speed = 1;
Enemy_Boss3_Part_2.prototype.color ="#ff0000";
Enemy_Boss3_Part_2.prototype.R = 40;
Enemy_Boss3_Part_2.prototype.isDead = false;
Enemy_Boss3_Part_2.prototype.isKilled = false;
Enemy_Boss3_Part_2.prototype.isMother = true;
Enemy_Boss3_Part_2.prototype.deathEvent = false;
Enemy_Boss3_Part_2.prototype.life = 3;
Enemy_Boss3_Part_2.prototype.max_life = 3;
Enemy_Boss3_Part_2.prototype.side = ENEMY;


Enemy_Boss3_Part_2.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Boss3_Part_2.prototype.type = 0;
Enemy_Boss3_Part_2.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy_Boss3_Part_2.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy_Boss3_Part_2.prototype.killed = function(){}

Enemy_Boss3_Part_2.prototype.setLife = function(life){
	this.life = life;
	this.max_life = life;
}

Enemy_Boss3_Part_2.prototype.bullet_cnt=0;
Enemy_Boss3_Part_2.prototype.max_bullet_cnt=10;
Enemy_Boss3_Part_2.prototype.freq_unit=10;
Enemy_Boss3_Part_2.prototype.setFreq= function(num){}


Enemy_Boss3_Part_2.prototype.create = function(){
	var bullets =[];
		if(this.life>0){
		var deg = Math.PI*(4/9)+Math.PI*(1/9)*Math.random()
		var vel = new DataSet(0,0);
		vel.setRad(deg)
		var bul = new Enemy_Bullet_Freezer(this.loc,vel,this.world);
		bul.setSpeed( 1 + 3*Math.random() )
		bul.loc.y+=40;
		bullets.push(bul);
		}
	
	return bullets;
}


Enemy_Boss3_Part_2.prototype.update = function(){
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
	}


	this.loc = this.parent_loc.copy()
    this.loc.add(this.pos);

}
Enemy_Boss3_Part_2.prototype.img_size = 50;
Enemy_Boss3_Part_2.prototype.draw = function(){
	if(this.life>0){
		var i = this.img_size
		this.world.context.drawImage(this.img,1,1,64,64,this.loc.x-i,this.loc.y-i,2*i,2*i);
		
		
	}
}


