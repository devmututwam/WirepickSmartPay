$(document).ready(function () {

    console.log("Am in the Js");

    /*** Submit the form***/
    var submitBtn = $('#registerBtn');

    /*** Submit with AJAX ***/
    submitBtn.on('click', function () {
        $(".confirm").attr('disabled', 'disabled');
        processRequest();
    })


    /*** function to process the request ***/
    function processRequest() {

        if ($('#registerForm')[0].checkValidity()){
            var formData = new FormData($('#registerForm')[0]);

            //formData.append("usersComments", userComment);

            $.ajax({
                type: 'POST',
                url: 'registerUser',
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
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                        }, function () {

                        });
                    } else if (response.status === "success") {
                        var username = response["username"];
                        var email = response["email"];
                        var effectiveDate = response["effectiveDate"];
                        var message = response["message"]+',\n Username :'+username+'\n Email: '+email +'\n Created Date: '+effectiveDate;
                        swal({
                            title: "Success",
                            text: message.replace("\n", ''),
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = '/wirepick';
                        });
                    }
                },
                error: function () {
                    swal("Error!", "Error occurred while processing", "error");
                }
            });
        }else {
            $('#registerForm')[0].reportValidity();
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




