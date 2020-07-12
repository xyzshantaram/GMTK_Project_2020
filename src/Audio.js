class Audio {
    static playMusicFile (filename) {
        if (this.musicPlaying) {
            this.musicPlaying = false;
            this.currentSourceNode.stop();
        }
        let src = Game.audioCtx.createBufferSource();
        src.buffer = assets.getAsset(filename);
        src.connect(Game.audioCtx.destination);
        src.loop = true;
        src.start();
        this.currentSourceNode = src;
        this.musicPlaying = true;
    }
    static playSFX(filename) {
        let src = Game.audioCtx.createBufferSource();
        src.buffer = assets.getAsset(filename);
        src.connect(Game.audioCtx.destination);
        src.loop = false;
        src.start();
    }

    static changeVolumeBy(s) {
        let gainNode = Game.audioCtx.createGain();
        this.currentSourceNode.connect(gainNode).connect(Game.audioCtx.destination);
        gainNode.gain.value = s;
    }

    static stopMusic() {
        this.currentSourceNode.stop();
    }

    static pause() {
        Game.audioCtx.suspend().then(() => console.log("AudioContext suspended"));
    }

    static play() {
        Game.audioCtx.resume().then(() => console.log("AudioContext resumed"));
    }
}