<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- Add your menu items here -->
<li class="menu-item">
    <a href="javascript:void(0);" class="menu-link menu-toggle">
        <i class="menu-icon tf-icons bx bx-layout"></i>
        <div data-i18n="Layouts">Darshboard</div>
    </a>

    <ul class="menu-sub">


        <li class="menu-item">
            <a class="menu-link" href="<c:url value="/dashboardMain" />">
                <div data-i18n="Without menu">Main dashboard</div>
            </a>
        </li>
        <li class="menu-item">
            <a class="menu-link" href="<c:url value="/darshBoardSummary" />">
                <div data-i18n="Without navbar">Transactional</div>
            </a>
        </li>


    </ul>
</li>