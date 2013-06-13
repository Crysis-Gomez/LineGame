
$(document).ready(function()
{
	console.log("init");
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var startPosition = null;
	var endPosition = null;
	var mayDraw = false;
	var mouseIsDown = false;
	var count = 0.01;


	var lineSegment = function(v1,v2){
		this.startPosition = v1;
		this.endPosition = v2;
		this.ctx = ctx;
		this._color = "blue";

		this.draw = function(){
			ctx.strokeStyle = this._color;
      		ctx.lineWidth = 1;
			this.ctx.beginPath();
		 	this.ctx.moveTo(this.startPosition.x,this.startPosition.y);
		 	this.ctx.lineTo(this.endPosition.x,this.endPosition.y);
		 	ctx.stroke();

		}

		this.getDirection = function(){
			return this.endPosition.substract(this.startPosition);
		}

		this.getNormal = function(){
			dir = this.getDirection();
			perp = dir.getPerp();
			return perp.normalize();
		}

		this.lineIntersection  = function(v){
			
			pr =  this.endPosition.substract(this.startPosition);
			qs = v.endPosition.substract(v.startPosition);
			t = v.startPosition.substract(this.startPosition);
			cr = t.getCrossProd(qs);
			u =  t.getCrossProd(pr);
			rs = pr.getCrossProd(qs);

			result = cr/rs;
			result2 = u/rs;
			if(0 < result && result < 1 && 0 <result2 && result2 < 1){
			 	this._color = "red"
			 	return true
			}
			else{ 
				this._color = "blue";
				return false;
			}
		}

	}

	var ball = function(x,y,ctx){
		this.position = new vector(x,y);
		this.velocity = new vector(1,3);
		this.radius = 10;
		this.ctx = ctx;
		this.line = null;
		this.isColliding = false;


		this.update = function(){
			if(this.isColliding) return;
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;

		}

		this.lineIntersection  = function(v)
		{
			dx = this.position.x - (this.position.x + this.velocity.x);
			dy = this.position.y - (this.position.y + this.velocity.y);
			start = this.position.clone();
			end = this.position.clone();
			end = end.add(this.velocity);
			dx = v.endPosition.x - v.startPosition.x;
			dy = v.endPosition.y - v.startPosition.y;

			normalVector = new vector(-dy,dx);
			normalVector = normalVector.normalize();
			radiusVector = normalVector.multiply(this.radius);
			start = this.position.add(radiusVector);

			this.line =new lineSegment(new vector(start.x,start.y),new vector(end.x,end.y),this.ctx);
			
			
			if(this.line.lineIntersection(v))
			{
				// this.position.x -= this.velocity.x;
				// this.position.y -= this.velocity.y;
				dot = this.velocity.getDotProd (v.getNormal());
				vec = v.getNormal().multiply(2*dot);
				this.velocity = this.velocity.substract(vec)
			}
		}

		this.draw = function(){
			this.ctx.beginPath();
		 	this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
	     	this.ctx.fillStyle = 'green';
	      	this.ctx.fill();
		}

	}


	_ball = new ball(150,150,ctx);
	_line = new lineSegment(new vector(100,100),new vector(200,300),ctx);
	_line2 = new lineSegment(new vector(200,300),new vector(300,100),ctx);
	_line3 = new lineSegment(new vector(300,100),new vector(100,100),ctx);
	//_line2 = new lineSegment(new vector(110,110),new vector(200,10),ctx);

	// _ball2 = new ball(100,50,ctx);
	// _ball3 = new ball(300,30,ctx);
 
	//rotateLinesegment(_line,90);	

	 if(typeof game_loop != "undefined") clearInterval(game_loop);
	  	game_loop = setInterval(update, 10);
	 


	 function update(){
	 	
	 	paint();
	 	_ball.update();
	 	_ball.lineIntersection(_line);
	 	_ball.lineIntersection(_line2);
	 	_ball.lineIntersection(_line3);
	 	
	 	_line.draw();
	 	_line2.draw();
	 	_line3.draw();
	 	_ball.draw();
	 	//rotateLinesegment(_line,count);	
	 	//_line2.draw();
	 	//_line.lineIntersection(_line2)
	 }


	function paint(){
		ctx.clearRect (0 , 0,w , h );
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "white";
		ctx.strokeRect(0, 0, w, h);
	}

	function rotateLinesegment(line,angle){
		var start = line.startPosition.clone();
		var end = line.endPosition.clone();

		var center = line.startPosition.clone();
		
		center2 =  center.add(end);
		center3 = center2.multiply(0.5);

		na = start.substract(center3);
		nb = end.substract(center3);

		var rotateVector = function(v,angle){
			var s = Math.sin(angle);
			var c = Math.cos(angle);

			var nx = c * v.x - s * v.y;
			var ny = s * v.x + c * v.y;

			return new vector(nx,ny);

		}

		n_1  =  rotateVector(na,angle);
		n_2 =  n_1.add(center3);

		n_3 =  rotateVector(nb,angle);
		n_4 = n_3.add(center3);

	
		line.startPosition = n_2;
		line.endPosition = n_4;
	}

	canvas.onmousedown = function(e){
		
		startPosition = new vector(e.x,e.y);
		endPosition = new vector(e.x,e.y);
	    mouseIsDown = true;
	    mayDraw = true;
	    e.preventDefault();
	}


	canvas.onmousemove = function(e){
		e.preventDefault();
    	if(mouseIsDown){
    		endPosition.x = e.x;
    		endPosition.y = e.y;
    	}
	    return false;
	}


	canvas.onmouseup = function(e){
		e.preventDefault();
		
	    mouseIsDown = false;
	    mayDraw = false;
	}

});