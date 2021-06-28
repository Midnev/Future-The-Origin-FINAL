function Enemy(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	this.loc = loc ;
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);
	
	this.rad = this.vel.getRad();
	this.img = new Image()
    this.img.src= "./Image/enemy-clear.png"
}
Enemy.prototype.time = 1;
Enemy.prototype.speed = 1;
Enemy.prototype.color ="#ff0000";
Enemy.prototype.R = 15;
Enemy.prototype.isDead = false;
Enemy.prototype.isKilled = false;
Enemy.prototype.isMother = true;
Enemy.prototype.deathEvent = false;
Enemy.prototype.life = 3;
Enemy.prototype.pattern = 0;
Enemy.prototype.side = ENEMY;

Enemy.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}
Enemy.prototype.setLife = function(life){
	this.life = life;
	this.max_life = life
}
Enemy.prototype.type = 0;
Enemy.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy.prototype.bullet_cnt=0;
Enemy.prototype.max_bullet_cnt=25;
Enemy.prototype.setFreq= function(num){
		this.max_bullet_cnt +=this.max_bullet_cnt*num;
}
Enemy.prototype.create = function(){
	var bullets =[];
	if(this.bullet_cnt>this.max_bullet_cnt){
		this.bullet_cnt = 0;
		//bullets.push( new Enemy_Bullet(this.loc,new DataSet(0,1),world) );
		bullets = this.world.pm.getPattern(this.pattern,this.loc) ;
	}else{
		this.bullet_cnt++;
	}
	return bullets;
}
Enemy.prototype.update = function(){
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
Enemy.prototype.killed = function(){
	
	return new Item(this.type,this.loc,this.world);
}

Enemy.prototype.image_size = 30;
Enemy.prototype.draw = function(){

	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(this.rad - Math.PI/2)//- Math.PI)
	this.world.context.drawImage(this.img,1+(this.type*32),1,32,32,-this.image_size/2,-this.image_size/2,this.image_size,this.image_size);
	this.context.rotate(-this.rad + Math.PI/2)//+ Math.PI);
	this.context.translate(-this.loc.x,-this.loc.y)


}




