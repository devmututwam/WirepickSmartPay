'use strict';
$(document).ready(function() {

    const form = $("#businessOther").show();

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


            const dataString = new FormData($('#businessOther')[0]);

            $.ajax({
                type: 'POST',
                url: 'investigations/reviewRequestToInvestigationsCollector',
                data: dataString,
                dataType: 'json',
                cache: false,
                processData: false,
                contentType: false,
                success: function(response) {
                    //do stuff here for the view

                    if (response["status"].toUpperCase() === "ERROR") {
                        // display all the errors to the user
                        let errorMessage = '';
                        const keys = Object.keys(response);

                        for (let i = 0; i < keys.length; i++) {
                            const error = response[keys[i]];
                            if (error.toUpperCase() !== "ERROR") {

                                errorMessage +=
                                    '<div class="alert alert-danger icons-alert">' +
                                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                                    '<i class="icofont icofont-close-line-circled"></i>' +
                                    '</button>' +
                                    '<p id="taxpayer-type-edit-modal__message-text">' +
                                    error +
                                    '</p>' +
                                    '</div>';

                            }
                        }

                        addMainServerResponse(errorMessage);
                    } else if(response["status"].toUpperCase() === "SUCCESS") {

                        const data = response["data"];
                        const referenceNumber = response["transactionNumber"];
                        // Show sweet alert
                        swal({
                            title: "Success",
                            text: "Request has been submitted successfully \n Reference Number:" + referenceNumber +" \n You can submit another Request .",
                            type: "success",
                            closeOnConfirm: false,
                            allowEscapeKey: false
                        }, function() {
                            // location.reload();
                            window.location.href = 'darshBoard';
                        });
                    }
                    // TO

                },
                error: function() {
                    $('#mainServerResponse').html(internalErrorMsg);
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



$(document).ready(function(){

    /*** sendback *******************************************************/
    var sendback_btn = $('#sendback_btn');

    /***save sendback *********************************************/
    sendback_btn.on('click', function () {
        swal({
            title : "Are you sure?",
            text : "You wish to SendBack the Request",
            showCancelButton : true,
            confirmButtonClass : "btn-danger",
            confirmButtonText : "Yes",
            closeOnConfirm : false
        }, function() {
            $(".confirm").attr('disabled', 'disabled');
            sendBackFunction();
        });
    })

    //sendback function for the review
    function sendBackFunction() {

        if ($('#businessOther')[0].checkValidity()){
            var formData = new FormData($('#businessOther')[0]);

            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
            }

            $.ajax({
                type: 'POST',
                url: 'investigations/sendbackRequestToInvestigationsCollector',
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false,
                cache: false,
                success: function (response) {
                    //do stuff here for the view
                    if (response.status === "error") {
                        let message = response.message;
                        swal({
                            title: "Error !",
                            text: message,
                            type: "error",
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                        }, function () {

                        });
                    } else if (response.status === "success") {
                        swal({
                            title: "Success",
                            text: response.message + "\n Transaction Number: " + response["transactionNumber"] + "\n" + response["applicationDate"],
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = 'darshBoard';
                        });
                    }
                },
                error: function () {
                    swal("Error!", "Error occurred executing action: Make sure all fields are filled before you Contact system admin", "error");
                }
            });
        }else {
            $('#businessOther')[0].reportValidity();
        }
    }




    var reject_btn = $('#reject_btn');

    /***Reject *************************************************************/
    reject_btn.on('click', function () {
        swal({
            title : "Are you sure?",
            text : "You want to Reject the Request",
            showCancelButton : true,
            confirmButtonClass : "btn-danger",
            confirmButtonText : "Yes",
            closeOnConfirm : false
        }, function() {
            $(".confirm").attr('disabled', 'disabled');
            rejectFunction();
        });
    })

    //Saving function for the rejection
    function rejectFunction() {

        if ($('#businessOther')[0].checkValidity()){
            var formData = new FormData($('#businessOther')[0]);


            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
            }

            $.ajax({
                type: 'POST',
                url: 'investigations/rejectRequestToInvestigationsCollector',
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false,
                cache: false,
                success: function (response) {
                    //do stuff here for the view
                    if (response.status === "error") {
                        let message = response.message;
                        swal({
                            title: "Error !",
                            text: message,
                            type: "error",
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                        }, function () {

                        });
                    } else if (response.status === "success") {
                        swal({
                            title: "Success",
                            text: response.message+ "\n Transaction Number: " + response["transactionNumber"] + "\n" + response["applicationDate"],
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = 'darshBoard';
                        });
                    }
                },
                error: function () {
                    swal("Error!", "Error occurred executing action: Make sure all fields are filled before you Contact system admin", "error");
                }
            });
        }else {
            $('#businessOther')[0].reportValidity();
        }
    }




    function showServerMessageAdd(responseObj){
        $(".approvalServerResponse").html(responseObj.message);
        $(".approvalServerResponse").fadeIn(300);
        $(".approvalServerResponse").fadeOut(300);
        $(".approvalServerResponse").fadeIn(300);
        $(".approvalServerResponse").fadeOut(3000);
    }

});