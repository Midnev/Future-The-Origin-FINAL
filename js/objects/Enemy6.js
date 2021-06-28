
function Enemy6(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	this.loc = loc.copy() ;
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);

	this.state = false;
	
	this.rad = this.vel.getRad();


	this.img = new Image()
    this.img.src= "./Image/enemy6.png"


}
Enemy6.prototype.time = 1;
Enemy6.prototype.speed = 1;
Enemy6.prototype.color ="#ff0000";
Enemy6.prototype.R = 15;
Enemy6.prototype.isDead = false;
Enemy6.prototype.isKilled = false;
Enemy6.prototype.isMother = true;
Enemy6.prototype.deathEvent = false;
Enemy6.prototype.life = 1;
Enemy6.prototype.max_life = 3;
Enemy6.prototype.pattern = 1;
Enemy6.prototype.side = ENEMY

Enemy6.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}
Enemy6.prototype.setLife = function(life){
	this.life = life;
	this.max_life = life
}

Enemy6.prototype.type = 0;
Enemy6.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy6.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy6.prototype.bullet_cnt=0;
Enemy6.prototype.max_bullet_cnt=80;
Enemy6.prototype.setFreq= function(num){
		this.max_bullet_cnt +=this.max_bullet_cnt*num;
}
Enemy6.prototype.create = function(){
	var bullets =[];
		if(this.bullet_cnt>this.max_bullet_cnt){
			this.bullet_cnt = 0;
			this.world.add_objs.push(this.energy_ball);
			this.energy_ball = new Enemy_EnergyBall(this,this.world);
		}else{
			this.bullet_cnt++;
		}
	return bullets;
}
Enemy6.prototype.update = function(){
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
Enemy6.prototype.killed = function(){
	return new Item(this.type,this.loc,this.world);
}

Enemy6.prototype.image_size = 30;

Enemy6.prototype.draw = function(){

	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(this.rad - Math.PI/2)//- Math.PI)
	this.world.context.drawImage(this.img,1,1,32,32,-this.image_size/2,-this.image_size/2,this.image_size,this.image_size);
	this.context.rotate(-this.rad + Math.PI/2)//+ Math.PI);
	this.context.translate(-this.loc.x,-this.loc.y)
}







