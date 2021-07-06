function Menu(sc){
	this.sc=sc;
	this.keys = sc.keyset.keys;

	this.context = this.sc.context;
	this.loc = new DataSet(0,0) ;
	this.menu_list = ['Game Start' , 'Level Select']
	this.key_pressed = false;
	this.bg = this.sc.bg

	this.img = new Image();
	this.img.src= "./Image/title.png"
	this.tes = false
	
}
Menu.prototype.init = function(){
	this.menu_num = 0;
}
Menu.prototype.menu_num = 0;
Menu.prototype.scene_finished = false;

Menu.prototype.update = function(){
	
	if((this.keys[LEFT] ^ this.keys[RIGHT])){
        if( !(this.key_pressed) ){
			this.key_pressed = true;
			if(this.sc.game_mode==LEVEL_MODE){
				this.sc.game_mode=INFINTE_MODE
			}else{
				this.sc.game_mode=LEVEL_MODE
			}
			

		}
    }else{
		this.key_pressed = false;
	}
	
	this.tes = this.sc.game_level>1 || this.sc.world.player.bullet_level>1 || this.sc.world.score>0||this.sc.game_level >0
	if( this.keys[SPACE] ){
		if(this.menu_num == 0){
			this.sc.changeState(STATE_PLAY);
		}else{
			log(this.menu_num)
		}
	}

	if( this.keys[KEY_ESC] && this.tes){
		this.sc.game_level = 1;
		this.sc.world_level = 0
		this.sc.init()
		this.sc.world.score = 0;
		this.sc.world.player.resetAll()
	}
    
	
}

Menu.prototype.draw = function(){
	//this.bg.draw()

	this.context.fillStyle = "#ffffff";
	this.context.fillText(" Level : "+this.sc.game_level,this.sc.width/2-20, this.sc.height/2-10);
	this.context.fillText("Press SpaceBar to Start",this.sc.width/2-50, this.sc.height/2);
	if(this.tes){
		this.context.fillText("Press ESC to Refresh",this.sc.width/2-50, this.sc.height/2+10);
		
	}
	if(this.sc.last_score > 0){
		this.context.fillText("Your Score : "+this.sc.last_score,this.sc.width/2-50, this.sc.height/2+20);
	}
	if(this.sc.world_level>0){
		this.context.fillText("Cleared : "+this.sc.world_level,this.sc.width/2-50, this.sc.height/2+30);
	}


	if(this.sc.game_mode==INFINTE_MODE){
		this.context.fillText("INFINTE_MODE",this.sc.width/2-50, this.sc.height/2+50);
	
	}else{
		this.context.fillText("LEVEL_MODE",this.sc.width/2-50, this.sc.height/2+50);
	
	}


	this.context.fillText("Arrow Keys to move",10, this.sc.height - 100)
	this.context.fillText("SpaceBar to Fire Blaster",10, this.sc.height - 90)
	this.context.fillText("Z key to change fire mode",10, this.sc.height - 80)
	this.context.fillText("X to fire gravity bomb",10, this.sc.height - 70)
	this.context.fillText("C to fire energy ball(Slows down speed)",10, this.sc.height - 60)
	this.context.fillText("ESC to pause",10, this.sc.height - 50)
	this.context.drawImage(this.img,1,1,450,120,0,220,this.sc.width,120);

	


}



