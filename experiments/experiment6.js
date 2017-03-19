/*Variables
=================================================*/
var particleArray = [];
var particleNum = 1000;
var objectArray = [];
var colorArray = ["#E8800C","#FFB30C","#FF5900","#E8300C","#FF0D19"];
var fireSpread = 2.5;
var fireLength = 200;
var flickerVariation = 100;
var curveRecede = 0.11;

/*Objects
=================================================*/
var world = {
	gravity: -0.3,
	objectColor: "rgba(0,0,0,0.05)"
}
//Generate particles
for(var i=0; i<particleNum; i++){
	var particle = {
		objectType: "circle",
		objectColor: colorArray[Math.floor(Math.random() * colorArray.length)],
		objectWidth: 4,
		objectHeight: 4,
		radius: 2,
		xPosition: Math.random()*stageWidth,
		yPosition: -Math.random()*50,
		xVelocity: fireSpread - (Math.random()*(fireSpread*2)),
		yVelocity: 0,
		speed: 0,
		acceleration: 0,
		friction: 0,
		startPos: {xPosition: -(Math.random()*100),yPosition: -(Math.random()*100)},
		objectUpdate: function(){
			this.xPosition += this.xVelocity;
			this.yPosition += this.yVelocity;
			this.yVelocity += world.gravity;
			this.speed = Math.sqrt(this.xVelocity*this.xVelocity + this.yVelocity*this.yVelocity);
		}
	}
	particleArray.push(particle);
}
//Positon Mouse Center
mouse.xPosition = stageWidth / 2;
mouse.yPosition = (stageHeight / 3)*2;



/*Initialization
=================================================*/
setInterval(update,33.33);
	
/*Functions
=================================================*/
function update(){
	clearCanvas(canvasCtx, world.objectColor);
	updateParticles(particleArray);
	collisions();
	renderParticles(particleArray);
	renderObjects(objectArray);
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
		/*Reset particles at top of stage*/
		if(particleArray[i].yPosition > stageHeight + particleArray[i].objectHeight){
			particleArray[i].yVelocity = 0;
			particleArray[i].xVelocity = 0;
			particleArray[i].yPosition = 0 - particleArray[i].objectHeight;
			particleArray[i].xPosition = Math.random()*stageWidth;
		}
		/*fire flicker out*/
		if(getDistance(particleArray[i], particleArray[i].startPos) > fireLength + (Math.random()* flickerVariation)){
			particleArray[i].xVelocity = fireSpread - (Math.random()*(fireSpread*2));
			particleArray[i].yVelocity = 0;
			particleArray[i].xPosition = mouse.xPosition;
			particleArray[i].yPosition = mouse.yPosition;
			particleArray[i].startPos = {xPosition: mouse.xPosition,yPosition: mouse.yPosition};
		}
		/*Particles back to center*/
		if(particleArray[i].xPosition > particleArray[i].startPos.xPosition){
			particleArray[i].xVelocity -= curveRecede;
		}
		if(particleArray[i].xPosition < particleArray[i].startPos.xPosition){
			particleArray[i].xVelocity += curveRecede;
		}
	}
}
/*Rendering
=================================================*/
/*Canvas*/
function renderParticles(array){
	for(var i=0; i<array.length; i++){
		render(array[i]);
	}
}
function renderObjects(array){
	for(var i=0; i<array.length; i++){
		render(array[i]);
	}
}
