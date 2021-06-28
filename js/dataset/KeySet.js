const UP = 38
const DOWN = 40
const LEFT = 37
const RIGHT = 39
const SPACE = 32
const KEY_Z = 90
const KEY_X = 88
const KEY_C = 67
const KEY_ESC = 27

const KEY_A = 65
const KEY_S = 83
const KEY_D = 68

function KeySet(){
	this.keys=[];
	this.keys[UP] = false ;
	this.keys[DOWN] = false;
	this.keys[LEFT] = false;
	this.keys[RIGHT] = false;
	this.keys[SPACE] = false;
	this.keys[KEY_Z] = false;
	this.keys[KEY_X] = false;
	this.keys[KEY_C] = false;
}

KeySet.prototype.keyDown = function(key){
	this.keys[key] = true;
}

KeySet.prototype.keyUp  = function(key){
	this.keys[key] = false;
}