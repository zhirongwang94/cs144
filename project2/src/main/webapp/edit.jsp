<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<%@ page import="java.sql.*" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Post Title </title>
</head>

<body>
    <div><h1>Edit/Create a Post</h1></div>


    <form>
        <div>
            <p><a href="edit.jsp">Save</a></p>
            <p><a href="list.jsp">Close</a></p>
            <p><a href="preview.jsp">Preview</a></p>
            <p><a href="list.jsp">Delete</a></p>

        </div>


<form action="MyServlet" method="post">
Post Title:
<input type="text" name="postTitle" placeholder="enter the title of the post" />

<br>
Post Title2:
<input type="text" name="postTitle2" placeholder="enter the title of the post2" />

<br>
Post Body:
<textarea style="height: 40rem;" name="postBody"></textarea>


<input type="submit" value="ok" />



</form>

<%

String postTitle = request.getParameter("postTitle"); 
String postTitle2 = request.getParameter("postTitle2"); 
String postBody = request.getParameter("postBody"); 
   

%>


<p>Your post title is:  <%= postTitle %>  </p>
<p>Your post title2 is:  <%= postTitle2 %>  </p>
<p>Your post body is:  <%= postBody %>  </p>






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

            s = c.createStatement() ;

            s.executeUpdate("DROP TABLE IF EXISTS Sells" ) ;
            s.executeUpdate("CREATE TABLE Sells(bar VARCHAR(40), beer VARCHAR(40), price REAL)" ) ;
            s.executeUpdate("INSERT INTO Sells VALUES('Bar Of Foo', 'BudLite', 2.00)") ;

            rs = s.executeQuery("SELECT * FROM Sells") ;
            while( rs.next() ){
                 bar = rs.getString("bar");
                 beer = rs.getString("beer");
                 price = rs.getFloat("price");
                 String toPrint = bar + " sells " + beer + " for " + price + " dollars." ;

                 %>
                      <h2>Trinying You'll have a luck day!!!s!@</h2>
                      <p>(<%= toPrint %>)</p>

                 <%
            }

        } catch (SQLException ex){
            System.out.println("SQLException caught");
            System.out.println("---");
            while ( ex != null ) {
                System.out.println("Message   : " + ex.getMessage());
                System.out.println("SQLState  : " + ex.getSQLState());
                System.out.println("ErrorCode : " + ex.getErrorCode());
                System.out.println("---");
                ex = ex.getNextException();
            }
        } finally {
            try { rs.close(); } catch (Exception e) { /* ignored */ }
            try { s.close(); } catch (Exception e) { /* ignored */ }
            try { c.close(); } catch (Exception e) { /* ignored */ }
        }

          %>



    </form>






</body>
</html>
