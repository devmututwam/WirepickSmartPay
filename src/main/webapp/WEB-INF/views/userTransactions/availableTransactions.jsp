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

        <form method="post" id="availableTransactionsForm" action=""   >
            <div style="margin-left: 15px; margin-right: 15px;" class="alert alert-info">
                Available Transactions
            </div>


            <%--ADD YOUR CONTENT HERE--%>


            <div class="dt-responsive table-responsive">
                <table id="simpletable" class="table table-hover table-striped table-bordered nowrap">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>ID NUMBER</th>
                        <th>NAME</th>
                        <th>PRN NO</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>SERVICE</th>
                        <th>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>

                    <c:if test="${not empty transactions}">
                        <c:forEach var="transaction" items="${transactions}" varStatus="counter">
                            <tr>
                                <td>${counter.count}.</td>
                                <td>${transaction.idNumber}</td>
                                <td>${transaction.name}</td>
                                <td>${transaction.prnNumber}</td>
                                <td>${transaction.prnAmount}</td>
                                <td>${transaction.status}</td>
                                <td>${transaction.serviceCode}</td>
                                <td> <button type="button" class="icofont icofont-paper-plane text-success" >Pay</button> </td>


                            </tr>
                        </c:forEach>
                    </c:if>

                    </tbody>
                </table>
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

<script>
    $(document).ready(function() {

        $('#simpletable').DataTable( {
            dom: 'Bfrtip',
            searching: true,
            paging:   true,
            ordering: true,
            info:     true,
            lengthChange: true,
            buttons: [
                {
                    extend: 'copy',
                },
                {
                    extend: 'excel',
                },
                {
                    extend: 'csv',
                }
            ],

        } );

    } );
</script>

