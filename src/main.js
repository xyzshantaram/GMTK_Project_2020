function draw() {

    Game.ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (!Game.isPaused()) {
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.ctx.scale(Game.canvasScale.x, Game.canvasScale.y);
        Game.Input.handler();

        Game.ctx.fillStyle = '#007cdf';
        Game.ctx.fillRect(0, 0, 1920, 1080);

        Game.ctx.fillStyle = 'green';
        Game.mainCamera.focus();
        Game.mainCamera.update();

        for (let x of Game.entities) {
            x.update();
            x.draw();
        }
    }
    window.requestAnimationFrame(draw);
}

let collisionCount = 0;
jumping = false;