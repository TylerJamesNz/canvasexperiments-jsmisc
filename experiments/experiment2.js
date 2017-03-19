/*Variables
=================================================*/
var particleArray = [];
var particleNum = 100;

/*Objects
=================================================*/
var world = {
	gravity: 0.3
}
//Generate particles
for(var i=0; i<particleNum; i++){
	var particle = {
		objectType: "circle",
		objectColor: '#6DC22A',
		objectWidth: 6,
		objectHeight: 6,
		radius: 10,
		xPosition: Math.random()*stageWidth,
		yPosition: Math.random()*250,
		speed: (Math.random()*6)-3,
		xVelocity: (Math.random()*6)-3,
		yVelocity: 0,
		acceleration: 0,
		friction: 0,
		objectUpdate: function(){
			this.xPosition += this.xVelocity;
			this.yPosition += this.yVelocity;
			this.yVelocity += world.gravity;
		}
	}
	particleArray.push(particle);
}

/*Initialization
=================================================*/
setInterval(update,33.33);
	
/*Functions
=================================================*/
function update(){
	clearCanvas(canvasCtx, "#341736");
	updateParticles(particleArray);
	collisions();
	renderParticles(particleArray);
}
/*Update funtions*/
function updateParticles(array){
	for(var i=0; i<array.length; i++){
		particleArray[i].objectUpdate();	
	}
}

/*Collisions
=================================================*/
function collisions(){
 	/*particles wall*/
	for(var i=0; i<particleArray.length; i++){
		if(particleArray[i].xPosition + particleArray[i].objectWidth > stageWidth){
			particleArray[i].xVelocity = Math.abs(particleArray[i].xVelocity)*-1;
		}
		if(particleArray[i].yPosition + particleArray[i].objectHeight > stageHeight){
			particleArray[i].yVelocity = Math.abs(particleArray[i].yVelocity*0.95)*-1;
		}
		if(particleArray[i].xPosition < 0){
			particleArray[i].xVelocity = Math.abs(particleArray[i].xVelocity);
		}
		if(particleArray[i].yPosition < 0){
			particleArray[i].yVelocity = Math.abs(particleArray[i].yVelocity);
		}
	}
}
/*Rendering
=================================================*/
/*Canvas*/
function renderParticles(array){
	for(var i=0; i<array.length; i++){
		render(particleArray[i]);
	}
}
