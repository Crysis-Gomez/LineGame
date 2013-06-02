
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


	var lineSegment = function(v1,v2){
		this.startPosition = v1;
		this.endPosition = v2;
		this.ctx = ctx;

		this.draw = function(){
			ctx.strokeStyle = "blue";
      		ctx.lineWidth = 4;
			this.ctx.beginPath();
		 	this.ctx.moveTo(this.startPosition.x,this.startPosition.y);
		 	this.ctx.lineTo(this.endPosition.x,this.endPosition.y);
		 	ctx.stroke();

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
			 	console.log("lines intersection");
			}
		}

	}

	var ball = function(x,y,ctx){
		this.position = new vector(x,y);
		this.velocity = new vector(4,2);
		this.radius = 10;
		this.ctx = ctx;


		this.update = function(){
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
			this.edge();
			this.draw();
		}

		this.edge = function(){

		}


		this.draw = function(){
			this.ctx.beginPath();
		 	this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
	     	this.ctx.fillStyle = 'green';
	      	this.ctx.fill();
		}

	}


	//_ball = new ball(50,50,ctx);
	_line = new lineSegment(new vector(500,500),new vector(0,0),ctx);
	_line2 = new lineSegment(new vector(200,210),new vector(560,10),ctx);

	// _ball2 = new ball(100,50,ctx);
	// _ball3 = new ball(300,30,ctx);

	 if(typeof game_loop != "undefined") clearInterval(game_loop);
	  	game_loop = setInterval(update, 10);

	 function update(){

	 	paint();
	 	_line.draw();
	 	_line2.draw();
	 	_line.lineIntersection(_line2)
	 }


	function paint(){
		ctx.clearRect (0 , 0,w , h );
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "white";
		ctx.strokeRect(0, 0, w, h);
	}


	function drawLine(x,y){
		
		//ctx.fill();
		ctx.clearRect (0 , 0,w , h );
		ctx.strokeStyle = "blue";
		ctx.beginPath();
      	ctx.moveTo(startPosition.x, startPosition.y);
      	ctx.lineTo(x, y);
      	ctx.lineWidth = 4;
      	ctx.stroke();
      	console.log("paint")

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