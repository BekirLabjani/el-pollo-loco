class ThrowObject extends MoveObject {
    throwImage = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    ];
    bootelRotationImages = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    bottlesSplash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    flytheBottle = false;
    bottleSplash = false;
    broken = false;
    width = 80;
    height = 100;
    offset = {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
    };
    constructor(x, y) {
        super();
        this.loadImage(this.throwImage);
        this.loadImages(this.bootelRotationImages);
        this.loadImages(this.bottlesSplash);
        this.throw();
        this.x = x;
        this.y = y;
        this.animate();
    }
    /**
     * Initiates the throwing action of a throwable object (e.g., energy bottle),
     * setting its initial vertical speed, enabling flight, applying gravity, and moving horizontally.
     */
    throw() {
        this.speedY = 30; // Initial vertical speed of the throwable object
        this.flytheBottle = true; // Indicates the object is in flight
        this.applyGravity(); // Applies gravity effect to the object
        setInterval(() => {
            this.x += 10; // Moves the object horizontally
        }, 1000 / 60); // Updates the horizontal position 60 times per second
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAbouveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

            }
        }, 1000 / 25);
    }
    /**
     * Initiates animation for the throwable object, showing rotating images while the object is in flight.
     */

    animate() {
        setInterval(() => {
            if (this.flytheBottle) {
                this.playAnimation(this.bootelRotationImages); // Plays animation frames for the rotating bottle
            }
        }, 1000 / 10); // Updates animation 10 times per second
    }
    /**
     * Initiates the breaking and splashing animation effect for the throwable object,
     * playing the splash animation once and fading out the object afterward.
     */

    breakAndSplash() {
        if (!this.broken) {
            this.flytheBottle = true; // Indicates the object is still in flight during animation
            this.broken = true; // Marks the object as broken

            setInterval(() => {
               
            }, 1000 / 1); // Plays splash animation frames once per second

            this.speedY = 0; // Stops vertical movement
            this.speedX = 0; // Stops horizontal movement
        }
    }

}
