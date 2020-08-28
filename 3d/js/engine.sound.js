(function ( w, d, GAME ) {
    'use strict';

    var container = d.getElementById('snd-cntr');

    var steps_switch = 0;
    var step1 = d.getElementById('sound-footsteps-1'),
        step2 = d.getElementById('sound-footsteps-2');
    var steps_extra = null, prev_step = null;

    var loop_arr = [];

    GAME.Sound = {
      ON : true,
      PlayStep : function() {
        if (!GAME.Sound.ON) return (false);

        var step = null;
        if (steps_switch === 0)
        {
          step = step1;
          steps_switch = 1;
        }
        else if (steps_switch === 1)
        {
          step = step2;
          steps_switch = 0;
        }

        if (steps_extra && Math.random () > steps_extra.chance)
        {
            var rand = Math.random ();
            var l = steps_extra.sounds.length;
            while (l-- > 0)
            {
              if (rand > steps_extra.sounds[l].chance && prev_step !== steps_extra.sounds[l].sound) {
                step = steps_extra.sounds[l].sound;
                break;
              }
            }
            // - 
        }

        if (step.readyState >= 2)
        {
          step.currentTime = 0.0;
          var p = step.play();
          if (p) p.catch(function(e){});

          prev_step = step;
          return (true);
        }

        return (false);
      },

      SetSteps : function (step_1, step_2, extra) {
        if (typeof step_1 === 'string') step_1 = d.getElementById ( step_1 );
        if (typeof step_2 === 'string') step_2 = d.getElementById ( step_2 );

        if (step_1 && step_2)
        {
          step1 = step_1;
          step2 = step_2;
        }

        if (extra)
        {
          for (var i = 0; i < extra.sounds.length; ++i)
          {
            if (typeof extra.sounds[i].sound === 'string')
                extra.sounds[i].sound = d.getElementById ( extra.sounds[i].sound );
          }

          steps_extra = extra;
        }
        else steps_extra = null;
      },

      Volume : function ( sound_id, val ) {
          var el = d.getElementById( sound_id );
          if (!el) return (false);

          el.setAttribute ('data-volume', val);
          el.volume = val;
      },

      Play : function ( sound_id, distance, interupt ) {
          if (!GAME.Sound.ON) return (false);
          if (distance/1 === distance && distance < 0.02) return (false);

          var el = d.getElementById( sound_id );
          if (!el) return (false);
          if (!interupt && !el.paused) return (false);

          if (el.readyState >= 2)
          {
            var default_volume = (el.getAttribute('data-volume') / 1);
            if (distance)
              el.volume = (default_volume * distance).toFixed(2) / 1;
            else if (el.volume !== default_volume)
              el.volume = default_volume;

            if (interupt && !el.paused) {
              el.currentTime = 0;
              return (true);                
            }

            var p = el.play();
            if (p) p.catch(function(e){});
            return (true);
          }

          return (false);
      },

      Stop : function ( sound_id ) {
          // if (!GAME.Sound.ON) return (false);
          var el = d.getElementById( sound_id );
          if (!el) /*|| el.readyState !== 4)*/ return (false);

          if (!el.paused) el.pause ();
          el.currentTime = 0.0;

          return (true);
      },

      Load : function ( sound_id, path, volume, loop ) {
        if (d.getElementById (sound_id)) return (false);

        var el = d.createElement('audio');
        el.id = sound_id;
        el.setAttribute('preload', 'auto');

        if (volume) {
          el.setAttribute('data-volume', volume);
          el.volume = volume / 1;
        } else {
          el.setAttribute('data-volume', '1');
        }

        if (loop) {
          el.setAttribute('loop', 'loop');
          loop_arr.push ( el );
        }

        el.src = path;
        container.appendChild( el );

        return (true);
      },

      Toggle : function () {
        GAME.Sound.ON = !GAME.Sound.ON;

        if (!GAME.Sound.ON)
        {
              // for (var i = 0; i < loop_arr.length; ++i)
              // {
              //   if (!loop_arr[i].paused) {
              //     loop_arr[i].pause ();
              //   }
              // }

              // -- now find playing elements
              var audio_els = container.getElementsByTagName ('audio');
              for (var i = 0; i < audio_els.length; ++i)
              {
                if (!audio_els[i].paused) {
                  audio_els[i].pause ();
                }
              }
        }
        else
        {
              for (var i = 0; i < loop_arr.length; ++i)
              {
                GAME.Sound.Play( loop_arr[i].id );
              }
        }

        return (GAME.Sound.ON);
        // ---
      }
    };

})( window, document, GAME );