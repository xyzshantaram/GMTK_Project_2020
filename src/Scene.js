Game.loadScene = function(jsonStr, callback) {
    Game.currentScene = JSON.parse(jsonStr);
    Game.BG = (assets.getAsset(Game.currentScene.BG));
    console.log(Game.currentScene);
    Game.UI.hideMask();
    callback();
}