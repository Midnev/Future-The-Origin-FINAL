const NEUTRAL = 0;
const PLAYER = 1;
const PLAYER_BULLET = 2;
const ITEM = 3;
const ENEMY = 4;
const ENEMY_BULLET = 5;
const NEUTRAL_ENEMY =6;
const PLAYER_SUPPORTER = 7;

const spo =5 //score per object

var time_count = 0 
const DELAY = 9

function log(l){
console.log(l);
}


function World(sc){
	this.sc=sc;
	this.keyset = this.sc.keyset;
	this.canvas = this.sc.canvas;
	this.context = this.canvas.getContext("2d");
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.add_objs= [];
	
	this.bg = this.sc.bg
	this.score = 0;
	this.player = new Player(this);
	this.ui = new UI(this);
	this.game_level = this.sc.game_level;
	this.objs= [this.player];
	this.effect =[];
	this.datr = new DataReader(this);
	this.dep =// new Deployer(this);
	this.pm = new PatternMaker(this);
	this.world_time=0;
	this.acc = new DataSet(0,0);
	this.init

	
}
//World.prototype.scene_finished = false;

World.prototype.init = function(){
    this.context.fillStyle = "#ffffff";
	this.world_time = 0;
	this.game_level = this.sc.game_level;
	if(this.sc.game_mode == INFINTE_MODE){
		this.dep = new Totem_Deployer(this);
	}else{
		this.dep = new Deployer(this);
	}
	this.effect =[];
	this.player.init()
	this.objs= [this.player];
	
	
}

World.prototype.reset = function(){
	this.datr = new DataReader(this);
	this.player.reset()
	this.init

}


World.prototype.maxDelay = DELAY;
World.prototype.delay_cnt = 0;
World.prototype.update = function(){
	this.bg.update()
	//state 관리
	
	if(this.keyset.keys[KEY_ESC]){this.sc.changeState(STATE_PAUSE);}
	
	if(this.dep.ready){
		this.add_objs = this.add_objs.concat( this.dep.add() );
		
	}
	this.dep.check(this.world_time);

	var cleared = true;
	//==================================일반 오브젝트 관리

	for(var idx in this.objs){
        this.objs[idx].update();
		if(this.objs[idx].isMother){
			this.add_objs = this.add_objs.concat( this.objs[idx].create() );
		}
		if( this.objs[idx].side == ENEMY || this.objs[idx].side ==ITEM || this.objs[idx].side ==ENEMY_BULLET || this.objs[idx].side == NEUTRAL){	
			cleared = false;
		}
   	 }
	for(var idx in this.objs){
		if(this.objs[idx].isDead){
			if(this.objs[idx].deathEvent && this.objs[idx].isKilled){
				this.add_objs = this.add_objs.concat( this.objs[idx].killed() );
			}

			if( this.objs[idx].side == ENEMY){
				
				if(this.objs[idx].isKilled){
					this.score += this.dep.getScore()
					for(var i = 0 ; i<=10 ; i++){
					var eff = new Effect_Hits(this.objs[idx].loc,this)
					eff.vel.add(new DataSet(0,-4))
					//eff.vel.setMag(eff.speed)
					this.effect.push(eff)
				}
			}
				
			}
			this.objs.splice(idx,1);
		}
   	}
	this.checkCleared(cleared)
	//===============================이펙트 오브젝트 관리
	for(var idx in this.effect){
        	this.effect[idx].update();	
   	}
	for(var idx in this.effect){
		if(this.effect[idx].isDead){
			this.effect.splice(idx,1);
		}
   	}

	this.objs= this.objs.concat(this.add_objs);
	this.add_objs = [];


	if(this.delay_cnt >= this.maxDelay){
		this.world_time++;
		this.delay_cnt =0;
	}else{
		this.delay_cnt++;
	}



}
World.prototype.draw = function(){

	for(var idx=this.objs.length-1; idx>=0; idx--){
		
		//if(this.sc.game_mode != INFINTE_MODE){
			this.objs[idx].draw();
		//}else{
			//this.context.fillStyle =this.objs[idx].color;
			//drawCircle(this.objs[idx].context, this.objs[idx].loc.x, this.objs[idx].loc.y, this.objs[idx].R);
		//}
	}
	for(var idx in this.effect){
        	this.effect[idx].draw();	
   	}
	this.ui.draw();
}

//========대기 시간
World.prototype.wait_time = 40;
World.prototype.checkCleared = function(cleared){
	if(cleared && this.dep.cleared ){//대기시간 추가******
		if(this.wait_time <0 ){
			if(this.datr.max_level > this.game_level){//다음 레벨 로딩
				this.sc.game_level++;
				this.sc.changeState(STATE_PLAY);
			}else{
				this.wait_time = 40
				this.sc.changeState(STATE_CLEARED);//레벨이 없을 경우
			}
		}else{this.wait_time--;}
	}else{this.wait_time = 40}
}


World.prototype.nextLevel = function(){

}


function move(loc,vel,acc){
	vel.add(acc)
	acc.set(0,0)
	loc.add(vel);//move
	
}