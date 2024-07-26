class Keyboard {
    RIGHT = false;
    LEFT = false;
    JUMP = false;
    M = false; //Throw

    constructor() {
        this.keyCodePresses();
        this.touchButtons();
    }

    /**
     * Press keyBoard to move Character and trohwable Bottle
     */
    keyCodePresses() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 39 || e.keyCode == 68) { // A <-
                keyboard.RIGHT = true;
            }
            if (e.keyCode == 37 || e.keyCode == 65) { // D ->
                keyboard.LEFT = true;
            }
            if (e.keyCode == 38) {
                keyboard.UP = true;
            }
            if (e.keyCode == 40) {
                keyboard.DOWN = true;
            }
            if (e.keyCode == 32) {
                keyboard.JUMP = true; // space
            }
            if (e.keyCode == 77) {
                keyboard.M = true;// m
                console.log(keyboard.M);
            }
        })

        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 39 || e.keyCode == 68) {
                keyboard.RIGHT = false;
            }
            if (e.keyCode == 37 || e.keyCode == 65) {
                keyboard.LEFT = false;
            }
            if (e.keyCode == 38) {
                keyboard.UP = false;
            }
            if (e.keyCode == 40) {
                keyboard.DOWN = false;
            }
            if (e.keyCode == 32) {
                keyboard.JUMP = false;
            }
            if (e.keyCode == 77) {
                keyboard.M = false;
            }

        })
    }

    /**
     * touch funktion from Phone
     */
  touchButtons() {
    document.getElementById('btnRight').addEventListener('touchstart' ,(e) => {
         e.preventDefault();
         this.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend' ,(e) => {
         e.preventDefault();
         this.RIGHT = false;
    });
    document.getElementById('btnLeft').addEventListener('touchstart' ,(e) => {
         e.preventDefault();
         this.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend' ,(e) => {
         e.preventDefault();
         this.LEFT = false;
    });
    document.getElementById('btnJump').addEventListener('touchstart' ,(e) => {
         e.preventDefault();
         this.JUMP = true;
    });
    document.getElementById('btnJump').addEventListener('touchend' ,(e) => {
         e.preventDefault();
         this.JUMP = false;
    });
    document.getElementById('btnShot').addEventListener('touchstart' ,(e) => {
         e.preventDefault();
         this.M = true;
    });
    document.getElementById('btnShot').addEventListener('touchend' ,(e) => {
         e.preventDefault();
         this.M = false;
    });
  }
}