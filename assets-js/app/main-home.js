// define(['jquery','lunr','moment', 'content-expirator', 'jquery.alpha', 'jquery.beta'], function($,lunr,moment) {
// define(['jquery','slick', 'sticky', 'content-expirator', 'throttle-debounce'], function($) {
// define(['jquery', 'lib/content-expirator','config-module'], function($) {
define(['jquery'], function($) {




  (function() {
    'use strict';   
    /* Flexbox supported ?*/
    var supports = {};
    var style = document.body.style;
    var flexbox = function() {
      return supports.flexbox || (supports.flexbox = ('flexBasis' in style ||
          'msFlexAlign' in style || 'webkitBoxDirection' in style));
    };
    if (!flexbox()) {
        var add_p = document.createElement('p');
        add_p.className = 'Error';
        // add_p.innerHTML = 'Your browser does not support Flexbox. Parts of this site may not appear as expected.';
        add_p.innerHTML = 'Il est conseillé de mettre à jour votre navigateur!';
        var list = document.getElementsByClassName('li-message');
        list[0].appendChild(add_p);         
    }
  })();






  // Sticking on asides
  // var statePrecRight;
  // var statePrecLeft;
  // var stickyAsidesInit = function() {

  //   $('.sticky-aside-right').sticky({topSpacing:50, responsiveWidth:true,getWidthFrom:'Site-right-aside'});
  //   $('.sticky-aside-left').sticky({topSpacing:50, responsiveWidth:true,getWidthFrom:'Site-left-aside'});

  //   statePrecRight=$('.Site-content-right-aside').css('flex-direction');
  //   if(statePrecRight === 'column') {
  //     $('.sticky-aside-right').unstick();
  //   }
  //   statePrecLeft=$('.Site-main').css('flex-direction');
  //   if(statePrecLeft === 'column') {
  //     $('.sticky-aside-left').unstick();
  //   }
  // };

  // var stickyAsidesUpdate = function() {
  //   var directionRight=$('.Site-content-right-aside').css('flex-direction');
  //   if(directionRight !== statePrecRight) {
  //     if (directionRight ==='row') {
  //       $('.sticky-aside-right').sticky({topSpacing:50, responsiveWidth:true,getWidthFrom:'Site-right-aside'});
  //     } else {
  //       $('.sticky-aside-right').unstick();
  //     }
  //     statePrecRight=directionRight;
  //   }

  //   var directionLeft=$('.Site-main').css('flex-direction');
  //   if(directionLeft !== statePrecLeft) {
  //     if (directionLeft ==='row') {
  //       $('.sticky-aside-left').sticky({topSpacing:50, responsiveWidth:true,getWidthFrom:'Site-left-aside'});
  //     } else {
  //       $('.sticky-aside-left').unstick();
  //     }
  //     statePrecLeft=directionLeft;
  //   }
  // };



  // -----------------------------
  // Ready event
  $(document).ready(function(){



    //load evenements on left aside
    // var path_json = require('config-module').base_url;
    // path_json=path_json.concat('evenement.json');
    // $('.Site-left-aside').loadEvenements(path_json);

    //gestion date fermeture on right aside
    // var path_json = require('config-module').base_url;
    // path_json=path_json.concat('fermeture.json');
    // $('.Site-right-aside').loadFermetures(path_json);

    //init sticky asides
    // stickyAsidesInit();

    // //init slider presentation, page d'acceuil
    // var dfd = $.Deferred();
    // dfd.done(slickPresentationResize);
    // dfd.done(slickPresentationInit);
    // dfd.done(function() {
    //   // $('.slider-item').removeClass('invisible');
    // });
    // dfd.resolve();
  });

  // -----------------------------
  // Resize event with throttle
  // from : http://benalman.com/projects/jquery-throttle-debounce-plugin/
  // function resizeThrottle() {
  //   //redim slider responsive
  //   // slickPresentationResize();
  //   //unstick on asides when containers are on flex-direction column
  //   stickyAsidesUpdate();
  // }
  // $(window).resize( $.throttle( 250, resizeThrottle ) );

});
