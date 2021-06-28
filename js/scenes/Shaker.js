const NORMAL = 0
const SHAKE_LEFT = 1
const SHAKE_RIGHT = 2
const NORMALIZE = 3


function Shaker(sc){
	this.sc = sc;
	this.context = sc.context
	this.wait_time = 0
	this.unit = 4;//px
	this.shake = false;
	this.state = NORMAL
	this.ms = new DataSet(0,0)
}

Shaker.prototype.draw = function(){
	if(this.shake){

			if(this.state == NORMAL){
				this.state = SHAKE_LEFT
			}else if(this.state == SHAKE_LEFT){
				this.context.translate(this.unit, 0)
				this.state = SHAKE_RIGHT
			}else if(this.state == SHAKE_RIGHT){
				this.context.translate(-2*this.unit ,0)
				this.state = NORMALIZE
			}else if(this.state == NORMALIZE){
				this.state = NORMAL
				this.shake = false;
				this.context.translate(this.unit,0)
			}

	}

}

Shaker.prototype.on = function(mag){
	this.unit = mag
	this.shake = true;
}


