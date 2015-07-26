(function () {
    'use strict';

    // register view object
    var view = gameView(),
        // register models objects
        scoreMdl = scoreModel(),
        gameObjectsMdl = gameObjectsModel(),
        gameFieldView = view.fieldView(globals.gameWidth, globals.gameHeight, globals.gameBackground),
        gameControlView = view.controlsView(),
        gameObjects = [],
        gamePaused = false,
        gameRadarRay,
        gamePlayer;

    function clickEvent() {
        //alert('clicked!');
        //test lock:
        lockChecker();
    }

    function newGameEvent() {
        var player = prompt("Please enter your name", "name");
        gamePlayer = scoreMdl.player(player);
        initGameObjects();
    }

    function pauseResumeEvent() {
        gamePaused = !gamePaused;
    }

    function exitGameEvent() {
        initGame();
        gameRadarRay = undefined;
    }

    //implements successful lock
    function lockChecker(){
        //case 1: target angle is not yet locked:
        if(!gameRadarRay.target){
            gameObjects.forEach(function(obj){
                if(obj.isTarget){
                    if (gameRadarRay.angle < trigonometry.angleToTarget(gameRadarRay, obj ) + 3 && //TODO: deltas to be moved out + linking to real ray view
					   gameRadarRay.angle > trigonometry.angleToTarget(gameRadarRay, obj ) - 3){
                           gameRadarRay.target = obj;
                           console.log('locked');
                           return;
                       }

                }
            });
        }
        //case 2: target angle is locked. Attempt to lock on range
        else{
            if (gameRadarRay.range > trigonometry.distanceBetween(gameRadarRay, gameRadarRay.target) - gameRadarRay.target.size.width &&
		    gameRadarRay.range < trigonometry.distanceBetween(gameRadarRay, gameRadarRay.target) + gameRadarRay.target.size.width){
                // alert('Target locked');
                destroyTarget(gameRadarRay);
            } else {
                gameRadarRay.target = undefined;
                gameRadarRay.range = 6;
                console.log('MISS!');
            }
        }

    }

    function initGame() {
        gameObjects = [];
        var initText = gameObjectsMdl.landscapeItem(position(globals.gameWidth / 2, globals.gameHeight / 2),
            size(globals.gameWidth, 100),
            'images/new_game.png',
            0, //speed
            direction.left,
            0);
        gameObjects.push(initText);
    }

    function initGameObjects() {
        gameObjects = [];
        // background_tree
        var testTree = gameObjectsMdl.landscapeItem(position(globals.gameWidth / 2, globals.gameHeight - 120),
            size(100, 100),
            'images/tree.png',
            0, //speed
            direction.left,
            0);
        gameObjects.push(testTree);
        //Radar (unmovable, simple object)
        var testRadar = gameObjectsMdl.landscapeItem(position(60, globals.gameHeight - 60),
            size(100, 100),
            'images/radar.png',
            0, //speed
            direction.left,
            0);
        gameObjects.push(testRadar);

        // var testTarget = gameObjectsMdl.enemy(position(globals.gameWidth, globals.gameHeight / 3),
        //     size(100, 100),
        //     'images/spaceship.png',
        //     3.2, //speed
        //     direction.left,
        //     0);
        // gameObjects.push(testTarget);

        var testTarget2 = gameObjectsMdl.enemy(position(globals.gameWidth, globals.gameHeight / 2),
            size(100, 100),
            'images/spaceship.png',
            2, //speed
            direction.left,
            0);
        gameObjects.push(testTarget2);

        //Laser Ray (linked to the radar above)
        gameRadarRay = gameObjectsMdl.laserRay(45,
            0.2, //angle speed
            1, //angle direction
            88, //max angle
            2, //min angle
            3, //range speed
            testRadar);
    }

    // callbacks
    gameFieldView.registerClickCallback(clickEvent);
    gameControlView.registerNewGameCallback(newGameEvent);
    gameControlView.registerExitCallback(pauseResumeEvent);
    gameControlView.registerPauseGameCallback(exitGameEvent);

    function destroyTarget(ray){
        var index = gameObjects.indexOf(ray.target);
        gameObjects.splice(index, 1);
        ray.target = undefined;
        ray.range = 6;
        //new target to be randomized TODO:
        gameObjects.push(gameObjectsMdl.enemy(position(globals.gameWidth, globals.gameHeight / 2),
            size(100, 100),
            'images/spaceship.png',
            2, //speed
            direction.left,
            0));
    }

    // start animation with the objects defined above
    function animate(highResTimestamp) {
        requestAnimationFrame(animate);

        if (!gamePaused) {
            for (var i = 0; i < gameObjects.length; i++) {
                gameObjects[i].update();
                if (gameRadarRay) {
                    gameRadarRay.update();
                }
            }
            gameFieldView.resetView();
            if (gameRadarRay) {
                gameFieldView.draw(gameRadarRay);
            }
            gameFieldView.draw(gameObjects);
        }
    }

    // GAME START POINT
    initGame();

    // Start the animation.
    requestAnimationFrame(animate);
}());
