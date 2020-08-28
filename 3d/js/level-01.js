(function ( w, d, GAME ) {
  'use strict';

  // player's height in pixels
  var _y_zero = 250;

  var GAME_OBJ = {

        ///////////////////////////////////////////////////////////////////
        // OBJECTS (TOOLS, ITEMS, DECORATIONS ETC)
        ///////////////////////////////////////////////////////////////////
        'obj-shape-3' : {
            id:'obj-shape-3',
            img : '3d/debug_square.jpg',
            type: 'object',
            clss: 'prsrv3d',
            walk: true,
            cast_shadow:false,
            no_shadow:true,
            isnew:true,

            geom:[
              {
                clss:'tube',
                shape:'tube',
                dims:true,
                shape_args:[12, 90, 6, 0, 0]
              },

              {
                clss:'tube',
                shape:'tube',
                dims:true,
                transform:'translate3d(-60px, 0px, 0px)',
                shape_args:[12, 90, 6, 0, 0]
              },

/*
              {
                clss:'tube',
                shape:'tube',
                backface:1,
                transform:'translate3d(-30px, -50px, 0px) rotateX(90deg)',
                shape_args:[20, 20, 6, 0, 0]
              },
*/
              {
                width:102,
                height:36,
                alpha:1,
                limit: {
                  'back': {
                    alpha_rect:{type:'f', limit:'front', callback:function ( ctx ) {

                        var radius = 10;
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.arc (50, 18, radius, 0, Math.PI*2, true);
                        ctx.fill();

                        radius = 5;
                        ctx.arc (18, 16, radius, 0, Math.PI*2, true);
                        ctx.fill();

                        ctx.arc (85, 16, radius, 0, Math.PI*2, true);
                        ctx.fill();

                        ctx.globalCompositeOperation = 'source-over';

                    }} 
                  }              
                },

                clss:'rectangle',
                shape:'rectangle',
                transform:'translate3d(-28px, -52px, -1px)', // rotateY(30deg)',
                shape_args:[102, 36, 12]
              },


            ]
        },

        'obj-decal-web-1' : {
          id:'obj-decal-web-1',
          type: 'object',
          clss:'decal-web',
          walk: true,
          tag:'img',
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

        // candle
        'obj-candle-1' : {
          id:'obj-candle-1',
          type: 'object',
          tag:'div',
          clss:'',
          walk: true,
          cast_shadow: false,
          geom:[
              {
                id : 'candle-flame',
                tag : 'div',
                clss: 'flame',
                width: 20,
                height:58
              },

              {
                id : 'candle-body',
                clss: 'candle-body',
                tag : 'div',
                width: 20,
                height:58
              }

          ]
        },

        // bed
        'obj-prison-bed-1' : {
            id:'obj-prison-bed-1',
            type: 'object',
            clss: 'bed',
            tag:'div',
            walk: true,
            cast_shadow:false,

            geom:[
              {
                id : 'bed-inner',
                img : '3d/bed-2.jpg',
                clss: 'inner',
                tag:'div',
                width: 250,
                height:120,

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

        // small crate
        'obj-crate-1' : {
            id:'obj-crate-1',
            img:'3d/wood-1.jpg',
            type: 'object',
            clss: 'crate',
            walk: true,
            cast_shadow:false,

            geom:[
              {
                tag:'div',
                clss: 'top',
                width: 50,
                height:50,
                cast_shadow:true,
                transform:'translate3d(-25px,-26px,0px) rotateX(90deg)',

                vertices: function( width, height ) {
                    return [
                      new Vector( -width/2, -1,  height/2 ),
                      new Vector(  width/2, -1,  height/2 ),
                      new Vector(  width/2, -1, -height/2 ),
                      new Vector( -width/2, -1, -height/2 )
                    ];
                }
              },

              /*
              {
                clss: 'bottom',
                width: 50,
                height:50,
                cast_shadow:false,


                vertices: function( width, height ) {
                    return [
                      new Vector( -width/2, 1,  -height/2 ),
                      new Vector(  width/2, 1,  -height/2 ),
                      new Vector(  width/2, 1, height/2 ),
                      new Vector( -width/2, 1, height/2 )
                    ];
                }
              },
              */

              {
                clss: 'left',
                tag:'div',
                width: 50,
                height:2,
                cast_shadow:false,
                transform:'translate3d(-50px, -1px, 0px) rotateY(-90deg)',

                vertices: function( width, height ) { // ####
                    return [
                        new Vector( -width / 2,   1,  -width/2 ),
                        new Vector( -width / 2,   1,   width/2 ),
                        new Vector( -width / 2,  -1,   width/2 ),
                        new Vector( -width / 2,  -1,  -width/2 )
                    ];
                }
              },

              {
                clss: 'front', // -25px, -1px, 25px
                width: 50,
                tag:'div',
                height:2,
                cast_shadow:false,
                transform:'translate3d(-25px, -1px, 25px) rotateY(0deg)',

                vertices: function( width, height ) { // ####
                    return [
                        new Vector( -width / 2,   1,  width/2 ),
                        new Vector(  width / 2,   1,  width/2 ),
                        new Vector(  width / 2,  -1,  width/2 ),
                        new Vector( -width / 2,  -1,  width/2 )
                    ];
                }
              },

              {
                clss: 'back',
                width: 50,
                tag:'div',
                height:2,
                cast_shadow:false,
                transform:'translate3d(-25px, -1px, -25px) rotateY(180deg)',

                vertices: function( width, height ) { // ####
                    return [
                        new Vector(  width / 2,   1,  -width/2 ),
                        new Vector( -width / 2,   1,  -width/2 ),
                        new Vector( -width / 2,  -1,  -width/2 ),
                        new Vector(  width / 2,  -1,  -width/2 )
                    ];
                }
              }
              // ---
            ]
        },


        // big crate
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

             
             /*
              {
                clss: 'bottom',
                width: 50,
                height:50,
                cast_shadow:false,


                vertices: function( width, height ) {
                    return [
                      new Vector( -width/2, 1,  -height/2 ),
                      new Vector(  width/2, 1,  -height/2 ),
                      new Vector(  width/2, 1, height/2 ),
                      new Vector( -width/2, 1, height/2 )
                    ];
                }
              },
              */



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





        // test shape
        'obj-shape-1' : {
            id:'obj-shape-1',
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
                shape_args:[40, 10, 32]
              },

              {
                clss:'box-2',

                transform:'translate3d(80px, 0px, 0px)',
                shape:'rectangle',
                shape_args:[40, 100, 20]
              }

            ]
        },


        'obj-book-1' : {
            id:'obj-book-1',
            img:'3d/new-cover.jpg',
            type: 'object',
            clss: 'book',
            walk: true,
            cast_shadow:false,
            no_shadow:true,

            geom:[

              {
                clss: 'top',
                width: 30,
                height:22,
                transform: 'translate3d(-15px,-13px,0px) rotateX(90deg)',

                cast_shadow:true,
                no_shadow:true,

                vertices: function( width, height ) {
                    return [
                      new Vector( -width/2, -2,  height/2 ),
                      new Vector(  width/2, -2,  height/2 ),
                      new Vector(  width/2, -2, -height/2 ),
                      new Vector( -width/2, -2, -height/2 )
                    ];
                }
              },


              {
                clss: 'left',
                width: 22,
                height:4,
                img:'3d/book-page.jpg',

                cast_shadow:true,
                no_shadow:true,
                transform: 'translate3d(-26px, -2px, 0px) rotateY(-90deg)',

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
                width: 22,
                height:4,
                img:'3d/book-page.jpg',
                transform: 'translate3d(4px, -2px, 0px) rotateY(90deg)',

                cast_shadow:true,
                no_shadow:true,

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
                width: 30,
                height:4,
                transform: 'translate3d(-15px, -2px, 10px) rotateY(0deg)',
                img:'3d/book-page.jpg',

                cast_shadow:false,
                no_shadow:true,

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
                width: 30,
                height:4,
                img:'3d/book-page.jpg',

                cast_shadow:false,
                no_shadow:true,
                transform: 'translate3d(-15px, -2px, -11px) rotateY(180deg)',

                vertices: function( width, height ) { // ####
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
          tag:'img',
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
          tag:'img',

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
          tag:'img',

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
          cast_shadow:false,
          isnew:true,
          tag:'img',

          x:-250, y:0, z:500,
          transform:' rotateX(-90deg)',

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
          cast_shadow:false,
          isnew:true,
          tag:'img',

          x:-250, y:0, z:500,
          transform:' rotateX(-90deg)',

          vertices: function (width, height)  {}
        },


        // ---
        'dungeon-ceil-small-2': {
          extends: 'dungeon-ceil-1',
          clss:'dungeon-ceil-small-2',
          img:'3d/dungeon-ceiling-2_lossy.jpg',

          bg_size:'100% 100%',
          width:  500,
          height: 300,
          walk: true,
          cast_shadow:false,
          isnew:true,
          tag:'img',

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
          tag:'img',

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
          tag:'img',

          x:-250, 
          y:0,
          z:0,

          transform:' rotateY(180deg)',
          vertices: function (width, height)  {}
        },



        'dungeon-wall-small-1': {
          clss:'dungeon-wall-small-w200',
          img:'3d/wall-dungeon2_lossy.jpg',
          width:  200,
          height: 400,
          walk: false,
          cast_shadow: true, // true
          isnew:true,
          tag:'img',

          x:-250, y:0, z:0,

          transform:'',
          vertices: function (width, height)  {}
        },

        'dungeon-wall-small-2': {
          extends: 'dungeon-wall-small-1',
          img:'3d/wall-dungeon2_lossy.jpg',
          transform:' rotateY(180deg)',
          isnew:true,
          tag:'img',
          x:-250, y:0, z:0,
          vertices: function (width, height)  {}
        },


        'dungeon-wall-3': {
          extends: 'dungeon-wall-1',
          img:'3d/wall-dungeon2_lossy.jpg',
          tag:'img',

          transform:' rotateY(90deg)',
          isnew:true,
          x:-250, y:0, z:0,
          vertices: function (width, height)  {}
        },

        'dungeon-wall-small-3': {
          extends: 'dungeon-wall-1',
          clss: 'dungeon-wall-small-w300',
          img:'3d/wall-dungeon2_lossy.jpg',
          tag:'img',

          x:-250,  y:0, z:0,
          isnew:true,
          transform:' rotateY(90deg)',
          width:300,

          vertices: function (width, height)  {}
        },


        'dungeon-wall-4': {
          extends: 'dungeon-wall-1',
          img:'3d/wall-dungeon2_lossy.jpg',
          tag:'img',

          x:-250, y:0, z:0,
          transform:' rotateY(-90deg)',
          isnew:true,
          vertices: function (width, height)  {}
        },


        'dungeon-wall-small-4': {
          extends: 'dungeon-wall-1',
          clss:'dungeon-wall-small-w300',
          img:'3d/wall-dungeon2_lossy.jpg',
          tag:'img',

          width:300,
          x:-250, y:0, z:0,
          isnew:true,
          transform:' rotateY(-90deg)',
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
        '3d/trapdoor-2.png',

        '3d/bed-2.jpg',
        '3d/wood-1.jpg',
        '3d/wood-2.jpg',
        '3d/dungeon-floor-3_lossy.jpg',
        '3d/new-cover.jpg',
        '3d/book-page.jpg',
        '3d/ceiling_x2_lossy.jpg',
        '3d/dungeon-ceiling-2_lossy.jpg',
        '3d/wall-dungeon2_lossy.jpg',
        '3d/rusty-wood.jpg'
      ],
      MOVE : {
        rot:{x:-12.5,y:257.1,z:0},
        move:{x:-217,y:0,z:-207}
      },
      INIT: function ( lvl ) {

            ///////////////////////////////////////////////////////
            // MAIN LEVEL LOGIC
            var scene = d.getElementById('scene');
            // var camera = d.getElementById('camera');

            var skip_intro = false; // ####

            var scenestyle = scene.style,
                bright = 0.3,
                persp = 460;

            var blur = 3, blurstep = 0.25;

            if (!skip_intro && GAME.UTILS.Browser !== 'firefox')
            {
              GAME.Fire ('ReqSetPersp', persp, 9999999);
              scenestyle.filter = 'blur(' + blur + 'px) brightness(' + bright + ')';
              scenestyle.perspective = persp + 'px';
            }

            if (skip_intro)
            {
              scenestyle.perspective = (GAME.UTILS.Browser === 'safari' ? 900 : (900 + 60) ) + 'px';
            }

            // -----------
            var brightness_modify = function () {
                  var brightness = 1, bright_step = 0.1, bright_delay = 0, blinks = 2;

                  if (blur < 2) blur = 2;
                  blur = blur.toFixed(1) / 1;

                  GAME.OnFrame (24, 350, function ( times, total ) {
                      if (blur > 2.0) {
                        blur -= 0.01;
                      }

                      if (--bright_delay >= 0) {
                        return ;
                      }

                      if (brightness >= 0.999) {
                        bright_step = -0.047;
                        bright_delay = 34;

                        if (blinks === 2) bright_delay = 18;
                        brightness = 0.998;
                      }
                      else if (brightness <= 0.2)
                      {
                        bright_step = 0.067;
                        brightness = 0.201;

                        if (--blinks === 1)
                        {
                                if (GAME.UTILS.Browser !== 'firefox')
                                {
                                    var persp = 700;
                                    GAME.Fire ('ReqSetPersp', persp, 99999+1);
                                    GAME.__render = function() {
                                      scenestyle.perspective = (persp) + 'px';
                                    };

                                    blur = 1;
                                }
                        }
                        else if (blinks === 0)
                        {
                          blur = 0;

                          w.requestAnimationFrame(function() {
                              var persp = 900;
                              GAME.Fire ('ReqSetPersp', persp, 99999+1);
                              GAME.__render = function() {
                                  scenestyle.perspective = (GAME.UTILS.Browser === 'safari' ? persp : (persp + 60) ) + 'px';
                              };
                          });


                          // ### OLD TXT HERE

                        }
                      }
                      else
                      {
                        brightness += bright_step;
                        if (brightness > 1)
                        {
                          brightness = 1;
                          if (blinks === 0)
                          {
                              w.requestAnimationFrame(function() {
                                w.requestAnimationFrame(function() {
                                        scenestyle.filter = '';
                                        setTimeout(function() {
                                            d.getElementById('char').getElementsByTagName('span')[1].innerHTML = 'Status: <i class="orange">Malnourished,</i> <i class="darkgreen">Injured</i>';
                                            GAME.ACTIONS.SetActiveText ( 'intro', 3, true, 'old' );
                                        },482);
                                });
                              });

                              GAME.__render = null;
                              return (360);
                          }
                          // ---
                        }
                      }

                      if (GAME.UTILS.Browser === 'firefox')
                      {
                        return ;
                      }

                      if (GAME.__render) GAME.__render ();
                      GAME.__render = function() {
                        if (blur !== 0)
                          scenestyle.filter = 'blur(' + blur.toFixed(2) + 'px) brightness(' + brightness.toFixed(2) + ')';
                        else if (brightness !== 1)
                          scenestyle.filter = 'brightness(' + brightness.toFixed(2) + ')';
                        else
                          scenestyle.filter = '';
                        // -
                      };

                    });
            };

            // -----------
            var blur_modify = function () {
              GAME.OnFrame (8, 23, function ( times, total ) {
                if (times > 21) {

                  GAME.ACTIONS.SetText ( 'intro', 1, function() {
                      GAME.ACTIONS.DialogClose ();
                      brightness_modify ();
                  });

                  return (23);
                }

                var gap = ( ((Math.random () * 1.8) - 0.9).toFixed (1) / 1);
                if (blur >= (5.4 + gap) )
                  blurstep = -(0.2 + Math.random() * 0.3).toFixed(2)/1;
                else if (blur <= (1.5 - gap) )
                  blurstep = (0.2 + Math.random() * 0.3).toFixed(2)/1;

                blur += blurstep;
                if (blur < 1) { blur = 1; }

                if (GAME.UTILS.Browser !== 'firefox')
                {
                    if (GAME.__render) GAME.__render ();
                    GAME.__render = function() {
                        scenestyle.filter = 'blur(' + blur.toFixed(1) + 'px)';
                    };
                }
                // ----
              });
            };


            // -----------
            var init = function () {
                GAME.ACTIONS.SetText ( 'intro', 0, function() {
                  GAME.ACTIONS.DialogClose ();
                  !skip_intro && blur_modify ();
                });
            };

            setTimeout(function() {
              w.requestAnimationFrame(function() {
                if (GAME.LEVEL !== lvl) return ;
                init ();
              });
            }, 666 + 800);


            if (!skip_intro && GAME.UTILS.Browser !== 'firefox')
            {
                GAME.OnFrame (26, 60, function ( times, total ) {
                  var exit = false;
                  if (bright < 1)
                  {
                    bright += 0.025;
                    if (bright >= 1) { exit = true; bright = 1; }
                    scenestyle.filter = 'blur(3px) brightness(' + bright + ')';

                    if (exit) return (60);
                  }
                });
            }
      },

      DESTROY: function() {
        GAME.AI.Remove (0);

        // remove all elements
        var move = document.getElementById('move');
        move.innerHTML = '';
      },

      ACTIVE_MAP : [],
      LIT : [],
      WALLS : [],
      MAP:
      {
            MAIN: 'floor-1',
            NODES : {

              'floor-1' : { type:'dungeon-floor-1',
                    connected:[
                          { id:'floor-corner-1', source:3, target:1 },
                          { id:'floor-corner-2', source:2, target:0 },
                          { id:'floor-2', source:1, target:3 },
                          { id:'wall-1', source:0, target:2 },
              ]},

              'wall-1' : { type:'dungeon-wall-1', connected:[
                { id:'ceil-1', source:0, target: 0}
              ]},
              'wall-2' : { type:'dungeon-wall-1' },
              'wall-3' : { type:'dungeon-wall-2' },
              'wall-4' : { type:'dungeon-wall-2' },
              'wall-5' : { type:'dungeon-wall-small-4' },
              'wall-6' : { type:'dungeon-wall-small-3' },
              'wall-corner-1' : { type:'dungeon-wall-3', tag:'div', clss:'dungeon-window', img:'3d/wall-dungeon-2-window.png', /*hide_frustrum:true,*/ alpha:true, alpha_mask:1, x:0, y:0, z:0, innerHTML:
                '<div onclick="GAME.ACTIONS.SetText(\'items\', 2)" class="nightsun"></div><div class="ray"></div><div class="ray2"></div>' +
                '<div class="tmp-window"></div>' + 
                '<img style="position:absolute;opacity:0.39;pointer-events:none; transform: translate3d(-255px,0px,-900px);" src="3d/lands.jpg"/>'
              },

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

              'floor-corner-3' : { type:'dungeon-floor-w500xh300', cast_shadow:true, alpha:true, alpha_rect:[194, 124, 88, 88], connected:[
                { id:'wall-4', source:2, target:2 },
                { id:'wall-5', source:1, target:2 }
              ]},

              'floor-2' : { type:'dungeon-floor-1', connected:[
                { id:'wall-2', source:0, target:2 },
                { id:'wall-door', source:1, target: 2},
                { id:'floor-out-1', source:1, target: 3}
              ]},

              'floor-out-1' : { type:'dungeon-floor-1', no_shadow:false, brightness:12, connected:[
                { id:'floor-out-2', source:0, target: 2},
                { id:'floor-out-3', source:2, target: 0},
                { id:'wall-out-2', source:1, target: 2}
                // { id:'floor-out-4', source:1, target: 3}
              ]},
              'floor-out-2' : { type:'dungeon-floor-1', no_shadow:true, brightness:12 },
              'floor-out-3' : { type:'dungeon-floor-1', no_shadow:false, brightness:12 },
              'wall-out-2' : { type:'dungeon-wall-4', no_shadow:true, cast_shadow:false, connected:[
                { id:'wall-out-1', source:3, target: 1},
                { id:'wall-out-3', source:1, target: 3}
              ]},

              'wall-out-1' : { type:'dungeon-wall-4', no_shadow:true, cast_shadow:false },
              'wall-out-3' : { type:'dungeon-wall-4', no_shadow:true, cast_shadow:false },

              // 'floor-out-4' : { type:'dungeon-floor-1', no_shadow:true, brightness:4 },

              'wall-door' : { type:'dungeon-wall-4', clss:'dungeon-door', alpha:true, alpha_mask:1, img:'3d/door-dungeon-1-250x200_lossy.png' },

              'wall-corner-2' : { type:'dungeon-wall-small-2' },
              'wall-corner-3' : { type:'dungeon-wall-small-1' },


              'wall-x' : { type:'dungeon-wall-short-4' },

              // ceiling
              'ceil-1' : { type:'dungeon-ceil-1', connected:[
                { id:'ceil-2', source:1, target:3 },
                { id:'ceil-3', source:3, target:1 },
                { id:'ceil-4', source:0, target:2 }
              ]},
              'ceil-2' : { type:'dungeon-ceil-1', connected:[
                { id:'ceil-5', source:0, target:2 }
              ]},
              'ceil-3' : { type:'dungeon-ceil-small-1' },
              'ceil-4' : { type:'dungeon-ceil-small-2' },
              'ceil-5' : { type:'dungeon-ceil-small-2' },



              /*
              'shape-2' : {
                object:1,
                type:'obj-shape-2',
                // transform:'translate3d(0px, 10px, 50px)'
                transform:'translate3d(-230px, 150px, 270px)'
              },*/

              'shape-3B' : {
                object:1,
                type:'obj-shape-3',
                img: '3d/rusty-wood.jpg', // '3d/ceiling_x2_lossy.jpg',  // '3d/dungeon-ceiling-2_lossy.jpg',
                // transform:'translate3d(0px, 10px, 50px)'
                cast_shadow:true,
                transform:'translate3d(670px, 200px, 685px) rotateY(22deg)'
              },

              // ---------
              'prison-door-plane' : {
                object:1,
                type:'obj-invis-1',
                interact: function( e ) {
                  if (!e.target) return ;

                  var dist = GAME.UTILS.Distance ( e.target );

                  var dist_min = 200, dist_max = 880;

                  if (dist < dist_min) dist = 1;
                  else if (dist > dist_max) dist = 0;
                  else {
                    dist = 1 - ((dist - dist_min) / (dist_max - dist_min));
                    dist = dist.toFixed(2) / 1;
                  }

                  GAME.Sound.Play ('sound-door-lock-1', dist, true);
                  GAME.ACTIONS.SetActiveText ( 'items', 3, true );
                },
                transform:'translate3d(645px, -65px, 248px) rotateY(-90deg)'
              },

              'prison-food-1' : {
                object:1,
                hidden:true,
                clss:'food',
                type:'obj-decal-web-1',
                brightness:6,
                img:'3d/meat-3.jpg',
                transform:'translate3d(670px, 195px, 250px) rotateX(90deg) rotateY(-10deg)',

                cast_shadow:false,
                no_shadow:true,
                vertices:[
                  new Vector (675, 250, -50 + 250),
                  new Vector (675, 250, 50  + 250),
                  new Vector (730, 242, 50  + 250),
                  new Vector (730, 242, -50 + 250)
                ],

                interact: function( e ) {
                  if (!GAME.State.control) return ;

                  var dist = GAME.UTILS.Distance ( this );
                  
                  if (dist > 380) {
                    GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                    return ;
                  }

                  var node = LEVEL.MAP.NODES['prison-food-1'];
                  if (node.hidden) return ;

                      GAME.ACTIONS.DialogAsk ('items', 6, 0, function ( choice, html ) {
                          if (choice === 1)
                          {
                            GAME.ACTIONS.DialogClose ();
                            return ;
                          }

                          var play_sound = GAME.Sound.Play('sound-food-1');

                          GAME.ACTIONS.SetText ( 'items', 9);
                          node.hidden = true;

                          setTimeout(function() {
                          window.requestAnimationFrame(function() {

                              node.el.style.opacity = '0';

                              setTimeout(function(){
                                node.el.parentNode.removeChild( node.el );
                              }, 620);

                              // bone here
                              var bone_node = GAME.LEVEL.MAP.NODES['prison-bone-1'];
                              bone_node.hidden = false;

                              move.appendChild( bone_node.el );
                              GAME.UTILS.RebuildLightForNode ( bone_node );

                              GAME.State.control = true;
                          });
                          }, play_sound ? 2420 : 400);

                          return ;
                      });

                  // ---
                }
              },


              'trapdoor-wall-1' : {
                object:1,
                clss:'sewer-1',
                tag:'div',
                complexNormals:1,
                type:'obj-decal-web-1',
                img:'3d/wall-dungeon2_lossy.jpg',
                walk:true,
                transform:'translate3d(442px, 250px, 621px)', // 365+250

                cast_shadow:false,
                vertices:[
                  new Vector (441, 650, 455 + 250),
                  new Vector (530, 650, 455 + 250),
                  new Vector (530, 250, 365 + 250),
                  new Vector (441, 250, 365 + 250)
                ]
              },

              'trapdoor-wall-2' : {
                object:1,
                clss:'sewer-1',
                tag:'div',
                complexNormals:1,
                type:'obj-decal-web-1',
                img:'3d/wall-dungeon2_lossy.jpg',
                walk:true,
                transform:'translate3d(487px, 250px, 667px) rotateY(-90deg)',

                cast_shadow:false,
                vertices:[
                  new Vector (530, 650, 365 + 250),
                  new Vector (530, 650, 455 + 250),
                  new Vector (530, 250, 455 + 250),
                  new Vector (530, 250, 365 + 250)
                ]
              },

              'trapdoor-wall-3' : {
                object:1,
                clss:'sewer-1',
                tag:'div',
                complexNormals:1,
                type:'obj-decal-web-1',
                img:'3d/wall-dungeon2_lossy.jpg',
                transform:'translate3d(397px, 250px, 667px) rotateY(90deg)',

                cast_shadow:false,
                vertices:[
                  new Vector (441, 650, 455 + 250),
                  new Vector (441, 650, 365 + 250),
                  new Vector (441, 250, 365 + 250),
                  new Vector (441, 250, 455 + 250)
                ]
              },

              'trapdoor-wall-4' : {
                object:1,
                clss:'sewer-1',
                tag:'div',
                complexNormals:1,
                type:'obj-decal-web-1',
                img:'3d/wall-dungeon2_lossy.jpg',
                transform:'translate3d(442px, 250px, 712px) rotateY(180deg)',

                cast_shadow:false,
                vertices:[
                  new Vector (441, 650, 455 + 250),
                  new Vector (530, 650, 455 + 250),
                  new Vector (441, 250, 455 + 250),
                  new Vector (530, 250, 455 + 250)
                ]
              },
              // 

              'spider-1' : {
                object:1,
                alpha:true,
                alpha_mask:1,
                hidden:true,
                tag:'div',
                clss:'spider-1',
                type:'obj-decal-web-1',
                transform:'translate3d(444px, 201px, 667px) rotateX(90deg)',
                onframe:(function() {
                  var miss_frames = 2000000;

                  var frame = -1;
                  var max = 7;
                  var skip = true;

                  var left = 0, top = 0;
                  var angle = 0;
                  var angle_small_count = 0;
                  var angle_large = 0, angle_large_count = 30;
                  var nomove = false, nomove_count = 80 + Math.random() * 100;
                  var edge_count = 40;
                  var old_time = 0;
                  var extra = '';

                  var _random = function(min, max, plusminus) {
                      if (min == max) return min;
                      var result = Math.round(min - 0.5 + (Math.random() * (max - min + 1)));
                      if (plusminus) return Math.random() > 0.5 ? result : -result;
                      return (result);
                  };
                  var _move = function (node, x, y, ang) {
                    left = x; top = y;

                    var trns = ' translate3d(' + left.toFixed(1) + 'px, ' + top.toFixed(1) + 'px, 0px)';
                    if (ang) {
                      trns += ' rotateZ(' + ang + 'deg)';
                    }

                    node.el.style.transform = node.transform + trns + ' scale(0.28)' + extra;
                  };

                  var world_arr_rev = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];

                  return function (node, timestamp) {

                    var delta = timestamp - old_time;
                    old_time = timestamp;

                    // ------
                    if (LEVEL.MAP.NODES['prison-candle'].lit)
                    {
                      // move towards the sewer
                      var mm = MakeMatrix4 (); //GAME.UTILS.GetMatrixCSS (node.el.style.transform);
                      var spider_point = new Vector (444 + left, 201, 667 - top);
                      var new_point = new Vector (444, 201, 667);

                      if (DistanceVector (spider_point, new_point) < 40)
                      {
                        node.el.parentNode.removeChild (node.el);
                        node.hidden = true;
                        return ;
                      }

                      var world_arr = LookAt( mm,
                        spider_point.clone(),
                        new_point.clone(),
                        new Vector(0,1,0));

                      // world_arr = MultiplyMatrices([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 900, 1], GetInverse(world_arr)  );
                      GetInverse2 (world_arr_rev, world_arr);

                      var _getRotation = function ( m ) {
                          var ret = new Vector();
                          if ( Math.abs( m[9] ) < 0.99999 ) {
                            ret.y = Math.atan2( m[8], m[10] ) * (180 / Math.PI); 
                            ret.x = -Math.atan2( m[1], m[5] ) * (180 / Math.PI);
                          } else {
                            ret.y = Math.atan2( -m[2], m[0] ) * (180 / Math.PI);
                            ret.x = 0;
                          }

                          return ret;
                      };

                      var rot = _getRotation( world_arr_rev );
                      angle = 90-(180-rot.y);
                    }
                    else
                    {
                        extra = '';

                        if (--nomove_count <= 0) {
                          nomove = !nomove;
                          nomove_count = !nomove ? _random (60, 320) : _random (30, 200);
                        }
                        if (nomove) {
                          return ;
                        }
                    }

                    if (delta > 200) delta = 200;

                    if (++frame === max) frame = 0;
                    node.el.style.backgroundPosition = (-frame * 69) + 'px 0';

                    if (!LEVEL.MAP.NODES['prison-candle'].lit)
                    {
                        if (--edge_count <= 0 && (left >= 240 || left <= -240 || top >= 99 || top <= -99)) {
                            edge_count = 12;

                            angle %= 360;
                            if (angle < 0) angle += 360;
                            // angle = 360 - angle;

                            angle += 90;
                            // if (left >= 240) angle = 270;
                            // else if (left <= -240) angle = 90 + 90;

                            angle_large_count = 90;
                            angle_small_count = 30;
                        }

                        if (--angle_large_count <= 0) {
                            angle_large = _random(1, 140, true);
                            angle_large_count = Math.round(Math.random() * 40);
                        }
                        if (--angle_small_count <= 0) {
                            angle += _random(1, 10, true);
                            angle_small_count = Math.round(Math.random() * 10);
                        }
                        else {
                            var dangle = _random(1, 5, true);
                            if ((angle_large > 0 && dangle < 0) || (angle_large < 0 && dangle > 0)) {
                              dangle = -dangle; // ensures both values either + or -
                            }
                            angle_large -= dangle;
                            angle += dangle;
                        }
                    }

                    var angle_rad = angle * (Math.PI / 180);
                    var dx = Math.cos(angle_rad) * 2 * (delta / 100);
                    var dy = -Math.sin(angle_rad) * 2 * (delta / 100);

                    _move (node, (left + dx), (top + dy), (90 - angle) );

                    // ----
                  };
                })(),
                cast_shadow:false,
                vertices:null
              },

              'trapdoor-1' : {
                object:1,
                pickable:1,
                alpha:true,
                alpha_mask:1,
                tag:'img',
                clss:'trapdoor-2',
                brightness:-4,
                open:false,
                type:'obj-decal-web-1',
                img:'3d/trapdoor-2.png',
                transform:'translate3d(444px, 205px, 667px) rotateX(90deg)',

                cast_shadow:false,
                vertices:[
                  new Vector (445, 235, 457 + 250),
                  new Vector (532, 235, 457 + 250),
                  new Vector (532, 235, 362 + 250),
                  new Vector (445, 235, 362 + 250)
                ]
              },


              'trapdoor-fake' : {
                object:1,
                pickable:1,
                clss:'trapdoor-fake',
                type:'obj-decal-web-1',
                transform:'translate3d(444px, 198px, 663px) rotateX(90deg)',
                no_shadow:true,
                cast_shadow:false,

                interact: function( e ) {
                  if (!GAME.State.control) return ;

                  var dist = GAME.UTILS.Distance ( this );
                  
                  if (dist > 355) {
                    GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                    return ;
                  }

                  if (LEVEL.MAP.NODES['trapdoor-1'].open)
                  {
                                        GAME.ACTIONS.DialogAsk ( 'items', 15, 0, function( choice ) {
                                              GAME.ACTIONS.DialogClose ();

                                              if (choice === 0)
                                              {
                                                GAME.State.control = 0;

                                                var rot = {
                                                  y: -181.82,
                                                  x: -78,
                                                  z: 0
                                                };

                                                if (GAME.DIMS.deg.y > 170 && GAME.DIMS.deg.y < 270)
                                                {
                                                  rot.y = 181.82;
                                                }

                                                var move = {
                                                  x: -489,
                                                  z: -630,
                                                  y: 0
                                                };


                                                GAME.Fire ('ReqSetRot', {rot:rot, move:move, callback:function(){
                                                  GAME.ACTIONS.SetText ( 'ending', 0, function() {
                                                    GAME.ACTIONS.SetText ( 'ending', 1, function() {
                                                        // ----
                                                          var rot = {
                                                            y: 0,
                                                            x: 0,
                                                            z: 0
                                                          };
                                                          var move = {
                                                            x: -489,
                                                            y: 0,
                                                            z: -660
                                                          };

                                                          GAME.Fire ('ReqSetRot', {rot:rot, move:move, callback:function () {
                                                                var rot = {
                                                                  y: 0,
                                                                  x: 0,
                                                                  z: 0
                                                                };
                                                                var move = {
                                                                  x: -489,
                                                                  y: -620,
                                                                  z: -660
                                                                };

                                                                GAME.Fire ('ReqSetRot', {rot:rot, move:move, callback:function () {
                                                                  GAME.ACTIONS.DialogCover (1);

                                                                  setTimeout(function() {
                                                                            GAME.UTILS.LoadLevel('02');
                                                                     }, 1000);
                                                                }}, [80, 'in_quad']);
                                                          }}, 14);

                                                        // ----
                                                    });
                                                  });
                                                }}, [32, 'in_quad'] );
                                              }
                                        });

                                        return ;
                  }


                  if (!GAME.INV.active_item)
                  {
                      // if the light is on 

                      if (LEVEL.MAP.NODES['prison-candle'].lit)
                      {
                        GAME.ACTIONS.SetText ( 'items', 7 );
                      }
                      else
                      {
                        GAME.ACTIONS.SetText ( 'items', 10, function() {
                            GAME.ACTIONS.DialogAsk ( 'items', 11, 0, function ( choice, html ) {
                                  if (choice === 1)
                                  {
                                      GAME.ACTIONS.DialogClose ();
                                      return ;
                                  }

                                  GAME.ACTIONS.SetText ( 'items', 12, function() {
                                    GAME.ACTIONS.DialogClose ();
                                  });
                            });
                        });
                      }
                  }
                  else
                  {
                    var active_item = GAME.INV.active_item;

                    if (active_item.getAttribute('data-id') === 'prison-bone-1')
                    {
                                GAME.Sound.Play('sound-puzzle-solve-1');

                                GAME.ACTIONS.SetText ( 'items', 13, function() {
                                    GAME.INV.RemoveItem ( active_item.getAttribute('data-index') / 1 );
                                    GAME.Sound.Play('sound-rust-1');
                                    LEVEL.MAP.NODES['trapdoor-1'].open = true;
                                    LEVEL.MAP.NODES['trapdoor-1'].el.style.transform = 'translate3d(382px, 200px, 692px) rotateX(90deg) rotateZ(20deg)';

                                    GAME.ACTIONS.SetText ( 'items', 14, function() {

                                        GAME.ACTIONS.DialogAsk ( 'items', 15, 0, function( choice ) {
                                              GAME.ACTIONS.DialogClose ();

                                              if (choice === 0)
                                              {
                                                            GAME.State.control = 0;

                                                            var rot = {
                                                              y: -181.82,
                                                              x: -78,
                                                              z: 0
                                                            };
                                                           // if (GAME.DIMS.deg.y > 170 && GAME.DIMS.deg.y < 270)
                                                           // {
                                                           //   rot.y = 181.82;
                                                           // }
                                                            var move = {
                                                              x: -489,
                                                              y: 0,
                                                              z: -630
                                                            };

                                                            GAME.Fire ('ReqSetRot', {rot:rot, move:move, callback:function(){
                                                              GAME.ACTIONS.SetText ( 'ending', 0, function() {
                                                                GAME.ACTIONS.SetText ( 'ending', 1, function() {
                                                                    // ----
                                                                      var rot = {
                                                                        y: -GAME.DIMS.deg.y,
                                                                        x: GAME.DIMS.deg.x,
                                                                        z: GAME.DIMS.deg.z
                                                                      };
                                                                      var move = {
                                                                        x: -489,
                                                                        y: 0,
                                                                        z: -630
                                                                      };

                                                                      GAME.Fire ('ReqSetRot', {rot:rot, move:move, callback:function(){

                                                                            var rot = {
                                                                              y: 0,
                                                                              x: 0,
                                                                              z: 0
                                                                            };
                                                                            var move = {
                                                                              x: -489,
                                                                              y: -620,
                                                                              z: -660
                                                                            };

                                                                            GAME.Fire ('ReqSetRot', {rot:rot, move:move, callback:function(){
                                                                              GAME.ACTIONS.DialogCover (1);

                                                                              setTimeout(function() {
                                                                                GAME.UTILS.LoadLevel('02');
                                                                              }, 1000);
                                                                            }}, [80, 'in_quad']);
                                                                      }}, 14);

                                                                    // ----
                                                                });
                                                              });
                                                            }}, [32, 'in_quad'] );
                                              }
                                        });
                                    });
                                });
                    }
                    else
                    {
                      GAME.ACTIONS.SetActiveText ( 'items', 8, false );
                      GAME.INV.Deselect ();
                    }
                  }

                }
              },

              'prison-bone-1' : {
                object:1,
                pickable:1,
                hidden:true,
                alpha:true,
                alpha_mask:1,
                icon:'3d/bone-icon.png',
                desc: 'A sturdy bone',
                clss:'bone',
                brightness:8,
                type:'obj-decal-web-1',
                img:'3d/bone.png',
                transform:'translate3d(670px, 195px, 250px) rotateX(90deg) rotateY(-10deg)',

                cast_shadow:false,
                no_shadow:true,
                vertices:[
                  new Vector (675, 250, -50 + 250),
                  new Vector (675, 250, 50 + 250),
                  new Vector (730, 242, 50 + 250),
                  new Vector (730, 242, -50 + 250)
                ],

                interact: function( e ) {
                  if (!GAME.State.control) return ;
                  var dist = GAME.UTILS.Distance ( this );
                  
                  if (dist > 365) {
                    GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                    return ;
                  }

                  // ask to pick up bone
                  GAME.ACTIONS.DialogAsk ('items', 4, 1, function ( choice, html ) {
                      var node = LEVEL.MAP.NODES['prison-bone-1'];

                      if (choice === 1 || !node)
                      {
                        GAME.ACTIONS.DialogClose ();
                        return ;
                      }

                      GAME.ACTIONS.DialogClose ();

                      setTimeout(function() {
                      window.requestAnimationFrame(function() {

                          node.el.parentNode.removeChild( node.el );
                          node.el = null;
                          node.hidden = true;

                          if (node.geom && node.geom.length > 0)
                          {
                            for (var i = 0; i < node.geom.length; ++i)
                            {
                              node.geom[i].hidden = true;
                            }
                          }

                          // add in inventory
                          GAME.Sound.Play ('sound-item-pickup-1');
                          GAME.INV.AddItem ( node );
                          GAME.ACTIONS.SetActiveText ( 'items', 5, false, 'old' );
                       });
                       },100);

                    // ---
                  });
                }
              },


              'prison-web-1' : {
                object:1,
                type:'obj-decal-web-1',
                tag:'div',
                transform:'translate3d(660px,-152px,750px) rotateX(45deg) rotateY(-120deg)',
                interact: function( e ) {
                      if (!GAME.State.control) return ;

                      var dist = GAME.UTILS.Distance ( this );
                      if (dist > 390) {
                        GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                        return ;
                      }

                      if (GAME.INV.active_item)
                      {
                            GAME.ACTIONS.SetActiveText ( 'items', 8, false );
                            GAME.INV.Deselect ();
                      }
                      else
                        GAME.ACTIONS.SetText ( 'items', 19 );
                }
              },

              'prison-candle' : {
                object:1,
                type: 'obj-candle-1',
                face_camera:1,
                clss:'candle-parent no-anim',
                transform:'translate3d(722px, 44px, 550px) rotateY(-90deg)',
                orig_trans:'translate3d(722px, 44px, 550px)',

                lit: 1,

                interact: function( e ) {
                  if (!GAME.State.control) return ;

                  var dist = GAME.UTILS.Distance ( this );
                  
                  if (dist > 380) {
                    GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                    return ;
                  }

                  var node = LEVEL.MAP.NODES['prison-candle'];

                  // ---
                  if (node.lit)
                  {
                      if (GAME.INV.active_item)
                      {
                        var active_item = GAME.INV.active_item;

                        if (active_item.getAttribute('data-id') === 'book')
                        {
                              GAME.ACTIONS.DialogAsk ('items', 1, 2, function ( choice, html ) {
                                  if (choice === 1)
                                  {
                                    GAME.ACTIONS.DialogClose ();
                                    return ;
                                  }

                                  GAME.ACTIONS.SetText ( 'items', 17, function() {
                                      GAME.ACTIONS.DialogClose ();
                                  });
                                  GAME.INV.RemoveItem ( active_item.getAttribute('data-index') / 1 );
                                  GAME.Sound.Play('sound-puzzle-solve-1');

                                  return ;
                              });
                        }
                        else
                        {
                            GAME.ACTIONS.SetActiveText ( 'items', 8, false );
                            GAME.INV.Deselect ();
                        }

                        return ;
                      }

                      GAME.ACTIONS.DialogAsk ('items', 1, 0, function ( choice, html ) {
                          if (choice === 1)
                          {
                            GAME.ACTIONS.DialogClose ();
                            return ;
                          }

                          var play_sound = GAME.Sound.Play('sound-candle-1');
                          GAME.ACTIONS.DialogClose ();
                          node.lit = false;

                          setTimeout(function() {
                          window.requestAnimationFrame(function(timestamp) {
                              // extinguish candle and shut off light
                              node.el.className = 'candle-parent obj no-anim';
                              setTimeout(function() {
                                node.el.className = 'candle-parent obj off';
                              },0);

                              setTimeout(function() {
                                // light off
                                  GAME.LEVEL.MAP.LIGHTS['light-3'].active = 1;
                                  GAME.LEVEL.MAP.LIGHTS['light-1'].active = 0;
                                  GAME.UTILS.RebuildLight ( GAME.LEVEL.MAP.LIGHTS['light-1'], true );

                                  var spider_node = GAME.LEVEL.MAP.NODES['spider-1'];
                                  if (spider_node.hidden)
                                  {
                                    spider_node.hidden = false;
                                    move.appendChild( spider_node.el );
                                    GAME.__ai && GAME.__ai (timestamp);
                                  }

                              },45);
                          });
                          }, play_sound ? 280 : 100);

                          return ;
                      });
                  }
                  else
                  {
                      if (GAME.INV.active_item)
                      {
                        var active_item = GAME.INV.active_item;

                        if (active_item.getAttribute('data-id') === 'book')
                        {
                          GAME.ACTIONS.SetText ( 'items', 18 );
                          GAME.INV.Deselect ();

                          return ;
                        }
                      }

                      GAME.ACTIONS.DialogAsk ('items', 1, 1, function ( choice, html ) {
                          if (choice === 1)
                          {
                            GAME.ACTIONS.DialogClose ();
                            return ;
                          }

                          var play_sound = GAME.Sound.Play('sound-candle-2');
                          GAME.ACTIONS.DialogClose ();
                          node.lit = true;

                          setTimeout(function() {
                          window.requestAnimationFrame(function() {
                              // light candle and render light
                              node.el.className = 'candle-parent obj no-anim';
                              setTimeout(function() {
                                node.el.className = 'candle-parent obj';
                              },300);

                              setTimeout(function() {
                                // light on
                                  GAME.LEVEL.MAP.LIGHTS['light-3'].active = 0;
                                  GAME.LEVEL.MAP.LIGHTS['light-1'].active = 1;
                                  GAME.UTILS.RebuildLight ( GAME.LEVEL.MAP.LIGHTS['light-1'] );
                              },45);
                          });
                          }, play_sound ? 500 : 100);

                          return ;
                      });
                  }
                  // ---
                }
              },

              'prison-bed' : {
                  object : 1,
                  type   : 'obj-prison-bed-1',
                  transform:'translate3d(-298px, 247px, 80px)',
                  interact: function( e ) {
                    if (!GAME.State.control) return ;
                    var dist = GAME.UTILS.Distance ( this );
                    
                    if (dist > 500) {
                      GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                      return ;
                    }

                    GAME.ACTIONS.SetText ( 'items', 0 );
                  }
              },

              'candle-crate' : {
                object: 1,
                type :'obj-crate-1',
                transform:'translate3d(725px, 90px, 550px)'
              },

              'crate-big' : {
                object: 1,
                type :'obj-crate-2',
                // hide_frustrum:true,
                transform:'translate3d(-320px, 200px, 382px)',
                matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -320, 200, 132 + 250, 1]
              },

              /*
              'shape' : {
                object:1,
                type:'obj-shape-1',
                transform:'translate3d(-270px, 100px, 220px) rotateY(26deg)'
              },*/

              'book' : {
                pickable:1,
                icon:'3d/book-icon.png',
                object: 1,
                type :'obj-book-1',
                desc: 'An old book',

                transform:'translate3d(-342px, 148px, 357px) rotateY(26deg)',
                matrix: [0.898794, 0, -0.438371, 0, 0, 1, 0, 0, 0.438371, 0, 0.898794, 0, -342, 148, 357, 1],
                interact: function( e ) {
                  var dist = GAME.UTILS.Distance ( this );
                  
                  if (dist > 340) {
                    GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                    return ;
                  }

                  GAME.ACTIONS.SetText ( 'items', 16, function () {


                              GAME.ACTIONS.DialogAsk ('items', 4, 0, function ( choice, html ) {
                                  var node = LEVEL.MAP.NODES['book'];

                                  if (choice === 1 || !node)
                                  {
                                    GAME.ACTIONS.DialogClose ();
                                    return ;
                                  }


                                  GAME.ACTIONS.DialogClose ();

                                  setTimeout(function() {
                                  window.requestAnimationFrame(function() {

                                      node.el.parentNode.removeChild( node.el );
                                      node.el = null;

                                      node.hidden = true;

                                      if (node.geom && node.geom.length > 0)
                                      {
                                        for (var i = 0; i < node.geom.length; ++i)
                                        {
                                          node.geom[i].hidden = true;
                                        }
                                      }

                                      // rebuild lights
                                      GAME.UTILS.RebuildLight ( GAME.LEVEL.MAP.LIGHTS['light-2'], true );

                                      // add in inventory
                                      GAME.Sound.Play ('sound-item-pickup-1');
                                      GAME.INV.AddItem ( node );
                                      GAME.ACTIONS.SetActiveText ( 'items', 5, false, 'old' );

                                      setTimeout(function () {
                                      window.requestAnimationFrame(function () {
                                                var play_sound = GAME.Sound.Play('sound-guard-1');

                                                // shake camera
                                                var rot_nil = {
                                                  y: 0,
                                                  x: 0,
                                                  z: 0
                                                };
                                                var mov_orig = {
                                                  x: -GAME.DIMS.pos.x,
                                                  z: -GAME.DIMS.pos.z,
                                                  y: 0
                                                };
                                                var move = {
                                                  x: -GAME.DIMS.pos.x - 3.3,
                                                  z: -GAME.DIMS.pos.z - 2,
                                                  y: 4.5
                                                };

                                                GAME.Fire ('ReqSetRot', {rot:rot_nil, move:move, callback:function() {
                                                    var rot_nil = {
                                                      y: 0,
                                                      x: 0,
                                                      z: 0
                                                    };
                                                  GAME.Fire ('ReqSetRot', {rot:rot_nil, move:mov_orig}, 10);
                                                }}, 8);


                                                // show guard/knight
                                                var move = document.getElementById('move');
                                                var guard_img = new Image();
                                                guard_img.src = '3d/guard-2.png';
                                                guard_img.id = 'guard';
                                                move.appendChild( guard_img );

                                                // add food item.
                                                var food_node = GAME.LEVEL.MAP.NODES['prison-food-1'];
                                                food_node.hidden = false;

                                                move.appendChild( food_node.el );
                                                GAME.UTILS.RebuildLightForNode ( food_node );

                                                // -------------
                                                setTimeout(function(){
                                                window.requestAnimationFrame(function () {

                                                          // GAME.ACTIONS.DialogAsk ( 'guard', 0, null, function() {
                                                          GAME.ACTIONS.SetText ( 'guard', 0, function() {
                                                              var centroid = GAME.LEVEL.MAP.NODES['wall-door'].centroid.clone();
                                                              centroid.y -= 100;

                                                              var rot = GAME.UTILS.RotateCameraTo (centroid);

                                                              GAME.Fire ('ReqSetRot', rot, [64, 'inout_quad']);

                                                              GAME.ACTIONS.SetText ( 'guard', 1, function() {

                                                                  var ttr = setTimeout(function() {
                                                                      guard_img.className = 'act';
                                                                      GAME.Sound.Play ('sound-guard-2');

                                                                      setTimeout(function() {
                                                                        guard_img.parentNode.removeChild(guard_img);
                                                                        guard_img = null;
                                                                      }, 2200);

                                                                      ttr = null;
                                                                  }, 4000);

                                                                  GAME.ACTIONS.SetText ( 'guard', 2, function() {
                                                                      GAME.ACTIONS.DialogClose ();

                                                                      if (ttr) {
                                                                         clearTimeout(ttr);
                                                                          setTimeout(function() {
                                                                              guard_img.className = 'act';
                                                                              GAME.Sound.Play ('sound-guard-2');

                                                                              setTimeout(function() {
                                                                                guard_img.parentNode.removeChild(guard_img);
                                                                                guard_img = null;
                                                                              }, 2200);
                                                                          }, 180);
                                                                      }

                                                                      // --
                                                                  });
                                                              });
                                                          });
                                                });
                                                }, play_sound ? 140 : 0);
                                      // ------  
                                      });
                                      },1200);
                                      // --------

                                  });
                                  }, 100);

                                  return ;
                              });



                  });


                }
                // ----
              }
            },


            LIGHTS: {
              'ambience' : {color:{r:255,g:255,b:255}, intensity: 0.11, active: 1},

              //712px, 40px, 548px
              // x:640, y: 40, z:280  + 250,
              'light-1' : { x:640, y: 40, z:280  + 250, intensity:0.9, color:{r:255,g:100,b:100}, shadow:1, max_distance:542, drawIcon:0, active:1},
              'light-2' : {x:-394, y: 30, z:15   + 250, intensity:0.9, color:{r:80,g:80,b:255}, shadow:1, max_distance:980, drawIcon:0, active:1},
              // 'light-2' : {x:-320, y: 30, z:382, intensity:0.9, color:{r:80,g:80,b:255}, shadow:1, max_distance:980, drawIcon:1, active:1},

              'light-3' : { x:520, y: 180, z:440 + 250, intensity:0.55, color:{r:40,g:245,b:120}, shadow:0, max_distance:340, drawIcon:0, active:0},
              'light-4' : { x:485, y:486, z:685, intensity:1.6, color:{r:61,g:182,b:226}, only:['trapdoor-wall-1','trapdoor-wall-2','trapdoor-wall-3','trapdoor-wall-4'], shadow:1, max_distance:830, drawIcon:0, active:1}
            },

            SOUNDS : {
              'sound-food-1' : {path:'3d/sound/food-3.mp3', volume: 0.5, loop: false},
              'sound-candle-1' : {path:'3d/sound/candle-1.mp3', volume: 0.57, loop: false},
              'sound-candle-2' : {path:'3d/sound/candle-2.mp3', volume: 0.8, loop: false},
              'sound-guard-1' : {path:'3d/sound/guard-1.mp3', volume : 0.38, loop: false},
              'sound-guard-2' : {path:'3d/sound/guard-2.mp3', volume : 0.45, loop:false },
              'sound-door-lock-1' : {path:'3d/sound/door-lock.mp3', volume : 0.37, loop: false},
              'sound-item-pickup-1' : {path:'3d/sound/item-pickup-1.mp3', volume : 1.0, loop: false},
              'sound-rust-1' : {path:'3d/sound/rust-1.mp3', volume : 0.7, loop: false}
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


        // guard convo
        'guard' : [

          // 0
          '<i class="brown">*A loud bang is heard on your door, and <i class="orange">a guard</i> stands on the other side*</i>',
          
          // 1
          [
              'You awake yet? Time to eat. Enjoy it, might be your last.',
              'Why even waste good food to filth such as you... ', '<i class="brown">*he spits on the ground*</i>'
          ],

          // 2
          [
              'I \'d feed you to the dogs this very moment if the torturer \'d let me.',
              '<i class="darkgreen">*As he walks away, your thoughts of interacting with him are gone*</i> ', 'You must find a way out, and soon!'
          ]
        ],

        // items-text
        'items' : [

            // bed text
            'They expect me to sleep on this. <i class="blue">Yikes.</i>', // 0

            // light choice 1
            [
                {
                  type: 'choice',
                  text : 'Do you want to put out the flame?',
                  options : [
                    { 'text' : 'Yes' }, { 'text' : 'No' }
                  ]
                },

                {
                  type : 'choice',
                  text : 'Light candle?',
                  options : [
                    { 'text' : 'Yes' }, { 'text' : 'No' }
                  ]
                },

                {
                  type : 'choice',
                  text : 'Burn the book?',
                  options : [
                    { 'text' : 'Yes' }, { 'text' : 'No' }
                  ]
                }
            ],

            ['A bright full moon on a starless sky. My na would surely call this a terrible omen.', 'In hindsight... she was right.'], // 2

            'Locked... I need to find a way out.', // 3

            // 4
            [
                {
                  type: 'choice',
                  text : 'Pick up the book?',
                  options : [
                    { 'text' : 'Yes' }, { 'text' : 'No' }
                  ]
                },

                {
                  type: 'choice',
                  text : 'Pick up the bone?',
                  options : [
                    { 'text' : 'Yes' }, { 'text' : 'No' }
                  ]
                }
            ],

            'Picked up item.', // 5

            [ // 6
                {
                  type: 'choice',
                  text : 'Eat the food?',
                  options : [
                    { 'text' : 'Yes' }, { 'text' : 'No' }
                  ]
                }
            ],

            // 7
            ['A rusty bulky metal grate. If you stay silent enough you think you can hear water ', 
            'running below. As you approach, the putrid stench makes you wretch.', 'It has been used as a lavatory.'], 
            
            'Cannot use this item here.', // 8

            // 9
            ['You grab the stale meat with your hands, and bite into it with great pleasure, ', 'stopping only to let out brief gasps of relief.',
              'You cannot recognize what animal it was taken from, nor the body part, ', 'but it is well cooked.  ', //you can taste undertones of black onions and milkweed.',
              'somewhere there is a prison cook who cares for people more than the guards.',
              'Sadly, it was just a few pieces of meat stuck on a big sturdy bone.'],


            // 10
            [
              'You are surprised to see light coming from the rusty sewer grate. ',
              'Perhaps there is a way out.'
            ],
            [ // 11
                {
                  type: 'choice',
                  text : 'Lift the grate?',
                  options : [
                    { 'text' : 'Yes' }, { 'text' : 'No' }
                  ]
                }
            ],
            [ // 12
              'You try to lift the grate to no avail. Your body is weak and malnourished, ', 'or the grate t is weld shut to the floor. perhaps both.'
            ],

            [ // 13
              'You use the bone as a lever and lift the grate, it breaks in the process ', 'but gives you enough leeway to drag it our of the way.'
            ],

            [ // 14
              'The passage is dark and narrow. ', 'Perhaps too narrow for most adults but you think you can squeeze through.'
            ],

            [ // 15
                {
                  type: 'choice',
                  text : 'Descend to the sewers?',
                  options : [
                    { 'text' : 'Yes' }, { 'text' : 'No' }
                  ]
                }
            ],


            // 16
            [
              'An old leatherbound book. Weird symbols decorate its cover. You do not know ',
              'if it belonged to the previous prisoner of this cell or it was meant for you.'
            ],

            // 17
            [ 'You light the book on fire and mesmerized watch it burn.',
              'You are in too much discomfort to laugh, but are able to crack a wide ear to ear grin.',
              'Its pages shrivel and shrink as the flame engulfs them,',
              'leaving behind a mere black stain of ash.'],

            // 18
            'Cannot burn books without a lit flame...',

            // 19
            'I hate spiders...'
        ],

        // intro-text
        'intro' : [ {
                        title: 'You open your eyes to a dark, unfamiliar room.',
                        body: ['your most recent memory, the whistling of arrows as your caravan got ',
                               'mercilessly attacked. ',
                               'Where you captured? But by whom and where are you now?']
                    },

                    {
                      title: 'you feel immensely fatigued.',
                      body: ['As you move your tongue in your dry mouth, you recoil as you notice that ',
                             'you now have less teeth than before.',
                             'You quickly pull yourself together and squint your eyes trying to ',
                             'make sense of your surroundings. There has to be a way out.']
                    },

                    {
                      title:'Your eyes slowly begin to adjust to the darkness...',
                      body: ['you try to make sense of your surroundings, there has to be a way out of this place.']
                    },

                    '<i class="darkgray">(Your vision returns to normal)</i>',

                    'Last thing you remember was the caravan travelling towards the capital.'
                  ],

        'ending' : [
                      [ 'Falling an uncertain height, through a small hole covered in filth is not ideal, ', 
                        'but certainly beats being tortured alive.'],

                      [ 'You take a deep breath and start counting upwards to three. ',
                        'Once you reach number two, you plunge forwards. There is no time to waste, ',
                        'and waiting would only plant seeds of doubt in your mind. You then, fall in the dark.' ]
        ]
        // --
      }
  };


  GAME.UTILS._filterGameObjects (GAME_OBJ);
  GAME.Fire ('ReqLoadLevel', LEVEL, GAME_OBJ);
  // ---

})( window, document, GAME );