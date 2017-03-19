/*Variables
=================================================*/
var particleArray = [];
var particleNum = 200;
var objectArray = [];

/*Objects
=================================================*/
var world = {
	gravity: 0.5,
	objectColor: "rgba(0,0,0,0.05)"
}
//Generate particles
for(var i=0; i<particleNum; i++){
	var particle = {
		objectType: "circle",
		objectColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
		objectWidth: 20,
		objectHeight: 20,
		radius: 10,
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
	var newCircle = {
		objectType: "circle",
		objectColor: color,
		xPosition: xPos,
		yPosition: yPos,
		objectWidth: rad*2,
		objectHeight: rad*2,
		radius: rad,
	}
	objectArray.push(newCircle);
}


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
		/*Particles and Object*/
		for(var j=0; j<objectArray.length; j++){
			if(getDistance(particleArray[i],objectArray[j]) < particleArray[i].radius + objectArray[j].radius){
				var angle = getAngle(particleArray[i],objectArray[j],"radians");
				convertAngleVelocity(angle, particleArray[i])
			}
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
