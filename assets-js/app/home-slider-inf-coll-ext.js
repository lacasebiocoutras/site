define(['jquery', 'config-module'], function($, config) {


  $(document).ready(function(){

    var class_slider=[];    
    var inputs=[];
    // var flag_break=[];
    var nb_inputs=[];
    var delay = [];
    var timeoutSlider=[];
    var btn_loop=[];


    var moveSlider = function (_current_index) 
    {
      var $inputs = $(inputs[_current_index]);
      $inputs.each(function(index) {
        if ($(this).is( ':checked')) {
          // if (!flag_break[_current_index]) {
            if (index === nb_inputs[_current_index]) {
              $inputs.eq(0).prop( 'checked', true );
            } else {
              $inputs.eq(index + 1).prop( 'checked', true );
            }
            $(this).prop( 'checked', false );
          // }
          timeoutSlider[_current_index]= setTimeout(moveSlider, delay[_current_index], _current_index);
          return false;
        }
      });
    };

    // var enterSlider = function(_current_slider) 
    // {
    //   flag_break[_current_slider]=true;
    // };

    // var leaveSlider = function(_current_slider) 
    // {
    //   flag_break[_current_slider]=false;
    //   clearTimeout(timeoutSlider[_current_slider]);
    //   timeoutSlider[_current_slider]= setTimeout(moveSlider, delay[_current_slider], _current_slider); 
    // }

    var changeLoop = function(_current_slider) 
    {
      if ( $( btn_loop[_current_slider]).is(":checked") ) {
        timeoutSlider[_current_slider]= setTimeout(moveSlider, 0, _current_slider);
        // $(class_slider[_current_slider]).on( "mouseleave", leaveSlider.bind(null,_current_slider));
        // $(class_slider[_current_slider]).on( "mouseenter", enterSlider.bind(null,_current_slider));
      } else {
        clearTimeout(timeoutSlider[_current_slider]);
        // $(class_slider[_current_slider]).off( "mouseleave");
        // $(class_slider[_current_slider]).off( "mouseenter");
      }

    }


    // get json config then json with data, depending current url, then update display
    var url_page = window.location.href;
    //specific home-page!
    // var path_config=config.base_url.concat(config.json_slider_inf_coll_ext);
    var path_config=window.location.pathname.concat(config.json_home_slider_inf_coll_ext);
    var request_config = $.getJSON(path_config);
    var index_class=0;
    var extract_config = request_config.then(function(loaded_config){
        // window.config=loaded_config.config;
        $.each(loaded_config.list, function(index, item){
          if(url_page.indexOf(item.url)>-1) {

            class_slider[index_class]='.'.concat(item.class_slider);
            delay[index_class]=item.delay_sec*1000;
            nb_inputs[index_class]=item.nb_items_slider-1;
            // flag_break[index_class]=false;

            //write selector css form X > Y
            inputs[index_class]=class_slider[index].concat(' > input');

            btn_loop[index_class]='';
            if (item.btn_active_loop.length > 0) 
            {
              $( '.'.concat(item.btn_active_loop)).css( 'display', 'inline-block' );
              btn_loop[index_class]='.'.concat(item.btn_active_loop).concat(' > input');
            }            
            index_class++;
          }
        });
    });

    extract_config.done(function() {
      var iter_slider=0;
      for (iter_slider = 0; iter_slider < index_class; iter_slider++) 
      {
        if (class_slider[iter_slider] !== null) {          

          if (btn_loop[iter_slider] !== '') 
          {
            $( btn_loop[iter_slider]).prop( 'checked', false );
            $(btn_loop[iter_slider]).change(changeLoop.bind(null,iter_slider))
          }
          else
          {

          }
          // $(class_slider[iter_slider]).on( "mouseleave", leaveSlider.bind(null,iter_slider));
          // $(class_slider[iter_slider]).on( "mouseenter", enterSlider.bind(null,iter_slider));
          // timeoutSlider[iter_slider]= setTimeout(moveSlider, delay[iter_slider], iter_slider);          
        }       
      }
      
    });
  });


  // $(document).ready(function(){

  //   var class_slider=null;
  //   // var id_item_slider=null;
  //   var nb_items_slider=0;

  //   var inputs=null;
  //   var flag_break=false;
  //   var nb_inputs=0;
  //   var delay = 0;
  //   var timeoutSlider=null;


  //   var moveSlider = function () {
  //     var $inputs = $(inputs);
  //     $inputs.each(function(index) {
  //       if ($(this).is( ':checked')) {
  //         if (!flag_break) {
  //           if (index === nb_inputs) {
  //             $inputs.eq(0).prop( 'checked', true );
  //           } else {
  //             $inputs.eq(index + 1).prop( 'checked', true );
  //           }
  //           $(this).prop( 'checked', false );
  //         }
  //         timeoutSlider=setTimeout(function(){moveSlider();},delay);
  //         return false;
  //       }
  //     });
  //   };

  //   // get json config then json with data, depending current url, then update display
  //   var url_page = window.location.href;
  //   // console.log('url_page :'+url_page);
  //   // console.log('window.location.pathname :'+window.location.pathname);
  //   //specific home-page!
  //   // var path_config=config.base_url.concat(config.json_slider_inf_coll_ext);
  //   var path_config=window.location.pathname.concat(config.json_slider_inf_coll_ext);
  //   var request_config = $.getJSON(path_config);

  //   var extract_config = request_config.then(function(loaded_config){
  //       // window.config=loaded_config.config;
  //       $.each(loaded_config.list, function(index, item){
  //         if(url_page.indexOf(item.url)>-1) {
  //           class_slider='.'.concat(item.class_slider);
  //           // id_item_slider='#'.concat(item.id_item_slider);
  //           nb_items_slider=item.nb_items_slider;
  //           delay=item.delay_sec*1000;
  //           //write selector css form X > Y
  //           inputs=class_slider.concat(' > input');
  //           nb_inputs=nb_items_slider-1;
  //         }
  //       });
  //   });

  //   extract_config.done(function() {
  //     if (class_slider !== null) {
  //       $(class_slider).mouseleave(function() {
  //         flag_break=false;
  //         clearTimeout(timeoutSlider);
  //         timeoutSlider=setTimeout(function(){moveSlider();},delay);
  //       });
  //       $(class_slider).mouseenter(function() {
  //         flag_break=true;
  //       });
  //       timeoutSlider=setTimeout(function(){moveSlider();},delay);
  //     }
  //   });
  // });
});
