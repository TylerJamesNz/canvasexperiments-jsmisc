/*Variables
=================================================*/
var particleArray = [];
var particleNum = 1000;

/*Objects
=================================================*/
//Generate particles
for(var i=0; i<particleNum; i++){
	var particle = {
		objectType: "circle",
		objectColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
		objectWidth: 6,
		objectHeight: 6,
		radius: 3,
		xPosition: Math.random()*300,
		yPosition: Math.random()*300,
		speed: (Math.random()*3)+3,
		xVelocity: (Math.random()*3)+3,
		yVelocity: (Math.random()*3)+3,
		acceleration: 0,
		friction: 0,
		objectUpdate: function(){
			this.xPosition += this.xVelocity;
			this.yPosition += this.yVelocity;
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
	clearCanvas(canvasCtx, "#000");
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
			particleArray[i].yVelocity = Math.abs(particleArray[i].yVelocity)*-1;
		}
		if(particleArray[i].xPosition < 0){
			particleArray[i].xVelocity = Math.abs(particleArray[i].xVelocity);
		}
		if(particleArray[i].yPosition < 0){
			particleArray[i].yVelocity = Math.abs(particleArray[i].yVelocity);
		}
		
		/*Particle mouse
		if(getDistance(particleArray[i], mouse) < 100){
			angle = getAngle(particleArray[i], mouse, "radians");
			convertAngleVelocity(angle, particleArray[i]);
		}
		*/

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
