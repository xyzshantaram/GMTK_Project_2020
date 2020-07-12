var toilet = new Image();
toilet.src = "toilet.png";
var plunger = new Image();
plunger.src = "plunger.png";

const canvas = document.getElementById("canvas");
canvas.focus();
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var keysDown = {};
window.addEventListener("keydown", function (event) {
	keysDown[event.key] = true;
	event.preventDefault();
}, true);
window.addEventListener("keyup", function (event) {
	keysDown[event.key] = false;
	event.preventDefault();
}, true);

var AnimationFrame = requestAnimationFrame(updateGame);


let required_to_win = 20;
let times_moved = 0;
let last_direction = "up";

function updateGame(){
	AnimationFrame = requestAnimationFrame(updateGame);
	input();
	drawGame();

	if (times_moved > required_to_win){

		// win

	}
}

let plunger_y = 0;
function input(){
	if(keysDown["ArrowDown"] || keysDown["s"]) {
		plunger_y = 50;
		if(last_direction != "down"){
			times_moved++;
		}
		last_direction = "down";
	}
	else if(keysDown["ArrowUp"] || keysDown["w"]) {
		plunger_y = -50;
		if(last_direction != "up"){
			times_moved++;
		}
		last_direction = "up";
	}
}

function drawGame(){
	ctx.clearRect(0,0,800,800);
	ctx.drawImage(
		toilet,
		300,
		200
		);
	ctx.drawImage(
		plunger,
		400,
		100+plunger_y
		);
	ctx.fillStyle = "pink";
	ctx.font = "20px Monospace";
	ctx.fillText("Toilet Status: " + (100/required_to_win)*times_moved + "%", 100, 100);

	ctx.fillText("Press up and down to move the plunger", 100, 550);
}