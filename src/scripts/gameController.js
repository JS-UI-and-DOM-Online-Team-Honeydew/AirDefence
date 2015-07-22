(function () {
    'use strict';

    // register view object
    var view = gameView(),
        // register models objects
        scoreMdl = scoreModel(),
        gameObjectsMdl = gameObjectsModel(),
        gameMdl = gameModel(),
        gameFieldView = view.fieldView(globals.gameWidth, globals.gameHeight, globals.gameBackground),
        gameObjects = [];

    function clickEvent(x, y) {
        alert(x + ' ,' + y);
        // have click operations (or key press)
    }

    // function newGameEvent() {
    //     // new game button pressed
    // }
    //
    // function pauseResumeEvent() {
    //     // pause/resume button pressed
    // }
    //
    // function newPlayerEvent() {
    //     // new player button pressed
    // }

    // callbacks
    gameFieldView.registerClickCallback(clickEvent);

    // spaceship 1
    gameObjects.push(gameObjectsMdl.enemy(gameMdl.position(100, 100),
        gameMdl.size(100, 100),
        'images/spaceship.gif',
        2,
        gameMdl.position(1, 0),
        0));

    // spaceship 2
    gameObjects.push(gameObjectsMdl.enemy(gameMdl.position(100, 200),
        gameMdl.size(100, 100),
        'images/spaceship.gif',
        1,
        gameMdl.position(1, 1),
        0));

    // start animation with the objects defined above
    function animate(highResTimestamp) {
        requestAnimationFrame(animate);
        for (var i = 0; i < gameObjects.length; i++) {
            gameObjects[i].update();
        }
        gameFieldView.draw(gameObjects);
    }

    // Start the animation.
    requestAnimationFrame(animate);
}());
