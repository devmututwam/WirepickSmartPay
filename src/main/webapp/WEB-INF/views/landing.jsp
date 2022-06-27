
<%@ page contentType="text/html;charset=UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page isELIgnored="false" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Favicon icon -->
<%--    <link rel="shortcut icon" href="<c:url value="/assets/img/Wirepick_landing.png" />" type="image/x-icon">--%>
    <link rel="icon" type="image/x-icon" href="<c:url value="/assets/img/Wirepick_landing.png" />"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Wirepick Direct</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/assets/bower/bootstrap/css/bootstrap.min.css" />"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/assets/styles/security/login.css" />"/>

    <style>
        .login-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.35);
        }
        .landing-h1 {
            color: white;
            text-align: center;
            position: fixed;
            width: 100%;
            bottom: 10px;
            font-size: 1.15em;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.65);
        }
    </style>
</head>

<body>

<div class="row">
    <div class="col-md-12 col-xs-12 col-sm-12 ml-auto">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 ml-auto"
             style="display: flex;flex-direction: column;justify-content: right;align-items: flex-end;">
            <div class="login-overlay"></div>

            <div class="login-card card-block auth-body">

                <div class="auth-box">

                    <div class="row m-b-20">
                        <div class="col-md-12">
                            <h2 class="text-center text-bold text-header">Wirepick Direct</h2>
                        </div>
                    </div>
                    <hr/>

                    <div class="col-lg-12 mx-auto">
                        <a class="btn btn-block btn-success mr-3" href="login">Login</a>
                        <a class="btn btn-block btn-primary zra_btn" href="register">Register for
                            account</a>
                    </div>

                    <div class="row mb-5">
                        <div class="col-md-12 text-center d-none">
                            <p class="text-inverse text-left m-b-0">Wirepick Direct</p>
                            <p class="text-inverse text-left"><b>Innovation through technology</b></p>
                        </div>
                    </div>

                    <div class="text-center mb-5" style="color: #fcd26b; text-align: center;">
                        <b style="font-size: 1.5em; margin-bottom: 20px; font-family: Roboto,sans-serif;">Innovation through technology</b>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row d-none d-lg-block d-xl-block"
     style="position: relative; bottom: 30px; width: 100%; text-align: center;">
    <div class="text-center"
         style="width: 100%; text-align: center;">
        <p class="landing-h1 text-center">
            Copyright &copy; Wirepick Zambia 2022
        </p>
    </div>
    <div class="iew-container text-center mt-3 d-none">
        <p style="font-family: Roboto,sans-serif; color:#fff; ">Supported Browsers</p>
        <ul class="list-inline">
            <li class="mr-3">
                <a href="http://www.google.com/chrome/" target="_blank" style="color: #fff;">
                    <i class="fa fa-chrome" style="font-size: 25px; color: #fff;"></i>
                    <div style="color: #fff; font-family: Roboto,sans-serif;">Chrome</div>
                </a>
            </li>
            <li class="mr-3 ml-3">
                <a href="https://www.mozilla.org/en-US/firefox/new/">
                    <i class="fa fa-firefox" style="font-size: 25px; color: #fff;"></i>
                    <div style="color: #fff; font-family: Roboto,sans-serif;">Firefox</div>
                </a>
            </li>
            <li class="mr-3">
                <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">
                    <i class="fa fa-edge" style="font-size: 25px; color: #fff;"></i>
                    <div style="color: #fff; font-family: Roboto,sans-serif;">Microsoft Edge</div>
                </a>
            </li>
        </ul>
    </div>
</div>
</body>
</html>