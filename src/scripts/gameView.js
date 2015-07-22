function gameView() {
    'use strict';

    var gameViewInternal,
        gameFieldView,
        playersFieldView,
        controlFieldView;

    // result from the function
    gameViewInternal = {
        fieldView: function (width, height, backgroundImage) {
            return Object.create(gameFieldView).init(width, height, backgroundImage);
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

        function resetView(context, width, height, backgroundImage) {
            var baseImage = new Image();
            baseImage.src = backgroundImage;
            context.clearRect(0, 0, width, height);
            context.drawImage(baseImage, 0, 0, width, height);
        }

        Object.defineProperties(gameFieldViewInternal, {
            init: {
                value: function (width, height, backgroundImage) {
                    this.backgroundImage = backgroundImage;
                    this.width = width;
                    this.height = height;
                    // TODO: Initialize the canvas in the page
                    // first create canvas element on HTML page and display the backgound on it
                    // the game objects will be drawed later using Draw function
                    // Maybe width and height to be given as parameters?!!?

                    var mycanvas = document.createElement("canvas");
                    mycanvas.id = "mycanvas";
                    mycanvas.width = this.width;
                    mycanvas.height = this.height;
                    document.body.appendChild(mycanvas);

                    var context = document.getElementById('mycanvas').getContext('2d');
                    this.canvas = mycanvas;

                    resetView(context, width, height, backgroundImage);

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
                value: function (objects) {
                    // TODO: check input value parameter
                    // if value is array of gameObjects, draw those objects in the view
                    // if value is array beam, draw this beam in the view
                    // else throw an error, not valid parameter
                    var baseImage = new Image(),
                        context = this.canvas.getContext('2d');

                    // clear canvas
                    resetView(context, this.width, this.height, this.backgroundImage);

                    for (var i = 0; i < objects.length; i++) {
                        baseImage.src = objects[i].image;
                        context.drawImage(baseImage, objects[i].position.x, objects[i].position.y,
                            objects[i].size.width, objects[i].size.height);
                    }
                }
            },
            registerClickCallback: {
                value: function (callback) {
                    // TODO: create click event on the canvas field
                    // return a function as result, which will execute when click occures
                    // note: some key, for ex. space may also execute this callback
                    // Add event listener for `click` events.
                    this.canvas.addEventListener('click', function (event) {
                        var x = event.pageX,
                            y = event.pageY;

                        if (callback !== undefined) {
                            callback(x, y);
                        }

                    }, false);
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
