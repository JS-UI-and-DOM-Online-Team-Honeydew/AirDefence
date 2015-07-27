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
        bomb: function (position, size, image, speed, direction, zindex, numberOfFrames) {
            return Object.create(bomb).init(position, size, image, speed, direction, zindex, numberOfFrames);
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
                    this.image = image;
                    this.size = size;
                    this.speed = speed;
                    this.zindex = zindex;
                    this.isTarget = isTarget;
                    this.direction = direction;
                    return this;
                }
            },
            position: {
                get: function () {
                    return this._position;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._position = {};
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
                    this._size = {};
                    this._size.width = value.width;
                    this._size.height = value.height;
                }
            },
            image: {
                get: function () {
                    return this._image;
                },
                set: function (value) {
                    var img = new Image();
                    img.src = value;
                    this._image = img;//validators.checkImageAndChange(value);
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
                    this._direction = {};
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
                    validators.isBoolean(value);
                    this._isTarget = value;
                }
            },
            update: {
                value: function () {
                    this.position.x += (this.direction.x * this.speed);
                    this.position.y += (this.direction.y * this.speed);
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
                value: function (angle, angleSpeed, direction, maxAngle, minAngle, rangeSpeed, radar) {
                    this.angle = angle;
                    this.angleSpeed = configuration.laserSpeed.value; //degrees / frame
                    this.direction = direction; // -1 => down; +1 => up
                    this.maxAngle = maxAngle;
                    this.minAngle = minAngle;
                    this.rangeSpeed = configuration.rangeSpeed.value; //  px / frame
                    this.range = 6; //px
                    this.target = undefined; // receives target object on successful lock
                    this.radar = radar;  //for linking the ray initial position with the radar
                    this.position = {
                        x: this.radar.position.x,
                        y: this.radar.position.y
                    };
                    return this;
                }
            },
            // position: {
            //     get: function () {
            //         return this._position;
            //     },
            //     set: function (value) {
            //         // TODO: Add validators.............
            //         if(!validators.isNumber(value.x) ||!validators.isNumber(value.y)){
            //             throw new Error('LaserRay coordinates are NaN!');
            //         }
            //         this._position.x = value.x;
            //         this._position.y = value.y;
            //     }
            // },
            direction: {
                get: function () {
                    return this._direction;
                },
                set: function (value) {
                    if(!validators.isAngleDirection(value)){
                        throw new Error('LaserRay direction must be 1 or -1');
                    }
                    this._direction = value;
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
            // target: {
            //     get: function () {
            //         return this._target;
            //     },
            //     set: function (value) {
            //         // TODO: Add validators.............
            //         this._target = value;
            //     }
            // },
            radar: {
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
                    //Case1: target is not yet locked
                    if(this.target === undefined){
                        //change of direction checker:
                        if(this.angle > this.maxAngle && this.direction === 1){
                            this.direction = -1;
                        }
                        if(this.angle < this.minAngle && this.direction === -1){
                            this.direction = 1;
                        }
                        //update angle while sweeping:
                        this.angle = this.angle + (this.angleSpeed * this.direction);
                    }
                    //Case2: target is locked
                    else {
                        this.angle = trigonometry.toDeg(Math.atan((this.position.y - this.target.position.y) / (this.target.position.x - this.position.x)));
                        this.range += this.rangeSpeed;
                    }
                }
            },
            getUpdatedPosition: {
                value: function () {
                    // TODO: return new position, size, other data, ect ...
                }
            }
        });
        //Helpers:
        // Distance to target
    	function distanceToTarget(radar, target){
    		var cat1 = Math.abs(target.position.x - radar.position.x),
    		    cat2 = Math.abs(radar.position.y - target.position.y);
    		return Math.sqrt(cat1 * cat1 + cat2 * cat2);
    	}
    	//calculates reverse angle from the target
    	function angleToTarget(radar, target){
    		return trigonometry.toDeg(Math.atan((radar.position.y - target.position.y) / (target.position.x - radar.position.x)));
    	}

        return laserRayInternal;
    }());

    // class, defining all target (enemy objects) - TODO: to be extended if needed
    enemy = (function (parent) {
        var enemyInternal = Object.create(parent);

        Object.defineProperties(enemyInternal, {
            init: {
                value: function (position, size, image, speed, direction, zindex) {
                    parent.init.call(this, position, size, image, speed, direction, zindex, true);
                    if(this.image.height){
                         this.size.height = this.size.width * (this.image.height / this.image.width);
                    }
                   
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
                value: function (position, size, image, speed, direction, zindex, spriteData) {                    
                    this.numberOfFrames = spriteData;
                    this.frameIndex  = 0;
                    size.width = size.width * this.numberOfFrames;
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
