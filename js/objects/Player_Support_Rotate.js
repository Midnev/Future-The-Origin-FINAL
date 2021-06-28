function Player_Support_Rotate(parent,degree,world){
	this.world = world;
	this.context = this.world.context;
	
	this.parent_loc = parent.loc
	this.loc = this.parent_loc.copy() ;
	this.vel = new DataSet(0,0);

	this.degree_unit = 2*Math.PI/360;
	this.degree = degree;

	this.img = new Image()
    this.img.src= "./Image/player_Rotate.png"
}
Player_Support_Rotate.prototype.speed = 3;
Player_Support_Rotate.prototype.color ="#000000";
Player_Support_Rotate.prototype.R = 5;
Player_Support_Rotate.prototype.isDead = false;
Player_Support_Rotate.prototype.isAlive = false;
Player_Support_Rotate.prototype.isKilled = false;
Player_Support_Rotate.prototype.isMother = true;
Player_Support_Rotate.prototype.deathEvent = false;
Player_Support_Rotate.prototype.isKilled = false;
Player_Support_Rotate.prototype.life = 3;

Player_Support_Rotate.prototype.side = PLAYER_BULLET;


Player_Support_Rotate.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}

Player_Support_Rotate.prototype.imverse = function(){}

Player_Support_Rotate.prototype.bullet_cnt=0;
Player_Support_Rotate.prototype.max_bullet_cnt=15;
Player_Support_Rotate.prototype.create = function(){
	var bullets =[];
	if(this.isAlive){
		if(this.bullet_cnt>this.max_bullet_cnt){
			this.bullet_cnt = 0;
			bullets.push( new Player_Bullet(this.loc,this.world) );
		}else{
			this.bullet_cnt++;
		}
	}
	return bullets;
}

Player_Support_Rotate.prototype.length=30;
Player_Support_Rotate.prototype.update = function(){
	if(this.isAlive){
		if (this.life<=0) {
		this.isAlive = false;
		}


		this.degree += this.speed * this.degree_unit;
		if (this.degree >= 2*Math.PI) {
			this.degree -= 2*Math.PI;
		}
		
		for(var idx in this.world.objs){
			var obj = this.world.objs[idx]
			if(obj.side == ENEMY_BULLET &&phys_R(this.loc,obj.loc,this.R,obj.R) ){
				obj.kill();
				this.life -= obj.life;
			}
		 }

		//Player_Support_Rotate
		this.vel.setRad(this.degree);
		this.vel.mul(this.length);
		this.vel.add(this.parent_loc);
		this.loc = this.vel;

		
	}
	
}

Player_Support_Rotate.prototype.draw = function(){
	if(this.isAlive){
	
		this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);

	}
}



