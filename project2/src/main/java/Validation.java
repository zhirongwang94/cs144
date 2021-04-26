import java.io.*;  
import java.io.*;  
import javax.servlet.*;  
import javax.servlet.http.*;  
import java.sql.*;    
public class Validation extends HttpServlet 
{    
   public void doPost(HttpServletRequest request, 
     HttpServletResponse response) 
       throws ServletException, IOException 
   {        
       response.setContentType("text/html");      
       PrintWriter pwriter = response.getWriter();                

       String redirectPage = "list.jsp";
       String query = "";

       String title=request.getParameter("title");      
       String body=request.getParameter("body");       
       String postID=request.getParameter("postID");
       String username=request.getParameter("username"); 


       String deleteButton=request.getParameter("deleteButton"); 
       String closeButton=request.getParameter("closeButton"); 
       String previewButton=request.getParameter("previewButton"); 
       String saveButton=request.getParameter("saveButton"); 
       String openButton=request.getParameter("openButton"); 




       String query_to_insert = "INSERT INTO Posts VALUES(\'" + username + "\', " + postID + ", \'" + title + "\', \'" + body + "\', \'2000-01-01 00:00:00\' , \'2000-01-01 00:00:00\' );";
       String query_to_delete = "DELETE FROM Posts WHERE postid=" +postID+ " AND username=\"" +username+ "\"";

       if(deleteButton != null){
          query = query_to_delete;
       }
       else if(saveButton != null){
          query = query_to_insert;
       }


       if(openButton != null){
          redirectPage = "edit.jsp";
       }
     
       pwriter.println("YOUR title:  "+title+"\n");
       pwriter.println("YOUR body:  "+body+"\n");
       pwriter.println("YOUR postID:  "+postID+"\n");
       pwriter.println("YOUR username:  "+username+"\n");
       // pwriter.println("YOUR query_to_insert:  "+query_to_insert);
       pwriter.println("deleteButton: "+ deleteButton);
       pwriter.println("closeButton: " + closeButton);
       pwriter.println("priviewButton:"+ previewButton);
       pwriter.println("saveButton:  " + saveButton);
       pwriter.println("openButton:  " + openButton);

       pwriter.println("query:  " + query);


// DELETE FROM Posts WHERE postid=18 AND username="user_ACHERW";





        Connection c = null;
        Statement  s = null; 
        ResultSet rs = null; 

        try {
    
            /* create an instance of a Connection object */
            c = DriverManager.getConnection("jdbc:mariadb://localhost:3306/CS144", "cs144", ""); 
            s = c.createStatement() ;
            s.executeUpdate(query) ;

        } catch (SQLException ex){
            pwriter.println("SQLException caught");
            pwriter.println("---");

            System.out.println("SQLException caught");
            System.out.println("---");

            while ( ex != null ) {
                pwriter.println("Message   : " + ex.getMessage());
                pwriter.println("SQLState  : " + ex.getSQLState());
                pwriter.println("ErrorCode : " + ex.getErrorCode());
                pwriter.println("---");

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

            RequestDispatcher dis=request.getRequestDispatcher(redirectPage);          
            dis.forward(request, response); 
        }


  
   }    
}
