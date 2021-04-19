<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Post Title </title>
</head>

<body>
    <div><h1>Home Page</h1></div>


    <form>
        <div>
            <p><a href="edit.jsp">New Post</a></p>
        </div>



        <h2>Title  Created  Modified  </h2>

    </form>


<ul>
         <li><p><b>First Name:</b>
            <%= request.getParameter("first_name")%>
         </p></li>
         <li><p><b>Last  Name:</b>
            <%= request.getParameter("last_name")%>
         </p></li>
</ul>
      
</body>
</html>