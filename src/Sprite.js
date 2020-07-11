class Sprite {
    constructor(img, width, height) {

    }
}

class AnimatedSprite {
    constructor() {
        this.counter = 0;
        this.anims = {};
        this.spriteList = [];
        this.poseName = "";
    }

    setPose(poseName) {
        if (this.anims[this.poseName]) {
            this.spriteList = this.anims[poseName].list;
        }
        this.poseName = poseName;
    }

    draw(pos) {
        if (this.anims[this.poseName]) {
            let spritePos = this.spriteList[this.anims[this.poseName].count % this.spriteList.length];
            Game.ctx.drawImage(assets.getAsset(`ss_${this.spriteList.length}_${this.poseName}.png`),
                spritePos.x, spritePos.y,
                Game.tileSize, Game.tileSize, pos.x, pos.y, Game.tileSize, Game.tileSize
            );
            this.anims[this.poseName].count += 1;
        }
    }

    load(name) {
        for (let x of Object.keys(assets.results)) {
            if (x.includes(`${name}`)) {
                console.log('in')
                let counter = 0;
                let segments = x.split('_');
                let animName = `${segments[2]}_${segments[3]}`;
                animName = animName.split('.')[0];
                this.anims[animName] = { count: 0, list: [] };
                console.log(animName);
                for (let i = 0; i < assets.getAsset(x).width; i += Game.tileSize) {
                    for (let j = 0; j < assets.getAsset(x).height; j += Game.tileSize) {
                        if (counter < parseInt(segments[1]) && i < assets.getAsset(x).width && j < assets.getAsset(x).height) {
                            this.anims[animName].list.push(new Vector2(j, i));
                            counter++;
                        }

                    }
                }
            }
        }
    }
}