<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<%@ page import="java.sql.*" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Post Title </title>
</head>

<body>
    <div><h1>Edit/Create a Post</h1></div>


    <div>
         <p><a href="list.jsp">Save</a></p>
         <p><a href="list.jsp">Close</a></p>
         <p><a href="preview.jsp">Preview</a></p>
         <p><a href="list.jsp">Delete</a></p>
    </div>




<form action = "edit.jsp" method = "GET">
         Post ID   : <input type = "text" name = "postID"><br>
         Post Title: <input type = "text" name = "title" /><br>
         Post body : <textarea style="height: 30rem;" name="body" id="body"></textarea><br>
         <input type="hidden" name="user_name" value="vincent">
         <input type = "submit" value = "Save" />
</form>


<ul>
         <li><p><b>POST ID   :</b><%= request.getParameter("postID")%></p></li>
         <li><p><b>POST TITLE:</b><%= request.getParameter("title")%></p></li>
         <li><p><b>POST BODY :</b><%= request.getParameter("body")%></p></li>
         <li><p><b>USERR NAME:</b><%= request.getParameter("user_name")%></p></li>
</ul>















<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>   
         <% 
          Connection c = null;
          Statement  s = null; 
          ResultSet rs = null; 


        try {
            String bar, beer ;
            float price ;
    
            /* create an instance of a Connection object */
            c = DriverManager.getConnection("jdbc:mariadb://localhost:3306/CS144", "cs144", ""); 
         
         /* You can think of a JDBC Statement object as a channel
         sitting on a connection, and passing one or more of your
         SQL statements (which you ask it to execute) to the DBMS*/

            s = c.createStatement();


            String query_to_insert = "INSERT INTO Posts VALUES(\'" + request.getParameter("user_name") + "\', " + request.getParameter("postID") + ", \'" + request.getParameter("title") + "\', \'" + request.getParameter("body") + "\', \'2000-01-01 00:00:00\' , \'2000-01-01 00:00:00\' );";

            %>
                <p> query_to_insert <%= query_to_insert %> <p>
            <%

            s.executeUpdate(query_to_insert) ;




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
