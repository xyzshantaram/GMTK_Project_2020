Game.UI.setMaskOpacity = function(s) {
    Game.UI.mask.style.display = 'initial';
    
    Game.UI.mask.style.opacity = "" + s;
}

Game.UI.pauseHeading = "PAUSED";
Game.UI.pauseSubtext = "press Escape to resume";

Game.UI.setPaused = function() {
    Game.UI.setMaskOpacity(0.5);
    Game.UI.maskHeader.innerHTML = Game.UI.pauseHeading;
    Game.UI.maskSubtext.innerHTML = Game.UI.pauseSubtext;
}

Game.UI.setUnpaused = function() {
    Game.UI.hideMask();
    Game.UI.maskHeader.innerHTML = "";
    Game.UI.maskSubtext.innerHTML = "";
}

Game.UI.hideMask = function() {
    Game.UI.setMaskOpacity(0);
    Game.UI.maskHeader.innerHTML = "";
    Game.UI.maskSubtext.innerHTML = "";
    Game.UI.mask.style.display = 'none';
}

Game.UI.setMaskContents = function(opacity, heading, description) {
    Game.UI.setMaskOpacity(opacity);
    Game.UI.mask.style.display = 'initial';
    Game.UI.maskHeader.innerHTML = heading;
    Game.UI.maskSubtext.innerHTML = description;

}