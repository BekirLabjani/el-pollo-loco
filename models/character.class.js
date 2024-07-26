class Character extends MoveObject {

    x = 0;
    y = 260;
    width = 180;
    height = 380;
    walkSpeed = 20;
    timePassed = 0;
    world;
    offset = {
        top: 150,
        bottom: 5,
        left: 5,
        right: 5,
    }
    Img_Idle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]
    Img_Long_Idle = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]
    Img_Walk = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]
    Img_Jump = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]
    Img_Dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]
    Img_Injured = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]
    walk_Sound = new Audio("mp3/walk.mp3");
    snoring_Sound = new Audio("mp3/snoring.mp3");

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.Img_Idle);
        this.loadImages(this.Img_Long_Idle);
        this.loadImages(this.Img_Walk);
        this.loadImages(this.Img_Jump);
        this.loadImages(this.Img_Dead);
        this.loadImages(this.Img_Injured);
        this.applyGravity();
        this.timeSinceLastAction();
        this.animation();
    }
    /**
     * The animation of the character in different intervals
     */
    animation() {
        // Für die Bewegung 
        setInterval(() => {
            this.characterMove();
            this.updateCameraWorldX();
        }, 1000 / 30);

        setInterval(() => {
            this.characterAnimate();
        }, 1000 / 15);
    }

  
    /**
   * Handles character movement based on keyboard input, including walking and jumping, 
   * and manages the corresponding sound effects.
     */
    characterMove() {
        this.walk_Sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            if (!worldSound) {
                this.walk_Sound.play();
            }
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            if (!worldSound) {
                this.walk_Sound.play();
            }
        }
        if (this.world.keyboard.JUMP && !this.isAbouveGround()) {
            this.jumping();

        }
    }



    updateCameraWorldX() {
        this.world.camera_x = -this.x + 200;
    }

    /**
   * Animates the character based on its current state (dead, injured, jumping, idle, or walking)
   * and handles the transition to the game over state if the character is dead.
     */
    characterAnimate() {
        // für die Animation
        if (this.isDead()) {
            this.playAnimation(this.Img_Dead);
            setTimeout(() => {
                gameOver();
            }, 1000);
        } else if (this.isInjured()) {
            this.playAnimation(this.Img_Injured);
            this.setNewTimePassed();
        } else if (this.isAbouveGround()) {
            this.playAnimation(this.Img_Jump);
            this.setNewTimePassed();
        } else if (!this.world.keyboard.RIGHT || !this.world.keyboard.LEFT) {
            const timePassed = this.timeSinceLastAction();
            this.snoring_Sound.pause();
            this.pepeIdleORSleep(timePassed);
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.Img_Walk);
                this.setNewTimePassed();
            }
        }
    }

    /**
     * Move the Character right Side 
     *  and sets the direction to right
     */
    moveRight() {
        this.x += this.walkSpeed;
        this.otherDirection = false;
    }
    /**
     * Move the Character right Side 
     *  and sets the direction to left
     */
    moveLeft() {
        this.x -= this.walkSpeed;
        this.otherDirection = true;
    }

    /**
   * Updates the timePassed property with the current timestamp.
   */
    setNewTimePassed() {
        this.timePassed = new Date().getTime();
    }
    /**
 * Calculates the time in seconds since the last recorded action.
 *
 * @returns {number} The time in seconds since the last action.
 */
    timeSinceLastAction() {
        return (new Date().getTime() - this.timePassed) / 1000;
    }
/**
 * Plays the idle or sleep animation based on the time passed since the last action.
 *
 * @param {number} timePassed - The time in seconds since the last action.
 */
    pepeIdleORSleep(timePassed) {
        if (timePassed >= 7) {
            this.playAnimation(this.Img_Long_Idle);
            if (!worldSound) {
                this.snoring_Sound.play();
            }
        } else {
            this.playAnimation(this.Img_Idle);
        }
    }

}