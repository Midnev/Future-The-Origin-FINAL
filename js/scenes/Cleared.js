function Cleared(sc){
	this.sc=sc;
	this.keys = sc.keyset.keys;
	this.context = this.sc.context;
	this.bg = this.sc.bg
}
Cleared.prototype.init = function(){
	
}
Cleared.prototype.scene_finished = false;

Cleared.prototype.update = function(){
	
	if( this.keys[SPACE] ){
			this.sc.scene
			this.sc.changeState(STATE_MAIN);
			this.sc.game_level = 1;
	}
	
}

Cleared.prototype.draw = function(){
	//this.context.fillStyle = "#c0c0c0";
	//this.context.fillRect(0,0,this.sc.width, this.sc.height);

	this.context.fillStyle = "#ffffff";

	this.context.fillText("Congratulations",this.sc.width/2-40, this.sc.height/2-40);
	this.context.fillText("Game Cleared",this.sc.width/2-40, this.sc.height/2-20);


	this.context.fillText("Press SpaceBar to go to main menu",this.sc.width/2-95, this.sc.height/2);


}



