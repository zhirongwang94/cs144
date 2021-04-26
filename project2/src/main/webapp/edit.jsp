<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Post</title>
</head>
<body>
    <div><h1>Edit Post</h1></div>
    <form action="loginPage" method="POST">
        <div>
            <button type="submit">Save</button>
            <button type="submit">Close</button>
            <button type="submit">Preview</button>
            <button type="submit">Delete</button>
        </div>


        <div>
            <label for="title">Title</label>
            <input type="text" id="title" name="title">
        </div>

        <div>
            <label for="title">Post ID</label>
            <input type="text" id="postID" name="postID">
        </div>

        <div>
            <label for="body">Body</label>
            <textarea style="height: 20rem;" id="body" name="body"></textarea>
        </div>
    </form>


e
<br><br><br><br><br><br>


<form action="loginPage" method="post"> 
  User Name:<input type="text" name="uname"/><br/> 
  Password:<input type="password" name="upass"/><br/> 
  <input type="submit" value="SUBMIT"/> 
</form> 


</body>
</html>
