import java.io.*;  
import java.io.*;  
import javax.servlet.*;  
import javax.servlet.http.*;  
import java.sql.*;    
import java.util.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class Validation extends HttpServlet 
{    
   public void doPost(HttpServletRequest request, 
     HttpServletResponse response) 
       throws ServletException, IOException 
   {        
       response.setContentType("text/html");      
       PrintWriter pwriter = response.getWriter();                

       String redirectPage = "";
       String query = "";
       String modifyTimeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());

       String title=request.getParameter("title");      
       String body=request.getParameter("body");       
       String postid=request.getParameter("postid");
       String username=request.getParameter("username"); 


       // String deleteButton=request.getParameter("deleteButton"); 
       // String closeButton=request.getParameter("closeButton"); 
       // String previewButton=request.getParameter("previewButton"); 
       // String saveButton=request.getParameter("saveButton"); 
       // String openButton=request.getParameter("openButton"); 
       String action = request.getParameter("action");


       // if (deleteButton != null){
       //  redirectPage = "list.jsp";
       // }else if(saveButton != null){
       //  redirectPage ="list.jsp";
       // }else if(previewButton !=null){
       //  redirectPage = "previewButton";
       // }else if(openButton != null){
       //  redirectPage = "post";
       // }else{
       //  redirectPage = "list.jsp";
       // }

       String query_to_check_post_exist = "SELECT * FROM Posts WHERE username=\"" + username+ "\" AND postid=" +postid;
       String query_to_get_max_postid = " SELECT MAX(postid) FROM Posts WHERE username=\"" + username +"\"";



     
       pwriter.println("YOUR title:  "+title+"\n");
       pwriter.println("YOUR body:  "+body+"\n");
       pwriter.println("YOUR postid:  "+postid+"\n");
       pwriter.println("YOUR username:  "+username+"\n");
       // pwriter.println("YOUR query_to_insert:  "+query_to_insert);
       // pwriter.println("deleteButton: "+ deleteButton);
       // pwriter.println("closeButton: " + closeButton);
       // pwriter.println("priviewButton:"+ previewButton);
       // pwriter.println("saveButton:  " + saveButton);
       // pwriter.println("openButton:  " + openButton);
       pwriter.println("Your action:  " + action);
       pwriter.println("Your redirectPage:  " + redirectPage);
       // pwriter.println("query:  " + query_to_insert);
       // pwriter.println("query:  " + query_to_update);
       // pwriter.println("query:  " + query_to_delete);


       // pwriter.println("MAX:  " + query_to_get_max_postid);


// DELETE FROM Posts WHERE postid=18 AND username="user_ACHERW";


        Connection c = null;
        Statement  s = null; 
        ResultSet rs = null; 

        // response.setStatus(HttpServletResponse.SC_OK);
        try {
    
            /* create an instance of a Connection object */
            c = DriverManager.getConnection("jdbc:mariadb://localhost:3306/CS144", "cs144", ""); 
            s = c.createStatement() ;


            // dealing with postid
            boolean postAlreadyExist = false; 
            boolean doNothing = false; 
            if(action.equals("save")){
                String max_postid = ""; 

                if(postid.equals("0")){
                  rs = s.executeQuery(query_to_get_max_postid);
                  pwriter.println("DEBUG 1");
                  while(rs.next()){
                    max_postid = rs.getString("MAX(postid)");
                    pwriter.println("DEBUG 2_ max_postid:" + max_postid);
                  }

                  if( max_postid == null || max_postid.equals("null") || max_postid.equals("") ){
                    max_postid = "1";
                  }
                  else{
                    max_postid = String.valueOf(Integer.valueOf(max_postid) + 1);
                  }  

                  
                  postid = max_postid;
                  pwriter.println("POSTID:  " + postid);
                }
                else{
                  String checked_username = ""; 
                  String chceked_postid = ""; 
                  rs = s.executeQuery(query_to_check_post_exist);  
                  while( rs.next() ){
                       checked_username = rs.getString("username");
                       chceked_postid = rs.getString("postid");
                  }

                  if (chceked_postid.equals(postid) && checked_username.equals(username)){
                    postAlreadyExist = true;

                  }
                  else{
                    doNothing = true; 
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                  }

                  pwriter.println("CHECK:  " + chceked_postid);

                }
            } 



              if(action.equals("open")){
                if (username == null || username.equals(""))
                  response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                  redirectPage = "list.jsp";
              }
             

              if(action.equals("preview")){
                if (username == null || username.equals("") || username.equals("null"))
                  response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                  redirectPage = "list.jsp";

                if (postid == null || postid.equals("") || postid.equals("null"))
                  response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                  redirectPage = "list.jsp";
              }







            //  for open 




           String query_to_insert = "INSERT INTO Posts VALUES(\'" + username + "\', " + postid + ", \'" + title + "\', \'" + body + "\', \'" +modifyTimeStamp+ "\' , \'2000-01-01 00:00:00\' );";
           String query_to_delete = "DELETE FROM Posts WHERE postid=" +postid+ " AND username=\"" +username+ "\"";
           String query_to_update = "UPDATE Posts SET body=\"" + body + "\" WHERE username=\"" +username+ "\" AND postid=" +postid;
           // String query_to_check = "SELECT * FROM Posts WHERE username=\"" + username+ "\" AND postid=" +postid;


            if(doNothing){
              query = "";
            }else if(action.equals("delete")){
              query = query_to_delete;
            }else if(action.equals("save") && postAlreadyExist){
              query = query_to_update;
            }else if(action.equals("save") && !postAlreadyExist){
              query = query_to_insert;
            }else if (action.equals("close") || action.equals("preview") || action.equals("list")){
              query = "";
            }

            pwriter.println("query:  " + query);

            if (action.equals("delete") || action .equals("save") || action.equals("list") || action.equals("close")){
              redirectPage = "list.jsp";
            }else if(action.equals("preview")){
              redirectPage = "preview.jsp";
            }else if(action.equals("open")){
              redirectPage = "edit.jsp";
            }


            s.executeUpdate(query);


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
