(function ( w, d, GAME ) {
  'use strict';

  var goods = d.getElementById('goods');
  var items = goods.getElementsByClassName('item');
  var scncont = d.getElementById('scn-cntr');
  var gm = d.getElementById('gm');
  var inv_preview = d.createElement('img');
  inv_preview.id = 'inv-prvw';
  scncont.appendChild( inv_preview );


  var char_vis = false;
  var charmn = d.getElementById('char-mn');
  var fcls = d.getElementById('cls');
  charmn.onclick = fcls.onclick = function() {
    var char = d.getElementById('char');
    if (char_vis)
    {
      char.style.display = 'none';
      char.style.right = '-250px';
    }
    else
    {
      char.style.display = 'block';
      char.style.right = '0px';
    }

    char_vis = !char_vis;
  };

  var mousemove = function( e ) {
      var x = e.pageX - scncont.parentNode.offsetLeft - 16;
      var y = e.pageY - scncont.parentNode.offsetTop - 16;

      inv_preview.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0px)';
  };

  goods.addEventListener('click', function( e ) {
    e.stopPropagation();e.preventDefault();

    if (!GAME.State.control) return ;

    var target = (e.target || e.srcElement);

    if (target.tagName !== 'IMG') return ;

    if (GAME.INV.active_item)
    {
      if (target === GAME.INV.active_item)
      {
        target.className = '';
        GAME.INV.active_item = null;
      }
      else
      {
        GAME.INV.active_item.className = '';
        GAME.INV.active_item = target;
        target.className = 'act';
      }
    }
    else
    {
        GAME.INV.active_item = target;
        target.className = 'act';

        d.addEventListener('mousemove', mousemove);
    }

    if (GAME.INV.active_item)
    {
      inv_preview.src = GAME.INV.active_item.src;
      inv_preview.style.display = 'block';
    }
    else
    {
      d.removeEventListener('mousemove', mousemove);
      inv_preview.style.display = 'none';
      inv_preview.style.transform = 'translate3d(-150px,-150px, 0px)';
    }

    // -
  }, false);

  GAME.INV = {
    preview: inv_preview,
    active_item : null,
    slots : new Array (items.length)
  };

  GAME.INV.FindItemById = function ( id ) {
    var slots = GAME.INV.slots;
    var ind = -1;

    for (var i = 0; i < slots.length; ++i)
    {
      if (slots[i] && slots[i].id === id)
      {
        ind = i;
        break;
      }
    }

    if (ind === -1) return (false);

    return (slots[ind]);
  };

  GAME.INV.AddItem = function ( item ) {
    // first find empty slot

    var slots = GAME.INV.slots;
    var index = -1;

    for (var i = 0; i < slots.length; ++i)
    {
      if (!slots[i])
      {
        index = i;
        break;
      }
    }

    if (index === -1) return (false);

    slots[index] = item;
    item.picked_up = true;

    // render inventory
    GAME.INV.Render ();
  };

  GAME.INV.RemoveItem = function ( index ) {
    var slots = GAME.INV.slots;

    if (!slots[ index ]) return ;
    if (GAME.INV.active_item && items[ index ] === GAME.INV.active_item.parentNode)
    {
      GAME.INV.active_item = null;
      d.removeEventListener('mousemove', mousemove);
      inv_preview.style.display = 'none';
      inv_preview.style.transform = 'translate3d(-150px,-150px, 0px)';
    }

    slots.splice (index, 1);
    slots.push(null);

    GAME.INV.Render ();
  };

  GAME.INV.Render = function () {
    var slots = GAME.INV.slots;
    var index = -1;

    for (var i = 0; i < slots.length; ++i)
    {
      if (!slots[i]) items[i].innerHTML = '';
      else
      {
        var xtr = '';
        if (!GAME.UTILS.Mobile && slots[i].desc) xtr = 'title="' + slots[i].desc + '"';
        if (slots[i].use) xtr += ' data-use="' + slots[i].use + '"';

        items[i].innerHTML = '<img ondragend="GAME.INV.DragEnd(this)" ' + xtr + ' draggable="true" data-id="'+ slots[i].id + '" data-index="' + i + '" src="' + slots[i].icon + '"/>';
      }
      // ---
    }
  };

  GAME.INV.Deselect = function () {
    if (!GAME.INV.active_item) return ;

    GAME.INV.active_item.className = '';
    GAME.INV.active_item = null;
    d.removeEventListener('mousemove', mousemove);
    inv_preview.style.display = 'none';
    inv_preview.style.transform = 'translate3d(-150px,-150px, 0px)';
  };

  GAME.INV.DragEnd = function ( el ) {
    var element =  document.elementFromPoint ( drag_x - window.scrollX, drag_y - window.scrollY );
    if (!element) return ;
    // check to see if the element is a target for interaction

    var use = el.getAttribute('data-use');
    if (use)
    {
      if (element.getAttribute('data-use') === use)
      {
          var slots = GAME.INV.slots;
          var ind = -1;
          var id = el.getAttribute('data-id');

          for (var i = 0; i < slots.length; ++i)
          {
            if (slots[i] && slots[i].id === id)
            {
              ind = i;
              break;
            }
          }

          slots[ind] && slots[ind].use_cb(slots[i], el, element);

          GAME.INV.Deselect();
          return ;
      }
    }

    GAME.INV.Deselect();

    for (var k in GAME.LEVEL.MAP.NODES)
    {
      var node = GAME.LEVEL.MAP.NODES[k];

      if (!node || !node.object || node.hidden || !node.interact) continue;

      if (node.el === element || node.el === element.parentNode) {
        // var previous_active = GAME.INV.active_item;
        GAME.INV.active_item = el;
        node.interact.call(node.el);

        GAME.INV.active_item = null;

        break;
      }
    }
  };

  var drag_x = 0, drag_y = 0;
  gm.addEventListener('drop', function( event ) {
      event.preventDefault();
  }, false);
  gm.addEventListener('dragover', function( event ) {
      event.preventDefault();

      drag_x = event.pageX; drag_y = event.pageY;
      //# console.log( document.elementFromPoint ( event.pageX, event.pageY ), document.elementsFromPoint ( event.pageX, event.pageY ) );
  }, false);

})( window, document, GAME );