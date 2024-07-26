class Endboss extends MoveObject {
    speedAngry = 2.5;
    speedNormal = 0.7;
    isDead = false;
    inDamage = false;
    isAlert = false;
    moveLeftAngry = false;
    aggressive = false;
    endbossImmune = false;
    energyEndboss = 100;
    otherDirection = false;
    endbossHit_sound = new Audio('mp3/chicken-noise-196746.mp3');
    alert_sound = new Audio('mp3\rooster-cry-173621.mp3');
    offset = {
        top: 50,
        bottom: 20,
        left: 10,
        right: 10
    }
    Endboss_Walk = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    Endboss_Alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    Endboss_Attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]
    Endboss_Hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]
    Endboss_Dead = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]
    height = 400;
    width = 280;
    y = 250;
    constructor() {
        super().loadImage(this.Endboss_Walk[0]);
        this.loadImages(this.Endboss_Walk);
        this.loadImages(this.Endboss_Alert);
        this.loadImages(this.Endboss_Attack);
        this.loadImages(this.Endboss_Hurt);
        this.loadImages(this.Endboss_Dead);
        this.moveLeftAngry = false;
        this.x = 4170;
        this.animation();
        this.activated = false;
    }

    /**
     * Initiates the endboss's damage state, making it temporarily vulnerable.
     * Resets the damage state after 400 milliseconds.
     */
    damageEndboss() {
        this.inDamage = true;
        setTimeout(() => {
            this.inDamage = false;
        }, 400);
    }

    /**
    * Reduces the energy level of the endboss when hit, adjusts speed, and handles effects.
    * Initiates a cooldown period for the endboss's immunity after taking damage.
    * If the endboss's energy drops to zero or below, triggers the 'bigChickenDead' method.
    */
    minusEnergyEndboss() {
        if (!this.endbossImmune) {
            this.endbossImmune = true;
            this.energyEndboss -= 20;
            this.speedNormal += 0.7;
            if (!worldSound) {
                this.endbossHit_sound.play();
            }
            if (this.energyEndboss <= 0) {
                this.energyEndboss = 0;
                this.bigChickenDead(); // Handle endboss death
            } else {
                this.lastHit = new Date().getTime();
            }

            setTimeout(() => {
                this.endbossImmune = false;
            }, 500);
        }

        this.angryEndboss();
    }

    /**
   * Handles the death state of the endboss.
   * Sets the endboss to dead if its energy level drops to zero or below.
   * Logs a message to indicate the endboss's death.
   */
    bigChickenDead() {
        if (this.energyEndboss <= 0) {
            this.isDead = true;
            console.log('Der Endboss ist tot.'); // Observe endboss death
        }
    }

    /**
     * Controls the endboss's angry state when its energy level drops below 40.
     * Adjusts movement behavior and state indicators temporarily.
     * Reverts to normal behavior after 400 milliseconds.
     */
    angryEndboss() {
        if (this.energyEndboss <= 40) {
            this.isAlert = true;
            this.moveLeftAngry = false;
            setTimeout(() => {
                this.isAlert = false;
                this.moveLeftAngry = true;
            }, 400);
        }
    }

    /**
    * Initiates animations for the endboss character.
    * Manages movements and current movement state.
    */
    animation() {
        this.movements();
        this.currentMovement();
    }

    /**
     * Controls the endboss's movement patterns based on its current state and world conditions.
     * Updates movement every 1/60th of a second (60 frames per second).
     */
    movements() {
        setInterval(() => {
            if (this.isAlert) {
                this.speedNormal = 0;
                return;
            }
            if (this.moveLeftAngry) {
                this.moveBossLeft();
            } else if (world && world.character.x > 3500) {
                this.characterHasPassed = true;
            }
            if (this.characterHasPassed) {
                this.moveNormalLeft();
            }
        }, 1000 / 60); // 60 frames per second
    }


    /**
     * Moves the endboss character to the left at an increased speed during its angry state.
     * Speed value affects the distance moved per animation frame.
     */
    moveBossLeft() {
        this.x -= this.speedAngry;
    }

    /**
     * Moves the endboss character to the left at a normal speed.
     * Speed value affects the distance moved per animation frame.
     */
    moveNormalLeft() {
        this.x -= this.speedNormal;
    }


    /**
     * Controls the current animation state of the endboss character.
     * Executes animation updates every 1/10th of a second (10 frames per second).
     */
    currentMovement() {
        setInterval(() => {
            this.statUpgrade();
        }, 1000 / 10); // 10 frames per second
    }

    /**
     * Updates the animation state of the endboss character based on its current conditions.
     * Plays appropriate animations for various states such as alert, damage, aggressive, and normal.
     */
    statUpgrade() {
        if (this.isDead) {
            this.theEndbossIsDead();
        } else if (this.isAlert) {
            this.playAnimation(this.Endboss_Alert);
        } else if (this.inDamage) {
            this.playAnimation(this.Endboss_Hurt);
        } else if (this.aggressive) {
            this.playAnimation(this.Endboss_Attack);
        } else {
            this.playAnimation(this.Endboss_Walk);
        }
    }

    /**
     * Handles the death animation and actions when the endboss character dies.
     * Plays the death animation and triggers the 'winner' function after a short delay.
     */
    theEndbossIsDead() {
        this.playAnimation(this.Endboss_Dead);
        setTimeout(() => {
            winner();
        }, 1000); // Delay before triggering winner function
    }

}   