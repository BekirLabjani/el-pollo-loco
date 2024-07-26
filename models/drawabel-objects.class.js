class FixDradObjects {
    y = 200;
    x = 200;
    width = 180;
    height = 280;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Draws the object's image onto the canvas context at its current position.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        // if (this instanceof Character || this instanceof Enemies ||this instanceof BabyChicken|| this instanceof CollectibleCoin|| this instanceof CollectibleBottle || this instanceof Endboss || this instanceof ThrowObject) {
        //     ctx.beginPath();
        //     ctx.lineWidth = "5";
        //     ctx.strokeStyle = "blue";
        //     ctx.rect(this.x, this.y, this.width, this.height);
        //     ctx.stroke();
        //     if (this.offset) {
        //         ctx.beginPath();
        //         ctx.lineWidth = "1";
        //         ctx.strokeStyle = "red";
        //         ctx.rect(
        //             this.x + this.offset.left,
        //             this.y + this.offset.top,
        //             this.width - this.offset.left - this.offset.right,
        //             this.height - this.offset.top - this.offset.bottom
        //         );
        //         ctx.stroke();
        //     }

        // }


    }

    /**
    * Loads an image from the specified path and assigns it to the instance's img property.
    * @param {string} path - The path to the image file.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths and stores them in the image cache.
     * Each image is associated with its respective path in the image cache object.
     * @param {string[]} images - An array of paths to the image files.
     */
    loadImages(images) {
        images.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}