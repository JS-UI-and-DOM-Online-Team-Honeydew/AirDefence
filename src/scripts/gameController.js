(function () {
    'use strict';
    
    //TEST RESPONSIVE SECTION:
    //initiate game height and width parameters:
    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    if(width < globals.gameWidth){
        globals.gameWidth = width;
    }
    if(height < globals.gameHeight){
        globals.gameHeight = height;
    }
    if(isMobile()){
        globals.gameWidth = width;
        globals.gameHeight = height;
    }
    
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
        isScoreBoardShown = false,
        gameScoreBoard = scoreMdl.scoreBoard().init();

    function clickEvent() {
        lockChecker();
    }

    function newGameEvent() {
        try {
            var player = prompt("Please enter your name.\nName must be between 3-10 letters.", "name"),
                controls = document.getElementById('control-form');
            controls.style.marginTop = '32%';
            gamePlayer = scoreMdl.player(player);
            initGameObjects();
            gameControlView.setPlayMode();
            isScoreBoardShown = false;
        } catch (error) {
            newGameEvent();
        }
    }

    function pauseResumeEvent() {
        gamePaused = !gamePaused;
    }

    function showScoreBoardEvent() {
        isScoreBoardShown = !isScoreBoardShown;
    }

    function exitGameEvent() {
        var controls = document.getElementById('control-form');
        controls.style.marginTop = '13%';
        gameControlView.restoreInitMode();
        initGame();
        gameRadarRay = undefined;
    }

    function gameOverCheck() {
        gameObjects.forEach(function (obj) {
            if (obj.isTarget && gameRadarRay) {
                if (obj.position.x < gameRadarRay.position.x) {
                    bomb = gameObjectsMdl.aeroBomb(position(obj.position.x, obj.position.y),
                        size(30, 20),
                        imgResources.bomb,
                        20, //speed
                        direction.down,
                        0,
                        gameRadarRay);
                    gameObjects.push(bomb);
                    gameRadarRay = undefined;
                }
            }
        });
        if (bomb && bomb.boom) {
            var explosion = gameObjectsMdl.bomb(position(bomb.position.x, bomb.position.y),
                size(400, 400),
                imgResources.explosion,
                0, //speed
                direction.left,
                0,
                12);
            gameObjects.push(explosion);
            gameObjects.splice(gameObjects.indexOf(bomb), 1);
            bomb = undefined;
            gameObjects.splice(0, 1);
            setTimeout(function () {
                gameOver();
            }, 500);
        }
    }

    function laserShootingCheck() {
        if (gameRadarRay && gameRadarRay.shooting) {
            if (gameRadarRay.shootingLength === 0) {
                destroyTarget(gameRadarRay);
            }
        }
    }

    function gameOver() {
        //alert('GAME OVER!');
        exitGameEvent();
        isScoreBoardShown = true;
    }

    //implements successful lock
    function lockChecker() {
        //case 1: target angle is not yet locked:
        if (!gameRadarRay.target) {
            gameObjects.forEach(function (obj) {
                if (obj.isTarget) {
                    if (gameRadarRay.angle < trigonometry.angleToTarget(gameRadarRay, obj) +
                        (configuration.rayWidth.value / 2) && //TODO: deltas to be moved out + linking to real ray view
                        gameRadarRay.angle > trigonometry.angleToTarget(gameRadarRay, obj) -
                        (configuration.rayWidth.value / 2)) {
                        gameRadarRay.target = obj;
                        return;
                    }

                }
            });
        } else {
            //case 2: target angle is locked. Attempt to lock on range
            if (gameRadarRay.range > trigonometry.distanceBetween(gameRadarRay, gameRadarRay.target) -
                (gameRadarRay.target.size.width / 2) &&
                gameRadarRay.range < trigonometry.distanceBetween(gameRadarRay, gameRadarRay.target) +
                (gameRadarRay.target.size.width / 2)) {
                gameRadarRay.range = 6;
                gameRadarRay.shooting = true;

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
        isScoreBoardShown = false;
    }

    function initGameObjects() {
        var rand;

        gameObjects = [];
        //Radar (unmovable, simple object)
        //IMPORTANT: DO NOT CREATE GAME OBJECTS BEFORE THE testRadar Obj!!!
        var testRadar = gameObjectsMdl.landscapeItem(position(60, globals.gameHeight - 60),
            size(100, 100),
            imgResources.radar,
            0, //speed
            direction.left,
            0);
        gameObjects.push(testRadar);

        rand = Math.random() * 4;
        var planet1 = gameObjectsMdl.landscapeItem(
            position(globals.gameWidth / rand / 3, globals.gameHeight - rand * 120),
            size(globals.gameWidth / rand / 2, globals.gameWidth / rand / 2),
            imgResources.planet1,
            0, //speed
            direction.left,
            0);
        gameObjects.push(planet1);

        rand = Math.random() * 4;
        var planet2 = gameObjectsMdl.landscapeItem(
            position(globals.gameWidth / rand * 2, globals.gameHeight / rand * 2),
            size(globals.gameWidth / rand / 2, globals.gameWidth / rand / 2),
            imgResources.planet2,
            0, //speed
            direction.left,
            0);
        gameObjects.push(planet2);

        rand = Math.random() * 4;
        var galaxy = gameObjectsMdl.landscapeItem(
            position(globals.gameWidth - globals.gameWidth / rand / 2, globals.gameHeight / rand / 2),
            size(globals.gameWidth / rand / 2, globals.gameWidth / rand / 2),
            imgResources.galaxy,
            0, //speed
            direction.downLeft,
            0);
        gameObjects.push(galaxy);

        rand = Math.random() * 2;
        var shatle = gameObjectsMdl.landscapeItem(
            position(globals.gameWidth / rand, globals.gameHeight),
            size(globals.gameWidth / 9, globals.gameWidth / 9),
            imgResources.shatle,
            rand / 4, //speed
            direction.up,
            0);
        gameObjects.push(shatle);

        rand = Math.random() * 2;
        var commet1 = gameObjectsMdl.landscapeItem(
            position(globals.gameWidth / rand, 0),
            size(globals.gameWidth / rand / 4, globals.gameWidth / rand / 4),
            imgResources.commet,
            rand / 2, //speed
            direction.downLeft,
            0);
        gameObjects.push(commet1);

        rand = Math.random() * 3;
        var commet2 = gameObjectsMdl.landscapeItem(
            position(globals.gameWidth / rand, 0),
            size(globals.gameWidth / rand / 4, globals.gameWidth / rand / 4),
            imgResources.commet,
            rand / 4, //speed
            direction.downLeft,
            0);
        gameObjects.push(commet2);

        rand = Math.random() * 4;
        var alien1 = gameObjectsMdl.landscapeItem(
            position(0, globals.gameHeight / rand),
            size(globals.gameWidth / rand / 4, globals.gameWidth / rand / 4),
            imgResources.alien,
            rand / 4, //speed
            direction.right,
            0);
        gameObjects.push(alien1);

        rand = Math.random() * 4;
        var alien2 = gameObjectsMdl.landscapeItem(
            position(0, globals.gameHeight / rand),
            size(globals.gameWidth / rand / 4, globals.gameWidth / rand / 4),
            imgResources.alien,
            rand / 4, //speed
            direction.right,
            0);
        gameObjects.push(alien2);

        var testTarget2 = gameObjectsMdl.enemy('auto',
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

    function destroyTarget(ray) {
        var explosion = gameObjectsMdl.bomb(position(gameRadarRay.target.position.x, gameRadarRay.target.position.y),
            size(gameRadarRay.target.size.width, gameRadarRay.target.size.width),
            imgResources.explosion,
            0, //speed
            direction.left,
            0,
            12);
        gameObjects.push(explosion);
        var index = gameObjects.indexOf(ray.target);
        gameObjects.splice(index, 1);
        ray.target = undefined;

        gameObjects.push(gameObjectsMdl.enemy('auto',
            size(100, 100),
            imgResources.target,
            configuration.targetSpeed.value, //speed
            direction.left,
            0));
        gameScoreBoard.addScore(gamePlayer);
        gameRadarRay.shooting = false;
        gameRadarRay.shootingLength = 60;
    }

    // start animation with the objects defined above
    function animate(highResTimestamp) {
        requestAnimationFrame(animate);
        if (isScoreBoardShown) {
            scoreMdl.scoreBoard().save(gamePlayer);
            view.playersView(scoreMdl.scoreBoard().getTopPlayers());
            return;
        }

        if (!gamePaused) {
            for (var i = 0; i < gameObjects.length; i++) {
                gameObjects[i].update();
                if (gameRadarRay) {
                    gameRadarRay.update();
                }
            }
            laserShootingCheck();
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
