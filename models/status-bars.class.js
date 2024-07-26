class Status extends FixDradObjects {

    Status_Images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ]

    percentes = 100;

    width = 200;
    height = 80;
    constructor() {
        super();
        this.loadImages(this.Status_Images);
        this.x = 200;
        this.y = 0;
        this.setPercentes(100);
    }
    /**
     * Sets the percentage value for a status indicator and updates the displayed image accordingly.
     *
     * @param {number} percentes - The percentage value to set for the status indicator.
     */
    setPercentes(percentes) {
        this.percentes = percentes;
        let imagePath = this.Status_Images[this.resolveImagesIndex()];
        this.img = this.imageCache[imagePath];
    }




    /**
     * Resolves and returns the index of the status image based on the current percentage value.
     * Determines the appropriate image based on predefined percentage ranges.
     *
     * @returns {number} The index of the status image in the image array based on the current percentage.
     */
    resolveImagesIndex() {
        if (this.percentes === 100) {
            return 5;
        } else if (this.percentes > 80) {
            return 4;
        } else if (this.percentes > 60) {
            return 3;
        } else if (this.percentes > 40) {
            return 2;
        } else if (this.percentes > 20) {
            return 1;
        } else {
            return 0;
        }
    }


}

class BottleBar extends FixDradObjects {
    Bottle_Images = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];
    percentBottle = 0;
    width = 200;
    height = 80;
    constructor() {
        super();
        this.loadImages(this.Bottle_Images);
        this.x = 0;
        this.y = 0;
        this.setPercentageBottle(0);
    }

    /**
    * Sets the percentage value for the energy bottle indicator and updates the displayed image accordingly.
    *
    * @param {number} percentBottle - The percentage value to set for the energy bottle indicator.
    */
    setPercentageBottle(percentBottle) {
        this.percentBottle = percentBottle;
        let path = this.Bottle_Images[this.resolveImageIndexBottle()];
        this.img = this.imageCache[path];
    }


    /**
     * Resolves and returns the index of the energy bottle image based on the current percentage value.
     * Determines the appropriate image based on predefined percentage ranges.
     *
     * @returns {number} The index of the energy bottle image in the image array based on the current percentage.
     */
    resolveImageIndexBottle() {
        if (this.percentBottle === 0) {
            return 0;
        } else if (this.percentBottle <= 20) {
            return 1;
        } else if (this.percentBottle <= 40) {
            return 2;
        } else if (this.percentBottle <= 60) {
            return 3;
        } else if (this.percentBottle <= 80) {
            return 4;
        } else {
            return 5;
        }
    }

}

class CoinBar extends FixDradObjects {

    Coin_Images = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];
    percentCoin = 0;
    width = 200;
    height = 80;
    constructor() {
        super();
        this.loadImages(this.Coin_Images);
        this.x = 400;
        this.y = 0;
        this.setPercentageCoin(0);
    }
    /**
     * Sets the percentage value for the status bar and updates the displayed image accordingly.
     *
     * @param {number} percentCoin - The percentage value to set for the status bar.
     */
    setPercentageCoin(percentCoin) {
        this.percentCoin = percentCoin;
        let imagePath = this.Coin_Images[this.resolveImagesCoin()];
        this.img = this.imageCache[imagePath];
    }


    /**
     * Resolves and returns the index of the status image based on the current percentage value.
     * Determines the appropriate image based on predefined percentage ranges.
     *
     * @returns {number} The index of the status image in the image array based on the current percentage.
     */
    resolveImagesCoin() {
            if (this.percentCoin === 0) {
                return 0;
            } else if (this.percentCoin <= 20) {
                return 1;
            } else if (this.percentCoin <= 40) {
                return 2;
            } else if (this.percentCoin <= 60) {
                return 3;
            } else if (this.percentCoin <= 80) {
                return 4;
            } else {
                return 5;
            }
        }

}

class EndbossStatusBar extends FixDradObjects {

    Status_Images = [
        './img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        './img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ]

    percentesBoss = 100;

    width = 200;
    height = 80;
    constructor() {
        super();
        this.loadImages(this.Status_Images);
        this.x = 1000;
        this.y = 0;
        this.setPercentesBossBar(100);
    }

    /**
     * Sets the percentesBoss value for the status bar and updates the displayed image accordingly.
     *
     * @param {number} percentesBoss - The percentesBoss value to set for the status bar from Endboss.
     */
    setPercentesBossBar(percentesBoss) {
        this.percentesBoss = percentesBoss;
        let imagePath = this.Status_Images[this.resolveImagesIndex()]
        this.img = this.imageCache[imagePath];

    }

    /**
     * Resolves and returns the index of the status image based on the current percentesBoss value.
     * Determines the appropriate image based on predefined percentesBoss ranges.
     *
     * @returns {number} The index of the status image in the image array based on the current percentesBoss.
     */

    resolveImagesIndex() {
        if (this.percentesBoss == 100) {
            return 5;
        } else if (this.percentesBoss > 80) {
            return 4;
        } else if (this.percentesBoss > 60) {
            return 3;
        } else if (this.percentesBoss > 40) {
            return 2;
        } else if (this.percentesBoss > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}