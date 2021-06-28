function Enemy3(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	this.loc = loc ;
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);

	this.rad = this.vel.getRad();
	this.img = new Image()
    this.img.src= "./Image/enemy3.png"

	
}
Enemy3.prototype.time = 5;
Enemy3.prototype.speed = 5;
Enemy3.prototype.color ="#ff0000";
Enemy3.prototype.R = 20;
Enemy3.prototype.isDead = false;
Enemy3.prototype.isKilled = false;
Enemy3.prototype.isMother = true;
Enemy3.prototype.deathEvent = false;
Enemy3.prototype.life = 3;
Enemy3.prototype.pattern = 0;
Enemy3.prototype.side = ENEMY;

Enemy3.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy3.prototype.type = 0;
Enemy3.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy3.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy3.prototype.setLife = function(life){
	this.life = life;
	this.max_life = life
}
Enemy3.prototype.bullet_cnt=0;
Enemy3.prototype.max_bullet_cnt=25;
Enemy3.prototype.setFreq= function(num){
		this.max_bullet_cnt +=this.max_bullet_cnt*num;
}
Enemy3.prototype.create = function(){
	var bullets =[];
		if(this.bullet_cnt>this.max_bullet_cnt){
		this.bullet_cnt = 0;
		//bullets.push( new Enemy_Bullet(this.loc,new DataSet(0,1),world) );

		bullets = this.world.pm.getPattern(this.pattern,this.loc) ;


		bullets.push (new Enemy_Laser_Gadget(this.loc,new DataSet(0,0),this.world) );
		}else{
			this.bullet_cnt++;
		}
		
	return bullets;
}
Enemy3.prototype.update = function(){



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
Enemy3.prototype.killed = function(){
	return new Item(this.type,this.loc,this.world);
}

Enemy3.prototype.image_size = 40;
Enemy3.prototype.draw = function(){
	//this.context.fillStyle = this.color;
	//drawCircle(this.context, this.loc.x, this.loc.y, this.R);

	//this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2,this.image_size,this.image_size);
	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(this.rad - Math.PI/2)//- Math.PI)
	this.world.context.drawImage(this.img,1+(this.type*32),1,32,32,-this.image_size/2,-this.image_size/2,this.image_size,this.image_size);
	this.context.rotate(-this.rad + Math.PI/2)//+ Math.PI);
	this.context.translate(-this.loc.x,-this.loc.y)
}




