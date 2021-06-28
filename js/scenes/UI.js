function UI(world){
	this.world = world;
	this.keys = this.world.keyset.keys;

	this.context = this.world.context;
	
	this.loc = new DataSet(0,0) ;

	this.img = new Image();
    this.img.src= "./Image/powergage-clear.png"
	
	this.img_g = new Image();
	this.img_g.src= "./Image/grav-clear.png"

	this.laser_image_height = 512;
	this.laser_gauge_height = 120;
	
	this.iw = new ImageWriter(this.context);

	this.player = this.world.player
	
}

UI.prototype.update = function(){


    

}

UI.prototype.draw = function(){
	//레이저 게이지
	var perc = (this.player.blaster_energy / this.player.blaster_max);
	var image_startY = this.laser_image_height - this.laser_image_height*perc+1;
	var gauge_startY = this.laser_gauge_height - this.laser_gauge_height*perc+8;
	//this.world.context.drawImage(this.img,253,image_startY,126,this.laser_image_height*perc,this.world.width-30,gauge_startY,22,this.laser_gauge_height*perc);
	//this.world.context.drawImage(this.img,1,1,126,512,this.world.width-30,8,22,120);
	this.world.context.drawImage(this.img,253,image_startY,126,this.laser_image_height*perc,this.world.width-30,gauge_startY+550,22,this.laser_gauge_height*perc);
	this.world.context.drawImage(this.img,1,1,126,512,this.world.width-30,8+550,22,120);



	//중력탄 갯수
	for(var i =0 ; i <=this.world.player.gravity_bullet; i++){
		this.world.context.drawImage(this.img_g,1,1,32,32,8 + (32*(i-1)),this.world.height-30 ,20,20);
	}

	//플레이어 정보
	

	this.iw.writeNum(16,10,10,this.world.score);
}
