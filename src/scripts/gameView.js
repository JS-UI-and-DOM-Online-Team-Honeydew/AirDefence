function gameView() {
    'use strict';

    var gameViewInternal,
        gameFieldView,
        playersFieldView,
        controlFieldView;

    // result from the function
    gameViewInternal = {
        fieldView: function(width, height, backgroundImage) {
            return Object.create(gameFieldView).init(width, height, backgroundImage);
        },
        playersView: function(players) {
            return Object.create(playersFieldView).init(players);
        },
        controlsView: function() {
            return Object.create(controlFieldView).init();
        }
    };

    // class, representing game field, canvas initialization
    gameFieldView = (function() {
            var gameFieldViewInternal = Object.create({});

            function resetView(context, width, height, backgroundImage) {
                var baseImage = new Image();
                baseImage.src = backgroundImage;
                context.clearRect(0, 0, width, height);
                context.drawImage(baseImage, 0, 0, width, height);
            }

            function isMobile() {
                if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) ||
                    navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Opera Mini/i) ||
                    navigator.userAgent.match(/IEMobile/i)) {
                    return true;
                } else {
                    return false;
                }
            }

            Object.defineProperties(gameFieldViewInternal, {
                    init: {
                        value: function(width, height, backgroundImage) {
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
                        get: function() {
                            return this._width;
                        },
                        set: function(value) {
                            validators.checkUndefinedAndThrow(value);
                            if (!validators.isPositiveInteger(value)) {
                                throw new Error('Width must be a positive number!');
                            }
                            this._width = value;
                        }
                    },
                    height: {
                        get: function() {
                            return this._height;
                        },
                        set: function(value) {
                            validators.checkUndefinedAndThrow(value);
                            if (!validators.isPositiveInteger(value)) {
                                throw new Error('Height must be a positive number!');
                            }
                            this._height = value;
                        }
                    },
                    backgroundImage: {
                        get: function() {
                            return this._backgroundImage;
                        },
                        set: function(value) {
                            validators.checkUndefinedAndThrow(value);
                            if (!validators.isString(value)) {
                                throw new TypeError('BackgroundImage must be a string!');
                            }
                            this._backgroundImage = value;
                        }
                    },
                    draw: {
                        value: function(objects) {
                            // TODO: check input value parameter
                            // if value is array of gameObjects, draw those objects in the view
                            // if value is array beam, draw this beam in the view
                            // else throw an error, not valid parameter
                            var context = this.canvas.getContext('2d');

                            if (validators.isArray(objects)) {
                                // game objects
                                for (var i = 0; i < objects.length; i++) {
                                    // sprite check
                                    if (objects[i].numberOfFrames) {
                                        if (objects[i].frameIndex < objects[i].numberOfFrames) {
                                            context.drawImage(
                                                objects[i].image,
                                                objects[i].frameIndex * objects[i].size.width / objects[i].numberOfFrames,
                                                0,
                                                objects[i].size.width / objects[i].numberOfFrames,
                                                objects[i].size.height,
                                                objects[i].position.x,
                                                objects[i].position.y,
                                                objects[i].size.width / objects[i].numberOfFrames,
                                                objects[i].size.height);
                                        objects[i].frameIndex += 1;
                                    } else {
                                        delete(objects[objects[i]]);
                                    }
                                } else {
                                    //Every other static picture based object:
                                    context.drawImage(objects[i].image, objects[i].position.x - (objects[i].size.width / 2),
                                        objects[i].position.y - (objects[i].size.height / 2),
                                        objects[i].size.width, objects[i].size.height);
                                }
                            }
                        } else {
                            // laser ray
                            context.beginPath();
                            lineToAngle(objects.position.x, objects.position.y, 2000, objects.angle + 1, context);
                            context.arc(objects.position.x, objects.position.y, 2000, trigonometry.toRad(360 - objects.angle - 1), trigonometry.toRad(360 - objects.angle + 2));
                            context.closePath();
                            context.fillStyle = 'rgba(100, 100, 100, 0.5)';
                            context.fill(); //test draw
                            //Range indicator:
                            context.beginPath();
                            // lineToAngle(objects[i].position.x, objects[i].position.y, objects[i].range, objects[i].angle + 1, context);
                            for (var j = -6; j < 6; j += 2) {
                                context.arc(objects.position.x, objects.position.y, objects.range + j, trigonometry.toRad(360 - objects.angle - 1), trigonometry.toRad(360 - objects.angle + 2));
                                context.closePath();
                                context.strokeStyle = 'rgba(20, 20, 20, 0.8)';
                                context.stroke(); //test draw
                            }
                        }
                    }
                },
                resetView: {
                    value: function() {
                        var context = this.canvas.getContext('2d');
                        // clear canvas
                        resetView(context, this.width, this.height, this.backgroundImage);
                    }
                },
                registerClickCallback: {
                    value: function(callback) {
                        this.canvas.addEventListener('mousedown', callback, false);
                    }
                },
                registerKeyDownCallback: {
                    value: function(key, callback) {
                        validators.checkUndefinedAndThrow(key);
                        validators.checkUndefinedAndThrow(callback);
                        if (validators.isString(key)) {
                            throw new TypeError('Key must be a string.');
                        }
                        if (validators.isFunction(callback)) {
                            throw new TypeError('Callback must be a Function.');
                        }
                        window.addEventListener('keydown', function(e) {
                            if (String.fromCharCode(e.keyCode).toUpperCase() === key.toUpperCase()) {
                                callback();
                            }
                        }, false);
                    }
                }
            });

        //helpers
        function lineToAngle(x, y, length, angle, context) {
            angle = 0 - trigonometry.toRad(angle);
            context.moveTo(x, y);
            context.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle));
        }
        return gameFieldViewInternal;
    }());

// class representing players top list, to be visualized with svg
playersFieldView = (function() {
    var playersFieldViewInternal = Object.create({});

    Object.defineProperties(playersFieldViewInternal, {
        init: {
            value: function(players) {
                // TODO: Add validators of players .............
                // Initialize the SVG in the page
                // first create svg element on HTML page and display players in it
                // Maybe width and height to be given as parameters?!!?
                return this;
            }
        },
        update: {
            value: function(players) {
                // TODO: update SVG view
            }
        }
    });
    return playersFieldViewInternal;
}());

// class representing controls on the page (start game, pause, exit, ect ...)
controlFieldView = (function() {
    var controlFieldViewInternal = Object.create({});

    Object.defineProperties(controlFieldViewInternal, {
        init: {
            value: function() {
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
            value: function(callback) {
                this.buttonNewGame.addEventListener('click', callback, false);
            }
        },
        registerExitCallback: {
            value: function(callback) {
                this.buttonPauseGame.addEventListener('click', callback, false);
            }
        },
        registerPauseGameCallback: {
            value: function(callback) {
                this.buttonExitGame.addEventListener('click', callback, false);
            }
        }
    });
    return controlFieldViewInternal;
}());

return gameViewInternal;
}
