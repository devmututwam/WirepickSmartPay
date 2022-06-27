$(document).ready(function () {

    console.log("Am in the Js");

    /*** Submit the form***/
    var submitBtn = $('#loginBtn');

    /*** Submit with AJAX ***/
    submitBtn.on('click', function () {
            $(".confirm").attr('disabled', 'disabled');
            processRequest();
    })


    /*** function to process the request ***/
    function processRequest() {

        if ($('#loginForm')[0].checkValidity()){
            var formData = new FormData($('#loginForm')[0]);

            //formData.append("usersComments", userComment);

            $.ajax({
                type: 'POST',
                url: 'authenticateUser',
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
                        swal({
                            title: "Success",
                            text: response.message,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                        }, function () {
                            //window.location.href = 'userTransactions/availableServices';
                            window.location.href = 'dashboardMain';
                        });
                    }
                },
                error: function () {
                    swal("Error!", "Error occurred while processing", "error");
                }
            });
        }else {
            $('#loginForm')[0].reportValidity();
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




