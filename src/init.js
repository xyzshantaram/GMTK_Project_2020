let assets;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
function init() {
    Game.canvas = document.getElementById("canvas");

    Game.canvas.width = document.body.clientWidth;
    Game.canvas.height = document.body.clientHeight;

    Game.ctx = canvas.getContext("2d");
    Game.ctx.imageSmoothingEnabled = false;

    Game.audioCtx = new AudioContext();

    Game.UI.mask = document.getElementById("mask");
    Game.UI.maskSubtext = document.getElementById("mask-subtext");
    Game.UI.maskHeader = document.getElementById("mask-header");
    Game.UI.btnWrapper = document.getElementById("button-wrapper");
    Game.UI.textBox = document.getElementById('text-box');
    Game.UI.npcName = document.getElementById('npc-name');
    Game.UI.dialogueBox = document.getElementById('dialogue');
    Game.UI.healthBar = document.getElementById('health-value');
    Game.UI.healthText = document.getElementById('health-value-text');

    Game.UI.hideTextBox();

    Game.Player = new Entity(new Vector2(400, 448), "Player", undefined, Game.tileSize, Game.tileSize);
    Game.entities.push(new Entity(new Vector2(0, 288), "platform", undefined, 1280, 10));
    Game.entities.push(new Entity(new Vector2(0, 720), "platform", undefined, 1280, 10));
    Game.entities.push(new Entity(new Vector2(0, 0), "platform", undefined, 1280, 10));

    Game.entities.push(new Entity(new Vector2(0, 0), "wall", undefined, 10, 720));
    Game.entities.push(new Entity(new Vector2(1280, 0), "wall", undefined, 10, 730));
    Game.entities.push(new Entity(new Vector2(446, 288), "wall", undefined, 10, 350));

    Game.entities.push(new Entity(new Vector2(0, 480), "platform", undefined, 200, 10));
    Game.entities.push(new Entity(new Vector2(260, 480), "platform", undefined, 350, 10));
    Game.entities.push(new Entity(new Vector2(610, 480), "wall", undefined, 10, 158));

    toilet = new Entity(new Vector2(520, 688), "KTRIGGER", undefined, 32, 32, "yellow");
    toilet.action = () => { alert('todo: embed toilet frame') }
    Game.entities.push(toilet);
    Game.entities.push(new Entity(new Vector2(200, 480), "platform", undefined, 10, 240, "#007cdf"));



    Game.entities.push(Game.Player);
    Game.mainCamera = new Camera(Game.Player, 1);

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

    window.addEventListener("keydown", Game.Input.keyDownHandler);
    window.addEventListener("keyup", Game.Input.keyUpHandler);
    window.addEventListener("mousedown", Game.Input.mouseDownHandler);
    window.addEventListener("mouseup", Game.Input.mouseUpHandler);
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    window.addEventListener("resize", function () {
        Game.scaleCanvas();
    });

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX * 2 * Game.canvasScale.x;
        mouse.y = e.clientY * 2 * Game.canvasScale.y;
    });

    window.addEventListener("blur", Game.blurHandler);
    window.addEventListener("focus", Game.focusHandler);
    window.pressedKeys = [];

    assets = new AssetManager(function () {
        Game.loadScene(assets.getAsset("SceneData.json"), () => { console.log('ready.') });
    }
    );

    assets.queueItems([
        new FileInfo("ss_4_mc_idle.png", "assets/img/ss_4_mc_idle.png", "img"),
        new FileInfo("ss_1_mc_jump.png", "assets/img/ss_1_mc_jump.png", "img"),
        new FileInfo("ss_8_mc_runL.png", "assets/img/ss_8_mc_runL.png", "img"),
        new FileInfo("ss_8_mc_runR.png", "assets/img/ss_8_mc_runR.png", "img"),
        new FileInfo("sample.mp3", "assets/audio/music.mp3", "audio"),
        new FileInfo("SceneData.json", "assets/text/SceneData.json", "text"),
        new FileInfo("Website-test-grid.jpg", "assets/img/Website-test-grid.png", "img"),
        new FileInfo("Website-test-grid.jpg", "assets/img/Website-test-grid.png", "img"),
        new FileInfo("clickSFX.mp3", "assets/audio/clickSFX.mp3", "audio"),
        new FileInfo("footstepsSFX.mp3", "assets/audio/footstepsSFX.mp3", "audio"),
        new FileInfo("maybeLevelTheme.mp3", "assets/audio/maybeLevelTheme.mp3", "audio"),
        new FileInfo("menuTheme.mp3", "assets/audio/menuTheme.mp3", "audio")
    ])

    assets.loadAll();
    // Game.Input.entityUnderControl;
}

window.onload = init;