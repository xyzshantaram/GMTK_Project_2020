class Entity {
    constructor(pos, type, sprite) {
        this.pos = pos || new Vector2(0, 0);
        this.type = type;
    }
    draw() {
        Game.ctx.fillRect(0, 0, Game.tileSize, Game.tileSize);
    }
}