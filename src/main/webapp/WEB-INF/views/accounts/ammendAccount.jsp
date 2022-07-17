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

    <div class="card-block">

        <form method="post" id="ammendAccountForm" action=""   >
            <div style="margin-left: 15px; margin-right: 15px;" class="alert alert-info">
                Review your account details here and submit the form
            </div>


            <%--ADD YOUR CONTENT HERE--%>

            <div class="row" id="ARL" style="display:block;">
                <div class="col-sm-6 col-sm-6" style="float: left;">
                    <br>
                    <label> Account Name </label> <br>
                    <input class="form-control" type="text"
                           name="accountName" id="accountName" placeholder="name of account" value="${account.accountName}" required>
                    <br>
                    <label> Bank Name </label> <br>
                    <input class="form-control" type="text"
                           name="bankName" id="bankName" placeholder="Name of Bank" value="${account.bankName}" required>
                    <br>
                    <label> Branch Name </label> <br>
                    <input class="form-control" type="text"
                           name="branchName" id="branchName" placeholder="Name of branch" value="${account.branchName}" required>
                    <br>

                </div>
                <br>
                <div class="col-sm-6" style="float: right;">
                    <label> Branch Code </label> <br>
                    <input class="form-control" type="text"
                           name="branchCode" id="branchCode" placeholder="branch code" value="${account.branchCode}" required>
                    <br>
                    <label> Account Number </label> <br>
                    <input class="form-control" type="number"
                           name="accountNumber" id="accountNumber" placeholder="Account Number" maxlength="13" min="0" value="${account.accountNumber}" required>
                    <br>
                    <label> TPIN </label> <br>
                    <input class="form-control" type="number"
                           name="tpin" id="tpin" placeholder="TPIN" maxlength="10" min="0" value="${account.idNumber}">
                    <br>
                    <br>

                    <div class="form-group text-right">
                        <button type="button" id="submitAmmendedAccDetails" class="btn btn-success mr-3">
                            <i class="icofont icofont-paper-plane"></i> Submit
                        </button>
                    </div>
                </div>
            </div>

            <%--ADD YOUR CONTENT HERE--%>


        </form>

    </div>

    <%--ADD YOUR CONTENT HERE--%>

</div>

<%----%>
<%----%>
<%--End of custom page content--%>


<jsp:include page="../menu/footer.jsp" />

<%--Add your custom JS here--%>
<script type="text/javascript" src="<c:url value="/assets/bower/sweetalert/js/sweetalert.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/assets/js/accounts/ammendAccout.js"/>"></script>