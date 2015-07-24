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

        function isMobile (){
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) ||
                navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Opera Mini/i) ||
                navigator.userAgent.match(/IEMobile/i)){
                return true;
            }
            else{
                return false;
            }
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
            width: {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    validators.checkUndefinedAndThrow(value);
                    if (!validators.isPositiveInteger(value)) {
                        throw new Error('Width must be a positive number!');
                    }
                    this._width = value;
                }
            },
            height: {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    validators.checkUndefinedAndThrow(value);
                    if (!validators.isPositiveInteger(value)) {
                        throw new Error('Height must be a positive number!');
                    }
                    this._height = value;
                }
            },
            backgroundImage: {
                get: function () {
                    return this._backgroundImage;
                },
                set: function (value) {
                    validators.checkUndefinedAndThrow(value);
                    if (!validators.isString(value)) {
                        throw new TypeError('BackgroundImage must be a string!');
                    }
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
                    if (isMobile()){
                        this.canvas.addEventListener('touchmove', callback, false);
                    }
                    else {
                        this.canvas.addEventListener('click', callback, false);
                    }
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
                    var formField = document.createElement('form'),
                        buttonNewGame = document.createElement('input'),
                        buttonPauseGame = document.createElement('input'),
                        buttonExitGame = document.createElement('input');

                    formField.id = 'control-form';

                    buttonNewGame.class = 'control-buttons';
                    buttonNewGame.type = 'button';
                    buttonNewGame.name = 'new-game';
                    buttonNewGame.value = 'New Game';

                    buttonPauseGame.class = 'control-buttons';
                    buttonPauseGame.type = 'button';
                    buttonPauseGame.name = 'pause-game';
                    buttonPauseGame.value = 'Pause Game';

                    buttonExitGame.class = 'control-buttons';
                    buttonExitGame.type = 'button';
                    buttonExitGame.name = 'exit-game';
                    buttonExitGame.value = 'Exit Game';

                    formField.appendChild(buttonNewGame);
                    formField.appendChild(buttonPauseGame);
                    formField.appendChild(buttonExitGame);

                    this.buttonNewGame = buttonNewGame;
                    this.buttonPauseGame = buttonPauseGame;
                    this.buttonExitGame = buttonExitGame;

                    document.body.appendChild(document.createElement('br'));
                    document.body.appendChild(formField);

                    return this;
                }
            },
            registerNewGameCallback: {
                value: function (callback) {
                    this.buttonNewGame.addEventListener('click', callback, false);
                }
            },
            registerExitCallback: {
                value: function (callback) {
                    this.buttonPauseGame.addEventListener('click', callback, false);
                }
            },
            registerPauseGameCallback: {
                value: function (callback) {
                    this.buttonExitGame.addEventListener('click', callback, false);
                }
            }
        });
        return controlFieldViewInternal;
    }());

    return gameViewInternal;
}
