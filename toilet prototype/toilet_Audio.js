class Audio {
    static playSFX(filename) {
        let src = audioCtx.createBufferSource();
        src.buffer = assets.getAsset(filename);
        src.connect(audioCtx.destination);
        src.loop = false;
        src.start();
    }

    static changeVolumeBy(s) {
        let gainNode = audioCtx.createGain();
        this.currentSourceNode.connect(gainNode).connect(audioCtx.destination);
        gainNode.gain.value = s;
    }
}