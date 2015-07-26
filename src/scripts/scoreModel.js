function scoreModel() {
    'use strict';
    var scoreModelInternal,
        player,
        scoreBoard;

    // result from the function
    scoreModelInternal = {
        player: function (name) {
            return Object.create(player).init(name);
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
                value: function (name) {
                    this.name = name;
                    this.score = 0;
                    return this;
                }
            },
            name: {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                   if(value.length < 3){
                       throw new Error('The length of the name must be between 3-10 letters.');
                   }
                   if(value.length > 10){
                       throw new Error('The length of the name must be between 3-10 letters.');
                   }
                    this._name = value;
                }
            },
            score: {
                get: function () {
                    return this._score;
                },
                set: function (value) {
                    //check if it is type of number
                    if(typeof value != "number"){
                        throw new Error("Score must be a number.");
                    }
                    
                    if(value < 0){
                        throw new Error('Score cannot be negative.');
                    }
                    this._score = value;
                }
            }
        });
        return playerInternal;
    }());

    // Scoreboard class, keeps information about all players, data can be saved in file
    scoreBoard = (function () {
        var scoreBoardInternal = Object.create({}),
            playersAndScores = [] ;

        Object.defineProperties(scoreBoardInternal, {
            init: {
                value: function () {
                    // TODO: initialize players array (maybe get data from a file if available)
                    playersAndScores = [];
                    playersAndScores.push(JSON.parse(localStorage.getItem("scoreboard")));
                    return playersAndScores;
                }
            },
            load: {
                value: function () {
                    // TODO: load players JSON object from a file
                    playersAndScores = [];
                    playersAndScores.push(JSON.parse(localStorage.getItem("scoreboard")));
                    return playersAndScores;
                    
                }
            },
            save: {
                value: function (player) {
                    var newPlayer,
                        playerExists = false,
                        everyPlayer;
                    // TODO: Save players JSON object to a file
                    
                    // Checks if such a player exists, and if so checks if current score is more than last saved to update it.
                    playersAndScores = [];
                    playersAndScores.push(JSON.parse(localStorage.getItem("scoreboard")));
                    for (everyPlayer in playersAndScores){
                        if(player.name == playersAndScores[everyPlayer].name){
                            playerExists = true;
                            if(player.score > playersAndScores[everyPlayer].score){
                                 playersAndScores[everyPlayer].score = player.score;
                            }
                            break;
                        }
                    }
                    
                    //Addig player if it does not exists.
                    if(!playerExists){
                        newPlayer = {
                            "name":player.name,
                            "score":player.score
                        };
                        playersAndScores.push(newPlayer);
                        localStorage.setItem("scoreboard",JSON.stringify(playersAndScores));
                    }
                    
                }
            },
            addScore: {
                value: function (playerToAdd) {
                    //Adding one score to the current score of the player.
                    playerToAdd.score += 1;
                }
            },
            getTopPlayers: {
                value: function (n) {
                    // Returning scores of players in ascending order.
                    playersAndScores = [];
                    playersAndScores.push(JSON.parse(localStorage.getItem("scoreboard")));
                    playersAndScores.sort(function(a,b){
                        return a.score - b.score;
                    });
                    return playersAndScores;
                }
            }
        });
        return scoreBoardInternal;
    }());
    return scoreModelInternal;
}
