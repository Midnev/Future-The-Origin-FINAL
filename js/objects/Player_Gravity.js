function Player_Gravity(loc,world){
	this.world = world;
	this.context = world.context;
	
	this.loc = loc.copy() ;
	this.vel = new DataSet(0,-1);
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);
	this.img = new Image();
    this.img.src= "./Image/gravity.png"
	this.img2 = new Image();
    this.img2.src= "./Image/gravity2.png"

}
Player_Gravity.prototype.speed = 4;
Player_Gravity.prototype.color ="#0000ff";
Player_Gravity.prototype.R = 5;
Player_Gravity.prototype.max_R = 200;
Player_Gravity.prototype.isDead = false;
Player_Gravity.prototype.isKilled = false;
Player_Gravity.prototype.isMother = false;
Player_Gravity.prototype.deathEvent = false;
Player_Gravity.prototype.isKilled = false;
Player_Gravity.prototype.life = 1;

Player_Gravity.prototype.side = NEUTRAL;

Player_Gravity.prototype.dead = function(){
	this.isDead = true;
}

Player_Gravity.prototype.kill = function(){
	
	this.isKilled = true;
	this.isDead = true;
}

Player_Gravity.prototype.imverse = function(){
}

Player_Gravity.prototype.gravitySize = 0.00005;

Player_Gravity.prototype.cnt = 0;
Player_Gravity.prototype.max_cnt = 50;
Player_Gravity.prototype.time_limit = 0;
Player_Gravity.prototype.update = function(){
	if(this.speed >0 ){
		this.speed -= 0.02;
		this.vel.setMag(this.speed)
	}else{
		if(this.R<this.max_R){this.R++}
		for(var idx in this.world.objs){
				var obj = this.world.objs[idx]
				if(phys_R(this.loc,obj.loc,this.R,obj.R) ){
					var acc  = obj.loc.getVec(this.loc)
					obj.vel.set(0,0)
					acc.setMag( this.gravitySize *( distsq(this.loc,obj.loc) - this.R) );// 
					//log(this.R - distsq(this.loc,obj.loc))
					obj.acc=acc;
				}

		}
		
		if(this.max_cnt<=this.cnt){
			this.cnt=0
			this.time_limit++
			this.gravitySize = this.gravitySize*1.2
			if(this.time_limit >10){		
				this.kill()
			}
		}else{this.cnt++;}
	}

	

	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    	if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}
	
if(this.isDead){
	for(var idx in this.world.objs){
		var obj = this.world.objs[idx]
		if( obj.side != PLAYER  && phys_R(this.loc,obj.loc,this.R,obj.R) ){
			if(obj.side == ENEMY){
				obj.vel.set(0,0)
				obj.acc.set(0,0)
				obj.life-=50;
			}else{obj.isDead = true;}
		}
	}


}
	 this.loc.add(this.vel);
}


Player_Gravity.prototype.degree = 0
Player_Gravity.prototype.image_size = 0;
Player_Gravity.prototype.draw = function(){
	//this.context.fillStyle = this.color;
	//drawCircle(this.context, this.loc.x, this.loc.y,5);
	var r2 = 2*this.R* ((this.max_cnt - this.cnt)/this.max_cnt)
	this.world.context.drawImage(this.img2,1,1,128,128,this.loc.x-r2/2,this.loc.y-r2/2,r2,r2);
	this.world.context.drawImage(this.img2,1,1,128,128,this.loc.x-r2/2,this.loc.y-r2/2,r2,r2);

	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(-Math.PI*this.degree/180);
	this.world.context.drawImage(this.img,1,1,128,128,-this.R,-this.R,2*this.R,2*this.R);
	this.context.rotate(Math.PI*this.degree/180)
	
	this.context.translate(-this.loc.x,-this.loc.y)
	this.degree++;
	if(this.degree >360){this.degree-=360;}
	

	//this.world.context.drawImage(this.img,1,1,128,128,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);

	if(this.degree >360){this.degree-=360;}
}

