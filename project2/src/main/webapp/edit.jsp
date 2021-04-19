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

<form action = "edit.jsp" method = "POST">
         First Name: <input type = "text" name = "first_name">
         <br />
         Last Name: <input type = "text" name = "last_name" />
         <input type = "submit" value = "Submit" />
</form>

<ul>
         <li><p><b>First Name:</b>
            <%= request.getParameter("first_name")%>
         </p></li>
         <li><p><b>Last  Name:</b>
            <%= request.getParameter("last_name")%>
         </p></li>
</ul>



<form action="list.jsp" method="GET">

Post Title:<input type="text" name="postTitleName" placeholder="enter the title of the post" id="postTitle" /><br>
Post Body: <textarea style="height: 40rem;" name="postBody" id="postBody"></textarea>

<button type="submit" value="ok">OK</button>
</form>




<div id="titleContent">Hello Title</div>





<script>
function myFunction() {
  String postTitle = request.getParameter("postTitle"); 
  var y = document.getElementById("postTitle");

  var x = document.getElementById("titleContent");
  if (y.innerHTML === "enter the title of the post") {
    x.innerHTML = "You haven't entered title yet";
  } else {
    x.innerHTML = "You entered title: " + "add";
  }
}
</script>










<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<button type="button" value="save" onclick="myFunction()">Save</button>

<a href="list.jsp">
   <input type="button" value="Visit List" onclick="myFunction()" />
</a>


<a href="list.jsp">
   <input type="button" value="Save" />
</a>




<!-- <a href="http://www.google.com/">
   <button>Visit Google</button>
</a> -->

<%

String postTitle2 = request.getParameter("postTitle2"); 
String postBody = request.getParameter("postBody"); 
int myValue = 0 ;  

%>

<script type="text/javascript">
   myFunction myFunction(){
      <% 
      myValue = 19;
      %>
   }

</script>








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









</body>
</html>
