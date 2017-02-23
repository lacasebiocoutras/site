define(['jquery', 'leaflet'], function($, L) {

  if(!$) {
    return;
  }
  ////////////
  // Plugin //
  ////////////
  //from https://github.com/Little-sumo-labs/osml-plugin/blob/master/osml.plugin.js
  //__ Création du plugin : leaflet pour OpenStreetMap
  $.fn.osml = function(options) {
    //__ On initialise les variables globales
    var map,
    selector = this.selector.substring(1),
    identifiant = this.selector,

    //__ paramètre par défaut du plugin
    defaults = {
      size    : ['400px', '300px'],
      latitude  : 48.856578,
      longitude : 2.351828,
      zoom    : 10,
      markers   : [{
        latitude : null,
        longitude : null,
        textPopup : null,
        openPopup : false
      }]
    },
    options = $.extend(defaults, options),

    /**
     * Initialize a size for the map.
     *
     * @param options Array which can contains this options : width, height
     * @return jQuery Object containing the DOM element extended
     */
    cssMap = function() {
      $(identifiant).css({
        width : options.size[0],
        height : options.size[1],
      });
    },

    /**
     * Add markers on the map.
     *
     * @param options Array which can contains options on a map.
     * @return jQuery Object containing the DOM element extended
     */
    addMarkers = function() {
      for (var i = 0; i < options.markers.length; i++) {
        var omlatitude = options.markers[i].latitude,
            omlongitude = options.markers[i].longitude,
            omtextPopup = options.markers[i].textPopup,
            omopenPopup = options.markers[i].openPopup;

        if (false === omopenPopup) {
          L.marker([omlatitude, omlongitude]).addTo(map)
            .bindPopup(omtextPopup);
        } else {
          L.marker([omlatitude, omlongitude]).addTo(map)
            .bindPopup(omtextPopup)
            .openPopup();
        }
      }
    };

    this.each(function() {
      cssMap();

      map = L.map(selector).setView([options.latitude,options.longitude], options.zoom);

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data',
        maxZoom: 18,
        id: 'guillaumerichard.on939ig6',
        accessToken: 'pk.eyJ1IjoiZ3VpbGxhdW1lcmljaGFyZCIsImEiOiJjaWpnN29paXMwMTc3dGRtNXV4eGdjYzg3In0.bwBiTkwmCSHCGyj_9CY-BA'
      }).addTo(map);

      if (options.markers[0].latitude !== null && options.markers[0].longitude !== null) {
        addMarkers();
      }

    });
  };

  ////////////
  // Plugin //
  ////////////

  // $.fn.headroom = function(option) {
  //   return this.each(function() {
  //     var $this   = $(this),
  //       data      = $this.data('headroom'),
  //       options   = typeof option === 'object' && option;

  //     options = $.extend(true, {}, Headroom.options, options);

  //     if (!data) {
  //       data = new Headroom(this, options);
  //       data.init();
  //       $this.data('headroom', data);
  //     }
  //     if (typeof option === 'string') {
  //       data[option]();

  //       if(option === 'destroy'){
  //         $this.removeData('headroom');
  //       }
  //     }
  //   });
  // };

  //////////////
  // Data API //
  //////////////

  // $('[data-headroom]').each(function() {
  //   var $this = $(this);
  //   $this.headroom($this.data());
  // });

});
