class Enemies extends MoveObject {

    x = 400 + Math.random() * 3500;
    y = 540;

    width = 80;
    height = 80;
    chickenSpeed = 1;
    isDead = false;
    offset = {
        left: 5,
        top: 5,
        right: 5,
        bottom: 5,
    };
    Chicken_Walk = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]
    Chicken_Dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage(this.Chicken_Walk[0])
        this.loadImages(this.Chicken_Walk);
        this.loadImages(this.Chicken_Dead);
        this.randomPositionX();
        this.randomSpeedCicken();
        this.animation();
    }


    /**
     * Initiates animation for the chicken character, alternating between walking and death animations based on its state.
     * Executes animation at a rate of 15 frames per second.
     */
    animation() {
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.Chicken_Dead);
            } else {
                this.playAnimation(this.Chicken_Walk);
                this.chickenMoveLeft();
            }
        }, 1000 / 15); // 15 frames per second
    }

    /**
     * Sets a random speed value for the chicken character's movement.
     * Speed value ranges between 4 to 4.85 units.
     */
    randomSpeedCicken() {
        this.chickenSpeed = 4 + Math.random() * 0.85;
    }

    /**
     * Moves the chicken character to the left by an amount determined by its current speed.
     * Speed value affects the distance moved per animation frame.
     */
    chickenMoveLeft() {
        this.x -= this.chickenSpeed;
    }

    /**
     * Sets a random initial X position for the chicken character within a predefined range.
     * X position ranges between 700 to 4297 units.
     */
    randomPositionX() {
        this.x = 700 + Math.random() * 3597;
    }

}

class BabyChicken extends MoveObject {
    Images_Baby_Walk = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    Images_Baby_Dead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',

    ];
    babySpeed = 4;
    width = 80;
    height = 80;
    y = 550;
    x = 200;
    chickenSpeed = 1;
    isDead = false;
    offset = {
        left: 5,
        top: 5,
        right: 5,
        bottom: 5,
    };
    constructor() {
        super().loadImage(this.Images_Baby_Walk[0]);
        this.loadImages(this.Images_Baby_Walk);
        this.loadImages(this.Images_Baby_Dead);
        this.randomSpeedXFromBabyChicken();
        this.randomPositions();
        this.animation()
    }
    /**
     * Initiates animation for the baby chicken character, alternating between walking and death animations based on its state.
     * Executes animation at a rate of 15 frames per second.
     */
    animation() {
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.Images_Baby_Dead);
            } else {
                this.playAnimation(this.Images_Baby_Walk);
                this.moveSmalli(); // Method for moving the baby chicken
            }
        }, 1000 / 15); // 15 frames per second
    }

    /**
     * Sets a random speed value for the baby chicken character's horizontal movement.
     * Speed value ranges between 2 to 2.85 units.
     */
    randomSpeedXFromBabyChicken() {
        this.babySpeed = 2 + Math.random() * 0.85;
    }

    /**
     * Sets a random initial X position for the baby chicken character within a predefined range.
     * X position ranges between 700 to 4297 units.
     */
    randomPositions() {
        this.x = 700 + Math.random() * 3597;
    }

    /**
     * Moves the baby chicken character to the left based on its current speed.
     * Speed value affects the distance moved per animation frame.
     */
    moveSmalli() {
        this.x -= this.babySpeed;
    }


}