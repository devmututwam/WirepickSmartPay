$(document).ready(function () {

    if(typeof $('.lock-task').data("transaction") === "undefined"){
        return;
    }

    let url = 'workflow/check-lock-status';
    let formData = new FormData();
    formData.append("ack", $('.lock-task').data("transaction"));

    axios.post(url, formData)
        .then(function (response) {

            let responseStatus = response.data["status"];
            if (responseStatus === "success") {

                if(response.data["lock"] === "locked"){

                    if($('#lock-icon').hasClass('icofont-lock')){
                        $('#lock-icon').removeClass('icofont-lock');
                        $('#lock-icon').addClass('icofont-unlocked');
                    }

                }else{

                    if($('#lock-icon').hasClass('icofont-unlocked')){
                        $('#lock-icon').removeClass('icofont-unlocked');
                        $('#lock-icon').addClass('icofont-lock');
                    }

                }
            }

    }).catch(function () {

    });

});


$(document).on('click', '.lock-task', function () {

    let formData = new FormData();
    formData.append("ack", $(this).data("transaction"));

    $.ajax({
        type: 'POST',
        url: 'workflow/lock-transaction',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {

            if (data.status === "success") {

                swal("Done", data.message, "success");
                if(data.lock === "locked"){
                    if($('#lock-icon').hasClass('icofont-lock')){
                        $('#lock-icon').removeClass('icofont-lock');
                        $('#lock-icon').addClass('icofont-unlocked');
                    }

                }else if(data.lock === "unlocked"){

                    if($('#lock-icon').hasClass('icofont-unlocked')){
                        $('#lock-icon').removeClass('icofont-unlocked');
                        $('#lock-icon').addClass('icofont-lock');
                    }

                }else{
                    swal("Error", data.message, "error");
                }

            }else {
                swal("Error", data.message, "error");
            }
        }, error: function () {

            swal("Error", "Error occurred while locking the process\nPlease try again later.", "error");
        }
    });
});