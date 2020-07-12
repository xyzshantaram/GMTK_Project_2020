Game.Input.handler = function() {
    if (Game.Input.isKeyDown(Game.Config.LEFT_KEY)) {
        Game.Player.vel.x += Game.moveVel;
    }
    if (Game.Input.isKeyDown(Game.Config.RIGHT_KEY)) {
        Game.Player.vel.x -= Game.moveVel;
    }
    if (Game.Input.isKeyDown(' ')) {
        if (!(Game.Player.collisionCount < 1))
        Game.Player.vel.y = -Game.jumpVel;
        Game.Player.collisionCount = 0;
    }
}

Game.Input.rightMouseClicked = false;

const MOUSE_VALUES = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
}

Game.Input.mouseUpHandler = function (e) {
    if (e.button === MOUSE_VALUES.RIGHT) {
        rightMouseClicked = false;
    }
}

Game.Input.mouseDownHandler = function(e) {
    Audio.playSFX('clickSFX.mp3')
    if (e.button === MOUSE_VALUES.RIGHT) {
        Game.Input.rightMouseClicked = true;
    }

    else if (e.button === MOUSE_VALUES.LEFT) {
        if (Game.Input.rightMouseClicked) {
            // handle left + right clicked at the same time
        }

        else {
            // handle left click
        }
    }
}

Game.Input.keyDownHandler = function (e) {
    window.pressedKeys[e.key] = true;
}

Game.Input.keyUpHandler = function (e) {
    window.pressedKeys[e.key] = false;
    if (e.key === 'e' && !Game.isPaused()) {
    }
    if (e.key === 'Escape') {
        Game.isPaused() ? Game.setPause(false) : Game.setPause(true);
    }
}

Game.Input.isKeyDown = function (k) {
    return window.pressedKeys[k];
}

