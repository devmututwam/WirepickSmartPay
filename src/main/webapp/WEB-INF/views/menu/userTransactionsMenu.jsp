<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- Add your menu items here -->
<li class="menu-item">
    <a href="javascript:void(0);" class="menu-link menu-toggle">
        <i class="menu-icon tf-icons bx bx-layout"></i>
        <div data-i18n="Layouts">User Transactions</div>
    </a>

    <ul class="menu-sub">
        <li class="menu-item">
            <a class="menu-link" href="<c:url value="/userTransactions/getUserTransactionsByUser" />">
                <div data-i18n="Without menu">All transactions</div>
            </a>
        </li>
        <li class="menu-item">
            <a class="menu-link" href="<c:url value="/userTransactions/getTaxOnlineTransactions" />">
                <div data-i18n="Without menu">TaxOnline Transactions</div>
            </a>
        </li>
        <li class="menu-item">
            <a class="menu-link" href="<c:url value="/userTransactions/getNapsaTransactions" />">
                <div data-i18n="Without navbar">NAPSA TRansactions</div>
            </a>
        </li>
        <li class="menu-item">
            <a class="menu-link" href="<c:url value="/userTransactions/getPacraTransactions" />">
                <div data-i18n="Container">PACRA Transactions</div>
            </a>
        </li>
        <li class="menu-item">
            <a class="menu-link" href="<c:url value="/userTransactions/getAsycudaTransactions" />">
                <div data-i18n="Container">ASYCUDA Transactions</div>
            </a>
        </li>
    </ul>
</li>