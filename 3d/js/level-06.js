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

        // floors
        'dungeon-floor-1': {
          clss:'cave-floor-1',
          img:'3d/level-06/dirt-ground-1.jpg',
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
          clss:'dungeon-floor-1 h300',
          height: 300,
          z:-100,
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
          transform:' rotateY(180deg) rotateX(-18deg)',
          vertices: function (width, height)  {}
        },
        'dungeon-wall-2-norm': {
          extends: 'dungeon-wall-1',
          // clss:'dungeon-wall-1 h260',
          // height: 260,

          z:-100,
          transform:' rotateY(180deg)',
          vertices: function (width, height)  {}
        },
        'dungeon-wall-4': {
          extends: 'dungeon-wall-1',
          transform:' rotateY(0deg) rotateX(-16deg)',
          vertices: function (width, height)  {}
        },
        // -----


        // MAGICSHAPES ####
        'obj-lake-shore-1' : {
            id:'obj-lake-shore-1',
            img:'3d/dungeon-floor-3_lossy.jpg',
            type: 'object',
            clss: 'book',
            walk: false,
            cast_shadow:false,
            isnew:true,

            geom:[

              {
                clss:'face',
                shape:'face',
                img:'3d/level-06/dirt-ground-1.jpg',
                shape_args:[ new Vector(0, 250, 0), new Vector(0, 250, -160), new Vector(-180, 250, 0) ]
              },

              {
                clss:'face',
                shape:'face',
                img:'3d/level-06/dirt-ground-1.jpg',
                shape_args:[ new Vector(0, 250, -160), new Vector(0, 250, -500), new Vector(-500, 680, -500) ]
              },

              {
                clss:'face',
                shape:'face',
                img:'3d/level-06/dirt-ground-1.jpg',
                shape_args:[ new Vector(-180, 250, 0), new Vector(-500, 680, -500), new Vector(-500, 250, 0) ]
              },

              {
                clss:'face',
                shape:'face',
                img:'3d/level-06/dirt-ground-1.jpg',
                shape_args:[ new Vector(-180, 250, 0), new Vector(-500, 680, -500), new Vector(0, 250, -160) ]
              }
            ]
        },



        'obj-lake-wall-1' : {
            id:'obj-lake-wall-1',
            img:'3d/dungeon-floor-3_lossy.jpg',
            type: 'object',
            clss: 'book',
            walk: false,
            cast_shadow:false,
            isnew:true,

            geom:[

              {
                clss:'face',
                shape:'face',
                img:'3d/level-06/dirt-ground-1.jpg',
                shape_args:[ new Vector(-750, 250, 300), new Vector(-920, 250, 300), new Vector(-750, 250, 500) ]
              },

              {
                clss:'face',
                shape:'face',
                img:'3d/wall-dungeon2_lossy.jpg',
                shape_args:[ new Vector(-750, -130.4, 376.3), new Vector(-750, 250, 500), new Vector(-920, 250, 300) ]
              },

              {
                clss:'face',
                shape:'face',
                img:'3d/wall-dungeon2_lossy.jpg',
                shape_args:[ new Vector(-920, 250, 300), new Vector(-1250, 250, 300), new Vector(-1250, -150, 300) ]
              },

              {
                clss:'face',
                shape:'face',
                img:'3d/wall-dungeon2_lossy.jpg',
                shape_args:[ new Vector(-920, 250, 300), new Vector(-1250, -150, 300), new Vector(-750, -130.4, 376.3) ]
              }

            ]
        }


        // ------
  };


  var LEVEL = {
      TITLE:'06-CAVE-LAIR',

      SETTINGS: {
        FRUSTRUM_SKIP : 3
      },
      PRELOAD:[
        '3d/caret-1.png',
        '3d/wall-dungeon_lossy.jpg'
      ],
      MOVE : {
        rot:{x:-13,y:-90,z:0},
        move:{x:-610,y:0,z:-240}
      },
      INIT: function ( lvl ) {
        if (!GAME.State.flags.lvl6) GAME.State.flags.lvl6 = {};

        setTimeout(function(){
          GAME.ACTIONS.DialogCover (0);

          if (false) // !GAME.State.flags.lvl6.intro)
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
        // ---
      },

      DESTROY: function() {
        // remove all elements
        GAME.OnRender = null;

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
                  'shape-1' : {
                    object:1,
                    type:'obj-lake-shore-1',
                    transform:'translate3d(-1750px, 0px, 0px) rotateY(-90deg)',
                    angle:180
                  },


                  'shape-2' : {
                    object:1,
                    type:'obj-lake-shore-1',
                    transform:'translate3d(-750px, 0px, 0px)',
                    angle:180
                  },


                  'shape-wall-shore-1' : {
                    object:1,
                    type:'obj-lake-wall-1',
                    transform:'translate3d(0px, 0px, 0px)',
                    angle:180
                  },


              'floor-1' : { type:'dungeon-floor-1',
                    connected:[
//                          { id:'ramp-1', source:3, target:2 },
                          { id:'wall-left-1', source:2, target:2 },
                          { id:'wall-right-1', source:0, target:2 },

//                          { id:'wall-right-1', source:0, target:2 },
                          { id:'floor-0', source:1, target:3 },
                          { id:'floor-2', source:3, target:1 }
              ]},

             'floor-0' : { type:'dungeon-floor-1', connected:[
                  { id:'wall-left-3', source:2, target:2 },
                  { id:'wall-right-3', source:0, target:2 }
//                { id:'door-0', source:1, target:2 }
              ]},
              'floor-2' : { type:'dungeon-floor-1', connected:[
                { id:'floor-3', source:3, target:1 },
                { id:'floor-4', source:0, target:2 },

                { id:'wall-left-2', source:2, target:2 }
              ]},

              'floor-3' : { type:'dungeon-floor-1-h150', connected:[
                { id:'floor-6', source:3, target:1 }
              ]},
              'floor-4' : { type:'dungeon-floor-1', connected:[
                { id:'floor-5', source:0, target:2 },
                { id:'wall-right-4', source:1, target:2 }
              ]},

              'floor-5' : { type:'dungeon-floor-1', connected:[

              ]},

              'floor-6' : { type:'dungeon-floor-1-h150', connected:[
                { id:'wall-left-5', source:2, target:2 }
              ]},


              'wall-left-1' : { type:'dungeon-wall-2', connected:[]},
              'wall-left-2' : { type:'dungeon-wall-2', connected:[]},
              'wall-left-3' : { type:'dungeon-wall-2', connected:[]},
              'wall-left-4' : { type:'dungeon-wall-2', connected:[]},
              'wall-left-5' : { type:'dungeon-wall-2-norm', connected:[]},

              'wall-right-1' : { type:'dungeon-wall-4', connected:[]},
              'wall-right-3' : { type:'dungeon-wall-4', connected:[]},

              'wall-right-4' : { type:'dungeon-wall-1', connected:[]},

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

                      // GAME.Sound.Play ('sound-door-creak-1', dist, true);
                      GAME.UTILS.LoadLevel2('02', 'cave');
                },
                transform:'translate3d(648px, 0px, 75px) rotateY(-90deg)'
              }

              // ---
            },

            LIGHTS: {
              'ambience' : {color:{r:200,g:200,b:200}, intensity: 0.5, active: 1}

//              'light-hang-focus' : {x:-540, y:-265, z:-440, intensity:2, color:{r:160,g:40,b:30}, shadow:1, max_distance:460, drawIcon:0, active:1, spot:1, target:new Vector(-525, -0, -520), radius:400}, // active 1
//              'light-barrel' : {x:-440, y:-10, z:-80, intensity:1.25, color:{r:80,g:80,b:240}, shadow:1, max_distance:500, drawIcon:0, active:1, spot:1, target:new Vector(-404, 0, -50), radius:910  },
//              'light-torch' : {x:-480, y:32, z:80, intensity:1, color:{r:185,g:90,b:40}, shadow:1, max_distance:600, drawIcon:1, active:1},

            },

            TRIGGERS: {},

            SOUNDS : {
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
        }]
        // --
      }
  };


  GAME.UTILS._filterGameObjects (GAME_OBJ);
  GAME.Fire ('ReqLoadLevel', LEVEL, GAME_OBJ);
  // ---

})( window, document, GAME );