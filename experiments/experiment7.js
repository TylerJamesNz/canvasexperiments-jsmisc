/*Variables
=================================================*/
var particleArray = [];
var levelArray = [];
var particleNum = 100;

/*Objects
=================================================*/
var world = {
	gravity: 0.5,
	objectColor: "#534D91"
}
//Create hero
var hero = {
	objectType: "square",
	objectColor: "#DED184",
	objectWidth: 30,
	objectHeight: 50,
	xPosition: stageWidth / 2,
	yPosition: (stageHeight / 2) + 100,
	speed: (Math.random()*6)-3,
	xVelocity: 0,
	yVelocity: 0,
	acceleration: 0.8,
	friction: 0.9,
	jumpRate: 12,
	inAir: true,
	objectUpdate: function(){
		this.xPosition += this.xVelocity;
		this.yPosition += this.yVelocity;
		this.xVelocity *= this.friction;
		this.yVelocity += world.gravity;
		heroKeyboardInput();
	}
}
level = {
	tile_width: stageWidth / 12,
	tile_height: stageHeight / 10,
	tile1_color: "#2C2945",
	blocks: [
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				
			]
}

	


/*Initialization
=================================================*/
setInterval(update,33.333);
	
/*Functionswd
=================================================*/
function update(){
	clearCanvas(canvasCtx, world.objectColor);
	hero.objectUpdate();
	collisions();
	renderLevel(level);
	render(hero);
}
/*Update funtions*/


/*Collisions
=================================================*/
function collisions(){
 	/*hero floor*/
 	if(hero.yPosition + hero.objectHeight > stageHeight){
 		hero.yPosition -= hero.yVelocity * 0.75;
 		hero.yVelocity = 0;
 		hero.inAir = false;
 	}
 	/*Hero level*/
 	for(var i=0; i<levelArray.length; i++){
 		applyCollision(seperatingAxis(hero,levelArray[i]));
 	}
}

/*Input
=================================================*/
function heroKeyboardInput(){
	/*Movement*/
	if(checkPressed("a")){
		hero.xVelocity -= hero.acceleration;
	}
	if(checkPressed("d")){
		hero.xVelocity += hero.acceleration;
	}
	/*Jump*/
	if(checkPressed("w") && hero.inAir == false){
		hero.yPosition -= 3;
		hero.yVelocity = Math.abs(hero.jumpRate)*-1;
		hero.inAir = true;
	}
}

/*Rendering
=================================================*/
/*Canvas*/
function renderLevel(level){
	for(var i=0; i<level.blocks.length; i++){
		for(var j=0; j<level.blocks[i].length; j++){
			switch(level.blocks[i][j]){
				case 0:
					//add nothing.
					break;
				case 1:
					var levelBlock = {
						objectType: "square",
						objectColor: level.tile1_color,
						objectWidth: level.tile_width + 1,
						objectHeight: level.tile_height + 1,
						xPosition: j * level.tile_width,
						yPosition: i * level.tile_height
					}
					render(levelBlock);
					levelArray.push(levelBlock);
					break;
				default:
					console.log("The level passed to renderLevel() contains an invalid block");
					break;
			}
		}
	}
}

