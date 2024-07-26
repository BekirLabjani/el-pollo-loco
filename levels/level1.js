let level1;
function loadLevelOne() {
    level1 = new Level(
        [
            // Section 0
            new BackGround('img/5_background/layers/air.png', -1199),
            new BackGround('img/5_background/layers/3_third_layer/2.png', -1199),
            new BackGround('img/5_background/layers/2_second_layer/2.png', -1199),
            new BackGround('img/5_background/layers/1_first_layer/2.png', -1199),


            // Section 1
            new BackGround('img/5_background/layers/air.png', 0),
            new BackGround('img/5_background/layers/3_third_layer/1.png', 0),
            new BackGround('img/5_background/layers/2_second_layer/1.png', 0),
            new BackGround('img/5_background/layers/1_first_layer/1.png', 0),

            //  Section 2
            new BackGround('img/5_background/layers/air.png', 1199),
            new BackGround('img/5_background/layers/3_third_layer/2.png', 1199),
            new BackGround('img/5_background/layers/2_second_layer/2.png', 1199),
            new BackGround('img/5_background/layers/1_first_layer/2.png', 1199),

            // Section 3
            new BackGround('img/5_background/layers/air.png', 1199 * 2),
            new BackGround('img/5_background/layers/3_third_layer/1.png', 1199 * 2),
            new BackGround('img/5_background/layers/2_second_layer/1.png', 1199 * 2),
            new BackGround('img/5_background/layers/1_first_layer/1.png', 1199 * 2),

            // Section 4
            new BackGround('img/5_background/layers/air.png', 1199 * 3),
            new BackGround('img/5_background/layers/3_third_layer/2.png', 1199 * 3),
            new BackGround('img/5_background/layers/2_second_layer/2.png', 1199 * 3),
            new BackGround('img/5_background/layers/1_first_layer/2.png', 1199 * 3),

        ],
        [
            new Enemies(),
            new Enemies(),
            new Enemies(),
            new Enemies(),
            new Enemies(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),

        ],
        [
            new Endboss(),
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 200),
            new Cloud('img/5_background/layers/4_clouds/1.png', 600),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1600),

        ],

        [
            new CollectibleBottle(),
            new CollectibleBottle(),
            new CollectibleBottle(),
            new CollectibleBottle(),
            new CollectibleBottle(),
            new CollectibleBottle(),
            new CollectibleBottle(),
        ],
        [
            new CollectibleCoin(),
            new CollectibleCoin(),
            new CollectibleCoin(),
            new CollectibleCoin(),
            new CollectibleCoin(),
        ],
    );
}