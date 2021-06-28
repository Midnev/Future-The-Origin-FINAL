function Pause(sc){
	this.sc=sc;
	this.keys = sc.keyset.keys;
	this.context = this.sc.context;

	this.max_cnt = 30;
	this.cnt = this.max_cnt;
	this.bg = this.sc.bg
}
Pause.prototype.init = function(){
	
}
Pause.prototype.scene_finished = false;

Pause.prototype.update = function(){
	
	if( this.keys[KEY_ESC]&&this.cnt <= 0){
		this.cnt = this.max_cnt;
		this.keys[KEY_ESC] = false
		this.sc.changeState(STATE_PLAY);
	}
	if(this.cnt >= 0){
		this.cnt --;
	}
	
}

Pause.prototype.draw = function(){
	//this.bg.draw()
	//this.context.fillStyle = "#c0c0c0";
	//this.context.fillRect(0,0,this.sc.width, this.sc.height);
	this.context.fillStyle = "#ffffff";
	this.context.fillText("Game Paused",this.sc.width/2-40, this.sc.height/2-40);
	this.context.fillText("          Press ESC to continue",this.sc.width/2-95, this.sc.height/2);

}



