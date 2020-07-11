const gravity = 0.5;

class Entity {
    constructor(pos, type, sprite) {
        this.pos = pos || new Vector2(0, 0);
        this.vel = new Vector2(0, 0);
        this.type = type;
        this.spriteObject = sprite;
    }

    draw() {
        Game.ctx.fillRect(this.pos.x, this.pos.y, Game.tileSize, Game.tileSize);
    }

    update() {
        this.pos = this.pos.add(this.vel);
    }
}