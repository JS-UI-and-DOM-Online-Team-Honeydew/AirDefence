var globals,
    validators;

(function () {
    'use strict';

    // any global variables in the game to be defined here
    globals = {
        gameHeight: 600,
        gameWidth: 800,
        gameBackground: './images/dark_blue.jpg',
        numberEnemies: 1,
        OTHER_CONSTANTS: 0
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
        }
    };
}());
