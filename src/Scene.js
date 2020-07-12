Game.loadScene = function(jsonStr, callback) {
    Game.currentScene = JSON.parse(jsonStr);
    Game.BG = (assets.getAsset(Game.currentScene.BG));
    Game.Player.spriteObject = new AnimatedSprite();
    Game.Player.spriteObject.load('mc');
    Game.setPause(false);
    window.requestAnimationFrame(draw);
    callback();
}