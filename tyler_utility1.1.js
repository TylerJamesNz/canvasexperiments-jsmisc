/**
 * Wooo
 * A utility file for all Tylers js canvas meanderings
 * http://tyler.batchelor.yoobee.net.nz/_Assignments/WE04/index.php
 */

/*Function / Object / Var Reference
=================================================*/
// - checkPressed("key") - returns whether key is pressed or not.
// - mousePos("axis") - returns the mouse position on requested axis.
// - mouseDown() - returns whether the mouse is pressed.
// - render(object) - renders an object on the canvas.
// - clearCanvas(context, clearColor) - Clears the provided canvas element.
// - getDistance(object1, object2) - Returns the distance between two objects.
// - getAngle(object1, object2, unit) - Returns the angle between two objects in radians or degrees.
// - seperatingAxis(dynamicObject, staticObject) - returns a collision object with info on a seperating axis collision between static and dynamic object.
// - applyCollision(object, collisionObject) - applies a provided collision object to the dynamic element inside it.
// - convertAngleVelocity(angleRadians, object) - applies an angle to an objects velocity.
// - stageWidth - The width of the canvas element.
// - stageHeight - The height of the canvas element.
// - canvasCtx - The context reference of the canvas element (2D).
// - keyboard [object] - Access keyboard parameters.
// - mouse [object] - access mouse parameters.

/*Variables
=================================================*/
var canvas = document.getElementById("canvas");
var mouseIsDown = false;
var mouseX = 0;
var mouseY = 0;
//Set this to true if you want the canvas element to ignore its attributes and fill parent;
var canvasExpand = true;
//Set this to true if you want the canvas element to respond to window resize;
var responsive = true;
initCanvas();
var stageWidth = canvas.width;
var stageHeight = canvas.height;
var canvasCtx = canvas.getContext("2d");

/*Objects
=================================================*/
var keyboard = {
	wPressed: false,
	aPressed: false,
	sPressed: false,
	dPressed: false,
	spacePressed: false,
}
var mouse = {
	xPosition: 0,
	yPosition: 0,
	pressed: false
}

/*Event Listeners
=================================================*/
window.onkeydown = keyDownHandler;
window.onkeyup = keyUpHandler;
canvas.addEventListener('mousemove', mouseMoveHandler, false);
canvas.addEventListener('mousedown', mouseDownHandler, false);
canvas.addEventListener('mouseup', mouseUpHandler, false);
window.onresize = responsiveUpdate;

/*Functions
=================================================*/
/*Updates*/

function responsiveUpdate() {
	if (responsive) {
		canvas.style.width = "100%";
		canvas.style.height = canvas.innerWidth * 0.513;
		stageWidth = canvas.width;
		stageHeight = canvas.height;
	}
}
/*Math*/
function getDistance(object1, object2){
    var distX = object1.xPosition - object2.xPosition;
    var distY = object1.yPosition - object2.yPosition;
    return Math.sqrt(distX * distX + distY * distY);
}
function getAngle(object1, object2, unit){
	var xDifference = object1.xPosition - object2.xPosition;
	var yDifference = object1.yPosition - object2.yPosition;
	switch(unit){
		case "radians":
			return Math.atan2(yDifference,xDifference);
			break;
		case "degrees":
			var radians = Math.atan2(yDifference,xDifference);
			return (heroInitialBowAngle * 180) / Math.PI;
			break;
		default:
			console.log("getAngle() Cant retrieve an angle from that kind of unit");
	}
}
function convertAngleVelocity(angleRadians, object){
	var bounceDecreaser = 0.70;
	object.xVelocity = (object.speed * Math.cos(angleRadians)) * bounceDecreaser;
	object.yVelocity = (object.speed * Math.sin(angleRadians)) * bounceDecreaser;
}
function seperatingAxis(dynamicObject, staticObject){
	//The half widths and heights of the objects passed in.
	var halfWidth1 = dynamicObject.objectWidth / 2;
	var halfWidth2 = staticObject.objectWidth / 2;
	var halfHeight1 = dynamicObject.objectHeight / 2;
	var halfHeight2 = staticObject.objectHeight / 2;
	//The difference in x and y position of object 1 and 2
	var xDifference = (dynamicObject.xPosition + halfWidth1) - (staticObject.xPosition + halfWidth2);
	var yDifference = (dynamicObject.yPosition + halfHeight1) - (staticObject.yPosition + halfHeight2)
	//The x and y distance of object 1 and 2
	var xDistance = Math.abs(xDifference);
	var yDistance = Math.abs(yDifference);

	//If colliding on both axis (distance is less than both halves);
	if(yDistance < halfHeight1 + halfHeight2 && xDistance < halfWidth1 + halfWidth2){
		//Calculate the amount of overlap on each axis of the collision.
		if(xDifference > 0){
			var leftDistance = 0;
			var rightDistance = Math.abs(xDistance - (halfWidth1 + halfWidth2));;
		}else{
			var leftDistance = Math.abs(xDistance - (halfWidth1 + halfWidth2));
			var rightDistance = 0;
		}
		if(yDifference < 0){
			var topDistance = Math.abs(yDistance - (halfHeight1 + halfHeight2));
			var bottomDistance = 0;
		}else{
			var topDistance = 0;
			var bottomDistance = Math.abs(yDistance - (halfHeight1 + halfHeight2));
		}

		//return seperating axis collision object.
		return {
			collisionType: "seperatingAxis",
			collisionRespondant: dynamicObject,
			collisionLeft: leftDistance,
			collisionRight: rightDistance,
			collisionTop: topDistance,
			collisionBottom: bottomDistance,
		}
	}else{
		//return empty collision object.
		return {
			collisionType: "noCollision"
		}	
	}
}
function applyCollision(collisionObject, levelObject, dynamicLevel){
	switch(collisionObject.collisionType){
		case "noCollision":
			//Do nothing
			break;
		case "seperatingAxis":
			//Figure out which axis has the least overlap.
			if(collisionObject.collisionLeft + collisionObject.collisionRight < collisionObject.collisionTop + collisionObject.collisionBottom){
				//Collision axis = x, set x velocity to slight rebound
				collisionObject.collisionRespondant.xVelocity *= -0.2;
				//Figure out which side object overlapped on.
				if(collisionObject.collisionLeft == 0){
					//Collision was on right side move object or level back to the right
					if(dynamicLevel){
						level.xPosition -= collisionObject.collisionRight*1.1;
					}else{
						collisionObject.collisionRespondant.xPosition += collisionObject.collisionRight;
					}
				}else{
					//Collision was on left side move object left or level right.
					if(dynamicLevel){
						level.xPosition += collisionObject.collisionLeft*1.1;
					}else{
						collisionObject.collisionRespondant.xPosition -= collisionObject.collisionLeft;	
					}
				}
			}else{
				//Collision axis = y set y velocity to 0
				collisionObject.collisionRespondant.yVelocity = 0;
				//Figure out which side object overlapped on.
				if(collisionObject.collisionBottom == 0){
					//Collision was on top side move object up
					collisionObject.collisionRespondant.yPosition -= collisionObject.collisionTop;
					//Allow the object to jump again if it has the capability
					if(collisionObject.collisionRespondant.inAir != null){
						collisionObject.collisionRespondant.inAir = false;
					}
				}else{
					//Collision was on bottom side move object down
					collisionObject.collisionRespondant.yPosition += collisionObject.collisionBottom;
				}
			}
			break;
		case "circular":
			//todo
			//circular application to object.
			break;
		default:
			console.log("applyCollison() cannot use the provided collision type");
			break;
	}
}
/*Canvas*/

function initCanvas() {
	if (canvasExpand == true) {
		canvas.style.width = "100%";
		canvas.style.height = canvas.width * 0.513;
	}
}

function render(object){
	canvasCtx.fillStyle = object.objectColor;
	canvasCtx.strokeStyle = object.objectColor;
	switch(object.objectType){
		case "square":
			canvasCtx.fillRect(object.xPosition,object.yPosition,object.objectWidth,object.objectHeight);
			break;
		case "circle":
			canvasCtx.beginPath();
			canvasCtx.arc(object.xPosition,object.yPosition,object.radius,0,2*Math.PI);
			canvasCtx.fill();
			canvasCtx.stroke();
			break;
		case "image":
			//todo
			break;
		default:
			console.log("Not a valid object type for render" + object);
	}
}

function clearCanvas(context, clearColor){
	context.fillStyle = clearColor;
	context.fillRect(0,0,stageWidth,stageHeight);
}
/*Mouse*/

function mouseMoveHandler(event) {
	var rect = canvas.getBoundingClientRect();
	mouseX = event.clientX - rect.left;
	mouseY = event.clientY - rect.top;
	mouse.xPosition = mouseX;
	mouse.yPosition = mouseY;
}

function mouseDownHandler(event) {
	mouseIsDown = true;
}

function mouseUpHandler(event) {
	mouseIsDown = false;
}

function mousePressed() {
	return mouseIsDown
}

function mousePos(axis) {
	switch (axis) {
		case "x":
			return mouseX;
			break;
		case "y":
			return mouseY;
			break;
		default:
			console.log("You entered an invalid axis");
	}
}
/*Keyboard*/

function checkPressed(key) {
	switch (key) {
		case "w":
			if (keyboard.wPressed) {
				return true;
			} else {
				return false;
			}
			break;
		case "a":
			if (keyboard.aPressed) {
				return true;
			} else {
				return false;
			}
			break;
		case "s":
			if (keyboard.sPressed) {
				return true;
			} else {
				return false;
			}
			break;
		case "d":
			if (keyboard.dPressed) {
				return true;
			} else {
				return false;
			}
			break;
		case "space":
			if (keyboard.spacePressed) {
				return true;
			} else {
				return false;
			}
			break;
		default:
			return false;
	}
}

function keyDownHandler(evt) {
	switch (evt.keyCode) {
		case 87:
			keyboard.wPressed = true;
			break;
		case 65:
			keyboard.aPressed = true;
			break;
		case 83:
			keyboard.sPressed = true;
			break;
		case 68:
			keyboard.dPressed = true;
			break;
		case 32:
			keyboard.spacePressed = true;
			break;
	}
}

function keyUpHandler(evt) {
	switch (evt.keyCode) {
		case 87:
			keyboard.wPressed = false;
			break;
		case 65:
			keyboard.aPressed = false;
			break;
		case 83:
			keyboard.sPressed = false;
			break;
		case 68:
			keyboard.dPressed = false;
			break;
		case 32:
			keyboard.spacePressed = false;
			break;
	}
}
console.log("Canvas utilities initiated.");