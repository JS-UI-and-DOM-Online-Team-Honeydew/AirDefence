function gameModel() {
    'use strict';
    var gameModelInternal,
        positionStruct,
        sizeStruct,
        gameMdl;

    // result from the function
    gameModelInternal = {
        positionStruct: function (x, y) {
            return Object.create(positionStruct).init(x, y);
        },
        sizeStruct: function (width, height) {
            return Object.create(sizeStruct).init(position, size, image, speed, direction, zindex);
        },
        gameMdl: function (currentPlayer, gameObjects, gameLaser) {
            return Object.create(gameMdl).init(position, size, image, speed, direction, zindex);
        }
    };

    // Position class, represents point with x and y coordinates
    positionStruct = (function () {
        var positionInternal = Object.create({});

        Object.defineProperties(positionInternal, {
            init: {
                value: function (x, y) {
                    this.x = x;
                    this.y = y;
                    return this;
                }
            },
            x: {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._x = value;
                }
            },
            y: {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._y = value;
                }
            }
        });
        return positionInternal;
    }());

    // Size class, represents shape with width and height coordinates
    sizeStruct = (function () {
        var sizeInternal = Object.create({});

        Object.defineProperties(sizeInternal, {
            init: {
                value: function (width, height) {
                    this.width = width;
                    this.height = height;
                    return this;
                }
            },
            width: {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._width = value;
                }
            },
            height: {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._height = value;
                }
            }
        });
        return sizeInternal;
    }());

    // Size class, represents shape with width and height coordinates
    gameMdl = (function () {
        var gameMdlInternal = Object.create({});

        Object.defineProperties(gameMdlInternal, {
            init: {
                value: function (currentPlayer, gameObjects, gameLaser) {
                    // TODO: load score board
                    this.currentPlayer = currentPlayer;
                    this.gameObjects = gameObjects;
                    this.gameLaser = gameLaser;
                    return this;
                }
            },
            currentPlayer: {
                get: function () {
                    return this._currentPlayer;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._currentPlayer = value;
                }
            },
            gameObjects: {
                get: function () {
                    return this._gameObjects;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._gameObjects = value;
                }
            },
            gameLaser: {
                get: function () {
                    return this._gameLaser;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._gameLaser = value;
                }
            }
        });
        return gameMdlInternal;
    }());
    return gameModelInternal;
}
