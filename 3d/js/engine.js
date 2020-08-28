(function ( w, d ) {
  'use strict';

  ///////////////////////////////////////////////////////
  // DEBUG INFO
  var _log_level = 0,
      _debug = false;


  ///////////////////////////////////////////////////////
  //  MAIN OBJECT, accessible from the window
  var GAME = {};
  w.GAME = GAME;


  ///////////////////////////////////////////////////////
  // INIT GAME STATE
  _makeState ( GAME );
  _makeDebug ( GAME, _log_level, _debug );


  ///////////////////////////////////////////////////////
  // EVENTS (GAME.On for listening, Game.Fire for firing, Off for removal)
  //
  // For example, 
  // GAME.On ( 'LoadProgress', function ( percentage ) { console.log( percentage ); });
  // would fire while the LoadProgress event is fired.
  //
  // GAME.Fire ( 'LoadProgress', 0.3 );
  // would fire the event and trigger any 'On' listeners
  //
  // GAME.Off ( 'LoadProgress', func_ref );
  // Lastly, Off would remove the listener, as far as a refference 
  // to the function has been kept.
  ///////////////////////////////////////////////////////
  var _events = {};
  GAME.Fire = function ( event_name, value, value2 ) {
      var group = _events[ event_name ];
      if (!group) return (false);

      var l = group.length;
      while (l-- > 0) {
        group[l] && group[ l ] ( value, value2 );
      }
  };
  GAME.On = function ( event_name, callback ) {
      if (!_events[ event_name ])
        _events[ event_name ] = [ callback ];
      else
        _events[ event_name ].unshift ( callback  );
  };

  GAME.Off = function ( event_name, callback ) {
      var group = _events[ event_name ];
      if (!group) return (false);

      var l = group.length;
      while (l-- > 0) {
        if (group[l] === callback) { break; }
      }

      if (l !== -1) group.splice ( l, 1 );
  };


  ///////////////////////////////////////////////////////
  // Main Listeners

  // makes state checks and attempts to start the game
  GAME.Start = function ( cb_success ) {
    if (GAME.State.running || GAME.State.loading) return (false);

    if (GAME.State.loaded)
    {
      SetState ('running', true);

      w.requestAnimationFrame(function() {
        GAME.Fire ( 'ReqStart', 0 );
        cb_success && cb_success ();
      });

      return (true);
    }
  };


  // Called by the levels themselves.
  // Attempts to clean up, update object registry and start preloading assets
  GAME.On ('ReqLoadLevel', function ( level, objects ) {

    // if the level is already loaded, skip
    if (GAME.LEVEL === level) return ;

    // a level already exists, unload it
    if (GAME.LEVEL) GAME.LEVEL.DESTROY ();

    GAME.LEVEL = level;

    // make a copy of the level's objects ####
    if (!GAME.GAME_OBJ) GAME.GAME_OBJ = objects;
    else {
      for (var k in objects) GAME.GAME_OBJ[k] = objects[ k ];
    }

    // mark the game as loading
    SetState ('loading', true);

    // check and download/preload the required assets
    if (!level.PRELOAD_IMG) level.PRELOAD_IMG = {};
    if (level.PRELOAD.length === 0)
    {
      GAME.Fire ( 'LoadProgress', 100 );
      GAME.Fire ( 'ReqBuildLevel', level, GAME.GAME_OBJ );

      return ;
    }

    // actual preloading
    var empty_pixel = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6P"+
        "TBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpK"+
        "SkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAABAAEDASIAAhEBAxEB/8QAFQABA"+
        "QAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKYAH//Z";

    var total = level.PRELOAD.length, sofar = 0;
    for (var i = 0; i < total; ++i)
    {
      var pic = new Image ();

      pic.crossOrigin = 'Anonymous';
      pic.onload = function ()
      {
          if (++sofar === total)
          {
            GAME.Fire ( 'LoadProgress', 100 );
            GAME.Fire ( 'ReqBuildLevel', level, GAME.GAME_OBJ );
          }
          else
          {
            GAME.Fire ( 'LoadProgress', ((sofar / total) * 100) >> 0 );
          }
      };

      // if we failed to load the image, replace with 1px base64 jpeg
      pic.onerror = function () {
        pic.src = empty_pixel;
      };

      var src = level.PRELOAD[i];
      pic.src = src;

      level.PRELOAD_IMG[ src ] = pic;
    }

    // -
  });


  GAME.On ( 'ReqStart', function ( level, objects ) {
      SetState ('control', true);
  });


  var __ai_nodes = [];
  GAME.AI = {
    Add : function (node) {
      __ai_nodes.push (node);

      if (__ai_nodes.length === 1) {
        this.Init ();
      }
    },

    Remove : function (index) {
      if (index === 0) {
        GAME.__ai = null;
        __ai_nodes = [];
      }
    },

    Init : function () {
      GAME.__ai = function ( e ) {
          var node = __ai_nodes[0];
          !node.hidden && node.onframe (node, e);
      };
    }
  }; 


  ///////////////////////////////////////////////////////
  // Execute with X frame rate. If much bigger time gaps are seen
  // then you can use that info to make bigger changes
  // eg, if you have a 30 frame per second bullet, but the game runs at 10 fps, you can still
  // keep the 30 frame per second speed, instead of having users get shot 3 times slower.
  // Also requestAnimationFrame uses the screen refresh rate, so this way super fast screens 
  // will not influence render calls into firing 144 times per second or other unholly frequencies.
  // This is good logic.
  GAME.OnFrame = function ( frame_rate, repeat_times, callback ) {
      var time_per_frame = (1000 / frame_rate) >> 0;
      var remove = ((time_per_frame / 16.6) >> 0) + 1;

      if (time_per_frame > 29) time_per_frame -= remove;

      //# console.log( 'time_per_frame ', time_per_frame, ' repeat_times ', repeat_times );

      var old_ms = w.performance.now ();
      var orig_times = 0;
      var total = 0;

      if (!repeat_times) repeat_times = 0;
      else orig_times = repeat_times;

      var func = function ( e ) {

          // if we are out of focus prevent execution
          if (!GAME.State.focus || GAME.State.dialog)
          {
            old_ms = e;
            w.requestAnimationFrame ( func );
            return ;
          }

          var gap = e - old_ms;
          if (gap >= time_per_frame)
          {
            total += gap;

            //# console.log( 'total time ', total >> 0, '  count ', orig_times - repeat_times  );

            var skip = 0;
            if (callback)
            {
              skip = callback ( (orig_times - repeat_times), (total >> 0), (gap / (time_per_frame + remove)) ); // gap between the calls
            }

            if (skip && skip/1 === skip) repeat_times -= (skip/1) >> 0;

            if (--repeat_times > 0) {}
            else return ;

            old_ms = e;
          }

          w.requestAnimationFrame ( func );
      };

      w.requestAnimationFrame ( func );
  };





  ///////////////////////////////////////////////////////
  // ACTIONS
  (function ( w, d, GAME ) {
    'use strict';

    // txt holder
    var txt = d.getElementById ( 'txt' ),
        dialog = d.getElementById ( 'dialog' );

    // overlay that covers the main window
    var dialog_cnt = dialog.childNodes[ 0 ];

    var more_btn = d.createElement ( 'a' );
    var done_btn = d.createElement ( 'a' );


    if (!GAME.ACTIONS) GAME.ACTIONS = {};

    GAME.ACTIONS.GameOver = function (game_over_txt) {
      __disable_controls ();
      __show_dialog (false);

      if (!game_over_txt) game_over_txt = 'GAME OVER';

      var container = d.getElementById('scn-cntr'); // gm

      var modal = d.createElement ('div');
      modal.id = 'gameover';
      modal.innerHTML = '<h1>' + game_over_txt + '</h1>';

      if (GAME.Sound.ON)
      {
        GAME.Sound.Toggle ();
      }

      if (d.getElementById('mob_cntrl'))
      {
        d.getElementById('mob_cntrl').style.display = 'none';
      }

      container.appendChild (modal);
    },

    // Creates or removes the dialog cover (depeds on argument)
    GAME.ACTIONS.DialogCover = function ( make ) {
      if (make)
      {
              __disable_controls ();
              __show_dialog (false);

              var cover = d.createElement('div');
              cover.className = 'cvr';

              dialog.appendChild (cover);
              setTimeout(function() {
                cover.style.opacity = '1.0';
              },24);
      }
      else
      {
            setTimeout(function() {
                var covers = dialog.getElementsByClassName('cvr');
                for (var i = 0; i < covers.length; ++i)
                {
                  (function ( cover ) {
                    if (!cover.parentNode) return ;

                    cover.style.opacity = '0';
                    setTimeout(function() {
                      cover.parentNode && cover.parentNode.removeChild( cover );
                    },1520);
                  })( covers[i] );
                }
            },24);
      }

      return (true);
    };


    // hides the dialog
    GAME.ACTIONS.DialogClose = function () {

      dialog.style.display = 'none';
      dialog_cnt.innerHTML = '';

      __hide_more_done ();

      if (GAME.INV.active_item) GAME.INV.preview.style.display = 'block';

      GAME.State.dialog = false;
      SetState ('control', true);
    };

    GAME.ACTIONS.DialogAsk = function ( type, index, sub_index, callback ) {

          __disable_controls ();
          __show_dialog (false);

          GAME.State.dialog = true;

          var check = GAME.LEVEL.TXT[ type ];
          if (!check) check = GAME.State.txt[ type ];
          if (!check) return ;

          var data = check[ index ];
          if (sub_index !== undefined && sub_index/1 === sub_index) data = data[ sub_index ];

          if (data.type === 'choice')
          {
                var clss = 'inl-bl row';
                if (data.text.length < 46) clss += ' anim_fast';
                else if (data.text.length < 64) clss += ' anim_med';

                var html = '<div class="' + clss + '"><h5>' + data.text + '</h5></div><br/>';
                dialog_cnt.innerHTML = html;

                if (data.options)
                {
                  for (var i = 0; i < data.options.length; ++i)
                  {
                    var curr = data.options[i];
                    var el = d.createElement('a');
                    el.className = 'btn';
                    el.innerHTML = curr.text;

                    el.setAttribute('data-index', i);
                    el.onclick = function( e ) {
                      e.stopPropagation(); e.preventDefault ();
                      var index = this.getAttribute('data-index') / 1;
                      callback ( index, this.innerHTML );
                    };
                    
                    dialog_cnt.appendChild( el );
                  }
                }
            // -
          }

          else if (typeof data === 'string' )
          {
            setTimeout(function () {
                var clss = 'row';
                if (data.length < 46) clss += ' anim_fast';
                else if (data.length < 64) clss += ' anim_med';

                var html = '<div class="'+ clss + '"><h5>' + data + '</h5></div>';
                dialog_cnt.innerHTML = html;

                var el = d.createElement('a');
                el.className = 'btn nxt';
                el.innerHTML = 'CONTINUE';

                el.onclick = function() {
                  var index = this.getAttribute('data-index') / 1;
                  callback ( index, this.innerHTML );
                };
                dialog_cnt.appendChild( el );
            }, 400);
          }

          // -----
    };


    var prev_ts = 0;
    var __tm_line;
    GAME.ACTIONS.nextLine = function ( el, delay ) {
        if (!GAME.State.dialog) return ;

        clearTimeout (__tm_line);

        var remaining = 0;
        var active_txt = GAME.LEVEL.TXT.ACTIVE;
        var clear_anim;

        // check to see if a next entry exists
        var type = GAME.LEVEL.TXT[ active_txt.type ];
        if (!type) type = GAME.State.txt[ active_txt.type ];
        if (!type) return ;

        var entry = type[ active_txt.index ];
        if (!entry) return ; // exit converation

        if (entry.title) entry = entry.body;

        clear_anim = function () {
          if (active_txt.el)
          {
            active_txt.el.className = 'caret';
            active_txt.anim = false;
          }

          __show_done_btn ();
        };

        if (typeof entry === 'string')
        {
          clear_anim ();
          return ;
        }

        if (entry.length > 1)
        {
          remaining = (entry.length - 1) - active_txt.sub_index;
        }

        if (remaining === 0) clear_anim ();
        else
        {
          if (delay)
          {
            __tm_line = setTimeout(function(){
              GAME.ACTIONS.nextLine( el );
            }, delay);
            return ;
          }

          var target_txt = entry[ ++active_txt.sub_index ];
          if (active_txt.el) active_txt.el.className = '';

          __make_body (target_txt, -1, '', active_txt, true);
          __show_more_btn ();
        }
        // -
    };


    GAME.ACTIONS.NextText = function ( e ) {
      if (!GAME.State.dialog) return ;

      if (e)
      {
        if (e.timeStamp - prev_ts < 150) return ;
        prev_ts = e.timeStamp;
      }

      var remaining = 0;
      var active_txt = GAME.LEVEL.TXT.ACTIVE;

      // check to see if a next entry exists
      var type = GAME.LEVEL.TXT[ active_txt.type ];
      if (!type) type = GAME.State.txt[ active_txt.type ];
      if (!type) return ;

      var entry = type[ active_txt.index ];
      if (!entry) return ;

      if (entry.title) entry = entry.body; // no multiple lines for title (by design)

      // if still animating -- display in full the current line
      if (active_txt.anim) // active_txt.el && (active_txt.el.className !== '' && active_txt.el.className !== 'caret'))
      {
          if (typeof entry === 'string'){}
          else if (entry.length > 1)
          {
            remaining = (entry.length - 1) - active_txt.sub_index;
          }

          if (remaining > 0)
          {
            var target_txt = entry[ ++active_txt.sub_index ];

            active_txt.el.className = '';
            __make_body (target_txt, -1, '', active_txt, true);
            __show_more_btn ();
          }
          else
          {
            active_txt.anim = false;
            active_txt.el.className = 'caret';

            __show_done_btn ();  
          }

          return ;
      }

      var spans = txt.getElementsByTagName ( 'span' );
      for (var i = 0; i < spans.length; ++i)
        spans[i].className = 'old';

      if (!active_txt.callback) GAME.ACTIONS.DialogClose ();
      else __hide_more_done ();

      GAME.State.dialog = false;
      SetState ('control', true);

      active_txt.sub_index = -1;
      active_txt.index = -1;
      active_txt.type = null;
      active_txt.el = null;

      active_txt.callback && active_txt.callback ();
      // --
    };



    // -------------------------
    //
    //
    GAME.ACTIONS.SetText = function ( section_name, index, callback ) {

      var section = GAME.LEVEL.TXT[ section_name ];
      if (!section) section = GAME.State.txt[ section_name ];
      if (!section) return ;

      var target_txt = section[ index ];
      var active_txt = GAME.LEVEL.TXT.ACTIVE;
      var sub_ind = 0;
      var extra_class = '';

      if (!target_txt) return ;

      __disable_controls ();
      __show_dialog (true);
      __show_more_btn ();

      GAME.State.dialog = true;

      active_txt.callback = callback;

      if (target_txt.title)
      {
        __make_headline (target_txt.title);

        // now render the rest...
        target_txt = target_txt.body;
        extra_class = ' anim_delay';
      }

      // just one string
      if (typeof target_txt === 'string')
      {
        sub_ind = -1;
        __make_body (target_txt, sub_ind, extra_class, active_txt, false );
      }

      else if (target_txt.length > 0)
      {
        __make_body (target_txt, sub_ind, extra_class, active_txt, false );
      }

      active_txt.sub_index = sub_ind;
      active_txt.type = section_name;
      active_txt.index = index;
      // ---
    };

    GAME.ACTIONS.SaveText = function ( id ) {
      GAME.State.txt[id] = GAME.LEVEL.TXT[id];
    };

    GAME.ACTIONS.SetActiveText = function ( type, index, clear_all, force_clss ) {

        if (GAME.State.dialog)
        {
          w.requestAnimationFrame (function() {
            GAME.ACTIONS.SetActiveText ( type, index, clear_all, force_clss );
          });
          return ;
        }

        var act = GAME.LEVEL.TXT.ACTIVE;
        var act_text, clss;

        if (clear_all)
        {
          act.sub_index = -1;
          act.index = -1;
          act.el = null;
          act.anim = false;
          clear_all = true;
        }
        else if (act.el)
        {
          act.el.className = 'old'; 
          act.el = null;
          act.sub_index = -1;
          // --
        }

        act_text = GAME.LEVEL.TXT[ type ];
        if (!act_text) {
          if (clear_all) txt.innerHTML = '';
          return ;
        }

        act_text = act_text[ index ];
        if (!act_text) return ;

        clss = 'anim';
        if (act_text.length < 46) clss = 'anim anim_fast';
        else if (act_text.length < 64) clss = 'anim anim_med';


        if (force_clss) { clss = force_clss; }

        act.index = index;
        act.active = type;
        act.sub_index = -1;
        act.anim = false;

        w.requestAnimationFrame(function() {
            txt.scrollTo (0,3000);

            if (clear_all)
              txt.innerHTML = '<div><div class="inl-bl"><span class="' + clss + '">' + act_text + '</span></div></div>';
            else
              txt.innerHTML += '<div><div class="inl-bl"><span class="' + clss + '">' + act_text + '</span></div></div>';

            var spans = txt.getElementsByTagName('span');
            act.el = spans[spans.length - 1];

            w.requestAnimationFrame(function() { setTimeout(function() { txt.scrollTo (0,3000); }, 30 ); });
        });
        // -
    };


    txt.addEventListener    ( 'click', GAME.ACTIONS.NextText, false );
    dialog.addEventListener ( 'click', GAME.ACTIONS.NextText, false );

    more_btn.className = done_btn.className = 'btn';
    more_btn.innerHTML = '(MORE)';
    done_btn.innerHTML = '(DONE)';

    // make more and done buttons
    txt.parentNode.appendChild ( more_btn );
    txt.parentNode.appendChild ( done_btn );


    // Helpers
    function __disable_controls () {
      GAME.ACTIONS.ResetControls ();
      SetState ('control', false);
    };

    function __show_dialog ( clear ) {
      if (clear) dialog_cnt.innerHTML = '';
      dialog.style.display = 'block';

      GAME.INV.preview.style.display = 'none';
    };

    function __make_headline ( content ) {
        dialog_cnt.innerHTML = '<div class="' + 'inl-bl row anim_med' + '"><h5>' + content + '</h5></div>'; // <br/>
    };

    function __make_body ( target_txt, sub_index, extra_class, active_txt, append ) {
        var clss = 'anim';
        var spans;
        var html;
        var last_char;
        var txt_len = 0;
        var line_delay = 'null';

        if (sub_index !== -1) target_txt = target_txt[ sub_index ];

        txt_len = target_txt.length;

        if (txt_len < 2)       clss = 'anim anim_inst';
        else if (txt_len < 46) clss = 'anim anim_fast';
        else if (txt_len < 64) clss = 'anim anim_med';

        // if the last line is a dot or an exclamation mark
        last_char = target_txt.substr(-1);
        if (last_char === ' ') last_char = target_txt.substr(-2,1);
        if (last_char === '.' || last_char === '!') {
          line_delay = 512;
        }
        else if (last_char === ',') {
          line_delay = 84;
        }

        html = '<div><div class="inl-bl"><span onanimationend="GAME.ACTIONS.nextLine(this,' + line_delay + ')" class="' + clss + extra_class + '">' + target_txt + '</span></div></div>';

        if (append)
          txt.innerHTML += html; 
        else
          txt.innerHTML = html;

        spans = txt.getElementsByTagName('span');
        active_txt.el = spans[spans.length - 1];

        active_txt.anim = true;
    }

    function __show_more_btn () {
      more_btn.style.display = 'block';
      done_btn.style.display = 'none';
    }

    function __show_done_btn () {
      more_btn.style.display = 'none';
      done_btn.style.display = 'block';
    }

    function __hide_more_done () {
      more_btn.style.display = 'none';
      done_btn.style.display = 'none';
    }

    // -
  })( w, d, GAME );
  // ENDOF ACTIONS
  ///////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////
  // helper methods
  function _makeState ( game ) {
    game.State = {
        focus  : true,
        control: false,
        running: false,
        loading: false,
        loaded:  false,
        paused:  false,
        dialog:  false,
        perf  :  {
          tx: 65,
          dist_min: 600,
          dist_max: 1840
        },

        txt:{},
        flags:{}
    };
  }


  function SetState ( name, val ) {
    var prev_val = GAME.State[ name ];

    if (prev_val === val) return ;

    GAME.State[ name ] = val;

    GAME.Fire ('StateUpdate', name, [val, prev_val] );
  };

  function _makeDebug ( game, _log_level, _debug ) {
      game.LOG = function ( a,b,c,d,e,f,g,h,i ) {
        if (a > _log_level ) return ;

        var log = console.log;
        if (i !== undefined) { log (b,c,d,e,f,g,h,i); return ;}
        if (h !== undefined) { log (b,c,d,e,f,g,h); return ;}
        if (g !== undefined) { log (b,c,d,e,f,g); return ;}
        if (f !== undefined) { log (b,c,d,e,f); return ;}
        if (e !== undefined) { log (b,c,d,e); return ;}
        if (d !== undefined) { log (b,c,d); return ;}
        if (c !== undefined) { log (b, c ); return ;}
        
        log( b );
      };

      game.DEBUG = _debug;
      game.__camera = function(){};
      game.__move = function(){};
  }

})(window, document);