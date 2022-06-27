window['file-api'] = $("input[name=Root]").val() + '/ibdf/physical-inspection';
window['remove-file-api'] = $("input[name=Root]").val() + '/fileManager/';
window.reference = "" + window.Util.makeReference(10);
window['uploadedFiles'] = [];


function initializeIBDFPhyFileUploader() {
    //example 1
    $('#ibdfPhyAttachments').filer({
        limit: 10,
        maxSize: 10,
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'psd', 'pdf'],
        //showThumbs: true,
        //addMore: true,
        changeInput: true,
        showThumbs: true,
        uploadFile: {
            url: window['file-api'] + "/upload-file",
            data: {referenceNumber: window.reference},
            type: 'POST',
            enctype: 'multipart/form-data',
            beforeSend: function (filer) {
                $("#nextBtn").addClass('btn-disabled');
                $("#nextBtn").prop('disabled', true);
                let fileName = filer.find('.jFiler-item-title').attr('title');
                console.log("Item is ", fileName);
                window.showLoader = false;
            },
            success: function (data, el) {
                $("#nextBtn").removeClass('btn-disabled').addClass('btn-success');
                $("#nextBtn").prop('disabled', false);

                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function () {
                    $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-jfi-check-circle\"></i> Success</div>").hide().appendTo(parent).fadeIn("slow");
                });

                let fileName = data.fileName;
                let f = window.Util.getPropertyInArray(window['uploadedFiles'], "name", fileName);
                if (f) {
                    return
                }

                let uploadedFile = {
                    absPath: data.absPath,
                    fileKey: data.fileKey,
                    fileName: data.fileName,
                    fileSize: data.fileSize,
                    id: data.id,
                    referenceNumber: data.referenceNumber
                };

                window['uploadedFiles'].push({name: fileName, file: uploadedFile});
            },
            error: function (el) {
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function () {
                    $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error</div>").hide().appendTo(parent).fadeIn("slow");
                });
            },
            statusCode: null,
            onProgress: null,
            onComplete: null
        },
        files: [],
        addMore: false,
        clipBoardPaste: true,
        excludeName: null,
        beforeRender: null,
        afterRender: null,
        beforeShow: null,
        beforeSelect: null,
        onSelect: null,
        afterShow: null,
        onRemove: function (itemEl, file, id, listEl, boxEl, newInputEl, inputEl) {
            let f = window.Util.getPropertyInArray(window['uploadedFiles'], "name", file.name).file;
            if (f) {
                $.post(window['remove-file-api'] + 'removeFile/' + f.fileKey, {
                    beforeSend: function () {
                        window.showLoader = false;
                    },
                });
            }
        },
        onEmpty: null,
        options: null,
        captions: {
            button: "Choose Files",
            removeConfirmation: "Are you sure you want to remove this file?",
            errors: {
                filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
                filesType: "Only Images are allowed to be uploaded.",
                filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-maxSize}} MB.",
                filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
            }
        }
    });


}