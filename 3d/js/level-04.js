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
        'obj-decal-normals' : {
          id:'obj-decal-normals',
          type: 'object',
          clss:'decal',
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


        // bed
        'obj-prison-bed-1' : {
            id:'obj-prison-bed-1',
            type: 'object',
            clss: 'bed',
            walk: true,
            cast_shadow:false,

            geom:[
              {
                id : 'bed-inner',
                img : '3d/bed-2.jpg',
                clss: 'inner',
                width: 250,
                height:120,
                transform:'translate3d(-125px,-60px,0) rotateX(90deg)',

                vertices: function( width, height ) {
                    return [
                      new Vector( -width/2, 0,  height/2 ),
                      new Vector(  width/2, 0,  height/2 ),
                      new Vector(  width/2, 0, -height/2 ),
                      new Vector( -width/2, 0, -height/2 )
                    ];
                }
              }
              // ---
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


        // test shape
        'obj-shape-1' : {
            id:'obj-shape-1',
            img : '3d/blank.jpg',
            type: 'object',
            clss: 'book',
            walk: true,
            cast_shadow:false,
            no_shadow:true,
            isnew:true,

            geom:[

              {
                clss:'box',
                shape:'rectangle',
                shape_args:[40, 40, 80]
              },

              {
                clss:'face',
                shape:'face',
                // shape_args:[ new Vector(0, 40, 30), new Vector(40, 40, 30), new Vector(20, 0, 30) ]
                shape_args:[ new Vector(32, 32, 30), new Vector(32, 64, 0), new Vector(59.71, 48, 0) ]
              },



              {
                clss:'face',
                shape:'face',
                shape_args:[ new Vector(32, 32, 30), new Vector(32, 64, 0), new Vector(59.71, 48, 0) ]
              },

              {
                clss:'face',
                shape:'face',
                shape_args:[ new Vector(32, 32, 30), new Vector(59.71, 48, 0), new Vector(59.71, 16, 0) ]
              },

              {
                clss:'face',
                shape:'face',
                shape_args:[ new Vector(32, 32, 30), new Vector(59.71, 16, 0), new Vector(32, 0, 0) ]
              },

              {
                clss:'face',
                shape:'face',
                shape_args:[ new Vector(32, 32, 30), new Vector(32, 0, 0),  new Vector(4.29, 16, 0) ]
              },

              {
                clss:'face',
                shape:'face',
                shape_args:[ new Vector(32, 32, 30), new Vector(4.29, 16, 0), new Vector(4.29, 48, 0) ]
              },

              {
                clss:'face',
                shape:'face',
                shape_args:[ new Vector(32, 32, 30), new Vector(4.29, 48, 0), new Vector(32, 64, 0) ]
              }

            /*
              {
                clss:'face',
                shape:'face',
                //shape_args:[ new Vector(20, 0, 0), new Vector(0, 40, 0), new Vector(40, 20, 0) ]
                // shape_args:[ new Vector(0, 40, 50), new Vector(40, 40, 50), new Vector(20, 0, 30) ]

                // shape_args:[ new Vector(-20, -20, 40), new Vector(20, -20, 40), new Vector(0, -60, 20) ]

                shape_args:[ new Vector(0, -60, 20), new Vector(-20, -20, 40), new Vector(20, -20, 40) ]

                //shape_args: [ new Vector( -3.1691181659698486, -3.883810043334961, 46.82686686515808), new Vector( 36.223191022872925, 1.0277020931243896, 51.73837900161743 ),  new Vector (  23.472963571548462,  -29.282622933387756, 21.428053975105286 ) ]
              },


              {
                clss:'face',
                shape:'face',
                
                shape_args:[ new Vector(0, -60, 20), new Vector(-20, -20, 40), new Vector(20, -20, 40) ]

                // shape_args:[ new Vector(0, -60, 20), new Vector(20, -20, 40), new Vector(40, -30, 40) ]

                // shape_args:[ new Vector(20, -20, 40), new Vector(40, -20, 40), new Vector(0, -60, 20) ]

                // shape_args:[ new Vector(0, -60, 30), new Vector(-20, -20, 40), new Vector(40, -20, 40) ]

                // shape_args:[ new Vector(20, -20, 40), new Vector(40, -40, 30), new Vector(0, -60, 30) ]

                // shape_args:[ new Vector(20, 0, 0), new Vector(0, 40, 0), new Vector(40, 20, 0) ]
               //  shape_args:[ new Vector(0, 40, 50), new Vector(40, 40, 50), new Vector(20, 0, 30) ]

                //shape_args:[ new Vector(1.7860618233680725, 5.82715779542923, 6.2439098954200745), new Vector(8.213938176631927, 11.243909895420074, 0.8271577954292297), new Vector(5, 1.464466154575348, -3.535533845424652) ]

                //shape_args: [ new Vector( -3.1691181659698486, -3.883810043334961, 46.82686686515808), new Vector( 36.223191022872925, 1.0277020931243896, 51.73837900161743 ),  new Vector (  23.472963571548462,  -29.282622933387756, 21.428053975105286 ) ]
              },*/

//              {
//                clss:'box',

//                shape:'rectangle',
//                shape_args:[40, 40, 80]
//              },

/*
              {
                clss:'triangle',
                transform:'translate3d(0px, -40px, 40px)',

                shape:'triangle',
                shape_args:[ {x:0,y:40}, {x:40,y:40}, {x:40 / 2,y:0} ]
              },
*/

/*              {
                clss:'box-2',

                transform:'translate3d(120px, 20px, 10px)',
                shape:'rectangle',
                shape_args:[40, 90, 8]
              }
*/

            ]
        },

        'obj-shape-2' : {
            id:'obj-shape-2',
            img : '3d/debug_square.jpg',
            type: 'object',
            clss: 'book',
            walk: true,
            cast_shadow:false,
            no_shadow:true,
            isnew:true,

            geom:[
              {
                clss:'tube',
                shape:'tube',
                transform:'translate3d(50px,75px,120px)',
                shape_args:[30, 40, 8, 1, 0]
              },

              {
                clss:'cone',
                shape:'cone',
                transform:'translate3d(0px,0px,-30px)',
                shape_args:[40, 60, 8, 1]
              },

/*
              {
                clss:'face_quad',
                shape:'face_quad',
                shape_args:[40,40, true, new Vector(-15, 209, 320), 'bottom-left', 'rotateX(25deg)']
                // shape_args:[50, 50, new Vector (200, 0, 120), 'top-right', 'rotateX(20deg)']
              }
*/
            ]
        },


        'obj-shape-3' : {
            id:'obj-shape-3',
            img : '3d/debug_square.jpg',
            type: 'object',
            clss: 'book triangle',
            walk: true,
            cast_shadow:false,
            no_shadow:true,
            isnew:true,

            geom:[
              {
                clss:'triangle',

                shape:'triangle',
                shape_args:[ {x:0,y:40}, {x:40,y:40}, {x:40 / 2,y:0} ]
              },

              {
                clss:'triangle',
                transform:'translate3d(120px, 20px, 10px)',

                shape:'triangle',
                shape_args:[ {x:0,y:40}, {x:40,y:40}, {x:40 / 2,y:0} ]
              }

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

        'dungeon-floor-w200xh500': {
          clss:'dungeon-floor-w200xh500',
          img:'3d/dungeon-floor-3_lossy.jpg',
          width:  200,
          height: 500,
          walk: true,
          cast_shadow:false,
          isnew:true,

          x:-250, y:0, z:0, // -(height / 2)
          transform:' rotateX(90deg)',

          vertices: function (width, height)  {}
        },

        'dungeon-floor-w500xh300': {
          clss:'dungeon-floor-w500xh300',
          img:'3d/dungeon-floor-3_lossy.jpg',
          width:  500,
          height: 300,
          walk: true,
          cast_shadow:false,
          isnew:true,

          x:-250, y:0, z:0,
          transform:' rotateX(90deg)',

          vertices: function (width, height)  {}
        },


        // ceilings
        'dungeon-ceil-1': {
          clss:'dungeon-ceil-1',
          img:'3d/dungeon-ceiling-2_lossy.jpg',
          width:  500,
          height: 500,
          walk: true,
          cast_shadow:true,
          isnew:true,

          x:-250, y:0, z:500,
          transform:' rotateX(-90deg)',

          // x:-250, y:0, z:0,
          // transform:' rotateX(-270deg)',

          vertices: function (width, height)  {}
        },

        // ---
        'dungeon-ceil-small-1': {
          extends: 'dungeon-ceil-1',
          clss:'dungeon-ceil-small-1',
          img:'3d/ceiling_x2_lossy.jpg',

          bg_size:'100% 100%',
          width:  200,
          height: 500,
          walk: true,
          cast_shadow:true,
          isnew:true,

          x:-250, y:0, z:500,
          transform:' rotateX(-90deg)',

          vertices: function (width, height)  {}
        },


        // ---
        'dungeon-ceil-small-2': {
          extends: 'dungeon-ceil-1',
          clss:'dungeon-ceil-small-2',
          img:'3d/ceiling_x2_lossy.jpg',

          bg_size:'100% 100%',
          width:  500,
          height: 300,
          walk: true,
          cast_shadow:true,
          isnew:true,

          x:-250, y:0, z:500,
          transform:' rotateX(-90deg)',

          vertices: function (width, height)  {}
        },



        // walls
        'dungeon-wall-1': {
          clss:'dungeon-wall-1',
          //img:'3d/wall-dungeon2_lossy.jpg',
          img:'3d/wall-dungeon_lossy.jpg',

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
          img:'3d/wall-dungeon_lossy.jpg',

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


        'dungeon-wall-cell-2':{
          extends: 'dungeon-wall-2',

          img:'3d/level-04/wall-dungeon-bars.png',
          alpha:true,
          alpha_mask:1,

          vertices: function (width, height)  {}
        },



        'dungeon-wall-small-1': {
          clss:'dungeon-wall-small-w200',
          img:'3d/wall-dungeon_lossy.jpg',

          width:  200,
          height: 400,
          walk: false,
          cast_shadow: true, // true
          isnew:true,

          x:-250, y:0, z:0,

          transform:'',
          vertices: function (width, height)  {}
        },

        'dungeon-wall-small-2': {
          extends: 'dungeon-wall-small-1',
          img:'3d/wall-dungeon_lossy.jpg',

          transform:' rotateY(180deg)',
          isnew:true,
          x:-250, y:0, z:0,
          vertices: function (width, height)  {}
        },


        'dungeon-wall-3': {
          extends: 'dungeon-wall-1',
          img:'3d/wall-dungeon_lossy.jpg',


          transform:' rotateY(90deg)',
          isnew:true,
          x:-250, y:0, z:0,
          vertices: function (width, height)  {}
        },

        'dungeon-wall-small-3': {
          extends: 'dungeon-wall-1',
          img:'3d/wall-dungeon_lossy.jpg',

          clss: 'dungeon-wall-small-w300',
          x:-250,  y:0, z:0,
          isnew:true,
          transform:' rotateY(90deg)',
          width:300,

          vertices: function (width, height)  {}
        },


        'dungeon-wall-4': {
          extends: 'dungeon-wall-1',
          img:'3d/wall-dungeon_lossy.jpg',

          x:-250, y:0, z:0,
          transform:' rotateY(-90deg)',
          isnew:true,
          vertices: function (width, height)  {}
        },


        'dungeon-wall-small-4': {
          extends: 'dungeon-wall-1',
          img:'3d/wall-dungeon_lossy.jpg',

          clss:'dungeon-wall-small-w300',

          width:300,
          x:-250, y:0, z:0,
          isnew:true,
          transform:' rotateY(-90deg)',
          vertices: function (width, height)  {}
        }
        // -----
  };


  var LEVEL = {
      TITLE:'04-SOPOR-CELLS',

      SETTINGS: {
        FRUSTRUM_SKIP : 3
      },
      PRELOAD:[
        '3d/caret-1.png',
        '3d/level-04/wall-dungeon-bars.png',
        '3d/level-04/wall-dungeon-cell-door.png',
        '3d/level-04/wall-dungeon_door_lossy.jpg',
        '3d/level-04/dungeon-ceiling-2_grate_lossy.png',
        '3d/wall-dungeon_lossy.jpg',
        '3d/level-04/ironmaiden.png'
      ],
      MOVE : {
        rot:{x:-8.9,y:268,z:0},
        move:{x:-1060,y:0,z:-208}
      },
      INIT: function ( lvl ) {
        if (!GAME.State.flags.lvl4) GAME.State.flags.lvl4 = {};

        setTimeout(function(){
          GAME.ACTIONS.DialogCover (0);

          if (!GAME.State.flags.lvl4.intro)
          {
            GAME.State.flags.lvl4.intro = true;
            
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

        GAME.Sound.Play ('sound-breath-1');
        // ---
      },

      DESTROY: function() {
        // remove all elements
        GAME.Sound.Stop ('sound-breath-1');

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

              'floor-1' : { type:'dungeon-floor-1',
                    connected:[
                          { id:'floor-corner-1', source:3, target:1 },
                          { id:'floor-corner-2', source:2, target:0 },
                          { id:'floor-2', source:1, target:3 },
                          { id:'wall-1', source:0, target:2 }
              ]},

              'wall-1' : { type:'dungeon-wall-1', connected:[{ id:'ceil-1', source:0, target: 0}]},


              'wall-2' : { type:'dungeon-wall-1', connected:[{ id:'wall-2b', source:1, target:3}]},
              'wall-2b' : { type:'dungeon-wall-1' },
              'wall-3' : { type:'dungeon-wall-2' },

              'wall-4' : { type:'dungeon-wall-2' },
              'wall-4b' : { type:'dungeon-wall-2' },
              'wall-5' : { type:'dungeon-wall-small-4' },
              'wall-6' : { type:'dungeon-wall-small-3', connected:[{ id:'wall-cell-1', source:1, target:1 }] },

              'wall-corner-1' : { type:'dungeon-wall-3', x:0, y:0, z:0, brightness:3, img:'3d/level-04/wall-dungeon-cell-door.png', clss:'no-pntr', alpha:true, alpha_mask:1 },

              'floor-corner-1' : { type:'dungeon-floor-w200xh500', connected:[
                { id:'wall-corner-1', source:3, target:2 },
                { id:'wall-corner-2', source:2, target:2 },
                { id:'wall-corner-3', source:0, target:2 }
              ]},
              'floor-corner-2' : { type:'dungeon-floor-w500xh300', connected:[
                { id:'floor-corner-3', source:1, target:3 },
                { id:'wall-6', source:3, target:2 },
                { id:'wall-3', source:2, target:2 }
              ]},

              'floor-corner-3' : { type:'dungeon-floor-w500xh300', clss:'dungeon-clip', cast_shadow:true, alpha:true, alpha_rect:[25.5, 27, 10, 17], connected:[
                { id:'wall-4', source:2, target:2 },
                { id:'wall-5', source:1, target:2 }
              ]},

              'floor-2' : { type:'dungeon-floor-1', connected:[
                { id:'floor-3', source:1, target:3 },
                { id:'wall-2', source:0, target:2 }
              ]},

              'floor-3' : { type:'dungeon-floor-1', connected:[
                { id:'wall-door', source:1, target: 2},
                { id:'wall-4b', source:2, target:2}
              ]},

              'wall-door' : { type:'dungeon-wall-4', img:'3d/level-04/wall-dungeon_door_lossy.jpg' },

              'wall-corner-2' : { type:'dungeon-wall-small-2' },
              'wall-corner-3' : { type:'dungeon-wall-small-1' },

              'wall-cell-1' : { type:'dungeon-wall-cell-2', alpha: true, alpha_mask:1, connected:[{ id:'wall-cell-2', source:3, target:1 }]},
              'wall-cell-2' : { type:'dungeon-wall-cell-2', clss:'no-pntr', alpha: true, alpha_mask:1 },



              'prison-door-plane' : {
                object:1,
                type:'obj-invis-1',
                interact: function( e ) {
                      if (!GAME.State.control) return ;

                      var dist = GAME.UTILS.Distance ( this );
                      if (dist > 420) {
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
                      
                      setTimeout(function(){
                        GAME.UTILS.LoadLevel2('02', 'soporDoor', 500);
                      },100);
                },
                transform:'translate3d(1140px, -65px, 248px) rotateY(-90deg)'
              },

              'sopor-1' : {
                object:1,
                type:'obj-decal-web-1',
                tag:'div',
                clss:'decal-sopor',
                transform:'translate3d(-676px, 19px, 245px) rotateY(90deg)',
                interact: function( e ) {
                      if (!GAME.State.control) return ;

                      var dist = GAME.UTILS.Distance ( this );
                      if (dist > 540) {
                        GAME.ACTIONS.SetActiveText ( 'warn-2', 0, false, 'old' );
                        return ;
                      }

                      if (GAME.INV.active_item)
                      {
                        var active_item = GAME.INV.active_item;
                        if (active_item.getAttribute('data-id') === 'rusty-bowl')
                        {
                            if (active_item.src.indexOf('dirty') > 0)
                            {
                              GAME.ACTIONS.SetText ( 'sopor', 10 );
                              return ;
                            }

                            if (active_item.src.indexOf('pure') > 0)
                            {
                              alert("you give the pure water");
                              return ;
                            }
                            // -
                        }
                      }

                      if (GAME.State.flags.lvl4.soporVisible)
                      {
                        // ask for water

                        if (GAME.State.flags.lvl4.soporBowl === 1)
                        {
                            GAME.ACTIONS.SetText ( 'sopor', 9 );
                        }
                        else
                        {
                              if (!GAME.State.flags.lvl4.soporBowl)
                              {
                                  GAME.ACTIONS.SetText ( 'sopor', 5 );
                              }
                              else
                              {
                                  GAME.ACTIONS.SetText ( 'sopor', 7, function() {

                                    GAME.ACTIONS.DialogAsk ('sopor', 8, 0, function ( choice, html ) {
                                        if (choice === 1)
                                        {
                                            GAME.ACTIONS.DialogClose ();
                                            return ;
                                        }

                                        var item = GAME.LEVEL.MAP.NODES['rusty-bowl'];
                                        GAME.Sound.Play ('sound-item-pickup-1');
                                        GAME.INV.AddItem ( item );
                                        GAME.ACTIONS.SaveText ('bowl');
                                        GAME.State.flags.lvl4.soporBowl = 1;
                                        GAME.ACTIONS.SetActiveText ( 'items', 0, false, 'old' );


                                        GAME.ACTIONS.DialogClose ();
                                    });
                                  });
                              }
                              // --
                        }
                      }
                      else
                      {
                            GAME.Sound.Volume('sound-breath-1', 0.1);
                            GAME.LEVEL.MAP.NODES['sopor-1'].el.style.opacity = '0';

                            GAME.ACTIONS.SetText ( 'sopor', 0, function() {

                            setTimeout(function() {
                              GAME.Sound.Volume('sound-breath-1', 0.15);
                              GAME.LEVEL.MAP.NODES['sopor-1'].el.style.opacity = '0.15';
                            },300);

                            GAME.ACTIONS.SetText ( 'sopor', 1, function() {
                                  GAME.ACTIONS.DialogAsk ('sopor', 2, 0, function ( choice, html ) {
                                      if (choice === 1)
                                      {
                                          GAME.ACTIONS.DialogClose ();
                                          return ;
                                      }


                                      var rot = GAME.UTILS.RotateCameraTo (GAME.LEVEL.MAP.NODES['wall-corner-1'].centroid);
                                      // console.log( move.style.transform, rot );

                                      var old_y = GAME.DIMS.pos.y;
                                      var mv = {
                                        x: 318,
                                        z: -228,
                                        y: -16
                                      };

                                      // #### move camera here
                                      GAME.Fire ('ReqSetRot', {rot:rot, move:mv}, 34 );

                                      GAME.ACTIONS.SetText ( 'sopor', 3, function() {

                                          GAME.State.flags.lvl4.soporVisible = true;
                                          // SHOW SOPOR HERE

                                          setTimeout(function() {
                                            GAME.Sound.Volume('sound-breath-1', 0.3);
                                            GAME.LEVEL.MAP.NODES['sopor-1'].el.style.opacity = '0.46';
                                          },520);

                                          GAME.ACTIONS.SetText ( 'sopor', 4, function() {
                                          GAME.ACTIONS.SetText ( 'sopor', 5, function() {
                                                mv.y = old_y;
                                                GAME.Fire ('ReqSetRot', {rot:rot, move:mv}, 20 );
                                                GAME.ACTIONS.DialogClose ();
                                          });
                                          });
                                      });
                                      // --
                                  });
                            });
                            });
                      }
                // ----
                }
              },


              'rusty-bowl' : {
                object:1,
                pickable:1,
                hidden:true,
                desc: 'A rusty water bowl',
                icon:'3d/level-04/water-bowl.png',
                type:'obj-decal-web-1',
                transform:'translate3d(0,0,0)',
                cast_shadow:false,
                no_shadow:true,

                use: 'water',
                use_cb:function( item, el, target) {
                  var val = target.getAttribute('data-useval');

                  if (val === 'dirty')
                  {
                    GAME.ACTIONS.DialogAsk ('bowl', 0, 0, function ( choice, html ) {
                        if (choice === 1)
                        {
                            GAME.ACTIONS.DialogClose ();
                            return ;
                        }

                        GAME.Sound.Play('sound-puzzle-solve-1');

                        item.icon = '3d/level-04/water-bowl-dirty.png';
                        item.desc = 'A rusty water bowl, filled with sewer water';
                        el.src = item.icon;

                        GAME.ACTIONS.SetActiveText ( 'bowl', 1, false, 'old' );
                        GAME.ACTIONS.DialogClose ();
                    });
                  }
                  else if (val === 'clean')
                  {
                    alert("you fill the bowl with clean water");      
                  }
                  // --
                }

              },

              'decal-iron-maiden' : {
                object:1,
                type: 'obj-decal-normals',
                clss:'decal-iron-maiden',
                img:'3d/level-04/ironmaiden.png',
                alpha:1, alpha_mask:1,
                width:200, height:234,
                transform:'translate3d(345px, 20px, 666px) rotateY(180deg)',
                vertices:[
                  new Vector (545, 254, 666),
                  new Vector (345, 254, 666),
                  new Vector (345, 20,  666),
                  new Vector (545, 20,  666)
                ],
                interact: function( e ) {
                  if (!GAME.State.control) return ;

                  var dist = GAME.UTILS.Distance ( this );
                  if (dist > 650) {
                    GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                    return ;
                  }

                  GAME.ACTIONS.SetText ( 'maiden', 0 );
                }
              },

              // ceiling
              'ceil-1' : { use:'water', useval:'dirty', type:'dungeon-ceil-1', img:'3d/level-04/dungeon-ceiling-2_grate_lossy.png', alpha:true, alpha_mask:1, connected:[
                { id:'ceil-2', source:1, target:3 },
                { id:'ceil-3', source:3, target:1 },
                { id:'ceil-4', source:0, target:2 }
              ]},
              'ceil-2' : { type:'dungeon-ceil-1', img:'3d/level-04/dungeon-ceiling-2_grate_lossy.png', alpha:true, alpha_mask:1, connected:[
                { id:'ceil-5', source:0, target:2 },
                { id:'ceil-6', source:1, target:3 }
              ]},
              'ceil-3' : { type:'dungeon-ceil-small-1' },
              'ceil-4' : { type:'dungeon-ceil-small-2' },
              'ceil-5' : { type:'dungeon-ceil-small-2' },
              'ceil-6' : { type:'dungeon-ceil-1' },

/*              
              'shape-1' : {
                object:1,
                type:'obj-shape-1',
                // transform:'translate3d(0px, 150px, 250px)'
                transform:'translate3d(40px, 0px, 100px)'
                //transform:'translate3d(-270px, 100px, 220px) rotateY(66deg)'
              },

              'shape-chair' : {
                object:1,
                type:'obj-shape-chair',
                // transform:'translate3d(0px, 150px, 250px)'
                transform:'translate3d(5px, 230px, 300px)'
                //transform:'translate3d(-270px, 100px, 220px) rotateY(66deg)'
              },
*/


/*
              'shape-2' : {
                object:1,
                type:'obj-shape-2',
                transform:'translate3d(-230px, 150px, 255px)'
              },
*/
            },


            LIGHTS: {
              'ambience' : {color:{r:255,g:255,b:255}, intensity: 0.14, active: 1},

              'light-door' : {x:985, y:140, z:162, intensity:1, color:{r:34,g:34,b:155}, shadow:0, max_distance:600, drawIcon:0, active:1},
              'light-1' : {x:-150, y:50, z:380, intensity:1, color:{r:10,g:50,b:140}, shadow:1, max_distance:980, drawIcon:0, active:1},

              // 'light-3' : { x:640, y: 40, z:280  + 250, intensity:0.9, color:{r:255,g:20,b:20}, shadow:1, max_distance:542, drawIcon:1, active:1},

              // 'light-2' : {x:-315, y: 70, z:230, intensity:2, color:{r:20,g:20,b:255}, shadow:1, max_distance:990, drawIcon:1, active:1}
              'light-2'  : {x:-10, y: -800, z:240, intensity:2.2, color:{r:20,g:20,b:255}, shadow:1, max_distance:1800, drawIcon:0, active:1, spot:1, target:'floor-1', radius:700},
              'light-2b' : {x:0, y:-50, z:250, intensity:1, color:{r:120,g:120,b:250}, shadow:0, max_distance:280, drawIcon:0, active:1},

              'light-3' : {x:500, y: -800, z:245, intensity:2.2, color:{r:20,g:20,b:255}, shadow:1, max_distance:1800, drawIcon:0, active:1, spot:1, target:'floor-2', radius:600},
              'light-3b' : {x:500, y:-50, z:250, intensity:1, color:{r:120,g:120,b:250}, shadow:0, max_distance:280, drawIcon:0, active:1},

              'light-4' : {x:620, y: 40, z:300, intensity:0.8, color:{r:140,g:20,b:20}, shadow:1, max_distance:550, drawIcon:0, active:1, spot:1, target:'wall-4', radius:900}
            },

            TRIGGERS: {
                'trigger-1' : {
                  mode:4,
                  type:0,
                  shape:'rect',
                  node:'floor-3',
                  act:0,
                  dat:0,
                  onchange: function( side ) {
                    if (this.act)
                    {
                      GAME.LEVEL.MAP.NODES['sopor-1'].el.style.opacity = '0';                      
                      GAME.Sound.Volume('sound-breath-1', 0.1);
                    }
                  }
                },
                'trigger-2' : {
                  mode:4,
                  type:0,
                  shape:'rect',
                  node:'floor-2',
                  act:0,
                  dat:0,
                  onchange: function( side ) {
                    if (this.act)
                    {
                      if (GAME.State.flags.lvl4.soporVisible)
                      {
                        GAME.Sound.Volume('sound-breath-1', 0.2);
                        GAME.LEVEL.MAP.NODES['sopor-1'].el.style.opacity = '0.35';
                      }
                      else
                      {
                        GAME.Sound.Volume('sound-breath-1', 0.15);
                        GAME.LEVEL.MAP.NODES['sopor-1'].el.style.opacity = '0.1';
                      }
                      // -
                    }
                  }
                },
                'trigger-3' : {
                  mode:4,
                  type:0,
                  shape:'rect',
                  node:'floor-1',
                  act:0,
                  dat:0,
                  onchange: function( side ) {
                    if (this.act)
                    {
                        if (GAME.State.flags.lvl4.soporVisible)
                        {
                          GAME.Sound.Volume('sound-breath-1', 0.3);
                          GAME.LEVEL.MAP.NODES['sopor-1'].el.style.opacity = '0.47';
                        }
                        else
                        {
                          GAME.Sound.Volume('sound-breath-1', 0.25);
                          GAME.LEVEL.MAP.NODES['sopor-1'].el.style.opacity = '0.15';
                        }
                    }
                    else
                    {
                        if( side === 1 && GAME.State.flags.lvl4.soporVisible && !GAME.State.flags.lvl4.soporBowl)
                        {
                            if (GAME.UTILS.IsVisible( GAME.LEVEL.MAP.NODES['sopor-1'] ) && ((Math.random() * 6) >> 0) !== 5 ) {
                              return ;
                            }

                            GAME.ACTIONS.SetText ( 'sopor', 6, function() {

                              var rot = GAME.UTILS.RotateCameraTo (GAME.LEVEL.MAP.NODES['wall-corner-1'].centroid);
                              // console.log( move.style.transform, rot );

                              GAME.Fire ('ReqSetRot', rot, 64 );

                              setTimeout(function(){
                                GAME.Sound.Play ('sound-metal-roll-1');
                              },1360);

                              GAME.ACTIONS.SetText ( 'sopor', 7, function() {

                                GAME.ACTIONS.DialogAsk ('sopor', 8, 0, function ( choice, html ) {
                                    if (choice === 1)
                                    {
                                        GAME.State.flags.lvl4.soporBowl = 2;
                                        GAME.ACTIONS.DialogClose ();
                                        return ;
                                    }

                                    var item = GAME.LEVEL.MAP.NODES['rusty-bowl'];
                                    GAME.Sound.Play ('sound-item-pickup-1');
                                    GAME.INV.AddItem ( item );
                                    GAME.ACTIONS.SaveText ('bowl');
                                    GAME.State.flags.lvl4.soporBowl = 1;
                                    GAME.ACTIONS.SetActiveText ( 'items', 0, false, 'old' );


                                    GAME.ACTIONS.DialogClose ();
                                });
                              });
                            });
                        }
                        // -
                    }
                  }
                },

                'trigger-4' : {
                  mode:4,
                  type:0,
                  shape:'rect',
                  node:'floor-corner-1',
                  act:0,
                  dat:0,
                  onchange: function( side ) {
                    if (this.act)
                    {
                      if (GAME.State.flags.lvl4.soporVisible && !GAME.State.flags.lvl4.soporBegs)
                      {
                          // checkif we have water in the inventory
                          var bowl = GAME.INV.FindItemById('rusty-bowl');
                          if (!bowl) return ;

                          if (bowl.icon.indexOf('dirty') > 0 || bowl.icon.indexOf('pure') > 0)
                          {
                              GAME.State.flags.lvl4.soporBegs = true;
                              GAME.ACTIONS.SetText ( 'sopor', 12 );
                          }
                          // -
                      }
                    }
                    // ---
                  }
                },

                // -----
            },

            SOUNDS : {
              'sound-door-creak-1' : {path:'3d/sound/door-creak-1.mp3', volume:0.5, loop:false},
              'sound-item-pickup-1' : {path:'3d/sound/item-pickup-1.mp3', volume : 1.0, loop: false},
              'sound-metal-roll-1' : {path:'3d/sound/metal-roll-1.mp3', volume : 0.3, loop: false},
              'sound-breath-1' : {path:'3d/sound/breathing-1.mp3', volume: 0.1, loop: true}
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

        // maidentxt
        'maiden' : [
          'An iron maiden...'
        ],

        // bowltxt
        'bowl' : [
            [{
                type: 'choice',
                text : 'Fill the bowl with water?',
                options : [
                  { 'text' : 'Yes' }, { 'text' : 'No' }
                ]
            }],

            ['You fill the bowl with sewer water...']
        ],

        // soportxt
        'sopor' : [

          // 0
          ['An old, rusty prison door with multiple locks. It seems impossible to open,', 'and you have no desire to do so.',
           'You wonder what crime one has commited to be locked in it.'],

          // 1
          ['As you inspect the door, you notice a dark silhouette writhing in the darkness.'],

          // 2
          [{
              type: 'choice',
              text : 'Move closer?',
              options : [
                { 'text' : 'Yes' }, { 'text' : 'No' }
              ]
          }],

          // 3
          ['You move closer to the cells dark window...'],

          // 4
          ['Your heart races, as suddenly someone or something emerges.'],

          // 5
          ['Your fear turns to confusion and relief as you see an old lady clad in black...',
           'You try to talk to her but she ignores you, she just mumbles prayers ', 'while moving back and forth.',
           '',
           'There is nothing else you can do.'],

          // 6
          ['As you turn and walk away, a weak raspy voice calls to you.',
          'The old lady acknowledges your presence.', '~Water... give me water~'],

          // 7
          ['She raises her twig like hands, and among her claw like fingernails ',
          'raises a rusty bowl and throws it towards you.',
          '~Water... and I will read the stars for you...~'],

          // 8
          [{
              type: 'choice',
              text : 'Pick up the rusty bowl?',
              options : [
                { 'text' : 'Yes' }, { 'text' : 'No' }
              ]
          }],

          // 9
          ['~Water... and I will read the stars for you...~'],

          // 10
          ['As you approach the cell, two skinny limbs decorated with sharp claws ',
           'snatch the bowl of water from your hands.', 'The sound of slurping, sipping and laughter echoes from the bowels of the cells.'],
          // 11
          ['Soon after, it is replaced with sighs of pain and coughing akin to those who cannot breath.',
          'The weird beastly lady, changes to a helpless victim. Was she ever evil?'],

          // 12
          ['Give it to me! I know you have it. I can sense it. Please, I need it. Please....']

        ]
        // --
      }
  };


  GAME.UTILS._filterGameObjects (GAME_OBJ);
  GAME.Fire ('ReqLoadLevel', LEVEL, GAME_OBJ);
  // ---

})( window, document, GAME );