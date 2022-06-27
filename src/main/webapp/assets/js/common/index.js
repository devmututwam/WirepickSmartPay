/**
 * Displays a loader when the user should wait for a certain action to complete
 * @param displayModal - true/false
 */
window.loaderVisible = false;
window.showLoaderModal = function (displayModal) {
    if (window.loaderVisible && displayModal)
        return;
    window.loaderMessage = (!!window.loaderMessage) ? window.loaderMessage : "Please wait...";
    $("#loading-message").html(window.loaderMessage);
    if (!!displayModal) {
        if (!window.loaderVisible) {
            $('#page-loader').modal({
                backdrop: 'static',
                keyboard: false
            });
            window.loaderVisible = true;
        }
    } else {
        $('#page-loader').modal('hide');
        setTimeout(function () {
            window.loaderVisible = false;
            $('#page-loader').modal('hide');
        }, 1000);
    }
}

// Show/hide loader
window._requestsLoading = [];
window.addEventListener('beforeunload', function (event) {
    if (event.origin !== window.location.href) // Compliant
        return;

    window._requestsLoading.push(1);
    window.showLoaderModal(window.showLoader !== false);
});
$(document).ajaxSend(function () {
    window._requestsLoading.push(1);
    window.showLoaderModal(window.showLoader !== false);
});
$(document).ajaxComplete(function () {
    window._requestsLoading.pop();
    if (window._requestsLoading.length <= 0) {
        window.showLoaderModal(false);
    }
});

$(document).ajaxError(function (e, a, b) {
    window._requestsLoading.pop();
    let title = Util.getProperty(a, "responseJSON.Exception.code");
    title = (!!title) ? title.replace('_', ' ') : "";
    let text = Util.getProperty(a, "responseJSON.Exception.message");
    text = (!!text) ? text.replace(/_/g, ' ') : "";
    window.showLoaderModal(false);
    if (!!title) {
        swal({
            title: title,
            text: text,
            type: "warning"
        });
    }
});