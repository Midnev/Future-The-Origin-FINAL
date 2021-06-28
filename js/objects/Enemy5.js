
function Enemy5(loc,vel,world){
	this.world = world;
	this.context = this.world.context;
	this.loc = loc ;
	this.vel = vel;
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);

	this.state = E4_HIDDEN;
	
	this.rad = this.vel.getRad();
	this.hidable = true;
	this.hiding = false;
	this.hidden_cnt = 50

	this.img = new Image()
    this.img.src= "./Image/enemy5.png"


}
Enemy5.prototype.time = 1;
Enemy5.prototype.speed = 1;
Enemy5.prototype.color ="#ff0000";
Enemy5.prototype.R = 15;
Enemy5.prototype.isDead = false;
Enemy5.prototype.isKilled = false;
Enemy5.prototype.isMother = true;
Enemy5.prototype.deathEvent = false;
Enemy5.prototype.life = 3;
Enemy5.prototype.max_life = 3;
Enemy5.prototype.pattern = 0;
Enemy5.prototype.side = ENEMY

Enemy5.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}
Enemy5.prototype.setLife = function(life){
	this.life = life;
	this.max_life = life
}

Enemy5.prototype.type = 0;
Enemy5.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy5.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy5.prototype.bullet_cnt=0;
Enemy5.prototype.max_bullet_cnt=25;
Enemy5.prototype.setFreq= function(num){
		this.max_bullet_cnt +=this.max_bullet_cnt*num;
}
Enemy5.prototype.create = function(){
	var bullets =[];
		var vel = new DataSet(0,0)
		vel.setRad(2*Math.PI*Math.random())
		var bul = new Enemy_Bullet_Freezer(this.loc,vel,this.world);
		bul.setSpeed( 1 + 3*Math.random() )
		bullets.push(bul);
	return bullets;
}
Enemy5.prototype.update = function(){
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
Enemy5.prototype.killed = function(){
	return new Item(this.type,this.loc,this.world);
}

Enemy5.prototype.image_size = 30;

Enemy5.prototype.draw = function(){

	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(this.rad - Math.PI/2)//- Math.PI)
	this.world.context.drawImage(this.img,1+(this.type*32),1,32,32,-this.image_size/2,-this.image_size/2,this.image_size,this.image_size);
	this.context.rotate(-this.rad + Math.PI/2)//+ Math.PI);
	this.context.translate(-this.loc.x,-this.loc.y)

	
	

}




