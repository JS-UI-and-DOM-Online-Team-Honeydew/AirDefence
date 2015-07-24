(function () {
    'use strict';

    // register view object
    var view = gameView(),
        // register models objects
        scoreMdl = scoreModel(),
        gameObjectsMdl = gameObjectsModel(),
        gameFieldView = view.fieldView(globals.gameWidth, globals.gameHeight, globals.gameBackground),
        gameControlView = view.controlsView(),
        gameObjects = [];

    function clickEvent() {
        alert('clicked!');        
    }

    function newGameEvent() {
        alert('New Game');
    }

    function pauseResumeEvent() {
        alert('Pause/Resume Game');
    }

    function exitGameEvent() {
        alert('Exit Game');
    }

    // callbacks
    gameFieldView.registerClickCallback(clickEvent);
    gameControlView.registerNewGameCallback(newGameEvent);
    gameControlView.registerExitCallback(pauseResumeEvent);
    gameControlView.registerPauseGameCallback(exitGameEvent);

    // spaceship 1
    gameObjects.push(gameObjectsMdl.enemy(position(100, 100),
        size(100, 100),
        images.spaceship(),
        2,
        direction.right,
        0));

    // spaceship 2
    gameObjects.push(gameObjectsMdl.enemy(position(100, 200),
        size(100, 100),
        images.spaceship(),
        1,
        direction.downRight,
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
