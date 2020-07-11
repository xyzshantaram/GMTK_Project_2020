class Entity {
    constructor(pos, type, sprite, width, height) {
        this.pos = pos || new Vector2(0, 0);
        this.vel = new Vector2(0, 0);
        /*         this.width = tileSize;
            this.height = tileSize; */
        this.type = type;
        this.spriteObject = sprite;
        this.width = width;
        this.collisionCount = 0;
        this.height = height;
    }

    draw() {
        Game.fillStyle = 'green';
        if (this.spriteObject)
            this.spriteObject.draw(this.pos);
        else Game.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    update() {
        if (["Enemy", "Player"].includes(this.type)) {
            this.vel = this.vel.add(Game.gravity);
            this.pos = this.pos.add(this.vel);

            if (this.vel.x > Game.friction) {
                this.vel.x -= Game.friction;
            }
            else if (this.vel.x < -Game.friction) {
                this.vel.x += Game.friction;
            }
            else {
                this.vel.x = 0;
            }

            this.vel.clamp(new Vector2(-Game.maxVel.x, Game.maxVel.x),
                new Vector2(-Game.maxVel.y, Game.maxVel.y));

            this.resolveCollisions();
        }
        if (["Enemy", "Player"].includes(this.type))
            this.pos.clamp(new Vector2(11, 1920), new Vector2(10, 1080));

        if (this.spriteObject && this.type === "Player") {
            if (this.vel.x > 0) {
                this.spriteObject.setPose('mc_runR');
            }
            else if (this.vel.x < 0) {
                this.spriteObject.setPose('mc_runL');
            }
            
            if (this.vel.y < 0) {
                this.spriteObject.setPose('mc_jump');
            }

            if (this.vel.approximateEquals(new Vector2(0, 0))) {
                this.spriteObject.setPose("mc_idle");
            }
        }
    }

    resolveCollision(x) {
        let dx, dy;
        dx = this.pos.x - x.pos.x;
        dy = this.pos.y - x.pos.y;

        if (dx > dy) {
            if (dy > 0) {
                this.vel.y = -this.vel.y;
                this.pos.y = x.pos.y + x.height;
            }
    
            if (dy < 0) {
                this.vel.y = 0;
                this.pos.y = x.pos.y - this.height;
            }
        }
        else {
            if (dx > 0) {
                this.pos.x = x.pos.x + x.width;
            }
            else {
                this.pos.x = x.pos.x - this.width;
            }
        }
    }

    resolveCollisions(x) {
        for (let x of Game.entities) {
            if (checkRects(this, x)) {
                if (this === x) {
                    continue;
                }
                else {
                    this.resolveCollision(x);
                    if (this.type === 'Player' && x.type === "platform") {
                        this.spriteObject.setPose('mc_idle');
                        this.collisionCount += 1;
                    }
                }
            }
        }
    }
}