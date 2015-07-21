function scoreModel() {
    'use strict';
    var scoreModelInternal,
        player,
        scoreBoard;

    // result from the function
    scoreModelInternal = {
        player: function (name, score) {
            return Object.create(player).init(name, score);
        },
        scoreBoard: function () {
            return Object.create(scoreBoard).init();
        }
    };

    // Player class, keeps information about player's name and score
    player = (function () {
        var playerInternal = Object.create({});

        Object.defineProperties(playerInternal, {
            init: {
                value: function (name, score) {
                    this.name = name;
                    this.score = score;
                    return this;
                }
            },
            name: {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._name = value;
                }
            },
            score: {
                get: function () {
                    return this._score;
                },
                set: function (value) {
                    // TODO: Add validators.............
                    this._score = value;
                }
            }
        });
        return playerInternal;
    }());

    // Scoreboard class, keeps information about all players, data can be saved in file
    scoreBoard = (function () {
        var scoreBoardInternal = Object.create({});

        Object.defineProperties(scoreBoardInternal, {
            init: {
                value: function () {
                    // TODO: initialize players array (maybe get data from a file if available)
                }
            },
            load: {
                value: function () {
                    // TODO: load players JSON object from a file
                }
            },
            save: {
                value: function () {
                    // TODO: Save players JSON object to a file
                }
            },
            addScore: {
                value: function (playerToAdd) {
                    // TODO: add playerToAdd in the array
                }
            },
            getTopPlayers: {
                value: function (n) {
                    // TODO: return top N players as array
                }
            }
        });
        return scoreBoardInternal;
    }());
    return scoreModelInternal;
}
