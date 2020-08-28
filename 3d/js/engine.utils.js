(function ( w, d, GAME ) {
  'use strict';

  var UTILS = {};

  if (!GAME.UTILS) GAME.UTILS = UTILS;


  //////////////////////////////////////////////
  // modifies an element and fires the callback 
  // once the object's transition ended
  UTILS.RunAfterTransition = function ( obj ) {

      w.requestAnimationFrame(function () {
        var el = obj.el;
        var comp_style = getComputedStyle ( el );
        var el_style = el.style;
        var attr = obj.attr;
        var offset = obj.offset || 1;
        var cb = obj.cb;
        var transition_duration = (parseFloat (comp_style.transitionDuration) + parseFloat (comp_style.transitionDelay));

        var finale = function () {
            if (obj.del > 0 && el.parentNode)
            {
              if (obj.del === 2) el_style.display = 'none';
              el.parentNode.removeChild ( el );
            }

           cb && cb ();
        };

        if (obj.dur) transition_duration = obj.dur;
        if (!attr) attr = comp_style.transitionProperty;

        el_style[attr] = (obj.val + '');

        if (!transition_duration) {
          finale ();
          return ;
        }

        setTimeout ( finale, offset + transition_duration * 1000 );
      });

  };


  //////////////////////////////////////////////
  // Loads js script asynchronously
  GAME.UTILS.LoadScript = function ( src, callback ) {
      var s = d.createElement('script'), r = false, t;
      s.type = 'text/javascript';
      s.src = src;
      s.onload = s.onreadystatechange = function() {
        if ( !r && (!this.readyState || this.readyState == 'complete') )
        {
          r = true;
          callback && callback();
        }
      };
      t = d.getElementsByTagName('head')[0];
      t.appendChild ( s );
  };

  GAME.UTILS.DummyEl = function (x, y, z) {
    var el = d.createElement('div');
    el.className = 'vertex';
    el.style.transform = 'translate3d('+ x +'px,'+ y +'px,'+ z +'px)';
    el.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    el.setAttribute('vertex-id', 'random');

    move.appendChild( el );
  };

  GAME.UTILS.RandomColor = function () {
    return ('#'+(Math.random()*0xFFFFFF<<0).toString(16));
  };

  GAME.UTILS.Distance = function ( el ) {
    if (!el) return (0);

    if (el.tagName === 'DIV')
    {
      var trans = el.style.transform;
      var arr = trans.replace('translate3d(','').split(')')[0].replace(')','')
          .replace('px','').replace('px','').replace('px','')
          .replace(' ', '').replace(' ', '').split(',');
      var el_pos = new Vector (arr[0] / 1, arr[1] / 1, arr[2] / 1);

      return (el_pos.subtract ( GAME.DIMS.pos ).length () >> 0);
    }

    if (el.vertices)
    {
          if (!el.centroid)
          {
            if (el.vertices && el.vertices[0])
            {
              var nv = el.vertices;
              el.centroid = new Vector ( (nv[2].x + nv[0].x)/2,  (nv[2].y + nv[0].y)/2, (nv[2].z + nv[0].z)/2  );
            }
            else
            {
              var temp = el.el.style.transform.replace('translate3d(','').split(')')[0];
              temp = temp.replace('px', '').replace('px', '').replace('px', '').replace(' ', '').replace(' ', '').replace(' ', '').split(',');

              el.centroid = new Vector( temp[0]/1, temp[1]/1, temp[2]/1 );
            }
          }

          return (el.centroid.subtract ( GAME.DIMS.pos ).length () >> 0);
    }

    return (0);
  };


  GAME.UTILS.IsVisible = function ( node ) {
    var vv = new Vector();
    var projection_matrix = [1.9403849094557126, 0, 0, 0, 0, 2.7474774194546225, 0, 0, 0, 0, -1.0002000200020003, -1, 0, 0, -2.000200020002, 0];
    var cam_mat = __getCamMatrix ();
    var mat_rev = GetInverse( cam_mat );

    if (!node.centroid)
    {
          if (node.vertices && node.vertices[0])
          {
            var nv = node.vertices;
            node.centroid = new Vector ( (nv[2].x + nv[0].x)/2,  (nv[2].y + nv[0].y)/2, (nv[2].z + nv[0].z)/2  );
          }
          else
          {
            var temp = node.el.style.transform.replace('translate3d(','').split(')')[0];
            temp = temp.replace('px', '').replace('px', '').replace('px', '').replace(' ', '').replace(' ', '').replace(' ', '').split(',');

            node.centroid = new Vector( temp[0]/1, temp[1]/1, temp[2]/1 );
          }
    }

    // check if the element is visible on screen
    vv.x = node.centroid.x;
    vv.y = node.centroid.y;
    vv.z = node.centroid.z;

    vv.applyMatrix4( mat_rev ).applyMatrix4( projection_matrix );

    if ( Math.abs (vv.x) < 1 && Math.abs (vv.y) < 1 && vv.z < 1.0001 ) {
      return (true);
    }
    else {
      return (false);
    }
  };

  GAME.UTILS.RotateNodeToCamera = function (node) {
      var cam_mat = __getCamMatrix ();
      var mat_rev = GetInverse (cam_mat);
      var vv = node.centroid.clone ();

      if (!node.orig_trans)
      {
        node.orig_trans = node.transform;
      }

      var new_trans = node.orig_trans + ' rotateY(' + (-GAME.DIMS.deg.y) + 'deg)';
      new_trans += ' rotateX(' + (-GAME.DIMS.deg.x) + 'deg)';
      node.el.style.transform = new_trans;
  };

  GAME.UTILS.ProjectMouse = function (x, y) {
    var ray_origin = new Vector(GAME.DIMS.pos.x, GAME.DIMS.pos.y, GAME.DIMS.pos.z);
    var ray_direction = new Vector(x, y, 0.5);

    var cam_mat = __getCamMatrix ();
    var mat_rev = GetInverse (cam_mat);
    var mat_rev = MultiplyMatrices([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 900, 1], mat_rev);
    var new_mat = GetInverse (mat_rev);

    ray_direction.applyMatrix4( new_mat ); //.applyMatrix4( FOV_MAT_SELF_45 );

    // console.log( ray_origin, ray_direction); // .subtract (ray_origin) );

      if (!window.temp_debug)
      {
          window.temp_debug = document.createElement('div');
          window.temp_debug.id = 'temp_debug';
          window.temp_debug.className = 'obj';
          var sss = document.getElementById('scn-cntr');
          window.temp_debug.style.cssText = 'width:12px;height:12px;position:absolute;z-index:999;background:red;backface-visibility:visible;';
          move.appendChild( window.temp_debug );
      }

      window.temp_debug.style.transform = 'translate3d(' + ray_direction.x + 'px,' + ray_direction.y + 'px,'+ray_direction.z+'px)';

     // if ( _intersectsPlane( ray_origin, ray_direction, GAME.LEVEL.MAP.NODES['wall-door'], false ) ) {
     //     console.log( "INTERSTS" );
     // }
  };

  function __getCamMatrix () {
      var x = DegToRad(-GAME.DIMS.deg.x);
      var y = DegToRad(-GAME.DIMS.deg.y);
      var z = 0;

      var cos = Math.cos;
      var sin = Math.sin;

      var c1 = cos( x / 2 );
      var c2 = cos( y / 2 );
      var c3 = cos( z / 2 );

      var s1 = sin( x / 2 );
      var s2 = sin( y / 2 );
      var s3 = sin( z / 2 );


      x = s1 * c2 * c3 + c1 * s2 * s3;
      y = c1 * s2 * c3 - s1 * c2 * s3;
      z = c1 * c2 * s3 - s1 * s2 * c3;
      var w_ = c1 * c2 * c3 + s1 * s2 * s3;


      var x2 = x + x, y2 = y + y, z2 = z + z;
      var xx = x * x2, xy = x * y2, xz = x * z2;
      var yy = y * y2, yz = y * z2, zz = z * z2;
      var wx = w_ * x2, wy = w_ * y2, wz = w_ * z2;

      var sx = 1, sy = 1, sz = 1;
      var cam_mat = [];
      cam_mat[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
      cam_mat[ 1 ] = ( xy + wz ) * sx;
      cam_mat[ 2 ] = ( xz - wy ) * sx;
      cam_mat[ 3 ] = 0;

      cam_mat[ 4 ] = ( xy - wz ) * sy;
      cam_mat[ 5 ] = ( 1 - ( xx + zz ) ) * sy;
      cam_mat[ 6 ] = ( yz + wx ) * sy;
      cam_mat[ 7 ] = 0;

      cam_mat[ 8 ] = ( xz + wy ) * sz;
      cam_mat[ 9 ] = ( yz - wx ) * sz;
      cam_mat[ 10 ] = ( 1 - ( xx + yy ) ) * sz;
      cam_mat[ 11 ] = 0;

      cam_mat[ 12 ] = GAME.DIMS.pos.x;
      cam_mat[ 13 ] = GAME.DIMS.pos.y;
      cam_mat[ 14 ] = GAME.DIMS.pos.z;
      cam_mat[ 15 ] = 1;

      return (cam_mat);
  }

  GAME.UTILS.iframe = (window === window.parent) ? false : true;

  GAME.UTILS.RotateCameraTo = function ( point ) {
      var cam_mat = __getCamMatrix ();
      // var mat_rev = GetInverse( cam_mat );
      // console.log( mat_rev );

      /*
      var _GetMatrixCSS = (function() {
          var MatrixCSS = w.WebKitCSSMatrix ||
                          w.MozCSSMatrix ||
                          w.MsCSSMatrix ||
                          w.OCSSMatrix ||
                          w.CSSMatrix;
          var matrix_css = new MatrixCSS ();

          if (!matrix_css.toFloat32Array)
          {
            MatrixCSS.prototype.toFloat32Array = function() {
              return ([this.m11, this.m12, this.m13, this.m14,
                      this.m21, this.m22, this.m23, this.m24,
                      this.m31, this.m32, this.m33, this.m34,
                      this.m41, this.m42, this.m43, this.m44]);
            };
          }

          return function ( trans ) {
            matrix_css.setMatrixValue ( trans );
            return (matrix_css.toFloat32Array());
          };
      })();

      var matt = _GetMatrixCSS (move.style.transform);

      // var xxx = MultiplyMatrices([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 900, 1], GetInverse(cam_mat)  );
      matt = GetInverse (matt);
      var tg_node = document.getElementById('floor-1');

      tg_node.style.transform = 'matrix3d(' + matt.join(',') + ') translate3d(-250px, -250px, 100px)';
      tg_node.style.transformOrigin = '0 0';
      return ;
      */

      var world_arr = LookAt( GetInverse (cam_mat),
        GAME.DIMS.pos.clone(),
        point.clone(),
        new Vector(0,1,0));

      world_arr = MultiplyMatrices([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 900, 1], GetInverse(world_arr)  );

      var clamp = function (value, min, max) {
          if (min > max) {
              var tmp = max;
              max = min;
              min = tmp;
          }
          return (value < min) ? min : ((value > max) ? max : value);
      };

      var _getRotation = function ( m ) {
          var ret = new Vector();

          // -----------------------------------------
          var m11 = m[ 0 ], m12 = m[ 4 ], m13 = m[ 8 ];
          var m21 = m[ 1 ], m22 = m[ 5 ], m23 = m[ 9 ];
          var m31 = m[ 2 ], m32 = m[ 6 ], m33 = m[ 10 ];

          ret.x = Math.asin( clamp( m32, - 1, 1 ) ) * (180 / Math.PI);
          if ( Math.abs( m32 ) < 0.9999999 ) {
            ret.y = Math.atan2( - m31, m33 ) * (180 / Math.PI);
            ret.z = Math.atan2( - m12, m22 ) * (180 / Math.PI);
          } else {
            ret.y = 0;
            ret.z = Math.atan2( m21, m11 ) * (180 / Math.PI);
          }

          ret.z = 0;
          return (ret);

          /*
          var order = 'XYZ';
          if ( order === 'XYZ' )
          {
              ret.y = Math.asin( clamp( m13, - 1, 1 ) ) * (180 / Math.PI);

              if ( Math.abs( m13 ) < 0.9999999 ) {
                ret.x = Math.atan2( - m23, m33 ) * (180 / Math.PI);
                ret.z = Math.atan2( - m12, m11 ) * (180 / Math.PI);
              } else {
                ret.x = Math.atan2( m32, m22 ) * (180 / Math.PI);
                ret.z = 0;
              }
          }
          console.log( order, ret.clone () );
          
          ret = new Vector();
          order = 'YXZ';
          if ( order === 'YXZ' )
          {
              ret.x = Math.asin( - clamp( m23, - 1, 1 ) ) * (180 / Math.PI);

              if ( Math.abs( m23 ) < 0.9999999 ) {
                ret.y = Math.atan2( m13, m33 ) * (180 / Math.PI);
                ret.z = Math.atan2( m21, m22 ) * (180 / Math.PI);
              } else {
                ret.y = Math.atan2( - m31, m11 ) * (180 / Math.PI);
                ret.z = 0;
              }
          }
          console.log( order, ret.clone () );



          ret = new Vector();
          order = 'ZXY';
          if ( order === 'ZXY' )
          {
            ret.x = Math.asin( clamp( m32, - 1, 1 ) ) * (180 / Math.PI);
            if ( Math.abs( m32 ) < 0.9999999 ) {
              ret.y = Math.atan2( - m31, m33 ) * (180 / Math.PI);
              ret.z = Math.atan2( - m12, m22 ) * (180 / Math.PI);
            } else {
              ret.y = 0;
              ret.z = Math.atan2( m21, m11 ) * (180 / Math.PI);
            }

            ret.z = 0;
            return (ret);
          }
          console.log( order, ret.clone () );


          ret = new Vector();
          order = 'ZYX';
          if ( order === 'ZYX' )
          {
            ret.y = Math.asin( - clamp( m31, - 1, 1 ) ) * (180 / Math.PI);

            if ( Math.abs( m31 ) < 0.9999999 ) {

              ret.x = Math.atan2( m32, m33 ) * (180 / Math.PI);
              ret.z = Math.atan2( m21, m11 ) * (180 / Math.PI);

            } else {
              ret.x = 0;
              ret.z = Math.atan2( - m12, m22 ) * (180 / Math.PI);
            }

          }
          console.log( order, ret.clone () );


          ret = new Vector();
          order = 'YZX';
          if ( order === 'YZX' ) {
            ret.z = Math.asin( clamp( m21, - 1, 1 ) ) * (180 / Math.PI);

            if ( Math.abs( m21 ) < 0.9999999 ) {

              ret.x = Math.atan2( - m23, m22 ) * (180 / Math.PI);
              ret.y = Math.atan2( - m31, m11 ) * (180 / Math.PI);

            } else {

              ret.x = 0;
              ret.y = Math.atan2( m13, m33 ) * (180 / Math.PI);

            }

          }
          console.log( order, ret.clone () );


          ret = new Vector();
          order = 'XZY';
          if ( order === 'XZY' ) {

            ret.z = Math.asin( - clamp( m12, - 1, 1 ) ) * (180 / Math.PI);

            if ( Math.abs( m12 ) < 0.9999999 ) {
              ret.x = Math.atan2( m32, m22 ) * (180 / Math.PI);
              ret.y = Math.atan2( m13, m11 ) * (180 / Math.PI);
            } else {
              ret.x = Math.atan2( - m23, m33 ) * (180 / Math.PI);
              ret.y = 0;
            }
          }
          console.log( order, ret.clone () );

          ret = new Vector();

          // ret.x = Math.asin( - clamp( m[9], - 1, 1 ) ) * (180 / Math.PI);
          // ret.x = Math.atan2(m[9], m[5]) * (180 / Math.PI);
          if ( Math.abs( m[9] ) < 0.99999 ) {
            ret.y = Math.atan2( m[8], m[10] ) * (180 / Math.PI); 
            ret.x = -Math.atan2( m[1], m[5] ) * (180 / Math.PI);
          } else {
            ret.y = Math.atan2( -m[2], m[0] ) * (180 / Math.PI);
            ret.x = 0;
          }

          return (ret);
          */
      };

      var rot = _getRotation( world_arr );



      return (rot);
  };

  GAME.UTILS.GetRotation = function ( m ) {
          var ret = new Vector();
          var clamp = function (value, min, max) {
              if (min > max) {
                  var tmp = max;
                  max = min;
                  min = tmp;
              }
              return (value < min) ? min : ((value > max) ? max : value);
          };

          // -----------------------------------------
          var m11 = m[ 0 ], m12 = m[ 4 ], m13 = m[ 8 ];
          var m21 = m[ 1 ], m22 = m[ 5 ], m23 = m[ 9 ];
          var m31 = m[ 2 ], m32 = m[ 6 ], m33 = m[ 10 ];

          ret.x = Math.asin( clamp( m32, - 1, 1 ) ) * (180 / Math.PI);
          if ( Math.abs( m32 ) < 0.9999999 ) {
            ret.y = Math.atan2( - m31, m33 ) * (180 / Math.PI);
            ret.z = Math.atan2( - m12, m22 ) * (180 / Math.PI);
          } else {
            ret.y = 0;
            ret.z = Math.atan2( m21, m11 ) * (180 / Math.PI);
          }

          ret.z = 0;
          return (ret);
  };


  GAME.UTILS.UnpackColor = function ( val ) {
    var color = val;
    var a = color >> 24 & 255; // 255
    var r = color >> 16 & 255; // 255
    var g = color >> 8 & 255; // 122
    var b = color >> 0 & 255;

    return ({r:r,g:g,b:b,a:a});
  };

  GAME.UTILS.PackColor = function (r, g, b, a) {
    var color = a << 24 | r << 16 | g << 8 | b << 0;

    return (color);
  };

  GAME.UTILS.DrawCanvas = function (el, node, type, color) {
    if (!type || (type !== 'img' && type !== 'canvas')) {
      type = 'canvas';
    }

    if (!color) {
      color = 'darkgreen';
    }

    var cont = document.createElement ('div');
    var ee;

    if (type === 'canvas') {
      ee = el;
    } else {
      ee = new Image ();
      ee.src = el.toDataURL ('image/png', 0.8);
    }

    if (node) {
      ee.title = node.id;

      var ttl = document.createElement('span');
      ttl.innerHTML = node.id;
      ttl.style.cssText = 'display:block;text-align:center';
      cont.appendChild ( ttl );
    }

    ee.style.margin = '6px';
    cont.style.border = '1px solid ' + color;
    cont.style.margin = '8px';
    cont.style.padding = '4px';
    cont.style.textAlign = 'center';
    cont.style.display = 'inline-block';
    cont.style.position = 'relative';

    cont.appendChild ( ee );
    document.body.appendChild( cont );
  };

  GAME.UTILS._filterGameObjects = function (objects) {
    for (var k in objects)
    {
      var curr = objects[k];

      if (!curr.extends) continue;

      var clone = objects[curr.extends];

      for (var j in clone)
      {
        if (!curr.hasOwnProperty (j)) {
          curr[j] = clone[j];
        }
      }

      curr.extends = null;
    }
  };


  GAME.UTILS.LoadLevel2 = function ( lvl, val, trans ) {
      GAME.ACTIONS.DialogCover (1);

      var lvl_load = function () {
          var callback = null;

          if (val) {
            (function(val) {
              callback = function() {
                GAME.LEVEL.CONF && GAME.LEVEL.CONF(val);
              };
            })(val);
          }

          GAME.UTILS.LoadScript ( '3d/js/level-' + lvl + '.js', callback );
      };

      if (!trans) trans = 300;

      setTimeout(function() {
        lvl_load ( lvl, val );
      }, trans);
  };

  GAME.UTILS.LoadLevel = function ( lvl, val ) {
      // check to see if level exists
      GAME.ACTIONS.ResetControls ();

      var callback = null;

      if (val) {
        (function(val) {
          callback = function() {
            GAME.LEVEL.CONF && GAME.LEVEL.CONF(val);
          };
        })(val);
      }

      GAME.UTILS.LoadScript ( '3d/js/level-' + lvl + '.js', callback );
  };


  var agent = navigator.userAgent;
  var browser = '';
  var mob = (/Mobi/.test(agent)) ? true : false;

  GAME.UTILS.Mobile = mob;

  d.body.className = mob ? 'mob' : 'dsk';

  if ( (window.chrome && window.chrome.webstore) || agent.indexOf('Chrome/') > 0 ) {
      browser = 'chrome';
  }
  else if ( (window.opr && opr.addons) || window.opera || agent.indexOf(' OPR/') > 0 ) {
      browser = 'opera';
  }
  else if (window.ApplePayError || /constructor/i.test(window.HTMLElement) || (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
  })(!window['safari'] || safari.pushNotification)) {
      browser = 'safari';
  }
  else if (typeof InstallTrigger !== 'undefined') {
      browser = 'firefox';
  }
  else if (false || document.documentMode) {
      browser = 'ie';
  }
  else if (window.StyleMedia) {
      browser = 'edge';
  }
  else if (agent.indexOf('UCBrowser/') > 0) {
      browser = 'uc';
  }
  GAME.UTILS.Browser = browser;


})( window, document, GAME );