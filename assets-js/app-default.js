// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
    'paths': {
      // 'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
      'jquery': 'vendor/jquery.2.2.0.min',
      // 'headroom': 'vendor/headroom.0.8.0.min',
      'picturefill': 'vendor/picturefill.min',
      // 'responsive-nav': 'vendor/responsive-nav.min',
      'slidebars': 'vendor/slidebars',
      'throttle-debounce': 'plugin/jquery.ba-throttle-debounce.min'
      // 'easing': 'plugin/jquery.easing.1.3.2'
    },
    shim: {
        'throttle-debounce': {
          deps: ['jquery'],
          exports: 'throttle-debounce'
        }
        // 'easing': {
        //   deps: ['jquery'],
        //   exports: 'easing'
        // }
    }
});

requirejs(['app/common']); //req jquery,picturefill
// requirejs(['app/common-default']); // not used

// Load the main app module to start the app
// requirejs(['app/main-default']); // not used
