// define(['jquery','lunr','moment', 'content-expirator', 'jquery.alpha', 'jquery.beta'], function($,lunr,moment) {
define(['jquery', 'moment','config-module'], function($, moment, config) {

  //global def display
  moment.locale('fr'); 
  var format=['DDMMMMY'];
  var hour_close = 19;

  function validePeriodDate(_date_deb, _date_fin,_format) {
    
    var dateCompare= moment();
    if (_date_fin.length > 0) {
      dateCompare = moment(_date_fin, _format);
    }
    else if (_date_deb.length > 0) {
      dateCompare = moment(_date_deb, _format);
    }
    var compFin = moment(dateCompare).hour(hour_close);

    if(moment().isBefore(compFin.format()) ) {
      return true;
    }
    else {
      return false;
    }
  }

  function isBetweenPeriodDate(_date_deb, _date_fin,_format) {

    var dateDebut;
    if (_date_deb.length > 0) {
      dateDebut = moment(_date_deb, _format);
    }
    else {
      dateDebut = moment();
    }
    var dateFin;
    if (_date_fin.length > 0) {
      dateFin = moment(_date_fin, _format);
    }
    else {
      dateFin = dateDebut;
    }
    var compDeb = moment(dateDebut).subtract(1,'days');
    var compFin = moment(dateFin).hour(hour_close);

    if(moment().isBetween(compDeb.format(), compFin.format())) {
          return true;
    }
    else {
      return false;
    }


  }



   /*functions display*/
  
  var displayAnId = function(item) {
    moment.locale('fr');
    var name_id='#';
    name_id=name_id.concat(item.name_id);
    //add moment filter
    if(validePeriodDate(item.date_debut,item.date_fin,format)) {
      $(name_id).removeClass(window.config.class_invisible_item);

      if (isBetweenPeriodDate(item.date_debut,item.date_fin,format)) {
        $(name_id).addClass(window.config.class_event_today);
      }
    }
    else {
      $(name_id).addClass(window.config.class_invisible_item);
    }
    return;
  };

  // get json config then json with data, depending current url, then update display first
  var url_page = window.location.href;
  var base_url = '/';
  if ( window.location.pathname.indexOf(config.base_url)>-1) {
    base_url=config.base_url;
  }

  var path_config=base_url.concat(config.json_event_coll_ext);  
  var request_config = $.getJSON(path_config);

  var extract_config = request_config.then(function(loaded_config){
    window.config=loaded_config.config;
    var name_current_json=null;
    $.each(loaded_config.list, function(index, item){
      if(url_page.indexOf(item.url)>-1) {
        name_current_json=item.name;
      }
    });
    return name_current_json;
  });
  var form_path_json = extract_config.then(function(name_json) {
    return base_url.concat(name_json);
  });
  var accessJson = form_path_json.then(function(path_ref) {
    window.data = $.getJSON(path_ref);
    window.data.then(function(loaded_data){
      $.each(loaded_data, function(index, value){
        // window.idx.add(
        //   $.extend({ 'id': index }, value)
        // );
        // update display
        displayAnId(value);
      });
    });

  });


});
