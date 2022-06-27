$(document).ready(function() {

    /*var Other = $('#Other');

    Other.on('select', function () {
        swal({
            title : "Are you sure?",
            text : "You wish to approve the allegation",
            showCancelButton : true,
            confirmButtonClass : "btn-danger",
            confirmButtonText : "Yes",
            closeOnConfirm : false
        }, function() {
            $(".confirm").attr('disabled', 'disabled');
            // revByExamOfficerFucntion(refNumber);
        });
    })*/

    var other = $('#other');
    other.on('click', function () {
        alert($("#sourceName").val());
        swal({
            title : "Are you sure?",
            text : "You wish to approve the allegation",
            showCancelButton : true,
            confirmButtonClass : "btn-danger",
            confirmButtonText : "Yes",
            closeOnConfirm : false
        }, function() {
            $(".confirm").attr('disabled', 'disabled');
            revByExamOfficerFucntion(refNumber);
        });
    })


});