const ITEM_LEV = 1;//LEVEL_UP ;
const ITEM_SHI = 2;//SHIELD ;
const ITEM_SUP = 3;//SUPPORT;
const ITEM_ROT = 4;//ROTATE ;
const ITEM_GRV = 5;//Gravity ;


function Item(type,loc,world){
	this.world = world

	this.context = this.world.context;
	
	this.loc = loc.copy();
	this.vel = new DataSet(0,1);
	this.vel.setMag(this.speed);
	this.acc = new DataSet(0,0)
	this.type = type;

	this.img = new Image()
	this.img.src= "./Image/item-clear.png"
}
Item.prototype.speed = 1.2;
Item.prototype.color ="#ffff00";
Item.prototype.R = 8;
Item.prototype.isDead = false;
Item.prototype.isKilled = false;
Item.prototype.isMother = false;
Item.prototype.deathEvent = false;
Item.prototype.isKilled = false;
Item.prototype.life = 1;
Item.prototype.type = 1;

Item.prototype.side = ITEM;

Enemy.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Item.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;;
}

Item.prototype.create = function(){}

Item.prototype.dies = function(){}

Item.prototype.killed = function(){}

Item.prototype.update = function(){
	var obj = this.world.player;
	if( this.loc.x<0||this.loc.x>this.world.width){
		this.isDead = true;
	}
    if( this.loc.y<0||this.loc.y>this.world.height){
		this.isDead = true;
	}

	if(phys_R(this.loc , obj.loc , this.R , obj.R)){
		this.isDead = true;
		if(this.type == ITEM_LEV){
			obj.bullet_level++;
			obj.blaster_energy += 5;
		}else if(this.type == ITEM_SHI){
			if(obj.shield != null && obj.shield.isDead){
				obj.shield = null
			}
			if(obj.shield ==null){
				obj.shield = new Player_Shield(obj.loc,this.world);
				this.world.add_objs.push(obj.shield);
			}else{
				obj.shield.life++
				if(obj.shield.life>5){
					obj.shield.life=5
					obj.blaster_energy += 5;
				}

				obj.blaster_energy += 5;
			}
		}else if( this.type == ITEM_SUP){
			var l = 0;
			for(var idx in obj.follow){
				if(obj.follow[idx].life >0){
					l++;
				}else{
					obj.follow[idx].life = 2 + this.world.sc.world_level;
					break;
				}
			}


			if(l >= 2){
				for(var idx in obj.follow){
					obj.follow[idx].life = 2 + this.world.sc.world_level;
				}
				obj.blaster_energy += 7;
			}

		}else if( this.type == ITEM_ROT){
			for(var idx in obj.rotate){
				obj.rotate[idx].isAlive = true;
				obj.rotate[idx].degree = idx*(Math.PI/2)
				obj.rotate[idx].life = 3+ this.world.sc.world_level;
			}
			
		}else if( this.type == ITEM_GRV){
			if(obj.gravity_bullet < 9){
				obj.gravity_bullet++;
			}
		}

	}
	if(obj.keys[KEY_C]){
    		var mag = this.loc.getVec(obj.loc)
		this.vel.add(mag)
		this.vel.setMag(this.speed)	
	}else{
		this.vel.set(0,1)
		this.vel.setMag(this.speed)	
	}
	this.loc.add(this.vel);//move
	
}
Item.prototype.image_size = 32;
Item.prototype.draw = function(){
	this.world.context.drawImage(this.img,1+this.image_size*(this.type-1),1,32,32,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);
}

