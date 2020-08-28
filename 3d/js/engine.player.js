(function ( w, d, GAME ) {
    'use strict';

    // dom elements
    var move = d.getElementById('move'),
        scene = d.getElementById('scene');
    // var camera = d.getElementById('camera');

    // dom style elements
    // var camerastyle = camera.style;
    var movestyle = move.style,
        camera_anim = false;

    if (('animate' in move)) {
      camera_anim = true;
    }
    camera_anim = false; // ####

    // camera and movement vars (rotation:translation)
    var camera_degx = -1,
        camera_degy = -1,
        old_camera_degx = 0.0,
        old_camera_degy = 0.0,
        camera_degz = 0.0,
        camera_persp = 900,

        move_z = 0,
        move_y = 0,
        move_x = 0;

      GAME.On ('ReqGetPersp', function ( callback ) {
        callback && callback({ persp: camera_persp, degx: camera_degx,  degy: camera_degy, degz: camera_degz });
      });

      GAME.On ('ReqSetPersp', function ( value, value2 ) {
        if (value) camera_persp = value;
        if (value2) { camera_degx = ( (value2 > 99999) ? (camera_degx+0.01) : value2 ); }
      });

      GAME.On ('ReqSetRot', function ( rotation, confs ) {
        var moveval, callback, tweening, steps = 0;

        if (confs)
        {
          if ( (confs/1) === confs ) {
            steps = confs;
          } else {
            steps = confs[0];
            tweening = confs[1];
          }
        }

        if (rotation.move)
        {
          moveval = rotation.move;
        }
        if (rotation.callback)
        {
          callback = rotation.callback;
        }
        if (rotation.rot)
        {
          rotation = rotation.rot;
        }

        camera_degy = camera_degy % 360;
        camera_degx = camera_degx % 360;
        camera_degz = camera_degz % 360;

        // var rot_y_check = camera_degy - rotation.x;
        var rot_x_check = camera_degx - rotation.y;

        if ( Math.abs(rot_x_check) > Math.abs(rot_x_check - 360))
        {
          rotation.y += 360;
        }
        else if ( Math.abs(rot_x_check) > Math.abs(rot_x_check + 360))
        {
          rotation.y -= 360;
        }

        if (steps > 0)
        {
            var step_init    = 1;
            var steps_total  = steps;
            var ease_linear        = function (t) { return t; };
            var ease_in_quad       = function (t) { return t*t; };
            var ease_out_quad      = function (t) { return t*(2-t); };
            var ease_inout_quad    = function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t; };
            var ease_in_elastic    = function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1; };
            var ease_out_elastic   = function (t) { return .04 * t / (--t) * Math.sin(25 * t); };
            var ease_inout_elastic = function (t) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1; };
            var easing_func        = ease_linear;

            if (tweening)
            {
                if (tweening === 'in_quad')            easing_func = ease_in_quad;
                else if (tweening === 'out_quad')      easing_func = ease_out_quad;
                else if (tweening === 'inout_quad')    easing_func = ease_inout_quad;
                else if (tweening === 'in_elastic')    easing_func = ease_in_elastic;
                else if (tweening === 'out_elastic')   easing_func = ease_out_elastic;
                else if (tweening === 'inout_elastic') easing_func = ease_inout_elastic;
            }

            var orig_cam_degy = camera_degy;
            var orig_cam_degx = camera_degx;
            var orig_cam_degz = camera_degz;

            var diff_rot_y    = (rotation.x - camera_degy);
            var diff_rot_x    = (rotation.y - camera_degx);
            var diff_rot_z    = (rotation.z - camera_degz);

            var orig_move_x = move_x;
            var orig_move_y = move_y;
            var orig_move_z = move_z;

            var diff_mov_x = 0;
            var diff_mov_y = 0;
            var diff_mov_z = 0;

            if (rotation.x === 0) diff_rot_y = 0;
            if (rotation.y === 0) diff_rot_x = 0;
            if (rotation.z === 0) diff_rot_z = 0;

            if (moveval)
            {
              diff_mov_x = (moveval.x - move_x);
              diff_mov_y = (moveval.y - move_y);
              diff_mov_z = (moveval.z - move_z);
            }

            var magic_tween = function ( step_curr ) {
              if (step_curr > steps_total)
              {
                if (GAME.__camera) {
                    GAME.__camera( -camera_degx >> 0 );
                    GAME.__camera( -camera_degx >> 0 );
                }

                callback && callback ();
                return ;
              }

              var val = easing_func ( step_curr / steps_total );

              // console.log( 'foo ', step_curr, '   ', (orig_cam_degy + (val * diff_rot_y)).toFixed(1), (orig_cam_degx + (val * diff_rot_x)).toFixed(1), (orig_cam_degz + (val * diff_rot_z)).toFixed(1) );

              camera_degy = orig_cam_degy + (val * diff_rot_y);
              camera_degx = orig_cam_degx + (val * diff_rot_x);
              camera_degz = orig_cam_degz + (val * diff_rot_z);

              GAME.DIMS.deg.x = camera_degy;
              GAME.DIMS.deg.y = camera_degx;
              old_camera_degx = camera_degx;
              old_camera_degy = camera_degy;

              if (diff_mov_x || diff_mov_z || diff_mov_y)
              {
                // console.log( 'foo ', step_curr, '   ', (orig_move_x + (val * diff_mov_x)).toFixed(1), (orig_move_y + (val * diff_mov_y)).toFixed(1), (orig_move_z + (val * diff_mov_z)).toFixed(1) );

                move_x = orig_move_x + (val * diff_mov_x);
                move_y = orig_move_y + (val * diff_mov_y);
                move_z = orig_move_z + (val * diff_mov_z);

                GAME.DIMS.pos.x = -move_x;
                GAME.DIMS.pos.y = -move_y;
                GAME.DIMS.pos.z = -move_z;
              }
              

              if (camera_anim)
              {
                // (~~(camera_degy * 10) / 10)    (~~((move_y + walk_cycle) * 100) / 100)
                const styles = { transform: 'translate3d(0px,0px,' + camera_persp + 'px) rotateX(' + _tfx(camera_degy) + 'deg) rotateY(' + _tfx(camera_degx) + 'deg) rotateZ(' + _tfx2(camera_degz) + 'deg) translate3d(' + _tfx(move_x) + 'px, ' + _tfx2(move_y + walk_cycle) + 'px, ' + _tfx(move_z) + 'px)' };
                move.animate([styles, styles], {duration: 1}).pause();
              }
              else
              {
                  movestyle.transform = 'translate3d(0px,0px,' + camera_persp + 'px) rotateX(' + _tfx(camera_degy) + 'deg) rotateY(' + _tfx(camera_degx) + 'deg) rotateZ(' + _tfx2(camera_degz) + 'deg) translate3d(' + _tfx(move_x) + 'px, ' + _tfx2(move_y + walk_cycle) + 'px, ' + _tfx(move_z) + 'px)';
              }

              requestAnimationFrame (function(){ magic_tween(++step_curr) });
            };
            magic_tween (step_init);


            /*

            var diff_y = (rotation.x - camera_degy) / steps;
            var diff_x = (rotation.y - camera_degx) / steps;
            var diff_z = (rotation.z - camera_degz) / steps;

            if (rotation.x === 0) diff_y = 0;
            if (rotation.y === 0) diff_x = 0;
            if (rotation.z === 0) diff_z = 0;

            var diff_move_x = 0;
            var diff_move_y = 0;
            var diff_move_z = 0;

            if (moveval)
            {
              diff_move_x = (moveval.x - move_x) / steps;
              diff_move_y = (moveval.y - move_y) / steps;
              diff_move_z = (moveval.z - move_z) / steps;
            }

            var jjj = 0;
            var tween = function ( steps ) {
              if (steps === 0) {

                if (GAME.__camera) {
                  GAME.__camera( -camera_degx >> 0 );
                  GAME.__camera( -camera_degx >> 0 );
                }

                callback && callback ();
                return ;
              }

              camera_degy += diff_y;
              camera_degx += diff_x;
              camera_degz += diff_z;

              // console.log( 'moo ', ++jjj, '  ', camera_degy.toFixed(1), camera_degx.toFixed(1), camera_degz.toFixed(1) );

              // if (camera_anim)
              // {
              //   const styles = { transform: 'translate3d(0px, 0px, ' + camera_persp + 'px) rotateX(' + camera_degy + 'deg) rotateY(' + camera_degx + 'deg) rotateZ(' + camera_degz + 'deg)' };
              //   camera.animate([styles, styles], {duration: 1}).pause();
              // }
              // else
              // {
              //   camerastyle.transform = 'translate3d(0px, 0px, ' + camera_persp + 'px) rotateX(' + camera_degy + 'deg) rotateY(' + camera_degx + 'deg) rotateZ(' + camera_degz + 'deg)';
              // }


              GAME.DIMS.deg.x = camera_degy;
              GAME.DIMS.deg.y = camera_degx;

              old_camera_degx = camera_degx;
              old_camera_degy = camera_degy;

              if (diff_move_x || diff_move_z || diff_move_y)
              {
                  move_x += diff_move_x;
                  move_y += diff_move_y;
                  move_z += diff_move_z;

                  console.log( 'moo ', ++jjj, '  ', move_x.toFixed(1), move_y.toFixed(1), move_z.toFixed(1) );

                  GAME.DIMS.pos.x = -move_x;
                  GAME.DIMS.pos.y = -move_y;
                  GAME.DIMS.pos.z = -move_z;

                  // movestyle.transform = 'translate3d(' + move_x + 'px, ' + move_y + 'px, ' + move_z + 'px)'; // rotateX(0deg) rotateY(0deg) rotateZ(0deg)
              }

              if (camera_anim)
              {
                const styles = { transform: 'translate3d(0px,0px,' + camera_persp + 'px) rotateX(' + camera_degy.toFixed(1) + 'deg) rotateY(' + camera_degx.toFixed(1) + 'deg) rotateZ(' + camera_degz.toFixed(2) + 'deg) translate3d(' + (move_x >> 0) + 'px, ' + (move_y + walk_cycle).toFixed(2) + 'px, ' + (move_z >> 0) + 'px)' };
                move.animate([styles, styles], {duration: 1}).pause();
              }
              else
              {
                  movestyle.transform = 'translate3d(0px,0px,' + camera_persp + 'px) rotateX(' + camera_degy.toFixed(1) + 'deg) rotateY(' + camera_degx.toFixed(1) + 'deg) rotateZ(' + camera_degz.toFixed(2) + 'deg) translate3d(' + (move_x >> 0) + 'px, ' + (move_y + walk_cycle).toFixed(2) + 'px, ' + (move_z >> 0) + 'px)';
              }


              requestAnimationFrame (function(){ tween(--steps) });
            }

            tween( steps );

            return ;
            */
            return ;
        }


        camera_degy = rotation.x;
        camera_degx = rotation.y;
        camera_degz = rotation.z;

        if (moveval)
        {
            move_x = moveval.x;
            move_y = moveval.y;
            move_z = moveval.z;

            GAME.DIMS.pos.x = -move_x;
            GAME.DIMS.pos.y = -move_y;
            GAME.DIMS.pos.z = -move_z;
        }

//          if (camera_anim)
//          {
//            const styles = { transform: 'translate3d(0px, 0px, ' + camera_persp + 'px) rotateX(' + camera_degy + 'deg) rotateY(' + camera_degx + 'deg) rotateZ(' + camera_degz + 'deg)' };
//            camera.animate([styles, styles], {duration: 1}).pause();
//          }
//          else
//          {
//            camerastyle.transform = 'translate3d(0px, 0px, ' + camera_persp + 'px) rotateX(' + camera_degy + 'deg) rotateY(' + camera_degx + 'deg) rotateZ(' + camera_degz + 'deg)';
//          }

        if (camera_anim)
        {
          const styles = { transform: 'translate3d(0px,0px,' + camera_persp + 'px) rotateX(' + _tfx(camera_degy) + 'deg) rotateY(' + _tfx(camera_degx) + 'deg) rotateZ(' + _tfx2(camera_degz) + 'deg) translate3d(' + (move_x >> 0) + 'px, ' + _tfx2(move_y + walk_cycle) + 'px, ' + (move_z >> 0) + 'px)' };
          // const styles = { transform: 'translate3d(0px,0px,' + camera_persp + 'px) rotateX(' + camera_degy.toFixed(1) + 'deg) rotateY(' + camera_degx.toFixed(1) + 'deg) rotateZ(' + camera_degz.toFixed(2) + 'deg) translate3d(' + (move_x >> 0) + 'px, ' + (move_y+walk_cycle ).toFixed(2) + 'px, ' + (move_z >> 0) + 'px)' };
          move.animate([styles, styles], {duration: 1}).pause();
        }
        else
        {
            movestyle.transform = 'translate3d(0px,0px,' + camera_persp + 'px) rotateX(' + _tfx(camera_degy) + 'deg) rotateY(' + _tfx(camera_degx) + 'deg) rotateZ(' + _tfx2(camera_degz) + 'deg) translate3d(' + (move_x >> 0) + 'px, ' + _tfx2(move_y + walk_cycle ) + 'px, ' + (move_z >> 0) + 'px)';
        }


        GAME.DIMS.deg.x = camera_degy;
        GAME.DIMS.deg.y = camera_degx;

        old_camera_degx = camera_degx;
        old_camera_degy = camera_degy;

        if (GAME.__camera) {
          GAME.__camera( -camera_degx >> 0 );
          GAME.__camera( -camera_degx >> 0 );
        }

        // --- 
      });

    w.addEventListener('resize', _getDims);
    function _getDims () {
      var left = scene.parentNode.parentNode.offsetLeft + 18;
      var width =  scene.offsetWidth;
      var top = scene.parentNode.parentNode.offsetTop + 18;
      var height = scene.offsetHeight;

      GAME.DIMS = {left: left, top:top, width:width, height:height, pos: new Vector (-move_x, 0, -move_z), deg: new Vector(camera_degy, camera_degx, 0) };
    };
    _getDims();

    ///////////////////////////////////////////////////////
    // mouse listeners
    var x = 0, y = 0,
        old_x = 0, old_y = 0,
        dragging = false, move_event = 'mousemove';

    if ('PointerEvent' in window && !GAME.UTILS.iframe) {
      move_event = 'pointermove';
    }

/*
    var rr = document.createElement('div');
    rr.style.cssText = 'position:absolute;left:0;top:0;right:0;bottom:0;z-index:999999;pointer-events:all;';
    document.body.appendChild (rr);
*/

    var mousemove = function( e ) {
      e.preventDefault();
      e.stopPropagation ();

      x = e.pageX;
      y = e.pageY;
    };

    var mouseup = function( e ) {
      e.preventDefault();

      dragging = false;

      d.removeEventListener(move_event, mousemove);
      d.removeEventListener('mouseup', mouseup);
    };
    var mousedown2 = function ( e ) {
      if (!GAME.State.control) return ;

      dragging = true;

      x = old_x = e.pageX;
      y = old_y = e.pageY;
    };
    var mousemove2 = function (e) {
      if (!dragging) return ;

      x = e.pageX;
      y = e.pageY;
    };
    var mouseup2 = function () {
      dragging = false;
    };

    scene.addEventListener('contextmenu', function( e ) {
        e.preventDefault();

        GAME.INV.Deselect();
    });

    scene.addEventListener('mousedown', function( e ) {
      e.preventDefault();

      if (!GAME.State.control) return ;

      dragging = true;

      x = old_x = e.pageX;
      y = old_y = e.pageY;

      d.addEventListener(move_event, mousemove);
      d.addEventListener('mouseup', mouseup);
    });

    var touchmove = function( e ) {
      e.stopPropagation();

      if (!GAME.State.control) return ;

      if (e.touches[0].target.id !== 'mob_cntrl')
      {
        x = e.touches[0].pageX;
        y = e.touches[0].pageY;
      }
      else if (e.touches[1] && e.touches[1].target.id !== 'mob_cntrl')
      {
        x = e.touches[1].pageX;
        y = e.touches[1].pageY;
      }
    };

    var touchend = function( e ) {
      e.stopPropagation();

      dragging = false;
      
      d.removeEventListener('touchmove', touchmove);
      d.removeEventListener('touchend', touchend);
    };
    scene.addEventListener('touchstart', function( e ) {
      e.stopPropagation();//e.preventDefault();

      if (!GAME.State.control) return ;

      dragging = true;

      if (e.touches[0].target.id !== 'mob_cntrl')
      {
        x = old_x = e.touches[0].pageX;
        y = old_y = e.touches[0].pageY;
      }
      else if (e.touches[1] && e.touches[1].target.id !== 'mob_cntrl')
      {
        x = old_x = e.touches[1].pageX;
        y = old_y = e.touches[1].pageY;
      }

      d.addEventListener('touchmove', touchmove);
      d.addEventListener('touchend', touchend);
    }, {passive:true});

      var freezeVp = function(e) {
          //if (e.touches && e.touches[1]) return ;
          e.preventDefault();
      };
      // document.body.addEventListener("touchmove", freezeVp, {passive: false});
      document.getElementById('scn-cntr').addEventListener("touchmove", freezeVp, {passive: false});
      document.getElementById('ui').addEventListener("touchmove", freezeVp, {passive: false});

    ///////////////////////////////////////////////////////
    // WASD listeners
    var keyW = false,
        keyA = false,
        keyS = false,
        keyD = false;
    var key_down = false;

    var onKeyDown = function (event) {

      if (!GAME.State.control) return ;
      var keyCode = event.keyCode;

      event.preventDefault();

      switch (keyCode)
      {
        case 68: // d
        case 39: // arrow right
          keyD = true;
          key_down = true;
          break;
        case 83: // s
        case 40: // arrow down
          keyS = true;
          key_down = true;
          break;
        case 65: // a
        case 37: // arrow left
          keyA = true;
          key_down = true;
          break;
        case 87: // w
        case 38: // arrow up
          keyW = true;
          key_down = true;
          break;
      }
    };

    var onKeyUp = function (event) {
      var keyCode = event.keyCode;

      switch (keyCode) {
        case 68: //d
        case 39: // arrow right
          keyD = false;

          if (key_down && !keyA && !keyS && !keyW) {
            key_down = false;
          }
          break;
        case 83: //s
        case 40: // arrow down
          keyS = false;
          if (key_down && !keyA && !keyD && !keyW) {
            key_down = false;
          }
          break;
        case 65: //a
        case 37: // arrow left
          keyA = false;
          if (key_down && !keyD && !keyS && !keyW) {
            key_down = false;
          }
          break;
        case 87: //w
        case 38: // arrow up
          keyW = false;
          if (key_down && !keyA && !keyS && !keyD) {
            key_down = false;
          }
          break;
      }

      if (keyCode === 27) GAME.INV.Deselect();
    };

    w.addEventListener("keydown", onKeyDown, false);
    w.addEventListener("keyup", onKeyUp, false);

    if (GAME.UTILS.iframe)
    {
      w._ONKEYDOWN = onKeyDown;
      w._ONKEYUP   = onKeyUp;

      w._MDOWN = mousedown2;
      w._MMOVE = mousemove2;
      w._MUP = mouseup2;
    }


    if (GAME.UTILS.Mobile)
    {
      // add mobile controls
      (function ( w, d, GAME ) {
        var mobile_controls = d.createElement('div');
        mobile_controls.id = 'mob_cntrl';
        mobile_controls.addEventListener('contextmenu', function(e){
          e.preventDefault();
        });
        mobile_controls.addEventListener("touchmove", freezeVp, {passive: false});

        var is_touch_dragging = false;
        var touch_x = 0, touch_y = 0;
        var touch_width = 120, touch_height = 120;

        mobile_controls.addEventListener('touchstart', function ( e ) {
          if (!GAME.State.control) return ;
          if (is_touch_dragging) return ;

          var touch = e.touches[0];
          if (touch.target.id !== 'mob_cntrl')
          {
            if (e.touches[1] && e.touches[1].target.id === 'mob_cntrl')
              touch = e.touches[1];
            else return ;
          }

          is_touch_dragging = true;

          touch_x = touch.pageX - touch.target.offsetLeft;
          touch_y = touch.pageY - touch.target.offsetTop;

          var percentage_width = touch_x / touch_width;
          var percentage_height = touch_y / touch_height;

          if (percentage_width > 0.66) {
            keyD = true;
            keyA = false;
          }
          else if (percentage_width < 0.34) {
            keyA = true;
            keyD = false;
          }
          else {
            keyD = keyA = false;
          }

          if (percentage_height > 0.66) {
            keyS = true;
            keyW = false;
          }
          else if (percentage_height < 0.34) {
            keyW = true;
            keyS = false;
          }
          else {
            keyS = keyW = false;
          }

        }, {passive:true});

        mobile_controls.addEventListener('touchmove', function(e) {
          if (!GAME.State.control) return ;
          if (!is_touch_dragging) return ;

          var touch = e.touches[0];

          if (touch.target.id !== 'mob_cntrl')
          {
            if (e.touches[1] && e.touches[1].target.id === 'mob_cntrl')
              touch = e.touches[1];
            else return ;
          }

          touch_x = touch.pageX - touch.target.offsetLeft;
          touch_y = touch.pageY - touch.target.offsetTop;

          var percentage_width = touch_x / touch_width;
          var percentage_height = touch_y / touch_height;

          key_down = true;

          if (percentage_width > 0.66) {
            keyD = true;
            keyA = false;
          }
          else if (percentage_width < 0.34) {
            keyA = true;
            keyD = false;
          }
          else {
            keyD = keyA = false;
          }

          if (percentage_height > 0.66) {
            keyS = true;
            keyW = false;
          }
          else if (percentage_height < 0.34) {
            keyW = true;
            keyS = false;
          }
          else {
            keyS = keyW = false;
          }

        }, {passive:true});

        mobile_controls.addEventListener('touchend', function(e) {
          keyW = keyA = keyS = keyD = false;
          key_down = false;

          is_touch_dragging = false;
        }, {passive:true});
/*
        var w_key = d.createElement('a'),
            a_key = d.createElement('a'),
            s_key = d.createElement('a'),
            d_key = d.createElement('a'),
            act_key = d.createElement('a');

        w_key.style.cssText = 'top:0;left:76px;';
        a_key.style.cssText = 'top:60px;left:16px;';
        s_key.style.cssText = 'top:120px;left:76px;';
        d_key.style.cssText = 'top:60px;left:136px;';

        act_key.className = 'mob_act_key';
        
        mobile_controls.appendChild (w_key);
        mobile_controls.appendChild (a_key);
        mobile_controls.appendChild (s_key);
        mobile_controls.appendChild (d_key);
        mobile_controls.appendChild (act_key);


        var touch_start = function ( e ) {
            e.stopPropagation();
            if (!GAME.State.control) return ;

            if (this === w_key) {
              keyW = true;
            }
            else if (this === a_key) {
              keyA = true;
            }
            else if (this === s_key) {
              keyS = true;
            }
            else if (this === d_key) {
              keyD = true;
            }
        };

        var touch_end = function ( e ) {
            e.stopPropagation();

            if (this === w_key) {
              keyW = false;
            }
            else if (this === a_key) {
              keyA = false;
            }
            else if (this === s_key) {
              keyS = false;
            }
            else if (this === d_key) {
              keyD = false;
            }
        };

        w_key.addEventListener('touchstart', touch_start, {passive:true});
        a_key.addEventListener('touchstart', touch_start, {passive:true});
        s_key.addEventListener('touchstart', touch_start, {passive:true});
        d_key.addEventListener('touchstart', touch_start, {passive:true});
        act_key.addEventListener('touchstart', touch_start, {passive:true});

        w_key.addEventListener('touchend', touch_end);
        a_key.addEventListener('touchend', touch_end);
        s_key.addEventListener('touchend', touch_end);
        d_key.addEventListener('touchend', touch_end);
        act_key.addEventListener('touchend', touch_end);
*/

        document.body.appendChild( mobile_controls );
      })( w, d, GAME );
    }

    // if we have left the tab
    if (!GAME.ACTIONS) GAME.ACTIONS = {};
    GAME.ACTIONS.ResetControls = function () {
      d.removeEventListener('mousemove', mousemove);
      d.removeEventListener('pointermove', mousemove);
      d.removeEventListener('mouseup', mouseup);

      // resseting keys
      keyW = keyA = keyS = keyD = false;
      key_down = false;
      dragging = false;

      // resetting movement
      speed = 1; is_moving = false;
      sideways = 0; camera_degz = 0;
      walk_cycle_level = 0.5; front = 0;
    }




    ///////////////////////////////////////////////////////
    // PAUSE MENU
    var __tm = null;
    var paused = d.getElementById('pause');
    paused.addEventListener('click', function() {
      paused.style.opacity = '0';

      __tm && clearTimeout( __tm ); __tm = null;
      __tm = setTimeout(function() {
          paused.style.display = 'none';
      }, 320);

    }, false);

    w.addEventListener('blur', function() {
      GAME.ACTIONS.ResetControls ();
      GAME.State.focus = 0;

      __tm && clearTimeout( __tm ); __tm = null;
      __tm = setTimeout(function() {
        if (GAME.State.focus || !GAME.State.running) return ;
        if (!paused || !paused.parentNode) return ;

        paused.style.opacity = '1.0';
        paused.style.display = 'block';
      }, 870);
    });

    w.addEventListener('focus', function() {
      GAME.State.focus = 1;
      __tm && clearTimeout( __tm ); __tm = null;
    });
    // ENDOF PAUSE MENU
    ///////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////
    var speed = 1, speed_step = 0.2;
    var is_moving = false;

    var front = 0, sideways = 0;

    var trigger_check = 10;
    var walk_cycle = 0, walk_cycle_level = 0.5;
    var old_ms = 0;

    var _tfx = function (val) {
      return (((val * 10) >> 0) / 10);
    };
    var _tfx2 = function (val) {
      return (((val * 100) >> 0) / 100);
    };

    var _rrender = function ( e ) {
      var range = (e - old_ms);

      // throttling at 30ms
      if (range > 21) {
        old_ms = e;
      }
      else {
        requestAnimationFrame( _rrender );
        return ;
      }

      var jumps = (range / 16) >> 0;
      var moved = false;

      // computing camera angle
      var x_diff = (old_x - x);
      var y_diff = (old_y - y);
      var max_diff = 5;

      // setp functions
      var old_move_x = move_x;
      var old_move_z = move_z;

      is_moving = false;


      if (Math.abs (x_diff) > max_diff)
      {
            let easing = 0.38;
            let frameEasing;

            if (old_x < x)
            {
                frameEasing = Math.floor ((old_x - x) * easing);
                frameEasing = (frameEasing > -max_diff) ? -max_diff : frameEasing;
                old_x = old_x - frameEasing;
                old_x = (old_x > x) ? x : old_x;
            }
            else
            {
                frameEasing = Math.ceil ((old_x - x) * easing);
                frameEasing = (frameEasing < max_diff) ? max_diff : frameEasing;
                old_x = old_x - frameEasing;
                old_x = (old_x < x) ? x : old_x;
            }

            camera_degx -= frameEasing / 3.4;
      }
      else
      {
          camera_degx -= x_diff / 3.4;
          old_x = x;
      }


      if (Math.abs (y_diff) > max_diff)
      {
            let easing = 0.38;
            let frameEasing;

            if (old_y < y)
            {
                frameEasing = Math.floor ((old_y - y) * easing);
                if (frameEasing > -max_diff) frameEasing = -max_diff;

                old_y = old_y - frameEasing;
                if (old_y > y) old_y = y;
            }
            else
            {
                frameEasing = Math.ceil ((old_y - y) * easing);
                if (frameEasing < max_diff) frameEasing = max_diff;

                old_y = old_y - frameEasing;
                if (old_y < y) old_y = y;  
            }

            camera_degy += frameEasing / 3.4;
      }
      else
      {
          camera_degy += y_diff / 3.4;
          old_y = y;
      }

      camera_degy = ((camera_degy * 100) >> 0)/100;
      camera_degx = ((camera_degx * 100) >> 0)/100;

      if (camera_degy < -78) camera_degy = -78;
      else if (camera_degy > 52) camera_degy = 52;


      let factor_inner = Math.PI * ( ((camera_degx % 360) / 360) * 2);
      let factor_x =  Math.sin( factor_inner );
      let factor_z =  Math.cos( factor_inner );

      if (key_down)
      {
            if (keyD)
            {
                if (++sideways > 12) sideways = 12;
                move_x -= (speed * factor_z);
                move_z -= (speed * factor_x);
                is_moving = true;

                camera_degz -= 0.1 * jumps;
                if (camera_degz < -1.2) camera_degz = -1.2;
            }
            else if (sideways > 0) --sideways;

            if (keyS)
            {
                if (--front < -12) front = -12;
                move_z -= (speed * factor_z);
                move_x += (speed * factor_x);
                is_moving = true;
            }
            else if (front < 0) ++front;
            
            if (keyA)
            {
                if (--sideways < -12) sideways = -12;
                move_x += (speed * factor_z);
                move_z += (speed * factor_x);
                is_moving = true;

                camera_degz += 0.1 * jumps ;
                if (camera_degz > 1.2) camera_degz = 1.2;
            }
            else if (sideways < 0) ++sideways;

            if (keyW)
            {
                if (++front > 12) front = 12;
                move_z += (speed * factor_z);
                move_x -= (speed * factor_x);
                is_moving = true;
            }
            else if (front > 0) --front;
      }


      if (is_moving)
      {
          walk_cycle += (walk_cycle_level) * jumps;
          if (walk_cycle > 3.5)
          {
            walk_cycle_level = -0.5;
            !GAME.UTILS.Mobile && GAME.Sound.PlayStep();
          }
          else if (walk_cycle < -3.5)
          {
            walk_cycle_level = 0.5;
          }

          speed += speed_step * jumps;
          if (speed > 8.2) speed = 8.2;
      }
      else if (speed !== 1)
      {
          if (walk_cycle > 0)
          {
            walk_cycle -= 0.5 * jumps;
          }
          else if (walk_cycle < 0)
          {
            walk_cycle += 0.5  * jumps;
          }
          walk_cycle_level = 0.5;

          // stop moving
          speed -= speed_step * jumps * 3.5;
          if (speed < 1)
          {
            front = 0; sideways = 0;
            speed = 1;
          }
          else
          {
            if (front > 0)
            {
              move_z += speed * factor_z;
              move_x -= speed * factor_x;
            }
            else if (front < 0)
            {
              move_z -= speed * factor_z;
              move_x += speed * factor_x;
            }

            if (sideways > 0)
            {
              move_x -= speed * factor_z;
              move_z -= speed * factor_x;
            }
            else if (sideways < 0)
            {
              move_x += speed * factor_z;
              move_z += speed * factor_x;
            }
            // -----
          }
      }
      else
      {
          if (camera_degz !== 0)
          {
            if (camera_degz < 0) camera_degz += 0.1;
            else camera_degz -= 0.1;

            if (Math.abs (camera_degz) < 0.1 ) camera_degz = 0;

            moved = true;
          }
      }

      if (old_move_x !== move_x || old_move_z !== move_z)
      {
          // #### wall checks
          for (let i = 0; i < GAME.LEVEL.WALLS.length; ++i)
          {
            let wall = GAME.LEVEL.WALLS[i];

            if (!wall.vertices) continue;

            if (wall.ramp)
            {
                if (insidePolygon({x:-move_x, z:-move_z}, wall.vertices) )
                {
                    // ---
                    var total = wall.vertices[0].x - wall.vertices[2].x;
                    var mine = -move_x - wall.vertices[2].x;

                    move_y = -((wall.angle * (mine / total ) ) >> 0) - wall.ramp_start;
                    // ---
                }

              continue;
            }

            let distance = pDistance (-move_x, -move_z, wall.vertices[0].x, wall.vertices[0].z, wall.vertices[1].x, wall.vertices[1].z);

            if (distance < 50)
            {
              if (wall.angle === 180 || wall.angle === 0)
              {
                move_z = old_move_z;
              }
              else if (wall.angle === 90 || wall.angle === -90)
              {
                move_x = old_move_x;
              }
            }
            // ----
          }


          moved = true;

          GAME.DIMS.pos.x = -move_x;
          GAME.DIMS.pos.z = -move_z;
          GAME.DIMS.pos.y = -move_y;

          if (--trigger_check % 4 === 0)
          {
              let triggers = GAME.LEVEL.MAP.TRIGGERS_4;
              if (trigger_check === 0)
              {
                triggers = GAME.LEVEL.MAP.TRIGGERS_16;
                trigger_check = 16;
              }

              if (triggers)
              {
                for (let tr = 0; tr < triggers.length; ++tr)
                {
                        // distance between trigger and player
                        let trigg = triggers[ tr ];

                        if (!trigg.vertices) continue;

                        if (insidePolygon ({x:-move_x, z:-move_z}, trigg.vertices) )
                        {
                              if (!trigg.act)
                              {
                                trigg.act = 1;
                                trigg.onchange( closestSide (move_x, move_y, trigg) );
                              }
                              //else if (trigg.type === 1)
                              //{
                              //  trigg.onchange('inside update');
                              //}
                        }
                        else
                        {
                              if (trigg.act)
                              {
                                trigg.act = 0;
                                trigg.onchange( closestSide (move_x, move_y, trigg) );
                              }
                        }
                }
              }
              // ----
          }
          // -
      }

      // only if it has changed
      if (old_camera_degx !== camera_degx) {
        moved = true;
      }

      //var ann = null;
      if (moved || old_camera_degy !== camera_degy)
      {
          if (camera_anim)
          {
            const styles = { transform: 'translate3d(0px,0px,' + camera_persp + 'px) rotateX(' + _tfx(camera_degy) + 'deg) rotateY(' + _tfx(camera_degx) + 'deg) rotateZ(' + _tfx(camera_degz) + 'deg) translate3d(' + (move_x >> 0) + 'px, ' + _tfx2(move_y + walk_cycle) + 'px, ' + (move_z >> 0) + 'px)' };
            move.animate([styles, styles], {duration: 1}).pause();
          }
          else
          {
              movestyle.transform = 'translate3d(0px,0px,' + camera_persp + 'px) rotateX(' + _tfx(camera_degy) + 'deg) rotateY(' + _tfx(camera_degx) + 'deg) rotateZ(' + _tfx(camera_degz) + 'deg) translate3d(' + (move_x >> 0) + 'px, ' + _tfx2(move_y + walk_cycle) + 'px, ' + (move_z >> 0) + 'px)';
          }

          GAME.DIMS.deg.x = camera_degy;
          GAME.DIMS.deg.y = camera_degx;

          old_camera_degx = camera_degx;
          old_camera_degy = camera_degy;

          GAME.__camera( -camera_degx >> 0 );
      }

      if (GAME.__render)
      {
        GAME.__render ();
        GAME.__render = null;
      }

      GAME.__ai && GAME.__ai ( e );

      // ---

      // if (!ann)
      requestAnimationFrame( _rrender );
    };


    requestAnimationFrame( _rrender );


    function insidePolygon(point, vs) {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        var x = point.x, y = point.z;

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i].x, yi = vs[i].z;
            var xj = vs[j].x, yj = vs[j].z;

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };

    function closestSide (move_x, move_y, trigg) {
        var v1 = new Vector(-move_x, 0, -move_z);
        var v2 = new Vector ((trigg.vertices[0].x+trigg.vertices[1].x)/2, 0, (trigg.vertices[0].z+trigg.vertices[1].z)/2);
        var distance = DistanceVector (v1, v2);
        var min = distance; var ind = 0;

        v2.x = (trigg.vertices[1].x+trigg.vertices[2].x)/2;
        v2.z = (trigg.vertices[1].z+trigg.vertices[2].z)/2;

        distance = DistanceVector (v1, v2);
        if (distance < min) { min = distance; ind = 1; }

        v2.x = (trigg.vertices[2].x+trigg.vertices[3].x)/2;
        v2.z = (trigg.vertices[2].z+trigg.vertices[3].z)/2;

        distance = DistanceVector (v1, v2);
        if (distance < min) { min = distance; ind = 2; }

        v2.x = (trigg.vertices[3].x+trigg.vertices[0].x)/2;
        v2.z = (trigg.vertices[3].z+trigg.vertices[0].z)/2;

        distance = DistanceVector (v1, v2);
        if (distance < min) { min = distance; ind = 3; }

        return (ind);
    }

    function pDistance(x, y, x1, y1, x2, y2) {
        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;

        var dot = A * C + B * D;
        var len_sq = C * C + D * D;
        var param = -1;
        if (len_sq !== 0) //in case of 0 length line
            param = dot / len_sq;

        var xx, yy;

        if (param < 0) {
          xx = x1;
          yy = y1;
        }
        else if (param > 1) {
          xx = x2;
          yy = y2;
        }
        else {
          xx = x1 + param * C;
          yy = y1 + param * D;
        }

        var dx = x - xx;
        var dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
      }

})( window, document, GAME );