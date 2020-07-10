class AssetManager {
    constructor(callback) {
        this.queue = [];
        this.successCount = 0;
        this.results = {};
        this.callback;
    }

    loadAll() {
        that = this;
        for (let x of this.queue) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", x.url);
            xhr.responseType = (x.type === "img") ? blob : ((x.type === "audio") ? "arraybuffer" : "text");
            xhr.send();
            xhr.onload = function () {
                that.results[x.name] = xhr.response;
                that.successCount++;
                if (that.isDone()) {
                    that.callback();
                }
            }
        }
    }

    queueItems(arr) {
        for (let x of arr) {
            if (!this.queue.includes(url)) 
                this.queue.push(url);
        }
    }

    isDone() {
        return(this.queue.length == this.successCount);
    }
}

class File {
    constructor(name, url, type) {
        this.name = name;
        this.url = url;
        this.type = type;
    }
}