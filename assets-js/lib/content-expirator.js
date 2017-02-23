 // see http://dansnetwork.com/content-expirator-jquery-content-expiration-plugin/

define(['jquery','moment'], function($, moment) {


  // var isMomentIncludeBetween = function(dateDeb, dateFin) {

  // };


  $.fn.loadFermetures = function(path_json) {

    var fermetureJson;

    var requestFermeture = $.ajax({
      dataType: 'json',
      type: 'GET',
      url: path_json,
      success: function (data) {
          fermetureJson = data;
      },
      error: function () {
          console.log('fermeture.json non disponible');
      }
    });
    // V0-1 : TODO : gérer cas imprévu
    var displayFermeture = requestFermeture.then( function(){

      var JoursFermetureHebdo=[0, 1]; //Dim, Lundi Réglage Client!
      // var JoursFermetureHebdo2=["dimanche", "lundi"];
      var format=['DDMMMMY', 'DoMMMMY'];


      return $.each( fermetureJson, function( index, item ) {
        moment.locale('fr');
        var jourFerie=true;
        var dateDebut = moment(item.dateDebut, format);
        var dateFin = moment(item.dateFin, format);
        var dateAlerte = moment(item.dateDebut, format).add('-'+item.delaiAlerte,'days');
        var affich=true;
        var compDeb,compFin;
        //periode congés ?
        if (dateFin.isValid()) {

          if(dateDebut.isValid()) {
            //test si inversion debut - fin
            var tmp;
            tmp = moment.min(dateDebut, dateFin);
            dateFin = moment.max(dateDebut, dateFin);
            dateDebut=tmp;
            //test date identique
            if(!dateDebut.isSame(dateFin)) {
              jourFerie=false;
            }
          }
          else {
            dateDebut=dateFin;
          }
        }


        if(jourFerie) {
          compDeb = moment(dateAlerte).subtract(1,'days');
          compFin = moment(dateDebut).add(1,'days');
          if(moment().isBetween(compDeb.format(), compFin.format())) {
            //filtrage jour fermeture hedo
            // TODO ; dbg day()
            var day = moment(dateDebut).day();
            var i, count =JoursFermetureHebdo.length;
            for (i=0;i<count;i++) {
              if (day===JoursFermetureHebdo[i]) {
                affich=false;
              }
            }
            // if(!moment(dateDebut).day(JoursFermetureHebdo2))
            if(affich===true)
            {
              // var contenu = '<h4>'+item.title+'</h4>'+'&nbsp;le&nbsp;'+ moment(dateDebut).format('dddd Do MMMM');
              // $( '<li>' ).html(contenu).appendTo( '#aside-events' ).fadeIn();
              $('#aside-fermeture').closest('div').removeClass('invisible');
              $( '<li>' ).html('<h4>'+item.title+'</h4>'               ).appendTo( '#aside-fermeture' ).fadeIn();
              $( '<li>' ).html(moment(dateDebut).format('dddd Do MMMM')).appendTo( '#aside-fermeture' ).fadeIn();

              return false;
            }
          }
        } else {

          var conjug='serons';
          affich=false;
          //cas période congés
          compDeb = moment(dateDebut).subtract(1,'days');
          compFin = moment(dateFin).add(1,'days');
          if(moment().isBetween(compDeb.format(), compFin.format())) {
            affich=true;
            conjug = 'sommes';
          }
          else {
            compDeb = moment(dateAlerte).subtract(1,'days');
            compFin = moment(dateDebut).add(1,'days');
            if(moment().isBetween(compDeb.format(), compFin.format())) {
              affich=true;
            }
          }




          if(affich===true) {
            // var contenu = '<h4>'+item.title+'</h4>'+'<p>'+'&nbsp;Nous&nbsp;'+conjug+'&nbsp;fermés'+'</p>'+
            //   '<p>du&nbsp;'+ moment(dateDebut).format('dddd Do MMMM') +'</p>' +
            //   '<p>au&nbsp;'+ moment(dateFin).format('dddd Do MMMM')+'</p>';
            // $( '<li>' ).html(contenu).appendTo( '#aside-events' ).fadeIn();
            $('#aside-fermeture').closest('div').removeClass('invisible');
            $( '<li>' ).html('<h4>'+item.title+'</h4>'            ).appendTo( '#aside-fermeture' ).fadeIn();
            $( '<li>' ).html('Nous&nbsp;'+conjug+'&nbsp;fermés du').appendTo( '#aside-fermeture' ).fadeIn();
            $( '<li>' ).html(moment(dateDebut).format('dddd Do MMMM')+'&nbsp;au').appendTo( '#aside-fermeture' ).fadeIn();
            $( '<li>' ).html(moment(dateFin).format('dddd Do MMMM')).appendTo( '#aside-fermeture' ).fadeIn();
            return false;
          }
        }

      });
    });

    displayFermeture.done(function() {

    });

  };



  $.fn.loadEvenements = function(path_json) {

    var evenementJson;
    var requestEvent = $.ajax({
        dataType: 'json',
        type: 'GET',
        url: path_json,
        success: function (data) {
            evenementJson = data;
        },
        error: function () {
            console.log('evenement.json non disponible');
        }
    });
    // requete lente, a voir mise en place desync confirmation de la date
    // confirmation date en desynchro, refresh si
    // var requestTime = requestEvent.then(function(){
    //   return $.ajax({
    //     dataType: 'jsonp',
    //     type: 'GET',
    //     url: 'http://www.timeapi.org/utc/now.json',
    //     success: function (data) {
    //         timeApi = moment(data).format('lll');
    //         // console.log('timeapi: '+timeApi);
    //         // console.log(' moment(): '+ moment().format('lll'));
    //         // console.log(moment('20160129','YYYYMMDD').fromNow());
    //     },
    //     error: function () {
    //         timeApi = moment().format('lll');
    //         console.log('local time');
    //     }
    //   });
    // });

    // var display = requestTime.then( function(){
    var displayEvent = requestEvent.then( function(){
      return $.each( evenementJson, function( i, item ) {


        var dateExpire = moment(item.dateExpire, ['DDMMMMY', 'MMMMDDY']).format();
        var dateParution = moment(item.dateExpire, ['DDMMMMY', 'MMMMDDY']).add(-7,'days').format();

        if(moment().isBetween(dateParution, dateExpire)) {
          $( '<li>' ).html( item.title ).appendTo( '#aside-events' ).fadeIn();
          return false;

        }
        return false;

      });
    });

    displayEvent.done(function() {
      // data retrieved from url2 as provided by the first request
    });

  };



  // $.fn.contentExpirator = function(prfx) {
  //   var pfix = prfx || 'exp';
  //   $('[class|='+pfix+']').each(function(){
  //     var eString = $(this).attr('class').split(' ')[0];
  //     var dString = eString.split('-');
  //     console.log('dString: '+dString);
  //     var d = new Date(dString[1],dString[2].toString()-1,dString[3]);
  //     console.log('d: '+d);
  //     var today = new Date();
  //     console.log('new Date: '+today);
  //     if(d < today){
  //       $(this).css('display','none');
  //     }
  //   });
  // };
});


