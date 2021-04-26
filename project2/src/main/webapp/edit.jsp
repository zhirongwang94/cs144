<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Post</title>
</head>


<script type="text/javascript">
    function  goToPreviewPage(){
        document.forms[0].action = 'preview.jsp';
    }

    function  goToListPage(){
        document.forms[0].action = 'list.jsp';
    }

    // function deletePost(){
    //     document.getElementByID('deleteButton') = 1;
    // }
</script>

<%
       String title=request.getParameter("title");      
       String body=request.getParameter("body");       
       String postID=request.getParameter("postID");
       String username=request.getParameter("username");
%>

<body>


    <div><h1>Edit Post</h1></div>
    <form action="loginPage" method="POST">

        <div>
            <button type="submit" name="saveButton"    value="save" >Save</button>
            <button type="submit" name="closeButton"   value="close" onclick="goToListPage()">Close</button>
            <button type="submit" name="previewButton" value="preview" onclick="goToPreviewPage()">Preview</button>
            <button type="submit" name="deleteButton"  value="delete" >Delete</button>
            <input  type="hidden" id="username"  name="username"  value="<%=username%>">    
            
        </div>


        <div><label for="title">Title</label><input   type="text" id="title"  name="title"  value=<%=title%> ></div>
        <div><label for="title">Post ID</label><input type="text" id="postID" name="postID" value=<%=postID%> ></div>
        <div><label for="body">Body</label><textarea style="height: 20rem;" id="body" name="body"><%=body%></textarea></div>
    </form>

<br><br><br><br><br><br>


</body>
</html>
