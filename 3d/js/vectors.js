/*
(function ( w, d ) {

  ///////////////////////////////////////////////////////
  // Vector Class
  function Vector ( x, y, z ) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  function DistanceVector( v1, v2 ) {
      var dx = v1.x - v2.x;
      var dy = v1.y - v2.y;
      var dz = v1.z - v2.z;

      return Math.sqrt ( dx * dx + dy * dy + dz * dz );
  }


  w.Vector = Vector;


})();
*/



/*
function ivect(ix, iy, w) {
    // byte array, r,g,b,a
    return((ix + w * iy) * 4);
}

function BILINEAR(srcImg, destImg, scale) {
    // c.f.: wikipedia english article on bilinear interpolation
    // taking the unit square, the inner loop looks like this
    // note: there's a function call inside the double loop to this one
    // maybe a performance killer, optimize this whole code as you need
    function inner(f00, f10, f01, f11, x, y) {
        var un_x = 1.0 - x; var un_y = 1.0 - y;
        return (f00 * un_x * un_y + f10 * x * un_y + f01 * un_x * y + f11 * x * y);
    }
    var i, j;
    var iyv, iy0, iy1, ixv, ix0, ix1;
    var idxD, idxS00, idxS10, idxS01, idxS11;
    var dx, dy;
    var r, g, b, a;

    for (i = 0; i < destImg.height; ++i) {
        iyv = i / scale;
        iy0 = Math.floor(iyv);
        // Math.ceil can go over bounds
        iy1 = ( Math.ceil(iyv) > (srcImg.height-1) ? (srcImg.height-1) : Math.ceil(iyv) );
        for (j = 0; j < destImg.width; ++j) {
            ixv = j / scale;
            ix0 = Math.floor(ixv);
            // Math.ceil can go over bounds
            ix1 = ( Math.ceil(ixv) > (srcImg.width-1) ? (srcImg.width-1) : Math.ceil(ixv) );
            idxD = ivect(j, i, destImg.width);
            // matrix to vector indices
            idxS00 = ivect(ix0, iy0, srcImg.width);
            idxS10 = ivect(ix1, iy0, srcImg.width);
            idxS01 = ivect(ix0, iy1, srcImg.width);
            idxS11 = ivect(ix1, iy1, srcImg.width);
            // overall coordinates to unit square
            dx = ixv - ix0; dy = iyv - iy0;
            // I let the r, g, b, a on purpose for debugging
            r = inner(srcImg.data[idxS00], srcImg.data[idxS10],
                srcImg.data[idxS01], srcImg.data[idxS11], dx, dy);
            destImg.data[idxD] = r;

            g = inner(srcImg.data[idxS00+1], srcImg.data[idxS10+1],
                srcImg.data[idxS01+1], srcImg.data[idxS11+1], dx, dy);
            destImg.data[idxD+1] = g;

            b = inner(srcImg.data[idxS00+2], srcImg.data[idxS10+2],
                srcImg.data[idxS01+2], srcImg.data[idxS11+2], dx, dy);
            destImg.data[idxD+2] = b;

            a = inner(srcImg.data[idxS00+3], srcImg.data[idxS10+3],
                srcImg.data[idxS01+3], srcImg.data[idxS11+3], dx, dy);
            destImg.data[idxD+3] = a;
        }
    }
}
*/

/*
(function (w, d) {

  var ASM_HEAP = new ArrayBuffer( 4096 ); // multiple of 4096 bytes

  function mat_mod(stdlib, foreign, heap) {
    "use asm";

    var m = new stdlib.Float32Array(heap);

    function multiplyUnrolled(idx_a, idx_b, idx_dest) {
      idx_a = idx_a | 0;
      idx_b = idx_b | 0;
      idx_dest = idx_dest | 0;

      var
      a00 = 0.0,
        a01 = 0.0,
        a02 = 0.0,
        a03 = 0.0,
        a10 = 0.0,
        a11 = 0.0,
        a12 = 0.0,
        a13 = 0.0,
        a20 = 0.0,
        a21 = 0.0,
        a22 = 0.0,
        a23 = 0.0,
        a30 = 0.0,
        a31 = 0.0,
        a32 = 0.0,
        a33 = 0.0;

      var
      b00 = 0.0,
        b01 = 0.0,
        b02 = 0.0,
        b03 = 0.0,
        b10 = 0.0,
        b11 = 0.0,
        b12 = 0.0,
        b13 = 0.0,
        b20 = 0.0,
        b21 = 0.0,
        b22 = 0.0,
        b23 = 0.0,
        b30 = 0.0,
        b31 = 0.0,
        b32 = 0.0,
        b33 = 0.0;

      idx_a = idx_a << 4;
      idx_b = idx_b << 4;
      idx_dest = idx_dest << 4;

      a00 = +m[(idx_a + 0)<< 2 >> 2];
      a01 = +m[(idx_a + 1)<< 2 >> 2];
      a02 = +m[(idx_a + 2)<< 2 >> 2];
      a03 = +m[(idx_a + 3)<< 2 >> 2];
      a10 = +m[(idx_a + 4)<< 2 >> 2];
      a11 = +m[(idx_a + 5)<< 2 >> 2];
      a12 = +m[(idx_a + 6)<< 2 >> 2];
      a13 = +m[(idx_a + 7)<< 2 >> 2];
      a20 = +m[(idx_a + 8)<< 2 >> 2];
      a21 = +m[(idx_a + 9)<< 2 >> 2];
      a22 = +m[(idx_a + 10)<< 2 >> 2];
      a23 = +m[(idx_a + 11)<< 2 >> 2];
      a30 = +m[(idx_a + 12)<< 2 >> 2];
      a31 = +m[(idx_a + 13)<< 2 >> 2];
      a32 = +m[(idx_a + 14)<< 2 >> 2];
      a33 = +m[(idx_a + 15)<< 2 >> 2];

      b00 = +m[(idx_b + 0)<< 2 >> 2];
      b01 = +m[(idx_b + 1)<< 2 >> 2];
      b02 = +m[(idx_b + 2)<< 2 >> 2];
      b03 = +m[(idx_b + 3)<< 2 >> 2];
      b10 = +m[(idx_b + 4)<< 2 >> 2];
      b11 = +m[(idx_b + 5)<< 2 >> 2];
      b12 = +m[(idx_b + 6)<< 2 >> 2];
      b13 = +m[(idx_b + 7)<< 2 >> 2];
      b20 = +m[(idx_b + 8)<< 2 >> 2];
      b21 = +m[(idx_b + 9)<< 2 >> 2];
      b22 = +m[(idx_b + 10)<< 2 >> 2];
      b23 = +m[(idx_b + 11)<< 2 >> 2];
      b30 = +m[(idx_b + 12)<< 2 >> 2];
      b31 = +m[(idx_b + 13)<< 2 >> 2];
      b32 = +m[(idx_b + 14)<< 2 >> 2];
      b33 = +m[(idx_b + 15)<< 2 >> 2];

      m[(idx_dest + 0)<< 2 >> 2] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
      m[(idx_dest + 1)<< 2 >> 2] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
      m[(idx_dest + 2)<< 2 >> 2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
      m[(idx_dest + 3)<< 2 >> 2] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
      m[(idx_dest + 4)<< 2 >> 2] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
      m[(idx_dest + 5)<< 2 >> 2] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
      m[(idx_dest + 6)<< 2 >> 2] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
      m[(idx_dest + 7)<< 2 >> 2] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
      m[(idx_dest + 8)<< 2 >> 2] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
      m[(idx_dest + 9)<< 2 >> 2] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
      m[(idx_dest + 10)<< 2 >> 2] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
      m[(idx_dest + 11)<< 2 >> 2] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
      m[(idx_dest + 12)<< 2 >> 2] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
      m[(idx_dest + 13)<< 2 >> 2] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
      m[(idx_dest + 14)<< 2 >> 2] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
      m[(idx_dest + 15)<< 2 >> 2] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
    }

    return {
      Mult: multiplyUnrolled
    }
  };

  var heapfloat = new Float32Array ( ASM_HEAP );
  var asmlib = mat_mod (w, undefined, ASM_HEAP);

  w.MatAsm = {
    Set: function ( a, b ) {
      heapfloat.set (a, 16);
      heapfloat.set (b, 32);
    },
    Multiply: function () {
      asmlib.Mult (1, 2, 0);

      var ret = new Float32Array (ASM_HEAP.slice (0, 64));
      return (ret);
    }
  };

})( window, document);
*/












(function ( w, d ) {
  
  function OneUp ( _text, _time, _location ) {
    var el = d.createElement ('div');
    el.style.cssText = 'margin-top:20px;opacity:0';
    el.className = 'pk_oneup';
    el.innerHTML = _text || '';

    d.body.appendChild ( el );
    setTimeout (function() {
      el.style.cssText = 'margin-top:0px;opacity:1';
      
      setTimeout (function() {
        el.style.cssText = 'margin-top:-20px;opacity:0';
        
        setTimeout (function() {
          el.parentNode.removeChild ( el );
          el = null;
        }, 330);
      }, _time || 720);
    }, 25);
  }

  w.OneUp = OneUp;




  var _debouncers = {};
  function Debouncer ( name, gap, timestamp ) {

    var deb = _debouncers[ name ];

    if (!deb) _debouncers[ name ] = deb = 1.0;
    if (!timestamp) timestamp = w.performance.now ();

    if (timestamp - deb < gap) return (false);

    _debouncers[ name ] = timestamp;

    return (true);
  };

  w.Debouncer = Debouncer;


})( window, document );






function WithinPolygon (point, vs) {
    var x = point.x, y = point.y;
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};


function DegToRad(degrees)
{
  return degrees * (Math.PI/180);
}


function Vector(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

function DistanceVector( v1, v2 ) {
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt ( dx * dx + dy * dy + dz * dz );
}


function GetMatrixTransform ( el ) {
    var magic = getComputedStyle( el ).transform.replace('matrix3d(','').replace(')','').split(' ');
    var mat = [];
    for (var i = 0; i < magic.length; ++i)
    {
      mat[i] = (magic[i].replace(',', ''))/1;
    }

    return (mat);
}

function GetAbsoluteVerticesXXX ( node ) {
  return (node.vertices);
}

function GetAbsoluteVertices ( el ) {
  var verts = [];

  var half_width = (el.width / 2) >> 0;
  var half_height = (el.height / 2) >> 0;


  verts[0] = new Vector (-half_width, half_height, 0);
  verts[1] = new Vector (half_width, half_height, 0);
  verts[2] = new Vector (half_width, -half_height, 0);
  verts[3] = new Vector (-half_width, -half_height, 0);


/*
  verts[0] = new Vector (0, el.height, 0);
  verts[1] = new Vector (el.width, el.height, 0);
  verts[2] = new Vector (el.width, 0, 0);
  verts[3] = new Vector (0, 0, 0);
*/


/*
  verts[0] = new Vector (-250, el.height, 250);
  // wants: -200px, 250px, -500px

  verts[1] = new Vector (el.width -250, el.height, 0 + 250);
  verts[2] = new Vector (el.width -250, 0, 0 + 250);
  verts[3] = new Vector (0 -250, 0, 0 + 250);
*/

  return (verts);
}

function Unproject ( vector, cameraProjectionMatrix, cameraWorld ) {
  var inverse = GetInverse( cameraProjectionMatrix );
  return vector.applyMatrix4( inverse ).applyMatrix4( cameraWorld );
  // this.applyMatrix4( matrix.getInverse( camera.projectionMatrix ) ).applyMatrix4( camera.matrixWorld );
}

function MakeMatrix4 () {
  return ([1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1]);
}


function QuaternionFromRotationMatrix ( m ) {

  var _w = 0, _x = 0, _y = 0, _z =0;

  var te = m,

    m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
    m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
    m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

    trace = m11 + m22 + m33,
    s;

  if ( trace > 0 ) {

    s = 0.5 / Math.sqrt( trace + 1.0 );

    _w = 0.25 / s;
    _x = ( m32 - m23 ) * s;
    _y = ( m13 - m31 ) * s;
    _z = ( m21 - m12 ) * s;

  } else if ( m11 > m22 && m11 > m33 ) {

    s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

    _w = ( m32 - m23 ) / s;
    _x = 0.25 * s;
    _y = ( m12 + m21 ) / s;
    _z = ( m13 + m31 ) / s;

  } else if ( m22 > m33 ) {

    s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

    _w = ( m13 - m31 ) / s;
    _x = ( m12 + m21 ) / s;
    _y = 0.25 * s;
    _z = ( m23 + m32 ) / s;

  } else {

    s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

    _w = ( m21 - m12 ) / s;
    _x = ( m13 + m31 ) / s;
    _y = ( m23 + m32 ) / s;
    _z = 0.25 * s;

  }

  return {x:_x, y:_y, z:_z, w:_w};
};


(function () {
    var x = null;
    var y = null;
    var z = null;

    window.LookAt = function LookAt ( te, eye, target, up ) {

      // var x = new Vector();
      // var y = new Vector();
      // var z = new Vector();

      if (!z) {
        x = new Vector();
        y = new Vector();
        z = new Vector();
      }

      z.subVectors( eye, target );

      if ( z.lengthSq() === 0 ) {

        // eye and target are in the same position

        z.z = 1;

      }

      z = z.unit();
      x.crossVectors( up, z );

      if ( x.lengthSq() === 0 ) {

        // up and z are parallel

        if ( Math.abs( up.z ) === 1 ) {

          z.x += 0.0001;

        } else {

          z.z += 0.0001;

        }

        z = z.unit();
        x.crossVectors( up, z );

      }

      x = x.unit();
      y.crossVectors( z, x );

      te[ 0 ] = x.x; te[ 4 ] = y.x; te[ 8 ] = z.x;
      te[ 1 ] = x.y; te[ 5 ] = y.y; te[ 9 ] = z.y;
      te[ 2 ] = x.z; te[ 6 ] = y.z; te[ 10 ] = z.z;

      //te[ 3 ] = 0;
      //te[ 7 ] = 0;
      //te[ 11 ] = 0;
      //te[ 12 ] = 0;
      //te[ 13 ] = 0;
      //te[ 14 ] = 0;
      //te[ 15 ] = 1;

      return te;
};

})();

  function MultiplyMatrices ( ae, be ) {
    var te = new Float32Array (16);

    var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
    var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
    var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
    var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

    var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
    var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
    var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
    var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

    te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return te;
  };
  function MultiplyMatrices2 (te, ae, be) {
    var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
    var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
    var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
    var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

    var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
    var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
    var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
    var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

    te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return te;
  };

  function GetInverse ( m ) {

    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    var te = [],
      me = m;

      n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ],
      n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ],
      n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ],
      n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ],

      t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
      t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
      t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
      t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

    var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if ( det === 0 ) {

      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    }

    var detInv = 1 / det;

    te[ 0 ] = t11 * detInv;
    te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
    te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
    te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

    te[ 4 ] = t12 * detInv;
    te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
    te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
    te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

    te[ 8 ] = t13 * detInv;
    te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
    te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
    te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

    te[ 12 ] = t14 * detInv;
    te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
    te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
    te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

    return te;

  };

  function GetInverse2 ( te, me ) {

    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    var n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ],
      n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ],
      n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ],
      n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ],

      t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
      t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
      t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
      t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

    var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if ( det === 0 ) {
      te[0] = 1; te[1] = 0; te[2] = 0; te[3] = 0; te[4] = 0;
      te[5] = 1; te[6] = 0; te[7] = 0; te[8] = 0; te[9] = 0;
      te[10] = 1; te[11] = 0; te[12] = 0; te[13] = 0; te[14] = 0;
      te[15] = 1;
      return (te);
    }

    var detInv = 1 / det;

    te[ 0 ] = t11 * detInv;
    te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
    te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
    te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

    te[ 4 ] = t12 * detInv;
    te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
    te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
    te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

    te[ 8 ] = t13 * detInv;
    te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
    te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
    te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

    te[ 12 ] = t14 * detInv;
    te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
    te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
    te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

    return te;

  };


Vector.prototype = {
  multiplyScalar: function ( scalar ) {

    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;

    return this;

  },
  addVectors : function(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;

    return this;
  },
  negative: function() {
    return new Vector(-this.x, -this.y, -this.z);
  },
  applyMatrix4: function ( m ) {

    var x = this.x, y = this.y, z = this.z;
    var e = m;

    var w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

    this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
    this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
    this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

    return this;

  },
  add: function(v) {
    if (v instanceof Vector) return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    else return new Vector(this.x + v, this.y + v, this.z + v);
  },
  subtract: function(v) {
    if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    else return new Vector(this.x - v, this.y - v, this.z - v);
  },
  subtractReuse: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;

    return (this);
  },
  multiply: function(v) {
    if (v instanceof Vector) return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
    else return new Vector(this.x * v, this.y * v, this.z * v);
  },
  divide: function(v) {
    if (v instanceof Vector) {
      return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
    }

    else return new Vector(this.x / v, this.y / v, this.z / v);
  },
  equals: function(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  },
  dot: function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  crossVectors: function ( a, b ) {

    var ax = a.x, ay = a.y, az = a.z;
    var bx = b.x, by = b.y, bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;

  },
  subVectors: function ( a, b ) {

    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;

    return this;

  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  cross: function(v) {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  },
  length: function() {
    return Math.sqrt(this.dot(this));
  },
  unit: function() {
    return this.divide(this.length());
  },
  min: function() {
    return Math.min(Math.min(this.x, this.y), this.z);
  },
  max: function() {
    return Math.max(Math.max(this.x, this.y), this.z);
  },
  toAngles: function() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    };
  },
  angleTo: function(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },
  toArray: function(n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  },
  clone: function() {
    return new Vector(this.x, this.y, this.z);
  },
  init: function(x, y, z) {
    this.x = x; this.y = y; this.z = z;
    return this;
  }
};


Vector.negative = function(a, b) {
  b.x = -a.x; b.y = -a.y; b.z = -a.z;
  return b;
};
Vector.add = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x + b.x; c.y = a.y + b.y; c.z = a.z + b.z; }
  else { c.x = a.x + b; c.y = a.y + b; c.z = a.z + b; }
  return c;
};

Vector.subtract = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z; }
  else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b; }
  return c;
};
Vector.multiply = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z; }
  else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b; }
  return c;
};
Vector.divide = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z; }
  else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b; }
  return c;
};
Vector.cross = function(a, b, c) {
  c.x = a.y * b.z - a.z * b.y;
  c.y = a.z * b.x - a.x * b.z;
  c.z = a.x * b.y - a.y * b.x;
  return c;
};
Vector.unit = function(a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  b.z = a.z / length;
  return b;
};
Vector.fromAngles = function(theta, phi) {
  return new Vector(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
};
Vector.randomDirection = function() {
  return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};
Vector.min = function(a, b) {
  return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
};
Vector.max = function(a, b) {
  return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
};
Vector.lerp = function(a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};
Vector.fromArray = function(a) {
  return new Vector(a[0], a[1], a[2]);
};
Vector.angleBetween = function(a, b) {
  return a.angleTo(b);
};








// If the user is not including numeric.js already, add shim so this library works. Removes dependency on numeric.js

(function(root) {
  if(root.numeric) {
    return;
  }

  else{
    var numeric = {};

    numeric.dim = function dim(x) {
        var y,z;
        if(typeof x === "object") {
            y = x[0];
            if(typeof y === "object") {
                z = y[0];
                if(typeof z === "object") {
                    return numeric._dim(x);
                }
                return [x.length,y.length];
            }
            return [x.length];
        }
        return [];
    };

    numeric._foreach2 = (function _foreach2(x,s,k,f) {
        if(k === s.length-1) { return f(x); }
        var i,n=s[k], ret = Array(n);
        for(i=n-1;i>=0;i--) { ret[i] = _foreach2(x[i],s,k+1,f); }
        return ret;
    });

    numeric.cloneV = function (x) {
      var _n = x.length;
      var i, ret = Array(_n);

      for(i=_n-1;i!==-1;--i) {
        ret[i] = (x[i]);
      }
      return ret;
    };

    numeric.clone = function (x) {
      if(typeof x !== "object") return (x);
      var V = numeric.cloneV;
      var s = numeric.dim(x);
      return numeric._foreach2(x,s,0,V);
    };

    numeric.diag = function diag(d) {
        var i,i1,j,n = d.length, A = Array(n), Ai;
        for(i=n-1;i>=0;i--) {
            Ai = Array(n);
            i1 = i+2;
            for(j=n-1;j>=i1;j-=2) {
                Ai[j] = 0;
                Ai[j-1] = 0;
            }
            if(j>i) { Ai[j] = 0; }
            Ai[i] = d[i];
            for(j=i-1;j>=1;j-=2) {
                Ai[j] = 0;
                Ai[j-1] = 0;
            }
            if(j===0) { Ai[0] = 0; }
            A[i] = Ai;
        }
        return A;
    };

    numeric.rep = function rep(s,v,k) {
        if(typeof k === "undefined") { k=0; }
        var n = s[k], ret = Array(n), i;
        if(k === s.length-1) {
            for(i=n-2;i>=0;i-=2) { ret[i+1] = v; ret[i] = v; }
            if(i===-1) { ret[0] = v; }
            return ret;
        }
        for(i=n-1;i>=0;i--) { ret[i] = numeric.rep(s,v,k+1); }
        return ret;
    };

    numeric.identity = function(n) { return numeric.diag(numeric.rep([n],1)); };

    numeric.inv = function inv(a) {
        var s = numeric.dim(a), abs = Math.abs, m = s[0], n = s[1];
        var A = numeric.clone(a), Ai, Aj;
        var I = numeric.identity(m), Ii, Ij;
        var i,j,k,x;
        for(j=0;j<n;++j) {
            var i0 = -1;
            var v0 = -1;
            for(i=j;i!==m;++i) { k = abs(A[i][j]); if(k>v0) { i0 = i; v0 = k; } }
            Aj = A[i0]; A[i0] = A[j]; A[j] = Aj;
            Ij = I[i0]; I[i0] = I[j]; I[j] = Ij;
            x = Aj[j];
            for(k=j;k!==n;++k)    Aj[k] /= x; 
            for(k=n-1;k!==-1;--k) Ij[k] /= x;
            for(i=m-1;i!==-1;--i) {
                if(i!==j) {
                    Ai = A[i];
                    Ii = I[i];
                    x = Ai[j];
                    for(k=j+1;k!==n;++k)  Ai[k] -= Aj[k]*x;
                    for(k=n-1;k>0;--k) { Ii[k] -= Ij[k]*x; --k; Ii[k] -= Ij[k]*x; }
                    if(k===0) Ii[0] -= Ij[0]*x;
                }
            }
        }
        return I;
    };

    numeric.dotMMsmall = function dotMMsmall(x,y) {
        var i,j,k,p,q,r,ret,foo,bar,woo,i0;
        p = x.length; q = y.length; r = y[0].length;
        ret = Array(p);
        for(i=p-1;i>=0;i--) {
            foo = Array(r);
            bar = x[i];
            for(k=r-1;k>=0;k--) {
                woo = bar[q-1]*y[q-1][k];
                for(j=q-2;j>=1;j-=2) {
                    i0 = j-1;
                    woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
                }
                if(j===0) { woo += bar[0]*y[0][k]; }
                foo[k] = woo;
            }
            ret[i] = foo;
        }
        return ret;
    };

    numeric.dotMV = function dotMV(x,y) {
        var p = x.length, i;
        var ret = Array(p), dotVV = numeric.dotVV;
        for(i=p-1;i>=0;i--) { ret[i] = dotVV(x[i],y); }
        return ret;
    };

    numeric.dotVV = function dotVV(x,y) {
        var i,n=x.length,i1,ret = x[n-1]*y[n-1];
        for(i=n-2;i>=1;i-=2) {
            i1 = i-1;
            ret += x[i]*y[i] + x[i1]*y[i1];
        }
        if(i===0) { ret += x[0]*y[0]; }
        return ret;
    };

    numeric.transpose = function transpose(x) {
        var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
        for(j=0;j<n;j++) ret[j] = Array(m);
        for(i=m-1;i>=1;i-=2) {
            A1 = x[i];
            A0 = x[i-1];
            for(j=n-1;j>=1;--j) {
                Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
                --j;
                Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
            }
            if(j===0) {
                Bj = ret[0]; Bj[i] = A1[0]; Bj[i-1] = A0[0];
            }
        }
        if(i===0) {
            A0 = x[0];
            for(j=n-1;j>=1;--j) {
                ret[j][0] = A0[j];
                --j;
                ret[j][0] = A0[j];
            }
            if(j===0) { ret[0][0] = A0[0]; }
        }
        return ret;
    };

        this.numeric = numeric;
    root.numeric = numeric;
  }

}(this));


(function(global, factory) {
  if(typeof exports === 'object' && typeof module !== undefined){
    module.exports = factory();
  }
  else if(typeof define === 'function' && define.amd){
    define(factory);
  }
  else{
    global.PerspT = factory();
  }
}(this, function() {
  'use strict';

    function round(num){
        return Math.round(num*10000000000)/10000000000;
    }

  function getNormalizationCoefficients(srcPts, dstPts, isInverse){
    if(isInverse){
      var tmp = dstPts;
      dstPts = srcPts;
      srcPts = tmp;
    }
    var r1 = [srcPts[0], srcPts[1], 1, 0, 0, 0, -1*dstPts[0]*srcPts[0], -1*dstPts[0]*srcPts[1]];
    var r2 = [0, 0, 0, srcPts[0], srcPts[1], 1, -1*dstPts[1]*srcPts[0], -1*dstPts[1]*srcPts[1]];
    var r3 = [srcPts[2], srcPts[3], 1, 0, 0, 0, -1*dstPts[2]*srcPts[2], -1*dstPts[2]*srcPts[3]];
    var r4 = [0, 0, 0, srcPts[2], srcPts[3], 1, -1*dstPts[3]*srcPts[2], -1*dstPts[3]*srcPts[3]];
    var r5 = [srcPts[4], srcPts[5], 1, 0, 0, 0, -1*dstPts[4]*srcPts[4], -1*dstPts[4]*srcPts[5]];
    var r6 = [0, 0, 0, srcPts[4], srcPts[5], 1, -1*dstPts[5]*srcPts[4], -1*dstPts[5]*srcPts[5]];
    var r7 = [srcPts[6], srcPts[7], 1, 0, 0, 0, -1*dstPts[6]*srcPts[6], -1*dstPts[6]*srcPts[7]];
    var r8 = [0, 0, 0, srcPts[6], srcPts[7], 1, -1*dstPts[7]*srcPts[6], -1*dstPts[7]*srcPts[7]];

    var matA = [r1, r2, r3, r4, r5, r6, r7, r8];
    var matB = dstPts;
        var matC;
  
    try{
        matC = numeric.inv(numeric.dotMMsmall(numeric.transpose(matA), matA));
    }catch(e){
        console.log(e);
        return [1,0,0,0,1,0,0,0];
    }

    var matD = numeric.dotMMsmall(matC, numeric.transpose(matA));
    var matX = numeric.dotMV(matD, matB);
        for(var i = 0; i < matX.length; i++) {
            matX[i] = round(matX[i]);
        }
        matX[8] = 1;

    return matX;
  }

  function PerspT(srcPts, dstPts){
    if( (typeof window !== 'undefined' && window === this) || this === undefined) {
      return new PerspT(srcPts, dstPts);
    }

    this.srcPts = srcPts;
    this.dstPts = dstPts;
    this.coeffs = getNormalizationCoefficients(this.srcPts, this.dstPts, false);
    this.coeffsInv = getNormalizationCoefficients(this.srcPts, this.dstPts, true);

    return this;
  }

  PerspT.prototype = {
    transform: function(x,y) {
      var coordinates = [];
      coordinates[0] = (this.coeffs[0]*x + this.coeffs[1]*y + this.coeffs[2]) / (this.coeffs[6]*x + this.coeffs[7]*y + 1);
      coordinates[1] = (this.coeffs[3]*x + this.coeffs[4]*y + this.coeffs[5]) / (this.coeffs[6]*x + this.coeffs[7]*y + 1);
      return coordinates;
    },

    transformInverse: function(x,y) {
      var coordinates = [];
      coordinates[0] = (this.coeffsInv[0]*x + this.coeffsInv[1]*y + this.coeffsInv[2]) / (this.coeffsInv[6]*x + this.coeffsInv[7]*y + 1);
      coordinates[1] = (this.coeffsInv[3]*x + this.coeffsInv[4]*y + this.coeffsInv[5]) / (this.coeffsInv[6]*x + this.coeffsInv[7]*y + 1);
      return coordinates;
    }
  };

  return PerspT;

}));