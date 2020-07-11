let Game = {
    tileSize: 32,
    canvas: {},
    ctx: {},
    Input: {},
    Config: {},
    canvasScale: {
        x: 1,
        y: 1
    },
    UI: {}, 
    Player: {},
    Scene: {
        entities: []
    }
};

let mouse = {
    x: 0,
    y: 0,
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
        Game.scaleCanvas();
    });

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX * Game.canvasScale.x;
        mouse.y = e.clientY * Game.canvasScale.y;
    });

    window.addEventListener("blur", Game.blurHandler);
    window.addEventListener("focus", Game.focusHandler);
    window.pressedKeys = [];

    Game.setPause(false);

    let assets = new AssetManager(
        function() {
            Game.loadScene(assets.getAsset("SceneData.json"), function() {
                window.requestAnimationFrame(draw);
            });
        }
    );

    assets.queueItems([
        new FileInfo("mc_idle.png", "assets/img/mc_idle.png", "img"),
        new FileInfo("mc_jump.png", "assets/img/mc_jump.png", "img"),
        new FileInfo("mc_run_left.png", "assets/img/mc_run_left.png", "img"),
        new FileInfo("mc_run_right.png", "assets/img/mc_run_left.png", "img"),
        new FileInfo("mc_idle_right.png", "assets/img/mc_idle_right.png", "img"),
        new FileInfo("mc_idle_left.png", "assets/img/mc_idle_left.png", "img"),
        new FileInfo("sample.mp3", "assets/audio/music.mp3", "audio"),
        new FileInfo("SceneData.json", "assets/text/SceneData.json", "text")
    ])

    assets.loadAll();
    // Game.Input.entityUnderControl;
}

window.onload = init;