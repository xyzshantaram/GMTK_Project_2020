import { Game } from './Constants.js';

export function draw() {
    Game.ctx.setTransform(2, 0, 0, 2, 0, 0);
    if (!Game.isPaused()) {
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.ctx.scale(Game.canvasScale.x, Game.canvasScale.y);

        if (Game.BG) Game.ctx.drawImage(Game.BG, 0, 0);

        Game.mainCamera.focus();
        Game.mainCamera.update();
        Game.ctx.fillStyle = 'limegreen';
        Game.ctx.font = '15px Monospace';
        Game.ctx.fillText("Welcome. This is incomplete, but playable.", 100, 360);
        Game.ctx.fillText("This is a toilet.", 470, 550);
        Game.ctx.fillText("You can climb", 80, 550);
        Game.ctx.fillText("blue walls", 80, 570);
        Game.ctx.fillStyle = '#98a3af';

        for (let x of Game.entities) {
            x.update();
            x.draw();
        }

        Game.Input.handler();
    }
    window.requestAnimationFrame(draw);
}

let collisionCount = 0;
const jumping = false;