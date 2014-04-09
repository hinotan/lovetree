// onMediaQuery scripts...

var queries = [
  {
    context: 'mobile',
    match: function() {
      console.log('Mobile callback. Maybe hook up some tel: numbers?');

      // Your mobile specific logic can go here.
        $('.flexslider').flexslider();

      // Menu control
        $('nav .home a').click(function(){
          $('.active-screen').fadeOut(1000);
          $('#moments').fadeIn(1000).addClass('active-screen');
          $('body').addClass('show-moments');
        });
        $('nav .history a').click(function(){
          // Show story-of-two slides
          $('#story-of-two').fadeIn(1000).addClass('active-screen');
          $('body').addClass('show-story');
        });
    },
    unmatch: function() {
      // We're leaving mobile.
    }
  },
  {
    context: 'tablet',
    match: function() {
      console.log('skinny callback! Swap the class on the body element.');
      // Your tablet specific logic can go here.
    },
    unmatch: function() {
      console.log('leaving skinny context!');
    }
  },
  {
    context: ['tablet', 'desktop'],
    call_for_each_context: false,
    match: function() {
      console.log('a callback which spans multiple breakpoints, tablet and desktop!');

      // Now do things proper for big screens.
        'use strict';
        EnableSvgStroke();
        EnablePopup();
        EnableStorySlide();
        EnableLeafHighLightAnimation();

      // Menu control
        $('nav .home a').click(function(){
          $('.active-screen').fadeOut(1000);
          $('body').removeClass();
        });
        $('nav .history a').click(function(){
          // Show story-of-two slides
          $('#story-of-two').fadeIn(1000).addClass('active-screen');
          $('body').addClass('show-story');
        });

      // setting 'call_for_each_context' to false means this callback will only fire once across this range of breakpoints
    },
    unmatch: function() {
      console.log('leaving small context!');
    }
  },
  {
    context: 'desktop',
    match: function() {
      console.log('desktop callback woohoo! Load some heavy desktop JS badddness.');
      // your desktop specific logic can go here.
    }
  }
];
// Go!
MQ.init(queries);





// http://tympanus.net/codrops/2013/12/30/svg-drawing-animation/
function EnableSvgStroke()
{
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

      // add a animation effect indicating clickable leaves
      if (window.enableLeafHighLightAnimation == true)
      	leavesAnimationHandler = window.requestAnimationFrame(LeavesAnimation);

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
};

function EnablePopup()
{
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
        $(".popup").not("#"+target).fadeOut().removeClass("active");

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
            $target.css("top", (window.innerHeight - popupHeight) + "px" ).addClass("active top-arrow");
          }

          // decide div's horizontal position
          var horizontalPosition = mouseX - popupWidth/2 - 10;
          if(horizontalPosition + popupWidth + 20 > window.innerWidth) // look like must consider border width 10px
          {
            horizontalPosition = window.innerWidth - popupWidth - 20;
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
    $(".popup").fadeOut().removeClass("active");
  }

};

function EnableStorySlide()
{
	var funcPrev = function()
  {
    $(this).removeClass('prev').addClass('current');

    if ($(this).prev()) {
      $(this).prev().removeClass('hidden').addClass('prev');
      $(this).prev().click(funcPrev);
    }
    if ($(this).next()) {
      $(this).next().removeClass('current').addClass('next');
      // add next click event handler here
      $(this).next().click(func);
    }
    if ($(this).next().next()) {
      $(this).next().next().removeClass('next').addClass('hidden');
      // delete event handler
      $(this).next().next().click(undefined);
    }
  }

  var func = function(){
    $(this).removeClass('next').addClass('current');

    if ($(this).next()) {
      $(this).next().removeClass('hidden').addClass('next');
      $(this).next().click(func);
    }
    if ($(this).prev()) {
      $(this).prev().removeClass('current').addClass('prev');
      $(this).prev().click(funcPrev);
    }
    if ($(this).prev().prev()) {
      $(this).prev().prev().removeClass('prev').addClass('hidden');
    // delete event handler
    $(this).prev().prev().click(undefined);
    }
  };
  // 
  $('#story-of-two .next').click(func);
};

var leavesAnimationHandler;
var intervalFrames = 60;
var leafIndex = 0;
var frameCount = 0;
var LeavesAnimation = function()
{
	frameCount++;
	if (frameCount % intervalFrames == 0)
	{
 		frameCount = 0;
  		intervalFrames = Math.floor((Math.random()*120)+60); // random between 1s to 3s
  		leafIndex = Math.floor((Math.random()*15)); // random which leaf
  		var leaf = $("#leaves-highlight path")[leafIndex];
  		var HighLight = function (obj)
  		{
	  		$(obj).css("fill", "#e7636d");
	  		$(obj).css("-webkit-transform", "rotate(10deg)");
	  		$(obj).css("-moz-transform", "rotate(10deg)");
	  		$(obj).css("-ms-transform", "rotate(10deg)");
	  		$(obj).css("-o-transform", "rotate(10deg)");
	  		$(obj).css("transform", "rotate(10deg)");
  		}
  		var UnHighLight = function(obj)
  		{
  			$(obj).css("fill", "");
	  		$(obj).css("-webkit-transform", "");
	  		$(obj).css("-moz-transform", "");
	  		$(obj).css("-ms-transform", "");
	  		$(obj).css("-o-transform", "");
	  		$(obj).css("transform", "");
  		}
  		HighLight(leaf);
  		setTimeout(function(){UnHighLight(leaf)}, 2000); //set back to original color 2s later
  	};
  	window.requestAnimationFrame(LeavesAnimation);
}
function EnableLeafHighLightAnimation()
{
  window.enableLeafHighLightAnimation = true;
};



