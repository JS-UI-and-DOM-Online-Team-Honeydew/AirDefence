var ObjectsModel = require('../src/scripts/gameObjectsModel.js');
var expect = require('chai').expect;


describe('Test for objects in the game.', function () {
    var CONSTS = {
                VALID: {
                    position: {x:26, y:206},
                    size: {width:400, height:400},
                    image: function(){
                        var img = new Image();
                        img.src = 'images/ivaylo_defalt.jpg';
                        return img;
                    },
                    speed: 4,
                    direction: {x:0, y:-1},
                    zIndex: 1
                },
                INVALID: {
                    position: {x:-15, y:-13},
                    image:  function(){
                        var img = new Image();
                        img.src = 'images/ifchouu.png';
                        return img;
                    },
                    speed: true,
                    size: {width:-20, height:700},
                    direction: {x:5, y:-1},
                    zIndex: 'hit you'
                }
            }

    describe('Enemy tests:', function () {
        var Enemy = function() {
            var enemy = Object.create(ObjectsModel.enemy).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex);
            return enemy;
        }

        it('1.expect enemy to be an function', function () {
            expect(Enemy).to.be.a('function');
        }),

        it('2.expect enemy to throw position error', function () {
            function positionError () {
                Object.create(ObjectsModel.enemy).init(CONSTS.INVALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex);
            }
            expect(positionError).to.throw();
        }),
        
        it('3.expect enemy to throw size error', function () {
            function sizeError () {
                Object.create(ObjectsModel.enemy).init(CONSTS.VALID.position, 
                    CONSTS.INVALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex);
            }
            expect(sizeError).to.throw();
        }),

        it('4.expect enemy to throw speed error', function() {
            function speedError () {
                Object.create(ObjectsModel.enemy).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.INVALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex);
            }
            expect(speedError).to.throw();
        }),

        it('5.expect enemy to throw speed error', function() {
            function directionError () {
                Object.create(ObjectsModel.enemy).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.INVALID.direction,
                    CONSTS.VALID.zIndex);
            }
            expect(directionError).to.throw();
        }),

        it('6.expect enemy to throw speed error', function() {
            function zIndexError () {
                Object.create(ObjectsModel.enemy).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.INVALID.zIndex);
            }
            expect(zIndexError).to.throw();
        })
    }),

    describe('Bomb tests:', function(){
        var Bomb = function() {
            var bomb = Object.create(ObjectsModel.bomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex,
                    6);
            return bomb;
        }


              it('1.expect bomb to be an function', function () {
            expect(Bomb).to.be.a('function');
        }),

        it('2.expect bomb to throw position error', function () {
            function positionError () {
                Object.create(ObjectsModel.bomb).init(CONSTS.INVALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex,
                    6);
            }
            expect(positionError).to.throw();
        }),
        
        it('3.expect bomb to throw size error', function () {
            function sizeError () {
                Object.create(ObjectsModel.bomb).init(CONSTS.VALID.position, 
                    CONSTS.INVALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex,
                    6);
            }
            expect(sizeError).to.throw();
        }),

        it('4.expect bomb to throw speed error', function() {
            function speedError () {
                Object.create(ObjectsModel.bomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.INVALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex,
                    6);
            }
            expect(speedError).to.throw();
        }),

        it('5.expect bomb to throw speed error', function() {
            function directionError () {
                Object.create(ObjectsModel.bomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.INVALID.direction,
                    CONSTS.VALID.zIndex,
                    6);
            }
            expect(directionError).to.throw();
        }),

        it('6.expect bomb to throw speed error', function() {
            function zIndexError () {
                Object.create(ObjectsModel.bomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.INVALID.zIndex,
                    6);
            }
            expect(zIndexError).to.throw();
        })
    }),
    
    describe('AeroBomb tests:', function(){
        var testRadar = function() {
            var radar = Object.create(ObjectsModel.landscapeItem).init(CONSTS.VALID.position,
                CONSTS.VALID.size,
                CONSTS.VALID.image,
                0, 
                CONSTS.VALID.direction,
                0);

            return radar;
        }
        var gameRadarRay = function() {
            var radarRey = Object.create(ObjectsModel.laserRay).init(4,
                0.1, 
                1, 
                88, 
                2, 
                1, 
                testRadar);

            return radarRey;
        }

        var AeroBomb = function() {
            var aeroBomb = Object.create(ObjectsModel.enemy).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex,
                    gameRadarRay);
            return aeroBomb;
        }


      it('1.expect aeroBomb to be an function', function () {
            expect(AeroBomb).to.be.a('function');
        }),

        it('2.expect aeroBomb to throw position error', function () {
            function positionError () {
                Object.create(ObjectsModel.aeroBomb).init(CONSTS.INVALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex,
                    CgameRadarRay);
            }
            expect(positionError).to.throw();
        }),
        
        it('3.expect aeroBomb to throw size error', function () {
            function sizeError () {
                Object.create(ObjectsModel.aeroBomb).init(CONSTS.VALID.position, 
                    CONSTS.INVALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex,
                    gameRadarRay);
            }
            expect(sizeError).to.throw();
        }),

        it('4.expect aeroBomb to throw speed error', function() {
            function speedError () {
                Object.create(ObjectsModel.aeroBomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.INVALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex,
                    gameRadarRay);
            }
            expect(speedError).to.throw();
        }),

        it('5.expect aeroBomb to throw speed error', function() {
            function directionError () {
                Object.create(ObjectsModel.aeroBomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.INVALID.direction,
                    CONSTS.VALID.zIndex,
                    gameRadarRay);
            }
            expect(directionError).to.throw();
        }),

        it('6.expect aeroBomb to throw speed error', function() {
            function zIndexError () {
                Object.create(ObjectsModel.aeroBomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.INVALID.zIndex,
                    gameRadarRay);
            }
            expect(zIndexError).to.throw();
        })
    }),

    describe('LandscapeItem tests:', function(){
        var LandscapeItem = function() {
            var landscapeItem = Object.create(ObjectsModel.bomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex);
            return landscapeItem;
        }


              it('1.expect landscapeItem to be an function', function () {
            expect(LandscapeItem).to.be.a('function');
        }),

        it('2.expect landscapeItem to throw position error', function () {
            function positionError () {
                Object.create(ObjectsModel.bomb).init(CONSTS.INVALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex);
            }
            expect(positionError).to.throw();
        }),
        
        it('3.expect landscapeItem to throw size error', function () {
            function sizeError () {
                Object.create(ObjectsModel.bomb).init(CONSTS.VALID.position, 
                    CONSTS.INVALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex);
            }
            expect(sizeError).to.throw();
        }),

        it('4.expect landscapeItem to throw speed error', function() {
            function speedError () {
                Object.create(ObjectsModel.bomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.INVALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.VALID.zIndex);
            }
            expect(speedError).to.throw();
        }),

        it('5.expect landscapeItem to throw speed error', function() {
            function directionError () {
                Object.create(ObjectsModel.bomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.INVALID.direction,
                    CONSTS.VALID.zIndex);
            }
            expect(directionError).to.throw();
        }),

        it('6.expect bomb to throw speed error', function() {
            function zIndexError () {
                Object.create(ObjectsModel.bomb).init(CONSTS.VALID.position, 
                    CONSTS.VALID.size, 
                    CONSTS.VALID.image,
                    CONSTS.VALID.speed,
                    CONSTS.VALID.direction,
                    CONSTS.INVALID.zIndex);
            }
            expect(zIndexError).to.throw();
        });
    });   
});
        



        