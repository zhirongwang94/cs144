<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Post</title>
</head>



<%
   String title=request.getParameter("title");      
   String body=request.getParameter("body");       
   String postid=request.getParameter("postid");
   String username=request.getParameter("username");
   String action=request.getParameter("action"); 

   if(title == null){
    title = "";
   }
   if(body == null){
    body = "";
   }
%>

<body>


    <div><h1>Edit Post</h1></div>
    <form action="loginPage" method="POST">
        <div>
            <div><label for="username">Username</label><input                id="username"    name="username"    value="<%=username%>"> <br><br>
            <button type="submit" name="action"    value="save"> Save      </button>
            <button type="submit" name="action"    value="close">Close     </button>
            <button type="submit" name="action"    value="preview">Preview </button>
            <button type="submit" name="action"    value="delete">Delete   </button>
            
            <input  type="hidden" id="action"      name="action"      value="<%=action%>"> 
        </div>

        <div><label for="title">Title</label><input   type="text" id="title"  name="title"  value=<%=title%> ></div>
        <div><label for="title">Post ID</label><input type="text" id="postid" name="postid" value=<%=postid%> ></div>
        <div><label for="body">Body</label><textarea style="height: 20rem;" id="body" name="body"><%=body%></textarea></div>

        <button type="submit"> Submit </button>    
    </form>

<br><br><br><br><br><br>


</body>
</html>
