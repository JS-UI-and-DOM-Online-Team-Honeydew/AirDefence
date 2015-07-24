var globals,
    validators,
    position,
    size,
    direction,
    images;

(function () {
    'use strict';

    //here are all images and their validation 
    images = {
        spaceship: function(){
            var spaceshipImg = new Image();
            spaceshipImg.src = 'images/spaceship.gif';
            if (!spaceshipImg.complete) {
                return spaceshipImg.src;
            } else {
                return this.defalt();
            }
        },
        background: function(){
            var backgroundImg = new Image();
            backgroundImg.src = 'images/dark_blue.jpg';
            if (!backgroundImg.complete) {
                return backgroundImg.src;
            } else {
                return this.defalt();
            }
        },
        defalt: function(){
            var defaltImg = new Image();
            defaltImg.src = 'images/ivaylo_defalt.jpg';
            return defaltImg.src
        }
    };

    // any global variables in the game to be defined here
    globals = {
        gameHeight: 600,
        gameWidth: 800,
        gameBackground: './images/dark_blue.jpg',
        numberEnemies: 1,
        OTHER_CONSTANTS: 0
    };

    direction = {
        left: {x:-1, y:0},
        right: {x:+1, y:0},
        up: {x:0, y:-1},
        down: {x:0, y:+1},
        upLeft: {x:-1, y:-1},
        downLeft: {x:-1, y:+1},
        upRight: {x:+1, y:-1},
        downRight: {x:+1, y:+1}
    };

    position = function (x,y){
        //Add validators
        return {
            x: x,
            y: y
        };
    };
    
    size = function (width, height){
        //Add validators
        return {
            width: width,
            height: height
        };
    };    

    // any validation functions in the game to be defined here
    validators = {
        // Undefined
        checkUndefinedAndThrow: function (value) {
            if (value === undefined) {
                throw new Error(value + ' is undefined');
            }
        },
        // isInteger
        isInteger: function (value) {
            this.checkUndefinedAndThrow(value);
            return Number(value) === value && value % 1 === 0;
        },
        // Positive integer
        isPositiveInteger: function (value) {
            this.checkUndefinedAndThrow(value);
            return this.isInteger(value) && value > 0;
        },
        //Float
        isFloat: function (value) {
            this.checkUndefinedAndThrow(value);
            return Number(value) === value && value % 1 !== 0;
        },
        // Number
        isNumber: function (value) {
            this.checkUndefinedAndThrow(value);
            return !isNaN(parseFloat(value)) && isFinite(value);
        },
        // String
        isString: function (value) {
            this.checkUndefinedAndThrow(value);
            return (typeof value === 'string' || value instanceof String);
        },
        // Boolean
        isBoolean: function (value) {
            this.checkUndefinedAndThrow(value);
            return typeof value === 'boolean' || value === 'true' || value === 'false';
        },
        // Array
        isArray: function (value) {
            this.checkUndefinedAndThrow(value);
            return Array.isArray(value);
        },
        // Object
        isObject: function (value) {
            this.checkUndefinedAndThrow(value);
            return (typeof value === 'object');
        },
        //Position
        checkPositionAndThrow: function(value) {
            this.checkUndefinedAndThrow(value.x);
            this.checkUndefinedAndThrow(value.y);

            if(!this.isObject(value)){
                throw new Error (value + 'must be object');
            }
        },
        //Size
        checkSizeAndThrow: function(value) {
            this.checkUndefinedAndThrow(value.width);
            this.checkUndefinedAndThrow(value.height);
            
            if(!this.isObject(value)){
                throw new Error (value + 'must be object');
            }
        }
    };
}());
