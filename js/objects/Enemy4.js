const E4_FIGHT =0
const E4_SHIFTING = 1
const E4_HIDDEN = 2

function Enemy4(loc,vel,world){
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
    this.img.src= "./Image/enemy4.png"
	
	this.img2 = new Image()
    this.img2.src= "./Image/shift_noise.png"
	this.shift_size = 3;

	this.img3 = new Image()
    this.img3.src= "./Image/shift_mat.png"

}
Enemy4.prototype.time = 1;
Enemy4.prototype.speed = 1;
Enemy4.prototype.color ="#ff0000";
Enemy4.prototype.R = 15;
Enemy4.prototype.isDead = false;
Enemy4.prototype.isKilled = false;
Enemy4.prototype.isMother = true;
Enemy4.prototype.deathEvent = false;
Enemy4.prototype.life = 3;
Enemy4.prototype.max_life = 3;
Enemy4.prototype.pattern = 0;
Enemy4.prototype.side = NEUTRAL//ENEMY;//NEUTRAL

Enemy4.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}
Enemy4.prototype.setLife = function(life){
	this.life = life;
	this.max_life = life
}

Enemy4.prototype.type = 0;
Enemy4.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy4.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy4.prototype.bullet_cnt=0;
Enemy4.prototype.max_bullet_cnt=25;
Enemy4.prototype.setFreq= function(num){
		this.max_bullet_cnt +=this.max_bullet_cnt*num;
}
Enemy4.prototype.create = function(){
	var bullets =[];
		if(this.state == E4_FIGHT){
			if(this.bullet_cnt>this.max_bullet_cnt){
			this.bullet_cnt = 0;
			
			bullets = this.world.pm.getPattern(this.pattern,this.loc) ;
		}else{
			this.bullet_cnt++;
		}
		}
		
	return bullets;
}
Enemy4.prototype.update = function(){
	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}
	if(this.state == E4_FIGHT){
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
	
		if(this.hidable && this.life/this.max_life < 0.5){
			for(var idx in this.world.objs){
				var obj = this.world.objs[idx]
				if( (obj.side == PLAYER_BULLET) &&phys_R(this.loc,obj.loc,this.R,obj.R) ){	
					obj.kill();
				}
			}
			this.hiding = true;
			this.side = NEUTRAL
			this.state = E4_SHIFTING
			this.hidable = false
			this.life = this.max_life
		}

		move(this.loc,this.vel,this.acc)
	}else if(this.state == E4_SHIFTING){


		for(var idx in this.world.objs){
			var obj = this.world.objs[idx]
			if( (obj.side == PLAYER_BULLET) &&phys_R(this.loc,obj.loc,this.shift_size,obj.R) ){	
				obj.imverse()
			}
		 }
		
		if(this.hiding){
			if(this.shift_size <= 2){
				
				this.state = E4_HIDDEN
				this.hiding = false
			}else{
				this.shift_size--
			}
		}else{
			if(this.shift_size >= 40){
			this.side = ENEMY
				this.state = E4_FIGHT
			}else{
				this.shift_size++
			}
		}
	}else{
		
			if(this.hidden_cnt<=0){
				this.state = E4_SHIFTING
				this.hidden_cnt = 30
			}else{
				this.hidden_cnt--;
			}
		this.loc.add(this.vel)
	}
	if(this.life <=0){
		this.kill();
	}
	
	
	

}
Enemy4.prototype.killed = function(){
	return new Item(this.type,this.loc,this.world);
}

Enemy4.prototype.image_size = 30;

Enemy4.prototype.draw = function(){
	if(this.state == E4_FIGHT){
		//this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.image_size/2,this.loc.y-this.image_size/2,this.image_size,this.image_size);

	this.context.translate(this.loc.x,this.loc.y)
	this.context.rotate(this.rad - Math.PI/2)//- Math.PI)
	this.world.context.drawImage(this.img,1+(this.type*32),1,32,32,-this.image_size/2,-this.image_size/2,this.image_size,this.image_size);
	this.context.rotate(-this.rad + Math.PI/2)//+ Math.PI);
	this.context.translate(-this.loc.x,-this.loc.y)
	
	}else if(this.state == E4_SHIFTING){
		
		this.world.context.drawImage(this.img2,1,1,64,64,this.loc.x-this.shift_size/2,this.loc.y-this.shift_size/2,this.shift_size,this.shift_size);
		
	

		/* this.world.context.drawImage(this.img3,1,1,16,16,this.loc.x-this.shift_size/2,this.loc.y-this.shift_size/2,4,4);
		this.world.context.drawImage(this.img3,17,1,16,16,this.loc.x+this.shift_size/2-4,this.loc.y-this.shift_size/2,4,4);
		this.world.context.drawImage(this.img3,1,17,16,16,this.loc.x-this.shift_size/2,this.loc.y+this.shift_size/2-4,4,4);
		this.world.context.drawImage(this.img3,17,17,16,16,this.loc.x+this.shift_size/2-4,this.loc.y+this.shift_size/2-4,4,4);*/
	}
	
	

}




