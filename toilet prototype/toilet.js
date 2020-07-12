var AnimationFrame, toilet, plunger;

const canvas = document.getElementById("canvas");
canvas.focus();
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();

var keysDown = {};
let mouseBtns = {};

window.addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
    keysDown[event.key] = false;
    event.preventDefault();
}, true);

window.addEventListener('mousedown', (e) => {
    if (e.which === 1) {
        plunge_down();
    }
})

window.addEventListener('mouseup', (e) => {
    if (e.which === 1) {
        plunge_up();
    }
})

let required_to_win = 20;
let won = false;
let times_moved = 0;
let last_direction = "up";

function updateGame() {
	if(!won) {
		AnimationFrame = requestAnimationFrame(updateGame);
		input();
		drawGame();
		if (times_moved >= required_to_win) {
			Audio.playSFX('flush-sound.mp3');
			won = true;
			drawGame();
		}
	}
}

let plunger_y = 0;
function input() {
    if (keysDown["ArrowDown"] || keysDown["s"]) {
        plunge_down();
    } else if (keysDown["ArrowUp"] || keysDown["w"]) {
        plunge_up();
    }
}

function plunge_down() {
	plunger_y = 50;
	Audio.playSFX('suction-01.mp3');
    if (last_direction != "down") {
        times_moved++;
    }
    last_direction = "down";
}

function plunge_up() {
	plunger_y = -50;
	Audio.playSFX('suction-02.mp3');
    last_direction = "up";
}

let textPrompt = "Blockage cleared: ";

function drawGame() {
    ctx.clearRect(0, 0, 800, 800);
    ctx.drawImage(toilet, 300, 200);
    ctx.drawImage(plunger, 400, 100 + plunger_y);
    ctx.fillStyle = "pink";
	ctx.font = "20px Monospace";
	if (!won) {
		ctx.fillText(textPrompt + ((100 / required_to_win) * times_moved) + "%", 100, 100);
		ctx.fillText("Press up and down / click your mouse to move the plunger", 100, 550);
	}
	else {
		textPrompt = "Blockage cleared!";
		ctx.fillText(textPrompt, 100, 100);
	}
}

let assets = new AssetManager(function () {
	toilet = assets.getAsset('toilet.png');
	plunger = assets.getAsset('plunger.png');
	AnimationFrame = requestAnimationFrame(updateGame);
});

assets.queueItems([
    new FileInfo("suction-01.mp3", "suction-01.mp3", "audio"),
    new FileInfo("suction-02.mp3", "suction-02.mp3", "audio"),
    new FileInfo("flush-sound.mp3", "flush-sound.mp3", "audio"),
    new FileInfo("toilet.png", "toilet.png", "img"),
    new FileInfo("plunger.png", "plunger.png", "img")
])

Array.prototype.remove = function (v) {
    if (this.indexOf(v) != -1) {
        this.splice(this.indexOf(v), 1);
        return true;
    }
    return false;
}

assets.loadAll();
