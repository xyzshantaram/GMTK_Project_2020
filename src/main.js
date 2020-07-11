function draw() {
    if (!Game.isPaused()) {
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.ctx.scale(Game.canvasScale.x, Game.canvasScale.y);

        for (let x of Game.Scene.entities) {
            x.update();
            x.draw();
        }
    }
    Game.ctx.setTransform(1, 0, 0, 1, 0, 0);
    window.requestAnimationFrame(draw);
}