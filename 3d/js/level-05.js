(function ( w, d, GAME ) {
  'use strict';


  var _y_zero = 250;
  var GAME_OBJ = {

        ///////////////////////////////////////////////////////////////////
        // OBJECTS (TOOLS, ITEMS, DECORATIONS ETC)
        ///////////////////////////////////////////////////////////////////
        // invisible plane
        'obj-invis-1' : {
          id:'obj-invis-1',
          type: 'object',
          clss:'invis',
          walk: true,
          cast_shadow: false,
          geom:[]
        },
        'obj-decal-normals' : {
          id:'obj-decal-normals',
          type: 'object',
          clss:'decal',
          width:80, height:240,
          walk: true,
          cast_shadow: false,
          geom:[]
        },
        'obj-decal-web-1' : {
          id:'obj-decal-web-1',
          type: 'object',
          clss:'decal-web',
          walk: true,
          cast_shadow: false,
          geom:[]
        },

        ///////////////////////////////////////////////////////////////////
        // GEOMETRY (WALLS, FLOORS, LANDSCAPE ETC)
        ///////////////////////////////////////////////////////////////////
        'ramp-water-1': {
          qv:1,

          clss:'cave-water-ramp',
          width:  150,
          height: 250,
          walk: true,
          cast_shadow:false,
          no_shadow:true,
          isnew:true,

          x:-250, y:0, z:0,
          transform:'rotateX(90deg) rotateY(45deg) rotateZ(-90deg)',
          vertices: function (width, height)  {}
        },


        'obj-plank' : {
            id:'obj-plank',
            img : '3d/wood-2.jpg',
            type: 'object',
            clss: 'chair plank',
            walk: true,
            cast_shadow:true,
            isnew:true,

            geom:[
              {
                clss:'box',
                shape:'rectangle',
                //transform:'translate3d(14px, 0px, 14px)',
                sides:{back:1, front:1, bottom:1},
                shape_args:[680, 15, 20]
              }
            ]
        },

        // test shape
        'obj-shape-chair' : {
            id:'obj-shape-chair',
            img : '3d/blank.jpg',
            type: 'object',
            clss: 'chair',
            walk: true,
            cast_shadow:true,
            isnew:true,

            geom:[

              {
                clss:'box',
                shape:'rectangle',
                transform:'translate3d(14px, 0px, 14px)',
                shape_args:[5, 40, 5]
              },

              {
                clss:'box',
                shape:'rectangle',
                transform:'translate3d(-14px, 0px, 14px)',
                shape_args:[5, 40, 5]
              },

              {
                clss:'box',
                shape:'rectangle',
                transform:'translate3d(-14px, 0px, -14px)',
                shape_args:[5, 40, 5]
              },

              {
                clss:'box',
                shape:'rectangle',
                transform:'translate3d(14px, 0px, -14px)',
                shape_args:[5, 40, 5]
              },

              {
                clss:'box',
                shape:'rectangle',
                transform:'translate3d(0px, -20px, 0px)',
                // sides:{top:1, back:1, left:1},
                shape_args:[40, 2, 40]
              },

          ]
        },

        'obj-crate-2' : {
            id:'obj-crate-2',
            type: 'object',
            clss: 'crate-big',
            img:'3d/wood-2.jpg',
            walk: true,
            cast_shadow:false,

            geom:[

              {
                clss: 'top',
                width: 100,
                height:100,
                tag:'div',

                cast_shadow:true,
                transform:'translate3d(-50px,-100px,0px) rotateX(90deg)',

                vertices: function( width, height ) {
                    return [
                      new Vector( -width/2, -50,  height/2 ),
                      new Vector(  width/2, -50,  height/2 ),
                      new Vector(  width/2, -50, -height/2 ),
                      new Vector( -width/2, -50, -height/2 )
                    ];
                }
              },

              {
                clss: 'left',
                width: 100,
                height:100,
                tag:'div',
                transform:'translate3d(-100px, -50px, 0px) rotateY(-90deg)',

                cast_shadow:true,

                vertices: function( width, height ) { // ####
                    return [
                        new Vector( -width / 2,   height/2,  -width/2 ),
                        new Vector( -width / 2,   height/2,   width/2 ),
                        new Vector( -width / 2,  -height/2,   width/2 ),
                        new Vector( -width / 2,  -height/2,  -width/2 )
                    ];
                }
              },

              {
                clss: 'right',
                width: 100,
                height:100,
                tag:'div',
                transform:'translate3d(0px, -50px, 0px) rotateY(90deg)',

                cast_shadow:true,

                vertices: function( width, height ) { // ####
                    return [
                        new Vector( width / 2,   height/2,   width/2 ),
                        new Vector( width / 2,   height/2,  -width/2 ),
                        new Vector( width / 2,  -height/2,  -width/2 ),
                        new Vector( width / 2,  -height/2,   width/2 )
                    ];
                }
              },


              {
                clss: 'front', // -50px, -50px, 50px
                width: 100,
                height:100,
                tag:'div',
                transform:'translate3d(-50px, -50px, 50px) rotateY(0deg)',

                cast_shadow:true,

                vertices: function( width, height ) {
                    return [
                        new Vector( -width/2,   height/2,  width/2 ),
                        new Vector(  width/2,   height/2,  width/2 ),
                        new Vector(  width/2,  -height/2,  width/2 ),
                        new Vector( -width/2,  -height/2,  width/2 )
                    ];
                }
              },


              {
                clss: 'back',
                width: 100,
                height:100,
                tag:'div',
                transform:'translate3d(-50px, -50px, -50px) rotateY(180deg)',

                cast_shadow:true,

                vertices: function( width, height ) {
                    return [
                        new Vector(  width / 2,   height/2,  -width/2 ),
                        new Vector( -width / 2,   height/2,  -width/2 ),
                        new Vector( -width / 2,  -height/2,  -width/2 ),
                        new Vector(  width / 2,  -height/2,  -width/2 )
                    ];
                }
              }
              // ---
            ]
        },

        'obj-barrel-1' : {
            id:'obj-barrel-1',
            img : '3d/wood-2.jpg',
            type: 'object',
            clss: 'book barrel',
            walk: true,
            cast_shadow:true,
            isnew:true,

            geom:[
              {
                clss:'tube',
                shape:'tube',
                shape_args:[80, 110, 8, 1, 0]
              }
//              {
//                clss:'cone',
//                shape:'cone',
//                transform:'translate3d(0px,0px,-30px)',
//                shape_args:[40, 60, 8, 1]
//              },

            ]
        },

        'obj-barrel-2' : {
            id:'obj-barrel-2',
            img : '3d/wood-1.jpg',
            type: 'object',
            clss: 'book barrel',
            walk: true,
            cast_shadow:true,
            isnew:true,

            geom:[
              {
                clss:'tube',
                shape:'tube',
                shape_args:[70, 70, 8, 1, 0]
              }
            ]
        },

        'obj-barrel-3' : {
            id:'obj-barrel-3',
            img : '3d/wood-1.jpg',
            type: 'object',
            clss: 'book barrel',
            walk: true,
            cast_shadow:true,
            isnew:true,

            geom:[
              {
                clss:'tube',
                shape:'tube',
                shape_args:[140, 160, 10, 1, 0]
              }
            ]
        },

        // stairs up
        'obj-shape-2' : {
            id:'obj-shape-2',
            // img : '3d/debug_square.jpg',
            img:'3d/dungeon-floor-3_lossy.jpg',
            type: 'object',
            clss: 'book',
            walk: true,
            cast_shadow:true,
            isnew:true,

            geom:[
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(0, 0, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15/2, -15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15, -15, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15-15/2, -15-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*2, -15*2, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*2-15/2, -15*2-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*3, -15*3, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*3-15/2, -15*3-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*4, -15*4, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*4-15/2, -15*4-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*5, -15*5, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*5-15/2, -15*5-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*6, -15*6, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*6-15/2, -15*6-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*7, -15*7, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*7-15/2, -15*7-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*8, -15*8, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*8-15/2, -15*8-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*9, -15*9, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*9-15/2, -15*9-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*10, -15*10, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*10-15/2, -15*10-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*11, -15*11, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*11-15/2, -15*11-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              /*
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*12, -15*12, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*12-15/2, -15*12-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },*/

              /////////// side
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[180, 180, false, new Vector(-90, -90 + 15/2, 75), 'middle', 'rotateY(180deg) rotateX(0deg)']
              },
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[180, 180, false, new Vector(-90, -90 + 15/2, -75), 'middle', 'rotateY(0deg) rotateX(0deg)']
              }
            ]
        },


        /*
        'obj-shape-3' : {
            id:'obj-shape-2',
            img : '3d/level-05/dungeon-arch-1.png',
            type: 'object',
            clss: 'book',
            walk: true,
            cast_shadow:true,
            isnew:true,

            geom:[
              {
                //tag:'img',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[440, 170, false, null, 'middle', 'rotateY(-90deg)']
              }
            ]
        },
        */


        // floors
        'dungeon-floor-1': {
          clss:'dungeon-floor-1',
          img:'3d/dungeon-floor-3_lossy.jpg',
          width:  500,
          height: 500,
          walk: true,
          cast_shadow:false,
          isnew:true,
          tag:'img',

          x:-250, y:0, z:0,
          transform:'rotateX(90deg)',

          vertices: function (width, height)  {}
        },
        'dungeon-floor-1-h150': {
          extends:'dungeon-floor-1',
          clss:'dungeon-floor-1 h150',
          height: 150,
          vertices: function (width, height)  {}
        },
        'dungeon-floor-1-w180': {
          extends:'dungeon-floor-1',
          clss:'dungeon-floor-1 w180',
          width: 180,
          vertices: function (width, height)  {}
        },
        'dungeon-floor-1-h175': {
          extends:'dungeon-floor-1',
          clss:'dungeon-floor-1 h175',
          height:  175,
          cast_shadow:true,
          vertices: function (width, height)  {}
        },
        'dungeon-floor-1-h175-w180': {
          extends:'dungeon-floor-1',
          clss:'dungeon-floor-1 h175 w180',
          height:  175,
          cast_shadow:true,
          width: 180,
          vertices: function (width, height)  {}
        },

        'dungeon-wall-1': {
          clss:'dungeon-wall-1',
          img:'3d/wall-dungeon2_lossy.jpg',
          width:  500,
          height: 400,
          walk:   false,
          cast_shadow: true,
          isnew:true,
          tag:'img',

          x:-250, 
          y:0,
          z:0,

          transform:'rotateY(-90deg)',
          vertices: function (width, height)  {}
        },
        'dungeon-wall-3': {
          extends: 'dungeon-wall-1',
          transform:'rotateY(90deg)',
          vertices: function (width, height)  {}
        },

        'dungeon-wall-2': {
          extends: 'dungeon-wall-1',
          // clss:'dungeon-wall-1 h260',
          // height: 260,
          transform:' rotateY(180deg)',
          vertices: function (width, height)  {}
        },
        'dungeon-wall-2-w180': {
          extends: 'dungeon-wall-2',
          clss:'dungeon-wall-1 w180',
          width:  180,
          vertices: function (width, height)  {}
        },
        'dungeon-wall-2-h260' : {
          extends: 'dungeon-wall-2',
          clss:'dungeon-wall-1 h260',
          cast_shadow: true,
          height:  260,
          vertices: function (width, height)  {}
        },
        'dungeon-wall-4': {
          extends: 'dungeon-wall-1',
          transform:' rotateY(0deg)',
          vertices: function (width, height)  {}
        },
        'dungeon-wall-4-h260' : {
          extends: 'dungeon-wall-4',
          clss:'dungeon-wall-1 h260',
          cast_shadow: true,
          height:  260,
          vertices: function (width, height)  {}
        },
        'dungeon-wall-4-w180': {
          extends: 'dungeon-wall-4',
          clss:'dungeon-wall-1 w180',
          width:  180,
          transform:' rotateY(0deg)',
          vertices: function (width, height)  {}
        },
        'dungeon-wall-1-w180': {
          extends: 'dungeon-wall-1',
          clss:'dungeon-wall-1 w180',
          width:  180,
          transform:' rotateY(-90deg)',
          vertices: function (width, height)  {}
        },

        // ceilings
        'dungeon-ceil-1': {
          clss:'dungeon-ceil-1',
          img:'3d/dungeon-ceiling-2_lossy.jpg',
          width:  500,
          height: 500,
          walk: true,
          cast_shadow:false,
          isnew:true,
          tag:'img',

          x:-250, y:0, z:0,
          transform:' rotateX(-90deg)',

          vertices: function (width, height)  {}
        },
        'dungeon-ceil-1-w180': {
          extends:'dungeon-ceil-1',
          clss:'dungeon-ceil-1 w180',
          width:  180,
          height: 500,
          vertices: function (width, height)  {}
        },

        // ceiling ramp like
        'ceil-diagon-2': {
          clss:'dungeon-wall-1 h100',
          img:'3d/wall-dungeon2_lossy.jpg',
          width:  500,
          height: 100,
          walk:   false,
          cast_shadow: true, // true
          isnew:true,
          tag:'img',

          x:-250, 
          y:0,
          z:0,

          transform:' rotateY(180deg) rotateX(-49deg)',
          vertices: function (width, height)  {}
        },

        'ceil-diagon-4': {
          extends: 'ceil-diagon-2',
          img:'3d/wall-dungeon2_lossy.jpg',
          tag:'img',

          x:-250, y:0, z:0,
          transform:' rotateY(0deg) rotateX(-48deg)',
          isnew:true,
          vertices: function (width, height)  {}
        },
        // -----
  };


  var LEVEL = {
      TITLE:'05-STORAGE-ROOM',

      SETTINGS: {
        FRUSTRUM_SKIP : 3
      },
      PRELOAD:[
        '3d/caret-1.png',
        '3d/wall-dungeon_lossy.jpg',
        '3d/level-05/noose.png',
        '3d/wood-2.jpg',
        '3d/level-05/wine-rack-2.jpg',
        '3d/level-05/hand-art.jpg'
      ],
      MOVE : {
        rot:{x:-20,y:-90,z:0},
        move:{x:-350,y:0,z:-80}
      },
      INIT: function ( lvl ) {
        if (!GAME.State.flags.lvl5) GAME.State.flags.lvl5 = {};

        // shape-2
        GAME.LEVEL.MAP.NODES['shape-2'].vertices = [
          GAME.LEVEL.MAP.NODES['shape-2'].geom[0].vertices[0],
          GAME.LEVEL.MAP.NODES['shape-2'].geom[0].vertices[1],
          GAME.LEVEL.MAP.NODES['shape-2'].geom[23].vertices[2],
          GAME.LEVEL.MAP.NODES['shape-2'].geom[23].vertices[3]
        ];

        setTimeout(function(){
          GAME.ACTIONS.DialogCover (0);

          if (false) // !GAME.State.flags.lvl5.intro)
          {
            GAME.State.flags.lvl5.intro = true;
            
            setTimeout(function(){
              GAME.ACTIONS.SetText ( 'intro', 0);
            },300);
          }
          else
          {
            setTimeout(function(){
              GAME.ACTIONS.DialogClose ();
            },300);
          }

        }, 500);


        // ------
        if (!GAME.State.flags.lvl5.churchOrgan)
        {
            var skip = true;
            GAME.OnRender = function () {
              skip = !skip;
              if (skip) return ;

              var node = GAME.LEVEL.MAP.NODES['decal-noose'];
              if (!node) {
                GAME.OnRender = null;
                return ;
              }

              if (GAME.UTILS.IsVisible(node) )
              {
                        var dist = GAME.UTILS.Distance ( node );

                        if (dist < 740) {
                          GAME.State.flags.lvl5.churchOrgan = true;
                          GAME.Sound.Play ('sound-music-1');

                          GAME.OnRender = null;
                        }
              }
            };
        }
        // ---
      },

      DESTROY: function() {
        // remove all elements
        GAME.OnRender = null;
        GAME.Sound.Stop ('sound-music-1');

        var move = document.getElementById('move');
        move.innerHTML = '';
      },

      ACTIVE_MAP : [],
      LIT : [],
      WALLS:[],
      MAP:
      {
            MAIN: 'floor-1',
            NODES : {

              'floor-1' : { type:'dungeon-floor-1-h150',
                    connected:[
                          { id:'ramp-1', source:3, target:2 },
                          { id:'wall-left-1', source:2, target:2 },
                          { id:'wall-right-1', source:0, target:2 },
                          { id:'floor-0', source:1, target:3 }
              ]},
              'floor-0' : { type:'dungeon-floor-1-h150', connected:[
                { id:'door-0', source:1, target:2 }
              ]},

              'door-0': { type:'dungeon-wall-1-w180'},

              'floor-a' : {type:'dungeon-floor-1-h150', connected:[
                { id:'floor-b', source:0, target:2 },
                { id:'floor-c', source:2, target:0 },
                { id:'wall-sto-main-1', source:3, target:2 }
              ]},

              'floor-b' : {type:'dungeon-floor-1-h175', connected:[
                { id:'floor-3', source:0, target:2 }
              ]},
              'floor-c' : {type:'dungeon-floor-1-h175', connected:[
                { id:'wall-sto-left-1', source:2, target:2 }
              ]},

              'floor-3' : { type:'dungeon-floor-1', connected:[
                { id:'floor-4', source:1, target:3 },
                { id:'wall-sto-right-1', source:0, target:2 },
                { id:'wall-sto-main-2', source:3, target:2 },
                { id:'floor-alch-1', source:3, target:1 }
              ]},
              'ramp-1': { type:'ramp-water-1', connected:[
                { id:'floor-a', source:0, target:1 }
              ]},

              'wall-left-1' : { type:'dungeon-wall-2-h260', connected:[
                {id:'wall-left-1-ceil', source:0, target:2},
                {id:'wall-left-0', source:3, target:1}
              ]},
              'wall-right-1' : { type:'dungeon-wall-4-h260', connected:[
                {id:'wall-right-1-ceil', source:0, target:2},
                {id:'wall-right-0', source:1, target:3}
              ]},

              'wall-left-0' : { type:'dungeon-wall-2-h260', connected:[
                {id:'wall-left-0-ceil', source:0, target:2}
              ]},
              'wall-right-0' : { type:'dungeon-wall-4-h260', connected:[
                {id:'wall-right-0-ceil', source:0, target:2}
              ]},

              'wall-sto-left-1': { type:'dungeon-wall-2', connected:[
                {id:'wall-sto-left-2', source:3, target:1}
              ]},
              'wall-sto-left-2': { type:'dungeon-wall-2-w180', connected:[
                { id:'floor-6', source:2, target:2 }
              ]},

              'wall-sto-right-1': { type:'dungeon-wall-4'},
              'wall-sto-right-2': { type:'dungeon-wall-4-w180'},
              'wall-sto-right-3': { type:'dungeon-wall-1', walk:true, img:'3d/level-05/wall-arch.png', alpha:1, alpha_mask:1},
              //'wall-sto-right-4': { type:'dungeon-wall-1-w180'},
              //'wall-sto-right-5': { type:'dungeon-wall-1-w180'},

              'wall-sto-main-1' : { type: 'dungeon-wall-3', img:'3d/level-05/wine-rack-2.jpg' },
              'wall-sto-main-2' : { type: 'dungeon-wall-3' },
              'wall-sto-main-3' : { type: 'dungeon-wall-1', connected:[
                { id:'ceil-1', source:0, target: 1},
                { id:'wall-sto-right-3', source:1, target:3 }
              ]},

              'floor-4' : { type:'dungeon-floor-1-w180', connected:[
                { id:'floor-5', source:2, target:0 },
                { id:'wall-sto-main-3', source:1, target:2 },
                { id:'wall-sto-right-2', source:0, target:2 }
              ]},
              'floor-5' : { type:'dungeon-floor-1-h175-w180'},
              'floor-6' : { type:'dungeon-floor-1-h175-w180', connected:[
                // { id:'wall-sto-right-4', source:1, target:2 }
              ]},

              'wall-left-0-ceil' : { type:'ceil-diagon-2' },
              'wall-right-0-ceil' : { type:'ceil-diagon-4' },
              'wall-left-1-ceil' : { type:'ceil-diagon-2' },
              'wall-right-1-ceil' : { type:'ceil-diagon-4' },

              'ceil-1' : { type:'dungeon-ceil-1', connected:[
                { id:'ceil-3', source:3, target:1 },
                { id:'ceil-2', source:0, target:2 }
              ]},
              'ceil-2' : { type:'dungeon-ceil-1', connected:[
                { id:'ceil-4', source:3, target:1 }
              ]},
              'ceil-3' : { type:'dungeon-ceil-1-w180'},
              'ceil-4' : { type:'dungeon-ceil-1-w180'},

              'shape-2' : {
                object:1,
                type:'obj-shape-2',
                transform:'translate3d(-247px, 246px, 75px)',

                 ramp:1, ramp_start:-150, angle:155
              },

              /*
              'shape-3' : {
                object:1,
                type:'obj-shape-3',
                transform:'translate3d(-250px, 15px, 72px)',
                alpha:1,alpha_mask:1
              },
              */

              'barrel-1' : {
                object:1,
                type:'obj-barrel-1',
                cast_shadow:true,
                transform:'translate3d(-430px, 18px, 240px)'
              },

              /*
              'barrel-2' : {
                object:1,
                type:'obj-barrel-1',
                transform:'translate3d(-830px, 18px, 240px)'
              },

              'barrel-3' : {
                object:1,
                type:'obj-barrel-2',
                transform:'translate3d(-830px, 32px, 140px)'
              },
              */

              'barrel-4' : {
                object:1,
                type:'obj-barrel-3',
                cast_shadow:true,
                transform:'translate3d(-658px, -10px, 212px) rotateX(90deg)'
              },

              
              'barrel-5' : {
                object:1,
                type:'obj-barrel-3',
                cast_shadow:true,
                transform:'translate3d(-835px, -10px, 25px) rotateX(90deg) rotateZ(90deg)'
              },

              'barrel-6' : {
                object:1,
                type:'obj-barrel-3',
                cast_shadow:true,
                transform:'translate3d(-835px, -10px, -130px) rotateX(90deg) rotateZ(90deg)'
              },

              /*
              'barrel-5' : {
                object:1,
                type:'obj-barrel-3',
                transform:'translate3d(-822px, -10px, 212px) rotateX(90deg)'
              },

              
             'shape-chair' : {
                object:1,
                type:'obj-shape-chair',
                transform:'translate3d(-500px, 53px, -200px)'
              },*/


             'shape-plank' : {
                object:1,
                type:'obj-plank',
                transform:'translate3d(-586px, -319px, -520px)'
              },
              'crate-big' : {
                object: 1,
                type :'obj-crate-2',
                // transform:'translate3d(-380px, 23px, -525px) rotateY(18deg)'
                transform:'translate3d(-540px, 23px, -525px) rotateY(18deg)'
              },
 

              /*
               'decal-noose-shadow' : {
                object:1,
                type:'obj-decal-normals',
                noel:true,
                img:'3d/level-05/noose.png',
                cast_shadow:true,
                alpha:1, alpha_mask:1,
                width:80, height:240,
                transform:'translate3d(-580px, -300px, -320px) rotateY(0deg)',
                vertices:true
              },
              */

               'decal-hand-art' : {
                object:1,
                type:'obj-decal-normals',
                img:'3d/level-05/hand-art.jpg',
                cast_shadow:false,
                width:125, height:180,
                transform:'translate3d(-620px, -270px, -672px)',
                vertices:true
              },

              'rope' : {
                object:1,
                pickable:1,
                hidden:true,
                desc: 'A noose repurposed',
                icon:'3d/level-05/rope.png',
                type:'obj-decal-web-1',
                transform:'translate3d(0,0,0)',
                cast_shadow:false,
                no_shadow:true
              },

              'decal-noose' : {
                hidden: GAME.State.flags.lvl5 && GAME.State.flags.lvl5.ropePicked,
                object:1,
                type: 'obj-decal-normals',
                clss:'decal-noose',
                img:'3d/level-05/noose.png',
                cast_shadow:true,
                alpha:1, alpha_mask:1,
                width:80, height:240,
                brightness:10,
                // transform:'translate3d(-420px, -425px, -520px) rotateY(-24deg)',
                transform:'translate3d(-580px, -400px, -520px) rotateY(0deg)',
                overlay:true,
                vertices:true,
                interact: function( e ) {
                    if (!GAME.State.control) return ;

                    var dist = GAME.UTILS.Distance ( this );
                    if (dist > 620) {
                        GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                        return ;
                    }

                    // ---
                    if (GAME.INV.active_item)
                    {
                              var act_item = GAME.INV.active_item;
                              if (act_item.getAttribute('data-id') !== 'rusty-knife')
                              {
                                GAME.ACTIONS.SetActiveText ( 'items', 1, true, 'old' );
                                GAME.INV.Deselect ();
                              }
                              else
                              {
                                // cut the rope!!!
                                GAME.INV.RemoveItem ( act_item.getAttribute('data-index') / 1 );

                                var node = GAME.LEVEL.MAP.NODES['decal-noose'];
                                node.el.parentNode.removeChild( node.el );
                                node.hidden = true;

                                var item = GAME.LEVEL.MAP.NODES['rope'];
                                GAME.INV.AddItem ( item );
                                GAME.State.flags.lvl5.ropePicked = true;

                                GAME.INV.Deselect ();
                              }
                              // --

                              return ;
                    }

                    // ---
                    GAME.ACTIONS.SetText ( 'noosetxt', 0, function(){
                      GAME.ACTIONS.DialogAsk ('noosetxt', 1, 0, function ( choice, html ) {
                          GAME.ACTIONS.DialogClose ();
                          if (choice === 1)
                          {
                            return ;
                          }

                          // ---
                          // wear the noose  ####
                          GAME.State.control = 0;

                          GAME.ACTIONS.SetText ( 'noosetxt', 2, function(){
                            GAME.ACTIONS.SetText ( 'noosetxt', 3, function(){
                                alert("GAME OVER");
                            });
                          });
                      });
                    });



                  }
              },

              'lvl-2-door' : {
                object:1,
                width:100,
                height:240,
                type:'obj-invis-1',
                interact: function( e ) {
                      if (!GAME.State.control) return ;

                      var dist = GAME.UTILS.Distance ( this );
                      if (dist > 600) {
                        GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                        return ;
                      }

                      var dist_min = 180, dist_max = 700;

                      if (dist < dist_min) dist = 1;
                      else if (dist > dist_max) dist = 0;
                      else {
                        dist = 1 - ((dist - dist_min) / (dist_max - dist_min));
                        dist = dist.toFixed(2) / 1;
                      }

                      GAME.Sound.Play ('sound-door-creak-1', dist, true);
                      GAME.UTILS.LoadLevel2('02', 'storage');
                },
                transform:'translate3d(648px, 0px, 75px) rotateY(-90deg)'
              },




              'floor-alch-1' : {type:'dungeon-floor-1-h150'}
              // window
              // foo.style.cssText = 'transform: translate3d(-620px, -285px, -672px) rotateY(0deg);width: 80px;background: red;height: 80px';

              // ---

            },

            LIGHTS: {
              'ambience' : {color:{r:200,g:200,b:200}, intensity: 0.05, active: 1},

              //'light-door' : {x:340, y:60, z:66, intensity:1, color:{r:60,g:60,b:220}, shadow:1, max_distance:570, drawIcon:0, active:1}, // active 1
              'light-hang-focus' : {x:-540, y:-265, z:-440, intensity:2, color:{r:160,g:40,b:30}, shadow:1, max_distance:460, drawIcon:1, active:1, spot:1, target:new Vector(-525, -0, -520), radius:400}, // active 1
              'light-barrel' : {x:-440, y:-10, z:-80, intensity:1.25, color:{r:80,g:80,b:240}, shadow:1, max_distance:500, drawIcon:1, active:1, spot:1, target:new Vector(-404, 0, -50), radius:910  },
              'light-torch' : {x:-480, y:32, z:80, intensity:1, color:{r:185,g:90,b:40}, shadow:1, max_distance:600, drawIcon:1, active:1},
              'light-exit' : {x:-800, y:-160, z:-430, intensity:0.4, color:{r:80,g:120,b:240}, shadow:1, max_distance:540, drawIcon:1, active:1}



// 'light-hang' : {x:-520, y:-290, z:-670, intensity:2, color:{r:160,g:40,b:30}, shadow:1, max_distance:500, drawIcon:1, active:1, spot:1, target:new Vector(-550, -20, -50), radius:500, max_radius:500 },


//'light-barrel' : {x:-400, y:0, z:-50, intensity:1.4, color:{r:80,g:80,b:240}, shadow:1, max_distance:600, drawIcon:1, active:1}, // active 1


//'light-hang' : {x:-535, y:-270, z:-670, intensity:2, color:{r:160,g:40,b:30}, shadow:1, max_distance:1000, drawIcon:1, active:1, spot:1, target:new Vector(-547, -198, -520), radius:500, inner_radius: 200 },

//'light-hang' : {x:-535, y:-270, z:-670, intensity:2, color:{r:160,g:40,b:30}, shadow:1, max_distance:1500, drawIcon:1, active:1, spot:1, target:new Vector(-400, -50, -50), radius:500, inner_radius: 200 },

//'light-barrel' : {x:-400, y:0, z:-50, intensity:1.4, color:{r:80,g:80,b:240}, shadow:1, max_distance:600, drawIcon:1, active:1, offset:1, target:new Vector(-400, 0, 200)},


// 'light-barrel-2' : {x:-440, y:-10, z:-100, intensity:1.4, color:{r:80,g:80,b:240}, shadow:1, max_distance:500, drawIcon:1, active:1, spot:1, target:new Vector(-670, 70, 75), radius:900  },


// 'light-hang' : {x:-535, y:-270, z:-670, intensity:2.0, color:{r:80,g:80,b:240}, shadow:1, max_distance:1000, drawIcon:1, active:1, spot:1, target:new Vector(-547, -198, -520), radius:500 },


// -590px, -285px, -672
//'light-barrel' : {x:-520, y:-300, z:-670, intensity:1.4, color:{r:80,g:80,b:240}, shadow:1, max_distance:2500, drawIcon:1, active:1},
// -520, -310, -670

//              'light-barrel' : {x:-570, y:-240, z:-520, intensity:1.4, color:{r:80,g:80,b:240}, shadow:1, max_distance:1200, drawIcon:1, active:1, spot:1, target:new Vector(-520, 80, -50), radius:1000},

              //'light-hang' : {x:-362, y:-180, z:-400, intensity:1, color:{r:159,g:72,b:144}, shadow:1, max_distance:500, drawIcon:1, active:1},
              
//              'light-hang' : {x:-380, y:-210, z:-410, intensity:1, color:{r:160,g:30,b:30}, shadow:1, max_distance:500, drawIcon:1, active:1,  add:1},
//              'light-hang2' : {x:-320, y:-230, z:-425, intensity:1, color:{r:30,g:160,b:30}, shadow:1, max_distance:500, drawIcon:1, active:1, add:1},

//              'light-hang2' : {x:-320, y:-230, z:-425, intensity:1, color:{r:160,g:160,b:30}, shadow:0, max_distance:500, drawIcon:1, active:1},


//              'light-hang-spot' : {x:-370, y:-192, z:-430, intensity:1, color:{r:159,g:72,b:144}, shadow:1, max_distance:500, drawIcon:1, active:1, spot:1, target:'wall-sto-right-2', radius:900},


//              'light-hang2' : {x:-500, y:-190, z:-450, intensity:1, color:{r:72,g:159,b:130}, shadow:1, max_distance:500, drawIcon:1, active:1, spot:1, target:new Vector(-246, -80, -575), radius:600},
//              'light-hang' : {x:-383, y:-160, z:-420, intensity:1, color:{r:159,g:72,b:144}, shadow:1, max_distance:500, drawIcon:1, active:1},

            },

            TRIGGERS: {},

            SOUNDS : {
              'sound-door-creak-1' : {path:'3d/sound/door-creak-1.mp3', volume:0.5, loop:false},
              'sound-item-pickup-1' : {path:'3d/sound/item-pickup-1.mp3', volume : 1.0, loop: false},
              'sound-music-1' : {path:'3d/sound/church-organ-main.mp3', volume: 0.1, loop: false}
            }
            // ---
      },


      TXT: {
        ACTIVE : {
          'active' : null,
          'index': -1, 'sub_index': -1,
          'el' : null
        },

        'warn' : ['Cannot reach object.'],
        'warn-2' : ['Cannot reach.'],

        'intro' : [{
            title: 'Abandoned Cells',
            body: ['You reach a seemingly out of place tunnel.', 'Among the empty cells stands an imposing reinforced gate.',
            'Perhaps its just your imagination, but you think you can hear faint sighs ',
            'coming from the other side...']
        }],

        // noosetxt
        'noosetxt' : [
            ['A noose stands before you. You feel a weird electric pull towards it.'],

            [{
                type: 'choice',
                text : 'Use the noose?',
                options : [
                  { 'text' : 'Yes' }, { 'text' : 'No' }
                ]
            }],

            ['You climb onto the crate below, and wear the rope around your neck.',
            'Without much thought you kick, and quickly fall.',
            'You start suffocating and panicking.'],

            ['Soon everything becomes dark. You died.']
        ]
        // --
      }
  };


  GAME.UTILS._filterGameObjects (GAME_OBJ);
  GAME.Fire ('ReqLoadLevel', LEVEL, GAME_OBJ);
  // ---

})( window, document, GAME );