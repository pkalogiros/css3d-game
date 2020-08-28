(function ( w, d, GAME ) {
  'use strict';

  if (!GAME.GEOM) GAME.GEOM = {};

  var _id = -1;

  GAME.GEOM.Node = function ( config ) {
  	var q = this;

  	q.id = 'id';
  	q.type = '';
  	q.type_ref = {}; // template
  	q._parent;       // parent obj

  	q.hidden = false; // do not render
  	q.object;		  // is object
  	q.tag = 'img';	  // img or div

  	q.el = null;	  // node element
  	q.clss = 'class_name';

  	q.width;
  	q.height;

  	q.img;


  	q.geom = []; // has children -- (only render children)


  	// ---------
  	q.tri;
  	q.tri_verts;
  	q.vertices;
  	q.vertexNormals;
  	q.complexNormals;
  	q.centroid;
    q.triangles = [
      {
        point_edge  : null,
        edge1       : null,
        edge2       : null,
        normal      : null,
        normal_unit : null,
        points      : [null, null, null]
      }
    ];

    q.alpha;
    q.alpha_mask;
    q.alpha_rect;

    q.brightness;
    q.light_map;
    q.light_bitmap;
    q.light_ctx;
    q.no_shadow;
    q.cast_shadow;

    q.shadow_w;
    q.shadow_h;


    q.transform;
    q.matrix;
    q.parent_matrix;


    q.walk;
    q.innerHTML;
    q.hide_frustrum;
    q.face_camera;

    q.interact;
    q.pickable;
    q.icon;
    q.desc;


    q.needsUpdate;
  };


})( window, document, GAME );