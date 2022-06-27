/**
 * Set loaderMessage to appropriate message to display to user. i.e. Loading, Editing, Processing, Saving, etc
 * @type {string}
 */

window.loaderMessage = "Loading";

$(document).ready(function () {
    //loader start
    $('.theme-loader').fadeOut(1000);
    //loader end

    axios.get('get_token').then(function (response) {
        window['token'] = response.data.token;
    });

    axios.post("getSessionStatus").then(function (response) {
        if (!response.data) {
            return;
        }

        if(response.changePassword){
            window.location.href = 'main'
        }

        $('.authenticatedUser').text(response.data.name);
        $('.emailAddress').text(response.data.emailAddress);
    });

    axios.get('oauth_logout_url').then(function (response) {
        window['logoutUrl'] = response.data.path;
        $(".logout").attr('data-href', response.data.path + "/oauth/logout");
    });

    axios.get('api/notifications/count-unread-notifications').then((response) => {
        $('.countOfNotifications').text(response.data.data);
    }).catch((error) => {
        $('.countOfNotifications').text(0);
    });

    $(".signOut").on('click', function (){
        const app_context = $('input[name=Root]').val();
        let logoutUrl = $(this).attr("data-href");
        auth.sign_out(logoutUrl,app_context);
    });

    $(".logout").off('click').on('click', function () {
        const app_context = $('input[name=Root]').val();
        let logoutUrl = $(this).attr("data-href");

        auth.log_out(logoutUrl, app_context).then((res)=>{console.log(res)});
    });
});