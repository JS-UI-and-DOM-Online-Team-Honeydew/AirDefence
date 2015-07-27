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
        bomb,
        gamePlayer,
        gameScoreBoard = scoreMdl.scoreBoard().init();

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

    function showScoreBoardEvent(){
        scoreMdl.scoreBoard().save(gamePlayer);
        gameFieldView.resetView();
        view.playersView(scoreMdl.scoreBoard().getTopPlayers());
        isScoreBoardShown = true;
    }

    function hideScoreBoardEvent(){
        isScoreBoardShown = false;
    }

    function exitGameEvent() {
        //view.playersView(scoreMdl.getTopPlayers);
        //initGame();
        gameRadarRay = undefined;
    }

    function gameOverCheck(){
        gameObjects.forEach(function(obj){
            if(obj.isTarget && gameRadarRay){
                if(obj.position.x < gameRadarRay.position.x){
                    // alert('Game over!');
                    
                    bomb = gameObjectsMdl.aeroBomb(position(obj.position.x, obj.position.y),
                        size(30, 20),
                        imgResources.bomb,
                        configuration.targetSpeed.value, //speed
                        direction.down,
                        0,
                        gameRadarRay);
                    gameObjects.push(bomb);
                    gameRadarRay = undefined;
                }
            }
        });
    }
    
    function radarExplosion(){
        alert('boom');
    }
    
    //implements successful lock
    function lockChecker(){        
        //case 1: target angle is not yet locked:
        if(!gameRadarRay.target){
            gameObjects.forEach(function(obj){
                if(obj.isTarget){
                    if (gameRadarRay.angle < trigonometry.angleToTarget(gameRadarRay, obj ) + (configuration.rayWidth.value / 2) && //TODO: deltas to be moved out + linking to real ray view
					   gameRadarRay.angle > trigonometry.angleToTarget(gameRadarRay, obj ) - (configuration.rayWidth.value / 2)){
                           gameRadarRay.target = obj;
                           return;
                       }

                }
            });
        }
        //case 2: target angle is locked. Attempt to lock on range
        else{
            if (gameRadarRay.range > trigonometry.distanceBetween(gameRadarRay, gameRadarRay.target) - (gameRadarRay.target.size.width / 2) &&
		    gameRadarRay.range < trigonometry.distanceBetween(gameRadarRay, gameRadarRay.target) + (gameRadarRay.target.size.width / 2)){
                // alert('Target locked');

                // only for test
                var explosion = gameObjectsMdl.bomb(position(gameRadarRay.target.position.x, gameRadarRay.target.position.y),
                    size(gameRadarRay.target.size.width, gameRadarRay.target.size.width),
                    imgResources.explosion,
                    0, //speed
                    direction.left,
                    0,
                    12);
                gameObjects.push(explosion);
                // only for test
                //console.log(gameObjects);
                destroyTarget(gameRadarRay);
                gameScoreBoard.addScore(gamePlayer);
            } else {
                gameRadarRay.target = undefined;
                gameRadarRay.range = 6;
            }
        }

    }

    function initGame() {
        gameObjects = [];
        var initText = gameObjectsMdl.landscapeItem(position(globals.gameWidth / 2, globals.gameHeight / 2),
            size(globals.gameWidth, 100),
            imgResources.newGame,
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
            imgResources.tree,
            0, //speed
            direction.left,
            0);
        gameObjects.push(testTree);
        //Radar (unmovable, simple object)
        var testRadar = gameObjectsMdl.landscapeItem(position(60, globals.gameHeight - 60),
            size(100, 100),
            imgResources.radar,
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
            imgResources.target,
            configuration.targetSpeed.value, //speed
            direction.left,
            0);
        gameObjects.push(testTarget2);

        //Laser Ray (linked to the radar above)
        gameRadarRay = gameObjectsMdl.laserRay(4,
            configuration.laserSpeed.value, //angle speed
            1, //angle direction
            88, //max angle
            2, //min angle
            configuration.rangeSpeed.value, //range speed
            testRadar);
    }

    // callbacks
    gameFieldView.registerClickCallback(clickEvent);
    gameControlView.registerNewGameCallback(newGameEvent);
    gameControlView.registerExitCallback(pauseResumeEvent);
    gameControlView.registerPauseGameCallback(exitGameEvent);
    gameControlView.registerScoreboardCallback(showScoreBoardEvent);
    gameControlView.registerScoreboardExitCallback(hideScoreBoardEvent);


    function destroyTarget(ray){
        var index = gameObjects.indexOf(ray.target);
        gameObjects.splice(index, 1);
        ray.target = undefined;
        ray.range = 6;
        //new target to be randomized TODO:
        gameObjects.push(gameObjectsMdl.enemy(position(globals.gameWidth, globals.gameHeight / 2),
            size(100, 100),
            imgResources.target,
            configuration.targetSpeed.value, //speed
            direction.left,
            0));
    }

    // start animation with the objects defined above
    function animate(highResTimestamp) {
        requestAnimationFrame(animate);
        if (isScoreBoardShown) {
            return;
        }

        if (!gamePaused) {
            for (var i = 0; i < gameObjects.length; i++) {
                gameObjects[i].update();
                if (gameRadarRay) {
                    gameRadarRay.update();
                }
            }
            gameOverCheck();
            gameFieldView.resetView();
            if (gameRadarRay) {
                gameFieldView.draw(gameRadarRay);
            }
            if (gamePlayer) {
                gameFieldView.draw(gamePlayer);
            }
            gameFieldView.draw(gameObjects);
        }
    }

    // GAME START POINT
    initGame();

    // Start the animation.
    requestAnimationFrame(animate);
}());
