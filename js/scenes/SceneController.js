const STATE_MAIN    = 0
const STATE_LOADING = 1
const STATE_PLAY	= 2
const STATE_DEAD    = 3
const STATE_CLEARED = 4
const STATE_PAUSE = 5

const LEVEL_MODE = 0
const INFINTE_MODE = 1

var world;
var width;
var height;
var poj;
function SceneController(canvas){

	this.state = STATE_MAIN;
	this.keyset = new KeySet();	
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.game_mode = LEVEL_MODE;//INFINTE_MODE//
	this.world_level = 0
	this.game_level = 1;
	this.bg = new BG(this);
	this.shaker = new Shaker(this);
	this.last_score = 0
	this.scene_stack = [new Menu(this),new Loading(this),new World(this),new Dead(this),new Cleared(this), new Pause(this)];
	this.world = this.scene_stack[2]
	//world = this.scene_stack[2]
	width = this.width
	height= this.height
	poj = new poj(this);
}

SceneController.prototype.run = function(){
	this.update();
	this.draw();
}

SceneController.prototype.update = function(){
	this.scene_stack[this.state].update();
}

SceneController.prototype.draw = function(){
	this.shaker.draw();
	if(this.state != STATE_DEAD){
		this.bg.draw()
	}
	this.scene_stack[this.state].draw();
}

SceneController.prototype.init = function(){
		//this.game_level = 1;
		//this.scene_stack[0].init();
		//this.scene_stack[1].init();
		this.scene_stack[2].reset()// = new World(this);
		this.world = this.scene_stack[2]
		//world = this.scene_stack[2]
		poj.set(this);
}


SceneController.prototype.changeState = function(state){

	if( this.state == STATE_MAIN && state == STATE_PLAY){
		this.scene_stack[STATE_LOADING].loadTo(state);
		this.state = STATE_LOADING;
	}else if( this.state == STATE_PLAY && state == STATE_PLAY){
		this.scene_stack[STATE_LOADING].loadShort(state);
		this.state = STATE_LOADING;
	}else if( this.state == STATE_PLAY && state == STATE_DEAD){
		this.state = state;
	}else if( this.state == STATE_DEAD && state == STATE_MAIN){
		this.world_level = 0
		this.last_score = this.world.score+0
		this.init();
		this.world.player.resetAll()
		this.world.score = 0;
		this.scene_stack[STATE_LOADING].loadTo(state);
		this.state = STATE_LOADING;
	}else if( this.state == STATE_LOADING && state == STATE_PLAY){
		this.state = state;
	}else if( this.state == STATE_LOADING && state == STATE_MAIN){
		this.state = state;
	}else if( this.state == STATE_PLAY && state == STATE_CLEARED){
		this.last_score = this.world.score
		this.state = state;
	}else if( this.state == STATE_CLEARED && state == STATE_MAIN){
		this.last_score = this.world.score+0
		this.game_level = 1
		this.world_level++
		this.world.init()
		this.scene_stack[STATE_LOADING].loadTo(state);
		this.state = STATE_LOADING;
	}else if( this.state == STATE_PLAY && state == STATE_PAUSE){
		this.state = state;
	}else if( this.state == STATE_PAUSE && state == STATE_PLAY){
		this.state = state;
	}



}