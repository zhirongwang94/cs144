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
       String name=request.getParameter("uname");      
       String pass=request.getParameter("upass"); 

       String title=request.getParameter("title");      
       String body=request.getParameter("body");       
       String postID=request.getParameter("postID"); 

       String query_to_insert = "INSERT INTO Posts VALUES(\'" + request.getParameter("user_name") + "\', " + request.getParameter("postID") + ", \'" + request.getParameter("title") + "\', \'" + request.getParameter("body") + "\', \'2000-01-01 00:00:00\' , \'2000-01-01 00:00:00\' );";



     
       pwriter.println("YOUR title:  "+title+"!");
       pwriter.println("YOUR body:  "+body+"!");
       pwriter.println("YOUR postID:  "+postID+"!");
       pwriter.println("YOUR query_to_insert:  "+query_to_insert);
    

        Connection c = null;
        Statement  s = null; 
        ResultSet rs = null; 

        try {
    
            /* create an instance of a Connection object */
            c = DriverManager.getConnection("jdbc:mariadb://localhost:3306/CS144", "cs144", ""); 

            s = c.createStatement() ;

            s.executeUpdate(query_to_insert) ;

        } catch (SQLException ex){
            pwriter.println("SQLException caught");
            pwriter.println("---");

            System.out.println("SQLException caught");
            System.out.println("---");

            RequestDispatcher dis=request.getRequestDispatcher("edit.jsp");          
            dis.forward(request, response);   
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

                dis=request.getRequestDispatcher("edit.jsp");          
                dis.forward(request, response);      

            }
        } finally {
            try { rs.close(); } catch (Exception e) { /* ignored */ }
            try { s.close(); } catch (Exception e) { /* ignored */ }
            try { c.close(); } catch (Exception e) { /* ignored */ }

            RequestDispatcher dis=request.getRequestDispatcher("list.jsp");          
            dis.forward(request, response); 
        }







       // if(name.equals("Chaitanya") && 
       //    pass.equals("beginnersbook"))
       // {          
       //    RequestDispatcher dis=request.getRequestDispatcher("welcome");          
       //    dis.forward(request, response);      
       // }     
       // else
       // {      
       //    pwriter.print("User name or password is incorrect!");          
       //    // RequestDispatcher dis=request.getRequestDispatcher("index.html");
       //    RequestDispatcher dis=request.getRequestDispatcher("edit.jsp");          
       //    // dis.include(request, response);     
       //    dis.forward(request, response);                                 
       // }      
   }    
}  