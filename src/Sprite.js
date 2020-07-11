class Sprite {
    constructor(img, width, height) {

    }
}

class AnimatedSprite {
    constructor(spriteArr) {
        this.counter = 0;
        this.arr = spriteArr;
    }

    next() {
        this.counter++;
        this.counter = this.counter % this.arr.len;
    }
}
