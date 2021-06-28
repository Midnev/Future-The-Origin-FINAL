function Type1(parent){
	this.p = parent
	this.world = this.p.world;
	this.loc = this.p.loc;
	this.bullet_level=1;
	this.bullet_cnt=0;
	this.bullet_length=8;
	this.blade = new Type2(this.p)
}
Type1.prototype.fire = function(bullet_level){
	var bullets =[];
	if(this.bullet_cnt > 9){
				this.bullet_cnt = 0;
				var level_set = bullet_level;
				if(level_set >= 6){
					level_set = 6;
					this.bullet_length = 6
				}
				var start = -this.bullet_length *level_set/2;
				for (var i = 0; i <= level_set; i++) {
					var ploc = this.loc.copy();
					ploc.x = this.loc.x + start + i*this.bullet_length;
					bullets.push(new Player_Bullet( ploc,this.world ) );	
				}
				if(level_set >= 5){
					bullets[0].vel.setRad(-Math.PI/2 - Math.PI/20)
					bullets[0].vel.setMag(bullets[3].speed)
					bullets[1].vel.setRad(-Math.PI/2 - Math.PI/40)
					bullets[1].vel.setMag(bullets[3].speed)
					bullets[level_set-1].vel.setRad(-Math.PI/2+ Math.PI/40)
					bullets[level_set-1].vel.setMag(bullets[3].speed)
					bullets[level_set].vel.setRad(-Math.PI/2+ Math.PI/20)
					bullets[level_set].vel.setMag(bullets[3].speed)
					
				}else if(level_set >= 4){
					bullets[0].vel.setRad(-Math.PI/2 - Math.PI/20)
					bullets[0].vel.setMag(bullets[3].speed)
					bullets[level_set].vel.setRad(-Math.PI/2+ Math.PI/20)
					bullets[level_set].vel.setMag(bullets[3].speed)
					
				}
		}else{
			this.bullet_cnt++;
		}
		var blades = bullet_level-3
		//log(blades)
		if(blades>=0){
			bullets= bullets.concat(this.blade.fire(blades))
		}

		return bullets;
}
//==============================================================================
function Type2(parent){
	this.p = parent
	this.world = this.p.world;
	this.loc = this.p.loc;
	this.bullet_cnt=0;
}
Type2.prototype.fire = function(bullet_level){
	var bullets =[];
	var freq = 36- 2*bullet_level//аж╠Б
	//var r = 26 + 4*bullet_level
	if(freq < 4 ){freq = 4}
	if(this.bullet_cnt > freq){

		this.bullet_cnt = 0;
		var bul 
		
		if(bullet_level>=1){
			bul	= new Player_Blade( this.loc,this.world )
			bul.R = 26 + 3*bullet_level
			bullets.push( bul );
		}

		bul = new Player_Blade( this.loc,this.world )

		bul.vel.setRad(Math.PI/4)
		bul.vel.setMag(bul.speed)
		bullets.push( bul );
		bul = new Player_Blade( this.loc,this.world )

		bul.vel.setRad(Math.PI*3/4)
		bul.vel.setMag(bul.speed)
		bullets.push( bul );


			
			
	}else{
		this.bullet_cnt++;
	}
	return bullets;
}