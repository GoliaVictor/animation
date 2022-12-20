class Animation {
    constructor() {
        this.fps = 2;
        this.sequences = {};
        this.currentSeq = "none";
        this.frame = 0;
        this.frozen = true;

        this.lastUpdated = new Date();
    }

    // scale is {width?: n, height?: n}
    update(x, y, scale) {
        if (!this.frozen) {
            let now = new Date();

            if (now - this.lastUpdated > 1000/this.fps) {
                this.lastUpdated = now;
                this.frame++;
                if (this.frame >= this.sequences[this.currentSeq].length) this.frame = 0;
            }
            this.render(this.sequences[this.currentSeq][this.frame], x, y, scale)
        }
    }

    addSequence(name, path, start, end, extension="png") {
        this.sequences[name] = [];
        for (let i = start; i <= end; i++) {
            this.sequences[name].push(loadImage(`${path}/${name}${i}.${extension}`));
        }
    }

    removeSequence(name) {
        if (name == this.currentSeq) this.stop()
        delete this.sequences[name];
    }

    start(seqName) {
        this.stop();
        this.currentSeq = seqName;
        this.frozen = false;
    }

    restart() {
        this.frame = 0;
    }
    
    freeze() {
        this.frozen = true;
    }
    
    unfreeze() {
        this.frozen = false;
    }

    stop() {
        this.frozen = true;
        this.frame = 0;
        this.currentSeq = "none";
    }

    setFPS(newFPS) {
        this.fps = newFPS;
    }

    render(img, x, y, scale) {
        let width;
        let height;

        if (scale) {
            if (scale.width && scale.height) {
                width = scale.width;
                height = scale.height;
            }
            else if (scale.width && !scale.height) {
                width = scale.width;
                height = img.height/img.width*scale.width;
            }
            else if (scale.height && !scale.width) {
                height = scale.height;
                width = img.width/img.height*scale.height;
            }
        }
        else {
            width = img.width;
            height = img.height;
        }

        image(img, x, y, width, height);
    }
}
