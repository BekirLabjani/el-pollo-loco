class Cloud extends MoveObject {
    x = 600 + Math.random() * 1000;
    y = 20;
    width = 400;
    height = 200;
    speed = 0.1;
    constructor(cloudPath, x) {
        super().loadImage(cloudPath);
        this.x = x + Math.random() * 1000;
        this.animation();
    }
    /**
     * Clouds Animation to 60 Fps for Smoth movable 
     */
    animation() {
        setInterval(() => {
            this.cloudsMove();
        }, 1000 / 60);
    }

    /**
     * Moves left x .
     */
    cloudsMove() {
        this.x -= this.speed;
    }


}

class BackGround extends MoveObject {

    height = 700;
    width = 1200;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 700 - this.height;
    }
}