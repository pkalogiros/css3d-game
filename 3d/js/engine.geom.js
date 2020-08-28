(function ( w, d, GAME ) {
  'use strict';

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

  if (!GAME.GEOM) GAME.GEOM = {};


  var _mat_identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  function _GetIdentity () {
    return (_mat_identity);
  }

  function _GetNodeMatrix ( node ) {
    if (node.matrix) return (node.matrix);

    return (_GetMatrixCSS (node.el.style.transform).slice ());
  }


  function _MakeTriangleTrans ( point_1, point_2, point_3 ) {
    if (!point_2 && !point_3)
    {
      point_2 = point_1[ 1 ];
      point_3 = point_1[ 2 ];
      point_1 = point_1[ 0 ];
    }

    var width = point_2.subtract ( point_1 ).length ();

    var d = point_2.subtract ( point_1 ).divide ( DistanceVector ( point_2, point_1 ) );
    var v = point_3.subtract ( point_1 );
    var t = v.dot ( d );
    var P = d.multiply ( t ).add ( point_1 );

    var height = DistanceVector ( P, point_3 );

    if (width < 2 || height < 2 ) return (null);

    var dist_from_1 = ( Math.sqrt ( Math.pow (DistanceVector ( point_3, point_1 ), 2 ) - Math.pow( height, 2 ) ) );

    var orig_1 = new Vector ( 0,           height, 0 );
    var orig_2 = new Vector ( width,       height, 0 );
    var orig_3 = new Vector ( dist_from_1, 0,      0 );


    var xx = orig_2.subtract ( orig_1 );
    xx = xx.unit ();

    var yy = orig_3.subtract ( orig_1 );
    var zz = xx.cross ( yy );
    zz = zz.unit ();
    yy = zz.cross ( xx );
    yy = yy.unit ();

    var m0 = _GetIdentity ().slice ();
    var m1 = _GetIdentity ().slice ();

    m0[ 3 ] = 0.0;
    m0[ 0 + 0 ] = xx.x;
    m0[ 0 + 1 ] = xx.y;
    m0[ 0 + 2 ] = xx.z;

    m0[ 7 ] = 0.0;
    m0[ 4 + 0 ] = yy.x;
    m0[ 4 + 1 ] = yy.y;
    m0[ 4 + 2 ] = yy.z;

    m0[ 11 ] = 0.0;
    m0[ 8 + 0 ] = zz.x;
    m0[ 8 + 1 ] = zz.y;
    m0[ 8 + 2 ] = zz.z;

    m0[ 15 ] = 1.0;
    m0[ 12 + 0 ] = 0;
    m0[ 12 + 1 ] = 0;
    m0[ 12 + 2 ] = 0;

    
    xx = point_2.subtract ( point_1 );
    xx = xx.unit ();
    yy = point_3.subtract ( point_1 );
    zz = xx.cross ( yy );
    zz = zz.unit();
    yy = zz.cross ( xx );
    yy = yy.unit ();

    m1[ 3 ] = 0.0;
    m1[ 0 + 0 ] = xx.x;
    m1[ 0 + 1 ] = xx.y;
    m1[ 0 + 2 ] = xx.z;

    m1[ 7 ] = 0.0;
    m1[ 4 + 0 ] = yy.x;
    m1[ 4 + 1 ] = yy.y;
    m1[ 4 + 2 ] = yy.z;


    m1[ 11 ] = 0.0;
    m1[ 8 + 0 ] = zz.x;
    m1[ 8 + 1 ] = zz.y;
    m1[ 8 + 2 ] = zz.z;

    m1[ 15 ] = 1.0;
    m1[ 12 + 0 ] = 0; // point_1.x;
    m1[ 12 + 1 ] = 0; // point_1.y;
    m1[ 12 + 2 ] = 0; // point_1.z;


    var m = GetInverse ( m0 );
    m = MultiplyMatrices ( m, m1 );


    // ####
    //m[6] *= -1;
    m[ 8 ] *= -1;
    m[ 9 ] *= -1;

    m[ 1 ] *= -1;
    m[ 2 ] *= -1;
    m[ 4 ] *= -1;

    // console.log( '--------- ');
    // console.log( 'mat ', m );
    // console.log( '--------- ');

    var f1 = orig_1.clone ();
    f1.x -= width/2; f1.y -= height/2;
    f1.applyMatrix4 ( m );
    f1.x += width/2; f1.y += height/2;

    var f2 = orig_2.clone ();
    f2.x -= width/2; f2.y -= height/2;
    f2.applyMatrix4 ( m );
    f2.x += width/2; f2.y += height/2;

    var f3 = orig_3.clone ();
    f3.x -= width/2; f3.y -= height/2;
    f3.applyMatrix4 ( m );
    f3.x += width/2; f3.y += height/2;

    // console.log( 'A-new ', f1 );
    // console.log( 'B-new ', f2 );
    // console.log( 'C-new ', f3 );

    m[ 12 ] = point_1.x - f1.x;
    m[ 13 ] = point_1.y - f1.y;
    m[ 14 ] = point_1.z - f1.z;


    f1 = orig_1.clone ();
    f1.x -= width/2; f1.y -= height/2;
    f1.applyMatrix4 ( m );
    f1.x += width/2; f1.y += height/2;

    f2 = orig_2.clone ();
    f2.x -= width/2; f2.y -= height/2;
    f2.applyMatrix4 ( m );
    f2.x += width/2; f2.y += height/2;

    f3 = orig_3.clone ();
    f3.x -= width/2; f3.y -= height/2;
    f3.applyMatrix4 ( m );
    f3.x += width/2; f3.y += height/2;

    // console.log( 'A-new ', f1 );
    // console.log( 'B-new ', f2 );
    // console.log( 'C-new ', f3 );

    var eps = 0.001;
    if (f1.x - point_1.x > eps || f1.y - point_1.y > eps || f1.z - point_1.z > eps)
    {
      return _MakeTriangleTrans ( point_2, point_3, point_1 );
    }

    if (f2.x - point_2.x > eps || f2.y - point_2.y > eps || f2.z - point_2.z > eps)
    {
      return _MakeTriangleTrans ( point_2, point_3, point_1 );
    }

    if (f3.x - point_3.x > eps || f3.y - point_3.y > eps || f3.z - point_3.z > eps)
    {
      return _MakeTriangleTrans ( point_2, point_3, point_1 );
    }

    return ([width, height, m, orig_1, orig_2, orig_3]);
  };


  function _GetVertices (width, height, trans, parent_matrix, tri_verts, origin) {
        var vertices = [
          new Vector( 0,      height, 0 ),
          new Vector( width,  height, 0 ),
          new Vector( width,  0,      0 ),
          new Vector( 0,      0,      0 )
        ];
        var matrix_css, matrix,
            origin_x, origin_y;

        if (tri_verts)
        {
          vertices = [
            new Vector( tri_verts[0].x, tri_verts[0].y, 0.0),
            new Vector( tri_verts[1].x, tri_verts[1].y, 0.0),
            new Vector( tri_verts[2].x, tri_verts[2].y, 0.0),
            new Vector( tri_verts[2].x, tri_verts[2].y, 0.0)
          ];
        }

        if (typeof trans === 'string')
          matrix = _GetMatrixCSS( trans ).slice ();
        else
          matrix = trans;

        if (origin)
        {
          origin_x = width * origin.left;
          origin_y = height * origin.top;
        }
        else
        {
          origin_x = width / 2;
          origin_y = height / 2;
        }

        for (var i = 0; i < vertices.length; ++i)
        {
          var curr = vertices[i];

          curr.x -= origin_x;
          curr.y -= origin_y;

          curr.applyMatrix4( matrix );

          curr.x += origin_x;
          curr.y += origin_y;

          parent_matrix && curr.applyMatrix4 ( parent_matrix );

          curr.x = curr.x.toFixed(2)/1;
          curr.y = curr.y.toFixed(2)/1;
          curr.z = curr.z.toFixed(2)/1;
        }

        return (vertices);
  }

  GAME.GEOM.MAKE = {

    'triangle' : function ( node, node_type, shape ) {

        var ret = []; var trans = '';
        var point_1 = shape.shape_args[0];
        var point_2 = shape.shape_args[1];
        var point_3 = shape.shape_args[2];

        var matrix_css, matrix, matrix_shape_css, matrix_shape,
            matrix_temp_css, matrix_temp;

        var parent_el = node.el;

        // get parent matrix
        trans = node.el.style.transform; // change this :( todo
        var matrix_css = new MatrixCSSClass( trans );
        var parent_matrix = [ matrix_css.m11, matrix_css.m12, matrix_css.m13, matrix_css.m14,
                              matrix_css.m21, matrix_css.m22, matrix_css.m23, matrix_css.m24,
                              matrix_css.m31, matrix_css.m32, matrix_css.m33, matrix_css.m34,
                              matrix_css.m41, matrix_css.m42, matrix_css.m43, matrix_css.m44];

        if (shape.transform)
        {
          matrix_shape_css = new MatrixCSSClass( shape.transform );
          matrix_shape  = [ matrix_shape_css.m11, matrix_shape_css.m12, matrix_shape_css.m13, matrix_shape_css.m14,
                            matrix_shape_css.m21, matrix_shape_css.m22, matrix_shape_css.m23, matrix_shape_css.m24,
                            matrix_shape_css.m31, matrix_shape_css.m32, matrix_shape_css.m33, matrix_shape_css.m34,
                            matrix_shape_css.m41, matrix_shape_css.m42, matrix_shape_css.m43, matrix_shape_css.m44];

          // console.log( parent_matrix );
          parent_matrix = MultiplyMatrices( parent_matrix, matrix_shape );
          // console.log( parent_matrix );

          var temp_el = d.createElement('div');
          temp_el.className = 'obj';
          temp_el.style.transform = shape.transform;

          node.el.appendChild( temp_el );
          parent_el = temp_el;
          shape.transform = null;
        }

        var width = (point_2.x - point_1.x);
        var height = (point_1.y - point_3.y);

        // -------------
        // trans = 'translate3d(' + (-width/2) + 'px,' + (-height/2) + 'px, 0px) rotateX(90deg) translate3d(0,0,' + (length/2) + 'px)';
        trans = 'translate3d(' + (-width/2) + 'px,' + (-height/2) + 'px, 0px)';

        matrix_temp_css = new MatrixCSSClass( trans );
        matrix_temp  = [ matrix_temp_css.m11, matrix_temp_css.m12, matrix_temp_css.m13, matrix_temp_css.m14,
                         matrix_temp_css.m21, matrix_temp_css.m22, matrix_temp_css.m23, matrix_temp_css.m24,
                         matrix_temp_css.m31, matrix_temp_css.m32, matrix_temp_css.m33, matrix_temp_css.m34,
                         matrix_temp_css.m41, matrix_temp_css.m42, matrix_temp_css.m43, matrix_temp_css.m44];

        trans = 'matrix3d(' + matrix_temp.join(', ') + ')';

        var inner = d.createElement('div');
        inner.className = 'obj ' + shape.clss;
        inner.style.transform = trans;


        inner.style.width  = width + 'px';
        inner.style.height = height + 'px';


        var canvas= document.createElement ('canvas');
        canvas.width = width;canvas.height = height;
        var ctx = canvas.getContext('2d', {alpha:1});
        ctx.fillStyle = '#f00';

        ctx.beginPath();
        ctx.moveTo ( point_1.x, point_1.y);
        ctx.lineTo ( point_2.x, point_2.y);
        ctx.lineTo ( point_3.x, point_3.y );
        ctx.lineTo ( point_1.x, point_1.y );
        ctx.closePath();
        ctx.fill();

        parent_el.appendChild ( inner );

        var geom = {
            _parent : node,
            parent_matrix:parent_matrix,
            id : node_type.id + '_' + shape.clss + '_triang',
            el : inner,
            width: width,
            height: height,
            cast_shadow: false,
            no_shadow: true,
            walk: node_type.walk,
            //complexNormals:1,
              alpha_mask: canvas,
              alpha:1,
            transform: trans,
            vertices : _GetVertices (width, height, matrix_temp, parent_matrix)
        };

        return ([geom]);
    },











    'face_obj' : function ( node, node_type, shape ) {
        var lines = shape.shape_args[ 0 ];
        var ret = [];

        var vv = [new Vector(0,0,0)];
        var ff = [];

        var parent_matrix = _GetNodeMatrix ( node );
        var parent_el = node.el;

        parent_el.style.transformStyle = 'preserve-3d';

        for (var i = 0; i < lines.length; ++i)
        {
            var curr = lines[i].split(' ');

            if (curr[0] === 'v')
            {
              // vv.push ( new Vector( (curr[1]*1000), (curr[2]*-1000), (curr[3]*1000) ) ); // ####
              vv.push ( new Vector( (curr[1]*10), (curr[2]*-10), (curr[3]*10) ) );
            }
            else if (curr[0] === 'f')
            {
              // "946", "779", "920"
              ff.push ([
                vv[curr[1]/1], vv[curr[2]/1], vv[curr[3]/1]
              ]);
            }
        }

        for (var i = 0; i < ff.length; ++i)
        {
            var curr = ff[i];

            var data = _MakeTriangleTrans ( curr[0], curr[1], curr[2] );
            if (!data) continue;

            var width  = data[ 0 ];
            var height = data[ 1 ];
            var m      = data[ 2 ];

            var orig_1 = data[ 3 ];
            var orig_2 = data[ 4 ];
            var orig_3 = data[ 5 ];

            // ####
            var el = document.createElement('div');
            el.className = 'obj face ' + shape.clss;
            el.style.width  = width + 'px';
            el.style.height = height + 'px';
            el.style.background = 'red';

            var custom_trans = 'matrix3d(' + m.join(', ') + ')';
            el.style.transform = custom_trans;

            var canvas= document.createElement ('canvas');
            canvas.width = width;canvas.height = height;
            var ctx = canvas.getContext('2d', {alpha:1});
            ctx.fillStyle = '#f00';
            ctx.strokeStyle = "#f00";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo ( orig_1.x, orig_1.y);
            ctx.lineTo ( orig_2.x, orig_2.y);
            ctx.lineTo ( orig_3.x, orig_3.y );
            ctx.lineTo ( orig_1.x, orig_1.y );
            ctx.closePath();

            ctx.stroke();
            ctx.fill();

            parent_el.appendChild ( el );



            // #### HACK FOR RENDERING DIV TRIANGLES
            /*
                        // add the inner triangle her
                        var innerface = document.createElement('div');
                        parent_el.appendChild( innerface );
                        innerface.className = 'obj innerface';
                        innerface.style.cssText = 'width:100%;height:100%;background:blue;';









                            function adj(m) { // Compute the adjugate of m
                              return [
                                m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4],
                                m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5],
                                m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]
                              ];
                            }
                            function multmm(a, b) { // multiply two matrices
                              var c = Array(9);
                              for (var i = 0; i != 3; ++i) {
                                for (var j = 0; j != 3; ++j) {
                                  var cij = 0;
                                  for (var k = 0; k != 3; ++k) {
                                    cij += a[3*i + k]*b[3*k + j];
                                  }
                                  c[3*i + j] = cij;
                                }
                              }
                              return c;
                            }
                            function multmv(m, v) { // multiply matrix and vector
                              return [
                                m[0]*v[0] + m[1]*v[1] + m[2]*v[2],
                                m[3]*v[0] + m[4]*v[1] + m[5]*v[2],
                                m[6]*v[0] + m[7]*v[1] + m[8]*v[2]
                              ];
                            }
                            function pdbg(m, v) {
                              var r = multmv(m, v);
                              return r + " (" + r[0]/r[2] + ", " + r[1]/r[2] + ")";
                            }
                            function basisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
                              var m = [
                                x1, x2, x3,
                                y1, y2, y3,
                                 1,  1,  1
                              ];
                              var v = multmv(adj(m), [x4, y4, 1]);
                              return multmm(m, [
                                v[0], 0, 0,
                                0, v[1], 0,
                                0, 0, v[2]
                              ]);
                            }
                            function general2DProjection(
                              x1s, y1s, x1d, y1d,
                              x2s, y2s, x2d, y2d,
                              x3s, y3s, x3d, y3d,
                              x4s, y4s, x4d, y4d
                            ) {
                              var s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s);
                              var d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d);
                              return multmm(d, adj(s));
                            }
                            function project(m, x, y) {
                              var v = multmv(m, [x, y, 1]);
                              return [v[0]/v[2], v[1]/v[2]];
                            }
                            function transform2d(w, h, x1, y1, x2, y2, x3, y3, x4, y4) {
                              
                              var t = general2DProjection
                                (0, 0, x1, y1, w, 0, x2, y2, 0, h, x3, y3, w, h, x4, y4);
                              for(var i = 0; i != 9; ++i) t[i] = t[i]/t[8];
                              t = [t[0], t[3], 0, t[6],
                                   t[1], t[4], 0, t[7],
                                   0   , 0   , 1, 0   ,
                                   t[2], t[5], 0, t[8]];

                              return (t);
                            }

                            var corners = [orig_1.x, orig_1.y,    orig_3.x, orig_3.y,    orig_3.x, orig_1.y * 2,    orig_2.x, orig_2.y];



                            //corners = [100, 100, 300, 100, 100, 300, 300, 300];
                             var ttt = transform2d(width, height, corners[0], corners[1], corners[2], corners[3],
                                               corners[4], corners[5], corners[6], corners[7]);                            
                             console.log( "GOOOO ", ttt, orig_1 );


//                              var f1 = new Vector(0,0,0);
//                              f1.x -= 20; f1.y -= 20;
//                              f1.applyMatrix4( ttt );
//                              f1.x += 20; f1.y += 20;
  //                            ttt[ 12 ] += 0 - f1.x;
    //                          ttt[ 13 ] += 0 - f1.y;



                        var custom_trans = 'matrix3d(' + ttt.join(', ') + ')';
                        innerface.style.transform = custom_trans;
                        innerface.style.transformOrigin = '0 0';
            */
            // #### HACK FOR RENDERING DIV TRIANGLES










            var verts = [orig_1, orig_2, orig_3];

            var geom = {
                _parent : node,
                parent_matrix:parent_matrix,
                id : node_type.id + '_' + shape.clss + '_triang',
                el : el,
                tri : 1,
                width: width,
                height: height,
                tri_verts : verts,
                cast_shadow: false,
                no_shadow: true,
                walk: node_type.walk,

                //complexNormals:1,
                alpha_mask: canvas,
                alpha:1,
                transform: custom_trans,
                matrix: m,
                vertices : _GetVertices (width, height, m, parent_matrix, verts)
            };
            ret.push (geom);
        }
        // -

        return (ret);
    },




    'face_quad' : function ( node, node_type, shape ) {

        var ret = []; var trans = '';

        var matrix_shape, parent_matrix, matrix;
        var parent_el = node.el;
        var origin_val = {top:0.5, left:0.5};

        var width  = shape.shape_args[ 0 ];
        var height = shape.shape_args[ 1 ];
        var absolute = !!shape.shape_args[ 2 ];
        var pos = shape.shape_args[ 3 ] || new Vector ();
        var origin = shape.shape_args[ 4 ] || 'middle';
        var transform = shape.shape_args[ 5 ] || '';

        parent_matrix = _GetNodeMatrix (node);
        if (shape.transform)
        {
          matrix_shape  = _GetMatrixCSS ( shape.transform ).slice ();
          parent_matrix = MultiplyMatrices ( parent_matrix, matrix_shape );

          var temp_el = d.createElement('div');
          temp_el.className = 'obj';
          temp_el.style.transform = shape.transform;

          node.el.appendChild( temp_el );
          parent_el = temp_el;
          shape.transform = null;
        }

        if (absolute && parent_matrix) {
          pos.applyMatrix4 ( GetInverse (parent_matrix) );
        }

        switch (origin) {
            case 'bottom-left':
              origin = '0% 100%';
              origin_val = {left:0, top:1};
            break;
            case 'bottom-right':
              origin = '100% 100%';
              origin_val = {left:1, top:1};
            break;
            case 'top-left':
              origin = '0% 0%';
              origin_val = {left:0, top:0};
            break;
            case 'top-right':
              origin = '100% 0%';
              origin_val = {left:1, top:0};
            break;
            case 'middle':
              origin = '50% 50%';
              origin_val = {left:0.5, top:0.5};
            break;
        }

        var el = d.createElement( node.tag || 'div');
        el.className = 'obj ' + shape.clss;
        el.style.width  = width + 'px';
        el.style.height = height + 'px';

        el.style.transformOrigin = origin;

        if (pos) {
          trans = 'translate3d(' + (pos.x - (width * origin_val.left)) + 'px,' + (pos.y - (height * origin_val.top)) + 'px,' + pos.z + 'px)';
        }

        trans += transform;
        el.style.transform = trans;

        matrix = _GetMatrixCSS (trans).slice ();

        parent_el.appendChild ( el );

        var geom = {
            _parent : node,
            parent_matrix:parent_matrix,
            id : node_type.id + '_' + shape.clss + '_quad',
            el : el,
            width: width,
            height: height,
            cast_shadow: true,
            // no_shadow: true,
            walk: node_type.walk,
            //complexNormals:1,
            transform: trans,
            matrix: matrix,
            vertices : _GetVertices (width, height, matrix, parent_matrix, null, origin_val)
        };

        return ([geom]);
    },


    'face' : function ( node, node_type, shape ) {
        var ret = []; var trans = '';

        var parent_matrix = _GetNodeMatrix ( node );
        var parent_el = node.el;


        var data = _MakeTriangleTrans ( shape.shape_args[0], shape.shape_args[1], shape.shape_args[2] );
        if (!data) return ([]);

        var width  = data[ 0 ];
        var height = data[ 1 ];
        var m      = data[ 2 ];

        var orig_1 = data[ 3 ];
        var orig_2 = data[ 4 ];
        var orig_3 = data[ 5 ];


        // ####
        var el = document.createElement('div');
        el.className = 'obj ' + shape.clss;
        el.style.width  = width + 'px';
        el.style.height = height + 'px';
        el.style.background = 'red';

        var custom_trans = 'matrix3d(' + m.join(', ') + ')';
        el.style.transform = custom_trans;

        var canvas= document.createElement ('canvas');
        canvas.width = width;canvas.height = height;
        var ctx = canvas.getContext('2d', {alpha:1});
        ctx.fillStyle = '#f00';
        ctx.strokeStyle = "#f00";

        ctx.beginPath();
        ctx.moveTo ( orig_1.x, orig_1.y);
        ctx.lineTo ( orig_2.x, orig_2.y);
        ctx.lineTo ( orig_3.x, orig_3.y );
        ctx.lineTo ( orig_1.x, orig_1.y );
        ctx.closePath();

        
        ctx.stroke();
        ctx.fill();

        parent_el.appendChild ( el );

        var verts = [orig_1, orig_2, orig_3];

        var geom = {
            _parent : node,
            parent_matrix:parent_matrix,
            id : node_type.id + '_' + shape.clss + '_triang',
            el : el,
            tri : 1,
            width: width,
            height: height,
            tri_verts : verts,
            cast_shadow: false,
            no_shadow: true,
            walk: node_type.walk,

            //complexNormals:1,
            alpha_mask: canvas,
            alpha:1,
            transform: custom_trans,
            matrix: m,
            vertices : _GetVertices (width, height, m, parent_matrix, verts)
        };

        return ([geom]);
    },



    ///////////////////////////////////////////////////////
    // CONE PYRAMID
    'cone' : function ( node, node_type, shape ) {
        var ret = []; var trans = '';
        var parent_matrix, matrix_shape;

        var parent_el = node.el;

        var point_top  = new Vector ();
        var diameter   = shape.shape_args[ 0 ] || 0;
        var height     = shape.shape_args[ 1 ] || 0;
        var faces_num  = shape.shape_args[ 2 ] || 0;
        var has_bottom = shape.shape_args[ 3 ] || 0;
        var half_diam  = diameter / 2;

        if (shape.shape_args[ 4 ])
        {
            // todo ####
            switch (shape.shape_args[ 4 ]) {
                case 'bottom-left':
                  point_top.x = 0.0;
                  point_top.z = 0.0;
                break;
                case 'bottom-right':
                  point_top.x = 0.0;
                  point_top.z = 0.0;
                break;
                case 'top-left':
                  point_top.x = 0.0;
                  point_top.z = 0.0;
                break;
                case 'top-right':
                  point_top.x = 0.0;
                  point_top.z = 0.0;
                break;
                default:
                  point_top.x = 0.0;
                  point_top.z = 0.0;
                break;
            }
        }
        else
        {
          point_top.x = 0.0;
          point_top.z = 0.0;
        }

        point_top.y = -height; // ####

        parent_matrix = _GetNodeMatrix (node);
        if (shape.transform)
        {
          matrix_shape  = _GetMatrixCSS ( shape.transform ).slice ();
          parent_matrix = MultiplyMatrices ( parent_matrix, matrix_shape );

          var temp_el = d.createElement('div');
          temp_el.className = 'obj';
          temp_el.style.transform = shape.transform;

          node.el.appendChild( temp_el );
          parent_el = temp_el;
          shape.transform = null;
        }

        var x = half_diam * Math.cos ( 0.0 );
        var y = 0.0;
        var z = half_diam * Math.sin ( 0.0 );

        var point_prev = new Vector ( x, y, z );
        var point_prev_first = point_prev.clone ();
        var tmp;

        for ( var i = 1; i < faces_num; ++i )
        {
            x = half_diam * Math.cos ( 2.0 * Math.PI * i / faces_num );
            z = half_diam * Math.sin ( 2.0 * Math.PI * i / faces_num );

            tmp = point_prev.clone ();
            point_prev = new Vector ( x, y, z );

            // -------
            var triangle = [
              point_prev.clone (),
              tmp.clone (),
              point_top.clone ()
            ];

            var data = _MakeTriangleTrans ( triangle );
            var width  = data[ 0 ];
            var height = data[ 1 ];
            var mat    = data[ 2 ];

            var orig_1 = data[ 3 ];
            var orig_2 = data[ 4 ];
            var orig_3 = data[ 5 ];

            // console.log( "triangle ", i );
            // console.log( 'x', triangle[1].x, 'y', triangle[1].y,  'z', triangle[1].z  );
            // console.log( 'x', triangle[2].x, 'y', triangle[2].y,  'z', triangle[2].z  );
            // console.log( 'diameter', diameter, 'width', width, 'height', height  );
            // console.log( ' ------- ' );

                    // make face with these points
                    // ####
                    var el = document.createElement('div');
                    el.className = 'obj ' + shape.clss + " midcone_" + i;
                    el.style.width  = width + 'px';
                    el.style.height = height + 'px';
                    el.style.background = 'red';

                    var custom_trans = 'matrix3d(' + mat.join(', ') + ')';
                    el.style.transform = custom_trans;

                    var canvas= document.createElement ('canvas');
                    canvas.width = width;canvas.height = height;
                    var ctx = canvas.getContext('2d', {alpha:1});

                    var rc = GAME.UTILS.RandomColor ();
                    ctx.fillStyle = rc;
                    ctx.strokeStyle = rc;

                    ctx.beginPath();
                    ctx.moveTo ( orig_1.x, orig_1.y);
                    ctx.lineTo ( orig_2.x, orig_2.y);
                    ctx.lineTo ( orig_3.x, orig_3.y );
                    ctx.lineTo ( orig_1.x, orig_1.y );
                    ctx.closePath();

                    
                    ctx.stroke();
                    ctx.fill();

                    parent_el.appendChild ( el );

                    var verts = [
                      orig_1, orig_2, orig_3
                    ];

                    ret.push ({
                                                    _parent : node,
                                                    parent_matrix:parent_matrix,
                                                    id : node_type.id + '_' + shape.clss + '_triang_' + i,
                                                    el : el,
                                                    tri : 1,
                                                    tri_verts : verts,
                                                    width: width,
                                                    height: height,
                                                    cast_shadow: true,
                                                    complexNormals:1,
                                                    //no_shadow: true,
                                                    walk: node_type.walk,
                                                    alpha_mask: canvas,
                                                    alpha:1,
                                                    transform: custom_trans,
                                                    matrix: mat,
                                                    vertices : _GetVertices (width, height, mat, parent_matrix, verts)
                    });
        }





                                                // making closing point
                                                var triangle = [
                                                  point_prev_first,
                                                  point_prev.clone (),
                                                  point_top.clone ()
                                                ];

                                                // console.log( "triangle ", i );
                                                // console.log( 'x', triangle[1].x, 'y', triangle[1].y,  'z', triangle[1].z  );
                                                // console.log( 'x', triangle[2].x, 'y', triangle[2].y,  'z', triangle[2].z  );
                                                // console.log( ' ------- '  );

                                                var data = _MakeTriangleTrans ( triangle );
                                                var width = data[ 0 ];
                                                var height = data[ 1 ];
                                                var mat = data[ 2 ];

                                                var orig_1 = data[ 3 ];
                                                var orig_2 = data[ 4 ];
                                                var orig_3 = data[ 5 ];
                                                var verts = [
                                                  orig_1, orig_2, orig_3
                                                ];

                                                // make face with these points
                                                // ####
                                                var el = document.createElement('div');
                                                el.className = 'obj ' + shape.clss + " endcone";
                                                el.style.width  = width + 'px';
                                                el.style.height = height + 'px';
                                                el.style.background = 'red';

                                                var custom_trans = 'matrix3d(' + mat.join(', ') + ')';
                                                el.style.transform = custom_trans;

                                                var canvas= document.createElement ('canvas');
                                                canvas.width = width;canvas.height = height;
                                                var ctx = canvas.getContext('2d', {alpha:1});

                                                var rc = GAME.UTILS.RandomColor ();
                                                ctx.fillStyle = rc;
                                                ctx.strokeStyle = rc;

                                                ctx.beginPath();
                                                ctx.moveTo ( orig_1.x, orig_1.y);
                                                ctx.lineTo ( orig_2.x, orig_2.y);
                                                ctx.lineTo ( orig_3.x, orig_3.y );
                                                ctx.lineTo ( orig_1.x, orig_1.y );
                                                ctx.closePath();


                                                ctx.stroke();
                                                ctx.fill();

                                                parent_el.appendChild ( el );

                                                ret.push ({
                                                    _parent : node,
                                                    parent_matrix:parent_matrix,
                                                    id : node_type.id + '_' + shape.clss + '_triang_0',
                                                    el : el,
                                                    tri : 1,
                                                    tri_verts : verts,
                                                    width: width,
                                                    height: height,
                                                    cast_shadow: true,
                                                    complexNormals:1,
                                                    //no_shadow: true,
                                                    walk: node_type.walk,
                                                    alpha_mask: canvas,
                                                    alpha:1,
                                                    transform: custom_trans,
                                                    matrix: mat,
                                                    vertices : _GetVertices (width, height, mat, parent_matrix, verts)
                                                });





        if (has_bottom)
        {
                var poly = [];
                for ( var i = 0; i < faces_num; ++i )
                {
                    var x = half_diam + (half_diam * Math.cos ( 2.0 * Math.PI * i / faces_num ) );
                    var y = half_diam + (half_diam * Math.sin ( 2.0 * Math.PI * i / faces_num ) );

                    var point = {};
                    point.x = x.toFixed(2)/1;
                    point.y = y.toFixed(2)/1;

                    poly.push ( point );
                }

                var r = 65;
                var canvas= document.createElement ('canvas');
                canvas.width = r;canvas.height = r;
                var ctx = canvas.getContext('2d', {alpha:1});
                ctx.fillStyle = '#f00';

                ctx.beginPath();
                ctx.moveTo(poly[0].x, poly[0].y);

                for(var item=1 ; item < poly.length; ++item ){ctx.lineTo( poly[item].x, poly[item].y );}

                ctx.lineTo(poly[0].x, poly[0].y);
                ctx.closePath();
                ctx.fill();

                var face = d.createElement ('div');
                face.className = "obj " + 'cone cone_bottom';

                trans = "translate3d(" + (0 - ((diameter+2) / 2)).toFixed(2) + "px," + (-height/2 - ((diameter+2) / 4)).toFixed(2) + "px," + 0 + "px) " +
                "rotateX(" + (-Math.PI / 2).toFixed(3) + "rad) rotateY(" + 0 + "rad) rotateY(" + 0 + "rad)";
                face.style.width = diameter + 'px';
                face.style.height = diameter + 'px';
                face.style.transform = trans;


                parent_el.appendChild( face );
                var matrix_temp2 = _GetMatrixCSS ( trans ).slice ();

                var geom = {
                    _parent : node,
                    parent_matrix:parent_matrix,
                    id : node_type.id + '_' + shape.clss + '_top',
                    el : face,
                    width: diameter,
                    height: diameter,
                    cast_shadow: false,
                    no_shadow: true,
                    walk: node_type.walk,
                    complexNormals:false,
                    matrix: matrix_temp2,
                    alpha_mask: canvas,
                    alpha:1,
                    transform: trans,
                    vertices : _GetVertices ( diameter, diameter, matrix_temp2, parent_matrix)
                };
                ret.push ( geom );
        }

        return (ret);
    },



    ///////////////////////////////////////////////////////
    // TUBE CYLINDER
    'tube' : function ( node, node_type, shape ) {
        var ret = []; var trans = '';
        var matrix, matrix_shape, matrix_temp, matrix_temp2, parent_matrix;
        var side_angle, side_len;

        var parent_el = node.el;

        var diameter  = shape.shape_args[ 0 ] || 0;
        var height    = shape.shape_args[ 1 ] || 0;
        var faces_num = shape.shape_args[ 2 ] || 0;

        var has_top    = shape.shape_args[ 3 ] || 0;
        var has_bottom = shape.shape_args[ 4 ] || 0;


        // generates face/geom
        var _make_face = function (w, h, x, y, z, rx, ry, rz, tsrc, tx, ty, index) {
            var trans = "translate3d(" + (x - (w / 2)).toFixed(2) + "px," + (y - (h / 2)).toFixed(2) + "px," + z.toFixed(2) + "px) " +
                "rotateX(" + rx.toFixed(3) + "rad) rotateY(" + ry.toFixed(3) + "rad) rotateY(" + rz.toFixed(3) + "rad)";

            var face = d.createElement ('div');
            face.className = "obj " + 'tube_' + index;
            face.style.cssText = '' + //"background:red;" + 
              //"background: url(" + tsrc + ") -" + tx.toFixed(2) + "px " + ty.toFixed(2) + "px;" +
                "width:" + w.toFixed(2) + "px;" +
                "height:" + h.toFixed(2) + "px;" +
                "transform: " + trans + ";";

            return ([face, trans]);
        };

        // -----
        parent_matrix = _GetNodeMatrix (node);
        if (shape.transform)
        {
          matrix_shape  = _GetMatrixCSS ( shape.transform ).slice ();
          parent_matrix = MultiplyMatrices ( parent_matrix, matrix_shape );

          var temp_el = d.createElement('div');
          temp_el.className = 'obj';
          temp_el.style.transform = shape.transform;

          node.el.appendChild( temp_el );
          parent_el = temp_el;
          shape.transform = null;
        }

        side_angle = (Math.PI / faces_num) * 2;
        side_len = diameter * Math.tan ( Math.PI / faces_num );

        for (var c = 0; c < faces_num; ++c)
        {
          var x  = Math.sin ( side_angle * c ) * diameter / 2;
          var z  = Math.cos ( side_angle * c ) * diameter / 2;
          var ry = Math.atan2( x, z );

          var data = _make_face (side_len + 1, height, x, 0, z, 0, ry, 0, null, side_len * c, 0, c );
          parent_el.appendChild( data[ 0 ] );
          trans = data[ 1 ];

          var ww = (side_len + 1).toFixed(2)/1;
          var hh = height.toFixed(2)/1;

          matrix_temp = _GetMatrixCSS ( trans ).slice ();

          var geom = {
              _parent : node,
              parent_matrix:parent_matrix,
              id : node_type.id + '_' + shape.clss + '_' + c,
              el : data[0],
              width: ww,
              height: hh,
              dims:shape.dims,
              cast_shadow: node.cast_shadow,
              no_shadow: node.no_shadow,
              walk: node_type.walk,
              complexNormals:1,
              matrix: matrix_temp,

              transform: trans,
              vertices : _GetVertices ((side_len + 1), height, matrix_temp, parent_matrix)
          };

          if (c !== 0)
          {
            var prev = ret[c - 1];

            geom.vertices[0] = prev.vertices[1].clone();
            geom.vertices[3] = prev.vertices[2].clone();
          }
          ret.push ( geom );
        }

        var prev = ret[ret.length - 1];
        var last = ret[0];

        last.vertices[0] = prev.vertices[1].clone();
        last.vertices[3] = prev.vertices[2].clone();

        if (has_top)
        {
          // make-top element
          var data = _make_face ( diameter + 2, diameter + 2, 0, -height/2, 0, Math.PI / 2, 0, 0, null, 0, 0, 'top' );

          var poly = [];
          var r = 65;
          var r2 = r/2;
          for (var c = 0; c < faces_num; ++c)
          {
            var x = (Math.sin(side_angle * c) * r2) + r2;
            var z = (Math.cos(side_angle * c) * r2) + r2;
            var ry = Math.atan2(x, z);

            var point = {};
            point.x = x.toFixed(2)/1;
            point.y = z.toFixed(2)/1;

            poly.push ( point );
          }

          var canvas= document.createElement ('canvas');
          canvas.width = r;canvas.height = r;
          var ctx = canvas.getContext('2d', {alpha:1});
          ctx.fillStyle = '#f00';

          ctx.beginPath();
          ctx.moveTo(poly[0].x, poly[0].y);
          for(var item=1 ; item < poly.length; ++item ){ctx.lineTo( poly[item].x, poly[item].y );}

          ctx.lineTo(poly[0].x, poly[0].y);
          ctx.closePath();
          ctx.fill();

          // document.body.appendChild( canvas );

          var z_deg = ((180/faces_num)*(Math.PI/180)).toFixed(3)/1;

          data[1] += ' rotateZ(' + z_deg + 'rad)';
          data[0].style.transform = data[1];

          parent_el.appendChild( data[0] );
          matrix_temp2 = _GetMatrixCSS ( data[1] ).slice ();

          var geom = {
              _parent : node,
              parent_matrix:parent_matrix,
              id : node_type.id + '_' + shape.clss + '_top',
              el : data[0],
              width: diameter,
              height: diameter,
              cast_shadow: node.cast_shadow,
              no_shadow: node.no_shadow,
              walk: node_type.walk,
              complexNormals:false,
              matrix: matrix_temp2,
              alpha_mask: canvas,
              alpha:1,
              transform: data[1],
              vertices : _GetVertices ( diameter, diameter, matrix_temp2, parent_matrix)
          };
          ret.push ( geom );
        }

        //if (has_bottom)
        //{
          //  var data = _make_face ( diameter + 2, diameter + 2, 0, -height/2, 0, Math.PI / 2, 0, 0, null, 0, 0, 'bottom' );
        //}

        return (ret);
    },




    ///////////////////////////////////////////////////////
    // RECTANGLE CUBE
    'rectangle' : function ( node, node_type, shape ) {
        var ret = []; var trans = '';
        var matrix, matrix_shape, parent_matrix, matrix_temp;
        var parent_el = node.el;

        var width  = shape.shape_args[ 0 ] || 0;
        var height = shape.shape_args[ 1 ] || 0;
        var length = shape.shape_args[ 2 ] || 0;

        // generates side/geom
        var _make_side = function ( side, node, node_type, parent_el, width, height, clss, trans ) {
          var matrix_temp = _GetMatrixCSS ( trans ).slice ();
          trans = 'matrix3d(' + matrix_temp.join(', ') + ')';

          var el = null;
          var tag = 'div';
          if (shape.tag === 'img')
          {
            tag = 'img';
            el = d.createElement ('img');
          }
          else
          {
            el = d.createElement ('div');
          }
          el.className = 'obj ' + clss;

          el.style.width = width + 'px';
          el.style.height = height + 'px';
          el.style.transform = trans;

          parent_el.appendChild ( el );

          return ({
            _parent : node,
            parent_matrix:parent_matrix,
            id : node_type.id + '_' + clss + '_' + side,
            el : el,
            width: width,
            height: height,
            cast_shadow: true,
            walk: node_type.walk,
            matrix:matrix_temp,
            style:side,
            tag:tag,
            //complexNormals:1,

            transform: trans,
            vertices : _GetVertices (width, height, matrix_temp, parent_matrix)
          });
        };

        if (!shape.sides) shape.sides = {top:1, bottom:1, front:1, back:1, left:1, right:1};


        // -----
        parent_matrix = _GetNodeMatrix (node);
        if (shape.transform)
        {
          matrix_shape  = _GetMatrixCSS ( shape.transform ).slice ();
          parent_matrix = MultiplyMatrices ( parent_matrix, matrix_shape );

          var temp_el = d.createElement('div');
          temp_el.className = 'obj';
          temp_el.style.transform = shape.transform;

          node.el.appendChild( temp_el );
          parent_el = temp_el;
          shape.transform = null;
        }

        // top
        if (shape.sides.top)
        {
          ret.push (_make_side (
            'top', node, node_type, parent_el, width, length, shape.clss, 
            'translate3d(' + (-width/2) + 'px,' + (-height/2) + 'px, 0px) rotateX(90deg) translate3d(0,0,' + (length/2) + 'px)'));
        }

        // bottom
        if (shape.sides.bottom)
        {
          ret.push (_make_side (
            'bottom', node, node_type, parent_el, width, length, shape.clss, 
            'translate3d(' + (-width/2) + 'px,' + (-height/2) + 'px, 0px) rotateX(-90deg) translate3d(0,0,' + ((-length/2)+height) + 'px)'));
        }


        // front
        if (shape.sides.front)
        {
          ret.push (_make_side (
            'front', node, node_type, parent_el, width, height, shape.clss, 
            'translate3d(' + (-width/2) + 'px, ' + (-height/2) + 'px, ' + (length/2) + 'px)'));
        }

        // back
        if (shape.sides.back)
        {
          ret.push (_make_side (
            'back', node, node_type, parent_el, width, height, shape.clss, 
            'translate3d(' + (-width/2) + 'px, ' + (-height/2) + 'px, ' + (-length/2) + 'px) rotateY(180deg)'));
        }

        // left
        if (shape.sides.left)
        {
          ret.push (_make_side (
            'left', node, node_type, parent_el, length, height, shape.clss, 
            'translate3d(' + (-length/2) + 'px,' + (-height/2) + 'px, 0px) rotateY(90deg) translate3d(0,0,' + (width/2) + 'px)'));
        }

        // right
        if (shape.sides.right)
        {
          ret.push (_make_side (
            'right', node, node_type, parent_el, length, height, shape.clss, 
            'translate3d(' + (-length/2) + 'px,' + (-height/2) + 'px, 0px) rotateY(-90deg) translate3d(0,0,' + (width/2) + 'px)'));
        }


        return (ret);
    }
  };

})( window, document, GAME );