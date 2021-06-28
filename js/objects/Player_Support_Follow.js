function Player_Support_Follow(parent,pos,world){
	this.world = world
	this.keys = this.world.keyset.keys;
	this.context = this.world.context;
	
	this.parent = parent
	this.parent_loc = parent.loc

	this.pos = pos;
	this.loc = new DataSet(-30,0) ;
	this.vel = new DataSet(0,0);
	
	this.img = new Image()
    this.img.src= "./Image/player_Support-clear.png"

	this.laser = new Player_Bullet_Laser(this.loc, this.world);
	this.laser.life = 0.1
	this.laser.width= 3
}
Player_Support_Follow.prototype.speed = 3;
Player_Support_Follow.prototype.color ="#000000";
Player_Support_Follow.prototype.R = 6;
Player_Support_Follow.prototype.isDead = false;

Player_Support_Follow.prototype.isKilled = false;
Player_Support_Follow.prototype.isMother = true;
Player_Support_Follow.prototype.deathEvent = false;
Player_Support_Follow.prototype.isKilled = false;
Player_Support_Follow.prototype.life = 0;

Player_Support_Follow.prototype.side = PLAYER_BULLET;


Player_Support_Follow.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}

Player_Support_Follow.prototype.imverse = function(){}

Player_Support_Follow.prototype.bullet_cnt=0;
Player_Support_Follow.prototype.max_bullet_cnt=80;
Player_Support_Follow.prototype.create = function(){
	var bullets =[];
	if(this.life >0){
		if(this.bullet_cnt>this.max_bullet_cnt){
			this.bullet_cnt = 0;
			this.world.add_objs.push( new Player_Missle(this.loc,this.world) );
		}else{
			this.bullet_cnt++;
		}
	}
	return bullets;
}

Player_Support_Follow.prototype.length= 15;
Player_Support_Follow.prototype.update = function(){
	
	if(this.life >0){
		
		if( this.parent.laser.isAlive ){
			this.laser.isAlive = true;
		}else{	
			this.laser.isAlive = false;
		}
		this.laser.update()

		for(var idx in this.world.objs){
			var obj = this.world.objs[idx]
			if(obj.side == ENEMY_BULLET &&phys_R(this.loc,obj.loc,this.R,obj.R) ){
				obj.kill();
				this.life -= obj.life;
			}
		}
				
		this.loc = this.parent_loc.copy()
		this.loc.add(this.pos);
		this.laser.loc = this.loc
	}

	if (this.life <=0) {
		this.life =0
	}
}
Player_Support_Follow.prototype.image_size = 24;
Player_Support_Follow.prototype.draw = function(){
	if(this.life >0){
		this.laser.draw();
		this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2,this.image_size,this.image_size);
	}
}