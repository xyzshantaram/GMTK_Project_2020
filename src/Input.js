Game.Input.handler = function() {
    if (window.pressedKeys.includes(Game.Config.LEFT_KEY)) {

    }
    if (window.pressedKeys.includes(Game.Config.RIGHT_KEY)) {

    }

    if (window.pressedKeys.includes(Game.Config.JUMP_KEY)) {

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

Game.Input.keyHandler = function () {

    if (Game.Input.isKeyDown('w')) {
        player.move(Game.Directions.UP, 0.5);
    }
    if (Game.Input.isKeyDown('a')) {
        player.move(Game.Directions.LEFT, 0.5);
    }
    if (Game.Input.isKeyDown('s')) {
        player.move(Game.Directions.DOWN, 0.5);
    }
    if (Game.Input.isKeyDown('d')) {
        player.move(Game.Directions.RIGHT, 0.5);
    }
}

Game.Input.isKeyDown = function (k) {
    return window.pressedKeys[k];
}

