function Dead(sc){
	this.sc=sc;
	this.keys = sc.keyset.keys;
	this.context = this.sc.context;
}
Dead.prototype.init = function(){
	
}
Dead.prototype.scene_finished = false;

Dead.prototype.update = function(){
	
	if( this.keys[SPACE] ){
			this.sc.scene
			this.sc.changeState(STATE_MAIN);
	}
	
}

Dead.prototype.draw = function(){

	this.context.fillStyle = "#ffffff";
	this.context.fillText("You are Dead",this.sc.width/2-40, this.sc.height/2-20);
	this.context.fillText("Press SpaceBar to go to main menu",this.sc.width/2-95, this.sc.height/2);


}



