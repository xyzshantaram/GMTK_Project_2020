Game.loadScene = function(jsonStr, callback) {
    Game.currentScene = JSON.parse(jsonStr);
    Game.BG = (assets.getAsset(Game.currentScene.BG));
    window.requestAnimationFrame(draw);
    Game.Player.spriteObject = new AnimatedSprite();
    Game.Player.spriteObject.load('mc');
    callback();
}