function Totem_Deployer(world){
	this.world = world;
	this.cnt = 0;
	this.objs = [];
	this.ready = false;
	this.dw = [];
	this.cleared = false;
	this.last_obj = null;
	this.deploy_level = 0;
	this.spo = 2
	this.fo = true
}

Totem_Deployer.prototype.nextLevel = function(l){
	
}


Totem_Deployer.prototype.add = function(){
	this.ready = false;
	return this.dw;
}

Totem_Deployer.prototype.check = function(time){
	this.dw = []
	
	if(this.fo){
		this.fo = false;
		this.ready = true;
		this.dw.push(new Totem(new DataSet(this.world.width/2,this.world.height/6),new DataSet(0,0),this.world))
		this.dw.push(new Totem(new DataSet(this.world.width/5,this.world.height/6),new DataSet(0,0),this.world))
		this.dw.push(new Totem(new DataSet(this.world.width*4/5,this.world.height/6),new DataSet(0,0),this.world))
		//for(var idx in this.dw){
		//	this.dw[idx].setFreq(30)
		//}
	}

}

Totem_Deployer.prototype.getScore = function(){
	return this.spo
}

