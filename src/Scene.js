Game.loadScene = function(jsonStr, callback) {
    Game.currentScene = JSON.parse(jsonStr);
    console.log(Game.currentScene);
    callback();
}