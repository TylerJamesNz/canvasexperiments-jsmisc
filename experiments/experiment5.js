/*Variables
=================================================*/
var particleArray = [];
var particleNum = 200;
var mouseRadius = 80;
var newCircle;

/*Objects
=================================================*/
var world = {
	gravity: -0.5,
	objectColor: "rgba(0,0,0,0.05)"
}
//Generate particles
for(var i=0; i<particleNum; i++){
	var particle = {
		objectType: "square",
		objectColor: "#36cf00",
		objectWidth: 10,
		objectHeight: 10,
		radius: 5,
		xPosition: Math.random()*stageWidth,
		yPosition: (Math.random()*stageHeight) * -1,
		xVelocity: 0,
		yVelocity: 0,
		speed: 0,
		acceleration: 0,
		friction: 0,
		objectUpdate: function(){
			this.xPosition += this.xVelocity;
			this.yPosition += this.yVelocity;
			this.yVelocity += world.gravity;
			this.speed = Math.sqrt(this.xVelocity*this.xVelocity + this.yVelocity*this.yVelocity);
		}
	}
	particleArray.push(particle);
}
//Generate world objects
createObject(stageWidth / 2,stageHeight / 2,100,"#fff");


function createObject(xPos,yPos,rad,color){
	newCircle = {
		objectType: "circle",
		objectColor: color,
		xPosition: xPos,
		yPosition: yPos,
		objectWidth: rad*2,
		objectHeight: rad*2,
		xVelocity: 10 - (Math.random()*6),
		yVelocity: 10 - (Math.random()*6),
		radius: rad,
		objectUpdate: function(){
			this.xPosition += this.xVelocity;
			this.yPosition += this.yVelocity;
		}
	}
}


/*Initialization
=================================================*/
setInterval(update,33.33);
	
/*Functions
=================================================*/
function update(){
	clearCanvas(canvasCtx, world.objectColor);
	newCircle.objectUpdate();
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
	for(var i=0; i<particleArray.length; i++){
		/*Reset particles at top of stage*/
		if(particleArray[i].yPosition < 0 - particleArray[i].objectHeight){
			particleArray[i].yVelocity = 0;
			particleArray[i].xVelocity = 0;
			particleArray[i].yPosition = stageHeight + particleArray[i].objectHeight;
			particleArray[i].xPosition = Math.random()*stageWidth;
		}
		/*Particles and Mouse*/
		if(getDistance(particleArray[i],newCircle) < particleArray[i].radius + newCircle.radius){
			var angle = getAngle(particleArray[i],newCircle,"radians");
			convertAngleVelocity(angle, particleArray[i])
		}
	}
	/*Distorter and wall*/
	if(newCircle.xPosition + newCircle.objectWidth > stageWidth){
			newCircle.xVelocity = Math.abs(newCircle.xVelocity)*-1;
	}
	if(newCircle.yPosition + newCircle.objectHeight > stageHeight){
		newCircle.yVelocity = Math.abs(newCircle.yVelocity)*-1;
	}
	if(newCircle.xPosition < 0){
		newCircle.xVelocity = Math.abs(newCircle.xVelocity);
	}
	if(newCircle.yPosition < 0){
		newCircle.yVelocity = Math.abs(newCircle.yVelocity);
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
