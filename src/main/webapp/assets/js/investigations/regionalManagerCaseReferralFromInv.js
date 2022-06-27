$(document).ready(function(){

    /*** sendback *******************************************************/
    var sendback_btn = $('#action_sendback');

    /***save sendback *********************************************/
    sendback_btn.on('click', function () {
        swal({
            title : "Are you sure?",
            text : "You wish to SendBack This Case Referral",
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

        if ($('#station_form')[0].checkValidity()){
            var formData = new FormData($('#station_form')[0]);

            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
            }

            $.ajax({
                type: 'POST',
                url: 'investigations/sendbackCaseReferralFromInvestigationsRegional',
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
                        },  function () {
                            $('#station_form')[0].reportValidity();
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
                    $('#station_form')[0].reportValidity();
                    swal("Error!", "Error occurred executing action: Make sure all fields are filled before you Contact system admin", "error");
                }
            });
        }else {
            $('#station_form')[0].reportValidity();
        }
    }



    /*** approve *******************************************************/
    var approve_btn = $('#action_approve');

    /***save approve *********************************************/
    approve_btn.on('click', function () {
        swal({
            title : "Are you sure?",
            text : "You wish to Submit This Case Referral",
            showCancelButton : true,
            confirmButtonClass : "btn-danger",
            confirmButtonText : "Yes",
            closeOnConfirm : false
        }, function() {
            $(".confirm").attr('disabled', 'disabled');
            approveFunction();
        });
    })

    //sendback function for the review
    function approveFunction() {

        if ($('#station_form')[0].checkValidity()){
            var formData = new FormData($('#station_form')[0]);

            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
            }

            $.ajax({
                type: 'POST',
                url: 'investigations/approveCaseReferralFromInvestigationsRegional',
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
                        },  function () {
                            $('#station_form')[0].reportValidity();
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
                    $('#station_form')[0].reportValidity();
                    swal("Error!", "Error occurred executing action: Make sure all fields are filled before you Contact system admin", "error");
                }
            });
        }else {
            $('#station_form')[0].reportValidity();
        }
    }




    var reject_btn = $('#reject_btn');

    /***Reject *************************************************************/
    reject_btn.on('click', function () {
        swal({
            title : "Are you sure?",
            text : "You want to Reject This Case Referral",
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

        if ($('#station_form')[0].checkValidity()){
            var formData = new FormData($('#station_form')[0]);


            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
            }

            $.ajax({
                type: 'POST',
                url: 'investigations/rejectCaseReferralFromInvestigationsRegional',
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
                        },  function () {
                            $('#station_form')[0].reportValidity();
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
                    $('#station_form')[0].reportValidity();
                    swal("Error!", "Error occurred executing action: Make sure all fields are filled before you Contact system admin", "error");
                }
            });
        }else {
            $('#station_form')[0].reportValidity();
        }
    }

});