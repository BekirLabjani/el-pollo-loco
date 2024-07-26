class World {

    character = new Character();

    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    endboss = this.level.endboss;
    status = new Status();
    bottleBar = new BottleBar();
    endbossBar = new EndbossStatusBar();
    coinBar = new CoinBar();
    bottlesAmounts = []; // keine Flaschen gesammelt 
    coinsAmounts = [];
    throwableObjects = [];
    isDead = false;
    chickenDead_sound = new Audio('mp3/dead.mp3');
    coin_sound = new Audio('mp3/coin.mp3');
    bootleSound = new Audio('mp3/bottles.mp3');
    canThrowBottle = true; // Cooldown flag for throwing bottles

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.play();
    }
    /**
    * Sets the world reference for the character, allowing interaction with the game world.
    */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Initiates periodic checks for throwable objects and collisions within the game loop.
     */
    play() {
        setInterval(() => {
            this.checkThrowableObjects();
        }, 20);
        setInterval(() => {
            this.checkCollisions();
            this.checkEndbossGetHit();
        }, 1000 / 60);
    }
    /**
     * Checks if the character can throw a throwable object (energy bottle) and handles its creation and effects.
     */
    checkThrowableObjects() {
        if (this.character.energyBottle > 0 && this.keyboard.M && this.canThrowBottle) {
            this.character.setNewTimePassed();
            let bottle = new ThrowObject(this.character.x, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.minusAmountBottle();
            this.bottleBar.setPercentageBottle(this.character.energyBottle);

            // Set the flag to false and start a cooldown period
            this.canThrowBottle = false;
            setTimeout(() => {
                this.canThrowBottle = true;
            }, 300); // Adjust the cooldown period (in milliseconds) as needed
        }
    }

    /**
     * Checks various collisions in the game including enemy collisions, throwable object collisions,
     * coin collisions, endboss collisions, and collisions with the ground.
     */
    checkCollisions() {
        this.CheckEnemyCollisions();
        this.checkBottleCollisions();
        this.checkCoinsCollisions();
        this.checkedEndbossCollisions();
        this.collidesWithTheGround();
        this.throwableObjectHitChicken();
    }
    /**
     * Checks collisions between the character and enemies, triggering appropriate actions based on the collision type.
     */
    CheckEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy, index)) {
                if (this.character.isAbouveGround() && this.character.speedY <= 0) {
                    this.character.jumping();
                    this.handleJumpEnemyCollision(enemy, index);
                } else {
                    this.character.hit();
                    this.status.setPercentes(this.character.characterLife);
                }
            }
        });
    }
    /**
     * Handles the collision between the character and an enemy while jumping,
     * providing immunity to the character temporarily and removing the enemy from the game after a delay.
     *
     * @param {Enemy} enemy - The enemy object involved in the collision.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    handleJumpEnemyCollision(enemy) {
        console.log('Kollision mit Feind:', enemy);

        const enemyIndex = this.level.enemies.indexOf(enemy);
        if (enemyIndex !== -1 && !enemy.isDead) {
            enemy.isDead = true;
            this.character.immune = true;


            this.character.speedY = 30;

            setTimeout(() => {
                this.level.enemies.splice(enemyIndex, 1);
                this.character.immune = false;
                console.log('Feind entfernt, Charakter immun:', this.character.immune);
            }, 200);
        }
    }

    /**
    * Checks collisions between throwable objects (e.g., energy bottles) and enemies (chickens),
    * triggering appropriate actions such as enemy elimination and object animation.
    */
    throwableObjectHitChicken() {
        this.throwableObjects.forEach((throwableObject, throwableIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (throwableObject.isColliding(enemy)) {
                    if (!enemy.isDead) {
                        enemy.isDead = true;
                        setTimeout(() => {
                            if (!worldSound) {
                                this.chickenDead_sound.play();
                            }
                            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                        }, 300);
                    }
                    throwableObject.breakAndSplash();
                    this.throwableObjects.splice(throwableIndex, 1);
                }
            });
        });
    }
    /**
 * Checks collisions between the character and collectible bottles, allowing the character to collect and increase energy.
 */
    checkBottleCollisions() {
        this.level.collectibleBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.energyBottle < 100) {
                this.collectedBottles(bottle, index);
            }
        })
    }
    /**
 * Handles the collection of bottles by the character, increasing energy and updating related UI elements.
 *
 * @param {Bottle} bottle - The bottle object being collected.
 * @param {number} index - The index of the bottle in the collectibleBottles array.
 */
    collectedBottles(bottle, index) {
        this.character.addAmountBottle();
        this.bottlesAmounts.push({ bottle: bottle, index: index });
        if (!worldSound) {
            this.bootleSound.play();
        }
        this.level.collectibleBottles.splice(index, 1);
        this.bottleBar.setPercentageBottle(this.character.energyBottle);
    }
    /**
     * Checks collisions between the character and collectible coins, allowing the character to collect and increase coin count.
     */
    checkCoinsCollisions() {
        this.level.collectibleCoins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectedCoins(coin, index)
            }
        })
    }
    /**
     * Handles the collection of coins by the character, increasing coin count and updating related UI elements.
     *
     * @param {Coin} coin - The coin object being collected.
     * @param {number} index - The index of the coin in the collectibleCoins array.
     */
    collectedCoins(coin, index) {
        this.character.addAmountCoins();
        this.coinsAmounts.push({ coin: coin, index: index });
        if (!worldSound) {
            this.coin_sound.play();
        }
        this.level.collectibleCoins.splice(index, 1);
        this.coinBar.setPercentageCoin(this.character.coinEnergy);
    }
    /**
    * Checks collisions between the character and endboss enemies, triggering actions when a collision occurs.
    */

    checkedEndbossCollisions() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.bossHit();
                this.status.setPercentes(this.character.characterLife);
            }
        });
    }
    /**
     * Checks collisions between throwable objects and endboss enemies, triggering damage and removal actions.
     */

    checkEndbossGetHit() {
        this.throwableObjects.forEach((throwObject, throwIndex) => {
            this.level.endboss.forEach((endboss, endbossIndex) => {
                if (throwObject.isColliding(endboss)) {
                    this.endbossCollision(throwObject, endboss, throwIndex, endbossIndex);
                } else {
                }
            });
        });
    }
    /**
     * Handles the collision between a throwable object and an endboss enemy,
     * causing damage to the endboss, updating UI elements, and removing objects if necessary.
     *
     * @param {ThrowObject} throwObject - The throwable object involved in the collision.
     * @param {Endboss} endboss - The endboss enemy involved in the collision.
     * @param {number} throwIndex - The index of the throwable object in the throwableObjects array.
     * @param {number} endbossIndex - The index of the endboss enemy in the endboss array.
     */

    endbossCollision(throwObject, endboss, throwIndex, endbossIndex) {
        endboss.damageEndboss();
        if (!worldSound) {
            this.sound
        }
        endboss.minusEnergyEndboss();
        this.endbossBar.setPercentesBossBar(this.level.endboss[0].energyEndboss);
        throwObject.breakAndSplash();
        setTimeout(() => {
            this.throwableObjects.splice(throwIndex, 1);
        }, 100);
        if (endboss.isDead) {
            setTimeout(() => {
                this.level.endboss.splice(endbossIndex, 1);
            }, 500);
        }

    }
    /**
     * Checks if throwable objects (e.g., energy bottles) have collided with the ground,
     * triggering effects such as object animation and removal.
     */
    collidesWithTheGround() {
        this.throwableObjects.forEach((throwableObject, index) => {
            if (throwableObject.speedY < -38) {
                throwableObject.breakAndSplash();
                setTimeout(() => {
                    this.throwableObjects.splice(index, 1);
                }, 300);
            }
        });

    }
    /**
     * Draws all game elements on the canvas, including backgrounds, objects, characters, enemies, and UI elements.
     * Utilizes canvas translation and flipping for proper rendering.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addingObjectsToMap(this.level.backgounds);
        this.addingObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.status);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);

        this.addingObjectsToMap(this.level.collectibleBottles);
        this.addingObjectsToMap(this.level.collectibleCoins);
        this.addingObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.addingObjectsToMap(this.level.enemies);
        this.addingObjectsToMap(this.level.endboss);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    /**
     * Adds multiple objects to the rendering map for drawing on the canvas.
     *
     * @param {Array} objects - An array of objects to be added to the rendering map.
     */


    addingObjectsToMap(objects) {
        objects.forEach(element => {
            this.addToMap(element);
        });
    }
    /**
    * Adds a single movable object to the rendering map for drawing on the canvas,
    * handling flipping of images for objects facing the opposite direction.
    *
    * @param {MovableObject} MovObj - The movable object to be added to the rendering map.
    */
    addToMap(MovObj) {
        if (MovObj.otherDirection) {
            this.flipImage(MovObj);
        }

        MovObj.draw(this.ctx);
        MovObj.drawFrame(this.ctx);

        if (MovObj.otherDirection) {
            this.flipImageBack(MovObj);
        }
    }
    /**
     * Flips the image of a movable object horizontally for rendering purposes.
     *
     * @param {MovableObject} MovObj - The movable object whose image should be flipped.
     */
    flipImage(MovObj) {
        this.ctx.save();
        this.ctx.translate(MovObj.width, 0);
        this.ctx.scale(-1, 1);
        MovObj.x = MovObj.x * -1;
    }
    /**
     * Reverses the Horizontal Fliping
     *
     * @param {MovableObject} MovObj - The movable object whose image should be flipped.
     */
    flipImageBack(MovObj) {
        MovObj.x = MovObj.x * -1;
        this.ctx.restore();
    }



}