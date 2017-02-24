define(['jquery','bootstrap','jqBootstrapValidation'], function($) {

  $(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var fields={};
            var options={};
            var recaptcha = grecaptcha.getResponse();

            var date = new Date();
            var slug = date.getFullYear().toString()+'-';
            var month = date.getMonth();
            month++;
            if (month<10) {
              slug+='0';
            }
            slug+=month.toString();
            slug+='-lcb';

            var subscribe = false;
            var message_subscribe = " désinscription";
            if ($("input#subscribe").is( ':checked'))
            {
              subscribe = true;
              message_subscribe = " inscription";
            }

            fields['name']=$("input#name").val();
            fields['email']=$("input#email").val();
            fields['message']=$("textarea#message").val();
            fields['subscribe']=subscribe;
            options['slug']=slug; 
            options['parent']='newsletter-lcb'; //$("input#parent").val(); 
            options['origin']="https://lacasebiocoutras.github.io/"; //$("input#origin").val(); 
            options['gotcha']=$("input#gotcha").val(); 

            // var name = $("input#name").val();
            // var email = $("input#email").val();
            // var phone = $("input#phone").val();
            // var message = $("textarea#message").val();
            // var firstName = name; // For Success/Failure Message
            var firstName = fields['name']; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }   

            



            $('#success').html("<div class='alert alert-info'>");
            $('#success > .alert-info').html("<i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i>").append("</i>"); 
            $('#success > .alert-info').append('<span class="sr-only">'); 
            $('#success > .alert-info').append("<strong>Attente réponse serveur </strong>");  
            $('#success > .alert-info').append("</span>")
            $('#success > .alert-info').append('</div>');
                             

            $.ajax({
                url: "https://sleepy-retreat-12152.herokuapp.com/v2/entry/id2m/staticman-receipt-lacasebiocoutras/master/comments",
                type: "POST",
                dataType: 'text',
                data: {
                    fields: fields,
                    options: options,
                    'g-recaptcha-response': recaptcha
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success').append("<strong> ");
                    $('#success > .alert-success').append("Votre "+message_subscribe);
                    $('#success > .alert-success').append(" a bien été enregistrée!");
                    $('#success > .alert-success').append("</strong>");

                    $('#success > .alert-success').append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Désolé " + firstName + ", le serveur n'a pas validé votre requête. Vous pouvez renouveller la procèdure ultérieurement!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });
   
  });

  // Floating label headings for the contact form
  $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
          $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
          $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
          $(this).removeClass("floating-label-form-group-with-focus");
      });
  });

});