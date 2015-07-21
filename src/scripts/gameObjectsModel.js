function gameObjectsModel() {
    'use strict';

    var gameObjectsModelInternal,
        gameObject,
        enemy,
        bomb,
        landscapeItem,
        laserRay;

    // result from the function
    gameObjectsModelInternal = {
        enemy: function (position, size, image, speed, direction, zindex) {
            return Object.create(enemy).init(position, size, image, speed, direction, zindex);
        },
        bomb: function (position, size, image, speed, direction, zindex) {
            return Object.create(bomb).init(position, size, image, speed, direction, zindex);
        },
        landscapeItem: function (position, size, image, speed, direction, zindex) {
            return Object.create(landscapeItem).init(position, size, image, speed, direction, zindex);
        },
        laserRay: function (angle, angleSpeed, direction, maxAngle, minAngle, position, rangeSpeed) {
            return Object.create(laserRay).init(angle, angleSpeed, direction, maxAngle, minAngle, position, rangeSpeed);
        }
    };

    // Model for all objects in the game
    gameObject = (function () {
        var gameObjectInternal = Object.create({});

        Object.defineProperties(gameObjectInternal, {
            init: {
                value: function (position, size, image, speed, direction, zindex, isTarget) {
                    this.position = position;
                    this.size = size;
                    this.image = image;
                    this.speed = speed;
                    this.zindex = zindex;
                    this.isTarget = isTarget;
                    return this;
                }
            },
            position: {
                get: function () {
                    return this._position;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._position.x = value.x;
                    this._position.y = value.y;
                }
            },
            size: {
                get: function () {
                    return this._size;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._size.width = value.width;
                    this._size.height = value.height;
                }
            },
            image: {
                get: function () {
                    return this._image;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._image = value;
                }
            },
            speed: {
                get: function () {
                    return this._speed;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._speed = value;
                }
            },
            direction: {
                get: function () {
                    return this._direction;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._direction.x = value.x;
                    this._direction.y = value.y;
                }
            },
            zindex: {
                get: function () {
                    return this._zindex;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._zindex = value;
                }
            },
            isTarget: {
                get: function () {
                    return this._isTarget;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._isTarget = value;
                }
            },
            update: {
                value: function () {
                    // TODO: update all coordinates and other data based on current speed, direction, ect...
                }
            },
            getUpdatedPosition: {
                value: function () {
                    // TODO: return new position, size, other data, ect ...
                }
            }
        });
        return gameObjectInternal;
    }());

    // Model for the laser - TODO: to be extended as needed
    laserRay = (function () {
        var laserRayInternal = Object.create({});

        Object.defineProperties(laserRayInternal, {
            init: {
                value: function (angle, angleSpeed, direction, maxAngle, minAngle, position, rangeSpeed) {
                    this.angle = angle;
                    this.angleSpeed = angleSpeed;
                    this.direction = direction;
                    this.maxAngle = maxAngle;
                    this.minAngle = minAngle;
                    this.position = position;
                    this.rangeSpeed = rangeSpeed;
                    // this.target = target;
                    return this;
                }
            },
            position: {
                get: function () {
                    return this._position;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._position.x = value.x;
                    this._position.y = value.y;
                }
            },
            direction: {
                get: function () {
                    return this._direction;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._direction.x = value.x;
                    this._direction.y = value.y;
                }
            },
            angle: {
                get: function () {
                    return this._angle;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._angle = value;
                }
            },
            angleSpeed: {
                get: function () {
                    return this._angleSpeed;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._angleSpeed = value;
                }
            },
            maxAngle: {
                get: function () {
                    return this._maxAngle;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._maxAngle = value;
                }
            },
            minAngle: {
                get: function () {
                    return this._minAngle;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._minAngle = value;
                }
            },
            rangeSpeed: {
                get: function () {
                    return this._rangeSpeed;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._rangeSpeed = value;
                }
            },
            target: {
                get: function () {
                    return this._target;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._target = value;
                }
            },
            update: {
                value: function () {
                    // TODO: update all coordinates and other data based on current angle, direction, ect...
                }
            },
            getUpdatedPosition: {
                value: function () {
                    // TODO: return new position, size, other data, ect ...
                }
            }
        });
        return laserRayInternal;
    }());

    // class, defining all target (enemy objects) - TODO: to be extended if needed
    enemy = (function (parent) {
        var enemyInternal = Object.create(parent);

        Object.defineProperties(enemyInternal, {
            init: {
                value: function (position, size, image, speed, direction, zindex) {
                    parent.init.call(this, position, size, image, speed, direction, zindex, true);
                    return this;
                }
            }
        });
        return enemyInternal;
    }(gameObject));

    // class, defining all bombs - TODO: to be extended with functionality for droping the bomb and distroying the radar
    bomb = (function (parent) {
        var bombInternal = Object.create(parent);

        Object.defineProperties(bombInternal, {
            init: {
                value: function (position, size, image, speed, direction, zindex) {
                    parent.init.call(this, position, size, image, speed, direction, zindex, false);
                    return this;
                }
            }
        });
        return bombInternal;
    }(gameObject));

    // class, defining other landscape items - TODO: to be extended if needed
    landscapeItem = (function (parent) {
        var landscapeItemInternal = Object.create(parent);

        Object.defineProperties(landscapeItemInternal, {
            init: {
                value: function (position, size, image, speed, direction, zindex) {
                    parent.init.call(this, position, size, image, speed, direction, zindex, false);
                    return this;
                }
            }
        });
        return landscapeItemInternal;
    }(gameObject));

    return gameObjectsModelInternal;
}
