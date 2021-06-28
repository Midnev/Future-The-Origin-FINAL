function Infinite_Deployer(world){
	this.world = world;
	this.cnt = 0;
	this.objs = [];
	this.datr = this.world.datr;
	//this.nextLevel(this.world.game_level);
	this.ready = false;
	this.dw = [];
	this.cleared = false;
	this.last_obj = null;

	
	this.deploy_level = 0;
	

	this.deploy_cnt = 0;
	this.max_deploy = 170;
	this.first_dep = this.max_deploy
	
	this.spo = 2
	
	this.life = 2;
	this.patterns = 1
	this.freq = 3;
	this.speed = 3;

	this.startPoint = []
	this.lines = 6
	for(var i = 1 ; i <(this.lines+1); i++){
		this.startPoint.push( new DataSet(i*this.world.width/(this.lines+1),0) )
	}
	
}

Infinite_Deployer.prototype.nextLevel = function(l){
	//this.objs = this.datr.readLevel(l);
}


Infinite_Deployer.prototype.add = function(){
	this.ready = false;
	return this.dw;
}

Infinite_Deployer.prototype.check = function(time){
	this.dw = []
	
	if(this.deploy_cnt > this.max_deploy){
		this.deploy_cnt = 0;
		
		if(this.world.world_time >= 10){
			if(this.max_deploy >5){
				this.max_deploy--;
			}
			this.world.world_time = 0;
		}
		this.ready = true;
		
		var type = this.sen()
		for(var idx in this.startPoint){
			var test = this.gen(this.startPoint[idx] , 0)
				test.setItem(type[idx])
			this.dw.push(test)

		}
		
	}else{
		this.deploy_cnt++;
	}
	

}

Infinite_Deployer.prototype.getScore = function(){
	return this.spo
}

Infinite_Deployer.prototype.gen = function(loc,type){
	var enemy
		var loc = loc.copy()
		var vel	= new DataSet(0,1);
		var acc = new DataSet(0,0);

		switch( type){
			case 0 :
					enemy = new Enemy(loc,vel,this.world);
				break;
			case 1 :
					enemy = new Enemy2(loc,vel,this.world);
				break;
			case 2 :
					//enemy = new Enemy3(loc,vel,this.world);
				//break;
			case 3 :
					enemy = new Enemy4(loc,vel,this.world);
				break;
			case 4 :
					enemy = new Enemy5(loc,vel,this.world);	
				break;
			default:
				enemy = new Enemy(loc,vel,this.world);
			break;
					
		}
		enemy.pattern = this.patterns;
		enemy.setSpeed( (this.speed + (this.first_dep-this.max_deploy)/25 ));
		//log(enemy.speed)
		enemy.life = parseInt( this.life +(this.first_dep-this.max_deploy)/50)
		enemy.setFreq(this.freq);
		enemy.max_bullet_cnt -= (this.first_dep-this.max_deploy)/100 
		enemy.bullet_cnt = enemy.max_bullet_cnt -10
	return enemy
}



Infinite_Deployer.prototype.sen = function(){
	var line_set = [];
	for(var i = 0 ; i <this.lines ; i++){
		var object_type = parseInt( Math.random() );
		line_set.push(object_type);
	}
	var enforce = parseInt(Math.random()*this.lines);
	if(enforce > this.lines){enforce=lines-1;}
	
	line_set[enforce] = parseInt( Math.random()+0.1) ;
	
	return line_set;
}