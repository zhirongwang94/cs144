<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<%@ page import="java.sql.*" %>

<%@ page import = "java.io.*,java.util.*" %>


<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Post Title </title>
</head>

<body>
    <div><h1>Edit/Create a Post</h1></div>


    <div>
         <a href="list.jsp">Save</a>
         <a href="list.jsp">Close</a>
         <a href="preview.jsp">Preview</a>
         <a href="list.jsp">Delete</a>
    </div>

<form action="edit.jsp" method = "GET">
     Post ID   : <input type = "text" name = "postID"><br>
     Post Title: <input type = "text" name = "title" /><br>
     Post body : <textarea style="height: 30rem;" name="body" id="body"></textarea><br>
     <input type="hidden" name="user_name" value="vincent">

     <input type = "submit" value = "Save" onclick="test();" />

</form>


<ul>
         <li><p><b>POST ID   :</b><%= request.getParameter("postID")%></p></li>
         <li><p><b>POST TITLE:</b><%= request.getParameter("title")%></p></li>
         <li><p><b>POST BODY :</b><%= request.getParameter("body")%></p></li>
         <li><p><b>USERR NAME  qq:</b><%= request.getParameter("user_name")%></p></li>
</ul>

<%

        Connection c = null;
        Statement  s = null; 
        ResultSet rs = null; 
%>













<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>   
<script type="text/javascript">
    function  test(){
        document.forms[0].action = 'edit.jsp';
    


        // let user_name = "<%=request.getParameter("user_name")%>";
        // let postID = "<%=request.getParameter("postID")%>";
        // let title = "<%=request.getParameter("title")%>";
        // let body = "<%=request.getParameter("body")%>";

        let query_to_insert = "INSERT INTO Posts VALUES(\'" + "<%=request.getParameter("user_name")%>" + "\', " + "<%=request.getParameter("postID")%>" + ", \'" + "<%=request.getParameter("title")%>" + "\', \'" + "<%=request.getParameter("body")%>" + "\', \'2000-01-01 00:00:00\' , \'2000-01-01 00:00:00\' );";

            
        // System.out.println("Your query i: " + query_to_insert);
        document.write(query_to_insert);
            
    }

</script>








</body>
</html>
