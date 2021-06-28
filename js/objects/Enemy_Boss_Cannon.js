function Enemy_Boss_Cannon(parent,pos,world){
	this.world = world;
	this.context = this.world.context;

	this.parent_loc = parent.loc;
	this.pos = pos
	this.loc = this.parent_loc.copy();

	this.vel = new DataSet(0,0);
	this.acc = new DataSet(0,0);
	this.vel.setMag(this.speed);

	this.img = new Image()
    this.img.src= "./Image/cannon.png"

	this.energy_ball = new Enemy_EnergyBall(this,this.world);
}
Enemy_Boss_Cannon.prototype.time = 1;
Enemy_Boss_Cannon.prototype.speed = 1;
Enemy_Boss_Cannon.prototype.color ="#ff0000";
Enemy_Boss_Cannon.prototype.R = 10;
Enemy_Boss_Cannon.prototype.isDead = false;
Enemy_Boss_Cannon.prototype.isKilled = false;
Enemy_Boss_Cannon.prototype.isMother = true;
Enemy_Boss_Cannon.prototype.deathEvent = false;
Enemy_Boss_Cannon.prototype.life = 10;
Enemy_Boss_Cannon.prototype.pattern = 0;
Enemy_Boss_Cannon.prototype.side = ENEMY;

Enemy_Boss_Cannon.prototype.setSpeed = function(speed){
	this.speed = speed;
	this.vel.setMag(this.speed);
}

Enemy_Boss_Cannon.prototype.type = 0;
Enemy_Boss_Cannon.prototype.setItem = function(num){
	if(num !=0 ){
		this.type = num;
		this.deathEvent = true;
	}
}
Enemy_Boss_Cannon.prototype.kill = function(){
	this.isKilled = true;
	this.isDead = true;
}
Enemy_Boss_Cannon.prototype.bullet_cnt=0;
Enemy_Boss_Cannon.prototype.max_bullet_cnt=25;
Enemy_Boss_Cannon.prototype.setFreq= function(num){
		this.max_bullet_cnt +=this.max_bullet_cnt*num;
}
Enemy_Boss_Cannon.prototype.create = function(){
	var bullets =[];
	return bullets;
}
Enemy_Boss_Cannon.prototype.update = function(){
	this.loc  = this.parent_loc.copy();
	var se = this.energy_ball.loc
	this.loc.add(this.pos)
	//log(distsq(se , this.loc))
	if( distsq(se , this.loc) > 80*80 || this.energy_ball.isDead){
		this.world.add_objs.push(this.energy_ball);
		this.energy_ball = new Enemy_EnergyBall(this,this.world);
	}else{
		this.energy_ball.update()
	}

	


}
Enemy_Boss_Cannon.prototype.killed = function(){

}

Enemy_Boss_Cannon.prototype.image_size = 30;
Enemy_Boss_Cannon.prototype.draw = function(){

		this.world.context.drawImage(this.img,1,1,32,32,this.loc.x-this.R,this.loc.y-this.R,2*this.R,2*this.R);

		this.energy_ball.draw()
	
	
}




