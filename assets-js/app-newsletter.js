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
      // 'easing': 'plugin/jquery.easing.1.3.2'
      'throttle-debounce': 'plugin/jquery.ba-throttle-debounce.min',
      'bootstrap': 'vendor/bootstrap.min',
      'jqBootstrapValidation': 'plugin/jquery.bootstrap-validation',
      
    },
    shim: {
        'throttle-debounce': {
          deps: ['jquery'],
          exports: 'throttle-debounce'
        },
        'jqBootstrapValidation': {
          deps: ['jquery'],
          exports: 'jqBootstrapValidation'
        }
        // 'easing': {
        //   deps: ['jquery'],
        //   exports: 'easing'
        // }
    }
});

requirejs(['app/common'], function () {
      requirejs(['app/main-newsletter']);
});
