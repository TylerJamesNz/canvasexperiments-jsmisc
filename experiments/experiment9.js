/*Variables
=================================================*/
var particleArray = [];
var particleNum = 200;

/*Objects
=================================================*/
var world = {
	gravity: 0,
	objectColor: "rgba(0,0,0,0.09)"
}
//Generate particles
for(var i=0; i<particleNum; i++){
	var particle = {
		objectType: "circle",
		objectColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
		objectWidth: 20,
		objectHeight: 20,
		radius: 5,
		xPosition: stageWidth / 2,
		yPosition: stageHeight / 2,
		xVelocity: (Math.random()*30) - 15,
		yVelocity: (Math.random()*30) - 15,
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
var circle = createCircle(stageWidth / 2 ,stageHeight / 2,150,"#000");
var text = {
	objectType: "text",
	objectColor: "#fff",
	font: "20pt Arial", 
	objectText: "Error 404",
	xPosition: (stageWidth / 2) - 58,
	yPosition: (stageHeight / 2) - 5
}
var text2 = {
	objectType: "text",
	objectColor: "#fff",
	font: "15pt Arial", 
	objectText: "Experiment not Found",
	xPosition: (stageWidth / 2) - 95,
	yPosition: (stageHeight / 2) + 20
}
addChild(circle);
addChild(text);
addChild(text2);

/*Initialization
=================================================*/
setInterval(update,33.33);
	
/*Update functions
=================================================*/
function update(){
	clearCanvas(canvasCtx, world.objectColor);
	updateParticles(particleArray);
	collisions();
	renderMulti(particleArray);
	renderDisplayList();
}

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
		/*Reset particles in middle of stage*/
		var bottomCollision = particleArray[i].yPosition > stageHeight + particleArray[i].objectHeight;
		var topCollision = particleArray[i].yPosition < 0;
		var leftCollision = particleArray[i].xPosition < 0;
		var rightCollision = particleArray[i].xPosition > stageWidth + particleArray[i].objectWidth;
		
		if(bottomCollision || topCollision || leftCollision || rightCollision){
			particleArray[i].yVelocity = (Math.random()*30) - 15;
			particleArray[i].xVelocity = (Math.random()*30) - 15;
			particleArray[i].yPosition = stageHeight / 2;
			particleArray[i].xPosition = stageWidth / 2;
		}
	}
}



