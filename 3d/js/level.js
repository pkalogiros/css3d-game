(function ( w, d, GAME ) {
  'use strict';


  function ASMLightMerge (stdlib, foreign, buffer) {
    'use asm';

    var MULT = stdlib.Math.imul;
    var FLOOR = stdlib.Math.floor;
    var SQRT = stdlib.Math.sqrt;
    var MIN = stdlib.Math.min;

    var HEAPU8 = new stdlib.Uint8Array( buffer );
    var HEAPF32 = new stdlib.Float64Array( buffer );
    var HEAPI32 = new stdlib.Uint32Array( buffer );


    var x7f = 8355711;
    var x01 = 65793;
    var x88 = 16777215;
    var opaque = -16777216;
    var ii = 0;


    function AsmBlur (byte_offset, w, h) {
      byte_offset = byte_offset|0;
      w = w|0; h = h|0;
      var w4 = 0, idx = 0, i = 0, n = 0, t = 0;
      // var prev_val = 0;
      w4 = w * 4|0; idx = idx|0; i = i | 0; n = n | 0; t = t | 0;
      /*for(var idx = h * w; idx > 0; idx -= w)
        for(var t = 0, i = idx -w, n = w; n--; i++)
          buf32[i] = t = (x01 + t >> 1 & x7f) + (buf32[i] >> 1 & x7f);*/

      for(idx = MULT(h, w); idx|0 > 0; idx = (idx - w)|0) {
        for(t = 0, i = ((idx - w)<<2)|0, n = w;n|0 > 0;n=n-1|0, i=i+4|0) {

            //var before = HEAPI32[(byte_offset+i)>>2];
            //var old = ((x01|0) + t >> 1 & x7f);

            // hack for weird artifacts
            ii = ~~FLOOR(+(i|0)/4.0);
            if ( (((ii|0) % 65)|0) < 5) {
                
                t = ((x01|0) + t >> 1 & x7f) + ((HEAPI32[(byte_offset+i)>>2]|0) >> 1 & x7f)|0;
            }
            else {
                HEAPI32[(byte_offset+i)>>2] = t = ((x01|0) + t >> 1 & x7f) + ((HEAPI32[(byte_offset+i)>>2]|0) >> 1 & x7f)|0;
            }

           // if (before === 0) {
            //    HEAPU8[ (byte_offset + i + 3)|0 ] = 0;
            //}
            //else {
                HEAPU8[ (byte_offset + i + 3)|0 ] = HEAPU8[ (byte_offset + i + 2)|0 ];
            //}
            //var vii = (i/4);
            //if (ii%65 >20 && ii%65 < 30) {
            //    console.log ( 'x:', vii%65, 'y:', (vii/65)>>0, '  prev val: ', GAME.UTILS.UnpackColor (before), ' new val: ',  GAME.UTILS.UnpackColor (HEAPI32[(byte_offset+i)>>2]), '    ', old, ((before) >> 1 & x7f)|0, before );
            
                //if (ii%65 < 2) {
                //   HEAPU8[ (byte_offset + i + 0)|0 ] = 255;
                //   HEAPU8[ (byte_offset + i + 1)|0 ] = 0;
                //   HEAPU8[ (byte_offset + i + 2)|0 ] = 0;
                //   HEAPU8[ (byte_offset + i + 3)|0 ] = 255;
                //}
            //}
            // --
        }
    }

      /*for(var idx = h * w, t = 0, i = idx -1, n = w; n--; i--)
        buf32[i] = (t = (x01 + t >> 1 & x7f) + (buf32[i] >> 1 & x7f))>>1 &x7f;*/

/*
      for(idx = MULT(h, w), t = 0, i = ((idx -1)<<2)|0, n = w; n|0 > 0;n=n-1|0, i=i-4|0) {

            // var before = HEAPI32[(byte_offset+i)>>2];
            // var old = ((x01|0) + t >> 1 & x7f);

            ii = ~~FLOOR(+(i|0)/4.0);
            if (~~FLOOR(+(ii|0) / 65.0) > 60) {
                t = ((x01|0) + t >> 1 & x7f) + ((HEAPI32[(byte_offset+i)>>2]|0) >> 1 & x7f)|0;
            }
            else {
                HEAPI32[(byte_offset+i)>>2] = (t = ((x01|0) + t >> 1 & x7f) + ((HEAPI32[(byte_offset+i)>>2]|0) >> 1 & x7f)|0)>>1 &x7f;
            }

            //if (((ii/65)>>0) > 40) {
            //    console.log ( 'x:', ii%65, 'y:', (ii/65)>>0, '  prev val: ', GAME.UTILS.UnpackColor (before), ' new val: ',  GAME.UTILS.UnpackColor (HEAPI32[(byte_offset+i)>>2]), '    ', old, ((before) >> 1 & x7f)|0, before );
            
                //if (ii%65 === 27) {
                //   HEAPU8[ (byte_offset + i + 0)|0 ] = 255;
                //   HEAPU8[ (byte_offset + i + 1)|0 ] = 0;
                //   HEAPU8[ (byte_offset + i + 2)|0 ] = 0;
                //   HEAPU8[ (byte_offset + i + 3)|0 ] = 255;
                //}
            //}
      }
*/

      /*for(idx -= w; idx > 0; idx -= w)
        for(var t = 0, i = idx -1, n = w; n--; i--)
          buf32[i] = (x01 + buf32[i+w] >> 1 & x7f) + ((t = (x01 + t >> 1 & x7f) + (buf32[i] >> 1 & x7f)) >> 1 & x7f); */

/*
        for(idx = idx - w|0; idx|0 > 0; idx = idx - w|0) {
            for(t = 0, i = ((idx -1)<<2)|0, n = w; n|0>0; n=n-1|0, i=i-4|0) {
                //var before = HEAPI32[(byte_offset+i)>>2];

                ii = ~~FLOOR(+(i|0)/4.0);
                if ( (((ii|0) % 65)|0) > 58) {
                    t = (((x01|0) + (t|0)) >> 1 & x7f) + ((HEAPI32[(byte_offset+i)>>2]|0) >> 1 & x7f)|0;
                }
                else {
                    HEAPI32[(byte_offset+i)>>2] = (((((x01|0) + (HEAPI32[((byte_offset+i)+w4|0)>>2]|0)) >> 1 & x7f)|0) + ((t = (((x01|0) + (t|0)) >> 1 & x7f) + ((HEAPI32[(byte_offset+i)>>2]|0) >> 1 & x7f)|0) >> 1 & x7f))|0;
                }

                HEAPU8[ (byte_offset + i + 3)|0 ] = HEAPU8[ (byte_offset + i + 2)|0 ];

                //if (ii%65 < 30) {
                //    console.log ( 'x:', ii%65, 'y:', (ii/65)>>0, '  prev val: ', GAME.UTILS.UnpackColor (before), ' new val: ',  GAME.UTILS.UnpackColor (HEAPI32[(byte_offset+i)>>2]) );

                    //if (ii%65 < 2) {
                    //   HEAPU8[ (byte_offset + i + 0)|0 ] = 255;
                    //   HEAPU8[ (byte_offset + i + 1)|0 ] = 0;
                    //   HEAPU8[ (byte_offset + i + 2)|0 ] = 0;
                    //   HEAPU8[ (byte_offset + i + 3)|0 ] = 255;
                    //}
                //}

            }
        }
*/

      /*for(var idx = w; idx--;)
        for(var t = 0, i = idx, n = h; n--; i+=w)
          buf32[i] = opaque | (t = (x01 + t >> 1 & x7f) + (buf32[i] >> 1 & x7f)); */

/*
      for(idx = w; idx|0 > 0;idx = idx -1|0) {
        for(t = 0, i = idx << 2, n = h; n|0>0; n=n-1|0, i=i+w4|0) {

            //var before = HEAPI32[(byte_offset+i)>>2];
            //var old = ((x01|0) + t >> 1 & x7f);

            ii = ~~FLOOR(+(i|0)/4.0);
            if (~~FLOOR(+(ii|0) / 65.0) < 6) {
                t = ((x01|0) + t >> 1 & x7f) + ((HEAPI32[(byte_offset+i)>>2]|0) >> 1 & x7f)|0;
            }
            else {
                HEAPI32[(byte_offset+i)>>2] = ((opaque|0) | (t = ((x01|0) + t >> 1 & x7f) + ((HEAPI32[(byte_offset+i)>>2]|0) >> 1 & x7f)|0)|0)|0;
            }

            HEAPU8[ (byte_offset + i + 3)|0 ] = HEAPU8[ (byte_offset + i + 2)|0 ];

            //var ii = (i/4);
            //if (((ii/65)>>0) > 62)
            //    console.log ( 'x:', ii%65, 'y:', (ii/65)>>0, '  prev val: ', GAME.UTILS.UnpackColor (before), ' new val: ',  GAME.UTILS.UnpackColor (HEAPI32[(byte_offset+i)>>2]), '    ', old, ((before) >> 1 & x7f)|0, before );
        }
      }
      */
    }


    function applyMatrix4 (x, y, z, byte_offset) {
      x = +x;
      y = +y;
      z = +z;
      byte_offset = byte_offset|0;

      var w = 1.0;

      w = 1.0 / (+HEAPF32[(byte_offset + 3)<<3>> 3] * +x + +HEAPF32[(byte_offset + 7)<<3>> 3] * +y + +HEAPF32[(byte_offset + 11)<<3>> 3] * +z + +HEAPF32[(byte_offset + 15)<<3>> 3]);

      HEAPF32[0>>3] = (+HEAPF32[(byte_offset)<<3>> 3] * +x + +HEAPF32[(byte_offset + 4)<<3>> 3] * +y + +HEAPF32[(byte_offset + 8)<<3>> 3] * +z + +HEAPF32[(byte_offset + 12)<<3>> 3] ) * +w;
      HEAPF32[8>>3] = (+HEAPF32[(byte_offset + 1)<<3>> 3] * +x + +HEAPF32[(byte_offset + 5)<<3>> 3] * +y + +HEAPF32[(byte_offset + 9)<<3>> 3] * +z + +HEAPF32[(byte_offset + 13)<<3>> 3]) * +w;
      HEAPF32[16>>3] = (+HEAPF32[(byte_offset + 2)<<3>> 3] * +x + +HEAPF32[(byte_offset + 6)<<3>> 3] * +y + +HEAPF32[(byte_offset + 10)<<3>> 3] * +z + +HEAPF32[(byte_offset + 14)<<3>> 3]) * +w;
    }

    function AsmColorMix (w, h, offset_shad, offset_rgb) {
        w = w|0;
        h = h|0;
        offset_shad = offset_shad|0;
        offset_rgb = offset_rgb|0;

        var y = 0;
        var y_offset = 0;
        var x = 0;
        var x_offset = 0;
        var range = 0.8;
        var alpha = 0.0;

        for (y = 0; (y|0) < (h|0); y = (y+1)|0) {
            y_offset = MULT(MULT(y|0, w|0)|0, 4|0);

            for (x = 0; (x|0) < (w|0); x = (x+1)|0) {
                  x_offset = ((y_offset|0) + (MULT(x|0, 4|0)|0))|0;

                  if ((HEAPU8[ (offset_shad + x_offset + 3)|0 ]|0) > (240|0))
                  {
                    // console.log('AAA ', HEAPU8[ (offset_rgb + x_offset + 3)|0 ]);
                    HEAPU8[ (offset_rgb + x_offset)|0 ]     = MIN(255|0, ((HEAPU8[(offset_rgb + x_offset)|0]|0) + (HEAPU8[(offset_shad + x_offset)|0]|0))|0);
                    HEAPU8[ (offset_rgb + x_offset + 1)|0 ] = MIN(255|0, ((HEAPU8[(offset_rgb + x_offset + 1)|0]|0) + (HEAPU8[(offset_shad + x_offset + 1)|0]|0))|0);
                    HEAPU8[ (offset_rgb + x_offset + 2)|0 ] = MIN(255|0, ((HEAPU8[(offset_rgb + x_offset + 2)|0]|0) + (HEAPU8[(offset_shad + x_offset + 2)|0]|0))|0);
                    HEAPU8[ (offset_rgb + x_offset + 3)|0 ] = 255;

                    // HEAPU8[ (offset_rgb + x_offset)|0 ]     = MIN(255|0, ~~FLOOR(+(HEAPU8[(offset_rgb + x_offset)|0]|0)     * 0.5 + +(HEAPU8[(offset_shad + x_offset)|0]|0) * 0.5));
                    // HEAPU8[ (offset_rgb + x_offset + 1)|0 ] = MIN(255|0, ~~FLOOR(+(HEAPU8[(offset_rgb + x_offset + 1)|0]|0) * 0.5 + +(HEAPU8[(offset_shad + x_offset + 1)|0]|0) * 0.5));
                    // HEAPU8[ (offset_rgb + x_offset + 2)|0 ] = MIN(255|0, ~~FLOOR(+(HEAPU8[(offset_rgb + x_offset + 2)|0]|0) * 0.5 + +(HEAPU8[(offset_shad + x_offset + 2)|0]|0) * 0.5));

                    // half3 original = half3(0.36, 0.74, 0.18);
                    // half3 mycolor = half3(1, 0, 0);
                    // half value = 0.5;
                    // half3 result = original * value + mycolor * (1 - value);
                  }
                  else
                  {
                      // console.log('BBB ', HEAPU8[ (offset_shad + x_offset + 3)|0 ]);
                      // var range = (sad[ x_offset ] / 220) / 1.6;
                      alpha = +(HEAPU8[ (offset_shad + x_offset + 3)|0 ]|0) / 265.0; // / 255.0;

                      // darker by 10 points out of 255, always
//                      HEAPU8[ (offset_rgb + x_offset)|0 ]      = (HEAPU8[ (offset_rgb + x_offset)|0 ]|0)     - 10 + ~~FLOOR(+alpha * +(HEAPU8[ (offset_shad + x_offset)|0 ]|0) );
//                      HEAPU8[ (offset_rgb + x_offset + 1)|0 ]  = (HEAPU8[ (offset_rgb + x_offset + 1)|0 ]|0) - 10 + ~~FLOOR(+alpha * +(HEAPU8[ (offset_shad + x_offset + 1)|0 ]|0) );
//                      HEAPU8[ (offset_rgb + x_offset + 2)|0 ]  = (HEAPU8[ (offset_rgb + x_offset + 2)|0 ]|0) - 10 + ~~FLOOR(+alpha * +(HEAPU8[ (offset_shad + x_offset + 2)|0 ]|0) );

                      // by 15% darker
                      HEAPU8[ (offset_rgb + x_offset)|0 ]      = ~~FLOOR( +(HEAPU8[ (offset_rgb + x_offset)|0 ]|0) * 0.85 + +alpha * +(HEAPU8[ (offset_shad + x_offset)|0 ]|0) );
                      HEAPU8[ (offset_rgb + x_offset + 1)|0 ]  = ~~FLOOR( +(HEAPU8[ (offset_rgb + x_offset + 1)|0 ]|0) * 0.85 + +alpha * +(HEAPU8[ (offset_shad + x_offset + 1)|0 ]|0) );
                      HEAPU8[ (offset_rgb + x_offset + 2)|0 ]  = ~~FLOOR( +(HEAPU8[ (offset_rgb + x_offset + 2)|0 ]|0) * 0.85 + +alpha * +(HEAPU8[ (offset_shad + x_offset + 2)|0 ]|0) );


                      // HEAPU8[ (offset_rgb + x_offset)|0 ]      = HEAPU8[ (offset_rgb + x_offset)|0 ]     -1 + ~~FLOOR(+range * +(HEAPU8[ (offset_shad + x_offset)|0 ]|0) );
                      // HEAPU8[ (offset_rgb + x_offset + 1)|0 ]  = HEAPU8[ (offset_rgb + x_offset + 1)|0 ] -1 + ~~FLOOR(+range * +(HEAPU8[ (offset_shad + x_offset + 1)|0 ]|0));
                      // HEAPU8[ (offset_rgb + x_offset + 2)|0 ]  = HEAPU8[ (offset_rgb + x_offset + 2)|0 ] -1 + ~~FLOOR(+range * +(HEAPU8[ (offset_shad + x_offset + 2)|0 ]|0));
                      HEAPU8[ (offset_rgb + x_offset + 3)|0 ]  = 255;
                  }
            }
        }
        // --
    }

    function AsmLightNoShadow (byte_offset, image_offset) {
        byte_offset = byte_offset|0;
        image_offset = image_offset|0;

        var width = 0;
        var height = 0;
        var y = 0;
        var y_offset = 0;
        var x = 0;
        var x_offset = 0;
        var y_double = 0.0;
        var x_double = 0.0;
        var temp = 0.0;
        var temp2 = 0.0;
        var temp3 = 0.0;

        var color_r = 0;
        var color_g = 0;
        var color_b = 0;

        width = ~~FLOOR(+HEAPF32[((byte_offset + 2)<<3)>>3]);
        height = ~~FLOOR(+HEAPF32[((byte_offset + 3)<<3)>>3]); // 35

        //3x3 --> 9 * 4 = 32 values starting at 36
        byte_offset = 36;

        for (y = 0; (y|0) < (height|0); y = (y+1)|0) {
            y_offset = MULT(MULT(y|0, width|0)|0, 4|0);

            for (x = 0; (x|0) < (width|0); x = (x+1)|0) {
                x_offset = ((y_offset|0) + (MULT(x|0, 4|0)|0))|0;

                // form value based on (4) closest neighbors
                y_double = +(y|0) / +(height|0);
                x_double = +(x|0) / +(width|0);

                color_r = HEAPU8[ (image_offset + x_offset)|0 ]|0;
                color_g = HEAPU8[ (image_offset + x_offset + 1)|0 ]|0;
                color_b = HEAPU8[ (image_offset + x_offset + 2)|0]|0;

                // ----------------------- // top left
                temp = 0.5 - +SQRT(x_double * x_double + y_double * y_double);
                if (temp > 0.01) {
                    temp = +(temp * 2.0);
                
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 1)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 2)|0 ]|0) * temp))|0;
                }

                // ---------------- top middle
                temp2 = x_double - 0.5;
                temp = 0.5 - +SQRT(temp2 * temp2 + y_double * y_double);
                if (temp > 0.01) {
                    temp = +(temp * 2.0);
                
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 4)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 5)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 6)|0 ]|0) * temp))|0;
                }

                // ----------------- top right
                temp2 = x_double - 1.0;
                temp = 0.5 - +SQRT(temp2 * temp2 + y_double * y_double);
                if (temp > 0.01) {
                    temp = +(temp * 2.0);
                
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 8)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 9)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 10)|0 ]|0) * temp))|0;
                }

                // ----------------- middle left
                temp2 = y_double - 0.5;
                temp = 0.5 - +SQRT(x_double * x_double + temp2 * temp2);
                if (temp > 0.01) {
                    temp = +(temp * 2.0);
                
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 12)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 13)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 14)|0 ]|0) * temp))|0;
                }


                // ----------------- middle center
                temp2 = x_double - 0.5;
                temp3 = y_double - 0.5;
                temp = 0.5 - +SQRT(temp2 * temp2 + temp3 * temp3);
                if (temp > 0.01) {
                    temp = +(temp * 2.0);
                
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 16)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 17)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 18)|0 ]|0) * temp))|0;
                }


                // ----------------- middle right
                temp2 = x_double - 1.0;
                temp3 = y_double - 0.5;
                temp = 0.5 - +SQRT(temp2 * temp2 + temp3 * temp3);
                if (temp > 0.01) {
                    temp = +(temp * 2.0);
                
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 20)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 21)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 22)|0 ]|0) * temp))|0;
                }


                // ----------------- bottom left
                temp2 = y_double - 1.0;
                temp = 0.5 - +SQRT(x_double * x_double + temp2 * temp2);
                if (temp > 0.01) {
                    temp = +(temp * 2.0);
                
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 24)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 25)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 26)|0 ]|0) * temp))|0;
                }

                // ----------------- bottom center
                temp2 = x_double - 0.5;
                temp3 = y_double - 1.0;
                temp = 0.5 - +SQRT(temp2 * temp2 + temp3 * temp3);
                if (temp > 0.01) {
                    temp = +(temp * 2.0);
                
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 28)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 29)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 30)|0 ]|0) * temp))|0;
                }


                // ----------------- bottom right
                temp2 = x_double - 1.0;
                temp3 = y_double - 1.0;
                temp = 0.5 - +SQRT(temp2 * temp2 + temp3 * temp3);
                if (temp > 0.01) {
                    temp = +(temp * 2.0);
                
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 32)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 33)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 34)|0 ]|0) * temp))|0;
                }


                // read values from the 3/3 entry...
                HEAPU8[ (image_offset + x_offset)|0 ] = MIN(255|0, color_r|0);
                HEAPU8[ (image_offset + x_offset + 1)|0 ] = MIN(255|0,color_g|0);
                HEAPU8[ (image_offset + x_offset + 2)|0] = MIN(255|0,color_b|0);
                //HEAPU8[ (image_offset + x_offset + 3)|0 ] = HEAPU8[ (byte_offset + 3)|0 ];
            }
        }
    }

    function AsmShadowColor (byte_offset, image_offset) {
        byte_offset = byte_offset|0;
        image_offset = image_offset|0;

        var width = 0;
        var height = 0;
        var y = 0;
        var y_offset = 0;
        var x = 0;
        var x_offset = 0;
        var y_double = 0.0;
        var x_double = 0.0;
        var temp = 0.0;
        var temp2 = 0.0;
        var temp3 = 0.0;

        var color_r = 0;
        var color_g = 0;
        var color_b = 0;

        width = ~~FLOOR(+HEAPF32[((byte_offset + 2)<<3)>>3]);
        height = ~~FLOOR(+HEAPF32[((byte_offset + 3)<<3)>>3]); // 35

        //3x3 --> 9 * 4 = 32 values starting at 36
        byte_offset = 36;

        for (y = 0; (y|0) < (height|0); y = (y+1)|0) {
            y_offset = MULT(MULT(y|0, width|0)|0, 4|0);

            for (x = 0; (x|0) < (width|0); x = (x+1)|0) {
                  x_offset = ((y_offset|0) + (MULT(x|0, 4|0)|0))|0;

                  // console.log( (HEAPU8[(image_offset + x_offset)|0]|0),  (HEAPU8[(image_offset + x_offset + 1)|0]|0),
                  // (HEAPU8[(image_offset + x_offset + 2)|0]|0),  (HEAPU8[(image_offset + x_offset + 3)|0]|0) );

                  if ((HEAPU8[(image_offset + x_offset + 3)|0]|0) > 30) {

                    // form value based on (4) closest neighbors
                    y_double = +(y|0) / +(height|0);
                    x_double = +(x|0) / +(width|0);

                    // ----------------------- // top left
                    temp = 0.5 - +SQRT(x_double * x_double + y_double * y_double);
                    if (temp < 0.0) {
                        temp = 0.0;
                    } else {
                      temp = +(temp * 2.0);
                    }

                    // add the color...
                    color_r = ~~FLOOR(+(HEAPU8[ (byte_offset)|0 ]|0) * temp);
                    color_g = ~~FLOOR(+(HEAPU8[ (byte_offset + 1)|0 ]|0) * temp);
                    color_b = ~~FLOOR(+(HEAPU8[ (byte_offset + 2)|0 ]|0) * temp);

                    // ---------------- top middle
                    temp2 = x_double - 0.5;
                    temp = 0.5 - +SQRT(temp2 * temp2 + y_double * y_double);
                    if (temp < 0.0) {
                        temp = 0.0;
                    } else {
                      temp = +(temp * 2.0);
                    }

                    // add the color...
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 4)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 5)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 6)|0 ]|0) * temp))|0;


                    // ----------------- top right
                    temp2 = x_double - 1.0;
                    temp = 0.5 - +SQRT(temp2 * temp2 + y_double * y_double);
                    if (temp < 0.0) {
                        temp = 0.0;
                    } else {
                      temp = +(temp * 2.0);
                    }

                    // add the color...
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 8)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 9)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 10)|0 ]|0) * temp))|0;

                    // ----------------- middle left
                    temp2 = y_double - 0.5;
                    temp = 0.5 - +SQRT(x_double * x_double + temp2 * temp2);
                    if (temp < 0.0) {
                        temp = 0.0;
                    } else {
                      temp = +(temp * 2.0);
                    }

                    // add the color...
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 12)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 13)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 14)|0 ]|0) * temp))|0;


                    // ----------------- middle center
                    temp2 = x_double - 0.5;
                    temp3 = y_double - 0.5;
                    temp = 0.5 - +SQRT(temp2 * temp2 + temp3 * temp3);
                    if (temp < 0.0) {
                        temp = 0.0;
                    } else {
                      temp = +(temp * 2.0);
                    }

                    // add the color...
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 16)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 17)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 18)|0 ]|0) * temp))|0;


                    // ----------------- middle right
                    temp2 = x_double - 1.0;
                    temp3 = y_double - 0.5;
                    temp = 0.5 - +SQRT(temp2 * temp2 + temp3 * temp3);
                    if (temp < 0.0) {
                        temp = 0.0;
                    } else {
                      temp = +(temp * 2.0);
                    }

                    // add the color...
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 20)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 21)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 22)|0 ]|0) * temp))|0;


                    // ----------------- bottom left
                    temp2 = y_double - 1.0;
                    temp = 0.5 - +SQRT(x_double * x_double + temp2 * temp2);
                    if (temp < 0.0) {
                        temp = 0.0;
                    } else {
                      temp = +(temp * 2.0);
                    }

                    // add the color...
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 24)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 25)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 26)|0 ]|0) * temp))|0;



                    // ----------------- bottom center
                    temp2 = x_double - 0.5;
                    temp3 = y_double - 1.0;
                    temp = 0.5 - +SQRT(temp2 * temp2 + temp3 * temp3);
                    if (temp < 0.0) {
                        temp = 0.0;
                    } else {
                      temp = +(temp * 2.0);
                    }

                    // add the color...
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 28)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 29)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 30)|0 ]|0) * temp))|0;


                    // ----------------- bottom right
                    temp2 = x_double - 1.0;
                    temp3 = y_double - 1.0;
                    temp = 0.5 - +SQRT(temp2 * temp2 + temp3 * temp3);
                    if (temp < 0.0) {
                        temp = 0.0;
                    } else {
                      temp = +(temp * 2.0);
                    }

                    // add the color...
                    color_r = (color_r + ~~FLOOR(+(HEAPU8[ (byte_offset + 32)|0 ]|0) * temp))|0;
                    color_g = (color_g + ~~FLOOR(+(HEAPU8[ (byte_offset + 33)|0 ]|0) * temp))|0;
                    color_b = (color_b + ~~FLOOR(+(HEAPU8[ (byte_offset + 34)|0 ]|0) * temp))|0;

                    // read values from the 3/3 entry...
                    HEAPU8[ (image_offset + x_offset)|0 ] = MIN(255|0, color_r|0);
                    HEAPU8[ (image_offset + x_offset + 1)|0 ] = MIN(255|0, color_g|0);
                    HEAPU8[ (image_offset + x_offset + 2)|0] = MIN(255|0, color_b|0);
                    //HEAPU8[ (image_offset + x_offset + 3)|0 ] = HEAPU8[ (byte_offset + 3)|0 ];
                  }
            }
        }
        // --
        // --
    }


    function AsmLightApply (byte_offset) {
        byte_offset = byte_offset|0;

        var width = 0;
        var height = 0;
        var node_width = 0;
        var node_height = 0;
        var shadow_offset = 0;


        var DdN = 0.0;
        var DdQxE2 = 0.0;
        var QdN = 0.0;
        var DdE1xQ = 0.0;
        var intersects = 0;
        var alpha_mask = 0;

        var sign = 0;

        var y = 0;
        var y_offset = 0;
        var x = 0;
        var x_offset = 0;
        var k = 0;
        var v = 0;

        var curr_vertex_x = 0.0;
        var curr_vertex_y = 0.0;
        var curr_vertex_z = 0.0;

        var coords_x = 0;
        var coords_y = 0;

        var ray_direction_x = 0.0;
        var ray_direction_y = 0.0;
        var ray_direction_z = 0.0;

        var ray_origin_x = 0.0;
        var ray_origin_y = 0.0;
        var ray_origin_z = 0.0;

        var intersection_count = 0;
        var temp = 0.0;
        var temp_int = 0;
        var temp_int2 = 0;
        var offset = 0;

        var triangles = 0;


        ray_origin_x = +HEAPF32[48 >> 3];
        ray_origin_y = +HEAPF32[56 >> 3];
        ray_origin_z = +HEAPF32[64 >> 3];


        node_width = ~~FLOOR(+HEAPF32[(byte_offset<<3)>>3]);
        node_height = ~~FLOOR(+HEAPF32[(byte_offset + 1)<<3>>3]);
        width = ~~FLOOR(+HEAPF32[((byte_offset + 2)<<3)>>3]);
        height = ~~FLOOR(+HEAPF32[((byte_offset + 3)<<3)>>3]);

        shadow_offset = 2097152 - MULT(MULT(width|0, height|0)|0, 4|0)|0;
        // console.log( shadow_offset );

        offset = (byte_offset + 99)|0;
        intersection_count = ~~FLOOR(+HEAPF32[(offset<<3)>> 3]);

        offset = (offset + 42 + 1)|0; // 2 triangles

        intersection_count = ~~FLOOR(+HEAPF32[(offset<<3) >> 3]);

        offset = (offset + 1)|0;

        // 0, 1, 2      (main vector used to grab the poins)
        // 3, 4, 5      (copy of main vector)
        // 6, 7, 8      (light direction)
        // 9, 10, 11    (unused for tests)
        // 12, 13, 14   (unused for tests)

        // 16 - 31, te_temp  

        ////////////////////////////////////////
        //
        //-----------------------------------------
        // 32 - 33 width and of element
        // 34 - 35 width and height of shadow
        // ----------------------------------------
        // 36 - 51, node_matrix
        // 52 - 67, xxxxxxxxxxx 
        // 68 - 83, xxxxxxxxxxx
        // 84 - 99, xxxxxxxxxxx

        // 100 - 101 width and height
        // 102 - 117 world_arr_reversed
        // 118 - how many vertices (4 max)
        // 122 - 126 (vertices)
        //
        // 131     - how many triangles
        // 132 - 130 point_1
        // 135 - 133 point_2
        // 138 - 136 point_3
        // 141 - 139 point_edge
        // 144 - 142 -- triangle edge1
        // 147 - 145 -- triangle edge2
        // 151 - 153 -- triangle normal
        // -----------------------------------------
        // Triangles x 20
        //-----------------------------------------
        // 153 - How many elements we intersect
        // 154 - offsets of the intersecting elements
        // 155 ---------- (assuming 3)
        // 156 ----------
        //-------------------------------------------
        //  +16900   ([34]  * [35] * 4) for the image (Uint8Array though)
        //-------------------------------------------

        //-------------------------------------------
        //
        //-------------------------------------------

        for (y = 0; (y|0) < (height|0); y = (y+1)|0) {
            y_offset = MULT(MULT(y|0, width|0)|0, 4|0);

            for (x = 0; (x|0) < (width|0); x = (x+1)|0) {

                  //if (!drawn[ pos.x +'+'+pos.y ])
                  x_offset = ((y_offset|0) + (MULT(x|0, 4|0)|0))|0;
                  
                  // does not get called!
                  if ((HEAPU8[ (shadow_offset + x_offset)|0 ]|0) == (0|0)) continue;

                  curr_vertex_x =  (+(x|0) / +(width|0)  ) * +(node_width|0);
                  curr_vertex_y =  (+(y|0) / +(height|0) ) * +(node_height|0);
                  curr_vertex_z = 0.0;

                  curr_vertex_x = curr_vertex_x - +(node_width|0)/2.0;
                  curr_vertex_y = curr_vertex_y - +(node_height|0)/2.0;

                  // if (node_matrix) curr_vertex.applyMatrix4( node_matrix );
                  applyMatrix4(+curr_vertex_x, +curr_vertex_y, +curr_vertex_z, (byte_offset + 4)|0 );

                  curr_vertex_x = +HEAPF32[0 >> 3] + +(node_width|0)/2.0;
                  curr_vertex_y = +HEAPF32[8 >> 3] + +(node_height|0)/2.0;
                  curr_vertex_z = +HEAPF32[16 >> 3];

                  // if (top_matrix) curr_vertex.applyMatrix4( top_matrix );
                  applyMatrix4(+curr_vertex_x, +curr_vertex_y, +curr_vertex_z, (byte_offset + 4 + 16)|0 );

                  curr_vertex_x = +HEAPF32[0 >> 3];
                  curr_vertex_y = +HEAPF32[8 >> 3];
                  curr_vertex_z = +HEAPF32[16 >> 3];                  

                  // console.log("AAAA ", curr_vertex_x, curr_vertex_y, curr_vertex_z );

                  // ray_direction   = ray_direction.subtract ( ray_origin ).unit ();
                  ray_direction_x = curr_vertex_x - ray_origin_x;
                  ray_direction_y = curr_vertex_y - ray_origin_y;
                  ray_direction_z = curr_vertex_z - ray_origin_z;

                  // length --> Math.sqrt ( self.dot(self) )
                  temp = +SQRT(+ray_direction_x * +ray_direction_x + +ray_direction_y * +ray_direction_y + +ray_direction_z * +ray_direction_z);

                  // unit -> self.divide(self.length)
                  ray_direction_x = +ray_direction_x / +temp;
                  ray_direction_y = +ray_direction_y / +temp;
                  ray_direction_z = +ray_direction_z / +temp;



                      //// go through the ones we chose to aim
                      for (k = 0; (k|0) < (intersection_count|0); k = (k+1)|0)
                      {
                          temp_int = (offset + k)|0;
                          temp_int = (~~FLOOR(+HEAPF32[(temp_int<<3) >> 3]) )|0;
                          temp_int2 = temp_int|0;

                          alpha_mask = ~~FLOOR(+HEAPF32[((temp_int + 4)<<3) >> 3]);


                          temp_int = (temp_int + 99)|0;

                          triangles = ~~FLOOR(+HEAPF32[(temp_int<<3) >> 3]);
                          temp_int = (temp_int + 1 - 21 + 9)|0;

                          for (v = 0; (v|0) < (triangles|0); v = (v+1)|0)
                          {
                              temp_int = (temp_int + 21)|0;

                              DdN = +ray_direction_x * +HEAPF32[(temp_int + 9)<<3>> 3] + +ray_direction_y * +HEAPF32[(temp_int + 10)<<3>> 3] + +ray_direction_z * +HEAPF32[(temp_int + 11)<<3>> 3];
                              sign = 0;

                              // var DdN = ray_direction.dot( triangle_normal_01 );
                              // var sign = 0;
                              intersects = 1;

                              if ( +DdN < 0.0 ) {
                                sign = (-1|0);
                                DdN = - DdN;

                              } else if ( +DdN > 0.0 ) {
                                // intersects = 0;
                                // continue;

                                sign = 1|0;
                              } else {

                                intersects = 0;
                                continue;
                              }

                              /*
                              if ( +DdN > 0.0 ) {
                                // intersects = 0;
                                // continue;
                                sign = 1|0;
                              } else if ( +DdN < 0.0 ) {
                                sign = (-1|0);
                                DdN = - DdN;
                              } else {
                                intersects = 0;
                                continue;
                              }
                              */


                              // var diff = ray_origin.subtract (v1_a);
                              HEAPF32[0 >> 3] = +ray_origin_x - +HEAPF32[(temp_int)<<3>> 3];
                              HEAPF32[8 >> 3] = +ray_origin_y - +HEAPF32[(temp_int + 1)<<3>> 3];
                              HEAPF32[16 >> 3] = +ray_origin_z - +HEAPF32[(temp_int + 2)<<3>> 3];

                              HEAPF32[24 >> 3] = +HEAPF32[8 >> 3]  * +HEAPF32[(temp_int + 8)<<3>> 3] - +HEAPF32[16 >> 3] * +HEAPF32[(temp_int + 7)<<3>> 3];
                              HEAPF32[32 >> 3] = +HEAPF32[16 >> 3] * +HEAPF32[(temp_int + 6)<<3>> 3] - +HEAPF32[0 >> 3]  * +HEAPF32[(temp_int + 8)<<3>> 3];
                              HEAPF32[40 >> 3] = +HEAPF32[0 >> 3]  * +HEAPF32[(temp_int + 7)<<3>> 3] - +HEAPF32[8 >> 3]  * +HEAPF32[(temp_int + 6)<<3>> 3];

                              // var DdQxE2 = sign * ray_direction.dot( diff.cross( edge2_a ) );
                              DdQxE2 = +(sign|0) * +(+ray_direction_x * +HEAPF32[24 >> 3] + +ray_direction_y * +HEAPF32[32 >> 3] + +ray_direction_z * +HEAPF32[40 >> 3]);
                              QdN = 0.0;
                              DdE1xQ = 0.0;



                                      if ((intersects|0) == (1|0))
                                      {
                                        if ( +DdQxE2 < 0.0 )
                                        {
                                            intersects = 0;
                                            continue;
                                        }
                                        else
                                        {
                                              HEAPF32[24 >> 3] = +HEAPF32[(temp_int + 4)<<3>> 3] * +HEAPF32[16 >> 3] - +HEAPF32[(temp_int + 5)<<3>> 3] * +HEAPF32[8 >> 3];
                                              HEAPF32[32 >> 3] = +HEAPF32[(temp_int + 5)<<3>> 3] * +HEAPF32[0 >> 3] - +HEAPF32[(temp_int + 3)<<3>> 3] * +HEAPF32[16 >> 3];
                                              HEAPF32[40 >> 3] = +HEAPF32[(temp_int + 3)<<3>> 3] * +HEAPF32[8 >> 3] - +HEAPF32[(temp_int + 4)<<3>> 3] * +HEAPF32[0 >> 3];

                                              DdE1xQ = +(sign|0) * +(+ray_direction_x * +HEAPF32[24 >> 3] + +ray_direction_y * +HEAPF32[32 >> 3] + +ray_direction_z * +HEAPF32[40 >> 3]);
                                              //DdE1xQ = sign * ray_direction.dot( edge1_a.cross( diff ) );

                                              if ( +DdE1xQ < 0.0 )
                                              {
                                                // aou_debug && console.log( 'NOINTER  DdE1xQ negative', DdE1xQ, sign);
                                                intersects = 0;
                                                continue;
                                              }
                                              else
                                              {
                                                    if (+DdQxE2 + +DdE1xQ > +(DdN + 1.0) ) // DdQxE2 + DdE1xQ - DdN > 1 && DdQxE2 + DdE1xQ - DdN < 300) // DdQxE2 + DdE1xQ > DdN )
                                                    {
                                                      intersects = 0;
                                                      continue;
                                                    }
                                                    else
                                                    {

                                                        QdN = +(-sign|0) * +(+HEAPF32[0 >> 3] * +HEAPF32[(temp_int + 9)<<3>> 3] + +HEAPF32[8 >> 3] * +HEAPF32[(temp_int + 10)<<3>> 3] + +HEAPF32[16 >> 3] * +HEAPF32[(temp_int + 11)<<3>> 3]);
                                                        // QdN = +(-sign) * diff.dot( triangle_normal_01 );
                                                        if ( +QdN < 0.0 )
                                                        {
                                                          intersects = 0;
                                                          continue;
                                                        }
                                                    }
                                              }
                                              // -
                                        }
                                      }


                                      if ((intersects|0) == (1|0))
                                      {

                                        temp = +QdN / +DdN;

                                        HEAPF32[24 >> 3]  = +(ray_direction_x * temp) + +ray_origin_x;
                                        HEAPF32[32 >> 3]  = +(ray_direction_y * temp) + +ray_origin_y;
                                        HEAPF32[40 >> 3] = +(ray_direction_z * temp) + +ray_origin_z;

                                        // +SQRT(+
                                        HEAPF32[0 >> 3] = +ray_origin_x - +HEAPF32[24 >> 3];
                                        HEAPF32[8 >> 3] = +ray_origin_y - +HEAPF32[32 >> 3];
                                        HEAPF32[16 >> 3] = +ray_origin_z - +HEAPF32[40 >> 3];

                                        temp = 5.0 + +SQRT(+HEAPF32[0 >> 3] * +HEAPF32[0 >> 3] + +HEAPF32[8 >> 3] * +HEAPF32[8 >> 3] + +HEAPF32[16 >> 3] * +HEAPF32[16 >> 3]);

                                        // var new_dist = DistanceVector(ray_origin, temp_vec) + 5;
                                        HEAPF32[0 >> 3] = +ray_origin_x - +curr_vertex_x;
                                        HEAPF32[8 >> 3] = +ray_origin_y - +curr_vertex_y;
                                        HEAPF32[16 >> 3] = +ray_origin_z - +curr_vertex_z;

                                        HEAPF32[0 >> 3] = +SQRT(+HEAPF32[0 >> 3] * +HEAPF32[0 >> 3] + +HEAPF32[8 >> 3] * +HEAPF32[8 >> 3] + +HEAPF32[16 >> 3] * +HEAPF32[16 >> 3]);

                                        if (+temp < +HEAPF32[0 >> 3])
                                        {
                                            break;
                                        }
                                        else
                                        {
                                            intersects = 0;
                                            continue;
                                        }
                                      }
                                      // ---------
                          }


                          if ((intersects|0) == 1)
                          {
                            if ((alpha_mask|0) != 0)
                            {
                              // -------------------------
                              applyMatrix4(+HEAPF32[24 >> 3], +HEAPF32[32 >> 3], +HEAPF32[40 >> 3], (temp_int2 + 5)|0);
                              coords_x = ~~FLOOR(+HEAPF32[0 >> 3]);
                              coords_y = ~~FLOOR(+HEAPF32[8 >> 3]);

                              // read alpha mask value now...
                              if ((HEAPU8[alpha_mask + MULT( coords_y|0, ~~FLOOR(+HEAPF32[(temp_int2<<3)>>3])) + coords_x|0 ]|0) < 29)
                              {
                                continue;
                              }
                              //----
                            }

                            // check if we hit a blank frame
                            HEAPU8[ (shadow_offset + x_offset)|0 ] = 0;
                            HEAPU8[ (shadow_offset + x_offset + 1)|0 ] = 0;
                            HEAPU8[ (shadow_offset + x_offset + 2)|0] = 0;
                            HEAPU8[ (shadow_offset + x_offset + 3)|0 ] = 0;

                            break;
                          }
                          // now we can access the triangle information
                      }
                      // ENDOF triangles for
                      // ----
            }
        }
        // ENDOF x,y for
        // ----
    }

    return { AsmLightApply: AsmLightApply,
             AsmColorMix: AsmColorMix,
             AsmShadowColor: AsmShadowColor,
             AsmLightNoShadow:AsmLightNoShadow,
             AsmBlur: AsmBlur };
  }

  var ASM_HEAP = new ArrayBuffer( 2097152 );
  var ASM_stdlib = { Math: Math, Float64Array: Float64Array, Uint8Array: Uint8Array, Uint32Array: Uint32Array };
  var ASM_LIB = new ASMLightMerge (ASM_stdlib, null, ASM_HEAP);



  ///////////////////////////////////////////////////////
  // MAIN VARS
  var DEBUG = GAME.DEBUG;

  // refferences to current level and game objects
  var LEVEL = null,
      GAME_OBJ = null;

  // most common shadow map values
  var SHADOW_W = 65, SHADOW_H = 65;

  // Fov matrix
  // var FOV_MAT = [1.0000000000000002, 0, 0, 0, 0, 1.0000000000000002, 0, 0, 0, 0, -1.0100502512562815, -1, 0, 0, -20.100502512562816, 0];

  // fov 60 - [1.237179148263484, 0, 0, 0, 0, 1.7320508075688774, 0, 0, 0, 0, -1.002002002002002, -1, 0, 0, -2.002002002002002, 0]
  // fov 90 - [0.7093184979137692, 0, 0, 0, 0, 1.0000000000000002, 0, 0, 0, 0, -1.002002002002002, -1, 0, 0, -2.002002002002002, 0]
  // fov 90 - 5k dist - [0.7142857142857144, 0, 0, 0, 0, 1.0000000000000002, 0, 0, 0, 0, -1.0004000800160031, -1, 0, 0, -2.000400080016003, 0]
  // fov 40 - [1.962483871039016, 0, 0, 0, 0, 2.7474774194546225, 0, 0, 0, 0, -1.002002002002002, -1, 0, 0, -2.002002002002002, 0];


  // fov 40, 1000 distance, 1.41 aspect - 1.9403849094557126, 0, 0, 0, 0, 2.7474774194546225, 0, 0, 0, 0, -1.002002002002002,  -1, 0, 0, -2.002002002002002, 0
  // fov 40, 10000 dist, 1.41 aspect -    1.9403849094557126, 0, 0, 0, 0, 2.7474774194546225, 0, 0, 0, 0, -1.0002000200020003, -1, 0, 0, -2.000200020002, 0
  var FOV_MAT = [1.0000000000000002, 0, 0, 0, 0, 1.0000000000000002, 0, 0, 0, 0, -1.0100502512562815, -1, 0, 0, -20.100502512562816, 0];

  // ortho
  //FOV_MAT = [0.0024160786829163995, 0, 0, 0, 0, 0.0033333333333333335, 0, 0, 0, 0, -0.002352941176470588, 0, -0, -0, -1.352941176470588, 1];

  var FOV_MAT_SELF_40 = [1.9403849094557126, 0, 0, 0, 0, 2.7474774194546225, 0, 0, 0, 0, -1.0002000200020003, -1, 0, 0, -2.000200020002, 0]; // 40 fov
  var FOV_MAT_SELF_45 = [1.7050198598399948, 0, 0, 0, 0, 2.414213562373095, 0, 0, 0, 0, -1.0002000200020003, -1, 0, 0, -2.000200020002, 0]; // 45 fov

  var FOV_MAT_SELF_37= [2.1096599737008654, 0, 0, 0, 0, 2.988684962742893, 0, 0, 0, 0, -1.001001001001001, -1, 0, 0, -1.001001001001001, 0];

  ///////////////////////////////////////////////////////
  // MAIN DOM ELEMENTS
  var EL_CAM = d.getElementById ( 'move' ); // player viewport



  ///////////////////////////////////////////////////////
  // HELPER FUNCTIONS

  // sets a timeout, and on the next render-call calls the callback
  var _TimeoutFrame = function ( time, callback ) {
    setTimeout (function() {
      w.requestAnimationFrame ( callback );
    }, time);
  };

  // css transform -> matrix function
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

  GAME.UTILS.GetMatrixCSS = _GetMatrixCSS;




  ///////////////////////////////////////////////////////
  // MAIN LOGIC

  // Request Build Level - called when level is ready to be loaded
  GAME.On ('ReqBuildLevel', function ( level, game_obj ) {
      var TIMER = 0;

      // overwriting the main vars
      LEVEL    = level;
      GAME_OBJ = game_obj;

      // parsing and preparing the level map
      var main_node_id = LEVEL.MAP.MAIN;
      _makeNodeWorldConnections ({
          x: 0, y: 0, z: 0,
          connected:[ { id: main_node_id, source: 0, target: 0 } ]
        },
        {
          connections:[ { x: 250,y: 250, z: 0 } ]
        }
      );

      // parsing and preparing the level map
      _makeNodeObjects (LEVEL.MAP.NODES);
      _InitLevelSounds (LEVEL.MAP.SOUNDS);
      _makeTriggers (LEVEL.MAP.TRIGGERS);
      _InitLevelLights (LEVEL.MAP.LIGHTS);

      TIMER = window.performance.now();
      makeLights (LEVEL.MAP, LEVEL.ACTIVE_MAP, 1000);
      console.log('PERF 555--   ', (window.performance.now () - TIMER ) >> 0 );

      // waiting 160ms and starting the level (in case gc is firing)
      _TimeoutFrame ( 160, function () {
            GAME.State.loading = false;
            GAME.State.loaded = true;

            // load complete!
            GAME.Fire ('DidLoad');

            if (GAME.State.running) { /*debugger;*/ GAME.Fire ('ReqStart', 1); }
      });
  });

  // Request Start -- kickstarts the level
  GAME.On ( 'ReqStart', function () {
      if (GAME.LEVEL !== LEVEL) return ;

      GAME.Fire ( 'level_DidLoad', GAME.LEVEL );

      // set default rotation
      if (GAME.LEVEL.MOVE) GAME.Fire ( 'ReqSetRot', GAME.LEVEL.MOVE );

      GAME.LEVEL.INIT ( LEVEL );

      _makeWalls (LEVEL.WALLS, LEVEL.MAP.NODES, LEVEL.BEACON);
  });


  GAME.On ( 'ReqBeacon', function () {
    GAME.LEVEL.WALLS = [];
    _makeWalls (GAME.LEVEL.WALLS, GAME.LEVEL.MAP.NODES, GAME.LEVEL.BEACON);
  });


  // ####
  var frustrum_skip = 9, frustrum_clear = 0;
  var cam_mat = new Float32Array (16);
  GAME.On ('level_DidLoad', function ( lvl ) {
    if (lvl !== LEVEL) return ;

    GAME.LOG (1, "LOADED LEVEL");

    var skip = false;
    var vv = new Vector();
    var subv = new Vector();
    var mat_rev_c = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    GAME.__camera = function ( degx ) {
      // return ;

      if (skip) {
        skip = false;
        return ;
      }
      skip = true;

      var te = FOV_MAT;


      // compute matrix ourselves
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

      GAME.OnRender && GAME.OnRender ();

//      yyy = window.performance.now();
//      var matrixstyle = 'translate3d(' + GAME.DIMS.pos.x + 'px,0px,'+GAME.DIMS.pos.z+'px) rotateY(' + (-GAME.DIMS.deg.y) + 'deg) rotateX(' + (-GAME.DIMS.deg.x) + 'deg)';
//      var matrix3d = _GetMatrixCSS (matrixstyle);
//      console.log('PERF NATIVE ', (window.performance.now () - yyy ) );

//      console.log( matrixstyle );
//      console.log( '----------' );
//      console.log( matrix3d );
//      console.log( cam_mat );
//      console.log( '----------' );

      GetInverse2( mat_rev_c, cam_mat );

      var to_remove = [];
      var to_add = [];
      // var beacons = {};

      var lit_dist_min = GAME.State.perf.dist_min;
      var lit_dist_max = GAME.State.perf.dist_max;

      // run for each group
//      var lit_id = '0';
//      if (GAME.LEVEL.BEACON) lit_id = GAME.LEVEL.BEACON;
//      var LIT_NODES = LEVEL.LIT[lit_id];

      var LIT_NODES = LEVEL.LIT;

      for (var i = 0; i < LIT_NODES.length; ++i)
      {
          var lit = LIT_NODES[i];
          var visible = true;

          if (lit.face_camera)
          {
              vv.x = lit.centroid.x;
              vv.y = lit.centroid.y;
              vv.z = lit.centroid.z;


              // testing actual ray intersection
              /*
              vv.applyMatrix4( mat_rev_c ).applyMatrix4( FOV_MAT_SELF_37 );
              if ( Math.abs(vv.x) < 1.01 && Math.abs(vv.y) < 1.01 && vv.z < 1.0001 ) {
                // console.log("vis", true, vv );

                // flatten to screen...
                var widthHalf = 0.5*816;
                var heightHalf = 0.5*576;
                var xxx = ( vv.x * widthHalf ) + widthHalf;
                var yyy = - ( vv.y * heightHalf ) + heightHalf;

                if (!window.shit)
                {
                    window.shit = document.createElement('div');
                    window.shit.id = 'shit';
                    var sss = document.getElementById('scn-cntr');
                    window.shit.style.cssText = 'margin-left:-6px;margin-top:-6px;width:12px;height:12px;position:absolute;z-index:999;background:red;';
                    sss.appendChild( window.shit );
                }

                window.shit.style.left = (xxx >> 0) + 'px'; 
                window.shit.style.top = (576 - (yyy >> 0) + 4) + 'px';

              } else {
                // console.log("vis", false, vv );
              }
              */


              /*
              // ORIGINAL!!!
              vv.applyMatrix4( mat_rev ).applyMatrix4( te );
              if (Math.abs(vv.z) >= 0.9999)
              {
                visible = false;
                // console.log("vis", visible, vv.z );
              }
              else
              {
                visible = true;
                // console.log("vis", visible, vv.z );
              }
              */

              // new 
              var dist_camera = 0;
              visible = false;
              vv.applyMatrix4( mat_rev_c ).applyMatrix4( FOV_MAT_SELF_45 );

              if ( Math.abs(vv.x) < 1.01 && vv.z < 1.0001 )
              {
                dist_camera = subv.subtractReuse(lit.centroid, GAME.DIMS.pos).length ();

                if (dist_camera < 143 || Math.abs(vv.y) < 1.01) {
                  visible = true;
                }
              }
              // console.log("vis", visible, lit.centroid.subtract(GAME.DIMS.pos).length (), vv );


              if (visible)
              {
                // var dist_camera = lit.centroid.subtract(GAME.DIMS.pos).length ();
                if(dist_camera < 386)
                {
                  if (!lit.is_close) {
                    lit.el.classList.add('cl');
                    lit.is_close = true;
                  }
                  // -
                }
                else if (dist_camera > 960)
                {
                  visible = false;
                  lit.el.classList.add('no-anim');
                }
                else
                {
                  if (lit.is_close) {
                    lit.el.classList.remove('cl');
                    lit.is_close = false;
                  }
                  // ---
                }
              }

              if (!lit.in_view && visible) lit.el.classList.remove('no-anim'); 
              else if (lit.in_view && !visible) lit.el.classList.add('no-anim');

              lit.in_view = visible;

              if (visible)
              {
                if (!lit.orig_trans)
                {
                  lit.orig_trans = lit.el.style.transform;
                }

                var new_trans = lit.orig_trans + ' rotateY(' + (degx) + 'deg)';

                if (lit.face_camera === 2)
                {
                  new_trans += ' rotateX(' + (-GAME.DIMS.deg.x) + 'deg)';
                }
                if (lit.el.style.transform !== new_trans)
                    lit.el.style.transform = new_trans;
              }
          }
          else
          {
                if (frustrum_skip > 0)
                {
                    continue;
                }

                if (!lit.remove && lit.remove !== 0) lit.remove = 3;


// #### 
              if (GAME.LEVEL.BEACON && lit.beacon) // !== GAME.LEVEL.beacon)
              {
                  if (lit.beacon.indexOf(GAME.LEVEL.BEACON) === -1)
                  {
                              if( lit.in_view )
                              {
                                lit.in_view = false;
                                lit.remove = 0;
                                to_remove.push ( lit.el );
                              }

                              continue;
                  }
              }



              // first check how far we are from the node.
              var dist = subv.subtractReuse (lit.centroid, GAME.DIMS.pos ).length ();

              // sort elements based on their distance here?

              // if greater than 1600 in distance, hide even if visible.
              if (dist > (lit.hide_dist_max || lit_dist_max))
              {
                  // if we are not too close and are in the dom. Hide!
                  if (lit.in_view)
                  {
                    lit.in_view = false;
                    lit.remove = 0;
                    to_remove.push ( lit.el );

                    if (lit.hide_frustrum > 1)
                    {
                        var frustrum_cb = GAME.LEVEL.MAP.FRUSTRUM[lit.hide_frustrum];
                        if (frustrum_cb) frustrum_cb (lit, 0);
                    }
                  }

                  continue;
              }

              var projection_matrix = FOV_MAT_SELF_45;
              if (lit.hide_fov) projection_matrix = FOV_MAT_SELF_40;

              // check if the element is visible on screen
              vv.x = lit.centroid.x;
              vv.y = lit.centroid.y;
              vv.z = lit.centroid.z;

              vv.applyMatrix4( mat_rev_c ).applyMatrix4( projection_matrix );
              vv.x = Math.abs (vv.x);
              vv.y = Math.abs (vv.y);

              if ( vv.x < 1.01 && vv.y < 1.01 && vv.z < 1.0001 ) {
                visible = true;
              }
              else {
                visible = false;
              }


              if (!visible && (dist < lit_dist_min || (vv.x < 1.12 && vv.y < 1.1) ) )
              {
                if (lit.vertices)
                {
                  for (var tu = 0; tu < lit.vertices.length; ++tu)
                  {
                      vv.x = lit.vertices[ tu ].x;
                      vv.y = lit.vertices[ tu ].y;
                      vv.z = lit.vertices[ tu ].z;

                      vv.applyMatrix4( mat_rev_c ).applyMatrix4( projection_matrix );

                      if ( Math.abs (vv.x) < 0.96 && Math.abs (vv.y) < 0.96 && vv.z < 1.0001 )
                      {
                        visible = true;
                        break;
                      }
                  }
                }

                
                // if still hidden, turn invisible, even though it it very close
                //if (!visible && lit.in_view & lit.hide_frustrum > 1)
                //{
                //      var frustrum_cb = GAME.LEVEL.MAP.FRUSTRUM[lit.hide_frustrum];
                //      if (frustrum_cb) frustrum_cb (lit, 0);
                //}
              }
              //  ---------


              // if hidden and now is asked to become visible
              if (!lit.in_view && visible)
              {
                    lit.remove = 2;
                    to_add.push ( lit.el );
              }

              // if visible, and now is asked to be hidden
              else if (lit.in_view && !visible)
              {
                  // if we are not too close and are in the dom. Hide!
                  if( dist > (lit.dist_hide || lit_dist_min) )
                  {
                      if (--lit.remove === 0) {
                        // visible = false;
                        lit.in_view = false;
                        to_remove.push ( lit.el );

                        continue;
                      }
                      else {
                        visible = true;
                      }
                  }
                  else
                  {
                    // else keep as visible. We are too close to the camera to risk it.
                    visible = true;
                  }
              }


              if (visible && lit.hide_frustrum > 1)
              {
                if (dist > 1040) // if we are far, but not too far to be removed. Mark us as inactive
                {
                    var frustrum_cb = GAME.LEVEL.MAP.FRUSTRUM[lit.hide_frustrum];
                    if (frustrum_cb) frustrum_cb (lit, 0);
                }
                else
                {
                    // activate us back!
                    var frustrum_cb = GAME.LEVEL.MAP.FRUSTRUM[lit.hide_frustrum];
                    if (frustrum_cb) frustrum_cb (lit, 1);
                }
              }


              lit.in_view = visible;
          }
          // ----
      }

      if (--frustrum_skip === -1)
      {
        frustrum_skip = GAME.LEVEL.SETTINGS.FRUSTRUM_SKIP;
      }

        if (to_remove.length > 0)
        {
                    for (var m = 0; m < to_remove.length;++m)
                    {
                      move.removeChild (to_remove[m]);
                    }
        }

        if (to_add.length > 0)
        {
                    for (var m = 0; m < to_add.length;++m)
                    {
                       move.appendChild (to_add[m]);
                    }
        }
        //

      
      // -
    };
  });

  // ENDOF MAIN LOGIC
  ///////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////
  // GEOMETRY LOGIC

  // returns the node  by its unique node id
  function _GetNodeById ( id ) {
    var node = LEVEL.MAP.NODES[ id ];
    if (!node) return (null);

    return (node);
  }

  // returns the node type/template by the type id
  function _GetNodeType ( type ) {
    var type = GAME_OBJ[ type ];
    if (!type) return (null);

    // init if needed
    if (type.canvas) return (type);

    var w = type.width || SHADOW_W;
    var h = type.height || SHADOW_H;

    if (type.cwidth) {
        w = type.cwidth;
        h = type.cheight;
    }

    if (type.qv)
    {
          // var modify = false;
          if (type.qv === 256)
          {
            if (w > 256 || h > 256)
            {
              w = (w / 2) >> 0;
              h = (h / 2) >> 0;

              // modify = true;
            }
          }
          else if (type.qv === 1)
          {
            w = (w / 2) >> 0;
            h = (h / 2) >> 0;

            // modify = true;
          }

          /*
          if (modify)
          {
              // if (w % 2 === 0) w += 1;
              // if (h % 2 === 0) h += 1;

              if (!type.width) {
                type.width = w;
                type.height = h;
              }
          }
          */
    }

    // create a canvas for this element -- as big as it's requested dimensions
    var c = d.createElement ('canvas');
    c.width = w; c.height = h;
    type.canvas = c;

    return (type);
  };

  // buids the vertices and connections for geometry
  function _InitNodeTypeWorld ( type ) {
    if (type.connections) return (type);
    if (type.transform === '') type.transform = 'translate3d(0,0,0)';

    var matrix3d = _GetMatrixCSS (type.transform);
    var verts = [
      new Vector( 0,           type.height, 0),
      new Vector( type.width,  type.height, 0),
      new Vector( type.width,  0,           0),
      new Vector( 0,           0,           0)
    ];

    for (var i = 0; i < verts.length; ++i)
    {
      var curr = verts[i];
                
      curr.x -= type.width / 2;
      curr.y -= type.height / 2;
      curr.applyMatrix4 ( matrix3d );
      curr.x += type.width / 2;
      curr.y += type.height / 2;
    }

    type.vertices = verts;

    // now do the connections
    var edges = [
      // top
      new Vector( type.width / 2, 0, 0),

      // right
      new Vector( type.width, type.height / 2, 0),

      // bottom
      new Vector( type.width / 2, type.height, 0),

      // left
      new Vector( 0, type.height / 2, 0)
    ];

    for (var i = 0; i < edges.length; ++i)
    {
      var curr = edges[i];
      
      curr.x -= type.width/2;
      curr.y -= type.height/2;
      curr.applyMatrix4 ( matrix3d );
      curr.x += type.width/2;
      curr.y += type.height/2;
    }

    type.connections = edges;
  };


  // initialize's the values of the actual node
  var active_node = null;
  function _InitNodeWorld ( node, type ) {
    if (node.el) return (node);

    // keep a refference to its type
    node.type_ref = type;

    // if the node has a tag set, then use it. If not pull from the parent.
    // if no tag exists at all, initialize it to be a div
    if (!node.tag && type.tag) node.tag = type.tag;
    node.tag = node.tag ||  'div';

    var el = d.createElement (node.tag);
    var clss = 'obj ' + type.clss;
    var w = type.shadow_w || SHADOW_W, h = type.shadow_h || SHADOW_H;
    var c, ctx;

    if (type.width)
    {
        el.style.width = type.width + 'px';
    }
    if (type.height)
    {
        el.style.height = type.height + 'px';
    }

    if (!node.use && type.use)
    {
      node.use = type.use;

      if (!node.useval && type.useval)
        node.useval = type.useval;
    }
    if (node.use)
    {
      el.setAttribute('data-use', node.use);
      if (node.useval)
        el.setAttribute('data-useval', node.useval);
    }

    if (type.zIndex) {
        el.style.zIndex = type.zIndex;
    }

    if (node.clss) clss += ' ' + node.clss;

    el.id        = node.id;
    el.className = clss;

    // make shadow-map for selected node
    c = d.createElement ('canvas');
    c.width = w; c.height = h;

    ctx = c.getContext ('2d', { 'alpha': true }); //!!node.alpha });
    node.light_map = c;
    node.light_ctx = ctx;
    node.light_bitmap = null; // ctx.createImageData (w, h);
    node.light_data   = ctx.createImageData (w, h).data;

    node.el     = el;
    node.width  = type.width;
    node.height = type.height;
    node.walk   = node.walk || type.walk;
    // ---

    // if we are going to hide it when it is far
    if (node.hide_frustrum > 0) {
      LEVEL.LIT.push (node);
      node.in_view = true;
    }

    if (!node.cast_shadow && node.cast_shadow !== false) node.cast_shadow = type.cast_shadow;
    if (node.no_shadow) node.no_shadow = true;
    if (node.innerHTML) node.el.innerHTML = node.innerHTML;

    node.vertices  = [];
    node.triangles = [];

    ///////////////////
    // #### debug
    /*
    if (true) // node.onclick)
    {
        node.el.onclick = function () {
            // grab vertex elements and remove them
            // ----
            var vertices = document.getElementsByClassName('vertex');
            var ll = vertices.length;

            while (ll-- > 0)
            {
                vertices[ll].parentNode.removeChild (vertices[ll]);
            }
            vertices = null;

            if(active_node)
            {
                active_node.el.classList.toggle ('debug_imp');
            }

            // ---- ---- ---- ---- ----
            DrawVertex(node);
            active_node = node;

            active_node.el.className += ' debug_imp';

            // ---- ---- ---- ---- ----
        };
    }
    */

    return (node);
  }

  GAME.UTILS.AddNode = function (node_id, gate, node) {
    if (!active_node || !node) {
        return ;
    }

    gate.id = node_id;
    node.id = node_id;
    node.connected = [];

    // ---
    // type:'cave-waterfall-1', bg:1, hide_frustrum: 2, beacon:['2']
    LEVEL.MAP.NODES[node_id] = node;
    active_node.connected.push (gate);

    // active_node
    var conn = active_node.connected[ active_node.connected.length - 1 ];
    var conn_source = conn.source;
    var conn_target = conn.target;

    // get the connected node, if it doesn't exist skip it
    var target_node = _GetNodeById ( conn.id );
    if (!target_node) return ;

    // get the node's type/template.
    var target_type    = _GetNodeType ( target_node.type );
    var source_node = active_node;
    var source_type = source_node.type_ref;

    // set the node id, and hold a refference to its type
    target_node.id = conn.id;


    // initialize the template (compute matrix, vertices position, etc)
    _InitNodeTypeWorld ( target_type );

    // initialize the node's metadata and element
    _InitNodeWorld ( target_node, target_type );


    // apply the connected element's translation
    _ApplyWorldConnection ( target_node, target_type.connections[conn_target], 
                            source_node, source_type.connections[conn_source] );

    // add element to the dom
    EL_CAM.appendChild ( target_node.el );

    LEVEL.ACTIVE_MAP.push ( target_node );

    // iterate with the current nodes children
    // _makeNodeWorldConnections ( target_node, target_type );

    // ---
  };

  function _makeWalls ( walls_arr, map, beacon ) {

    for (var i in map)
    {
      if (beacon) {
        if (map[i].beacon && map[i].beacon.indexOf(beacon) === -1) continue;
      }

      if (map[i].ramp) {
        walls_arr.push (map[i]);
        continue;
      }

      if (map[i].walk || !map[i].vertices) continue;
      walls_arr.push (map[i]);
    }
  }

  function  _makeTriggers ( triggers ) {
    var trigger, node;

    if (!triggers) return ;

    GAME.LEVEL.MAP.TRIGGERS_4 = [];
    GAME.LEVEL.MAP.TRIGGERS_16 = [];

    for (var k in triggers)
    {
      trigger = triggers[ k ];

      if (trigger.node)
      {
          node = _GetNodeById (trigger.node);
          if (node) trigger.vertices = node.vertices;
      }
      else
      {
        // dims:[-170, 500, 340, 500], // x y  w  h
        trigger.vertices = [
          new Vector (trigger.dims[0],                   0, trigger.dims[1]),
          new Vector (trigger.dims[0] + trigger.dims[2], 0, trigger.dims[1]),
          new Vector (trigger.dims[0] + trigger.dims[2], 0, trigger.dims[1] + trigger.dims[3]),
          new Vector (trigger.dims[0],                   0, trigger.dims[1] + trigger.dims[3])
        ];
      }

      if (trigger.mode === 4) GAME.LEVEL.MAP.TRIGGERS_4.push( trigger );
      else GAME.LEVEL.MAP.TRIGGERS_16.push( trigger );
      // -
    }
  };

  function _InitLevelSounds ( sounds ) {
    var sound;

    for (var k in sounds) {
      sound = sounds[ k ];
      GAME.Sound.Load ( k, sound.path, sound.volume, sound.loop );
    }
  };

  function _InitLevelLights ( lights ) {
    var light;

    for (var k in lights)
    {
        if (k === 'ambience') continue;

        light = lights[ k ];

        light.direction = new Vector ( light.x, light.y, light.z );
        light.id = k;
        light.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, light.x, light.y, light.z, 1];
        light.affected = [];
    }
    // -
  };

  function __node_makeVerticesOLD ( node ) {
    var vertices = [];
    var real_vertices = [
          new Vector( 0,           node.height, 0),
          new Vector( node.width,  node.height, 0),
          new Vector( node.width,  0,           0),
          new Vector( 0,           0,           0)
        ];

    var matrix = node.matrix;

    for (var i = 0; i < real_vertices.length; ++i)
    {
      var curr = real_vertices[i].clone();
      if (matrix.length > 8)
      {
        curr.x -= node.width/2;
        curr.y -= node.height/2;

        curr.applyMatrix4 ( matrix );

        curr.x += node.width/2;
        curr.y += node.height/2;
      }
      vertices[i] = curr;
    }

    return (vertices);
  };

  function __node_getTrans ( node ) {
      var ret = '';

      if (!node.transform)
      {
          if (node.matrix) ret = 'matrix3d(' + node.matrix.join(', ') + ')';
          else ret = 'translate3d(0,0,0)';
      }
      else ret = node.transform;

      return (ret);
  };
  function __node_setInteract ( node ) {
      if (!node.interact) return ;

      node.el.setAttribute ('data-int', 1);
      node.el.addEventListener ('click', node.interact);
  };

  function __node_setCameraUpdate ( node ) {
      if (node.face_camera)
      {
        LEVEL.LIT.push (node);
        return (true);
      }
      else if (node.hide_frustrum > 0)
      {
        LEVEL.LIT.push (node);
        node.in_view = true;
        return (true);
      }
  }

  function __node_setLightMap ( node ) {
      var c = d.createElement('canvas');
      c.width = node.shadow_w || SHADOW_W;
      c.height = node.shadow_h || SHADOW_H;
      var ctx = c.getContext('2d', {alpha: true}); // !!node.alpha});

      node.light_map = c;
      node.light_ctx = ctx;
      node.light_bitmap = null; //ctx.createImageData (SHADOW_W, SHADOW_H);
  }

  function _InitNodeObject ( node, node_type ) {
      // if the node has children
      var gl = node_type.geom.length;
      var all_geoms = [];

      node.geom = [];
      for (var j = 0; j < gl; ++j)
      {
        var curr_geom = node_type.geom[ j ];
        var geoms = GAME.GEOM.MAKE[ curr_geom.shape ]( node, node_type, curr_geom );

        for (var i = 0; i < geoms.length; ++i)
        {
          geoms[ i ].img = curr_geom.img || node.img || node_type.img;

          if (!geoms[ i ].alpha) geoms[ i ].alpha = curr_geom.alpha || node.alpha || node_type.alpha;
          if (!geoms[ i ].alpha_rect) geoms[ i ].alpha_rect = curr_geom.alpha_rect || node.alpha_rect || node_type.alpha_rect;
          if (!geoms[ i ].alpha_mask) geoms[ i ].alpha_mask = curr_geom.alpha_mask || node.alpha_mask || node_type.alpha_mask;
          if (!geoms[ i ].width) geoms[ i ].width = curr_geom.width || node.width || node_type.width;
          if (!geoms[ i ].height) geoms[ i ].height = curr_geom.height || node.height || node_type.height;

          if (curr_geom.limit)
          {
            var ttemp = curr_geom.limit[ geoms[ i ].style ];
            if (ttemp) {
              for (var bb in ttemp) {
                geoms[ i ][ bb ] = ttemp[ bb ];
              }
            }
            // --
          }

          if (node.interact) {
            geoms[ i ].el.setAttribute ('data-int', 1);
          }

          __node_setLightMap ( geoms[ i ] );

          all_geoms.push ( geoms[i] );
          GAME.LEVEL.ACTIVE_MAP.push( geoms[i] );

          node.geom.push( geoms[i] );
        }
        // -
      }

      makeVertexNormals( all_geoms );
      // --
  };



  // creates game objects
  function _makeNodeObjects ( nodes ) {
    var node, node_type;
    for (var k in nodes)
    {
      node = nodes[ k ];

      // if it is not an object skip
      if (!node.object) continue ;

      node_type = _GetNodeType ( node.type );

      // if no valid note_type exists, delete and skip
      if (!node_type) {
        delete nodes[ k ];
        continue;
      }

      // if no id is set, use it's key
      if (!node.id) node.id = k;

      // hold  refference to its type
      node.type_ref = node_type;

      if (!node.tag && node_type.tag) node.tag = node_type.tag;
      node.tag = node.tag || 'div';

      // element creation
      var h = d.createElement (node.tag);
      h.className = 'obj ' + (node.clss ? node.clss : node_type.clss);
      node.el = h;

        if (node_type.zIndex) {
            node.el.style.zIndex = node_type.zIndex;
        }

      if (node.width) node.el.style.width = node.width + 'px';
      if (node.height) node.el.style.height = node.height + 'px';

      node.el.style.transform = __node_getTrans ( node );

      __node_setInteract ( node );

      if (node.onframe)
      {
        GAME.AI.Add (node);
      }

      // if it follows the new init way, or the old hardcoded one
      if (node_type.isnew)
        _InitNodeObject ( node, node_type );
      else
        _InitNodeObjectOLD ( node, node_type );

      if (!node.hidden)
      {
        if (__node_setCameraUpdate ( node ))
        {
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
        }

        EL_CAM.appendChild (node.el);
      }

      // ---
    }
    // ---
  };


  function _InitNodeObjectOLD ( node, type ) {
      if (!node.matrix) node.matrix = _GetMatrixCSS (node.transform);

      // if the node has no children, create light map and continue

      if (typeof node.vertices === 'function') {
        node.vertices = node.vertices ( node.width, node.height );
      }
      else if (node.vertices === true) {
        node.vertices = __node_makeVerticesOLD( node );
      }

      if (node.vertices && node.vertices[0])
      {
          __node_setLightMap ( node );
          node.object = false;

          makeVertexNormals ([node]);
          LEVEL.ACTIVE_MAP.push( node );

          return ;
      }

      // if the node has children
      var gl = type.geom.length;
      node.geom = [];
      for (var i = 0; i < gl; ++i)
      {
          var curr_geom = type.geom[i];

          var tag = curr_geom.tag || 'div';

          var dc = d.createElement ( tag );

          dc.className = curr_geom.clss;
          node.el.appendChild (dc);

          if (typeof curr_geom.vertices === 'function')
          {
              curr_geom.vertices = curr_geom.vertices ( curr_geom.width ,curr_geom.height );
          }

          var shadow = type.cast_shadow;
          if (curr_geom.hasOwnProperty('cast_shadow')) shadow = curr_geom.cast_shadow;

          node.geom[i] = {
            _parent: node,
            parent_matrix:node.matrix,
            img : curr_geom.img || node.img || type.img,
            id : type.id + '_' + curr_geom.clss,
            el : dc,
            tag : tag,
            width: curr_geom.width,
            height: curr_geom.height,
            cast_shadow: shadow,
            walk: type.walk
          };

          if (node.interact) {
            dc.setAttribute ('data-int', 1);
          }

          if (!curr_geom.matrix && curr_geom.transform) {
            curr_geom.matrix = node.geom[i].matrix =_GetMatrixCSS (curr_geom.transform);
          }

          if (curr_geom.no_shadow) node.geom[i].no_shadow = true;

          if (curr_geom.vertices && curr_geom.vertices[0])
          {
              __node_setLightMap ( node.geom[i] );

              node.geom[i].vertices = [
                  curr_geom.vertices[0].applyMatrix4( node.matrix ),
                  curr_geom.vertices[1].applyMatrix4( node.matrix ),
                  curr_geom.vertices[2].applyMatrix4( node.matrix ),
                  curr_geom.vertices[3].applyMatrix4( node.matrix )
              ];
          }

          LEVEL.ACTIVE_MAP.push ( node.geom[i] );
      }

      makeVertexNormals ( node.geom );
  };

  function _ApplyWorldConnection ( target_node, target_con, source_node, source_con ) {
    var x, y, z;
    var target_type = target_node.type_ref;

    x = (source_con.x - target_con.x) + source_node.x;
    y = (source_con.y - target_con.y) + source_node.y;
    z = (source_con.z - target_con.z) + source_node.z;

    target_node.x = x;
    target_node.y = y;
    target_node.z = z;

    x += target_type.x;
    y += target_type.y;
    z += target_type.z;

    var trans = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)' + target_type.transform;
    target_node.matrix = _GetMatrixCSS ( trans );
    target_node.el.style.transform = trans;

    for (var k = 0; k < target_type.vertices.length; ++k)
    {
      target_node.vertices[ k ] = new Vector (target_type.vertices[ k ].x + x,
                                              target_type.vertices[ k ].y + y,
                                              target_type.vertices[ k ].z + z);
    }

    // if we are blocking the player, compute the angle of the node
    if (!target_node.walk) target_node.angle = _angle (target_node.vertices[ 0 ], target_node.vertices[ 1 ]);

    target_node.centroid = new Vector ( (target_node.vertices[ 2 ].x + target_node.vertices[ 0 ].x) / 2,
                                        (target_node.vertices[ 2 ].y + target_node.vertices[ 0 ].y) / 2,
                                        (target_node.vertices[ 2 ].z + target_node.vertices[ 0 ].z) / 2 );

    var v1_a = target_node.vertices[ 0 ];
    var v2_a = target_node.vertices[ 1 ];
    var v3_a = target_node.vertices[ 3 ];

    // VAR TRIANGLE 02
    var v1_b = target_node.vertices[ 3 ];
    var v2_b = target_node.vertices[ 1 ];
    var v3_b = target_node.vertices[ 2 ];


    var edge1_a = v2_a.subtract ( v1_a );
    var edge2_a = v3_a.subtract ( v1_a );

    var triangle_normal_01_pure = edge1_a.cross ( edge2_a );
    var triangle_normal_01 = triangle_normal_01_pure.unit ();

    var edge1_b = v2_b.subtract ( v1_b );
    var edge2_b = v3_b.subtract ( v1_b );

    var triangle_normal_02_pure = edge1_b.cross ( edge2_b );
    var triangle_normal_02 = triangle_normal_02_pure.unit ();

    target_node.triangles = [
      {
        point_edge  : v1_a,
        edge1       : edge1_a,
        edge2       : edge2_a,
        normal      : triangle_normal_01_pure,
        normal_unit : triangle_normal_01,
        points      : [ v1_a, v2_a, v3_a ]
      },

      {
        point_edge    : v1_b,
        edge1         : edge1_b,
        edge2         : edge2_b,
        normal        : triangle_normal_02_pure,
        normal_unit   : triangle_normal_02,
        points        : [ v1_b, v2_b, v3_b ]
      }
    ];

    var tr = triangle_normal_01;
    target_node.vertexNormals = [ tr, tr, tr, tr, tr ];

    // -
  };


  ///////////////////////////////////////////////////////
  // Creates the level map/world (geometry)
  // The world consists of premade pieces that have always the same size and rotation
  // Each piece (dubbed "node") has 4 connection points. up, right, bottom, left and it can connect 
  // with any other piece.
  //
  // The following function iterates and creates the connections
  //
  function _makeNodeWorldConnections ( source_node, source_type ) {

      var conn, conn_source, conn_target;
      var target_type;

      // if there are no children/connections exit
      if (!source_node.connected) return ;

      // for each connection
      var l = source_node.connected.length;
      while( l-- > 0 )
      {
        conn = source_node.connected[ l ];
        conn_source = conn.source;
        conn_target = conn.target;

        // get the connected node, if it doesn't exist skip it
        var target_node = _GetNodeById ( conn.id );
        if (!target_node) continue;

        // get the node's type/template.
        target_type    = _GetNodeType ( target_node.type );

        // set the node id, and hold a refference to its type
        target_node.id = conn.id;


        // initialize the template (compute matrix, vertices position, etc)
        _InitNodeTypeWorld ( target_type );

        // initialize the node's metadata and element
        _InitNodeWorld ( target_node, target_type );

        // apply the connected element's translation
        _ApplyWorldConnection ( target_node, target_type.connections[conn_target], 
                                source_node, source_type.connections[conn_source] );

        // add element to the dom
        EL_CAM.appendChild ( target_node.el );

        LEVEL.ACTIVE_MAP.push ( target_node );

        // iterate with the current nodes children
        _makeNodeWorldConnections ( target_node, target_type );
      }
  };


  GAME.UTILS.RebuildLightForNode = function ( node ) {
    makeLights (LEVEL.MAP, [node], 0);
  };

  GAME.UTILS.AddLight = function (id, light) {
    if (!light || !id) {
        console.log ('{x:340, y:60, z:66, intensity:1, color:{r:60,g:60,b:220}, shadow:1, max_distance:570, drawIcon:1, active:1}');
        return ;
    }
    // {x:340, y:60, z:66, intensity:1, color:{r:60,g:60,b:220}, shadow:1, max_distance:570, drawIcon:0, active:1}

    light.x = light.x || 0;
    light.y = light.y || 0;
    light.z = light.z || 0;
    light.intensity = light.intensity || 1;
    light.max_distance = light.max_distance || 600;

    if (!light.color) {
        light.color = {r:60,g:60,b:220};
    }

    // hardcoded for now
    if (!light.shadow && light.shadow !== 0) light.shadow = 1;
    if (!light.active && light.active !== 0) light.active = 1;
    if (!light.drawIcon && light.drawIcon !== 0) light.drawIcon = 1;
    if (!light.affected) light.affected = [];
    if (!light.id) light.id = id;

    light.direction = new Vector (light.x, light.y, light.z);
    light.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, light.x, light.y, light.z, 1];
    GAME.LEVEL.MAP.LIGHTS[id] = light;

    makeLights (LEVEL.MAP, LEVEL.ACTIVE_MAP, 100);
  };

  GAME.UTILS.RebuildLightAffected = function ( light ) {
    light.affected = [];

    var nodes = GAME.LEVEL.ACTIVE_MAP;

    for (var i = 0; i < nodes.length; ++i)
      makeLightForNode ( light, nodes[ i ], true );
  };

  GAME.UTILS.RebuildLight = function ( light, force ) {
      if (light.el && light.drawIcon)
      {
        light.direction = new Vector (light.x, light.y, light.z);
        light.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, light.x, light.y, light.z, 1];
        // ---
        light.el.style.opacity = !light.active ? '0.5' : '1.0';
        light.el.style.background = 'rgb(' + (light.color.r) + ','+ (light.color.g) +','+ (light.color.b) +')';
        light.el.style.transform = 'translate3d(' + light.x + 'px, '+ (light.y) +'px, ' + light.z + 'px)';
      }

      for (let i = 0; i < light.affected.length; ++i)
      {
        let curr_node = light.affected[ i ];

        if (!curr_node.vertices) continue;

        // var ctx = curr_node.light_map.getContext('2d',{ 'alpha':!!curr_node.alpha });
        curr_node.light_bitmap = null;
      }

      makeLights (LEVEL.MAP, light.affected, force ? -1 : 0);
  };

  function makeLights ( lvlmap, nodes, timeout ) {
    if (lvlmap.LIGHTS['ambience'] && lvlmap.LIGHTS['ambience'].active)
    {
        for (var i in nodes)
          _MakeAmbienceForNode ( lvlmap.LIGHTS['ambience'], nodes[ i ] );
    }

    for (var k in lvlmap.LIGHTS)
    {
        if (k === 'ambience') continue;

        var light = lvlmap.LIGHTS[k];

        if (light.drawIcon && !light.el)
        {
            // make matrix based on location
            var l_el = d.createElement('div');
            l_el.innerHTML = 'light';
            l_el.className = 'obj light';
            l_el.id = light.id;

            if (!light.active) l_el.style.opacity = '0.5';

            light.el = l_el;

            l_el.style.background = 'rgb(' + (light.color.r) + ','+ (light.color.g) +','+ (light.color.b) +')';
            l_el.style.transform = 'translate3d(' + light.x + 'px, '+ (light.y) +'px, ' + light.z + 'px)';
            EL_CAM.appendChild(l_el);

            // ----
            (function (l_el, light){
                l_el.onclick = function () {
                    light.active = !light.active;

                    if (!light.active) l_el.style.opacity = '0.5';
                    else l_el.style.opacity = '1.0';

                    // pull transform values and rebuild light...
                    var trans = l_el.style.transform;
                    trans = trans.replace('translate3d(', '').replace(')','');
                    var trans_arr = trans.split(',');
                    var x = trans_arr[0].replace('px','')/1;
                    var y = trans_arr[1].replace('px','')/1;
                    var z = trans_arr[2].replace('px','')/1;

                    light.x = x;
                    light.y = y;
                    light.z = z;
                    light.direction = new Vector (light.x, light.y, light.z);
                    light.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, light.x, light.y, light.z, 1];

                    GAME.UTILS.RebuildLight (light, 1);
                };
            })(l_el, light);
        }

        if (light.spot) // || light.offset)
        {
          if (typeof light.target === 'string') {
            light.target = GAME.LEVEL.MAP.NODES[ light.target ].centroid.clone ();
          }

          light.cone_dir = light.target.subtract(light.direction).unit ();
        }

        if (!light.active) continue;

        for (var i = 0; i < nodes.length; ++i)
            makeLightForNode ( light, nodes[ i ] );
        // ----
    }
    

    if (timeout === -1)
    {
        for (var i = 0; i < nodes.length; ++i)
          _RenderLight( nodes[ i ], true );        
    }
    else
    {
        _TimeoutFrame (timeout, function() {
            for (var i = 0; i < nodes.length; ++i)
              _RenderLight( nodes[ i ], timeout === 0 );
        });
    }
    // ----
  };


  function makeVertexNormals ( nodes ) {

    var vertex_map = {};
    var triangle_normal_02;

    for (var k in nodes)
    {
      var node = nodes[k];
      if (!node.vertices) continue;

      // compute triangle normal
      // VAR TRIANGLE 01
      var v1_a = node.vertices[0];
      var v2_a = node.vertices[1];
      var v3_a = node.vertices[3];

      // VAR TRIANGLE 02
      var v1_b = node.vertices[3];
      var v2_b = node.vertices[1];
      var v3_b = node.vertices[2];

      var edge1_a = v2_a.subtract(v1_a);
      var edge2_a = v3_a.subtract(v1_a);

      var triangle_normal_01_pure = edge1_a.cross(edge2_a);
      var triangle_normal_01 = triangle_normal_01_pure.unit();

      if (node.tri)
      {
                    triangle_normal_02 = null;

                    node.centroid = new Vector (  ((v1_a.x + v2_a.x + v3_a.x) / 3),
                                                  ((v1_a.y + v2_a.y + v3_a.y) / 3),
                                                  ((v1_a.z + v2_a.z + v3_a.z) / 3));

                    node.triangles = [
                      {
                        point_edge  : v1_a,
                        edge1       : edge1_a,
                        edge2       : edge2_a,
                        normal      : triangle_normal_01_pure,
                        normal_unit : triangle_normal_01,
                        points      : [ v1_a, v2_a, v3_a ]
                      }
                    ];
      }
      else
      {
            var edge1_b = v2_b.subtract(v1_b);
            var edge2_b = v3_b.subtract(v1_b);

            var triangle_normal_02_pure = edge1_b.cross(edge2_b);
            triangle_normal_02 = triangle_normal_02_pure.unit();

            node.centroid = new Vector ( (v3_b.x + v1_a.x)/2,  (v3_b.y + v1_a.y)/2, (v3_b.z + v1_a.z)/2 ); 

            node.triangles = [
              {
                point_edge  : v1_a,
                edge1       : edge1_a,
                edge2       : edge2_a,
                normal      : triangle_normal_01_pure,
                normal_unit : triangle_normal_01,
                points      : [ v1_a, v2_a, v3_a ]
              },

              {
                point_edge    : v1_b,
                edge1         : edge1_b,
                edge2         : edge2_b,
                normal        : triangle_normal_02_pure,
                normal_unit   : triangle_normal_02,
                points      : [ v1_b, v2_b, v3_b ]
              }
            ];
      }



      // save the triangles and the points that belong in them
      // node.vertexNormals = [0,0,0,0, triangle_normal_01.unit()];

      var tr = triangle_normal_01;

      // console.log( node.id, triangle_normal_01 );
      node.vertexNormals = [tr, tr, tr, tr, tr];

      if (!node.complexNormals) {
        continue;
      }

      var hash = Math.round(v1_a.x) +','+ Math.round(v1_a.y)+','+Math.round(v1_a.z);

      if (!vertex_map[ hash ]) vertex_map[ hash ] = [];
      vertex_map[ hash ].push (triangle_normal_01);

      hash = Math.round(v2_a.x)+','+ Math.round(v2_a.y)+','+ Math.round(v2_a.z);
      if (!vertex_map[ hash ]) vertex_map[ hash ] = [];
      vertex_map[ hash ].push (triangle_normal_01);
      
      if (triangle_normal_02)
      {
          vertex_map[ hash ].push (triangle_normal_02);

          hash = Math.round(v3_b.x)+','+ Math.round(v3_b.y)+','+ Math.round(v3_b.z);
          if (!vertex_map[ hash ]) vertex_map[ hash ] = [];
          vertex_map[ hash ].push (triangle_normal_02);

          hash = Math.round(v1_b.x)+','+ Math.round(v1_b.y)+','+ Math.round(v1_b.z);
          if (!vertex_map[ hash ]) vertex_map[ hash ] = [];
          vertex_map[ hash ].push (triangle_normal_01);
          vertex_map[ hash ].push (triangle_normal_02);
      }
    }

    for (var k in nodes)
    {
      var node = nodes[k];
      if (!node.vertices) continue;
      if (!node.complexNormals) continue;

      // VAR TRIANGLE 01
      var v1_a = node.vertices[0];
      var v2_a = node.vertices[1];
      var v3_a = node.vertices[3];

      // VAR TRIANGLE 02
      var v1_b = node.vertices[3];
      var v2_b = node.vertices[1];
      var v3_b = node.vertices[2];

      var hash = Math.round(v1_a.x)+','+Math.round(v1_a.y)+','+Math.round(v1_a.z);
      if (vertex_map[ hash ])
      {
        var normal = vertex_map[ hash ][0];
        for (var i = 1; i < vertex_map[ hash ].length; ++i)
        {
          normal = normal.add( vertex_map[ hash ][ i ] );
        }

        normal = normal.unit();
        node.vertexNormals[0] = normal;
      }

      hash = Math.round(v2_a.x)+','+Math.round(v2_a.y)+','+Math.round(v2_a.z);
      if (vertex_map[ hash ])
      {
        var normal = vertex_map[ hash ][0];
        for (var i = 1; i < vertex_map[ hash ].length; ++i)
        {
          normal = normal.add( vertex_map[ hash ][ i ] );
        }

        normal = normal.unit();
        node.vertexNormals[1] = normal;
      }


      if (!node.tri)
      {
          hash = Math.round(v3_b.x)+','+Math.round(v3_b.y)+','+Math.round(v3_b.z);
          if (vertex_map[ hash ])
          {
            var normal = vertex_map[ hash ][0];
            for (var i = 1; i < vertex_map[ hash ].length; ++i)
            {
              normal = normal.add( vertex_map[ hash ][ i ] );
            }

            normal = normal.unit();
            node.vertexNormals[2] = normal;
          }

          hash = Math.round(v1_b.x)+','+Math.round(v1_b.y)+','+Math.round(v1_b.z);
          if (vertex_map[ hash ])
          {
            var normal = vertex_map[ hash ][0];
            for (var i = 1; i < vertex_map[ hash ].length; ++i)
            {
              normal = normal.add( vertex_map[ hash ][ i ] );
            }

            normal = normal.unit();
            node.vertexNormals[3] = normal;
          }
      }
      // ---
      // ---
    }
    // ----
  };



  function _MakeAmbienceForNode ( ambience, node ) {
    if (!node.vertices) return;

    var w = node.light_map.width;
    var h = node.light_map.height;
    var extra = 0;

    if (node.brightness) extra = node.brightness;

    var r = extra + (ambience.color.r * ambience.intensity) >> 0;
    var g = extra + (ambience.color.g * ambience.intensity) >> 0;
    var b = extra + (ambience.color.b * ambience.intensity) >> 0;

    node.light_ctx.globalCompositeOperation = 'source-over';

    if (!node.light_data) {
      node.light_data = node.light_ctx.createImageData (w, h).data;
    }

    var l = node.light_data.length;
    for (var i = 0; i < l; i += 4) {
      node.light_data[ i ] = r;
      node.light_data[ i + 1] = g;
      node.light_data[ i + 2] = b;
      node.light_data[ i + 3] = 255;
    }

    node.light_ctx.putImageData ( new ImageData (node.light_data, w, h), 0, 0 );

    // GAME.UTILS.DrawCanvas (node.light_map, node, 'img', 'darkred');
  };




  ///////////////////////////////////////////////////////
  // LIGHTS #########
  var c_light_rescale = d.createElement('canvas');
  c_light_rescale.width = 3; c_light_rescale.height = 3;
  var ctx_lr = c_light_rescale.getContext('2d', { alpha: false });
  var c_img_lr = ctx_lr.createImageData (3, 3);

  var c_light_rescale2 = d.createElement('canvas');
  c_light_rescale2.width = SHADOW_W; c_light_rescale2.height = SHADOW_H;
  var ctx_lr_large = c_light_rescale2.getContext('2d', { alpha: false });

  var c_shadow = d.createElement('canvas');
  c_shadow.width = SHADOW_W; c_shadow.height = SHADOW_H;
  var c_shadow_ctx = c_shadow.getContext('2d', { alpha: true });
  c_shadow_ctx.filter = "blur(1px)";

  var axis_up = new Vector (0, 1, 0);
  var temp_matrix  = new Float32Array (16);
  var temp_matrix2 = new Float32Array (16);

  function makeLightForNode( light, node, affected_only ) {

    // if no vertices, skip
    if (!node.vertices || node.hidden) return;

    // if the light has a specified array of affected nodes
    if (light.only && light.only.indexOf( node.id ) === -1) return ;

    // VAR TRIANGLE 01
    var v1_a = node.vertices[0];
    var v2_a = node.vertices[1];
    var v3_a = node.vertices[3];

    // VAR TRIANGLE 02
    var v1_b = node.vertices[3];
    var v2_b = node.vertices[1];
    var v3_b = node.vertices[2];

    var v1_normal = node.vertexNormals[0];
    var v2_normal = node.vertexNormals[1];
    var v3_normal = node.vertexNormals[2];
    var v4_normal = node.vertexNormals[3];

    var light_dir = light.direction;

    var half_point = node.centroid; //new Vector ( (v3_b.x + v1_a.x)/2,  (v3_b.y + v1_a.y)/2, (v3_b.z + v1_a.z)/2  );

    var dist_v1;
    var dist_v2;
    var dist_v3;
    var dist_v4;
    var half_dist;

    // check if it is a spotlight
    if (light.spot)
    {
      // if (node.id === 'floor-2') debugger;

      var inner_scale = 0;

      var cone_dist = node.centroid.subtract( light.direction ).dot( light.cone_dir );
      var cone_radius = (cone_dist / light.max_distance) * light.radius;
      if (light.max_radius) cone_radius = Math.min (light.max_radius, cone_radius);

      var len = node.centroid.subtract (light.direction).subtract (light.cone_dir.multiply (cone_dist)).length();
      if (len > cone_radius) {
        half_dist = 0;

        // return ;
      } else {
        if (light.inner_radius)
        {
          inner_scale = light.inner_radius * (cone_radius / light.radius);

          if (len < inner_scale) half_dist = 1;
          else half_dist = 1 - ( (len-inner_scale) / (cone_radius - inner_scale) );
        }
        else
          half_dist = 1 - (len / cone_radius);

        // console.log(light.id, 'centroid', node.id, "dist:", cone_dist >> 0, "radius:", cone_radius >> 0, "ortho_len:", len >> 0 );
        // console.log(light.id, 'centroid', node.id, half_dist.toFixed(2)/1);
      }

      cone_dist = v1_a.subtract( light.direction ).dot( light.cone_dir );
      cone_radius = (cone_dist / light.max_distance) * light.radius;
      if (light.max_radius) cone_radius = Math.min (light.max_radius, cone_radius);

      len = v1_a.subtract (light.direction).subtract (light.cone_dir.multiply (cone_dist)).length();
      if (len > cone_radius) {
        dist_v1 = 0;
      } else {

        if (light.inner_radius)
        {
          inner_scale = light.inner_radius * (cone_radius / light.radius);

          if (len < inner_scale) dist_v1 = 1;
          else dist_v1 = 1 - ( (len-inner_scale) / (cone_radius - inner_scale) );
        }
        else
          dist_v1 = 1 - (len / cone_radius);

        // console.log(light.id, 'v1_a', node.id, "dist:", cone_dist >> 0, "radius:", cone_radius >> 0, "ortho_len:", len >> 0 );
        // console.log(light.id, 'v1_a', node.id, dist_v1.toFixed(2)/1);
      }

      cone_dist = v2_a.subtract( light.direction ).dot( light.cone_dir );
      cone_radius = (cone_dist / light.max_distance) * light.radius;
      if (light.max_radius) cone_radius = Math.min (light.max_radius, cone_radius);

      len = v2_a.subtract (light.direction).subtract (light.cone_dir.multiply (cone_dist)).length();
      if (len > cone_radius) {
        dist_v2 = 0;
      } else {

        if (light.inner_radius)
        {
          inner_scale = light.inner_radius * (cone_radius / light.radius);

          if (len < inner_scale) dist_v2 = 1;
          else dist_v2 = 1 - ( (len-inner_scale) / (cone_radius - inner_scale) );
        }
        else
          dist_v2 = 1 - (len / cone_radius);

        // console.log(light.id, 'v2_a', node.id, "dist:", cone_dist >> 0, "radius:", cone_radius >> 0, "ortho_len:", len >> 0 );
        // console.log(light.id, 'v2_a', node.id, dist_v2.toFixed(2)/1);
      }

      cone_dist = v3_b.subtract( light.direction ).dot( light.cone_dir );
      cone_radius = (cone_dist / light.max_distance) * light.radius;
      if (light.max_radius) cone_radius = Math.min (light.max_radius, cone_radius);

      len = v3_b.subtract (light.direction).subtract (light.cone_dir.multiply (cone_dist)).length();
      if (len > cone_radius) {
        dist_v3 = 0;
      } else {

        if (light.inner_radius)
        {
          inner_scale = light.inner_radius * (cone_radius / light.radius);

          if (len < inner_scale) dist_v3 = 1;
          else dist_v3 = 1 - ( (len-inner_scale) / (cone_radius - inner_scale) );
        }
        else
          dist_v3 = 1 - (len / cone_radius);

        // console.log(light.id, 'v3_b', node.id, "dist:", cone_dist >> 0, "radius:", cone_radius >> 0, "ortho_len:", len >> 0 );
        // console.log(light.id, 'v3_b', node.id, dist_v3.toFixed(2)/1);
      }

      cone_dist = v1_b.subtract( light.direction ).dot( light.cone_dir );
      cone_radius = (cone_dist / light.max_distance) * light.radius;
      if (light.max_radius) cone_radius = Math.min (light.max_radius, cone_radius);

      len = v1_b.subtract (light.direction).subtract (light.cone_dir.multiply (cone_dist)).length();
      if (len > cone_radius) {
        dist_v4 = 0;
      } else {

        if (light.inner_radius)
        {
          inner_scale = light.inner_radius * (cone_radius / light.radius);

          if (len < inner_scale) dist_v4 = 1;
          else dist_v4 = 1 - ( (len-inner_scale) / (cone_radius - inner_scale) );
        }
        else
          dist_v4 = 1 - (len / cone_radius);

        // console.log(light.id, 'v1_b', node.id, "dist:", cone_dist >> 0, "radius:", cone_radius >> 0, "ortho_len:", len >> 0 );
        // console.log(light.id, 'v1_b', node.id, dist_v4.toFixed(2)/1);
      }


       // if (node.id === 'wall-sto-right-1') debugger;
      // --
    }
    else
    {
      dist_v1 = Math.max ( 1, DistanceVector ( v1_a, light_dir ) );
      dist_v2 = Math.max ( 1, DistanceVector ( v2_a, light_dir ) );
      dist_v3 = Math.max ( 1, DistanceVector ( v3_b, light_dir ) );
      dist_v4 = Math.max ( 1, DistanceVector ( v1_b, light_dir ) );
      half_dist = Math.max(1, DistanceVector ( half_point, light_dir )  );

      if (dist_v1 > light.max_distance) dist_v1 = 0;
      else dist_v1 = (light.max_distance-dist_v1) / light.max_distance;

      if (dist_v2 > light.max_distance) dist_v2 = 0;
      else dist_v2 = (light.max_distance-dist_v2) / light.max_distance;

      if (dist_v3 > light.max_distance) dist_v3 = 0;
      else dist_v3 = (light.max_distance-dist_v3) / light.max_distance;

      if (dist_v4 > light.max_distance) dist_v4 = 0;
      else dist_v4 = (light.max_distance-dist_v4) / light.max_distance;

      if (half_dist > light.max_distance) half_dist = 0;
      else half_dist = (light.max_distance-half_dist) / light.max_distance;

      // --
    }

    if (dist_v1 === 0 && dist_v2 === 0 && dist_v3 === 0 && dist_v4 === 0 && half_dist === 0) {
      return ;
    }

    if (light.affected.indexOf( node ) === -1) light.affected.push( node );
    if (affected_only) return ;

    // for point light
    // vec3 lightDir = normalize(light.position - fragPos);
    var theta1 = -( v1_normal.dot ( light_dir.subtract(v1_a).unit() ) * light.intensity );
    var theta2 = -( v2_normal.dot ( light_dir.subtract(v2_a).unit() ) * light.intensity );
    var theta3 = -( v3_normal.dot ( light_dir.subtract(v3_b).unit() ) * light.intensity );
    var theta4 = -( v4_normal.dot ( light_dir.subtract(v1_b).unit() ) * light.intensity );


    if (theta1 < 0) theta1 = 0;
    if (theta2 < 0) theta2 = 0;
    if (theta3 < 0) theta3 = 0;
    if (theta4 < 0) theta4 = 0;

    var light_val_01 = ( theta1 * dist_v1 );
    var light_val_02 = ( theta2 * dist_v2 );
    var light_val_03 = ( theta3 * dist_v3 );
    var light_val_04 = ( theta4 * dist_v4 );

    var w = node.shadow_w || SHADOW_W;
    var h = node.shadow_h || SHADOW_H;
    
    var half_theta = -( node.vertexNormals[4].dot ( light_dir.subtract(half_point).unit() ) * light.intensity );
    if (half_theta < 0) half_theta = 0;

    var half_light_val = ( half_theta * half_dist );

    /*
    if (light.spot)
    {
      console.log( node.id, 'half_light_val', half_dist, half_theta, half_light_val );
      console.log( node.id, 'light_val_01', dist_v1, theta1, light_val_01 );
      console.log( node.id, 'light_val_02', dist_v2, theta2, light_val_02 );
      console.log( node.id, 'light_val_03', dist_v3, theta3, light_val_03 );
      console.log( node.id, 'light_val_04', dist_v4, theta4, light_val_04 );
      console.log("--------");
    }
    */

    c_img_lr.data[0] = light_val_04 * light.color.r;
    c_img_lr.data[1] = light_val_04 * light.color.g;
    c_img_lr.data[2] = light_val_04 * light.color.b;
    c_img_lr.data[3] = 255;

    c_img_lr.data[4] = ((light_val_04 + light_val_03 + half_light_val*0 )/2) * light.color.r;
    c_img_lr.data[5] = ((light_val_04 + light_val_03 + half_light_val*0 )/2) * light.color.g;
    c_img_lr.data[6] = ((light_val_04 + light_val_03 + half_light_val*0 )/2) * light.color.b;
    c_img_lr.data[7] = 255;

    c_img_lr.data[8] = light_val_03 * light.color.r;
    c_img_lr.data[9] = light_val_03 * light.color.g;
    c_img_lr.data[10] = light_val_03 * light.color.b;
    c_img_lr.data[11] = 255;

    c_img_lr.data[12] = ((light_val_04 + light_val_01 + half_light_val*0 )/2) * light.color.r;
    c_img_lr.data[13] = ((light_val_04 + light_val_01 + half_light_val*0 )/2) * light.color.g;
    c_img_lr.data[14] = ((light_val_04 + light_val_01 + half_light_val*0 )/2) * light.color.b;
    c_img_lr.data[15] = 255;

    c_img_lr.data[16] = half_light_val * light.color.r;
    c_img_lr.data[17] = half_light_val * light.color.g;
    c_img_lr.data[18] = half_light_val * light.color.b;
    c_img_lr.data[19] = 255;

    c_img_lr.data[20] = ((light_val_03 + light_val_02 + half_light_val*0 )/2) * light.color.r;
    c_img_lr.data[21] = ((light_val_03 + light_val_02 + half_light_val*0 )/2) * light.color.g;
    c_img_lr.data[22] = ((light_val_03 + light_val_02 + half_light_val*0 )/2) * light.color.b;
    c_img_lr.data[23] = 255;

    c_img_lr.data[24] = light_val_01 * light.color.r;
    c_img_lr.data[25] = light_val_01 * light.color.g;
    c_img_lr.data[26] = light_val_01 * light.color.b;
    c_img_lr.data[27] = 255;

    c_img_lr.data[28] = ((light_val_01 + light_val_02 + half_light_val*0 )/2) * light.color.r;
    c_img_lr.data[29] = ((light_val_01 + light_val_02 + half_light_val*0 )/2) * light.color.g;
    c_img_lr.data[30] = ((light_val_01 + light_val_02 + half_light_val*0 )/2) * light.color.b;
    c_img_lr.data[31] = 255;

    c_img_lr.data[32] = light_val_02 * light.color.r;
    c_img_lr.data[33] = light_val_02 * light.color.g;
    c_img_lr.data[34] = light_val_02 * light.color.b;
    c_img_lr.data[35] = 255;

    ctx_lr.putImageData ( c_img_lr, 0, 0 );


    // var img = node.light_bitmap;
    // var data = img.data;

    // ctx_lr_large.drawImage ( c_light_rescale, 0, 0, 3, 3, 0, 0, w, h);
    // var ret = ctx_lr_large.getImageData ( 0, 0, w, h ).data;

    var go = light.shadow && !node.no_shadow && half_light_val > 0.01;

    if (!go)
    {
        if (node.light_data) {
            //GAME.UTILS.DrawCanvas (node.light_map, node, 'img', 'darkblue');

            var heapf64 = new Float64Array ( ASM_HEAP );
            var heapu8 = new Uint8Array ( ASM_HEAP );
            var img_offset = ASM_HEAP.byteLength - 16900;

            heapf64[ 34 ] = w;
            heapf64[ 35 ] = h;

            heapu8.set ( node.light_data, img_offset);
            heapu8.set ( c_img_lr.data, 36 );
            ASM_LIB.AsmLightNoShadow ( 32, img_offset );

            node.light_data = new Uint8ClampedArray ( ASM_HEAP, img_offset ).slice (0);
            node.light_ctx.putImageData ( new ImageData (node.light_data, w, h), 0, 0 );

            //GAME.UTILS.DrawCanvas (node.light_map, node, 'img', 'teal');
        }
        else {
            node.light_ctx.globalCompositeOperation = 'lighter';
            node.light_ctx.drawImage ( c_light_rescale, 0, 0, 3, 3, 0, 0, w, h );
            node.light_data = node.light_ctx.getImageData ( 0, 0, w, h ).data;
        }
    }

    // -----
    if (go)
    {
      var light_dir = light.direction;

      // set the light dir based on the new coords
      var node_verts = node.vertices;
      var half_point_new = node.centroid;

    /*
      var look_at_dummy = light.matrix;

  
     // PROJECTING CAMERA BACKWARDS (project line between camera position and  half_point position)
     var startPos = new Vector( light_dir.x, light_dir.y, light_dir.z );
     var direction = new Vector (-half_point_new.x, half_point_new.y, half_point_new.z);
     var distance = -0.2;
     var newPos = new Vector();

     console.log("var startPos = ", startPos );
     console.log("var direction = ", direction );
     console.log("var distance = ", distance );

     newPos.addVectors ( startPos, direction.multiplyScalar( distance ) );

     console.log("zzz ", "end_pos", newPos);
     light_dir = newPos;

     look_at_dummy[12] = newPos.x; 
     look_at_dummy[13] = newPos.y;
     look_at_dummy[14] = newPos.z;
   */
      /*
      // CODE FOR GRABBING MATRIX FROM CSS TRANSFORM 'ed ELEMENT
      var magic = getComputedStyle(document.getElementById(light.id)).transform.replace('matrix3d(','').replace(')','').split(' ');
      var look_at_dummy = [];
      for (var i = 0; i < magic.length; ++i)
      {
        look_at_dummy[i] = (magic[i].replace(',', ''))/1;
      }
      */

      var debug_ctx = null;
      var canvas_dims = 160;
      var offset_left = 20;
      var offset_top = 20;
      var widthHalf = (canvas_dims - 40) / 2;
      var heightHalf = (canvas_dims - 40) / 2;

      if (DEBUG)
      {
          debug_ctx = (function ( node ) {
              var cc = d.createElement('canvas');
              var ctx = cc.getContext('2d', {alpha: !!node.alpha });
              ctx.imageSmoothingEnabled = false;

              // ####
              cc.width = 160; cc.height = 160;

              var ff = d.createElement('div');
              ff.className = 'fff';
              ff.id = 'fff_' + node.id;
              ff.innerHTML = '<span>' + node.id + '</span>';
              ff.appendChild(cc);

              d.body.appendChild(ff);
              cc.style.cssText = 'position:relative;margin:0px;z-index:99999;background:black;transform:scale(1);';

              return (ctx);
          })( node );
      }

      // rendered green line here.
      var ordered = [];
      for (var j in LEVEL.ACTIVE_MAP)
      {
          var curr_node = LEVEL.ACTIVE_MAP[j];

          if (node === curr_node || !curr_node.cast_shadow || curr_node.hidden || !curr_node.vertices) continue;

          // grab the centroid point
          var node_verts = curr_node.vertices;
          var half_point_curr = curr_node.centroid;

          if ( half_point_curr.subtract(light_dir).dot (half_point_new.subtract(light_dir)) < 0 )
          {
            continue;
          }

          var ang = Vector.angleBetween ( curr_node.vertexNormals[4], node.vertexNormals[4] );
          if ( ang > 2.0 && Math.abs(ang - 3.141592653589793) > 0.001 ) // ang !== 3.141592653589793 )
          {
            continue;
          }

          if ( half_point_curr.subtract(light_dir).length() - 1 > half_point_new.subtract(light_dir).length() )
          {
              continue;
          }

          ordered.push( curr_node );
          // ---
      }

      if (ordered.length === 0)
      {
        if (node.light_data) {
            // GAME.UTILS.DrawCanvas (node.light_map, node, 'img', 'darkblue');

            var heapf64 = new Float64Array ( ASM_HEAP );
            var heapu8 = new Uint8Array ( ASM_HEAP );
            var img_offset = ASM_HEAP.byteLength - 16900;

            heapf64[ 34 ] = w;
            heapf64[ 35 ] = h;

            heapu8.set ( node.light_data, img_offset);
            heapu8.set ( c_img_lr.data, 36 );
            ASM_LIB.AsmLightNoShadow ( 32, img_offset );

            node.light_data = new Uint8ClampedArray ( ASM_HEAP, img_offset ).slice (0);
            node.light_ctx.putImageData ( new ImageData (node.light_data, w, h), 0, 0 );

            // GAME.UTILS.DrawCanvas (node.light_map, node, 'img', 'teal');
        }
        else {
            node.light_ctx.globalCompositeOperation = 'lighter';
            node.light_ctx.drawImage ( c_light_rescale, 0, 0, 3, 3, 0, 0, w, h );
            node.light_data = node.light_ctx.getImageData ( 0, 0, w, h ).data;
        }

        return ;
      }


        var h = node.shadow_h || SHADOW_H;
        var w = node.shadow_w || SHADOW_W;

        // get absolute transform (parent included)
        var node_matrix = node.matrix, top_matrix = null;

        if (node.parent_matrix) {
            top_matrix = node.parent_matrix;
        }


        var curr_vertex = new Vector();
        var vertex = new Vector();
        var ray_direction = new Vector();
        var temp_vec = new Vector();

        var te_temp = FOV_MAT;
        var node_verts = node.vertices;


        // set current node values to asm heap
        // console.log( "MAGIC ASM NODE ", node.id );

        // var ttt = window.performance.now();
        var heap = new Float64Array ( ASM_HEAP );

        new Uint8Array ( ASM_HEAP ).fill ( 255, ASM_HEAP.byteLength - 16900 );


        heap.set ( [light_dir.x, light_dir.y, light_dir.z], 6 ); // begins at 16
        heap.set ( te_temp, 16 ); // begins at 16

        // ---
        heap[ 32 ] = node.width;
        heap[ 33 ] = node.height;
        heap[ 34 ] = w;
        heap[ 35 ] = h;

        if (!node.matrix)
        {
          heap.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 36);
        }
        else
        {
          heap.set( node.matrix, 36 );
        }

        if (!top_matrix)
        {
          heap.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 52);
        }
        else
        {
          heap.set( top_matrix, 52 );
        }


        // heap.set( world_arr_rev_temp, 102 );
        heap.set( [node.tri ? 1 : 2], 131 );

        heap.set([
            node.triangles[0].points[0].x,node.triangles[0].points[0].y,node.triangles[0].points[0].z,
            node.triangles[0].points[1].x,node.triangles[0].points[1].y,node.triangles[0].points[1].z,
            node.triangles[0].points[2].x,node.triangles[0].points[2].y,node.triangles[0].points[2].z
          ], 132 );
        heap.set( [node.triangles[0].point_edge.x,node.triangles[0].point_edge.y,node.triangles[0].point_edge.z], 141 );
        heap.set( [node.triangles[0].edge1.x,node.triangles[0].edge1.y,node.triangles[0].edge1.z], 144 );
        heap.set( [node.triangles[0].edge2.x,node.triangles[0].edge2.y,node.triangles[0].edge2.z], 147 );
        heap.set( [node.triangles[0].normal.x,node.triangles[0].normal.y,node.triangles[0].normal.z], 150 );

        if (!node.tri)
        {
            heap.set( [
                node.triangles[1].points[0].x,node.triangles[1].points[0].y,node.triangles[1].points[0].z,
                node.triangles[1].points[1].x,node.triangles[1].points[1].y,node.triangles[1].points[1].z,
                node.triangles[1].points[2].x,node.triangles[1].points[2].y,node.triangles[1].points[2].z
              ], 153 );
            heap.set( [node.triangles[1].point_edge.x,node.triangles[1].point_edge.y,node.triangles[1].point_edge.z], 162 );
            heap.set( [node.triangles[1].edge1.x,node.triangles[1].edge1.y,node.triangles[1].edge1.z], 165 );
            heap.set( [node.triangles[1].edge2.x,node.triangles[1].edge2.y,node.triangles[1].edge2.z], 168 );
            heap.set( [node.triangles[1].normal.x,node.triangles[1].normal.y,node.triangles[1].normal.z], 171 );
        }
        // -

        // set filtered target nodes to asm heap
        heap.set( [ordered.length], 174 );


        var heap_offsets = 174;
        var offset = 175;

        heap.set( [200], 175 );
        // -------------------------------------
        var img_bin_offset = 50000;

        for (var jj = 0; jj < ordered.length; ++jj)
        {
          var obst = ordered[ jj ];

          offset =  (jj + 1) * 200;
          heap.set( [ offset ], ++heap_offsets );

          heap[ offset ] = obst.width;
          heap[ offset + 1 ] = obst.height;
          heap[ offset + 2 ] = w;
          heap[ offset + 3 ] = h;

          if (obst.alpha_mask === 1)
          {
            var immg = GAME.LEVEL.PRELOAD_IMG[ obst.img || obst.type_ref.img ];

            if (immg)
            {
              var type_canvas = obst.type_ref.canvas;
              var type_ctx = type_canvas.getContext ('2d', {alpha:true});

              type_ctx.globalCompositeOperation = 'source-over';
              type_ctx.clearRect(0, 0, type_canvas.width, type_canvas.height);
              type_ctx.drawImage (immg, 0, 0, obst.width, obst.height);

              //console.log('a', obst.id, w, h, obst.width, obst.height);
              ///console.log('--------');

              // var moo = new Image();
              // moo.src = type_canvas.toDataURL();
              // document.body.appendChild( moo );

              var img_data = type_ctx.getImageData(0, 0, obst.width, obst.height).data;
              var tmp_img = new Uint8Array (img_data.length / 4);

              for (var ih = 0; ih < tmp_img.length; ++ih) {
                tmp_img[ih] = img_data[ (ih*4) + 3];
              }


              new Uint8Array ( ASM_HEAP ).set ( tmp_img, img_bin_offset );

              heap[ offset + 4 ] = img_bin_offset;
              img_bin_offset += tmp_img.length;
            }
            else
            {
              heap[ offset + 4 ] = 0;
            }
          }
          else if (obst.alpha_mask)
          {
              // get the canvas and pass it to asm js
              var temp_canvas = document.createElement('canvas');
              temp_canvas.width = obst.width;
              temp_canvas.height = obst.height;
              var type_ctx = temp_canvas.getContext ('2d', {alpha:true});

              type_ctx.drawImage(obst.alpha_mask, 0, 0, obst.width, obst.height);

              var img_data = type_ctx.getImageData(0, 0, obst.width, obst.height).data;
              // type_ctx = temp_canvas = null;

              //console.log('b', obst.id, w, h, obst.width, obst.height);
              //console.log('--------');

              var tmp_img = new Uint8Array (img_data.length / 4);

              for (var ih = 0; ih < tmp_img.length; ++ih) {
                tmp_img[ih] = img_data[ (ih*4) + 3];
              }

              new Uint8Array ( ASM_HEAP ).set ( tmp_img, img_bin_offset );

              heap[ offset + 4 ] = img_bin_offset;
              img_bin_offset += tmp_img.length;
          }
          else
          {
            heap[ offset + 4 ] = 0;
          }

          if (obst.alpha_mask)
          {
                temp_matrix2[0] = 1;
                temp_matrix2[1] = 0;
                temp_matrix2[2] = 0;
                temp_matrix2[3] = 0;
                temp_matrix2[4] = 0;
                temp_matrix2[5] = 1;
                temp_matrix2[6] = 0;
                temp_matrix2[7] = 0;
                temp_matrix2[8] = 0;
                temp_matrix2[9] = 0;
                temp_matrix2[10] = 1;
                temp_matrix2[11] = 0;
                temp_matrix2[12] = obst.width/2;
                temp_matrix2[13] = obst.height/2;
                temp_matrix2[14] = 0;
                temp_matrix2[15] = 1;

              if (!obst.parent_matrix)
              {
                MultiplyMatrices2(temp_matrix, temp_matrix2, obst.matrix);

                temp_matrix2[12] = -obst.width/2;
                temp_matrix2[13] = -obst.height/2;

                MultiplyMatrices2(temp_matrix, temp_matrix, temp_matrix2);
                heap.set ( GetInverse2 ( temp_matrix, temp_matrix ), offset + 5 ); // --> 219

                // var foo = (MultiplyMatrices2([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, obst.width/2, obst.height/2, 0, 1], obst.matrix));
                // foo = MultiplyMatrices(foo, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -obst.width/2, -obst.height/2, 0, 1]);
                // heap.set ( GetInverse ( foo ), offset + 5 ); // --> 219


                // heap.set ( GetInverse( obst.matrix ), offset + 5 ); // --> 219
              }
              else {
                MultiplyMatrices2(temp_matrix, obst.parent_matrix, temp_matrix2);
                MultiplyMatrices2(temp_matrix, temp_matrix, obst.matrix);

                temp_matrix2[12] = -obst.width/2;
                temp_matrix2[13] = -obst.height/2;

                MultiplyMatrices2(temp_matrix, temp_matrix, temp_matrix2);
                heap.set ( GetInverse2 ( temp_matrix, temp_matrix ), offset + 5 );

                // var foo = (MultiplyMatrices(obst.parent_matrix, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, obst.width/2, obst.height/2, 0, 1]));
                // foo = MultiplyMatrices(foo, obst.matrix);
                // foo = MultiplyMatrices(foo, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -obst.width/2, -obst.height/2, 0, 1]);
                // foo = GetInverse(foo);
                // heap.set ( foo, offset + 5 );


                // heap.set (GetInverse (MultiplyMatrices(obst.parent_matrix, obst.matrix )), offset + 5 );
              }
          }

          // heap.set ( world_arr_rev_temp, offset + 70 );
          heap.set ( [obst.tri ? 1 : 2], offset + 99 ); // 285 + 1 + 3 * 4

          heap.set( [
              obst.triangles[0].points[0].x,obst.triangles[0].points[0].y,obst.triangles[0].points[0].z,
              obst.triangles[0].points[1].x,obst.triangles[0].points[1].y,obst.triangles[0].points[1].z,
              obst.triangles[0].points[2].x,obst.triangles[0].points[2].y,obst.triangles[0].points[2].z
            ], offset + 100 );
          heap.set( [obst.triangles[0].point_edge.x,obst.triangles[0].point_edge.y,obst.triangles[0].point_edge.z], offset + 109 );
          heap.set( [obst.triangles[0].edge1.x,obst.triangles[0].edge1.y,obst.triangles[0].edge1.z], offset + 112 );
          heap.set( [obst.triangles[0].edge2.x,obst.triangles[0].edge2.y,obst.triangles[0].edge2.z], offset + 115 );
          heap.set( [obst.triangles[0].normal.x,obst.triangles[0].normal.y,obst.triangles[0].normal.z], offset + 118 );

          if (!obst.tri)
          {
              heap.set( [
                  obst.triangles[1].points[0].x,obst.triangles[1].points[0].y,obst.triangles[1].points[0].z,
                  obst.triangles[1].points[1].x,obst.triangles[1].points[1].y,obst.triangles[1].points[1].z,
                  obst.triangles[1].points[2].x,obst.triangles[1].points[2].y,obst.triangles[1].points[2].z
                ], offset + 121 );
              heap.set( [obst.triangles[1].point_edge.x,obst.triangles[1].point_edge.y,obst.triangles[1].point_edge.z], offset + 130 );
              heap.set( [obst.triangles[1].edge1.x,obst.triangles[1].edge1.y,obst.triangles[1].edge1.z], offset + 133 );
              heap.set( [obst.triangles[1].edge2.x,obst.triangles[1].edge2.y,obst.triangles[1].edge2.z], offset + 136 );
              heap.set( [obst.triangles[1].normal.x,obst.triangles[1].normal.y,obst.triangles[1].normal.z], offset + 139 );
          }

          // ---
        }

        // 32 - 33 width and of element                   1
        // 34 - 35 width and height of shadow            +1
        // ---------------------------------------- 
        // 36 - 51, node_matrix                          +16
        // 52 - 67, xxxxxxxxxxx                          +16
        // 68 - 83, xxxxxxxxxxx                          +16
        // 84 - 99, xxxxxxxxxxx                          +16

        // 100 - 101 width and height                     +2
        // 102 - 117 world_arr_reversed                   +16
        // 118 - how many vertices (4 max)                +1
        // 122 - 126 (vertices)                           +12
        //
        // 131     - how many triangles                   +1
        // 132 - 130 point_1
        // 135 - 133 point_2
        // 138 - 136 point_3
        // 141 - 139 point_edge
        // 144 - 142 -- triangle edge1
        // 147 - 145 -- triangle edge2
        // 151 - 148 -- triangle normal
        // -----------------------------------------
        // Triangles x 20
        //-----------------------------------------
        // 153 - How many elements we intersect
        // 154 - offsets of the intersecting elements
        // 155 ---------- (assuming 3)
        // 156 ----------
        //-------------------------------------------
        //  +16900   ([34]  * [35] * 4) for the image (Uint8Array though)
        //-------------------------------------------

        // if (node.id === 'wall-sto-main-1') debugger;

        ASM_LIB.AsmLightApply ( 32 );

        //if (node.id === 'floor-corner-2')
        //    ASM_LIB.AsmBlur ( (ASM_HEAP.byteLength - 16900), w, h );

        // gaussian blur now....
/*
        var lalala = new Uint8ClampedArray ( ASM_HEAP, ASM_HEAP.byteLength - 16900 );
        var zz = document.createElement('canvas');
        zz.title = node.id;
        zz.style.margin = '5px';
        zz.style.border = '1px solid blue';
        zz.width = 65; zz.height = 65;
        var zzx = zz.getContext('2d', {alpha:true});
        zzx.putImageData (new ImageData (lalala, 65, 65), 0, 0);
        document.body.appendChild( zz );
*/

        // PERF-HELL 70ms in asmjs

        new Uint8Array ( ASM_HEAP ).set ( c_img_lr.data, 36 );

        // if (node.id === 'wall-3')
        ASM_LIB.AsmShadowColor ( 32, ASM_HEAP.byteLength - 16900 );

        var rgba_data = new Uint8ClampedArray ( ASM_HEAP, ASM_HEAP.byteLength - 16900 );
        var sad = rgba_data;

/*
        var nn = document.createElement('canvas');
        nn.title = node.id;
        nn.style.margin = '5px';
        nn.style.border = '1px solid yellow';
        nn.width = 65; nn.height = 65;
        var nnx = nn.getContext('2d', {alpha:true});
        nnx.putImageData (new ImageData (sad, 65, 65), 0, 0);
        document.body.appendChild( nn );
*/



        // var sad = rgba_data;

        //var shadow_bitmap = new ImageData ( rgba_data, w, h );
        // var mad = node.light_ctx.getImageData(0,0, w, h).data;

        //return ;
        //var xoo = new ImageData (dstimg.data, dstimg.width, dstimg.height);
        //var c_shadow222 = d.createElement('canvas');
        //c_shadow222.width = dstimg.width; c_shadow222.height = dstimg.height;
        //var c_shadow_ctx222 = c_shadow222.getContext('2d', { alpha: true });
        //c_shadow_ctx222.putImageData (xoo, 0, 0);

        //c_shadow_ctx.globalCompositeOperation = 'source-over';
        //c_shadow_ctx.putImageData (shadow_bitmap, 0, 0);
        //c_shadow_ctx.filter = "blur(1px)";
        //c_shadow_ctx.drawImage (c_shadow, 0, 0);

// #### IMPORTANT DEBUG
//              var ttt = window.performance.now();
//              var zz = new Image();
//              zz.style.margin = '5px';
//              zz.style.border = '1px solid blue';
//              zz.src = c_shadow.toDataURL ('image/png', 0.8);
//              document.body.appendChild( zz );

//              return ;

//        c_shadow_ctx.filter = "none";
//        c_shadow_ctx.globalCompositeOperation = 'source-atop';
//        c_shadow_ctx.drawImage ( c_light_rescale, 0, 0, 3, 3, 0, 0, w, h );

// #### IMPORTANT DEBUG
//              var rr = new Image();
//              rr.style.margin = '5px';
//              rr.style.border = '1px solid green';
//              rr.src = c_shadow.toDataURL ('image/png', 0.8);
//              document.body.appendChild( rr );

        // PERF-HELL
//        var sad = c_shadow_ctx.getImageData(0, 0, w, h).data;

        var mad = node.light_data;
        if (!mad) {
          mad = node.light_ctx.getImageData(0,0, w, h).data;
        }

        var max_offset = 1024*1024;
        var heap = new Uint8Array ( ASM_HEAP );

        heap.set (sad, max_offset);
        heap.set (mad, max_offset + sad.length);

        ASM_LIB.AsmColorMix ( w, h, max_offset, (max_offset + sad.length) ); // ); AsmColorMix

        var rgba_data = new Uint8ClampedArray ( ASM_HEAP, (max_offset + sad.length), sad.length );
        var img_data = new ImageData ( rgba_data, w, h );
        node.light_data = rgba_data.slice (0);
        node.light_ctx.putImageData (img_data, 0, 0);

/*
              var ee = new Image();
              ee.src = node.light_map.toDataURL ('image/png', 0.8);
              ee.style.margin = '5px';
              ee.style.border = '1px solid darkred';
              document.body.appendChild( ee );
*/

//              var kl = document.createElement('div');
//              kl.style.padding='0 0 15px 10px';
//
//              kl.innerHTML = node.id + ' <span style="color:rgb(' + light.color.r + ',' + light.color.g + ',' + light.color.b + ');">(' + light.id + ')</span>';
//              document.body.appendChild( kl );
// #### IMPORTANT DEBUG

        // ----
    }

    // ----
  };



  function _RenderLight( node, fast_compute ) {
    if( node.object )
    {
      debugger;
      node = node.geom[0];
    }

    if (!node.light_map || !node.el) return ;

    var ctx = node.light_ctx; // node.light_map.getContext('2d', { alpha: !!node.alpha });
    // ctx.putImageData ( node.light_bitmap, 0, 0);

    (function ( node, fast_compute ) {
      var node_type = node.type_ref;

      if (!node_type)
      {
        node_type = node._parent.type_ref;
      }

      var type_canvas = node_type.canvas;

      // console.log( node.id, type_canvas.width, type_canvas.height ); // ####

      // check if we have preloaded stuff
      var draw_image = function () {
        var type_canvas = node_type.canvas;

        // var xxx = window.performance.now();

        var w = type_canvas.width;
        var h = type_canvas.height;

        var nw = this.naturalWidth;
        var nh = this.naturalHeight;

        //if (node.id === 'obj-shape-3_tube_3')
        //{
        //  console.log( node );
        //  console.log( node.id );
        //  console.log( node.id, ' canvas width:', w,  ' canvas height:', h );
        //  console.log( 'image width:', nw,  'image height:', nh );
        //  console.log( 'node width:', node.width,  'node height:', node.height );
        //}


        if (node.dims)
        {
          type_canvas.width = w = Math.round(node.width);
          type_canvas.height = h = Math.round(node.height);
        }
        else if (!node_type.width)
        {
          w = nw;
          h = nh;

          // check if node type wants reduced value
          if (node_type.qv)
          {
                if (node_type.qv === 256)
                {
                  if (w > 256 || h > 256)
                  {
                    w = (w / 2) >> 0;
                    h = (h / 2) >> 0;
                  }
                }
                else if (node_type.qv === 1)
                {
                  w = (w / 2) >> 0;
                  h = (h / 2) >> 0;
                }
          }

          if (type_canvas.width !== w)
          {
            type_canvas.width = w;
            type_canvas.height = h;
          }

        //  console.log( 'changed to BBB ', ' width:', w, ' height:', h );
        }

        if (node.alpha_rect && node.alpha_rect.type && node.width !== w && node.height !== h)
        {
          type_canvas.width = w = node.width;
          type_canvas.height = h = node.height;
        }


       // console.log( '----------' );


       var quality = 0.68; // 0.65;
        var type_ctx;
        if (GAME.UTILS.Browser !== 'firefox') {
          type_ctx = type_canvas.getContext ('2d', {alpha:!!node.alpha});
          // console.log( node.id, !!node.alpha );
        }
        else
          type_ctx = type_canvas.getContext ('2d', {alpha:true});


//        var ratio = w / h;
//        if (node.id === 'floor-1')
//        {
//          console.log( node.id, ' width: ', w, ' height: ', h, ' image_width ', nw, ' image_height ', nh );
//          console.log( node.light_map.width, node.light_map.height, ' ----- ', type_canvas.width, type_canvas.height );
//        }

        // type_ctx.clearRect (0, 0, w, h);

        if (!node.bg)
        {
          type_ctx.globalCompositeOperation = 'source-over';
          type_ctx.drawImage (this, 0, 0, nw, nh, 0, 0, w, h);

          if (node.decal)
          {
            var dcl = GAME.LEVEL.PRELOAD_IMG[node.decal];

            //type_canvas.style.cssText = 'position: absolute; left: 0; top: 0; z-index: 99999999; background: red; border: 2px solid blue; display: block;';
            //document.body.appendChild(type_canvas);

            var dratio = dcl.naturalWidth / dcl.naturalHeight;

            var max_width = type_canvas.width;
            var max_height = type_canvas.width / dratio;

            if (max_height > type_canvas.height)
            {
              max_height = type_canvas.height;
              max_width = type_canvas.height * dratio;

              if (max_width > type_canvas.width)
              {
                max_height *= type_canvas.width/max_width;
                max_width = max_height * dratio;
              }
            }

            var dw = 0;
            while (dw < (max_width*0.2)) dw = (Math.random() * max_width) >> 0;

            var dy = (dw / dratio) >> 0;

            var sx = (Math.random() * (type_canvas.width - dw)) >> 0;
            var sy = (Math.random() * (type_canvas.height - dy)) >> 0;

            type_ctx.drawImage (GAME.LEVEL.PRELOAD_IMG[node.decal], 0, 0, dcl.naturalWidth, dcl.naturalHeight, sx, sy, dw, dy);
          }

          type_ctx.globalCompositeOperation = 'multiply';
          type_ctx.drawImage (node.light_map, 0, 0, node.light_map.width, node.light_map.height, 0, 0, w, h);
        }
        else
        {
                        // apply mask
                        if (!node.bg_orig)
                        {
                          node.bg_orig = window.getComputedStyle (node.el).background;

                          if (!node.bg_orig)
                          {
                            var tt = window.getComputedStyle (node.el);
                            if (!!tt['background-image'])
                            {
                                node.bg_orig = tt['background-image'] + "  " + tt['background-position'] + " / " + tt['background-size'];
                            }
                            else
                            {
                                move.appendChild(node.el);
                                node.bg_orig = tt['background-image'] + "  " + tt['background-position'] + " / " + tt['background-size'];
                                move.removeChild(node.el);
                            }
                          }
                          else
                          {
                            node.bg_orig = node.bg_orig.replace('rgba(0, 0, 0, 0)','');
                          }
                        }

                        var map = node.light_map.toDataURL ('image/jpeg', 0.55);

                        var bg_size = '100% 100%';
                        node.el.style.background = 'url(' + map + ') 0 0 / ' + '100% 100%' + ' no-repeat, ' + node.bg_orig;
                        return ;
        }

        if (node.alpha)
        {
                // if (node.id === 'trapdoor-1') {
                //    debugger;
                // }

                if (node.alpha_mask)
                {
                  type_ctx.globalCompositeOperation = 'destination-in';
                  type_ctx.imageSmoothingEnabled = false;
                  type_ctx.drawImage (node.alpha_mask === 1 ? this : node.alpha_mask, 0, 0, w, h);
                  type_ctx.imageSmoothingEnabled = true;
                }
                else if (node.alpha_rect)
                {
                    if (node.alpha_rect.type)
                    {
                        if (node.alpha_rect.type==='f')
                        {
                          node.alpha_rect.callback ( type_ctx );
                        }
                    }
                    else
                    {
                      type_ctx.clearRect (node.alpha_rect[0], node.alpha_rect[1], node.alpha_rect[2], node.alpha_rect[3]);
                    }
                }

                if (false && type_canvas.toBlob)
                {
                    // console.log( 'ccc ASM-3 ', ((window.performance.now() - xxx) >> 0) + 'ms' );

                    type_canvas.toBlob(function(blob) {
                        var tmp_path = URL.createObjectURL( blob );
                        if (node.tag === 'img')
                          node.el.src = tmp_path;
                        else
                          node.el.style.background = 'url(' + tmp_path + ') 0 0 / 100% 100% no-repeat';

                      // console.log( 'ccc ASM-4 ', type_canvas.width, type_canvas.height, ((window.performance.now() - xxx) >> 0) + 'ms' );

                    }, 'image/png', quality);
                }
                else
                {
                    if (node.tag === 'img')
                      node.el.src = type_canvas.toDataURL ('image/png', quality);
                    else
                      node.el.style.background = 'url(' + type_canvas.toDataURL ('image/png', quality) + ') 0 0 / 100% 100% no-repeat';
                }
        }
        else
        {
                if (!fast_compute && type_canvas.toBlob)
                {
                      // console.log( 'ccc ASM-5 ', ((window.performance.now() - xxx) >> 0) + 'ms' );

                      type_canvas.toBlob(function(blob) {
                          var tmp_path = URL.createObjectURL( blob );
                          if (node.tag === 'img')
                            node.el.src = tmp_path;
                         else
                            node.el.style.background = 'url(' + tmp_path + ') 0 0 / 100% 100% no-repeat';

                          // console.log( 'ccc ASM-6 ', type_canvas.width, type_canvas.height, ((window.performance.now() - xxx) >> 0) + 'ms' );

                        //  setTimeout(function(){
                        //    URL.revokeObjectURL( tmp_path );
                        //  },250);
                      //   URL.revokeObjectURL( tmp_path );
                      }, 'image/jpeg', quality);
                }
                else
                {
                  if (node.tag === 'img')
                     node.el.src = type_canvas.toDataURL ('image/jpeg', quality);
                   else
                    node.el.style.background = 'url(' + type_canvas.toDataURL ('image/jpeg', quality) + ') 0 0 / 100% 100% no-repeat';

                   // console.log( 'ccc ASM-7 ', type_canvas.width, type_canvas.height, ((window.performance.now() - xxx) >> 0) + 'ms' );
                }
                // --
        }
      };

      // -------
      var src = '';
      if (DEBUG)
        src = '3d/debug_square.jpg';
      else
        src = node.img || node_type.img;

      var img = GAME.LEVEL.PRELOAD_IMG[src];

      if (img && img.complete) {
        draw_image.call(img);
      }
      else {
        var temp_img = new Image();
        temp_img.onload = draw_image;
        temp_img.onerror = function() {
          console.log( 'ERROR ', this.src, node );
        };

        if (!src) {
          console.log( 'ERROR ', node );
          // src = '3d/debug_square.jpg';
        } else  temp_img.src = src;
      }

    })( node, fast_compute );

    // node.el.src = map;
    // node.el.style.background = 'url(' + map + ') 0 0 / ' + bg_size + ' no-repeat, ' + node.bg_orig;
  }


  function _angle (p1, p2) {
    var delta_y = p2.z - p1.z;
    var delta_x = p1.x - p2.x;
    var theta_radians = Math.atan2(delta_y, delta_x);

    return Math.round(theta_radians * 180 / Math.PI);
  }


  function _intersectsPlane ( ray_origin, direction, obstacle, reversed ) {

        var ray_direction = direction.clone ();
        var temp_vec = new Vector ();
        ray_direction   = ray_direction.subtract ( ray_origin ).unit ();

        var is_covered = (function (obstacle, curr_vertex) {
                            var obstacle_verts = obstacle.vertices;
                            var v1_a; //, v2_a, v3_a;

                            for (var triangle_count = 0; triangle_count < 2; ++triangle_count)
                            {
                                  var triangle = null;
                                  if (triangle_count === 0) {
                                    triangle = obstacle.triangles[0];
                                  }
                                  else {
                                    triangle = obstacle.triangles[1];
                                  }
                                  if (!triangle) continue;

                                  v1_a = triangle.point_edge;
                                  var edge1_a = triangle.edge1;
                                  var edge2_a = triangle.edge2;
                                  var triangle_normal_01 = triangle.normal;

                                  var DdN = ray_direction.dot( triangle_normal_01 );
                                  var sign = 0;
                                  var intersects = true;

                                  if ( DdN > 0 ) {
                                    sign = 1;
                                  } else if ( DdN < 0 ) {
                                    sign = - 1;
                                    DdN = - DdN;
                                  } else {
                                    intersects = false;
                                    continue;
                                  }

                                  var diff = ray_origin.subtract (v1_a);
                                  var DdQxE2 = sign * ray_direction.dot( diff.cross( edge2_a ) );
                                  // var DdQxE2 = sign * ray_direction.dot( edge2_a.cross( diff ) );

                                  var QdN = 0, DdE1xQ = 0;

                                  if (intersects)
                                  {
                                    if ( DdQxE2 < 0 )
                                    {
                                        intersects = false;
                                        continue;
                                    }
                                    else
                                    {
                                          // DdE1xQ = sign * ray_direction.dot( diff.cross( edge1_a ) );
                                          DdE1xQ = sign * ray_direction.dot( edge1_a.cross( diff ) );

                                          if ( DdE1xQ < 0 )
                                          {
                                            // aou_debug && console.log( 'NOINTER  DdE1xQ negative', DdE1xQ, sign);
                                            intersects = false;
                                            continue;
                                          }
                                          else
                                          {
                                                if (DdQxE2 + DdE1xQ > (DdN + 1) ) // DdQxE2 + DdE1xQ - DdN > 1 && DdQxE2 + DdE1xQ - DdN < 300) // DdQxE2 + DdE1xQ > DdN )
                                                {
                                                  intersects = false;
                                                  continue;
                                                }
                                                else
                                                {
                                                    QdN = - sign * diff.dot( triangle_normal_01 );
                                                    if ( QdN < 0 )
                                                    {
                                                      intersects = false;
                                                      continue;
                                                    }
                                                }
                                          }
                                          // -
                                    }
                                  }

                                  if (intersects)
                                  {
                                    temp_vec.x = ray_direction.x;
                                    temp_vec.y = ray_direction.y;
                                    temp_vec.z = ray_direction.z;

                                    temp_vec = temp_vec.multiplyScalar( QdN / DdN ).add( ray_origin );

                                    var new_dist = DistanceVector(ray_origin, temp_vec);
                                    var old_dist = DistanceVector(ray_origin, curr_vertex);

                                    if (new_dist + 5 < old_dist)
                                    {
                                        if (reversed) return (false);
                                        return (true);
                                    }
                                    else
                                    {
                                        if (reversed) return (true);

                                        intersects = false;
                                        continue;
                                    }
                                  }
                                  // --
                            }

                            
                            return (false);
          })( obstacle, direction );

          return (is_covered);
          // ---
  };


  // -

})( window, document, GAME );
