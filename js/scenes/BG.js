function BG(sc){
	this.sc = sc
	this.context = this.sc.context;

	this.img = new Image();
	this.img.src= "./Image/bgimg2.png"

	this.stars = []
	var init_star_num = 10+ Math.random()*10
	this.vel = new DataSet(0,1)
		
	for(var i = 0; i<= init_star_num ; i++ ){
		this.vel.setMag(1+ Math.random());
		var loc = new DataSet(Math.random()*this.sc.width ,Math.random()*this.sc.height );
		var star = new Star( loc,this.vel.copy(),this.sc);
		star.R = 1+Math.random()*2
		this.stars.push(star)
	}
	
	
	
}
BG.prototype.newStar_cnt = 0;
BG.prototype.max_newStar_cnt = 10;
BG.prototype.star_acc = new DataSet(0,1)
BG.prototype.update = function(){
	if(this.newStar_cnt >=this.max_newStar_cnt){
		this.newStar_cnt = 0;
		var loc = new DataSet(Math.random()*this.sc.width , 0 )

			this.vel.set(0,1+ Math.random())

		var star = new Star( loc,this.vel.copy(),this.sc);
		
		star.R = 1+Math.random()*2
		this.stars.push(star)

	}else{this.newStar_cnt++}
	
	for(var idx in this.stars){
		if(this.stars[idx].isDead){
			this.stars.splice(idx,1);
		}
   	}


	for(var idx in this.stars){
		this.stars[idx].update();
	}
}

BG.prototype.draw = function(){
	this.context.drawImage(this.img,1,1,450,700,0,0,this.sc.width,this.sc.height);
	for(var idx in this.stars){
		this.stars[idx].draw();
	}
	
	
}
