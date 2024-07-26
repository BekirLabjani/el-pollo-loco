class CollectibleBottle extends MoveObject {

    bottles_Images = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    x = 800 + Math.random() * 3000;
    y = 530 ;
    width = 80;
    height = 100;
    offset = {
        left: 40,
        top: 20,
        right: 40,
        bottom: 30,
    };
    constructor() {
        super().loadImage(this.bottles_Images[0]);
        this.loadImages(this.bottles_Images);
        this.animate();
    }
/**
* animte bottle for 2fps
 */
    animate() {
        setInterval(() => {
            this.playAnimation(this.bottles_Images);
        }, 1000 / 1);
    }
}
class CollectibleCoin extends MoveObject {
    
    height = 100;
    width = 100;
    offset = {
        left: 30,
        top: 30,
        right: 30,
        bottom: 30,
    };
    y = 100;
    imagesCoins = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
    ];
    constructor() {
    super().loadImage(this.imagesCoins[0]);
    this.loadImages(this.imagesCoins);
    this.x = 800 + Math.random() * 3000;
    this.y = 100 + Math.random() * 300;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
    }

/**
* animte Coins for 2fps
 */
animate() {
    setInterval(() => {
        this.playAnimation(this.imagesCoins);
    }, 1000 / 2);
}

}