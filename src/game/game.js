/**
 * Los diversos tipos de objetos.
 */
var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4,
    OBJECT_DEADZONE = 8;

var startGame = function() {
    Game.activateBoard(7);
};


var playGame = function() {
    GameManager.initialize();
};

window.addEventListener("load", function() {
    Game.initialize("game", sprites, startGame);
});