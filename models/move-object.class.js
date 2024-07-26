class MoveObject extends FixDradObjects {

    otherDirection = false;
    speedY = 0;
    acceleration = 2;  // beschleunigung = 1 ;´
    characterLife = 100;
    coinEnergy = 0;
    energyBottle = 0;
    lastHit = 0;
    bosLife = 100;
    jump_Sound = new Audio('mp3/jump.mp3');
    hurt_sound = new Audio('mp3/hurt.mp3');

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    immune = false;
    // isDead = false;
    /**
     * Plays an animation sequence by cycling through the provided images array.
     *
     * @param {string[]} images - Array of image paths representing frames of the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    applyGravity() {
        setInterval(() => {
            if (this.isAbouveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                
                if (this.y > 260) {
                    this.y = 260;
                    this.speedY = 0;
                }
            } else {
                this.y = 260;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }
    

      /**
     * Checks if the character or throwable object is above the ground level.
     * For throwable objects, always returns true.
     *
     * @returns {boolean} True if above ground, false otherwise.
     */
      isAbouveGround() {
        if (this instanceof ThrowObject) {
            return true;
        } else {
            return this.y < 260; 
        }
    }

    /**
     * Initiates the jumping action, playing jump sound if not muted and setting vertical speed.
     */
    jumping() {
        if (!worldSound) {
            this.jump_Sound.play();
        }
        this.speedY = 30;
    }
    /**
     * Checks if the character is dead based on its remaining life points.
     *
     * @returns {boolean} True if the character's life points are zero, otherwise false.
     */
    isDead() {
        return this.characterLife == 0;
    }
    /**
     * Applies gravity effect to the character or throwable object by decreasing vertical position.
     * Gravity effect is applied periodically.
     */

  


    /**
     * Checks collision between the character or throwable object and another movable object.
     *
     * @param {MovObj} MovObj - The movable object to check collision with.
     * @returns {boolean} True if collision occurs, otherwise false.
     */
    isColliding(MovObj) {
        return (
            this.x + this.width - this.offset.right > MovObj.x + MovObj.offset.left &&
            this.y + this.height - this.offset.bottom > MovObj.y + MovObj.offset.top &&
            this.x + this.offset.left < MovObj.x + MovObj.width - MovObj.offset.right &&
            this.y + this.offset.top < MovObj.y + MovObj.height - MovObj.offset.bottom
        );
    }

    /**
     * Handles the character getting hit by a boss, reducing its life points and applying immunity period.
     */
    bossHit() {
        if (!this.immune) {
            this.immune = true;
            this.characterLife -= 70;
            if (this.characterLife < 0) {
                this.characterLife = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
            setTimeout(() => {
                this.immune = false;
            }, 2000); // Immunity period duration
        }
    }

    /**
     * Handles the character getting hit by an enemy, reducing its life points and applying immunity period.
     */
    hit() {
        if (!this.immune) {
            this.immune = true;
            if (!worldSound) {
                this.hurt_sound.play();
            }
            this.characterLife -= 20;
            if (this.characterLife < 0) {
                this.characterLife = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
            setTimeout(() => {
                this.immune = false;
            }, 600); // Immunity period duration
        }
    }

    /**
     * Increases the energy bottle amount by 20 units, capping it at 100 units.
     */
    addAmountBottle() {
        this.energyBottle += 20;
        if (this.energyBottle > 100) {
            this.energyBottle = 100;
        }
    }

    /**
     * Decreases the energy bottle amount by 20 units, ensuring it does not drop below zero.
     */
    minusAmountBottle() {
        this.energyBottle -= 20;
        if (this.energyBottle < 0) {
            this.energyBottle = 0;
        }
    }

    /**
     * Increases the coin energy amount by 10 units, capping it at 100 units.
     */
    addAmountCoins() {
        this.coinEnergy += 20;
        if (this.coinEnergy > 100) {
            this.coinEnergy = 100;
        }
    }

    /**
     * Checks if the character is currently injured based on the time since the last hit.
     *
     * @returns {boolean} True if the character is injured (hit recently), otherwise false.
     */
    isInjured() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1; // Adjust the injury threshold as needed
    }

    



}