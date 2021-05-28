<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Post List</title>
    <link rel="stylesheet" type="text/css" href="./bootstrap-grid.min.css">
</head>
<body>
    <div>
        <form action="post" id="0">
            <input type="hidden" name="username" value=<%= request.getParameter("username") %>>
            <input type="hidden" name="postid" value="0">
            <button type="submit" name="action" value="open">New Post</button>
        </form>
    </div>
    <%@ page import ="java.util.*" %>
    <table>
        <tr><th>Title</th><th>Created</th><th>Modified</th><th>&nbsp;</th></tr>
        <% Object object = request.getAttribute("count"); int count=Integer.parseInt(object.toString()); %>
        <% ArrayList<String> names = (ArrayList)request.getAttribute("names"); %>
        <% ArrayList<Integer> ids = (ArrayList)request.getAttribute("ids"); %>
        <% ArrayList<String> titles = (ArrayList)request.getAttribute("titles"); %>
        <% ArrayList<String> createds = (ArrayList)request.getAttribute("createds"); %>
        <% ArrayList<String> modifieds = (ArrayList)request.getAttribute("modifieds"); %>
        <% for (int i=0; i<count; i++) { %>
        <tr>
            <form id=<%= i+1 %> action="post" method="POST"> 
                <input type="hidden" name="username" value='<% out.print(names.get(i)); %>'>
                <input type="hidden" name="postid" value='<% out.print(ids.get(i)); %>'>
                <td><% out.print(titles.get(i)); %></td>
                <td><% out.print(createds.get(i)); %></td>
                <td><% out.print(modifieds.get(i)); %></td>
                <td>
                    <button type="submit" name="action" value="open">Open</button>
                    <button type="submit" name="action" value="delete">Delete</button>
                </td>
            </form>
        </tr>
        <% } %>
    </table>
</body>
</html>
