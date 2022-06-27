$(document).ready(function () {

    console.log("Am in the Js");

    /*** Submit the form to process the selected service and retrieve available transactions***/
    var submitBtn = $('#submitService');

    /*** Submit with AJAX ***/
    submitBtn.on('click', function () {
        swal({
            title : "Are you sure?",
            text : "You want to submit",
            showCancelButton : true,
            confirmButtonClass : "btn-danger",
            confirmButtonText : "Yes",
            closeOnConfirm : false
        }, function() {
            $(".confirm").attr('disabled', 'disabled');
            processRequest();
        });

    })


    /*** function to process the request ***/
    function processRequest() {

        if ($('#userTransactionsForm')[0].checkValidity()){
            var formData = new FormData($('#userTransactionsForm')[0]);

            //formData.append("usersComments", userComment);

            $.ajax({
                type: 'POST',
                url: 'userTransactions/submitServiceRequest',
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
                        var service = response["service"];
                        swal({
                            title: "Success",
                            text: response.message,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                        }, function (service) {
                            window.location.href = 'userTransactions/getUserTransactionsByService?service=' + service;
                        });
                    }
                },
                error: function () {
                    swal("Error!", "Error occurred while processing", "error");
                }
            });
        }else {
            $('#userTransactionsForm')[0].reportValidity();
        }
    }



    function showServerMessageAdd(responseObj){
        $(".approvalServerResponse").html(responseObj.message);
        $(".approvalServerResponse").fadeIn(300);
        $(".approvalServerResponse").fadeOut(300);
        $(".approvalServerResponse").fadeIn(300);
        $(".approvalServerResponse").fadeOut(3000);
    }

    function getSelectedValue(selectObject) {
        console.log("Am in the Js");
        var value = selectObject.value;
        console.log(value);
    }


});


$(function () {
    $('#effectiveDateOfRegistration').datetimepicker({
        format:"Y-MM-DD"
    });
});

function getSelectedValue(selectObject) {
    console.log("Am in the Js");
    var value = selectObject.value;

}


