<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invalid Request</title>
    <link rel="stylesheet" type="text/css" href="./bootstrap-grid.min.css">
</head>
<body>
    <h1>Invalid Request</h1>
    
    <h2>Request</h2>
    <b>action:</b> <%= request.getParameter("action") %><br>
    <b>username:</b> <%= request.getParameter("username") %><br>
    <b>postid:</b> <%= request.getParameter("postid") %><br>
    <b>title:</b> <%= request.getParameter("title") %><br>
    <b>body:</b> <%= request.getParameter("body") %><br>

    <h2>Reason of Error</h2>
    <%= request.getAttribute("error") %>
</body>
</html>
