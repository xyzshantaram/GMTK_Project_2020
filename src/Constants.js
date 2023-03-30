import { AnimatedSprite } from "./Sprite.js";
import { draw } from './main.js';

export const Game = {
    tileSize: 32,
    canvas: {},
    ctx: {},
    Input: {},
    Config: {},
    canvasScale: {
        x: 0.8,
        y: 0.8
    },
    UI: {},
    Player: {},
    Scene: {

    },
    entities: [],
    jumpVel: 8,
    moveVel: 0.5,
    friction: 0.2,
    gravity: {
        x: 0, y: 0.5
    },
    maxVel: {
        x: 4,
        y: 10
    },
    loadScene: function (assets, sceneName, callback) {
        Game.currentScene = JSON.parse(assets.getAsset(sceneName));
        Game.BG = (assets.getAsset(Game.currentScene.BG));
        Game.Player.spriteObject = new AnimatedSprite();
        Game.Player.spriteObject.load('mc');
        Game.setPause(false);
        window.requestAnimationFrame(draw);
        callback();
    }
};

export const mouse = {
    x: 0,
    y: 0,
};