import { Game } from './Constants.js';

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function distance(x1, x2, y1, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function vectorDistance(e1, e2) {
    const xDist = deltaX(e1, e2);
    const yDist = deltaY(e1, e2);

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function deltaX(e1, e2) {
    return e2.pos.x - e1.pos.x;
}

function deltaY(e1, e2) {
    return e2.pos.y - e1.pos.y;
}

export function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

function line(v1, v2, color, width) {
    Game.ctx.beginPath();
    if (color)
        Game.ctx.strokeStyle = color;
    if (width)
        Game.ctx.lineWidth = width;
    Game.ctx.moveTo(v1.x, v1.y);
    Game.ctx.lineTo(v2.x, v2.y);
    Game.ctx.stroke();
}

Array.prototype.remove = function (v) {
    if (this.indexOf(v) != -1) {
        this.splice(this.indexOf(v), 1);
        return true;
    }
    return false;
}

CanvasRenderingContext2D.prototype.fillCircle = function (center, radius, color) {
    this.beginPath();
    this.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    this.fillStyle = color || '#FFFFFF';
    this.fill();
}

CanvasRenderingContext2D.prototype.strokeCircle = function (center, radius, color, weight) {
    this.beginPath();
    this.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    this.strokeStyle = color || '#FFFFFF';
    this.lineWidth = weight;
    this.stroke();
}

export class Rectangle {
    constructor(pos, width, height) {
        this.pos = pos;
        this.width = width;
        this.height = height;
    }

    draw() {
        Game.ctx.beginPath();
        Game.ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
        Game.ctx.stroke();
    }
    draw(color) {
        Game.ctx.beginPath();
        Game.ctx.strokeStyle = color;
        Game.ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
        Game.ctx.stroke();
    }
}

Game.isPaused = function () {
    return Game.paused;
}

Game.setPause = function (bool) {
    Game.paused = bool;
    bool ? Game.UI.setPaused() : Game.UI.setUnpaused();
}

Game.blurHandler = function () {
    window.pressedKeys = [];
    Game.wasPausedBeforeBlur = Game.isPaused();
    Game.setPause(true);
}

Game.focusHandler = function () {
    if (Game.wasPausedBeforeBlur) {
        Game.setPause(true);
    }
    else {
        Game.setPause(false);
    }
}

Game.scaleCanvas = function () {
    Game.canvasScale.x = Game.canvas.width / document.body.clientWidth;
    Game.canvasScale.y = Game.canvas.height / document.body.clientHeight;

    Game.mainCamera.vWidth = (document.body.clientWidth / 2);
    Game.mainCamera.vHeight = (document.body.clientHeight / 2);
}

export function checkRects(rect1, rect2) {
    if (rect1.pos.x < rect2.pos.x + rect2.width &&
        rect1.pos.x + rect1.width > rect2.pos.x &&
        rect1.pos.y < rect2.pos.y + rect2.height &&
        rect1.pos.y + rect1.height > rect2.pos.y) {
        return true;
    }
    return false;
}