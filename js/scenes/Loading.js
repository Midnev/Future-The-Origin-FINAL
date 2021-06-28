function Loading(sc){
	this.sc=sc;
	this.keys = sc.keyset.keys;
	this.context = this.sc.context;

	this.max_cnt = 30;
	this.cnt = this.max_cnt;
	
	this.bg = sc.bg;
	this.next_state
}
Loading.prototype.init = function(){
	this.cnt = this.max_cnt;
}
Loading.prototype.scene_finished = false;

Loading.prototype.loadTo = function(state){
	this.next_state = state
	this.init();
}

Loading.prototype.loadShort = function(state){
	this.cnt = 2;
	this.next_state = state
	this.init();
}

Loading.prototype.update = function(){

	if(this.cnt <= 0){
		this.cnt = this.max_cnt;
		this.keys[SPACE] = false;
		this.sc.changeState(this.next_state);
		//this.sc.scene_stack[0].init();
		//this.sc.scene_stack[1].init();
		this.sc.scene_stack[2].init();
	}
	
	this.cnt --;
}

Loading.prototype.draw = function(){
	
	this.context.fillStyle = "#ffffff";
	this.context.fillText("Loading",this.sc.width/2-20, this.sc.height/2);



}



