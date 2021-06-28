function PatternMaker(world){
	this.world = world;
	this.patterns = [new Pattern1(world),
					new Pattern4(world),
					new Pattern5(world),
					new Pattern2(world),
					new Pattern3(world),
					new Pattern6(world),
					new Pattern7(world),
					new Pattern8(world)
					]



}

PatternMaker.prototype.parsePattern = function(pattern,dep,loc){
	var bullets = [];
	var pdh = (pattern);
	var l = pdh.length-1
	for(var i = l ; i>0 ;i--){
		if(pdh[i]){
			bullets= bullets.concat(this.getPattern(parseInt(i),loc) );
		}
	}
	return bullets
}


PatternMaker.prototype.getPattern = function(pattern, loc){
	if(this.patterns.length-1 >= pattern){
		return this.patterns[pattern].fire(loc)
	}
	return this.patterns[0].fire(loc);
}

function poj(sc){
	this.world = sc.world
}
poj.prototype.set =  function getPatObj(sc){this.world = sc.world}
poj.prototype.getPatObj =  function getPatObj(pattern){
	switch( pattern ){
		case 0 :
				return new Pattern1(this.world);
			break;
		case 1 : 
				return new Pattern4(this.world);
			break;
		case 2 : 
				return new Pattern5(this.world);
			break;
		case 3 : 
				return new Pattern2(this.world);
			break;
		case 4 : 
				return new Pattern3(this.world);
			break;
		case 5 : 
				return new Pattern6(this.world);
			break;
		case 6 : 
				return new Pattern7(this.world);
			break;
		case 7 : 
				return new Pattern8(this.world);
			break;
		case 8 : 
				return new Pattern9(this.world);
			break;
		case 9 : 
				return new Pattern9(this.world);
			break;
	}
return new Pattern1(world);
}

//======================================
function Pattern1(world){
	this.world = world;
}
Pattern1.prototype.fire = function(loc){//line
	var bullets = [];
		bullets.push(new Enemy_Bullet(loc,new DataSet(0,1),this.world) );
	return bullets
}
//======================================
function Pattern2(world){
	this.world = world;
}
Pattern2.prototype.fire = function(loc){//trace
    var bullets = [];
    var start_angle = Math.PI/2 - Math.PI/12;

    for(var i=0; i<3; i++){
		var vel = new DataSet(0,0);
			vel.setRad(start_angle+ Math.PI/12*i);
        bullets.push( new Enemy_Bullet(loc,vel,this.world) );
    }
    return bullets;
}
//======================================
function Pattern3(world){
	this.world = world;
}
Pattern3.prototype.fire = function(loc){//oval
    var cnt = 30    
    var bullets = []
    for(var i=0; i<cnt; i++){
        var angle = 2*Math.PI*i/cnt;
        var vel = new DataSet(0,0) ;
			vel.setRad(angle);
        bullets.push(new Enemy_Bullet( loc , vel,this.world) );
    }
    return bullets
}
//======================================
function Pattern4(world){
	this.world = world;
}
Pattern4.prototype.fire = function(loc){ //follow
        var bullets = []
		var player = this.world.player;
        var vel = loc.getVec(player.loc)
        bullets.push(new Enemy_Bullet(loc,vel,this.world))

    return bullets
}
//======================================
function Pattern5(world){
	this.world = world;
}
Pattern5.prototype.fire = function(loc){ //trace
        var bullets = []
		var player = this.world.player;
        var vel = loc.getVec(player.loc)
        bullets.push(new Enemy_Bullet_Trace(loc,vel,this.world))

    return bullets
}
//======================================
function Pattern6(world){
	this.world = world;
}
Pattern6.prototype.fire = function(loc){ //explosion

    var cnt = 30;
    var bullets = [];
    var ainit = Math.random()*2*Math.PI;
    for(var i=0; i<cnt; i++){
        var vel = new DataSet(0,0);
		vel.setRad(2*Math.PI*i/cnt+ainit);

        var ball = new Enemy_Bullet(loc,vel,this.world);
        ball.setSpeed(2+5*Math.random()) ;
        bullets.push(ball);
    }
    return bullets;
}
//======================================
function Pattern7(world){
	this.world = world;
}
Pattern7.prototype.squ_cnt = 0
Pattern7.prototype.squ_max = 10
Pattern7.prototype.squ_add = true
Pattern7.prototype.pattern_squ_init = function(loc){ 
	this.squ_cnt = 0
	this.squ_add = true
}
Pattern7.prototype.fire = function(loc){ //squeez
	var bullets = [];
	
	if(this.squ_add){
		this.squ_cnt++
		if(this.squ_cnt >this.squ_max){this.squ_add = false}
	}else{
		this.squ_cnt --
		if(this.squ_cnt <= -this.squ_max){this.squ_add = true}
	}


	var center_angle = Math.PI/2 + Math.PI/90*this.squ_cnt
    var start_angle = center_angle - Math.PI/16;

    for(var i=0; i<2; i++){
		var vel = new DataSet(0,0);
			vel.setRad(start_angle+ Math.PI/8*i);
        bullets.push( new Enemy_Bullet(loc,vel,this.world) );
    }
    return bullets;
}
//======================================
function Pattern8(world){
	this.world = world;
}
Pattern8.prototype.fire = function(loc){//ballastic
	var bullets = [];
		bullets.push(new Enemy_Ballastic_Bullet(loc,new DataSet(0,1),this.world) );
	return bullets
}

//======================================
function Pattern9(world){
	this.world = world;
	this.squ_cnt = 0
	this.squ_max = 10
	this.squ_add = true
}

Pattern9.prototype.init = function(loc){ 
	this.squ_cnt = 0
	this.squ_add = true
}
Pattern9.prototype.fire = function(loc){//oval, rotate
    var cnt = 30    
    var bullets = []

	if(this.squ_add){
		this.squ_cnt++
		if(this.squ_cnt >this.squ_max){this.squ_add = false}
	}else{
		this.squ_cnt --
		if(this.squ_cnt <= -this.squ_max){this.squ_add = true}
	}

	var start_angle = Math.PI/90*this.squ_cnt

    for(var i=0; i<cnt; i++){
        var angle = 2*Math.PI*i/cnt;
        var vel = new DataSet(0,0) ;
			vel.setRad(start_angle+ 2*Math.PI/30*i);
        bullets.push(new Enemy_Bullet( loc , vel,this.world) );
    }
    return bullets
}

//======================================
function Pattern10(world){
	this.world = world;
	this.place = 0
}
Pattern10.prototype.fire = function(loc){//oval, rotate
    var cnt = 30    
    var bullets = []
	
	
	if(this.place == 0){
		this.place = 1;
	}else{
		this.place = 0
	}

	var start_angle = Math.PI/(cnt*2)*this.place

    for(var i=0; i<cnt; i++){
        var angle = 2*Math.PI*i/cnt;
        var vel = new DataSet(0,0) ;
			vel.setRad(start_angle+ Math.PI/cnt*i);
        bullets.push(new Enemy_Bullet( loc , vel,this.world) );
    }
    return bullets
}

