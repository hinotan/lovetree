/**
 * svganimations.js v1.0.0
 * http://www.codrops.com
 *
 * the svg path animation is based on http://24ways.org/2013/animating-vectors-with-svg/ by Brian Suda (@briansuda)
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function() {

  'use strict';

  var docElem = window.document.documentElement;

  window.requestAnimFrame = function(){
    return (
      window.requestAnimationFrame       || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame    || 
      window.oRequestAnimationFrame      || 
      window.msRequestAnimationFrame     || 
      function(/* function */ callback){
        window.setTimeout(callback, 1000 / 60);
      }
    );
  }();

  window.cancelAnimFrame = function(){
    return (
      window.cancelAnimationFrame       || 
      window.webkitCancelAnimationFrame || 
      window.mozCancelAnimationFrame    || 
      window.oCancelAnimationFrame      || 
      window.msCancelAnimationFrame     || 
      function(id){
        window.clearTimeout(id);
      }
    );
  }();

  function SVGEl( el ) {
    this.el = el;
    this.image = this.el.previousElementSibling;
    this.current_frame = 0;
    this.total_frames = 50;
    this.path = new Array();
    this.length = new Array();
    this.handle = 0;
    this.init();
  }

  SVGEl.prototype.init = function() {
    var self = this;
    [].slice.call( this.el.querySelectorAll( 'path' ) ).forEach( function( path, i ) {
      self.path[i] = path;
      var l = self.path[i].getTotalLength();
      self.length[i] = l;
      self.path[i].style.strokeDasharray = l + ' ' + l; 
      self.path[i].style.strokeDashoffset = l;
    } );
  };

  SVGEl.prototype.render = function() {
    if( this.rendered ) return;
    this.rendered = true;
    this.draw();
  };

  SVGEl.prototype.draw = function() {
    var self = this,
      progress = this.current_frame/this.total_frames;
    if (progress > 1) {
      window.cancelAnimFrame(this.handle);

      $('#the-tree').removeClass('show-lines').addClass('show-color');

    } else {
      this.current_frame++;
      for(var j=0, len = this.path.length; j<len;j++){
        this.path[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
      }
      this.handle = window.requestAnimFrame(function() { self.draw(); });
    }
  };

  SVGEl.prototype.showImage = function() {
    classie.add( this.image, 'show' );
    classie.add( this.el, 'hide' );
  };

  function getViewportH() {
    var client = docElem['clientHeight'],
      inner = window['innerHeight'];
     
    if( client < inner )
      return inner;
    else
      return client;
  }
 
  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }
 
  // http://stackoverflow.com/a/5598797/989439
  function getOffset( el ) {
    var offsetTop = 0, offsetLeft = 0;
    do {
      if ( !isNaN( el.offsetTop ) ) {
        offsetTop += el.offsetTop;
      }
      if ( !isNaN( el.offsetLeft ) ) {
        offsetLeft += el.offsetLeft;
      }
    } while( el = el.offsetParent )
 
    return {
      top : offsetTop,
      left : offsetLeft
    };
  }
 
  function inViewport( el, h ) {
    var elH = el.offsetHeight,
      scrolled = scrollY(),
      viewed = scrolled + getViewportH(),
      elTop = getOffset(el).top,
      elBottom = elTop + elH,
      // if 0, the element is considered in the viewport as soon as it enters.
      // if 1, the element is considered in the viewport only when it's fully inside
      // value in percentage (1 >= h >= 0)
      h = h || 0;
 
    return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
  }
  
  function init() {
    var svgs = Array.prototype.slice.call( document.querySelectorAll( 'svg' ) ),
      svgArr = new Array(),
      didScroll = false,
      resizeTimeout;

    // the svgs already shown...
    svgs.forEach( function( el, i ) {
      var svg = new SVGEl( el );
      svgArr[i] = svg;
      setTimeout(function( el ) {
        return function() {
          if( inViewport( el.parentNode ) ) {
            svg.render();
          }
        };
      }( el ), 250 ); 
    } );

    var scrollHandler = function() {
        if( !didScroll ) {
          didScroll = true;
          setTimeout( function() { scrollPage(); }, 60 );
        }
      },
      scrollPage = function() {
        svgs.forEach( function( el, i ) {
          if( inViewport( el.parentNode, 0.5 ) ) {
            svgArr[i].render();
          }
        });
        didScroll = false;
      },
      resizeHandler = function() {
        function delayed() {
          scrollPage();
          resizeTimeout = null;
        }
        if ( resizeTimeout ) {
          clearTimeout( resizeTimeout );
        }
        resizeTimeout = setTimeout( delayed, 200 );
      };

    window.addEventListener( 'scroll', scrollHandler, false );
    window.addEventListener( 'resize', resizeHandler, false );
  }

  if($('#the-tree').hasClass('show-lines')) {
    init();
  } else {
    console.log('show-color');
  }

  // create a popup when click leaves-highlight
  $("#leaves-highlight path").click(
      function(ev){

        // get mouse x and y(client based coordinate)
        var mouseX = ev.clientX;
        var mouseY = ev.clientY;
        
        //var buttonIndex = 1; //well, we can get which leaf is clicked in ev, now we just assume leave 1 has been clicked
        // get target element ID through data-target value
        var target = $(this).data('target');
        var $target = $("#"+target);

        // first of all hide other popups
        $(".popup").not("#"+target).fadeOut();

        // then test if target already shows
        if (! $target.hasClass("active") )
        {
          // measure popup's size
          var popupHeight = $target.height();
          var popupWidth = $target.width();
          // decide the div's vertical position
          if (mouseY - popupHeight - 10 > 0) // enough space upward
          {
            $target.css("top", (mouseY - popupHeight - 30) + "px" ).addClass("active bottom-arrow");
          }
          else if(mouseY + popupHeight < window.innerHeight) // enough space downward
          {
            $target.css("top", mouseY + "px" ).addClass("active top-arrow");
          }
          else // ok the space is insufficient so let div lay on the client's bottom
          {
            $target.css("top", (window.innerHeight - mouseY) + "px" ).addClass("active top-arrow");
          }

          // decide div's horizontal position
          var horizontalPosition = mouseX - popupWidth/2;
          if(horizontalPosition + popupWidth > window.innerWidth)
          {
            horizontalPosition = window.innerWidth - popupWidth;
          }
          if (horizontalPosition < 0)
          {
            horizontalPosition = 0;
          }
          $target.css('left', horizontalPosition + "px");

          // bring it up!
          $target.fadeIn();
        }        
        
        ev.stopPropagation(); //we don't want event passed to it's parent node
      }
    );

  window.onclick = function() 
  {
    // so if click on document we want all popup disappear
    $(".popup").fadeOut();
  }

  var func = function(){
    console.log('click next');
    $(this).removeClass('next').addClass('current');

    if ($(this).next()) {
      $(this).next().removeClass('hidden').addClass('next');
	  $(this).next().click(func);
    }
    if ($(this).prev()) {
      $(this).prev().removeClass('current').addClass('prev');
	  // TODO: add prev click event handler here
    }
    if ($(this).prev().prev()) {    
      $(this).prev().prev().removeClass('prev').addClass('hidden');
	  // delete event handler
	  $(this).prev().prev().click(undefined);
    }
  };
  // 
  $('.story-of-two .next').click(
    func
  );


})();