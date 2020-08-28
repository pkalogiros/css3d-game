(function ( w, d, GAME ) {
  'use strict';

  var _y_zero = 250;

  var GAME_OBJ = {
        // invisible plane
        'obj-invis-1' : {
          id:'obj-invis-1',
          type: 'object',
          clss:'invis',
          walk: true,
          cast_shadow: false,
          geom:[]
        },



        // triangle connector

        // ROCK
        'obj-shape-rock' : {
            qv:1,
            id:'obj-shape-rock',
            img : '3d/level-2/dirt-1.jpg',
            type: 'object',
            clss: 'model',
            walk: true,
            cast_shadow:true,
            isnew:true,

            geom:[
              {
                clss:'model',
                shape:'face_obj',
                shape_args:[
                      ["", "v 1.323880 -1.201069 -0.314535",
                        "v 1.594284 -1.090939 -2.253293",
                        "v 1.969650 -1.535466 -0.812106",
                        "v 1.814408 -0.804400 -1.128600",
                        "v 0.389483 -1.472671 -0.680323",
                        "v 2.013830 -1.783094 -1.864517",
                        "v 0.770212 -0.609762 -1.254844",
                        "v 0.258474 -0.969815 -2.059049",
                        "v 0.743304 -2.207323 -1.353098",
                        "v 0.977458 -1.808604 -2.294710",
                        "f 10 2 6",
                        "f 4 6 2",
                        "f 1 7 5",
                        "f 2 10 8",
                        "f 9 5 8",
                        "f 9 3 1",
                        "f 7 2 8",
                        "f 4 7 1",
                        "f 4 2 7",
                        "f 3 9 6",
                        "f 10 9 8",
                        "f 4 1 3",
                        "f 5 9 1",
                        "f 6 4 3",
                        "f 8 5 7",
                        "f 9 10 6"]
                ]
              }
          ]
        },


        'obj-decal-normals' : {
          id:'obj-decal-normals',
          type: 'object',
          clss:'decal',
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
        // OBJECTS
        ///////////////////////////////////////////////////////////////////

        'obj-torch-unlit' : {
            qv:1,
            id:'obj-torch-unlit',
            type: 'object',
            clss: 'torch-unlit',
            walk: true,
            cast_shadow:true,
            isnew:true,

            img : '3d/wood-1.jpg',

            geom:[
              {
                clss:'',
                shape:'rectangle',
                shape_args:[5, 72, 5]
              }
            ]
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
                tag:'div', // img 'img'
                cast_shadow:true,
                //transform:'translate3d(14px, 0px, 14px)',
                sides:{back:1, front:1, bottom:1},
                shape_args:[340, 25, 20]
              }
            ]
        },

        ///////////////////////////////////////////////////////////////////
        // GEOMETRY (WALLS, FLOORS, LANDSCAPE ETC)
        ///////////////////////////////////////////////////////////////////
        'dungeon-ceil-1': {
          clss:'dungeon-ceil-340x500',
          img:'3d/dungeon-ceiling-2_lossy.jpg',
          width:  340,
          height: 500,
          walk: true,
          cast_shadow:true,
          isnew:true,
          qv:0,
          tag:'div', // img

          x:-250, y:0, z:0,
          transform:' rotateX(-90deg)',

          vertices: function (width, height)  {}
        },

        'dungeon-ceil-1-large': {
          extends:'dungeon-ceil-1',
          clss:'dungeon-ceil-800x500',
          width:340,
          height:340
        },
        'dungeon-ceil-2-large': {
          extends:'dungeon-ceil-1',
          clss:'dungeon-ceil-800x500',
          width:500,
          height:340
        },


        // floors
        'cave-water-1': {
          clss:'cave-water-1',
          width:  340,
          height: 500,
          walk: true,
          cast_shadow:false,
          isnew:true,

          use: 'water',
          useval:'dirty',

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, y:0, z:0,
          transform:' rotateX(90deg)',

          vertices: function (width, height)  {}
        },

        'cave-water-1b': {
          extends:'cave-water-1',
          qv:256
        },

        'cave-water-1-fall': {
          clss:'cave-water-1-fall',
          width:  340,
          height: 340,
          walk: true,
          cast_shadow:false,
          isnew:true,

          use: 'water',
          useval:'dirty',

          //img:'3d/water-montage.jpg',
          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, y:0, z:0,
          transform:' rotateX(90deg)',

          vertices: function (width, height)  {}
        },


        'cave-water-2': {
          qv:256,

          clss:'cave-water-1',
          width:  340,
          height: 500,
          walk: true,
          cast_shadow:true,
          isnew:true,

          use: 'water',
          useval:'dirty',

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, y:0, z:0,
          transform:' rotateX(90deg) rotateZ(-90deg)',

          vertices: function (width, height)  {}
        },

        'cave-water-2-h340': {
          qv:256,

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

        'ramp-water-2': {
          qv:256,

          clss:'cave-water-1 dirt',
          width:  340,
          height: 500,
          walk: true,
          cast_shadow:false,
          isnew:true,

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, y:0, z:0,
          transform:'rotateX(70deg)', // rotateY(30deg) rotateZ(-90deg)',
          vertices: function (width, height)  {}
        },

        // walls
        'cave-waterfall-1': {
          qv:256,

          clss:'cave-waterfall-1-w340',
          width:  340,
          height: 500,
          walk:   false,
          cast_shadow: true,
          isnew:true,

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:' rotateX(40deg)',
          vertices: function (width, height)  {}
        },

        'cave-waterfall-1-w500': {
          qv:256,

          clss:'cave-waterfall-1-w500',
          width:  500,
          height: 500,
          walk:   false,
          cast_shadow: true,
          isnew:true,

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:' rotateX(40deg)',
          vertices: function (width, height)  {}
        },

        'cave-wall-1-w340': {
          clss:'cave-wall-1-w340',
          width:  340,
          height: 300,
          walk:   false,
          cast_shadow: true,
          isnew:true,

          img:'3d/level-2/cave-wall-grate-1.png',
          alpha:true,
          alpha_mask:1,

          x:-250,//-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:'',

          vertices: function (width, height)  {}
        },

        'cave-wall-1': {
          qv:256,
          clss:'cave-wall-1',
          width:  500,
          height: 300,
          walk:   false,
          cast_shadow: true,
          isnew:true,
          tag:'div', // img

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:'',
          vertices: function (width, height)  {}
        },

        'cave-wall-2': {
          qv:256,
          clss:'cave-wall-2',
          width:  500,
          height: 300,
          walk:   false,
          cast_shadow: true,
          isnew: true,
          tag:'div', // img

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, 
          y:0, //-300 + _y_zero, // -height + _y_zero
          z:0, //-250,

          transform:'rotateY(-90deg)',
          vertices: function (width, height)  {}
        },
        'cave-wall-3': {
          qv:256,
          clss:'cave-wall-3',
          width:  500,
          height: 300,
          walk:   false,
          cast_shadow: true,
          isnew:true,
          tag:'div', // img

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, 
          y:0, //-300 + _y_zero, // -height + _y_zero
          z:0, //-250,

          transform:'rotateY(90deg)',
          vertices: function (width, height)  {}
        },

        'cave-wall-2b': {
          extends: 'cave-wall-2',

          qv:0
        },
        'cave-wall-2b-w340': {
          extends: 'cave-wall-2b',
          width:340
        },

        'cave-wall-3b': {
          extends: 'cave-wall-3',

          qv:0
        },

        'cave-wall-3-w340': {
          clss:'cave-wall-1-w340',
          width:  340,
          height: 300,
          walk:   false,
          cast_shadow: true,
          isnew:true,

          img:'3d/level-2/cave-wall-grate-1.png',
          alpha:true,

          x:-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:'rotateY(90deg)',
          vertices: function (width, height)  {}
        },
        'cave-door-3-w340': {
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

          transform:'rotateY(90deg)',
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

        'cave-wall-3-w160': {
          qv:256,
          clss:'cave-wall-1-w160',
          width:  160,
          height: 300,
          walk:   false,
          cast_shadow: true,
          isnew:true,

          img:'3d/wall-dungeon2_lossy.jpg',

          x:-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,

          transform:'rotateY(90deg)',
          vertices: function (width, height)  {}
        },

        'cave-wall-4': {
          qv:256,
          clss:'cave-wall-4',
          width:  500,
          height: 300,
          walk:   false,
          cast_shadow: true,
          isnew:true,
          tag:'div', // img

          img:'3d/wall-dungeon2_lossy.jpg',

          transform:'rotateY(180deg)',

          x:-250, 
          y:0,//-300 + _y_zero, // -height + _y_zero
          z:0,//-250,
          vertices: function (width, height)  {}
        },


        'cave-wall-4b':{
          extends: 'cave-wall-4',
          clss:'cave-wall-4b',
          width:340
        }


  };

  var LEVEL = {
      TITLE:'02-SEWERS',
      SETTINGS: {
        FRUSTRUM_SKIP : 3
      },
      PRELOAD: [
        '3d/level-2/cave-wall-grate-1.png',
        '3d/level-2/cave-door-1.jpg',
        '3d/dungeon-floor-3_lossy.jpg',
        '3d/wall-dungeon2_lossy.jpg',
        '3d/level-2/decal-skeleton-2.png',
        '3d/level-2/wall-moss.png',
        '3d/out_lighter_single.gif'
      ],


      CONF: function ( val ) {
        if (val === 'soporDoor') {
            this.MOVE = {
              splash:false,
              rot:{x:-2.5,y:-102,z:0},
              move:{x:-1599, y:-340, z:-2612}
            };
        } else if (val === 'storage') {
            this.MOVE = {
              splash:false,
              rot:{x:-20,y:-275,z:0},
              move:{x:564, y:0, z:-2700}
            };
        }
        // --
      },

      INIT: function ( lvl ) {
        if (!GAME.State.flags.lvl2) GAME.State.flags.lvl2 = {};

      	GAME.Sound.Play ('sound-water-1');

        // ####
        //GAME.LEVEL.MAP.NODES['shape-1'].vertices = GAME.LEVEL.MAP.NODES['shape-1'].geom[0].vertices;
        //GAME.LEVEL.MAP.NODES['shape-2'].vertices = GAME.LEVEL.MAP.NODES['shape-2'].geom[0].vertices;
        //GAME.LEVEL.MAP.NODES['shape-3'].vertices = GAME.LEVEL.MAP.NODES['shape-3'].geom[0].vertices;

        // add fake wall nodes for waterfall
        // ----------

        /*
        if (GAME.LEVEL.MAP.NODES['floor-room-fall-4'].vertices)
        {
            var fake_wall = {
              walk:false,
              beacon:['2'],
              angle:GAME.LEVEL.MAP.NODES['floor-room-fall-4'].angle,
              vertices:[
                  GAME.LEVEL.MAP.NODES['floor-room-fall-4'].vertices[2],
                  GAME.LEVEL.MAP.NODES['floor-room-fall-4'].vertices[3]
              ]
            };
            GAME.LEVEL.MAP.NODES['fake-wall-1'] = fake_wall;

            fake_wall = {
              walk:false,
              beacon:['2'],
              angle:GAME.LEVEL.MAP.NODES['floor-room-fall-3'].angle,
              vertices:[
                  GAME.LEVEL.MAP.NODES['floor-room-fall-3'].vertices[2],
                  GAME.LEVEL.MAP.NODES['floor-room-fall-3'].vertices[3]
              ]
            };
            GAME.LEVEL.MAP.NODES['fake-wall-2'] = fake_wall;

            fake_wall = {
              walk:false,
              beacon:['2'],
              angle:GAME.LEVEL.MAP.NODES['floor-room-fall-2'].angle,
              vertices:[
                  GAME.LEVEL.MAP.NODES['floor-room-fall-2'].vertices[2],
                  GAME.LEVEL.MAP.NODES['floor-room-fall-2'].vertices[3]
              ]
            };
            GAME.LEVEL.MAP.NODES['fake-wall-3'] = fake_wall;

            fake_wall = {
              walk:false,
              beacon:['2'],
              angle:180,
              vertices:[
                  GAME.LEVEL.MAP.NODES['ramp-2'].vertices[0],
                  GAME.LEVEL.MAP.NODES['ramp-2'].vertices[1]
              ]
            };
            GAME.LEVEL.MAP.NODES['fake-wall-4'] = fake_wall;
        }
        // -----
        */

        if (GAME.LEVEL.MOVE.splash)
        {
            GAME.Sound.SetSteps ('water-step-1', 'water-step-2', {chance:0.82, sounds:[{chance:0.0, sound:'water-step-3'}, {chance:0.55, sound:'water-step-4'}] });
            GAME.LEVEL.BEACON = '1';
        }
        else
        {
            GAME.Sound.SetSteps ('sound-footsteps-1', 'sound-footsteps-2');
            GAME.LEVEL.BEACON = '2';
        }

        GAME.State.perf.dist_min = 780;

        var __MAKE_3D = function ()
        {
            var begin_animate = false;
            var stop_animate = false; 
            window.SetAnimate = function (val) {
              begin_animate = val;
            };
            window.renderer = new THREE.WebGLRenderer({ canvas: document.getElementsByTagName('canvas')[0], alpha:true });
            window.renderer.setPixelRatio( window.devicePixelRatio );
            window.renderer.setSize( 140, 140); //250, 500 );
            window.renderer.setClearColor( 0xffffff, 0);
            window.renderer.gammaOutput = true;
            //window.renderer.gammaFactor = 2.2;
            window.renderer.shadowMap.enabled = true;
            
            window.cube = new THREE.Mesh( new THREE.CubeGeometry( 340, 300, 30 ), new THREE.MeshPhongMaterial() );
            window.cube.position.y = 0;



            window.loader = new THREE.GLTFLoader();

            var __setContent = function( scene, clips ) {

            };
            window.loader.load('three/duck/leech/scene.gltf', function( gltf ) {
                const _scene = gltf.scene || gltf.scenes[0];
                const _clips = gltf.animations || [];
                //__setContent(scene, clips);

                _scene.children[0].position.x = centroid.x;
                _scene.children[0].position.y = -195 + centroid.y;
                _scene.children[0].position.z = centroid.z;
                _scene.children[0].rotation.z = 1.8;


                window.scene.add( _scene );
                window._scene = _scene;


                _clips.forEach((clip) => {
                  if (clip.validate()) clip.optimize();
                });

                window._clips = _clips;
                window.mixer = new THREE.AnimationMixer( _scene );
                
                var walk_anim = mixer.clipAction( _clips[ 8 ] );
                walk_anim.timeScale = 1/3.3;
                walk_anim.weight = 1;
                walk_anim.play ();

//                var idle1_anim = mixer.clipAction( _clips[ 6 ] );
//                idle1_anim.timeScale = 1/2;
//                idle1_anim.weight = 0;
//                idle1_anim.play ();

                var idle2_anim = mixer.clipAction( _clips[ 2 ] );
                idle2_anim.timeScale = 1/2;
                idle2_anim.weight = 0;
                idle2_anim.play ();

                
                // attack animation
                var attack1_anim = mixer.clipAction( _clips[ 16 ] );
                attack1_anim.timeScale = 1/2;
                attack1_anim.weight = 0;
                attack1_anim.play ();

                // attack waiting
                var attack2_anim = mixer.clipAction( _clips[ 14 ] );
                attack2_anim.timeScale = 1/2;
                attack2_anim.weight = 0;
                attack2_anim.play ();

                var idle3_anim = mixer.clipAction( _clips[ 7 ] );
                idle3_anim.weight = 0;
                idle3_anim.play ();

                var goaway_anim = mixer.clipAction( _clips[ 30 ] );
                goaway_anim.timeScale = 1/1.3;
                goaway_anim.weight = 0;
                goaway_anim.play ();

                mixer.addEventListener( 'finished', function( e ) {
                  if (e.action === attack1_anim)
                  {
                    attack2_anim.timeScale = 1/2;
                    attack2_anim.weight = 1;
                    attack2_anim.time = 0;
                    attack2_anim.enabled = true;
                  }
                  else if (e.action === goaway_anim)
                  {
                    // remove the creature....
                    stop_animate = true;

                    if (window.renderer)
                    {
                      window.renderer.forceContextLoss();
                      window.renderer.context = null;
                      window.renderer.domElement = null;
                      window.renderer = null;
                      window.scene = null;
                      window.camera = null;
                    }

                    console.log( "removed the creature" );
                  }
                });

                window.AnimCrossFade = function () {
                    idle2_anim.weight = 1;
                    idle2_anim.timeScale = 1/2.2;
                    idle2_anim.time = 0;
                    idle2_anim.enabled = true;

                    walk_anim.crossFadeTo( idle2_anim, 1.0, false );
                };

                window.AnimCrossFade2 = function () {
                  walk_anim.timeScale = 1/3.2;
                  walk_anim.weight = 1;
                  walk_anim.time = 0;
                  walk_anim.enabled = true;

                  idle2_anim.crossFadeTo( walk_anim, 0.6, false );
                };

                window.AnimCrossFade3 = function() {
                  attack1_anim.timeScale = 1/2.2;
                  attack1_anim.weight = 1;
                  attack1_anim.time = 0;
                  attack1_anim.enabled = true;

                  walk_anim.crossFadeTo( attack1_anim, 0.5, false );
                  // attack1_anim.setLoop (THREE.LoopPingPong, 5000);

                  attack1_anim.setLoop (THREE.LoopOnce, 1);
                };

                window.AnimCrossFade4 = function () {
                  idle3_anim.weight = 1;
                  idle3_anim.time = 0;
                  idle3_anim.enabled = true;

                  attack2_anim.crossFadeTo( idle3_anim, 0.8, false );
                };

                window.AnimCrossFade5 = function () {
                  walk_anim.timeScale = 1/3;
                  walk_anim.weight = 1;
                  walk_anim.time = 0;
                  walk_anim.enabled = true;

                  idle3_anim.crossFadeTo( walk_anim, 0.6, false );
                };

                window.AnimCrossFade6 = function () {
                  goaway_anim.timeScale = 1/1.3;
                  goaway_anim.weight = 1;
                  goaway_anim.time = 0;
                  goaway_anim.enabled = true;

                  walk_anim.crossFadeTo( goaway_anim, 0.6, false );
                  goaway_anim.setLoop (THREE.LoopOnce, 1);
                };
                // ------
            });

            window.camera = new THREE.PerspectiveCamera( 40, 140/140, 1, 10000 );
            window.camera.position.z = 800;
            window.scene = new THREE.Scene();

            //scene.background = new THREE.Color( 0x000000 );
            //scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

            var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff );
            hemiLight.intensity = 0.10;
            hemiLight.position.set( 0, 0, 0 );
            window.scene.add( hemiLight );
            // window.scene.add( cube );

              for (var k in GAME.LEVEL.MAP.LIGHTS)
              {
                  if (k === 'ambience') continue;

                  var light = GAME.LEVEL.MAP.LIGHTS[k];

                  if (!light.active) continue;

                  var rgb = light.color.b | (light.color.g << 8) | (light.color.r << 16);
                  rgb = '#' + (0x1000000 + rgb).toString(16).slice(1);

                  var lightsource = new THREE.PointLight( rgb, light.intensity, light.max_distance );
                  lightsource.decay = 5;
                  lightsource.position.set( light.direction.x, light.direction.y, light.direction.z );
                  window.scene.add( lightsource );  
              }

              window.sven = 720;
              // move both the camera and the objet by it's centroid
              var node = GAME.LEVEL.MAP.NODES['sewer-man'];
              var centroid = GAME.LEVEL.MAP.NODES['sewer-man'].centroid;

              window.cube.position.x = centroid.x;
              window.cube.position.y = centroid.y;
              window.cube.position.z = centroid.z;

              window.camera.position.x = centroid.x;
              window.camera.position.y = centroid.y;
              window.camera.position.z = centroid.z + window.sven;

              var prevTime = 0;
            var __animate = function (time) {
              if (!begin_animate)
              {
                requestAnimationFrame( __animate );
                return ;
              }
              if (stop_animate)
              {
                return ;
              }
              if (!window.renderer)
              {
                return ;
              }

              if (window._scene)
              {
                window._scene.children[0].position.x = node.centroid.x;
                window._scene.children[0].position.y = -195 + node.centroid.y;
                window._scene.children[0].position.z = node.centroid.z;
              }

              camera.position.copy(node.centroid);
              window.camera.rotation.y = -DegToRad(GAME.DIMS.deg.y);
              window.camera.translateZ(window.sven);
              // window.camera.rotation.x = -DegToRad(GAME.DIMS.deg.x);

              var dt = (time - prevTime) / 1000;
              window.mixer && window.mixer.update(dt);

              // window.cube.rotation.y = DegToRad(GAME.DIMS.deg.y);
              if (!window.renderer)
              {
                return ;
              }
              window.renderer.render( window.scene, window.camera );

              prevTime = time;

              requestAnimationFrame( __animate );
            };

            requestAnimationFrame( __animate );
        };

        __MAKE_3D(); // 3d worm // ####


        
      	setTimeout(function(){
	      	GAME.ACTIONS.DialogCover (0);

          if (!GAME.State.flags.lvl2.intro)
          {
            GAME.State.flags.lvl2.intro = true;

            setTimeout(function(){
              GAME.ACTIONS.SetText ( 'intro', 0);
            },110); // 1120
          }
          else
          {
            setTimeout(function(){
              GAME.ACTIONS.DialogClose ();
            },50); // 500
          }

	    }, 10); // 1500

      	// ---
      },

      DESTROY: function() {
        // remove all elements
        GAME.Sound.Stop ('sound-water-1');
        GAME.Sound.SetSteps ('sound-footsteps-1', 'sound-footsteps-2');

        var move = document.getElementById('move');
        move.innerHTML = '';
      },

      ACTIVE_MAP : [],
      WALLS:[],
      LIT : [],

      MOVE : {
        splash:true,
      	rot:{x:-27.5,y:347,z:0},
      	move:{x:-58,y:0,z:-80}
      },
      MAP: {

      		MAIN: 'floor-1',
            NODES : {


                                /*
                                'shape-4' : {
                                  object:1,
                                  type:'obj-shape-4',
                                  transform:'translate3d(0px, 0px, 0px)'
                                },
                                'shape-5' : {
                                  object:1,
                                  type:'obj-shape-5',
                                  transform:'translate3d(0px, 0px, 0px)'
                                },
                                */


                                
                'alchemy-door-plane' : {
                  object:1,
                  type:'obj-invis-1',
                  interact: function( e ) {
                        if (!GAME.State.control) return ;

                        var dist = GAME.UTILS.Distance ( this );
                        if (dist > 520) {
                          GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                          return ;
                        }

                        if (GAME.INV.active_item)
                        {
                          GAME.ACTIONS.SetActiveText ( 'items', 1, true, 'old' );
                          GAME.INV.Deselect ();
                          return ;
                        }

                        if (!GAME.State.flags.lvl2.alchUnlock)
                        {
                          GAME.ACTIONS.SetText ( 'doortorch', 0 );
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
                          GAME.ACTIONS.GameOver ("Work in Progress...");
                          GAME.ACTIONS.SetText ( 'gameover', 1, function() {});

                          console.log( "Thanks for playing!");
                        },100);
                        // GAME.UTILS.LoadLevel2('05');
                  },
                  transform:'translate3d(-768px, -18px, 2670px) rotateY(90deg)'
                },
                

                'decal-torch-hole' : {
                  object:1,
                  type: 'obj-decal-normals',
                  clss:'decal-hole',
                  width:16, height:16,

                  transform:'translate3d(-677px, 94px, 2545px) rotateY(90deg)',
                  interact: function( e ) {
                        if (!GAME.State.control) return ;

                        var dist = GAME.UTILS.Distance ( this );
                        if (dist > 520) {
                          GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                          return ;
                        }

                        if (GAME.INV.active_item)
                        {
                              var act_item = GAME.INV.active_item;
                              if (act_item.getAttribute('data-id') !== 'stick-torch')
                              {
                                GAME.ACTIONS.SetActiveText ( 'items', 1, true, 'old' );
                                GAME.INV.Deselect ();
                              }
                              else
                              {
                                              GAME.ACTIONS.DialogAsk ('doortorch', 1, 0, function ( choice, html ) {

                                                  if (choice === 1)
                                                  {
                                                    GAME.ACTIONS.DialogClose ();
                                                    return ;
                                                  }

                                                  GAME.INV.RemoveItem ( act_item.getAttribute('data-index') / 1 );
                                                  GAME.State.flags.lvl2.torchPicked = false;

                                                  GAME.ACTIONS.DialogClose ();

                                                  setTimeout(function() {
                                                      GAME.State.flags.lvl2.alchUnlock = true;

                                                      var torch_node = GAME.LEVEL.MAP.NODES['obj-torch-door-2'];
                                                      torch_node.hidden = false;
                                                      if (torch_node.geom && torch_node.geom.length > 0)
                                                      {
                                                        for (var i = 0; i < torch_node.geom.length; ++i) {
                                                          torch_node.geom[i].hidden = false;
                                                        }
                                                      }

                                                      torch_node.el.style.transform = 'translate3d(-659px, 85px, 2544px) rotateZ(90deg) rotateZ(-60deg)';
                                                      move.appendChild( torch_node.el );
                                                      GAME.ACTIONS.SetText ( 'doortorch', 2 );
                                                  }, 200);
                                                  // ---
                                              });
                              }
                        }
                        else
                        {
                          GAME.ACTIONS.SetText ( 'doortorch', 3 );
                        }
                        // ---
                  }
                },

                /* */

             'shape-plank' : {
                object:1,
                type:'obj-plank',
                transform:'translate3d(0px, -40px, 240px)'
              },

               'decal-moss-hang' : {
                object:1,
                type:'obj-decal-normals',
                img:'3d/level-2/hang-moss2.png',
                cast_shadow:false,
                alpha:1, alpha_mask:1,
                clss:'decal ',
                tag:'div',
                //brightness:-10,
                width:220, height:240,
                transform:'translate3d(-25px, -80px, 270px) rotateY(180deg)',
                vertices:true
              },

		            'floor-1' : { type:'cave-water-1', bg:1, hide_fov:1, hide_frustrum: 2,  beacon:['1'], connected:[
		            	{ id:'floor-2', source:0, target:2 },
		            	{ id:'floor-3', source:2, target:0 }
		            ]},

		            'floor-2' : { type:'cave-water-1', bg:1, hide_fov:1, hide_frustrum: 2, beacon:['1'], connected:[
		            	{ id:'wall-1', source:0, target:2 },
		            	{ id:'floor-bg-1', source:0, target:2 }
		            ]},
		            'floor-3' : { type:'cave-water-1', bg:1, hide_fov:1, hide_frustrum: 2, beacon:['1','2'],  beacon_dist:2000, connected:[
		            	{ id:'wall-2', source:1, target:2 },
		            	{ id:'wall-5', source:3, target:2 },
                  { id:'floor-4', source:2, target:0 }
		        	  ]},
                'floor-4' : { type:'cave-water-1', bg:1, hide_fov:1, hide_frustrum: 2, beacon:['1','2'],  beacon_dist:2000, connected:[
                   { id:'floor-5', source:2, target:0 }
                ]},

                'floor-5' : { type:'cave-water-1', bg:1, hide_fov:1, hide_frustrum: 2, beacon:['1','2'],  beacon_dist:2000},

		            'floor-bg-1' : { type:'cave-water-1', bg:1, hide_fov:1, hide_frustrum: 2, beacon:['1'], connected:[{ id:'floor-bg-2', source:0, target:2 }]},
		            'floor-bg-2' : { type:'cave-water-1b', hide_frustrum: 1, beacon:['1'], img:'3d/out_lighter_single.gif' },
		            'wall-1' : { type:'cave-wall-1-w340', hide_frustrum: 1, alpha: true, alpha_mask:1, brightness:8, beacon:['1'] },
		            'wall-2' : { type:'cave-wall-2', hide_frustrum: 1, beacon:['1','2'], connected:[
		            	{ id:'wall-3', source:3, target:1 },
		            	{ id:'wall-8', source:1, target:3 },
                  { id:'ceil-3', source:0, target: 1}
		            ]},

		            'wall-3' : { type:'cave-wall-2', hide_frustrum: 1, beacon:['1'], connected:[
		            	{ id:'wall-4', source:3, target:1 },
                  { id:'ceil-1', source:0, target: 1}
		            ]},
		            'wall-4' : { type:'cave-wall-2b', hide_frustrum: 1, beacon:['1'], connected:[
                  { id:'wall-4b', source:3, target:1 },
                  { id:'ceil-2', source:0, target: 1}
                ]},
                'wall-4b' : { type:'cave-wall-2b', decal:'3d/level-2/wall-moss.png', hide_frustrum: 1, beacon:['1'], connected:[
                  { id:'wall-4c', source:3, target:1 }
                ]},
                'wall-4c' : { type:'cave-wall-2b', hide_frustrum: 1, beacon:['1']},

		            'wall-5' : { type:'cave-wall-3', decal:'3d/level-2/wall-moss.png', hide_frustrum: 1, beacon:['1','2'], connected:[
		            	{ id:'wall-6', source:1, target:3 },
		              { id:'wall-knife-right-1', source:3, target:1 }
		            ]},


              'ceil-1' : { type:'dungeon-ceil-1', hide_frustrum: 1, connected:[
              ]},
              'ceil-2' : { type:'dungeon-ceil-1', hide_frustrum: 1, connected:[
              ]},
              'ceil-3' : { type:'dungeon-ceil-1', hide_frustrum: 1, connected:[
              ]},
              'ceil-4' : { type:'dungeon-ceil-1', hide_frustrum: 1},
              'ceil-5' : { type:'dungeon-ceil-1', hide_frustrum: 1, connected:[
              ]},
              'ceil-6' : { type:'dungeon-ceil-1', hide_frustrum: 1, connected:[

                { id:'ceil-6b', source:0, target: 2}

              ]},
              'ceil-7' : { type:'dungeon-ceil-2-large', hide_frustrum: 1, connected:[
                { id:'ceil-8', source:3, target: 1}
              ]},
              'ceil-8' : { type:'dungeon-ceil-2-large', hide_frustrum: 1, connected:[
              ]},

              'ceil-6b' : { type:'dungeon-ceil-1-large', hide_frustrum: 1, connected:[
                { id:'ceil-7b', source:1, target:3 },
                { id:'ceil-8b', source:3, target:1 }
              ]},


              'ceil-7b' : { type:'dungeon-ceil-2-large', hide_frustrum: 1 },
              'ceil-8b' : { type:'dungeon-ceil-2-large', hide_frustrum: 1 },


		            // find the knife here
		            'wall-knife-right-1': {type: 'cave-wall-1', hide_frustrum: 1, beacon:['1','2'], connected:[
		            	{ id:'wall-knife-right-2', source:3, target:1 }
		            ]},
		            'wall-knife-right-2': {type: 'cave-wall-1', hide_frustrum: 1, beacon:['1'], connected:[
		            	{ id:'wall-knife-main', source:3, target:1 }
		            ]},
                // floor-room-path-left-1
		            'wall-knife-main' : { type:'cave-wall-3-w340', hide_frustrum: 1, beacon:['1'], alpha: true, alpha_mask:1, brightness:4, connected:[
		            	{ id:'wall-knife-left-1', source:3, target:1 },
		            	{ id:'floor-knife-1', source:2, target:0 }
		            ]},
	            	'wall-knife-left-1': {type: 'cave-wall-4', hide_frustrum: 1, beacon:['1'], connected:[
	            		{ id:'wall-knife-left-2', source:3, target:1 }
	            	]},
	            	'wall-knife-left-2': {type: 'cave-wall-4', hide_frustrum: 1, beacon:['1'], connected:[
	            		{ id:'wall-knife-w160', source:3, target: 1},
                  { id:'ceil-7', source:0, target:0 }
	            	]},
	            	'wall-knife-w160': {type: 'cave-wall-3-w160', hide_frustrum: 1, beacon:['1','2'], connected:[
	            		{ id:'wall-right-1', source:3, target:1 }
	            	]},
	            	'floor-knife-1' : { type:'cave-water-2', bg:1, hide_fov:1, hide_frustrum: 2, beacon:['1'], connected:[
	            			{ id:'floor-knife-2', source:0, target:2 },
                    { id:'floor-knife-3', source:2, target:0 }
	            	]},

                'floor-knife-3' : { type:'cave-water-2', hide_frustrum: 1, beacon:['1'], img:'3d/out_lighter_single.gif' },

	            	'floor-knife-2' : { type:'cave-water-2', bg:1, hide_fov:1, hide_frustrum: 2, beacon:['1'] },
                //'floor-knife-4' : { type:'cave-water-2', bg:1, hide_fov:1, hide_frustrum: 2, beacon:['2'] },
		            //

		            'wall-6' : { type:'cave-wall-3', hide_frustrum: 1, beacon:['1'], connected:[
		            	{ id:'wall-7', source:1, target:3 }
		            ]},
		            'wall-7' : { type:'cave-wall-3b', decal:'3d/level-2/wall-moss.png', hide_frustrum: 1, beacon:['1'], connected:[
                  { id:'wall-7b', source:1, target:3 }
                ]},
		            'wall-8' : { type:'cave-wall-2', hide_frustrum: 1, beacon:['1','2'], connected:[
		            	{ id:'wall-left-1', source:1, target:3 },
                  { id:'ceil-4', source:0, target: 1}
		            ]},
                'wall-7b' : { type:'cave-wall-3b', hide_frustrum: 1, beacon:['1'], connected:[
                  { id:'wall-7c', source:1, target:3 }
                ]},
                'wall-7c' : { type:'cave-wall-3b', hide_frustrum: 1, beacon:['1'] },


              'sewer-man' : {
                object:1,
                type:'obj-decal-web-1',
                tag:'canvas',
                width:140, // 80
                height:140,
                clss:'obj creature',
                // transform:'translate3d(-150px, 100px, 2500px)',
                transform:'translate3d(-340px, 100px, 2590px)',

                orig_vertices:null,
                vertices:function (width, height) {
                    if (!this.orig_vertices) {
                      this.orig_vertices = this.vertices;
                    }

                    var matrix = this.matrix;
                    if (!matrix) {
                      this.matrix = matrix = GAME.UTILS.GetMatrixCSS ( this.transform );
                    }

                    var verts = [new Vector(0, height, 0),
                    new Vector(width, height, 0),
                    new Vector(width, 0, 0),
                    new Vector(0, 0, 0)];

                    var origin_x = width / 2;
                    var origin_y = height / 2;

                    for (var i = 0; i < verts.length; ++i)
                    {
                      var curr = verts[i];

                      curr.x -= origin_x;
                      curr.y -= origin_y;

                      curr.applyMatrix4( matrix );

                      curr.x += origin_x;
                      curr.y += origin_y;

                      curr.x = curr.x.toFixed(2)/1;
                      curr.y = curr.y.toFixed(2)/1;
                      curr.z = curr.z.toFixed(2)/1;
                    }

                    return (verts);

                }
              },


          
					'rusty-knife' : {
						object:1,
						pickable:1,
						hidden:true,
						desc: 'A rusty knife',
						icon:'3d/rusty-knife-icon.png',
						type:'obj-decal-web-1',
						transform:'translate3d(0,0,0)',
						cast_shadow:false,
						no_shadow:true
					},

          
          'stick-torch' : {
            object:1,
            pickable:1,
            hidden:true,
            desc: 'A shabby torch',
            icon:'3d/level-2/torch.png',
            type:'obj-decal-web-1',
            transform:'translate3d(0,0,0)',
            cast_shadow:false,
            no_shadow:true
          },

          'locket-maiden' : {
            object:1,
            pickable:1,
            hidden:true,
            desc: 'A dead mans last possession',
            icon:'3d/level-2/locket-maiden.png',
            type:'obj-decal-web-1',
            transform:'translate3d(0,0,0)',
            cast_shadow:false,
            no_shadow:true
          },


		            ///
					'decal-skeleton-1' : {
						object:1,
						type: 'obj-decal-normals',
						clss:'decal-skeleton-2',
            img:'3d/level-2/decal-skeleton-2.png',
            alpha:1, alpha_mask:1,
						hide_frustrum: 1,
            beacon:['1'],
						width:240, height:60,
						brightness:20,
						transform:'translate3d(-80px, 192px, -700px) rotateY(-14deg)',
						overlay:true,
		                vertices:[
							new Vector (-76, 252, -758),
							new Vector (156, 252, -701),
							new Vector (156, 192, -701),
							new Vector (-76, 192, -758)
		                ],
		                interact: function( e ) {
							if (!GAME.State.control) return ;

							var dist = GAME.UTILS.Distance ( this );
							if (dist > 650) {
								GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
								return ;
							}

              if (GAME.State.flags.lvl2.locketPicked)
              {
                GAME.ACTIONS.SetText ( 'skeleton', 8 );

                GAME.INV.Deselect ();
                return ;
              }

							if (GAME.INV.active_item)
							{
                if (GAME.INV.active_item.getAttribute('data-id') !== 'stick-torch')
                {
								  GAME.ACTIONS.SetActiveText ( 'items', 1, true, 'old' );
                }
                else
                {
                  GAME.ACTIONS.SetText ( 'skeleton', 5, function() {
                  GAME.ACTIONS.SetText ( 'skeleton', 6, function() {
                  GAME.ACTIONS.SetText ( 'skeleton', 7, function() {
                    GAME.ACTIONS.DialogClose ();

                    // add little iron maiden to inventory.
                    GAME.Sound.Play('sound-puzzle-solve-1');
                    setTimeout(function() {
                      GAME.Sound.Play ('sound-item-pickup-1');
                    }, 350);

                    var item = GAME.LEVEL.MAP.NODES['locket-maiden'];
                    GAME.INV.AddItem ( item );
                    GAME.State.flags.lvl2.locketPicked = true;
                  });
                  });
                  });
                }

                GAME.INV.Deselect ();
                return ;
							}

		          GAME.ACTIONS.SetText ( 'skeleton', 0 );
		        }
					},

          
          
					'decal-pile-trash-1' : {
						object:1,
						type: 'obj-decal-normals',
						clss:'decal-skeleton-2',
            //img:'3d/level-2/decal-skeleton-2.png',
            alpha:1, alpha_mask:1,
						hide_frustrum: 1,
            beacon:['1'],
						width:240, height:60,
						brightness:20,
						overlay:true,
						transform:'translate3d(-1000px, 205px, 1220px) rotateY(120deg) rotateX(40deg)',
		                vertices:[
        							new Vector(-803, 258, 1094),
        							new Vector(-923, 258, 886),
        							new Vector(-956, 211, 905),
        							new Vector(-836, 211, 1114)
		                ],
		                interact: function( e ) {
		                	if (!GAME.State.control) return ;

        							var dist = GAME.UTILS.Distance ( this );
        							if (dist > 540) {
        								GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
        								return ;
        							}

        							if (GAME.INV.active_item)
        							{
        								GAME.ACTIONS.SetActiveText ( 'items', 1, true, 'old' );
        								GAME.INV.Deselect (); return ;
        							}


        							var item = GAME.LEVEL.MAP.NODES['rusty-knife'];
        							if (GAME.State.flags.lvl2.knifePicked)
        							{
        								GAME.ACTIONS.SetActiveText ( 'warn', 1, true, 'old' );
        								return ;
        							}

		                	GAME.ACTIONS.SetText ( 'skeleton', 1, function() {
              								GAME.ACTIONS.DialogAsk ('skeleton', 2, 0, function ( choice, html ) {
              					                          if (choice === 1)
              					                          {
              					                            GAME.ACTIONS.DialogClose ();
              					                            return ;
              					                          }

              					                          GAME.ACTIONS.SetText ( 'skeleton', 3, function() {
              					                          		GAME.ACTIONS.DialogAsk ('skeleton', 4, 0, function ( choice, html ) {
              									                          GAME.ACTIONS.DialogClose ();
              									                          if (choice === 1)
              									                          {
              									                            return ;
              									                          }

                            															GAME.Sound.Play ('sound-item-pickup-1');
                            															GAME.INV.AddItem ( item );
                                                          GAME.State.flags.lvl2.knifePicked = true;
                            															GAME.ACTIONS.SetActiveText ( 'items', 0, false, 'old' );

              					                          		});
              					                          }, 2);

              								});
		                	}, 0);
		                	// --
		                }
					},



              'shape-rock' : {
                object:1,
                type:'obj-shape-rock',
                beacon:['1'],
                hide_frustrum: 1,
                transform: 'translate3d(-890px, 195px, 1310px) scale3d(2.5, 2.5, 2.5)'
              },

        /*      */

              
                'obj-torch-door-1' : {
                  object:1,
                  type:'obj-torch-unlit',
                  transform:'translate3d(-661px, 80px, 2795px) rotateZ(24deg)'
                },

                'obj-torch-door-2' : {
                  hidden: GAME.State.flags.lvl2 && GAME.State.flags.lvl2.torchPicked,
                  object:1,
                  type:'obj-torch-unlit',
                  transform: (GAME.State.flags.lvl2 && GAME.State.flags.lvl2.alchUnlock) ? 'translate3d(-659px, 85px, 2544px) rotateZ(90deg) rotateZ(-60deg)' : 'translate3d(-500px, 244px, 2605px) rotateZ(90deg) rotateX(30deg)',

                  interact:function( e ) {
                    if (!GAME.State.control) return ;

                        var dist = GAME.UTILS.Distance ( this );
                        if (dist > 520) {
                          GAME.ACTIONS.SetActiveText ( 'warn', 0, false, 'old' );
                          return ;
                        }


                      GAME.ACTIONS.SetText ( 'torch', 0, function() {
                              GAME.ACTIONS.DialogAsk ('torch', 1, 0, function ( choice, html ) {
                                                  GAME.ACTIONS.DialogClose ();
                                                  if (choice === 1)
                                                  {
                                                    return ;
                                                  }

                                                  var node = GAME.LEVEL.MAP.NODES['obj-torch-door-2'];
                                                  node.el.parentNode.removeChild( node.el );
                                                  node.hidden = true;

                                                  if (node.geom && node.geom.length > 0)
                                                  {
                                                    for (var i = 0; i < node.geom.length; ++i)
                                                    {
                                                      node.geom[i].hidden = true;
                                                    }
                                                  }

                                                  var item = GAME.LEVEL.MAP.NODES['stick-torch'];

                                                  GAME.Sound.Play ('sound-item-pickup-1');
                                                  GAME.INV.AddItem ( item );
                                                  GAME.State.flags.lvl2.torchPicked = true;
                                                  GAME.State.flags.lvl2.alchUnlock = false;
                                                  GAME.ACTIONS.SetActiveText ( 'items', 0, false, 'old' );

                                                  // ---
                              });
                      });
                      // --
                  }
                },

                /* */


		            ///// MAIN ROOM
		            'wall-left-1' : { type:'cave-wall-2', decal:'3d/level-2/wall-moss.png', hide_frustrum: 1, beacon:['1','2'], connected:[
		            	{ id:'wall-left-2', source:1, target:3 },
                  { id:'ceil-5', source:0, target: 1}
		            ]},
		            'wall-right-1' : { type:'cave-wall-3', hide_frustrum: 1, beacon:['1','2'], connected:[
		            	{ id:'wall-right-2', source:3, target:1 }
		            ]},
		            'wall-left-2' : { type:'cave-wall-2', hide_frustrum: 1, beacon:['1','2'], connected:[
		            	{ id:'floor-room-1', source:2, target:1 },
		            	{ id:'wall-left-2b', source:1, target:3 },
                  { id:'ceil-6', source:0, target: 1}
		            ]},

                'wall-left-2b' : { type:'cave-wall-1', hide_frustrum: 1, beacon:['2'] },

		            'wall-right-2' : { type:'cave-wall-3', hide_frustrum: 1, beacon:['1','2'], connected:[
		            	{ id:'wall-room-right-1', source:3, target:1 }
		            ]},
		            'wall-room-right-1': {type: 'cave-wall-1', hide_frustrum: 1, beacon:['2'], connected:[
                  // { id:'wall-room-right-2', source:3, target:1 }
                ]},
                //'wall-room-right-2': {type: 'cave-door-3-w340', hide_frustrum: 1, beacon:['2'] },

		            'wall-room-left-1': {type: 'cave-wall-4b', bg:1, hide_frustrum: 1, beacon:['1','2'], connected:[
                    { id:'wall-room-left-2', source:1, target:3},
                    { id:'wall-room-left-3', source:3, target:1}
                ]},
                'wall-room-left-2': {type: 'cave-wall-4', hide_frustrum: 1, beacon:['1', '2']},
                'wall-room-left-3': {type: 'cave-wall-4', hide_frustrum: 1, beacon:['1', '2']},

		            'floor-room-1' : { type:'cave-water-1', bg:1, hide_fov:1, hide_frustrum: 2, beacon:['1','2'], connected:[
		            	 { id:'floor-room-fall-1', source:2, target:0 }
		            ]},
		            'floor-room-fall-1' : { type:'cave-water-1-fall', bg:1, hide_fov:1,  hide_frustrum: 2, beacon:['1','2'], connected:[
                  { id:'wall-room-left-1', source:2, target:2},

		            	//{ id:'floor-room-fall-2', source:2, target:0 },

		            	{ id:'floor-room-path-right-1', source:1, target:0 },
		            	{ id:'floor-room-path-left-1', source:3, target:2 }
		            ]},
		            'floor-room-fall-2' : { type:'cave-waterfall-1', bg:1, hide_frustrum: 2, beacon:['2'], connected:[
		            	//{ id:'floor-room-fall-3', source:1, target:3 },
		            	{ id:'floor-room-fall-4', source:3, target:1 }
		            ]},
		            //'floor-room-fall-3' : { type:'cave-waterfall-1-w500', decal:'3d/level-2/wall-moss.png', clss:'dirt', hide_frustrum: 2, beacon:['2'], connected:[
                  // { id:'floor-room-fall-5', source:1, target:3 }
                //]},
		            'floor-room-fall-4' : { type:'cave-waterfall-1-w500', clss:'dirt', hide_frustrum: 2, beacon:['2'] },
                //'floor-room-fall-5' : { type:'cave-waterfall-1-w500', clss:'dirt', hide_frustrum: 2, beacon:['2'] },

		            'floor-room-path-right-1': { type:'cave-water-2', clss:'dirt', hide_frustrum: 1, hide_dist_max:2300, beacon:['1','2'], connected:[
                //  { id:'floor-room-fall-3', source:3, target:0 },
		            	{ id:'wall-knife-rumble', source:2, target:2 },
		            ]},

                'wall-knife-rumble' : { type:'cave-wall-2b-w340', hide_frustrum: 1, beacon:['2'], brightness:4 },

                'wall-knife-exit' : { type:'cave-door-3-w340', hide_frustrum: 1, beacon:['2'], alpha: true, alpha_mask:1, brightness:4, connected:[
                ]},

                'floor-room-path-left-1': { type:'cave-water-2',  clss:'dirt', hide_frustrum: 1, hide_dist_max:2300, beacon:['1','2'],
                  connected:[
                      { id:'wall-knife-exit', source:0, target:2 }
                      //{ id:'floor-knife-4', source:0, target:2 }
                  ]
                },


                /*
                'lvl-3-door' : {
                  object:1,
                  width:300,
                  height:340,
                  type:'obj-invis-1',
                  interact: function( e ) {
                        if (!GAME.State.control) return ;

                        var dist = GAME.UTILS.Distance ( this );
                        if (dist > 400) {
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

                        //  GAME.Sound.Play ('sound-door-creak-1', dist, true);
                        GAME.UTILS.LoadLevel2('03', 'hub');
                  },
                  transform:'translate3d(-816px, -50px, 2670px) rotateY(90deg)'
                },
                */

                //'ramp-1': { type:'ramp-water-1',  clss:'dirt', ramp:1, ramp_start:0, angle: ((45/90) * 500) >> 0,  hide_frustrum: 1, connected:[
                //  { id:'floor-room-path-right-2', source:2, target:0 },
                //  { id:'wall-room-left-2', source:1, target:2 }
                //]},

                //'floor-room-path-right-2': { type:'cave-water-2-h340', clss:'dirt', hide_frustrum: 1, hide_dist_max:2200, beacon:['2'], connected:[
                //  { id:'wall-room-left-3', source:1, target:2 },
                //  { id:'ramp-3', source:2, target:0 },
                //  { id:'ramp-2', source:3, target:0 }
                //]},
                //'ramp-3': { type:'ramp-water-1',  clss:'dirt', ramp:1, ramp_start:((45/90) * 500) >> 0, angle: ((45/90) * 500) >> 0,  hide_frustrum: 1, beacon:['2'], connected:[
                //  { id:'wall-room-left-4', source:2, target:2 },
                //  { id:'wall-room-left-5', source:1, target:2 },
                //  { id:'wall-room-left-7', source:3, target:2 }
                //]},

                //'wall-room-left-2': {type: 'ramp-wall-1', hide_frustrum: 1, beacon:['2'] },
                //'wall-room-left-3': {type: 'cave-wall-1', hide_frustrum: 1, beacon:['2'] },
                //'wall-room-left-5': {type: 'ramp-wall-1', hide_frustrum: 1, beacon:['2'] },
                //'wall-room-left-6': {type: 'cave-wall-2', decal:'3d/level-2/wall-moss.png', hide_frustrum: 1, beacon:['2'] },
                //'wall-room-left-7': {type: 'ramp-wall-4', hide_frustrum: 1, beacon:['2'] },

                //'wall-room-left-4': {type: 'cave-door-2-w340', hide_frustrum: 1, beacon:['2'] },

                //'ramp-2': { type:'cave-water-1b', clss:'dirt', hide_frustrum: 1, beacon:['2'], connected:[
                //  { id:'wall-room-left-6', source:1, target:2 }
                //]}

            },

            FRUSTRUM : {
              '2' : function (node, value) {

                    if (!value)
                    {
                      if (!node.tmp_bg)
                      {
                          node.tmp_bg = 1;
                          node.el.style.background = node.el.style.background.replace('out_lighter.gif','out_lighter_single.gif');
                      }
                    }
                    else
                    {
                      if (node.tmp_bg)
                      {
                          node.tmp_bg = 0;
                          node.el.style.background = node.el.style.background.replace('out_lighter_single.gif','out_lighter.gif');
                      }
                    }
              }
            },


            TRIGGERS : {
                'trigger-1' : {
                  mode:16,
                  type:0,
                  shape:'rect',
                  dims:[-170, 940, 340, 580], // x y  w  h
                  act:0,
                  dat:0,
                  onchange: function() {

                      if (this.act)
                      {
                          if (this.dat)
                          {
                            if (this.dat !== 1) {
                              this.dat.style.display = 'block';
                            }
                            return ;
                          }

                          var el = GAME.LEVEL.MAP.NODES['wall-knife-main'].el;
                          if (!el) return ;

                          var eyes = document.createElement('img');
                          eyes.style.cssText = 'position:absolute;width:36px;height:26px;transform:translate3d(220px,240px,-310px);transform-origin:50% 50%;' + 
                                              'display:block;animation:anim_close 3.8s ease infinite, anim_breath 1.8s infinite;' + 
                                              'opacity:.9;transition:transform 1.55s ease;';
                          eyes.src = '3d/level-2/rat-eyes.png';
                          el.appendChild (eyes);

                          this.dat = eyes;
                      }
                      else
                      {
                        if (this.dat && this.dat !== 1)
                        {
                            // check if we crossed the right side
                            if (this.vertices[1].x < -GAME.DIMS.pos.x)
                            {
                                var dd = this.dat;
                                setTimeout(function (){
                                  dd.parentNode.removeChild( dd );
                                  dd = null;
                                }, 1760);

                                this.dat.style.transform = 'translate3d(-145px, 290px, -500px) rotateY(-75deg) scale(0.5)';
                                this.dat = 1;
                            }
                            else
                            {
                              this.dat.style.display = 'none';
                            }
                        }
                        // ---
                      }
                      // ----
                  }
                },

                'trigger-3' : {
                  mode:4,
                  type:0,
                  shape:'rect',
                  node:'floor-room-1',
                  act:0,
                  dat:0,
                  onchange: function( side ) {
                    if (this.act)
                    {
                          if (side === 2) {
                            GAME.LEVEL.BEACON = '2';
                            GAME.Fire('ReqBeacon');

                           // console.log("FFFFF 22222");
                          }
                    }
                    else
                    {
                          if (side === 2) {
                            GAME.LEVEL.BEACON = '1';
                            GAME.Fire('ReqBeacon');

                           // console.log("FFFFF 111111");
                          }

                    }
                  }
                },

                
                'trigger-2' : {
                  mode:4,
                  type:0,
                  shape:'rect',
                  node:'floor-room-fall-1',
                  act:0,
                  dat:0,
                  onchange: function( side ) {
                    if (this.act)
                    {
                      if ( side !== 2)
                        GAME.Sound.SetSteps ('water-step-1', 'water-step-2',
                                            { chance:0.82, sounds:[{chance:0.0, sound:'water-step-3'}, {chance:0.55, sound:'water-step-4'}] });
                    }
                    else
                    {
                      if ( side !== 2)
                        GAME.Sound.SetSteps ('sound-footsteps-1', 'sound-footsteps-2');
                    }
                  }
                },

                'trigger-4' : {
                  mode:4,
                  node:'floor-room-1',
                  shape:'rect',
                  act:0,
                  type:0,
                  dat:0,
                  onchange: function () {
                      // return ;

                      if (this.dat === 1) return ;
                          this.dat = 1;

                          // creature node
                          var node = GAME.LEVEL.MAP.NODES['sewer-man'];
                          var setup_camera,
                              creature_move_center, creature_move_close, creature_move_away;

                          // make it face the camera
                          // GAME.UTILS.RotateNodeToCamera (node);

                          // freeze screen, set text about the creature.
                          GAME.ACTIONS.SetText ( 'leech', 0, function() {
                              setup_camera (function() {
                              GAME.ACTIONS.SetText ( 'leech', 1, function() {
                                    setTimeout(function() {
                                      GAME.ACTIONS.SetActiveText ( 'leech', 2, true );
                                    },520);
                                  
                                    creature_move_center (function() {
                                      GAME.ACTIONS.SetText ( 'leech', 3, function() {
                                            GAME.ACTIONS.DialogAsk ('leech', 5, 0, function ( choice, html ) {
                                              GAME.ACTIONS.DialogClose ();
                                              GAME.State.control = false;

                                              if (choice === 0)
                                              {
                                                  GAME.ACTIONS.GameOver ("Game Over");
                                                  GAME.ACTIONS.SetText ( 'gameover', 0, function() {});

                                                  console.log( "GAME OVER");
                                                  return ;
                                              }

                                              creature_move_close (function(){
                                                GAME.ACTIONS.SetText ( 'leech', 4, function() {
                                                    GAME.ACTIONS.DialogAsk ('leech', 5, 0, function ( choice, html ) {
                                                        GAME.ACTIONS.DialogClose ();
                                                        GAME.State.control = false;

                                                        if (choice === 0)
                                                        {
                                                            GAME.ACTIONS.GameOver ("Game Over");
                                                            GAME.ACTIONS.SetText ( 'gameover', 0, function() {});
                                                            console.log( "GAME OVER");
                                                            return ;
                                                        }

                                                        // -----
                                                        GAME.ACTIONS.SetText ( 'leech', 6, function() {

                                                          window.AnimCrossFade4 ();
                                                          setTimeout(function(){
                                                          GAME.ACTIONS.SetText ( 'leech', 7, function() {

                                                              creature_move_away (function(){
                                                                  GAME.ACTIONS.SetText ( 'leech', 8, function() {
                                                                    GAME.ACTIONS.DialogClose ();

                                                                    // ####
                                                                  });
                                                              });

                                                          });
                                                          },250);
                                                        });

                                                        // -----
                                                    });
                                                });
                                              });

                                            });
                                      // ----
                                      });
                                    });
                                    // ----

                              });
                              });
                          });

                          setup_camera = function ( callback ) {

                              window.SetAnimate && window.SetAnimate (true);
                              var centroid = node.centroid; // new Vector( -140, 250, 2540 );
                              var rot = {rot: GAME.UTILS.RotateCameraTo (centroid) };
                              rot.callback = callback;

                              GAME.Fire ('ReqSetRot', rot, [64, 'inout_quad']);
                          };

                          creature_move_center = function ( callback ) {
                              var exit_anim = false;
                              var frames = 72;

                              GAME.OnFrame (24, frames, function ( times, total ) {
                                  if (exit_anim) { return ; }

                                    var val = 235;
                                    var orig_val = -320;
                                    var new_val = orig_val + (val * (times/frames));

                                    node.transform = 'translate3d('+new_val+'px, 100px, 2590px)';
                                    node.matrix = GAME.UTILS.GetMatrixCSS ( node.transform );
                                    node.vertices = node.orig_vertices ( node.width, node.height );
                                    var v1_a = node.vertices[0];
                                    var v2_a = node.vertices[1];
                                    var v3_a = node.vertices[3];

                                    // VAR TRIANGLE 02
                                    var v1_b = node.vertices[3];
                                    var v2_b = node.vertices[1];
                                    var v3_b = node.vertices[2];
                                    node.centroid = new Vector (  ((v1_a.x + v2_a.x + v3_a.x) / 3),
                                                      ((v1_a.y + v2_a.y + v3_a.y) / 3),
                                                      ((v1_a.z + v2_a.z + v3_a.z) / 3));

                                    node.orig_trans = null;
                                    GAME.UTILS.RotateNodeToCamera (node);

                                    // follow it with your eyes....
                                    GAME.Fire ('ReqSetRot', GAME.UTILS.RotateCameraTo (node.centroid) );

                                    if (times >= (frames - 1))
                                    {
                                        exit_anim = true;

                                        window.AnimCrossFade ();

                                        callback && callback ();
                                    }
                                    // -----
                              });
                          };

                          creature_move_close = function ( callback ) {
                                  window.AnimCrossFade2 ();

                                  var mm = MakeMatrix4();
                                  var origin = new Vector ();
                                  var target = new Vector ();
                                  var up = new Vector(0,1,0);

                                  var get_angle = function (_target) {
                                      origin.x = GAME.DIMS.pos.x;
                                      origin.y = GAME.DIMS.pos.y;
                                      origin.z = GAME.DIMS.pos.z;

                                      target.x = _target.x; 
                                      target.y = _target.y;
                                      target.z = _target.z;
                                      
                                      var world_arr = LookAt (mm,
                                                              origin,
                                                              target,
                                                              up);
                                      GetInverse2 (world_arr, world_arr);

                                      var rot = GAME.UTILS.GetRotation (world_arr);
                                      var degree = DegToRad(-rot.y);

                                      return (degree);
                                  };


                                  window._scene.children[0].rotation.z = get_angle (node.centroid);

                                  // ----------------
                                  var exit_an = false;
                                  var frames = 48;
                                  var node_mat = GAME.UTILS.GetMatrixCSS (node.orig_trans);

                                  var init_x = node_mat[12] >> 0;
                                  var init_y = node_mat[13] >> 0;
                                  var init_z = node_mat[14] >> 0;

                                  GAME.OnFrame (24, frames, function ( times, total ) {
                                        if (exit_an) { return ; }

                                        var xx = init_x;
                                        var val_xx = GAME.DIMS.pos.x;

                                        var zz = init_z;
                                        var val_xx = (xx + GAME.DIMS.pos.x) / 1.68;
                                        var val_zz = (zz - GAME.DIMS.pos.z) / 1.68;

                                        var new_val_xx = xx - (val_xx * (times/frames));
                                        var new_val_zz = zz - (val_zz * (times/frames));

                                        node.transform = 'translate3d('+new_val_xx+'px, '+init_y+'px, '+new_val_zz+'px)';
                                        node.matrix = GAME.UTILS.GetMatrixCSS ( node.transform );
                                        node.vertices = node.orig_vertices ( node.width, node.height );
                                        var v1_a = node.vertices[0];
                                        var v2_a = node.vertices[1];
                                        var v3_a = node.vertices[3];

                                        // VAR TRIANGLE 02
                                        var v1_b = node.vertices[3];
                                        var v2_b = node.vertices[1];
                                        var v3_b = node.vertices[2];
                                        node.centroid = new Vector (  ((v1_a.x + v2_a.x + v3_a.x) / 3),
                                                          ((v1_a.y + v2_a.y + v3_a.y) / 3),
                                                          ((v1_a.z + v2_a.z + v3_a.z) / 3));

                                        node.orig_trans = null;
                                        GAME.UTILS.RotateNodeToCamera (node);

                                        window._scene.children[0].rotation.z = get_angle (node.centroid);

                                        // look at the new value...
                                        GAME.Fire ('ReqSetRot', GAME.UTILS.RotateCameraTo (node.centroid) );

                                        if (times >= (frames - 1))
                                        {
                                            exit_an = true;

                                            AnimCrossFade3 ();

                                            setTimeout(function(){
                                              callback && callback ();
                                            },200);
                                        }
                                        // -----
                                  });
                          };

                          creature_move_away = function (callback) {
                              window.AnimCrossFade5 ();
                              window._scene.children[0].rotation.z = 0;

                              var exit_an = false;
                              var frames = 40;
                              var node_mat = GAME.UTILS.GetMatrixCSS (node.orig_trans);

                              var init_x = node_mat[12] >> 0;
                              var init_y = node_mat[13] >> 0;
                              var init_z = node_mat[14] >> 0;

                              GAME.OnFrame (16, frames, function ( times, total ) {
                                if (exit_an) { return ; }

                                var val_zz = 2730 - init_z;
                                var new_val_zz = init_z + (val_zz * (times/frames));

                                node.transform = 'translate3d('+init_x+'px, '+init_y+'px, '+new_val_zz+'px)';
                                node.matrix = GAME.UTILS.GetMatrixCSS ( node.transform );
                                node.vertices = node.orig_vertices ( node.width, node.height );
                                var v1_a = node.vertices[0];
                                var v2_a = node.vertices[1];
                                var v3_a = node.vertices[3];

                                // VAR TRIANGLE 02
                                var v1_b = node.vertices[3];
                                var v2_b = node.vertices[1];
                                var v3_b = node.vertices[2];
                                node.centroid = new Vector (  ((v1_a.x + v2_a.x + v3_a.x) / 3),
                                                  ((v1_a.y + v2_a.y + v3_a.y) / 3),
                                                  ((v1_a.z + v2_a.z + v3_a.z) / 3));

                                node.orig_trans = null;
                                GAME.UTILS.RotateNodeToCamera (node);
                                GAME.Fire ('ReqSetRot', GAME.UTILS.RotateCameraTo (node.centroid) );
                                if (times >= (frames - 1))
                                {
                                    exit_an = true;

                                    setTimeout(function(){
                                    requestAnimationFrame(function(){
                                      window.AnimCrossFade6 ();

                                      setTimeout(function() { callback && callback (); },1000);
                                    });
                                    },100);
                                }

                                // --------
                              });

                          };


                          return ;
                        /*
                        // fff(16);
                        var mm = MakeMatrix4();
                        var ray_origin = new Vector(GAME.DIMS.pos.x, GAME.DIMS.pos.y, GAME.DIMS.pos.z);
                        var target = GAME.LEVEL.MAP.NODES['sewer-man'].centroid.clone();
                        var world_arr = LookAt( mm,
                                                ray_origin,
                                                target.clone(),
                                                new Vector(0,1,0));
                        var world_rev = GetInverse (world_arr); 
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
                        var rot = _getRotation(world_rev);
                        var degree = DegToRad(-rot.y);

                        window._scene.children[0].rotation.z = degree;
                        */
                  }
                }

                // -- 
            },

            LIGHTS: {
              'ambience' : {color:{r:120,g:120,b:170}, intensity: 0.26, active: 1}, // 0.26
              'light-1' : {x:10, y: 40, z:-680, intensity:1, color:{r:30,g:230,b:80}, shadow:1, max_distance:680, drawIcon:0, active:1},
              'light-2' : {x:-30, y: -55, z:300, intensity:0.9, color:{r:255,g:100,b:100}, shadow:0, max_distance:800, drawIcon:0, active:1},
              'light-knife' : {x:-880, y: 30, z:1210, intensity:0.94, color:{r:140,g:100,b:255}, shadow:1, max_distance:896, drawIcon:0, active:1},
              'light-corridor' : {x:-240, y: 100, z:2660, intensity:0.9, color:{r:140,g:100,b:255}, shadow:1, max_distance:1100, drawIcon:0, active:1},
              'light-sopor' : {x:1520, y: 380, z:2700, intensity:1, color:{r:80,g:80,b:250}, shadow:1, max_distance:800, drawIcon:0, active:1},

              'light-bridge' : {x:1090, y: 340, z:3440, intensity:0.9, color:{r:250,g:120,b:120}, shadow:1, max_distance:820, drawIcon:0, active:1},

              'light-waterfall' : {x:-20, y: 360, z:3014, intensity:0.93, color:{r:220,g:100,b:140}, shadow:0, max_distance:780, drawIcon:0, active:1}
            },

            SOUNDS : {
            	'sound-water-1' : {path:'3d/sound/water-dripping-1.mp3', volume: 0.65, loop: true},
				      'sound-item-pickup-1' : {path:'3d/sound/item-pickup-1.mp3', volume : 1.0, loop: false},

              'sound-door-creak-1' : {path:'3d/sound/door-creak-1.mp3', volume:0.5, loop:false},

              'water-step-1' : {path:'3d/sound/water-step-11.mp3', volume : 0.26, loop: false},
              'water-step-2' : {path:'3d/sound/water-step-12.mp3', volume : 0.26, loop: false},
              'water-step-3' : {path:'3d/sound/water-step-13.mp3', volume : 0.26, loop: false},
              'water-step-4' : {path:'3d/sound/water-step-14.mp3', volume : 0.26, loop: false}
            }
      },
      TXT: {
        		ACTIVE : {
          			'active' : null,
          			'index': -1, 'sub_index': -1,
          			'el' : null
        		},

        		'warn' : ['Cannot reach object.', 'Nothing of interest...'],

            'gameover' : [['You try to run away but the dark thick waters slow you down...',
                          'Suddenly you feel a sharp pain in your back, as if stabbed by a thousand blades.',
                          'You lose your balance and fall down, only to see the water turn red around you.',
                          'Your vision slowly fades... you have died...'],

                          ['Thanks for playing... to be continued!', '', 'say hi @pkalogiros']],

        		'items' : [
        			'Picked up item.',
        			'Cannot use this item here.'
        		],

            'leech' : [
              ['Suddenly you freeze to your tracks.',
               'Weird sounds echo from the depths of the cannals,',
               'and seem to get closer and closer to you...'],

              ['Your heart races as you focus to the direction of the sounds...'],

              ['Suddenly, a devilish creature appears...'],

              ['It looks like a gigantic leech, and appears to not have noticed you.',
               'Your fight or flight response kicks in...'],

              ['Panic quickly overtakes as the creatures notices you and lunges towards you.',
              'Its countless rows of teeth now in full display...'],

              [{
                  type: 'choice',
                  text : 'Run away or stay still?',
                  options : [
                    { 'text' : 'Run' }, { 'text' : 'Stay still' }
                  ]
              }],

              ['You stand as still as you can and hold your breath.',
              'Your muscles are tense and you can hear your heart pulsate in your ears.',
              'Countless scenarios run through your mind.'],

              ['Suddenly, somethings draws the creature\'s attention. '],
              ['It quickly moves away, soon to disappear in the depths of the cannals.',
              'Are you safe now?',
              'What could the next step in this treacherous waters bring?']

            ],

		        'intro' : [{
							title: 'The Sewers',
		                    body: ['Your fall halts swiftly as you land in a puddle of putrid water.',
		                            'You are knee-deep in filth and cover your nose in an attempt to not gag.',
		                            'Nevertheless you escaped.']
				}],

            'torch' : [
              ['A shabby torch lies in the ground. It is wet and cannot be lit, ',
               'but perhaps it might be useful in other ways.'],

              [{
                  type: 'choice',
                  text : 'Pick up the decorational torch?',
                  options : [
                    { 'text' : 'Yes' }, { 'text' : 'No' }
                  ]
              }]
            ],


            'doortorch' : [
              // 0
              ['The door does not badge, and there is no visible door handle.'],

              // 1
              [{
                  type: 'choice',
                  text : 'Mount the torch on the wall?',
                  options : [
                    { 'text' : 'Yes' }, { 'text' : 'No' }
                  ]
              }],

              // 2
              ['You hear a distance mechanical clicking sound. Perhaps the door is now activated.'],

              // 3
              ['<i class="blue">A peculiar looking slot on the wall.</i>']
            ],

		        'skeleton' : [

		        	    // 0 -- skeleton checked
              		[ '<i class="orange">A stern warning of the dangers that lie in the treacherous waters.</span>', 
                    'The skeleton lies in the grate out of reach...',
                    'He or she seems to be clutching something dear.'],

					        // 1, debris
	                ['A large pile of debris and trash. Perhaps you might find something useful.'],

                  // 2 search?
		              [{
		                  type: 'choice',
		                  text : 'Search the debris?',
		                  options : [
		                    { 'text' : 'Yes' }, { 'text' : 'No' }
		                  ]
		              }],

                  // 3 found something
		              ['You search through the rubble thoroughly...'],

                  // 4 take knife?
		              [{
		                  type: 'choice',
		                  text : 'Pick up the rusty knife?',
		                  options : [
		                    { 'text' : 'Yes' }, { 'text' : 'No' }
		                  ]
		              }],

                  // 5 used the stick to reach
                  ['You attempt to use the stick to reach the skeleton\'s treasure.'],

                  //6
                  ['Even with the torch, your reach is limited.',
                   'You keep trying to the verge of exhaustion.'],

                  // 7
                  ['In one final attempt, you press your body again against the cold metal bars.',
                   'You manage to brush the item, releasing it from its skeletal embrace.','',
                   'It is now yours.'],

                  // 8
                  ['What a terrible fate. Stealing from the dead.']
		        ]

		        // ------
      		}
    };


  GAME.UTILS._filterGameObjects (GAME_OBJ);

  GAME.Fire ('ReqLoadLevel', LEVEL, GAME_OBJ);
  //-
 })( window, document, GAME);