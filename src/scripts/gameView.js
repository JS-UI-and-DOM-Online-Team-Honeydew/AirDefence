function gameView() {
    'use strict';

    var gameViewInternal,
        gameFieldView,
        playersFieldView,
        controlFieldView;

    // result from the function
    gameViewInternal = {
        fieldView: function (backgroundImage) {
            return Object.create(gameFieldView).init(backgroundImage);
        },
        playersView: function (players) {
            return Object.create(playersFieldView).init(players);
        },
        controlsView: function () {
            return Object.create(controlFieldView).init();
        }
    };

    // class, representing game field, canvas initialization
    gameFieldView = (function () {
        var gameFieldViewInternal = Object.create({});

        Object.defineProperties(gameFieldViewInternal, {
            init: {
                value: function (backgroundImage) {
                    this.backgroundImage = backgroundImage;
                    // TODO: Initialize the canvas in the page
                    // first create canvas element on HTML page and display the backgound on it
                    // the game objects will be drawed later using Draw function
                    // Maybe width and height to be given as parameters?!!?

                    var mycanvas = document.createElement("canvas");
                    mycanvas.id = "mycanvas";
                    mycanvas.height = globals.gameHeight;
                    mycanvas.width = globals.gameWidth;
                    document.body.appendChild(mycanvas);

                    var context = document.getElementById('mycanvas').getContext('2d'),
                        path = new Path2D();

                    context.arc(75, 75, 50, 0, Math.PI * 2, true);
                    path.moveTo(110, 75);
                    path.arc(75, 75, 35, 0, Math.PI, false);
                    path.moveTo(65, 65);
                    path.arc(60, 65, 5, 0, Math.PI * 2, true);
                    path.moveTo(95, 65);
                    path.arc(90, 65, 5, 0, Math.PI * 2, true);
                    context.stroke(path);

                    context.font = '20pt Arial';
                    context.fillText('Works', 30, 155);
                    return this;
                }
            },
            backgroundImage: {
                get: function () {
                    return this._backgroundImage;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._backgroundImage = value;
                }
            },
            draw: {
                value: function (value) {
                    // TODO: check input value parameter
                    // if value is array of gameObjects, draw those objects in the view
                    // if value is array beam, draw this beam in the view
                    // else throw an error, not valid parameter
                }
            },
            registerClickCallback: {
                value: function (value) {
                    // TODO: create click event on the canvas field
                    // return a function as result, which will execute when click occures
                    // note: some key, for ex. space may also execute this callback
                }
            }
        });
        return gameFieldViewInternal;
    }());

    // class representing players top list, to be visualized with svg
    playersFieldView = (function () {
        var playersFieldViewInternal = Object.create({});

        Object.defineProperties(playersFieldViewInternal, {
            init: {
                value: function (players) {
                    // TODO: Add validators of players .............
                    // Initialize the SVG in the page
                    // first create svg element on HTML page and display players in it
                    // Maybe width and height to be given as parameters?!!?
                    return this;
                }
            },
            update: {
                value: function (players) {
                    // TODO: update SVG view
                }
            }
        });
        return playersFieldViewInternal;
    }());

    // class representing controls on the page (start game, pause, exit, ect ...)
    controlFieldView = (function () {
        var controlFieldViewInternal = Object.create({});

        Object.defineProperties(controlFieldViewInternal, {
            init: {
                value: function () {
                    // TODO: Create HTML form here
                    // Maybe width and height to be given as parameters?!!? or buttons ??
                    return this;
                }
            },
            registerNewGameCallback: {
                value: function (value) {
                    // TODO: send event to controller for the game
                    // to return a function, that will be executed
                }
            },
            registerNewPlayerCallback: {
                value: function (value) {
                    // TODO: send event to controller for the player
                    // to return a function, that will be executed
                }
            },
            registerPauseGameCallback: {
                value: function (value) {
                    // TODO: send event to controller for the pause/resume
                    // to return a function, that will be executed
                }
            }
        });
        return controlFieldViewInternal;
    }());

    return gameViewInternal;
}
