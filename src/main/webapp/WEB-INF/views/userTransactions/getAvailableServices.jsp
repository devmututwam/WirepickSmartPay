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
        <h5 class="card-header">Configure Accounts</h5>
        <div class="card-body">
            <form method="post" id="userTransactionsForm" action=""   >
        <div style="margin-left: 15px; margin-right: 15px;" class="alert alert-info">
            Fill in the required information and submit the form
        </div>

        <div class="col-sm-6 col-sm-6" style="float: left;">

            <div class="form-group" id="serviceDiv" style="padding-top:20px;">
                <h4 class="sub-title">Service</h4>
                <div class="input-group date" id="serviceDivId">
                    <select id="service" name="service" onchange="getSelectedValue(this)" class="form-control form-control-lg" required>
                        <option selected value="0">---- Select service to retrieve transactions----</option>
                        <option value="NAPSA">National Pensions Scheme Authority</option>
                        <option value="TaxOnline">TaxOnline II</option>
                        <option value="PACRA">Patent And Company Registration Agency</option>
                        <option value="ZPPA">Zambia Public Procurement Authority</option>
                        <option value="ASYCUDA">ASYCUDA World</option>
                    </select>
                    <span class="input-group-addon" id="serviceSpanId">
                         <i class="fa fa-desktop "></i>
                        </span>
                </div>
            </div>
            <br>


        </div>



        <div class="row col-md-12">
            <div class="col-md-6">
            </div>
            <div class="col-md-6">
                <div class="form-group text-right">
                    <button type="button" id="submitService" class="btn btn-success mr-3">
                        <i class="icofont icofont-paper-plane"></i> Submit
                    </button>
                    <%--<button type="button" id="submitService" class="btn btn-success mr-3">
                        <i class="icofont icofont-paper-plane"></i>
                        <a  href="userTransactions/getUserTransactionsByService?service=${value}" class="text-info">Submit
                    </button>--%>
                </div>
            </div>
        </div>
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
<script type="text/javascript" src="<c:url value="/assets/js/userTransactions/userTransactions.js" />"></script>


<script type="text/javascript">
    //Js for Start date
    $().ready(function() {

        $('#dateFromId').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
        });

        $('#dateToId').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
        });

    });
</script>


<script type="text/javascript">
    //Js for Start date
    $().ready(function() {

        function getSelectedValue(selectObject) {
            console.log("Am in the Js");
            var value = selectObject.value;
            console.log(value);
        }

    });

</script>

