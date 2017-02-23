define(['jquery','picturefill','slidebars','throttle-debounce'], function($) {


  $(document).ready(function(){
    // if ( !History.enabled ) {
    //      // History.js is disabled for this browser.
    //      // This is because we can optionally choose to support HTML4 browsers or not.
    //     return false;
    // }

    //++++++++++++++++++++
    //Button go-to-top
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 700,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.cd-top');
    //hide or show the "back to top" link
    function back_to_top_Throttle() 
    {
      ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
      if( $(this).scrollTop() > offset_opacity ) { 
        $back_to_top.addClass('cd-fade-out');
      }
    }
    $('[canvas]').scroll($.throttle(250, back_to_top_Throttle)); 
    //smooth scroll to top
    $back_to_top.on('click', function(event){
      event.preventDefault();
      // $('body,html').animate({
      $('[canvas]').animate({
        scrollTop: 0 ,
        }, scroll_top_duration);
    });
    //++++++++++++++++++++
  });

  (function() {
    'use strict';

    document.createElement('picture');

    //++++++++++++++++++++
    // Initialize Slidebars
    var controller = new slidebars();
    controller.init();
    // Toggle Slidebars
    $( '.js-toggle-main-menu' ).on( 'click', function ( event ) {
        
      // Stop default action and bubbling
      event.stopPropagation();
      event.preventDefault();

      // Toggle the Slidebar with id 'id-1'
      controller.toggle( 'id-1' );
    } );
    //++++++++++++++++++++

  })();


});
