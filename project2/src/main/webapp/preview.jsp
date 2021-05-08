<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Post</title>
</head>

<%
       String title=request.getParameter("title");      
       String body=request.getParameter("body");       
       String postID=request.getParameter("postID");
       String username=request.getParameter("username");

       if(body == null || body.equal("null")){
            body = "";
       }
       String[] lines = body.split("\n");
       int size = lines.length;
%>

<body>
    <form action="edit.jsp">
        <input type="submit" value="Close Preview" />
        <input  type="hidden" id="title" name="title" value="<%=title%>"> 
        <input  type="hidden" id="postID" name="postID" value="<%=postID%>"> 
        <input  type="hidden" id="body" name="body" value="<%=body%>"> 
        <input  type="hidden" id="username"  name="username"  value="<%=username%>">    
    </form>
<br>


<h1> <%=title%> </h1>
<p>This is the <%=postID%> post</p>

<%
       for(int i = 0; i < lines.length; i++){
          %>
            <p><%=lines[i]%></p>
          <%
       }
%>


<!-- 

<p>The length: <%=size%></p>


<br><br><br><br><br><br><br><br>
<b>
     
       YOUR title:  <%= title %>
       YOUR body:  <%= body%>
       YOUR postID: <%= postID%>

</b> -->
</body>
</html>