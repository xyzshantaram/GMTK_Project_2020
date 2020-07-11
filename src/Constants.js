let Game = {
    tileSize: 32,
    canvas: {},
    ctx: {},
    Input: {},
    Config: {},
    canvasScale: {
        x: 1,
        y: 1
    },
    UI: {}, 
    Player: {},
    Scene: {

    },
    entities: [],
    jumpVel: 10,
    moveVel: 0.5,
    friction: 0.2
};

let mouse = {
    x: 0,
    y: 0,
};


Game.gravity = {
    x: 0,
    y: 0.5
}
Game.maxVel = {
    x: 4,
    y: 10
};