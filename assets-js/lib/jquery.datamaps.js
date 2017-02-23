define(['jquery', 'datamaps'], function($, Datamap) {

  if(!$) {
    return;
  }
  ////////////
  // Plugin //
  ////////////
  $.fn.datamaps = function(options, callback) {
    options = options || {};
    options.element = this[0];
    var datamap = new Datamap(options);

    // datamap.bubbles(
    //   [{name: 'Bubble 1', latitude: 48, longitude: 5.5, radius: 70, fillKey: '#388E3C'}],
    //   {
    //     popupTemplate: function(geo, data) {
    //       return "<div class='hoverinfo'>Bubble for " + data.name + "";
    //     }
    //   }
    // );
    //a reprendre ajout bubble, fonctionnelle ici en attendant


    if ( typeof callback === 'function' ) {
      callback(datamap, options);
    }
    return this;
  };


});
