function DataReader(world){
	this.world = world;
	this.levels = [];
	this.max_level = 0;
	this.readLevels();
}
DataReader.prototype.url = "gamedata/";

DataReader.prototype.readPattern = function(name){
	var datas  = readText(this.url + name +".txt").split('\n');
	var pattern = []
	for(var idx in datas){
		if( !(datas[idx].indexOf('#') != -1 || datas[idx].length <= 2) ){
			var d = datas[idx].trim().split('/');
			// when life hits(%)/ on-off / pattern / freq
			var spl = [ parseInt(d[0].trim() ),
						 parseInt(d[1].trim() ),
						 parseInt(d[2].trim() ),
						 parseInt(d[3].trim() )
					]
			pattern.push(spl)
		}
   	}
	return pattern;
}

DataReader.prototype.readLevels = function(){
	this.levels  = readText(this.url + "Levels.txt").split('\n');
	this.max_level = this.levels.length;
	
}
//	0		1				2			3			4			5		6		7			8				9
//time / enemy_type / loc.x,loc.y / vel.x,vel.y/ acc.x,acc.y / life / speed / pattern / pattern_freq /  dropitem
DataReader.prototype.readLevel = function(level){
	var enemies = [];
	if(this.max_level >= level){
		var datas = readText(this.url + this.levels[level-1]).split('\n')
			
		for(var idx in datas){
			if( !( (datas[idx].indexOf('#') != -1 ) || datas[idx].length <= 2) ){
				var d = datas[idx].trim().split('/');
			
				var enemy
				var loc_data = d[2].split(',');
				var vel_data = d[3].split(',');
				var acc_data = d[4].split(',');

				var loc = new DataSet(loc_data[0].trim()*this.world.width/6,loc_data[1].trim()*this.world.height/10);
				var vel	= new DataSet( parseInt(vel_data[0].trim()) ,parseInt(vel_data[1].trim()) );
				var acc = new DataSet( parseInt(acc_data[0].trim())/200 ,parseInt(acc_data[1].trim())/200 );
				var speed = ( ( parseInt(d[6].trim())+this.world.sc.world_level*2) /10) + 0.3 
				var life =  parseInt(d[5].trim())*(1+this.world.sc.world_level*2/3)

				switch( parseInt(d[1]) ){
					case 11 :
								enemy = new Enemy_Boss(loc,vel,this.world);
								enemy.patterns = this.readPattern(d[7].trim());
								enemy.setSpeed(speed/2);
								//enemy.setLife( life)
						break;
					case 12 :
								enemy = new Enemy_Boss2(loc,vel,this.world);
								enemy.patterns = this.readPattern(d[7].trim());
								enemy.setSpeed(speed/2);
								//enemy.setLife( parseInt(d[5].trim()))
						break;
					case 13 :
								enemy = new Enemy_Boss3(loc,vel,this.world);
								enemy.patterns = this.readPattern(d[7].trim());
								enemy.setSpeed(speed/2);
								//enemy.setLife( parseInt(d[5].trim()))
						break;
					case 0 :
							enemy = new Enemy(loc,vel,this.world);
							enemy.pattern = parseInt(d[7].trim());
							enemy.setSpeed( speed);
							//enemy.life = d[5].trim();
						break;
					case 1 :
							enemy = new Enemy2(loc,vel,this.world);
							enemy.pattern = parseInt(d[7].trim());
							enemy.setSpeed(speed);
							//enemy.life = d[5].trim();
						break;
					case 2 :
							enemy = new Enemy3(loc,vel,this.world);
							enemy.pattern = parseInt(d[7].trim());
							enemy.setSpeed(speed);
							//enemy.life = d[5].trim();
						break;
					case 3 :
							enemy = new Enemy4(loc,vel,this.world);
							enemy.pattern = parseInt(d[7].trim());
							enemy.setSpeed(speed);
							//enemy.setLife( parseInt(d[5].trim()))
						break;
					case 4 :
							enemy = new Enemy5(loc,vel,this.world);
							enemy.pattern = parseInt(d[7].trim());
							enemy.setSpeed(speed);
							//enemy.setLife( parseInt(d[5].trim()))
						break;
					default:
						enemy = new Enemy(loc,vel,this.world);
						enemy.pattern = 0;
						enemy.setSpeed = 0.7;
						enemy.life = 3;
					break;
							
				}
				enemy.acc = acc;
				enemy.time = d[0].trim()*6;
				//log(enemy.life)
				//enemy.life = parseInt(enemy.life)*(1+this.world.sc.world_level*2/3)
				enemy.setLife(life*(1+this.world.sc.world_level*2/3))
				enemy.setFreq( d[8].trim() );
				enemy.max_bullet_cnt = enemy.max_bullet_cnt -15*parseInt( this.world.sc.world_level)
				if(enemy.max_bullet_cnt < 10){enemy.max_bullet_cnt = 10}
				enemy.setItem( (d[9]+' ').trim() );
				
				
				enemies = enemies.concat(enemy);
			
			}
			
   		}
	}
	return enemies;
}
