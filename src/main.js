function draw() {
    if (!Game.isPaused()) {
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.ctx.fillCircle(mouse, 10, 'green');
    }
    window.requestAnimationFrame(draw);
}

class Camera {
    constructor(pos) {
        this.pos = pos;
    }
}