function draw() {
    Game.ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (!Game.isPaused()) {
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.ctx.scale(Game.canvasScale.x, Game.canvasScale.y);
        Game.Input.handler();
        
        Game.mainCamera.focus();
        Game.mainCamera.update();

        Game.ctx.fillStyle = '#007cdf';
        Game.ctx.drawImage(Game.BG, 0, 0);

        Game.ctx.fillStyle = 'green';
        for (let x of Game.entities) {
            x.update();
            x.draw();
        }
    }
    window.requestAnimationFrame(draw);
}

let collisionCount = 0;
jumping = false;