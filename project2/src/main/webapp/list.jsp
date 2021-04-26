
<!-- The “list page” shows the list of all blog posts saved by the user.
 The posts in the list should be sorted by their “postid” (a unique integer assigned to a post) in the ascending order. Each item in the list must show:

title, creation, and modification dates of the post, and
two buttons: open and delete. Once pressed,

“open” button goes to the “edit page” for the post.
“delete” button deletes the post from the database and comes back to the list page.
The list page should also contain a “new post” button to allow users to create a new post. Once pressed, the button should lead to the “edit page” for a new post.
-->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.sql.*" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Post Listsssss </title>
</head>

<body>
    <div><h1>Home Page</h1></div>
    <div><p><a href="edit.jsp">New Post</a></p></div>
    <h2>Title  Created  Modified  </h2>



<!-- title, creation, and modification dates of the post -->

<%
    Connection c = null;
    Statement  s = null; 
    ResultSet rs = null; 
    try {
        c = DriverManager.getConnection("jdbc:mariadb://localhost:3306/CS144", "cs144", ""); 
        s = c.createStatement();
        rs = s.executeQuery("SELECT * FROM Posts;");

        while( rs.next() ){
            String title = rs.getString("title");
            String username = rs.getString("username");
            String postID = rs.getString("postid");
            String body = rs.getString("body");
            String created = rs.getString("created");
            String modified = rs.getString("modified");
            String toPrint = title + ",   " + created + ",   " + modified;
             %>
                <p> <%= toPrint %> <p>

        <form action="loginPage" method="POST">
        <div>
            <button type="submit" name="openButton"    value="open" >Open</button>
            <button type="submit" name="deleteButton"  value="delete" >Delete</button>
            <input  type="hidden" id="title" name="title" value="<%=title%>"> 
            <input  type="hidden" id="postID" name="postID" value="<%=postID%>"> 
            <input  type="hidden" id="body" name="body" value="<%=body%>"> 
            <input  type="hidden" id="username"  name="username"  value="<%=username%>">    
        </div>
    </form>
             <%
        }

    } catch (SQLException ex){
        String catchError = "SQLException caught" + "\n---" ;
        %>
            <p> <%= catchError %> <p>
        <%
        while ( ex != null ) {
           String errorMessage = "Message   : " + ex.getMessage() +  "\nSQLState  : " + ex.getSQLState() + "\nErrorCode : " + ex.getErrorCode() +  " \n---"; 
           %>
            <p> <%= errorMessage %> <p>
           
           <%
            ex = ex.getNextException();
        }
    } finally {
        try { rs.close(); } catch (Exception e) { /* ignored */ }
        try { s.close(); } catch (Exception e) { /* ignored */ }
        try { c.close(); } catch (Exception e) { /* ignored */ }
    }

%>



















</body>
</html>