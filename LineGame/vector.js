var vector = function(x,y){
	this.x=x;
	this.y=y;


	this.clone = function(){
		return new vector(this.x,this.y);
	}

	this.getX = function(){
		return this.x;
	}

	this.zero = function(){
		this.x = 0;
		this.y = 0;
		return this;
	}

	this.isZero = function(){
		return this.x == 0 && this.y == 0;
	}

	this.angle = function(){
		return Math.atan2(this.x,this.y);
	}

	this.setLength = function(value){
		var a = angle();
		this.x = Math.cos(a) * value;
		this.y = Math.sin(a) * value;
	}

	this.getLenghtSQ = function(){
		return this.x * this.x + this.y * this.y;
	}

	this.getLength = function(){
		return Math.sqrt(this.getLenghtSQ());
	}

	this.normalize = function(){
		if(this.getLength() == 0){
			this.x  = 1;
			return this;
		}
		var len = this.getLength();
		this.x /= len;
		this.y /= len;

		return this;
	}

	this.truncate = function(max){
		setLength(Math.min(max,getLength()));
		return this;
	}

	this.reverse = function(){
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	this.isNormalized = function(){
		return this.getLength() == 1;
	}

	this.getDotProd = function(v2){
		return this.x *v2.x + this.y * v2.y;
	}

	this.getCrossProd = function(v2){
		return this.x *v2.y - this.y *v2.x;
	}

	this.getVectorCrossProd = function(v2){
		 var temp =this.getLength() * v2.getLength() * Math.sin(this.getAngleBetween(v2));
		 vect = new vector(1,1);
		 vect =  vect.multiply(temp);
		 return vect;
	}


	this.getAngleBetween = function(v2){
		if(!this.isNormalized()) v1 = this.clone().normalize();
		if(!v2.isNormalized()) v2 = v2.clone().normalize();
		return Math.acos(v1.getDotProd(v2));
	}

	this.getPerp = function(){
		return new vector(-this.y,this.x);
	}

	this.sign = function(v2){
		return this.getPerp().getDotProd(v2) < 0 ? -1:1;
	}

	this.distanceSQ = function(v2){
		var dx = v2.x - this.x;
		var dy = v2.y - this.y;
		return dx * dx + dy * dy;
	}

	this.distance = function(v2){
		return Math.sqrt(this.distanceSQ(v2))
	}

	this.add = function(v2){
		return new vector(this.x + v2.x, this.y + v2.y)
	}

	this.substract = function(v2){
		return new vector(this.x - v2.x, this.y - v2.y)
	}

	this.incrementBy = function(v){
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	this.decrementBy = function(v){
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	this.multiply = function(value){
		return new vector(this.x *value,this.y *value);
	}

	this.componentOnto = function(v2){
		var dot  = this.getDotProd(v2)/v2.getLenghtSQ();
		return v2.multiply(dot);
	}
	
	this.divide = function(value){
		return new vector(this.x/value,this.y/value);
	}

	this.equals = function(v2){
		return this.x == v2.x && this.y == v2.y;
	}

}