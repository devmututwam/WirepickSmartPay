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
            <h5 class="card-header">Available Users</h5>
            <div class="card-body">
                <form method="post" id="viewUsersForm" action=""   >
            <div style="margin-left: 15px; margin-right: 15px;" class="alert alert-info">
                View your available users and ..........
            </div>


            <%--ADD YOUR CONTENT HERE--%>

            <div class="dt-responsive table-responsive">
                <table id="simpletable" class="table table-hover table-striped table-bordered nowrap">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>USERNAME</th>
                        <th>SYSTEM CODE</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>STATUS</th>
                        <%--<th>ACTION</th>--%>
                    </tr>
                    </thead>
                    <tbody>

                    <c:if test="${not empty availableUsers}">
                        <c:forEach var="user" items="${availableUsers}" varStatus="counter">
                            <tr>
                                <td>${counter.count}.</td>
                                <td>${user.username}</td>
                                <td>${user.systemCode}</td>
                                <td>${user.emailAddress}</td>
                                <td>${user.phone}</td>
                                <td>
                                    <a class="text-info">${user.status}</a>
                                </td>
                               <%-- <td><button type="button" id="actDeact" class="btn btn-success mr-3">
                                    <i class="icofont icofont-paper-plane"></i>
                                    <a href="accounts/actDeactAccount?accountNumber=${account.accountNumber}" class="text-purple">Activate/Deactivate</a>
                                </button></td>--%>


                            </tr>
                        </c:forEach>
                    </c:if>

                    </tbody>
                </table>
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

