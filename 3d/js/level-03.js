(function ( w, d, GAME ) {
  'use strict';

  var _y_zero = 250;


  var GAME_OBJ = {

        ///////////////////////////////////////////////////////////////////
        // OBJECTS (TOOLS, ITEMS, DECORATIONS ETC)
        ///////////////////////////////////////////////////////////////////
        'obj-decal-web-1' : {
          id:'obj-decal-web-1',
          type: 'object',
          clss:'decal-web',
          walk: true,
          cast_shadow: false,
          geom:[]
        },

        // invisible plane
        'obj-invis-1' : {
          id:'obj-invis-1',
          type: 'object',
          clss:'invis',
          walk: true,
          cast_shadow: false,
          geom:[]
        },

        // stairs up
        'obj-stairs-1' : {
            id:'obj-stairs-1',
            // img : '3d/debug_square.jpg',
            img:'3d/dungeon-floor-3_lossy.jpg',
            type: 'object',
            clss: 'book',
            walk: true,
            cast_shadow:true,
            isnew:true,

            geom:[
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(0, 0, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15/2, -15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15, -15, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15-15/2, -15-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*2, -15*2, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*2-15/2, -15*2-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*3, -15*3, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*3-15/2, -15*3-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*4, -15*4, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*4-15/2, -15*4-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*5, -15*5, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*5-15/2, -15*5-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*6, -15*6, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*6-15/2, -15*6-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*7, -15*7, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*7-15/2, -15*7-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*8, -15*8, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*8-15/2, -15*8-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*9, -15*9, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*9-15/2, -15*9-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*10, -15*10, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*10-15/2, -15*10-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*11, -15*11, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*11-15/2, -15*11-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },
              /*
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*12, -15*12, 0), 'middle', 'rotateY(90deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[150, 15, false, new Vector(-15*12-15/2, -15*12-15/2, 0), 'middle', 'rotateY(90deg) rotateX(90deg)']
              },*/

              /////////// side
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[180, 180, false, new Vector(-90, -90 + 15/2, 75), 'middle', 'rotateY(180deg) rotateX(0deg)']
              },
              {
                //tag:'div',
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[180, 180, false, new Vector(-90, -90 + 15/2, -75), 'middle', 'rotateY(0deg) rotateX(0deg)']
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
            cast_shadow:false,
            no_shadow:true,
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


        ///////////////////////////////////////////////////////////////////
        // GEOMETRY (WALLS, FLOORS, LANDSCAPE ETC)
        ///////////////////////////////////////////////////////////////////
        // floors
        'dungeon-floor-1': {
          clss:'dungeon-floor-1',
          img:'3d/dungeon-floor-3_lossy.jpg',
          width:  500,
          height: 500,
          walk: true,
          cast_shadow:false,
          isnew:true,

          x:-250, y:0, z:0,
          transform:' rotateX(90deg)',

          vertices: function (width, height)  {}
        },

        'floor-350-180':{
          extends:'dungeon-floor-1',
          width:350,
          height:180,
          transform:' rotateX(90deg) translate3d(100px,0,-1px)'
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

          x:-250, y:0, z:500,
          transform:' rotateX(-90deg)',

          vertices: function (width, height)  {}
        },


        // walls
        'dungeon-wall-1': {
          clss:'dungeon-wall-1',
          img:'3d/wall-dungeon2_lossy.jpg',

          width:  500,
          height: 400,
          walk:   false,
          cast_shadow: true, // true
          isnew:true,

          x:-250, 
          y:0,
          z:0,

          transform:'',
          vertices: function (width, height)  {}
        },


        'dungeon-wall-2': {
          clss:'dungeon-wall-1',
          img:'3d/wall-dungeon2_lossy.jpg',

          width:  500,
          height: 400,
          walk:   false,
          cast_shadow: true, // true
          isnew:true,

          x:-250, 
          y:0,
          z:0,

          transform:' rotateY(180deg)',
          vertices: function (width, height)  {}
        },

        'dungeon-wall-3': {
          extends: 'dungeon-wall-1',
          img:'3d/wall-dungeon2_lossy.jpg',
          transform:' rotateY(90deg)',
          isnew:true,
          x:-250, y:0, z:0,
          vertices: function (width, height)  {}
        },

        'dungeon-wall-4': {
          extends: 'dungeon-wall-1',
          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, y:0, z:0,
          transform:' rotateY(-90deg)',
          isnew:true,
          vertices: function (width, height)  {}
        },



        'ramp-water-1': {
          qv:256,

          clss:'cave-water-1 dirt',
          width:  340,
          height: 500,
          walk: true,
          cast_shadow:false,
          isnew:true,

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, y:0, z:0,
          transform:'rotateX(90deg) rotateY(30deg) rotateZ(-90deg)',
          vertices: function (width, height)  {}
        },
        'cave-door-2-w340': {
          clss:'cave-door-1-w340',
          width:  340,
          height: 300,
          walk:   false,
          cast_shadow: false,
          isnew:true,

          img:'3d/level-2/cave-door-1.jpg',

          x:-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:'rotateY(-90deg)',
          vertices: function (width, height)  {}
        },

        'cave-door-3-w340':{
          extends:'cave-door-2-w340',
          transform:'rotateY(-180deg)'
        },


        'little-wall-2': {
          clss:'',
          width:  80,
          height: 400,
          walk:   false,
          cast_shadow: false,
          isnew:true,

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:'rotateY(-90deg)',
          vertices: function (width, height)  {}
        },
        'little-wall-3': {
            extends:'little-wall-2',
            x:-200+25,
            y:-150+40
        },
        'ramp-invis-1': {
          qv:1,

          clss:'cave-water-ramp',
          width:  250,
          height: 150,
          walk: true,
          cast_shadow:false,
          no_shadow:true,
          isnew:true,

          x:-250-250+75, y:0, z:0,
          transform:'rotateZ(-90deg) rotateY(-45deg)',
          vertices: function (width, height)  {}
        },
        'cave-water-2-h340': {
          clss:'cave-water-1-h340',
          width:  340,
          height: 340,
          walk: true,
          cast_shadow:false,
          isnew:true,

          use: 'water',
          useval:'dirty',

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, y:0, z:0,
          transform:' rotateX(90deg) rotateZ(-90deg)',

          vertices: function (width, height)  {}
        },
        'cave-wall-1': {
          clss:'cave-wall-1',
          width:  340,
          height: 300,
          walk:   false,
          cast_shadow: true,
          isnew:true,

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:'',
          vertices: function (width, height)  {}
        },
        'cave-wall-2': {
          qv:256,
          clss:'cave-wall-1',
          width:  340,
          height: 340,
          walk:   false,
          cast_shadow: true,
          isnew:true,
          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:'rotateY(-90deg)',
          vertices: function (width, height)  {}
        },

        'cave-wall-4': {
          extends:'cave-wall-2',
          qv:32,
          transform:'rotateY(90deg)',
        },

        'cave-wall-3-w340': {
          clss:'cave-wall-1-w340',
          width:  350,
          height: 180,
          walk:   false,
          cast_shadow: true,
          isnew:true,

          img:'3d/level-2/cave-wall-grate-1.png',
          alpha:true,

          x:-200+25, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:'rotateY(180deg)',
          vertices: function (width, height)  {}
        },
        'ramp-wall-1': {
          qv:256,

          clss:'cave-ramp-wall-1',
          width:  433,
          height: 425,
          walk: false,
          cast_shadow:false,
          isnew:true,

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, y:125, z:0,
          transform:'rotateZ(0deg)',
          vertices: function (width, height)  {}
        },
        'ramp-wall-4': {
          qv:256,

          clss:'cave-ramp-wall-1',
          width:  433,
          height: 425,
          walk: false,
          cast_shadow:false,
          isnew:true,

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, y:125, z:0,
          transform:'rotateY(180deg)',
          vertices: function (width, height)  {}
        }
        // -----
  };


  var LEVEL = {
      TITLE:'01-PRISON',

      SETTINGS: {
        FRUSTRUM_SKIP : 3
      },
      PRELOAD:[
        '3d/caret-1.png',
        '3d/level-2/wall-moss.png'
      ],
      MOVE : {
        rot:{x:-12.5,y:257.1,z:0},
        move:{x:-217,y:0,z:-207}
      },
      INIT: function ( lvl ) {
      },

      DESTROY: function() {
        // remove all elements
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

              'floor-1' : { type:'dungeon-floor-1', clss:'debug', 
                    connected:[
                          { id:'ramp-invis-1', source:2, target:3 },
                          { id:'stairs-grate', source:2, target:2 },
                          { id:'wall-1', source:0, target:2 },
                          { id:'ramp-1', source:1, target:0 }
              ]},
              //'floor-2' : { clss:'debug', type:'dungeon-floor-1', connected:[
              //  { id:'ramp-1', source:1, target:0 }
              //]},

              'ramp-invis-1': {type:'ramp-invis-1', ramp:1, ramp_start:-150, angle:155},

              'ramp-1': { type:'ramp-water-1',  clss:'dirt', ramp:1, ramp_start:0, angle: ((45/90) * 500) >> 0,  hide_frustrum: 1, connected:[
                { id:'floor-room-path-right-2', source:2, target:0 },
                { id:'wall-room-left-2', source:1, target:2 },
                { id:'wall-room-left-8', source:3, target:2 }
              ]},

              'floor-room-path-right-2': { type:'cave-water-2-h340', clss:'dirt', hide_frustrum: 1, hide_dist_max:2200, beacon:['2'], connected:[
                { id:'wall-room-left-3', source:1, target:2 },
                { id:'floor-room-path-right-3', source:3, target:1 },
                { id:'ramp-3', source:2, target:0 },
                { id:'ramp-2', source:3, target:0 }
              ]},
              'floor-room-path-right-3': { type:'cave-water-2-h340', clss:'dirt', hide_frustrum: 1, hide_dist_max:2200, beacon:['2'], connected:[
                {id:'wall-room-coffin-1', source:2, target:2},
                {id:'wall-room-coffin-2', source:0, target:2},
                {id:'door-room-right-1', source:3, target:2}
              ]},

              'ramp-3': { type:'ramp-water-1',  clss:'dirt', ramp:1, ramp_start:((45/90) * 500) >> 0, angle: ((45/90) * 500) >> 0,  hide_frustrum: 1, beacon:['2'], connected:[
                { id:'wall-room-left-4', source:2, target:2 },
                { id:'wall-room-left-5', source:1, target:2 },
                { id:'wall-room-left-7', source:3, target:2 }
              ]},
              'wall-room-left-4': {type: 'cave-door-2-w340', hide_frustrum: 1, beacon:['2'] },
              'wall-room-left-3': {type: 'cave-wall-1', hide_frustrum: 1, beacon:['2'] },
              'wall-room-left-7': {type: 'ramp-wall-4', hide_frustrum: 1, beacon:['2'] },
              'wall-room-left-8': {type: 'ramp-wall-4', hide_frustrum: 1, beacon:['2'] },

              'wall-room-coffin-1': {type: 'cave-wall-2', decal:'3d/level-2/wall-moss.png', hide_frustrum: 1, beacon:['2'] },
              'wall-room-coffin-2': {type: 'cave-wall-4', hide_frustrum: 1, beacon:['2'] },


              'door-room-right-1': {type: 'cave-door-3-w340', hide_frustrum: 1, beacon:['2'] },

              'wall-1' : { type:'dungeon-wall-1', clss:'debug', connected:[
                { id:'little-wall-1', source:1, target:3}
              ]},

              'little-wall-1' : {type:'little-wall-2', hide_frustrum: 1},
              'little-wall-2' : {type:'little-wall-3', hide_frustrum: 1},

              'stairs-grate' : {type:'cave-wall-3-w340', hide_frustrum:1, connected:[
                { id:'little-wall-2', source:3, target:1},
                { id:'top-floor-1', source:0, target:0},
              ]},


              'top-floor-1': {type: 'floor-350-180', hide_frustrum: 1, beacon:['2'] },

              'wall-room-left-2': {type: 'ramp-wall-1', hide_frustrum: 1, beacon:['2'] },
              'wall-room-left-5': {type: 'ramp-wall-1', hide_frustrum: 1, beacon:['2'] },

              'stairs-1' : {
                object:1,
                type:'obj-stairs-1',
                //transform:'translate3d(-247px, 246px, 75px)',
                transform:'rotateY(90deg) translate3d(-500px, 243px, -175px)'
                 //ramp:1, ramp_start:-150, angle:155
              },
              'shape-chair' : {
                object:1,
                type:'obj-shape-chair',
                // transform:'translate3d(0px, 150px, 250px)'
                transform:'translate3d(5px, 230px, 300px)'
                //transform:'translate3d(-270px, 100px, 220px) rotateY(66deg)'
              }
            },


            LIGHTS: {
              'ambience' : {color:{r:255,g:255,b:255}, intensity: 0.5, active: 1}
              //'light-1' : {x:-310, y:70, z:250, intensity:1, color:{r:255,g:20,b:20}, shadow:1, max_distance:980, drawIcon:1, active:1},
              //'light-3' : { x:640, y: 40, z:280  + 250, intensity:0.9, color:{r:255,g:20,b:20}, shadow:1, max_distance:542, drawIcon:1, active:1},
              // 'light-2' : {x:-380, y: 80, z:15   + 250, intensity:1, color:{r:80,g:80,b:255}, shadow:1, max_distance:980, drawIcon:1, active:1}
              //'light-2' : {x:-315, y: 70, z:230, intensity:2, color:{r:20,g:20,b:255}, shadow:1, max_distance:990, drawIcon:1, active:1}
            },

            SOUNDS : { }
            // ---
      },


      TXT: {
        ACTIVE : {
          'active' : null,
          'index': -1, 'sub_index': -1,
          'el' : null
        },

        'warn' : ['Cannot reach object.']
        // --
      }
  };


  GAME.UTILS._filterGameObjects (GAME_OBJ);
  GAME.Fire ('ReqLoadLevel', LEVEL, GAME_OBJ);
  // ---

})( window, document, GAME );