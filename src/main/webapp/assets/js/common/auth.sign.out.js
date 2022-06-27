let auth = {
    redirect: function () {
        let url = window.location.href.split('/');
        let finalUrl = window['logoutUrl'] + '/logout?' + encodeURI(url[0] + "//" + url[2] + $('#root').val()) + "/index";
        console.log(finalUrl);
        window.location.href = finalUrl;
    }, sign_out: function (logoutUrl, app_context) {
        let self = this;
        app_context = app_context || $('input[name=Root]').val();

        $.ajax({
                   url: logoutUrl,// revoke token
                   type: "POST",
                   beforeSend: function (request) {
                       request.setRequestHeader("X-XSRF-TOKEN",
                                                Cookies.get('XSRF-TOKEN'));
                   }
               }).done(function (response) {
            Cookies.remove("JSESSIONID");
            console.log(" Running local logout ");
            self.redirect();
        }).fail(function (xhr) {
            console.log(xhr)
        });
    },

    log_out: async function (logoutUrl, app_context) {
        let self = this;
        app_context = app_context || $('input[name=Root]').val();

        // revoke token on oauth
        const tokenRevocationRes = await this.revokeToken(logoutUrl);

        console.log(tokenRevocationRes);

        const response = await fetch(window['logoutUrl'] + '/logout');

        console.log(response);

        //if (res.status === 200) {}
        //logout on client application / local

        if (tokenRevocationRes.success) {
            const res = await fetch(app_context + '/logout');
            Cookies.remove("JSESSIONID");
            console.log(" Running local logout ");
            self.redirect();
        }
    },

    // Example POST method implementation:
    revokeToken: async function (url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": "Bearer " + window.token,
                "X-XSRF-TOKEN": Cookies.get('XSRF-TOKEN')
            },
            redirect: 'manual', // manual, *follow, error
            referrerPolicy: 'strict-origin-when-cross-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data)
        });
        return response.json();
    }
}
