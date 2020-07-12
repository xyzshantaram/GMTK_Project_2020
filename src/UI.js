Game.UI.setMaskOpacity = function (s) {
    Game.UI.mask.style.display = 'initial';

    Game.UI.mask.style.opacity = "" + s;
}

Game.UI.pauseHeading = "PAUSED";
Game.UI.pauseSubtext = "press Escape to resume";

Game.UI.setPaused = function () {
    Game.UI.setMaskOpacity(0.5);
    Game.UI.maskHeader.innerHTML = Game.UI.pauseHeading;
    Game.UI.maskSubtext.innerHTML = Game.UI.pauseSubtext;
}

Game.UI.setUnpaused = function () {
    Game.UI.hideMask();
    Game.UI.maskHeader.innerHTML = "";
    Game.UI.maskSubtext.innerHTML = "";
}

Game.UI.hideMask = function () {
    Game.UI.setMaskOpacity(0);
    Game.UI.maskHeader.innerHTML = "";
    Game.UI.maskSubtext.innerHTML = "";
    Game.UI.mask.style.display = 'none';
}

Game.UI.setMaskContents = function (opacity, heading, description) {
    Game.UI.setMaskOpacity(opacity);
    Game.UI.mask.style.display = 'initial';
    Game.UI.maskHeader.innerHTML = heading;
    Game.UI.maskSubtext.innerHTML = description;
}

Game.UI.hideTextBox = function () {
    if (!Game.UI.textBox.hasMouseInside && !Game.Dialogue.dialogueActive) {
        Game.UI.textBox.style.display = 'none';
        return;
    }
    Game.UI.closeDialogue();
}

Game.UI.showTextBox = function () {
    Game.UI.textBox.style.display = 'unset';
}
Game.UI.setNPCName = function (s) {
    Game.UI.npcName.innerHTML = s;
}

Game.UI.setDialogueText = function (s) {
    Game.UI.dialogueBox.innerHTML = s;
}

Game.UI.openDialogue = Game.UI.showTextBox;

Game.UI.dialogueFadeTime = 3000;

Game.UI.closeDialogue = function () {
    setTimeout(Game.UI.hideTextBox, Game.UI.dialogueFadeTime);
}

Game.UI.healthBarDelta = 1.6;
Game.UI.healthBarIncrementTime = 1000;
Game.UI.healthBarTimeouts = []

Game.UI.setHealthBarPercentage = function (s) {
    s = Math.round(s);

    if (Game.UI.healthBarTimeouts !== []) {
        for (let x of Game.UI.healthBarTimeouts) {
            window.clearTimeout(x);
        }
    }
    widthVal = (Game.UI.healthBar.style.width !== "") ?
        parseFloat(Game.UI.healthBar.style.width.replace('%', '')) : 100;

    if (widthVal === s) {
        return;
    }

    // either add or subtract healthBarDelta depending on whether s is greater than or less than the current width
    Game.UI.healthBar.style.width = (widthVal + (Math.sign(s - widthVal) * Game.UI.healthBarDelta)) + '%';

    Game.UI.healthBarTimeouts.push(setTimeout(
        Game.UI.setHealthBarPercentage, Game.UI.healthBarIncrementTime, s));

    Game.UI.healthBar.style.background = `hsl(${s * 1.4}, 89%, 40%)`;
    Game.UI.healthText.innerHTML = 'fuel cell at ' + s + '%';
}

Game.UI.hideDialogueChoices = function () {
    Game.UI.btnWrapper.style.display = 'none';
}

Game.UI.showDialogueChoices = function () {
    Game.UI.btnWrapper.style.display = 'unset';
}