class Camera {
    constructor(focusPoint, speed) {
        this.focusPoint = focusPoint || Game.Player;
        this.targetPos = new Vector2(0, 0)
        this.pos = new Vector2(0, 0);
        this.vWidth = Game.canvas.width / 2;
        this.vHeight = Game.canvas.height / 2;
        this.speed = speed || 10;
    }

    focus() {
            this.targetPos.x = this.vWidth - this.focusPoint.pos.x;
            this.targetPos.y = this.vHeight - this.focusPoint.pos.y;
            this.pos.round();
    }

    update() {
        this.pos.x += (this.targetPos.x - this.pos.x) / this.speed;
        this.pos.y += (this.targetPos.y - this.pos.y) / this.speed;
        Game.ctx.translate(this.pos.x, this.pos.y);
    }

    updateFocusPoint(newFocusPoint) {
        this.focusPoint = newFocusPoint || player;
    }
}