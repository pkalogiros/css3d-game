


// helpers (delete)
var MatrixCSSClass = window.WebKitCSSMatrix ||
              window.MozCSSMatrix ||
              window.MsCSSMatrix ||
              window.OCSSMatrix ||
              window.CSSMatrix;

window.makeCube = function (width, height, length) {
	var move = document.getElementById('move');

	var parent = document.createElement('div');
	var parent_trans = 'translate3d(0,0,100px)';



	parent_trans = 'translate3d(330px, 80px, 100px) rotateX(-40deg)';

	parent.id = 'custom_el';
	parent.className = 'obj';

	parent.style.cssText = 'transform-style:preserve-3d;z-index:99999;transform:' + parent_trans + ';width: 2px; height: 2px; background: blue;';
	// 100px Z hack so that it is visible

	var matrix_parent_css = new MatrixCSSClass( parent_trans );
	var matrix_parent = [ matrix_parent_css.m11,
		matrix_parent_css.m12,
		matrix_parent_css.m13,
		matrix_parent_css.m14,
		matrix_parent_css.m21,
		matrix_parent_css.m22,
		matrix_parent_css.m23,
		matrix_parent_css.m24,
		matrix_parent_css.m31,
		matrix_parent_css.m32,
		matrix_parent_css.m33,
		matrix_parent_css.m34,
		matrix_parent_css.m41,
		matrix_parent_css.m42,
		matrix_parent_css.m43,
		matrix_parent_css.m44];



	// -- top
	var top = document.createElement('div');
	top.className = 'obj';
	top.style.background = 'green';

	top.style.width = width + 'px';
	top.style.height = length + 'px';
	top.style.transform = 'translate3d(' + (-width/2) + 'px,' + (-height/2) + 'px, 0px) rotateX(90deg) translate3d(0,0,' + (length/2) + 'px)';


	parent.appendChild( top );



	var top_geom = {
                id : 'cude-whatever-1',
                clss: 'class-whatever-1',
                width: width,
                height:length,

                vertices: function( width, height ) {
//                    return [
//                      new Vector( -width/2, 0,  height/2 ),
//                      new Vector(  width/2, 0,  height/2 ),
//                      new Vector(  width/2, 0, -height/2 ),
//                      new Vector( -width/2, 0, -height/2 )
//                    ];
                }
	};
	// top_geom.vertices = top_geom.vertices (top_geom.width, top_geom.height);

	var real_vertices = [
		new Vector( 0,           top_geom.height, 0),
		new Vector( top_geom.width,  top_geom.height, 0),
		new Vector( top_geom.width,  0,           0),
		new Vector( 0,           0,           0)
	];
	var vertices = [];

	var matrix_css = new MatrixCSSClass( top.style.transform );
	var matrix = [ matrix_css.m11,
		matrix_css.m12,
		matrix_css.m13,
		matrix_css.m14,
		matrix_css.m21,
		matrix_css.m22,
		matrix_css.m23,
		matrix_css.m24,
		matrix_css.m31,
		matrix_css.m32,
		matrix_css.m33,
		matrix_css.m34,
		matrix_css.m41,
		matrix_css.m42,
		matrix_css.m43,
		matrix_css.m44];

	for (var i = 0; i < real_vertices.length; ++i)
	{
		var curr = real_vertices[i].clone();
		curr.x -= top_geom.width/2;
		curr.y -= top_geom.height/2;

		curr.applyMatrix4( matrix );

		curr.x += top_geom.width/2;
		curr.y += top_geom.height/2;

		vertices[i] = curr.applyMatrix4( matrix_parent );
	}
	top_geom.vertices = vertices;

	// now apply the parent's matrix
	console.log( vertices );
	window.top_geom = top_geom;



	// ----------------------

	var bottom = document.createElement('div');
	bottom.className = 'obj';
	bottom.style.background = 'brown';

	bottom.style.width = width + 'px';
	bottom.style.height = length + 'px';
	bottom.style.transform = 'translate3d(' + (-width/2) + 'px,' + (-height/2) + 'px, 0px) rotateX(-90deg) translate3d(0,0,' + ((-length/2)+height) + 'px)';

	parent.appendChild( bottom );
	// ----------------------



	var front = document.createElement('div');
	front.className = 'obj';
	front.style.background = 'red';

	front.style.width = width + 'px';
	front.style.height = height + 'px';
	front.style.transform = 'translate3d(' + (-width/2) + 'px, ' + (-height/2) + 'px, ' + (length/2) + 'px)';

	parent.appendChild( front );



	var back = document.createElement('div');
	back.className = 'obj';
	back.style.background = 'blue';

	back.style.width = width + 'px';
	back.style.height = height + 'px';
	back.style.transform = 'translate3d(' + (-width/2) + 'px, ' + (-height/2) + 'px, ' + (-length/2) + 'px) rotateY(180deg)';

	parent.appendChild( back );



	var left = document.createElement('div');
	left.className = 'obj';
	left.style.background = 'teal';

	left.style.width = length + 'px';
	left.style.height = height + 'px';
	left.style.transform = 'translate3d(' + (-length/2) + 'px,' + (-height/2) + 'px, 0px) rotateY(90deg) translate3d(0,0,' + (width/2) + 'px)';


	parent.appendChild( left );


	var right = document.createElement('div');
	right.className = 'obj';
	right.style.background = 'pink';

	right.style.width = length + 'px';
	right.style.height = height + 'px';
	right.style.transform = 'translate3d(' + (-length/2) + 'px,' + (-height/2) + 'px, 0px) rotateY(-90deg) translate3d(0,0,' + (width/2) + 'px)';

	parent.appendChild( right );


	move.appendChild  ( parent );
};

window.killCustom = function() {
	var cc = document.getElementById('custom_el');
	cc && document.getElementById('move').removeChild( cc );
}

window.makeTube = function (diameter, height, faces_num) {
	var move = document.getElementById('move');

	var parent = document.createElement('div');
	parent.id = 'custom_el';
	parent.className = 'obj';

	parent.style.cssText = 'transform-style:preserve-3d;z-index:99999;transform:translate3d(0,0,100px);width: 2px; height: 2px; background: blue;';
	// 100px Z hack so that it is visible

	//---
	var side_angle = (Math.PI / faces_num) * 2;
	var side_len = diameter * Math.tan(Math.PI/faces_num);

    for (var c = 0; c < faces_num; c++) {
        var x = Math.sin(side_angle * c) * diameter / 2;
        var z = Math.cos(side_angle * c) * diameter / 2;
        var ry = Math.atan2(x, z);
        parent.appendChild( createFace (side_len + 1, height, x, 0, z, 0, ry, 0, null, side_len * c, 0) );
    }
	//---

	move.appendChild  ( parent );
};

function createFace(w, h, x, y, z, rx, ry, rz, tsrc, tx, ty) {
    var face = document.createElement("div");
    face.className = "obj";
    face.style.cssText = "background:" + randomColor () + ';' +
    	//"background: url(" + tsrc + ") -" + tx.toFixed(2) + "px " + ty.toFixed(2) + "px;" +
        "width:" + w.toFixed(2) + "px;" +
        "height:" + h.toFixed(2) + "px;" +
        "transform: translate3d(" + (x - (w / 2)).toFixed(2) + "px," + (y - (h / 2)).toFixed(2) + "px," + z.toFixed(2) + "px)" +
        "rotateX(" + rx.toFixed(2) + "rad) rotateY(" + ry.toFixed(2) + "rad) rotateY(" + rz.toFixed(2) + "rad);";
    return face;
}

function randomColor() {
	return ('#'+(Math.random()*0xFFFFFF<<0).toString(16));
}

function makeRandId(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

window.DrawPoint = function ( vert ) {
		var id = 'point-' + makeRandId(5);

		var el = document.createElement('div');
		el.className = 'vertex';
		el.id = id;
		el.style.transform = 'translate3d('+ vert.x +'px,'+ vert.y +'px,'+ vert.z +'px)';
		el.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

		console.log( id, vert.x, vert.y, vert.z );

		move.appendChild( el );
};

window.DrawVertex = function ( node, real_vertices ) {
	if (!node.vertices) return ;

	var vertices = [];

	if (real_vertices)
	{
		  var _GetMatrixCSS = (function() {
		    var MatrixCSS = window.WebKitCSSMatrix ||
		                    window.MozCSSMatrix ||
		                    window.MsCSSMatrix ||
		                    window.OCSSMatrix ||
		                    window.CSSMatrix;
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

		  if (real_vertices === 1 || real_vertices === true)
		  {
/*		  	
				real_vertices = [
					new Vector(-node.width/2,  node.height/2, 0),
					new Vector( node.width/2,  node.height/2, 0),
					new Vector( node.width/2, -node.height/2, 0),
					new Vector(-node.width/2, -node.height/2, 0)
				];
*/
				real_vertices = [
					new Vector( 0,           node.height, 0),
					new Vector( node.width,  node.height, 0),
					new Vector( node.width,  0,           0),
					new Vector( 0,           0,           0)
				];
		  }

          // var magic = getComputedStyle( node.el ).transform.replace('matrix3d(','').replace(')','').split(' ');
          var matrix = [], mat_rev = [];

          matrix = _GetMatrixCSS (node.el.style.transform);

          //debugger;
          /*if (magic.length > 8)
          {
		        for (var i = 0; i < magic.length; ++i)
		        {
		            matrix[i] = ((magic[i].replace(',', ''))/1).toFixed(2) / 1;
		        }
		  }*/

          for (var i = 0; i < real_vertices.length; ++i)
          {
          	var curr = real_vertices[i].clone();
          	if (matrix.length > 8)
          	{
          		curr.x -= node.width/2;
          		curr.y -= node.height/2;

          		curr.applyMatrix4( matrix );

          		curr.x += node.width/2;
          		curr.y += node.height/2;

          	}
          	vertices[i] = curr;
          }
	}
	else
	{
		vertices = node.vertices;
	}


	for (var i = 0; i < vertices.length; ++i)
	{
		var vert = vertices[i];

		var el = document.createElement('div');
		el.className = 'vertex';
		el.style.transform = 'translate3d('+ vert.x +'px,'+ vert.y +'px,'+ vert.z +'px)';
		el.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		el.setAttribute('vertex-id', i);

		console.log( vert.x, vert.y, vert.z );

		move.appendChild( el );
	}
};




window.DrawVertex222 = function ( node, real_vertices ) {
	if (!node.vertices) return ;

	var vertices = [];


	var GetMatrixCSS = (function() {
		var MatrixCSS = window.WebKitCSSMatrix ||
		                window.MozCSSMatrix ||
		                window.MsCSSMatrix ||
		                window.OCSSMatrix ||
		                window.CSSMatrix;
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

		  if (real_vertices === 1 || real_vertices === true)
		  {
/*		  	
				real_vertices = [
					new Vector(-node.width/2,  node.height/2, 0),
					new Vector( node.width/2,  node.height/2, 0),
					new Vector( node.width/2, -node.height/2, 0),
					new Vector(-node.width/2, -node.height/2, 0)
				];
*/
				real_vertices = [
					new Vector( 0,           node.height, 0),
					new Vector( node.width,  node.height, 0),
					new Vector( node.width,  0,           0),
					new Vector( 0,           0,           0)
				];
		  }

          var transform = getComputedStyle( node.el ).transform.replace('matrix3d(','').replace(')','').split(' ');
          var matrix = [], mat_rev = [];

          matrix = _GetMatrixCSS (node.el.style.transform);


          for (var i = 0; i < real_vertices.length; ++i)
          {
          	var curr = real_vertices[i].clone();
          	if (matrix.length > 8)
          	{
          		curr.x -= node.width/2;
          		curr.y -= node.height/2;

          		curr.applyMatrix4( matrix );

          		curr.x += node.width/2;
          		curr.y += node.height/2;

          	}
          	vertices[i] = curr;
          }


	for (var i = 0; i < vertices.length; ++i)
	{
		var vert = vertices[i];

		var el = document.createElement('div');
		el.className = 'vertex';
		el.style.transform = 'translate3d('+ vert.x +'px,'+ vert.y +'px,'+ vert.z +'px)';
		el.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		el.setAttribute('vertex-id', i);

		console.log( vert.x, vert.y, vert.z );

		move.appendChild( el );
	}
};