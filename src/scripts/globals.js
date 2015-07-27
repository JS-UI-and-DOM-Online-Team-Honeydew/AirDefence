var globals,
    validators,
    trigonometry,
    position,
    size,
    direction,
    imgResources,
    configuration;

(function () {
    'use strict';

    // any global variables in the game to be defined here
    globals = {
        gameHeight: 600,
        gameWidth: 800,
        gameBackground: './images/dark_blue.jpg',
        numberEnemies: 1,
        OTHER_CONSTANTS: 0,
        defaltImg:'images/ivaylo_defalt.jpg'
    };

    // Game configuration data
    configuration = {
        laserSpeed: {
            name: 'Laser Speed', // Name to be displayed in HTML control
            value: 0.2, // Init value
            minValue: 0.1, // Minimum allowed value
            maxValue: 2, // Maximum allowed value
            step: 0.1, // Change Step
            scoreWeight: function() { // Formula to calculate the score
                return (this.maxValue - this.minValue / 2) * this.value;
            }
        },
        rangeSpeed: {
            name: 'Laser Range Speed',
            value: 2,
            minValue: 1,
            maxValue: 10,
            step: 1,
            scoreWeight: function() {
                return (this.maxValue - this.minValue / 2) * this.value;
            }
        },
        rayWidth: {
            name: 'Radar Ray Width',
            value: 6,
            minValue: 4,
            maxValue: 20,
            step: 1,
            scoreWeight: function() {
                return (this.maxValue - this.minValue / 2) * this.value;
            }
        },
        targetSpeed: {
            name: 'Target Speed',
            value: 2,
            minValue: 1,
            maxValue: 5,
            step: 1,
            scoreWeight: function() {
                return (this.maxValue - this.minValue / 2) * this.value;
            }
        }
    }
    
    //Preloading img resources:
    imgResources = function(){
        var imgResources = {
            target: new Image(),
            radar: new Image(),
            tree: new Image(),
            explosion: new Image(),
            bomb: new Image(),
            newGame: new Image()           
        };
        imgResources.target.src = 'images/spaceship.png';
        imgResources.radar.src = 'images/radar.png';
        imgResources.tree.src = 'images/tree.png';
        imgResources.explosion.src = 'images/explosion.png';
        imgResources.bomb.src = 'images/bomb.png';
        imgResources.newGame.src = 'images/new_game.png';
       return imgResources; 
    }();
    

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
        // Angle direction
        isAngleDirection: function(value){
            this.checkUndefinedAndThrow(value);
            return (value == 1 || value == -1);
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
        },
        //Image
        checkImageAndChange: function(img_url){
            //currently not used -
            // var img = new Image();
            // img.src = img_url;
            // if (img.complete) {
                return img_url;
            // } else {
            //     return globals.defaltImg;
            // }
        },
        //Is a Function
        isFunction : function (functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }
    };
    trigonometry = {
        //converts degrees to radians
    	toRad: function (degrees){
    		return 3.14/180 * degrees;
    	},
        //converts radians to degrees
    	toDeg:function (radians){
    		return 180/3.14 * radians;
    	},
        //calculates reverse angle from the target
    	angleToTarget: function (radar, target){
    		return this.toDeg(Math.atan((radar.position.y - target.position.y) / (target.position.x - radar.position.x)));
    	},
        // Distance between two game objects
    	distanceBetween: function (obj1, obj2){
    		var cat1 = Math.abs(obj2.position.x - obj1.position.x),
        		cat2 = Math.abs(obj1.position.y - obj2.position.y);
    		return Math.sqrt(cat1 * cat1 + cat2 * cat2);
    	}
    };
}());
