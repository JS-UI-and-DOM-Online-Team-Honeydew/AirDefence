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
            
            
            function parseCurrentPlayersAndScores(){
                playersAndScores = JSON.parse(localStorage.getItem("scoreboard"));
                    if(playersAndScores === null || typeof playersAndScores == "undefined"){
                        playersAndScores = [];
                    }
            }
            
        Object.defineProperties(scoreBoardInternal, {
            init: {
                value: function () {
                    
                    parseCurrentPlayersAndScores();
                    return this;
                }
            },
            load: {
                value: function () {
                    
                   parseCurrentPlayersAndScores();
                   return playersAndScores;
                    
                }
            },
            save: {
                value: function (player) {
                    var newPlayer,
                        playerExists = false,
                        everyPlayer;
                        parseCurrentPlayersAndScores();
                        
                    
                    
                    // Checks if such a player exists, and if so checks if current score is more than last saved to update it.
                    for (everyPlayer in playersAndScores){
                        //Checks if there are any players in the array, if there are not it breaks;
                        if(playersAndScores.length<1){
                            break;
                        }
                        if(player.name == playersAndScores[everyPlayer].name){
                            playerExists = true;
                            if(player.score > playersAndScores[everyPlayer].score){
                                 playersAndScores[everyPlayer].score = player.score;
                            }
                            break;
                        }
                    }
                    
                    //Addig player if it does not exists.
                    if(!playerExists && player.score > 0){
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
                value: function () {
                    var topPlayersAndScores;
                    parseCurrentPlayersAndScores();
                    
                    // Returning the players by score in ascending order.
                    topPlayersAndScores = playersAndScores.sort(function(a,b){
                        return b.score - a.score;
                    });
                    return topPlayersAndScores;
                }
            }
        });
        return scoreBoardInternal;
    }());
    return scoreModelInternal;
}
