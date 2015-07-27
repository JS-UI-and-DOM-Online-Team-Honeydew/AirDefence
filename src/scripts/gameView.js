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
                    } else {
                        // laser ray
                        context.beginPath();
                        lineToAngle(objects.position.x, objects.position.y, 2000, objects.angle + (configuration.rayWidth.value / 2), context);
                        context.arc(objects.position.x, objects.position.y, 2000, trigonometry.toRad(360 - objects.angle - (configuration.rayWidth.value / 2)), trigonometry.toRad(360 - objects.angle + configuration.rayWidth.value));
                        context.closePath();
                        context.fillStyle = 'rgba(100, 100, 100, 0.5)';
                        context.fill(); //test draw
                        //Range indicator:
                        context.beginPath();
                        // lineToAngle(objects[i].position.x, objects[i].position.y, objects[i].range, objects[i].angle + 1, context);
                        for (var j = -6; j < 6; j += 2) {
                            context.arc(objects.position.x, objects.position.y, objects.range + j, trigonometry.toRad(360 - objects.angle - (configuration.rayWidth.value / 2)), trigonometry.toRad(360 - objects.angle + configuration.rayWidth.value));
                            context.closePath();
                            context.strokeStyle = 'rgba(20, 20, 20, 0.8)';
                            context.stroke(); //test draw
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
                    for (var i = 0; i < players.length; i += 1) {
                        validators.checkUndefinedAndThrow(players[i]);
                        validators.isString(players[i].name);
                        validators.isNumber(players[i].score);
                        validators.isPositiveInteger(players[i].score);
                    }

                    var canvas,
                        ctx,
                        data,
                        img,
                        svg,
                        url,
                        DOMURL,
                        width,
                        height;

                    debugger;
                    width = 0.9*width;
                    height=0.9*this.height;

                    console.log(width);
                    console.log(this.width);
                    console.log(globals.width);
                    console.log(height);
                    console.log(this.height);
                    console.log(globals.height);


                    canvas = document.getElementById('mycanvas');
                    ctx = canvas.getContext('2d');

                    data = '<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg">' +
                        '<defs>' +
                        '<filter id="svg_2_blur">' +
                        '<feGaussianBlur stdDeviation="0.2" in="SourceGraphic"/>' +
                        '</filter>' +
                        '</defs>' +
                        '<g>' +
                        '<title>Layer 1</title>' +
                        '<path id="svg_1" d="m103.78498,346.51004l0,-254.31254l0,0c0,-10.80495 14.57887,-19.5625 32.56248,-19.5625l390.75008,0c17.98395,0 32.56268,8.75755 32.56268,19.5625c0,10.80503 -14.57874,19.56249 -32.56268,19.56249l-32.56253,0l0,254.31261c0,10.8042 -14.57867,19.56244 -32.56256,19.56244l-390.74993,0l0,0c-17.98524,0 -32.56249,-8.75824 -32.56249,-19.56244c0,-10.80408 14.57726,-19.56256 32.56249,-19.56256l32.56247,0zm65.12496,-273.87504l0,0c17.98497,0 32.56247,8.75755 32.56247,19.5625c0,10.80503 -14.5775,19.56249 -32.56247,19.56249c-8.99126,0 -16.28362,-4.37959 -16.28362,-9.78288c0,-5.40168 7.29236,-9.77962 16.28362,-9.77962l32.56247,0m325.62512,19.56249l-358.18759,0m-65.12496,234.75005l0,0c8.99124,0 16.28014,4.3797 16.28014,9.78278c0,5.40198 -7.28889,9.77979 -16.28014,9.77979l32.56248,0m-32.56248,19.56244l0,0c17.9825,0 32.56248,-8.75824 32.56248,-19.56244l0,-19.56256" stroke-width="5" stroke="#000000" fill="#ff00ff"/>' +
                        '<text stroke-linejoin="bevel" stroke-linecap="round" filter="url(#svg_2_blur)" font-weight="bold" stroke-dasharray="5,5" xml:space="preserve" text-anchor="middle" font-family="Cursive" font-size="39" id="svg_2" y="152" x="310" stroke="#000000" fill="#000000">Score Board</text>' +
                        '<text font-weight="bold" xml:space="preserve" text-anchor="middle" font-family="Cursive" font-size="29" id="svg_3" y="221" x="181" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="5,5" stroke="#000000" fill="#000000">Name:</text>' +
                        '<text font-weight="bold" xml:space="preserve" text-anchor="middle" font-family="Cursive" font-size="29" id="svg_4" y="221" x="300" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="5,5" stroke="#000000" fill="#000000">Score:</text>' +
                        '<text font-weight="bold" xml:space="preserve" text-anchor="middle" font-family="Cursive" font-size="29" id="svg_4" y="275" x="200" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="5,5" stroke="#000000" fill="#000000">' + players[0].name +  '</text>' +
                        '<text font-weight="bold" xml:space="preserve" text-anchor="middle" font-family="Cursive" font-size="29" id="svg_4" y="275" x="300" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="5,5" stroke="#000000" fill="#000000">' +  players[0].score + '</text>' +
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
            registerScoreboardCallback :{
                value: function (callback) {
                    this.buttonShowScoreBoard.addEventListener('click', callback, false);
                }
            },
            registerScoreboardExitCallback :{
                value: function (callback) {
                    this.buttonHideScoreBoard.addEventListener('click', callback, false);
                }
            }
        });
        return controlFieldViewInternal;
    }());

    return gameViewInternal;
}
