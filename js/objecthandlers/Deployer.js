function Deployer(world){
	this.world = world;
	this.cnt = 0;
	this.objs = [];
	this.datr = this.world.datr;
	this.nextLevel(this.world.game_level);
	this.ready = false;
	this.dw = [];

	this.cleared = false;

	this.last_obj = null;

	this.spo = 5
}

Deployer.prototype.nextLevel = function(l){
	this.objs = this.datr.readLevel(l);
}


Deployer.prototype.add = function(){
	this.ready = false;
	return this.dw;
}

Deployer.prototype.check = function(time){
	this.dw = []
	if((this.objs.length != 0) && (this.objs[0].time <= time) ){
			var obj = this.objs[0];
			this.dw.push(obj);		
			this.objs.splice(0,1);
			this.ready = true;
	}else if (this.objs.length == 0){
		this.cleared = true;
	}
	

}

Deployer.prototype.getScore = function(){
	return this.spo + (this.world.player.gravity_bullet) + this.world.sc.world_level*3
}



