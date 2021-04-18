<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset=UTF-8">
    <title>CS144 Configuration Test</title>
</head>
<body>
<table cellspacing="2" cellpadding="2">
    <tr><td><b>Property</b></td><td><b>Value</b></td></tr>
    <c:forEach var="m" items="${attributeMap}">
        <tr><td>${m.key}</td><td>${m.value}</td></tr>
    </c:forEach>
</table>
</body>
</html>
