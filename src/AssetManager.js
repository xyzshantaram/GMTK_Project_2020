class AssetManager {
    constructor(callback) {
        this.queue = [];
        this.successCount = 0;
        this.results = {};
        this.callback = callback;
    }

    loadAll() {
        let that = this;
        that.numFiles = that.queue.length;
        for (let x of this.queue) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", x.url);
            xhr.responseType = (x.type === "img") ? "blob" : ((x.type === "audio") ? "arraybuffer" : "text");
            xhr.send();
            xhr.onload = function () {
                if (this.responseType === "blob") {
                    createImageBitmap(xhr.response).then(
                        function(result) {
                            that.results[x.name] = result;
                        }
                    ).catch(function(err) {
                        alert("An error occurred. Please reload. It'll work eventually, promise!")
                    })
                }
                else {
                    that.results[x.name] = xhr.response;
                }
                that.successCount++;
                that.queue.remove(x);
                if (that.isDone()) {
                    that.callback();
                    console.log('called')
                }
            }
        }
    }

    queueItems(arr) { // array of file objects
        for (let x of arr) {
            if (!this.queue.includes(x)) 
                this.queue.push(x);
        }
    }

    isDone() {
        return(this.numFiles == this.successCount);
    }

    getAsset(name) {
        return this.results[name]
    }
}

class FileInfo {
    constructor(name, url, type) {
        this.name = name;
        this.url = url;
        this.type = type;
    }
}