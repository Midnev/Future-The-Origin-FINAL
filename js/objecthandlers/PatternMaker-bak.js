function PatternMaker(world){
	this.world = world;
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

PatternMaker.prototype.getPattern = function(pattern,loc){
	var bullets = [];
	switch( pattern ){
		case 0 :
				return bullets= bullets.concat( this.pattern1(loc) );
			break;
		case 1 : 
				return bullets= bullets.concat(this.pattern_Follow(loc));
			break;
		case 2 : 
				return bullets= bullets.concat( this.pattern_Trace(loc));
			break;
		case 3 : 
				return bullets= bullets.concat( this.pattern_Tri(loc));
			break;
		case 4 : 
				return bullets= bullets.concat( this.pattern_Oval(loc));
			break;
		case 5 : 
				return bullets= bullets.concat( this.pattern_Explosion(loc));
			break;
		case 6 : 
				return bullets= bullets.concat( this.pattern_Squ(loc));
			break;
		case 7 : 
				return bullets= bullets.concat( this.pattern_Ballastic(loc));
			break;
	}
	return bullets
}

PatternMaker.prototype.pattern1 = function(loc){
	var bullets = [];
		bullets.push(new Enemy_Bullet(loc,new DataSet(0,1),this.world) );
	return bullets
}
PatternMaker.prototype.pattern_Tri = function(loc){
    var bullets = [];
    var start_angle = Math.PI/2 - Math.PI/12;

    for(var i=0; i<3; i++){
		var vel = new DataSet(0,0);
			vel.setRad(start_angle+ Math.PI/12*i);
        bullets.push( new Enemy_Bullet(loc,vel,this.world) );
    }
    return bullets;
}
PatternMaker.prototype.pattern_Oval = function(loc){
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
PatternMaker.prototype.pattern_Follow = function(loc){ 
        var bullets = []
		var player = this.world.player;
        var vel = loc.getVec(player.loc)
        bullets.push(new Enemy_Bullet(loc,vel,this.world))

    return bullets
}
PatternMaker.prototype.pattern_Trace = function(loc){ 
        var bullets = []
		var player = this.world.player;
        var vel = loc.getVec(player.loc)
        bullets.push(new Enemy_Bullet_Trace(loc,vel,this.world))

    return bullets
}
PatternMaker.prototype.pattern_Explosion = function(loc){ 

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

PatternMaker.prototype.squ_cnt = 0
PatternMaker.prototype.squ_max = 10
PatternMaker.prototype.squ_add = true
PatternMaker.prototype.pattern_squ_init = function(loc){ 
	this.squ_cnt = 0
	this.squ_add = true
}
PatternMaker.prototype.pattern_Squ = function(loc){ //squeez
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

PatternMaker.prototype.pattern_Ballastic = function(loc){
	var bullets = [];
		bullets.push(new Enemy_Ballastic_Bullet(loc,new DataSet(0,1),this.world) );
	return bullets
}