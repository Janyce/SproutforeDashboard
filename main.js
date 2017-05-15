$( document ).ready(function() {
    console.log( "main.js is ready!" );

    // ### LOGIN-FORM ### //

    $('#login-form').on('submit', function(e) {
      e.preventDefault();
      var formId = '#login-form';
      var that = $(this),
          url = that.attr('action'),
          type = that.attr('method');

      $.ajax({
        url: url,
        type: type,
        data: that.serialize(),
        success: function(response) {
            if (response != "false") {
              var merchantInformationFull = JSON.parse(response);
              storeMerchantInformation(response);
              function storeMerchantInformation(response) {
                sessionStorage.token = merchantInformationFull.token;
                sessionStorage.merchant_id = merchantInformationFull.merchant_id;
                sessionStorage.email = merchantInformationFull.email;
                sessionStorage.rating = merchantInformationFull.rating;
                sessionStorage.total_rating = merchantInformationFull.total_rating;
              };
              window.location.href = "information.html";

            } else if (response == "false") {
              $('#print-feedback').html('You have entered an invalid email or password.');
            } else {
              // return false;
            };
        }
      });
    });

    // ### RELOGIN-MODAL-FORM ### //

    $('#relogin-modal-form').on('submit', function(e){
        e.preventDefault();
        var that = $(this),
            url = that.attr('action'),
            type = that.attr('method');

        $.ajax({
            url: url,
            type: type,
            data: that.serialize(),
            success: function(response){
              if (response != 'false') {
                var merchantInformationFull = JSON.parse(response);
                storeMerchantInformation(response);
                function storeMerchantInformation(response) {
                  sessionStorage.token = merchantInformationFull.token;
                  sessionStorage.merchant_id = merchantInformationFull.merchant_id;
                  sessionStorage.email = merchantInformationFull.email;
                  sessionStorage.rating = merchantInformationFull.rating;
                  sessionStorage.total_rating = merchantInformationFull.total_rating;
                };
                window.location.reload();
              } else if (response == 'false') {
                $('#relogin-modal .modal-footer #modal-feedback').html('You have entered an invalid username or password. Please try again.');
              } else {
                // return false;
              }

            }
        });
        e.preventDefault();
    });

    $('#relogin-btn').on('click', function() {
      $('#relogin-modal-form').submit();
    });

    // ### SIGNUP-FORM ### //

    $('#signup-form').on('submit', function(e) {
      e.preventDefault();
      var that = $(this),
          url = that.attr('action'),
          type = that.attr('method');

      $.ajax({
        url: url,
        type: type,
        data: that.serialize(),
        success: function(response) {
            if (response != "false") {
              $('#print-feedback').html(' ');
              var merchantInformationFull = JSON.parse(response);
              storeMerchantInformation(response);
              function storeMerchantInformation(response) {
                sessionStorage.token = merchantInformationFull.token;
                sessionStorage.merchant_id = merchantInformationFull.merchant_id;
                sessionStorage.email = merchantInformationFull.email;
                sessionStorage.rating = merchantInformationFull.rating;
                sessionStorage.total_rating = merchantInformationFull.total_rating;
              };
              window.location.href = "information.html";

            } else if (response == "false") {
              $('#print-feedback').html('Email Already Exist! This email address already corresponds to a Sproutfore account.');
            } else {
              // return false;
            };
        }
      });
    });

    // ### UPDATE-MERCHANT-FORM ### //

    $('#update-merchant-form').on('submit', function(e) {
      e.preventDefault();
      var that = $(this),
          url = that.attr('action'),
          type = that.attr('method');
          data = that.serialize();

      $.ajax({
        url: url,
        type: type,
        data: data,
        success: function(response) {
          // check if all inputs in the form are filled
          var formId = '#update-merchant-form';
          checkForm(formId);

          if (response == '"error"') {
            sessionStorage.response = response;
            $('#relogin-modal').modal('show');

          } else if (response == '"invalid"') {
            sessionStorage.response = response;
            sessionStorage.feedbackTitle = 'Oops!';
            sessionStorage.feedbackMessage = 'Merchant Name is already taken. Please choose another name.';
            $('#feedback-modal').modal('show');

          } else if (response == 'true') {
            sessionStorage.response = response;
            if (sessionStorage.form == 'form_filled') {
              sessionStorage.feedbackTitle = 'Awesome!';
              sessionStorage.feedbackMessage = 'Changes successfully saved!';
            } else if (sessionStorage.form == 'form_not_filled') {
              sessionStorage.feedbackTitle = 'Awesome! Changes saved successfully but ...';
              sessionStorage.feedbackMessage = 'Note that all information must be provided in order to be verified. Only verified merchants can list their products onto the Sproutfore Store.';
            } else {
              // do nothing
            };
            $('#feedback-modal').modal('show');

          } else if (response == 'false') {
            sessionStorage.response = response;
            sessionStorage.feedbackTitle = 'Oops!';
            sessionStorage.feedbackMessage = 'An unknown error has occurred. Please try again <hr> or <a href="login.html">Log In</a> again. <hr>Otherwise, please <a href="mailto:enquiries@sproutfore.com" target="_top">Contact Sproutfore Support</a> for assistance.';
            $('#feedback-modal').modal('show');

          } else {
            return false;
          };
          console.log('update-merchant-btn is clicked');
          clearFormStatus();
        }
      });
    });

    // ### EDIT-PRODUCT-FORM ### //

    $('#edit-product-form').on('submit', function(e) {
      e.preventDefault();
      var that = $(this),
          url = that.attr('action'),
          type = that.attr('method');

      $.ajax({
        url: url,
        type: type,
        data: that.serialize(),
        success: function(response) {
          // check if all inputs in the form are filled
          var formId = '#edit-product-form';
          checkForm(formId);
          if (response == '"error"') {
            sessionStorage.response = response;
            $('#relogin-modal').modal('show');

          } else if (response == 'false') {
            sessionStorage.response = 'do not refresh';
            sessionStorage.feedbackTitle = 'Oops!';
            sessionStorage.feedbackMessage = 'An unknown error has occurred. Please try again <hr> or <a href="login.html">Log In</a> again. <hr>Otherwise, please <a href="mailto:enquiries@sproutfore.com" target="_top">Contact Sproutfore Support</a> for assistance.';
            $('#feedback-modal').modal('show');

          } else if (response == 'true') {
            sessionStorage.response = 'do not refresh';
            if (sessionStorage.form == 'form_filled') {
              sessionStorage.feedbackTitle = 'Awesome!';
              sessionStorage.feedbackMessage = 'Changes successfully saved!';

            } else if (sessionStorage.form == 'form_not_filled') {
              sessionStorage.feedbackTitle = 'Awesome! Changes saved successfully but ...';
              sessionStorage.feedbackMessage = 'Note that all information about the product must be provided before it can be launched onto the Sproutfore Store.';
            } else {
              // do nothing
            };
            $('#feedback-modal').modal('show');

          } else {
            return false;
          };
          console.log('edit-product-btn is clicked');
        }
      });
    });

    // ### ADD-PRODUCT-FORM ### //

    $('#add-product-form').on('submit', function(e) {
      e.preventDefault();
      var that = $(this),
          url = that.attr('action'),
          type = that.attr('method');

      $.ajax({
        url: url,
        type: type,
        data: that.serialize(),
        success: function(response) {
          // check if all inputs in the form are filled
          var formId = '#add-product-form';
          checkForm(formId);
          if (response == '"error"') {
            sessionStorage.response = response;
            $('#relogin-modal').modal('show');

          } else if (response == 'false') {
            sessionStorage.response = response;
            sessionStorage.feedbackTitle = 'Oops!';
            sessionStorage.feedbackMessage = 'An unknown error has occurred. Please try again <hr> or <a href="login.html">Log In</a> again. <hr>Otherwise, please <a href="mailto:enquiries@sproutfore.com" target="_top">Contact Sproutfore Support</a> for assistance.';
            $('#feedback-modal').modal('show');

          } else if (response == 'true') {
            sessionStorage.response = 'back to inventory';
            if (sessionStorage.form == 'form_filled') {
              sessionStorage.feedbackTitle = 'Awesome!';
              sessionStorage.feedbackMessage = 'Changes successfully saved!';

            } else if (sessionStorage.form == 'form_not_filled') {
              sessionStorage.feedbackTitle = 'Awesome! Changes saved successfully but ...';
              sessionStorage.feedbackMessage = 'Note that all information about the product must be provided before it can be launched onto the Sproutfore Store. Price cannot be 0.00.';
            } else {
              // do nothing
            };
            $('#feedback-modal').modal('show');

          } else {
            return false;
          };
          // sessionStorage.productID = 0;
          console.log('add-product-btn is clicked');
        }
      });
    });

    // ### DELETE-PRODUCT-FORM ### //

    $('#delete-product-form').on('submit', function(e) {
      e.preventDefault();
      var that = $(this),
          url = that.attr('action'),
          type = that.attr('method');

      $.ajax({
        url: url,
        type: type,
        data: that.serialize(),
        success: function(response) {
          if (response == '"error"') {
            sessionStorage.response = response;
            $('#relogin-modal').modal('show');

          } else if (response == 'false') {
            sessionStorage.response = response;
            sessionStorage.feedbackTitle = 'Oops!';
            sessionStorage.feedbackMessage = 'An unknown error has occurred. Please try again <hr> or <a href="login.html">Log In</a> again. <hr>Otherwise, please <a href="mailto:enquiries@sproutfore.com" target="_top">Contact Sproutfore Support</a> for assistance.';
            $('#feedback-modal').modal('show');

          } else if (response == 'true') {
            sessionStorage.response = 'back to inventory';
            sessionStorage.feedbackTitle = 'Deleted!';
            sessionStorage.feedbackMessage = 'Product deleted successfully!';
            $('#feedback-modal').modal('show');

          } else {
            return false;
          };
          console.log('delete-product-btn is clicked');
        }
      });
    });

    // ### FORGET-PASSWORD-FORM ### //

    $('#forget-password-form').on('submit', function(e) {
      e.preventDefault();
      var that = $(this),
          url = that.attr('action'),
          type = that.attr('method');

      $.ajax({
        url: url,
        type: type,
        data: that.serialize(),
        success: function(response) {
            if (response == "false") {
              sessionStorage.response = response;
              sessionStorage.feedbackTitle = 'Email Not Found!';
              sessionStorage.feedbackMessage = 'The email you have entered is not found in our record. Please check if you have entered your email address correctly.';
              $('#feedback-modal').modal('show');

            } else if (response == 'true') {
              sessionStorage.response = response;
              sessionStorage.feedbackTitle = 'Email Sent!';
              sessionStorage.feedbackMessage = 'A link has been sent to your email address. ';
              $('#feedback-modal').modal('show');

            } else {
              return false;
          };
          console.log('forgetpassword-btn is clicked');
          console.log(response);
        }
      });
    });

    // ### CHANGE-PASSWORD-FORM ### //

    $('#change-password-form').on('submit', function(e) {
      e.preventDefault();
      var that = $(this),
          url = that.attr('action'),
          type = that.attr('method');

      $.ajax({
        url: url,
        type: type,
        data: that.serialize(),
        success: function(response) {
          if (response == '"error"') {
            sessionStorage.response = response;
            $('#relogin-modal').modal('show');

          } else if (response == 'false') {
            sessionStorage.response = response;
            sessionStorage.feedbackTitle = 'Oops!';
            sessionStorage.feedbackMessage = 'An unknown error has occurred. Please try again <hr> or <a href="login.html">Log In</a> again. <hr>Otherwise, please <a href="mailto:enquiries@sproutfore.com" target="_top">Contact Sproutfore Support</a> for assistance.';
            $('#feedback-modal').modal('show');

          } else if (response == 'true') {
              sessionStorage.response = 'back to information';
              sessionStorage.feedbackTitle = 'Awesome!';
              sessionStorage.feedbackMessage = 'Password changed successfully!';
              $('#feedback-modal').modal('show');

          } else {
            return false;
          };
          console.log('change-password-btn is clicked');
          console.log(response);
        }
      });
    });

    // ### FEEDBACK MODAL ### //

    $('#feedback-modal').on('show.bs.modal', function () {
      var modal = $(this);
      modal.find('.modal-header .modal-title').html(sessionStorage.feedbackTitle);
      modal.find('.modal-body .modal-body-content').html(sessionStorage.feedbackMessage);
    });

    $('.feedback-close-btn').on('click', function () {
      if (sessionStorage.response == "true") {
        window.location.reload();
      } else if (sessionStorage.response == 'back to inventory') {
        window.location.href = "inventory.html";
      } else if (sessionStorage.response == 'back to information') {
        window.location.href = "information.html";
      } else {
        // do nothing
      };
      // reset sessionStorage to false for all cases
      sessionStorage.response = 'null';
      sessionStorage.feedbackTitle = 'null';
      sessionStorage.feedbackMessage = 'null';
    });

    // ### OTHER FUNCTIONS ### //

    function checkForm(formId) {
      var inputs = $(formId + ' :input');
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.length == "") {
          sessionStorage.form = 'form_not_filled';
          console.log(inputs[i] +' : '+ inputs[i].value);
          break;
        } else {
          sessionStorage.form = 'form_filled';
          console.log(inputs[i] +' : '+ inputs[i].value);
        }
      };
    };

    function clearFormStatus() {
      sessionStorage.form = "";
    };


    });
    // document ready function
