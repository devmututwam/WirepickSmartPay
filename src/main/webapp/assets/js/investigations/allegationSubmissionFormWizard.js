'use strict';
$(document).ready(function() {

    const form = $("#captureCustomsAllegationForm").show();


    form.steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        onStepChanging: function(event, currentIndex, newIndex) {

            // Always allow previous action even if the current form is not valid!
            if (currentIndex > newIndex) {
                return true;
            }
            // Forbid next action on "Warning" step if the user is to young


            // Needed in some cases if the user went back (clean up)
            if (currentIndex < newIndex) {
                // To remove error styles
                form.find(".body:eq(" + newIndex + ") label.error").remove();
                form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
            }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onStepChanged: function(event, currentIndex, priorIndex) {

            if (currentIndex === 2 && priorIndex === 3) {
                form.steps("previous");
            }
        },
        onFinishing: function(event, currentIndex) {


            const internalErrorMsg = '<div class="alert alert-danger icons-alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                + '<i class="icofont icofont-close-line-circled"></i>  </button>'
                + '<strong>Oops!</strong> Something went Wrong, please try again Later.'
                + '</div>';

            const dataString = new FormData($('#captureCustomsAllegationForm')[0]);

            $.ajax({
                type: 'POST',
                url: 'investigations/saveAllegation',
                // url: 'investigations/sendToInvestigations',
                // url: 'user/oga/new/submit-oga-user-application',
                data: dataString,
                dataType: 'json',
                cache: false,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.status === "success") {
                        let message = response.message + "\n Transaction Number: " + response["transactionNumber"] + "\n" + response["applicationDate"];
                        swal({
                            title: "Success!!",
                            text: message,
                            type: "success"
                        }, function () {
                            //Reload page to clear input
                            // window.location.reload();
                            window.location.href = "darshBoard";
                        });
                    } else {
                        setTimeout(function () {
                            swal({
                                title: "Error!",
                                text: response.message,
                                type: "error"
                            });
                        }, 200);
                    }
                },
                error: function (xhr) {
                    let errorObject = JSON.parse(xhr.responseText);
                    swal('Failed to submit application', errorObject.message, 'warning');
                }
            })
        },
        onFinished: function(event, currentIndex) {


        }
    })

});

//dynamic table for additional emails
$(document).ready(function() {
    jQuery(document).delegate('a.add-record14', 'click', function(e) {
        e.preventDefault();
        var content = jQuery('#sample_table14 tr'),
            size = jQuery('#tbl_posts14 >tbody >tr').length + 1,
            element = null,
            element = content.clone();
        element.attr('id', 'rec14-' + size);
        element.find('.delete-record14').attr('data-id', size);
        element.appendTo('#tbl_posts_body14');
        element.find('.sn14').html(size);
    });
    jQuery(document).delegate('a.delete-record14', 'click', function(e) {
        e.preventDefault();
        var didConfirm = confirm("Are you sure You want to delete");
        if (didConfirm == true) {
            var id = jQuery(this).attr('data-id');
            var targetDiv = jQuery(this).attr('targetDiv');
            jQuery('#rec14-' + id).remove();

            //regnerate index number on table
            $('#tbl_posts_body14 tr').each(function(index) {
                $(this).find('span.sn14').html(index + 1);
            });
            return true;
        } else {
            return false;
        }
    });
});

jQuery(document).delegate('a.add-record404', 'click', function(e) {
    e.preventDefault();
    var content = jQuery('#sample_table404 tr'),
        size = jQuery('#tbl_posts404 >tbody >tr').length + 1,
        element = null,
        element = content.clone();
    element.attr('id', 'rec404-' + size);
    element.find('.delete-record404').attr('data-id', size);
    element.appendTo('#tbl_posts_body404');
    element.find('.sn404').html(size);

    $('.reportDate').datetimepicker({
        format: "Y-MM-DD"
    });

});
jQuery(document).delegate('a.delete-record404', 'click', function(e) {
    e.preventDefault();
    var didConfirm = confirm("Are you sure You want to delete The selected entry?");
    if (didConfirm == true) {
        var id = jQuery(this).attr('data-id');
        var targetDiv = jQuery(this).attr('targetDiv');
        jQuery('#rec404-' + id).remove();

        //regnerate index number on table
        $('#tbl_posts_body404 tr').each(function(index) {
            $(this).find('span.sn404').html(index + 1);
        });
        return true;
    } else {
        return false;
    }
});


function addMainServerResponse(htmlString) {
    $("#mainServerResponse").html('');
    $("#mainServerResponse").html(htmlString);
}