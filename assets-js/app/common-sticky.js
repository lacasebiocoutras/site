define(['jquery', 'sticky', 'throttle-debounce'], function($) {

  // Sticking on asides
  var statePrecRight;
  var statePrecLeft;
  var stickyAsidesInit = function() {

    $('.sticky-aside-right').sticky({topSpacing:50, responsiveWidth:true,getWidthFrom:'Site-right-aside'});
    $('.sticky-aside-left').sticky({topSpacing:50, responsiveWidth:true,getWidthFrom:'Site-left-aside'});

    statePrecRight=$('.Site-content-right-aside').css('flex-direction');
    if(statePrecRight === 'column') {
      $('.sticky-aside-right').unstick();
    }
    statePrecLeft=$('.Site-main').css('flex-direction');
    if(statePrecLeft === 'column') {
      $('.sticky-aside-left').unstick();
    }
  };

  var stickyAsidesUpdate = function() {
    var directionRight=$('.Site-content-right-aside').css('flex-direction');
    if(directionRight !== statePrecRight) {
      if (directionRight ==='row') {
        $('.sticky-aside-right').sticky({topSpacing:50, responsiveWidth:true,getWidthFrom:'Site-right-aside'});
      } else {
        $('.sticky-aside-right').unstick();
      }
      statePrecRight=directionRight;
    }

    var directionLeft=$('.Site-main').css('flex-direction');
    if(directionLeft !== statePrecLeft) {
      if (directionLeft ==='row') {
        $('.sticky-aside-left').sticky({topSpacing:50, responsiveWidth:true,getWidthFrom:'Site-left-aside'});
      } else {
        $('.sticky-aside-left').unstick();
      }
      statePrecLeft=directionLeft;
    }
  };


  // -----------------------------
  // Ready event
  $(document).ready(function(){

    //init sticky asides
    stickyAsidesInit();

  });

  // -----------------------------
  // Resize event with throttle
  // from : http://benalman.com/projects/jquery-throttle-debounce-plugin/
  function resizeThrottle() {
    //unstick on asides when containers are on flex-direction column
    stickyAsidesUpdate();
  }
  $(window).resize( $.throttle( 250, resizeThrottle ) );


});
