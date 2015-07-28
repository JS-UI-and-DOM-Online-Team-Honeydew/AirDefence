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
                        var context = this.canvas.getContext('2d');

                        if (validators.isArray(objects)) {
                            // game objects
                            for (var i = 0; i < objects.length; i++) {
                                // sprite check
                                if (objects[i].numberOfFrames) {
                                    if (objects[i].frameIndex < objects[i].numberOfFrames) {
                                        context.drawImage(
                                            objects[i].image,
                                            objects[i].frameIndex * objects[i].image.width / objects[i].numberOfFrames,
                                            0,
                                            objects[i].image.width / objects[i].numberOfFrames,
                                            objects[i].image.height,
                                            objects[i].position.x - (objects[i].size.width / 2),
                                            objects[i].position.y - (objects[i].size.height / 2),
                                            objects[i].size.width,
                                            objects[i].size.height);
                                        objects[i].frameIndex += 1;
                                    } else {
                                        objects.splice(i, 1);
                                        //delete(objects[objects[i]]);
                                    }
                                } else {
                                    //Every other static picture based object:
                                    context.drawImage(objects[i].image, objects[i].position.x - (objects[i].size.width / 2),
                                        objects[i].position.y - (objects[i].size.height / 2),
                                        objects[i].size.width, objects[i].size.height);
                                }
                            }
                        } else if (objects.name !== undefined && objects.score !== undefined) {
                            // player
                            context.fillStyle = "white";
                            context.font = "bold 20px Arial";
                            context.fillText('Player: ' + objects.name, 25, 40);
                            context.fillText('Score: ' + Math.round(objects.score, 12), globals.gameWidth - 150, 40);
                        } else {
                            // laser ray
                            context.beginPath();
                            lineToAngle(objects.position.x, objects.position.y, 2000, objects.angle + (configuration.rayWidth.value / 4), context);
                            context.arc(objects.position.x, objects.position.y, 2000, trigonometry.toRad(360 - objects.angle - (configuration.rayWidth.value / 4)), trigonometry.toRad(360 - objects.angle + configuration.rayWidth.value / 2));
                            context.closePath();
                            context.fillStyle = 'rgba(100, 100, 100, 0.5)';
                            context.fill(); //test draw
                            //Range indicator:
                            context.beginPath();
                            // lineToAngle(objects[i].position.x, objects[i].position.y, objects[i].range, objects[i].angle + 1, context);
                            for (var j = -6; j < 6; j += 2) {
                                context.arc(objects.position.x, objects.position.y, objects.range + j, trigonometry.toRad(360 - objects.angle - (configuration.rayWidth.value / 4)), trigonometry.toRad(360 - objects.angle + configuration.rayWidth.value / 2));
                                context.closePath();
                                context.strokeStyle = 'rgba(20, 20, 20, 0.8)';
                                context.stroke(); //test draw
                            }
                            // Laser Shooting:
                            if(objects.shooting){
                                context.beginPath();
                                context.strokeStyle = 'red';
                                context.moveTo(objects.position.x, objects.position.y);
                                context.lineTo(objects.target.position.x, objects.target.position.y);
                                context.stroke();
                                context.closePath();
                            }
                        }
                    }
            },
            resetView: {
            value: function () {
                var context = this.canvas.getContext('2d');
                // clear canvas
                resetView(context, this.width, this.height, this.backgroundImage);
            }
        },
        registerClickCallback: {
            value: function (callback) {
                this.canvas.addEventListener('mousedown', callback, false);
            }
        },
        registerKeyDownCallback: {
            value: function (key, callback) {
                validators.checkUndefinedAndThrow(key);
                validators.checkUndefinedAndThrow(callback);
                if (validators.isString(key)) {
                    throw new TypeError('Key must be a string.');
                }
                if (validators.isFunction(callback)) {
                    throw new TypeError('Callback must be a Function.');
                }
                window.addEventListener('keydown', function (e) {
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
playersFieldView = (function () {
    var playersFieldViewInternal = Object.create({});

    Object.defineProperties(playersFieldViewInternal, {
        init: {
            value: function (players) {
                // TODO: Add validators of players .............
                // Initialize the SVG in the page
                // first create svg element on HTML page and display players in it
                // Maybe width and height to be given as parameters?!!?

// TODO------------------------------------------------------------------SVG
                    var canvas,
                    ctx,
                    data,
                    img,
                    svg,
                    url,
                    width,
                    scal,
                    DOMURL;

                for (var i = 0; i < players.length; i += 1) {
                    validators.checkUndefinedAndThrow(players[i]);

                    if (players[i].name === undefined && players[i].score === undefined) {
                            throw  new Error('Player name or score is undefined');
                        }

                    validators.isString(players[i].name);
                    validators.isNumber(players[i].score);
                    validators.isPositiveInteger(players[i].score);
                } 

                // For scale on different device                
                width= mycanvas.width;
                scal = width / globals.gameWidth;               

                canvas = document.getElementById('mycanvas');
                ctx = canvas.getContext('2d');

                data = '<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">' +
                    '<defs>' +
                    '<filter id="svg_2_blur">' +
                    '<feGaussianBlur stdDeviation="0.2" in="SourceGraphic"/>' +
                    '</filter>' +
                    '</defs>' +
                    '<g>' +
                    '<title>Layer 1</title>' +
                    '<path id="svg_1" d="m104.14001,503.82504l0,-435.50005l0,0c0,-18.50229 22.05193,-33.5 49.25001,-33.5l591.00006,0c27.20398,0 49.25006,14.99771 49.25006,33.5c0,18.50227 -22.04608,33.49999 -49.25006,33.49999l-49.25018,0l0,435.50008c0,18.50232 -22.05188,33.49994 -49.25,33.49994l-590.99984,0l0,0c-27.19812,0 -49.25,-14.99762 -49.25,-33.49994c0,-18.50232 22.05188,-33.50003 49.25,-33.50003zm147.74992,-469.00004l0,0c27.19814,0 49.24995,14.99771 49.24995,33.5c0,18.50227 -22.05182,33.49999 -49.24995,33.49999c-13.59906,0 -24.625,-7.49988 -24.625,-16.75c0,-9.2501 11.02594,-16.74999 24.625,-16.74999l49.24995,0m492.50015,33.49999l-541.75011,0m-98.49996,402.00005l0,0c13.59908,0 24.62508,7.49985 24.62508,16.75009c0,9.24994 -11.02601,16.74994 -24.62508,16.74994l49.25001,0m-49.25001,33.49994l0,0c27.19817,0 49.25001,-14.99762 49.25001,-33.49994l0,-33.50003" stroke-linecap="null" stroke-linejoin="null" stroke-width="5" stroke="#000000" fill="yellowgreen" transform="scale('+ scal + ')"/>' +
                    ' <text stroke-width="0" fill="#000000" stroke="#000000" x="380" y="152" id="svg_2" font-size="39" font-family="Cursive" text-anchor="middle" xml:space="preserve" font-weight="bold" transform="scale('+ scal + ')">Score Board</text>' +
                    '<text stroke-width="0" fill="#000000" stroke="#000000" x="220" y="200" id="svg_3" font-size="29" font-family="Cursive" text-anchor="middle" xml:space="preserve" font-weight="bold" transform="scale('+ scal + ')">Name</text>' +
                    '<text stroke-width="0" fill="#000000" stroke="#000000" x="540" y="200" id="svg_4" font-size="29" font-family="Cursive" text-anchor="middle" xml:space="preserve" font-weight="bold" transform="scale('+ scal + ')">Score</text>' +
                    '<line id="svg_5" y2="220" x2="678" y1="220" x1="130" stroke-linecap="null" stroke-linejoin="null" stroke-width="5" stroke="#000000" fill="none" transform="scale('+ scal + ')"/>' +
                    '<text stroke-width="0" fill="#000000" stroke="#000000" stroke-linejoin="null" stroke-linecap="null" x="181" y="275" id="svg_6" font-size="29" font-family="Cursive" text-anchor="middle" xml:space="preserve" font-weight="bold" transform="scale('+ scal + ')">' + players[0].name + '</text>' +
                    '<text font-weight="bold" xml:space="preserve" text-anchor="middle" font-family="Cursive" font-size="29" id="svg_7" y="275" x="541" stroke-linecap="null" stroke-linejoin="null" stroke="#000000" fill="#000000" stroke-width="0" transform="scale('+ scal + ')">' + Math.round(players[0].score ) + '</text>' +
                    '<text stroke-width="0" fill="#000000" stroke="#000000" stroke-linejoin="null" stroke-linecap="null" x="181" y="310" id="svg_8" font-size="29" font-family="Cursive" text-anchor="middle" xml:space="preserve" font-weight="bold" transform="scale('+ scal + ')">' + players[1].name + '</text>' +
                    '<text font-weight="bold" xml:space="preserve" text-anchor="middle" font-family="Cursive" font-size="29" id="svg_9" y="310" x="541" stroke-linecap="null" stroke-linejoin="null" stroke="#000000" fill="#000000" stroke-width="0" transform="scale('+ scal + ')">' + Math.round(players[1].score ) + '</text>' +
                    '<text stroke-width="0" fill="#000000" stroke="#000000" stroke-linejoin="null" stroke-linecap="null" x="181" y="345" id="svg_10" font-size="29" font-family="Cursive" text-anchor="middle" xml:space="preserve" font-weight="bold" transform="scale('+ scal + ')">' + players[2].name + '</text>' +
                    '<text font-weight="bold" xml:space="preserve" text-anchor="middle" font-family="Cursive" font-size="29" id="svg_11" y="345" x="541" stroke-linecap="null" stroke-linejoin="null" stroke="#000000" fill="#000000" stroke-width="0" transform="scale('+ scal + ')">' + Math.round(players[2].score ) + '</text>' +
                    '</g>' +
                    '</svg>';

                DOMURL = window.URL || window.webkitURL || window;

                img = new Image();
                svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
                url = DOMURL.createObjectURL(svg);

                img.onload = function () {
                    ctx.drawImage(img, 0, 0);
                    DOMURL.revokeObjectURL(url);
                };

                img.src = url;

                //------------------------------------------------------------------SVG

                return this;
            }
        },
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
                    buttonShowScoreBoard = document.createElement('input'),
                    buttonHideScoreBoard = document.createElement('input'),
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

                buttonShowScoreBoard.class = 'control-buttons';
                buttonShowScoreBoard.type = 'button';
                buttonShowScoreBoard.name = 'scoreboard';
                buttonShowScoreBoard.value = 'ScoreBoard';

                buttonHideScoreBoard.class = 'control-buttons';
                buttonHideScoreBoard.type = 'button';
                buttonHideScoreBoard.name = 'scoreboard-hide';
                buttonHideScoreBoard.value = 'Hide ScoreBoard';

                formField.appendChild(buttonNewGame);
                formField.appendChild(buttonPauseGame);
                formField.appendChild(buttonExitGame);
                formField.appendChild(buttonShowScoreBoard);
                formField.appendChild(buttonHideScoreBoard);

                this.buttonNewGame = buttonNewGame;
                this.buttonPauseGame = buttonPauseGame;
                this.buttonExitGame = buttonExitGame;
                this.buttonShowScoreBoard = buttonShowScoreBoard;
                this.buttonHideScoreBoard = buttonHideScoreBoard;

                document.body.appendChild(document.createElement('br'));

                for (var param in configuration) {
                    if (configuration.hasOwnProperty(param)) {
                        configuration[param].htmlControl = document.createElement('input');
                        configuration[param].htmlControl.id = param.toString();
                        configuration[param].htmlControl.type = 'range';
                        configuration[param].htmlControl.min = configuration[param].minValue;
                        configuration[param].htmlControl.max = configuration[param].maxValue;
                        configuration[param].htmlControl.step = configuration[param].step;
                        configuration[param].htmlControl.value = configuration[param].value;

                        var label = document.createElement('label');
                        label.id = param.toString() + '-label';
                        label.innerHTML = configuration[param].name + ' ';

                        var label1 = document.createElement('label');
                        label1.for = param.toString();
                        label1.id = param.toString() + '-label1';
                        label1.innerHTML = ' ' + configuration[param].value;

                        configuration[param].htmlControl.addEventListener('change', function (ev) {
                            var l = document.getElementById(ev.target.id + '-label1');
                            l.innerHTML = ' ' + ev.target.value;
                            configuration[ev.target.id].value = parseFloat(ev.target.value);
                        }, false);

                        document.body.appendChild(label);
                        document.body.appendChild(configuration[param].htmlControl);
                        document.body.appendChild(label1);
                        document.body.appendChild(document.createElement('br'));

                    }
                }
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
        },
        registerScoreboardCallback: {
            value: function (callback) {
                this.buttonShowScoreBoard.addEventListener('click', callback, false);
            }
        },
        registerScoreboardExitCallback: {
            value: function (callback) {
                this.buttonHideScoreBoard.addEventListener('click', callback, false);
            }
        }
    });
    return controlFieldViewInternal;
}());

return gameViewInternal;
}
