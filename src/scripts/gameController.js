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
        //alert('clicked!');
        //test lock:
        lockChecker();       
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
    
    //implements successful lock 
    function lockChecker(){
        //case 1: target angle is not yet locked:
        if(!testRay.target){
            gameObjects.forEach(function(obj){
                if(obj.isTarget){
                    if (testRay.angle < trigonometry.angleToTarget(testRay, obj ) + 3 && //TODO: deltas to be moved 
					   testRay.angle > trigonometry.angleToTarget(testRay, obj ) - 3){
                           testRay.target = obj;
                           console.log('locked');
                           return;
                       }
                    
                }
            }); 
        }
        //case 2: target angle is locked. Attempt to lock on range
        else{
            if (testRay.range > trigonometry.distanceBetween(testRay, testRay.target) - testRay.target.size.width && 
		    testRay.range < trigonometry.distanceBetween(testRay, testRay.target) + testRay.target.size.width){
                alert('Target locked');
            } else {
                testRay.target = undefined;
                testRay.range = 6;
                console.log('MISS!');
            }
        }
        
    }

    // callbacks
    gameFieldView.registerClickCallback(clickEvent);
    gameControlView.registerNewGameCallback(newGameEvent);
    gameControlView.registerExitCallback(pauseResumeEvent);
    gameControlView.registerPauseGameCallback(exitGameEvent);

    // spaceship 1
    // gameObjects.push(gameObjectsMdl.enemy(position(100, 100),
    //     size(100, 100),
    //     'images/spaceship.gif',
    //     2,
    //     direction.right,
    //     0));

    // target 1
    
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
    //Laser Ray (linked to the radar above)
    var testRay = gameObjectsMdl.laserRay(45,
        1, //angle speed
        1, //angle direction
        88, //max angle
        2, //min angle
        6, //range speed
        testRadar)
    gameObjects.push(testRay);
    
    
    var testTarget = gameObjectsMdl.enemy(position(globals.gameWidth, globals.gameHeight / 3),
        size(100, 100),
        'images/spaceship.png',
        3.2, //speed
        direction.left,
        0);
    gameObjects.push(testTarget);
        
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
