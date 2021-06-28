function PatternData(code){
	this.code = code;
	this.pattern = poj.getPatObj(code)
	this.freq = 10;
	this.freq_unit = 10;
	this.freq_cnt = 0;
	this.isAlive = false;
}

PatternData.prototype.check = function(){
	if(this.freq_cnt>=this.freq){
		this.freq_cnt =0;
		return true&&this.isAlive;
	}else{
		this.freq_cnt++;
		return false&&this.isAlive;
	}
	
}


PatternData.prototype.setFreq = function(num){
	this.freq = this.freq_unit*(1+num);
}

PatternData.prototype.fire = function(loc){
	return this.pattern.fire(loc)
}
