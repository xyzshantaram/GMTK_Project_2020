let Game = {
    tileSize: 32,
    canvas: {},
    ctx: {},
    Input: {},
    canvasScale: {
        x: 1,
        y: 1
    },
    UI: {}
};

let mouse = {
    x: 0,
    y: 0
};

function init() {
    Game.canvas = document.getElementById("canvas");

    Game.canvas.width = document.body.clientWidth;
    Game.canvas.height = document.body.clientHeight;

    Game.UI.mask = document.getElementById("mask");
    Game.UI.maskSubtext = document.getElementById("mask-subtext");
    Game.UI.maskHeader = document.getElementById("mask-header");

    Game.ctx = canvas.getContext("2d");

    var divs = document.getElementsByTagName("div");

    for (var i = 0; i < divs.length; i++) {
        divs[i].hasMouseInside = false;
        divs[i].addEventListener("mouseenter", function () {
            this.hasMouseInside = true;
        });
        divs[i].addEventListener("mouseleave", function () {
            this.hasMouseInside = false;
        });
    }

    window.addEventListener("keypress", Game.Input.keyDownHandler);
    window.addEventListener("keyup", Game.Input.keyUpHandler);
    window.addEventListener("mousedown", Game.Input.mouseDownHandler);
    window.addEventListener("mouseup", Game.Input.mouseUpHandler);
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    window.addEventListener("resize", function () {
        Game.scaleCanvas(Game.canvasScale.x, Game.canvasScale.y);
    });

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("blur", Game.blurHandler);
    window.addEventListener("focus", Game.focusHandler);
    window.pressedKeys = [];

    Game.setPause(false);

    window.requestAnimationFrame(draw);
}

window.onload = init;