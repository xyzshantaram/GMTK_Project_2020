class Entity {
    constructor(pos, type, sprite, width, height, color) {
        this.pos = pos || new Vector2(0, 0);
        this.vel = new Vector2(0, 0);
        /*         this.width = tileSize;
            this.height = tileSize; */
        this.type = type;
        this.spriteObject = sprite;
        this.width = width;
        this.collisionCount = 0;
        this.height = height;
        this.color = color;
    }

    draw() {
        Game.fillStyle = 'gray';
        if (this.spriteObject) 
            this.spriteObject.draw(this.pos);
         else {
            if (this.color)
                Game.ctx.fillStyle = this.color;
            Game.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        }
    }

    update() {
        if (["Player"].includes(this.type)) {
            this.vel = this.vel.add(Game.gravity);
            this.pos = this.pos.add(this.vel);

            if (this.vel.x > Game.friction) {
                this.vel.x -= Game.friction;
            } else if (this.vel.x<-Game.friction) {
                this.vel.x += Game.friction;
            }
            else {
                this.vel.x = 0;
            }

            this.vel.clamp(new Vector2(-Game.maxVel.x, Game.maxVel.x), new Vector2(-Game.maxVel.y, Game.maxVel.y));

            this.resolveCollisions();
        }
        if (["Enemy", "Player", "Block"].includes(this.type))
            this.pos.clamp(new Vector2(11, 1920), new Vector2(10, 1080));

        if (this.spriteObject && this.type === "Player") {
            if (this.vel.x> 0) {
                this.spriteObject.setPose('mc_runR');
            } else if (this.vel.x < 0) {
                this.spriteObject.setPose('mc_runL');
            }

            if (Math.abs(this.vel.y) > 0 && Math.round(this.vel.x) === 0) {
                this.spriteObject.setPose('mc_jump');
            }

            if (this.vel.approximateEquals(new Vector2(0, 0))) {
                this.spriteObject.setPose("mc_idle");
            }
        }

        if (this.trigger) {
            if(!checkRects(this, this.triggerParent)) {
                this.trigger = undefined;
            }
        }
        this.pos.x = Math.round(this.pos.x);
    }

    resolveCollision(x) {
        if (["platform"].includes(x.type) && ["Player"].includes(this.type)) {
            let dx,
                dy;
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
            } else {
                if (dx > 0) {
                    this.pos.x = x.pos.x + x.width;
                } else {
                    this.pos.x = x.pos.x - this.width;
                }
            }
        }

        if (["Player"].includes(this.type) && ["KTRIGGER"].includes(x.type)) {
            Game.Player.trigger = x.action;
            Game.Player.triggerParent = x;
        }
        
        if (["Player"].includes(this.type) && ["STRIGGER"].includes(x.type)) {
            x.action();
            x.done = true;
        }
    }

    resolveCollisions(x) {
        for (let x of Game.entities) {
            if (checkRects(this, x)) {
                if (this === x) {
                    continue;
                } else {
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
