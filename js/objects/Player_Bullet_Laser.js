function Player_Bullet_Laser(parent_loc,world){
	this.world = world;
	this.context = world.context;
	
	this.loc = parent_loc ;
	this.des = parent_loc.y

	this.vel = new DataSet(0,0);
	this.acc = new DataSet(0,0);
	this.img = new Image()
    this.img.src= "./Image/laser.png"
	this.img2 = new Image()
    this.img2.src= "./Image/laser_effect.png"


	this.width = 6;
	this.height = this.world.height +100;
	this.height_norm = this.height;
	this.isAlive = false;
}
Player_Bullet_Laser.prototype.speed = 4;
Player_Bullet_Laser.prototype.color ="#0000ff";
Player_Bullet_Laser.prototype.R = 2;
Player_Bullet_Laser.prototype.isDead = false;
Player_Bullet_Laser.prototype.isKilled = false;
Player_Bullet_Laser.prototype.isMother = false;
Player_Bullet_Laser.prototype.deathEvent = false;
Player_Bullet_Laser.prototype.isKilled = false;
Player_Bullet_Laser.prototype.life = 0.2;

Player_Bullet_Laser.prototype.side = PLAYER_BULLET;

Player_Bullet_Laser.prototype.dead = function(){
	this.isDead = true;
}

Player_Bullet_Laser.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}


Player_Bullet_Laser.prototype.update = function(){
	if(this.isAlive){
		this.height = this.height_norm
		var obj
		var target = 0
		for(var idx in this.world.objs){
			obj = this.world.objs[idx]
			
			if( obj.side == ENEMY && this.phys_sq(obj.loc,obj.R)  ){	
				if(obj.life>0 ){
					this.loc.y - obj.loc.y-obj.R
					var leng = this.loc.y-obj.loc.y
					if(this.height > leng){
						this.height = leng
						target = obj;
						this.desc = obj.loc.y
					}
				}
			}
   		}
		if(target !=0){	
				if(target.life>0){
					target.life-=this.life;
					this.world.effect.push(new Effect_Hits(new DataSet(this.loc.x,this.desc),this.world))
				}else{
					target.kill();
				}
		}else{
			
		}
	}
}


Player_Bullet_Laser.prototype.draw = function(){
	if(this.isAlive){
		this.context.fillStyle = this.color;
		this.world.context.drawImage(this.img,35,1,188,514,this.loc.x-this.width/2 ,this.loc.y ,this.width,-this.height+10);
		if(this.height == this.height_norm){
			this.desc = this.height_norm
		}
		
		this.world.context.drawImage(this.img2,1+parseInt(Math.random()*4)*32,1,32,32,this.loc.x-8 ,this.desc+10,16,16);
	}
}

Player_Bullet_Laser.prototype.phys_sq = function(v1 , r){
	if(this.loc.y >= v1.y  ){
		if(this.loc.x-this.width/2 < (v1.x+r)  && this.loc.x+this.width/2> (v1.x-r)){
			return true;
		}
	}
}