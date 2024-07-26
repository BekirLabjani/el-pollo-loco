let canvas; // Der Zeichenbereich
let world; // die HauptClass
let keyboard = new Keyboard(); // die Tastatur
let backgroundMusic = new Audio('mp3/Jumping Through Worlds.mp3');
let backgroundSound = true;
let volume = 0.5;
let intervalIds = [];
let worldSound = false;
backgroundMusic.loop = true;
backgroundMusic.volume = volume;
playBackgroundMusic();


/**
 * Startet das Spiel, indem der Startbildschirm ausgeblendet wird,
 * Level eins geladen wird, die Spielwelt initialisiert wird und die Hintergrundmusik abgespielt wird.
 */
async function startGame() {
    document.getElementById('startScreen').classList.add('dNone');
    loadLevelOne();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('gameOverScreen').classList.add('dNone');
    document.getElementById('canvas').classList.remove('dNone');
    playBackgroundMusic();
}

/**
 * Öffnet die Einstellungen, indem der Startbildschirm ausgeblendet und das Einstellungsmenü angezeigt wird.
 */
function settings() {
    document.getElementById('startScreen').classList.add('dNone');
    document.getElementById('settingScreen').classList.remove('dNone');
}

/**
 * Geht zum Startbildschirm zurück, indem das Einstellungsmenü ausgeblendet wird.
 */
function home() {
    document.getElementById('startScreen').classList.remove('dNone');
    document.getElementById('settingScreen').classList.add('dNone');
}

/**
 * Spielt die Hintergrundmusik ab oder pausiert sie, abhängig vom aktuellen Status der Hintergrundmusik.
 */
function playBackgroundMusic() {
    if (backgroundSound) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
}

/**
 * Aktualisiert den Stummschaltungsstatus der Spiel- und Hintergrundmusik.
 * Spielt die Hintergrundmusik ab oder pausiert sie entsprechend des aktuellen Stummschaltungsstatus.
 * Aktualisiert auch das Icon für die Stummschaltung basierend auf dem aktuellen Status der Hintergrundmusik.
 */
function mute() {
    worldSound = !worldSound; // Umschalten der Spieltöne
    backgroundSound = !backgroundSound; // Umschalten der Hintergrundmusik
    playBackgroundMusic();
    muteImgUpdate();
}

/**
 * Aktualisiert das Icon für die Stummschaltung basierend auf dem aktuellen Status der Hintergrundmusik.
 */
function muteImgUpdate() {
    let muteIcon = document.getElementById('mute').querySelector('ion-icon');
    if (backgroundSound) {
        muteIcon.setAttribute('name', 'volume-high-outline');
    } else {
        muteIcon.setAttribute('name', 'volume-mute-outline');
    }
}

/**
 * Zeigt das Game-Over-Bildschirm-Overlay an, versteckt das Spielfeld und stoppt das Spiel.
 * Pausiert auch die Hintergrundmusik.
 */
function gameOver() {
    document.getElementById('gameOverScreen').classList.remove('dNone');
    document.getElementById('canvas').classList.add('dNone');
    stopGame();
    backgroundMusic.pause();
}

/**
 * Zeigt das Gewinner-Bildschirm-Overlay an, versteckt das Spielfeld und stoppt das Spiel.
 * Pausiert auch die Hintergrundmusik.
 */
function winner() {
    document.getElementById('winnerOverScreen').classList.remove('dNone');
    document.getElementById('canvas').classList.add('dNone');
    stopGame();
    backgroundMusic.pause();
}

/**
 * Startet das Spiel neu, indem eine neue Spielwelt initialisiert wird und die notwendigen Elemente angezeigt werden.
 */
function restartGame() {
    world = new World(canvas, keyboard);
    document.getElementById("gameOverScreen").classList.add('d-none');
    document.getElementById("winnerOverScreen").classList.add('d-none');
    document.getElementById("canvas").classList.remove('d-none');
    document.getElementById('startScreen').classList.add('dNone');
    startGame();
}

function restartGameFromWinn() {
    world = new World(canvas, keyboard);
    document.getElementById("gameOverScreen").classList.add('d-none');
    document.getElementById("winnerOverScreen").classList.add('d-none');
    document.getElementById("canvas").classList.remove('d-none');
    document.getElementById('startScreen').classList.add('dNone');
    startGame();
}
/**
 * Stoppt das Spiel, indem alle laufenden Intervalle gelöscht werden.
 */
function stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Erstellt ein stoppbares Intervall, das die übergebene Funktion in der angegebenen Zeit ausführt.
 * Fügt die ID des Intervalls der `intervalIds`-Liste hinzu.
 * @param {function} fn - Die Funktion, die ausgeführt werden soll.
 * @param {number} time - Die Zeit in Millisekunden, nach der die Funktion wiederholt ausgeführt wird.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Öffnet den Canvas im Vollbildmodus, wenn der Browser es unterstützt.
 */
const elem = document.getElementById('fullScreenCanvas');
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/**
 * Verlässt den Vollbildmodus, wenn der Canvas im Vollbildmodus ist.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}




