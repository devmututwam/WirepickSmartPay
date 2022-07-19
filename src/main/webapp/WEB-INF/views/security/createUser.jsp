<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page isELIgnored="false" %>

<jsp:include page="../menu/sidebar.jsp" />

<%--Put your Custom CSS here--%>
<link rel="stylesheet" type="text/css" href="<c:url value="/assets/bower/sweetalert/css/sweetalert.css" />"/>

<%--Start of custom page content--%>
<%----%>
<%----%>

<div class="container-xxl flex-grow-1 container-p-y">

    <%--ADD YOUR CONTENT HERE--%>

    <div class="card mb-4">
        <h5 class="card-header">Create User</h5>
        <div class="card-body">
            <form method="post" id="createUserForm" action=""   >
                <div style="margin-left: 15px; margin-right: 15px;" class="alert alert-info">
                    Enter the user details here and submit the form
                </div>


                <%--ADD YOUR CONTENT HERE--%>

                <div class="row" id="userDetailsDiv" style="display:block;">
                    <div class="col-sm-6 col-sm-6" style="float: left;">
                        <br>
                        <label> Username </label> <br>
                        <input class="form-control" type="text"
                               name="username" id="username" placeholder="username">
                        <br>
                        <label> First Name </label> <br>
                        <input class="form-control" type="text"
                               name="firstName" id="firstName" placeholder="Fist name">
                        <br>
                        <label> Last Name </label> <br>
                        <input class="form-control" type="text"
                               name="lastName" id="lastName" placeholder="Last name">
                        <br>
                        <label> Email </label> <br>
                        <input class="form-control" type="email"
                               name="emailAddress" id="emailAddress" placeholder="email">
                        <br>

                    </div>
                    <br>
                    <div class="col-sm-6" style="float: right;">
                        <label> Role </label> <br>
                        <select class="form-control" name="role" id="role">
                            <option value="0" selected>--------Select user role--------</option>
                            <option value="MAKER">Maker</option>
                            <option value="CHECKER">Checker</option>
                        </select>
                        <br>
                        <label> Phone </label> <br>
                        <input class="form-control" type="text"
                               name="phone" id="phone" placeholder="phone number: 09xxxxxxxx">
                        <br>
                        <label for="userType" class="form-label">User Type</label>
                        <select class="form-control" name="userType" id="userType">
                            <option value="0" selected>--------Individual/Company--------</option>
                            <option value="INDIVIDUAL">INDIVIDUAL</option>
                            <option value="COMPANY">COMPANY</option>
                        </select>
                        <br>

                        <div class="form-group text-right">
                            <button type="button" id="createUserBtn" class="btn btn-success mr-3">
                                <i class="icofont icofont-paper-plane"></i> Submit
                            </button>
                        </div>
                    </div>
                </div>

                <%--ADD YOUR CONTENT HERE--%>


            </form>
        </div>
    </div>

    <%--ADD YOUR CONTENT HERE--%>

</div>

<%----%>
<%----%>
<%--End of custom page content--%>


<jsp:include page="../menu/footer.jsp" />

<%--Add your custom JS here--%>
<script type="text/javascript" src="<c:url value="/assets/bower/sweetalert/js/sweetalert.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/assets/js/security/createUser.js"/>"></script>