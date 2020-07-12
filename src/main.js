function draw() {
    Game.ctx.setTransform(2, 0, 0, 2, 0, 0);
    if (!Game.isPaused()) {
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.ctx.scale(Game.canvasScale.x, Game.canvasScale.y);
        Game.Input.handler();
        
        Game.mainCamera.focus();
        Game.mainCamera.update();
        Game.ctx.fillStyle = '#98a3af';
        Game.ctx.drawImage(Game.BG, 0, 0);

        for (let x of Game.entities) {
            x.update();
            x.draw();
        }
    }
    window.requestAnimationFrame(draw);
}

let collisionCount = 0;
jumping = false;