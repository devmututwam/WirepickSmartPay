$(document).ready(function () {

    console.log("Am in the Js");

    /*** Submit the form***/
    var submitBtn = $('#submitAccDetails');

    /*** Submit with AJAX ***/
    submitBtn.on('click', function () {
        swal({
            title: "Are you sure?",
            text: "You want to submit",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes",
            closeOnConfirm: true
        }, function () {
            $(".confirm").attr('disabled', 'disabled');
            processRequest();
        });
    })


    /*** function to process the request ***/
    function processRequest() {

        if ($('#configureAccount')[0].checkValidity()) {
            var formData = new FormData($('#configureAccount')[0]);

            //formData.append("usersComments", userComment);

            $.ajax({
                type: 'POST',
                url: 'accounts/submitAccDetails',
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false,
                cache: false,
                success: function (response) {
                    //do stuff here for the view
                    if (response.status === "error") {
                        swal({
                            title: "Error !",
                            text: response.message,
                            type: "error",
                            timer: 20000,
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                        }, function () {

                        });
                    } else if (response.status === "success") {
                        swal({
                            title: "Success",
                            text: response.message,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = 'accounts/viewAccounts';
                        });
                    }
                },
                error: function () {
                    swal("Error!", "Error occurred while processing", "error");
                }
            });
        } else {
            $('#configureAccount')[0].reportValidity();
        }
    }


    function showServerMessageAdd(responseObj) {
        $(".approvalServerResponse").html(responseObj.message);
        $(".approvalServerResponse").fadeIn(300);
        $(".approvalServerResponse").fadeOut(300);
        $(".approvalServerResponse").fadeIn(300);
        $(".approvalServerResponse").fadeOut(3000);
    }


});




