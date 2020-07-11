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
        if (!this.spriteObject)
            Game.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
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
    }

    resolveCollision(x) {
        let dx, dy;
        dx = Math.abs(deltaX(x, this));
        dy = Math.abs(deltaY(x, this));

        if (dy > 0) {
            this.vel.y = 0;
            this.pos.y = x.pos.y - this.height;
        }

        if (dy < 0) {
            this.vel.y = -this.vel.y;
            this.pos.y = x.pos.y;
        }

        if (x.type === "platform") {
            this.vel.y = 0;
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
                    this.collisionCount += 1;
                }
            }
        }
    }
}