
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class WelcomeUser extends HttpServlet { 
       
    public WelcomeUser() {}

    /**
     * Handles HTTP GET requests
     * 
     * @see javax.servlet.http.HttpServlet#doGet(HttpServletRequest request,
     *      HttpServletResponse response)
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException 
    {

        PrintWriter out = response.getWriter();

        String username = "harley hu";
        String password = request.getParameter("password");
         
        System.out.println("username: " + username);
        System.out.println("password: " + password);


       out.println("<!DOCTYPE html>");


    // out.println("<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\" pageEncoding=\"UTF-8\"%><%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %><!DOCTYPE html>");
    out.println("<html>");
    out.println("<head>");
    //  out.println("   <meta charset=\"UTF-8\">");
    //  out.println("   <title>Edit Post</title>");
    out.println("</head>");


    out.println("<script type=\"text/javascript\">");
     out.println("   function  goToPreviewPage(){");
     out.println("       document.forms[0].action = 'preview.jsp';");
     out.println("   }");

      out.println("  function  goToListPage(){");
      out.println("      document.forms[0].action = \'list.jsp\';");
     out.println("   }");
    out.println("</script>");



    out.println("<body>");
    out.println(" <div><h1>Edit Post</h1></div>");
       out.println(" <form action=\"loginPage\" method=\"POST\">");
        
          out.println("  <div>");
            out.println("    <button type=\"submit\">Save</button>");
              out.println("  <button type=\"submit\" onclick=\"goToListPage()\">Close</button>");
             out.println("   <button type=\"submit\" onclick=\"goToPreviewPage()\">Preview</button>");
               out.println(" <button type=\"submit\">Delete</button>");
            out.println("</div>");


           out.println(" <div><label for=\"title\">Title</label><input type=\"text\" id=\"title\" name=\"title\"></div>");
           out.println(" <div><label for=\"title\">Post ID</label><input type=\"text\" id=\"postID\" name=\"postID\"></div>");
            out.println("<div><label for=\"body\">Body</label><textarea style=\"height: 20rem;\" id=\"body\" name=\"body\">" + username + "</textarea></div>");
        out.println("</form>");

    out.println("<br><br><br><br><br><br>");


    out.println("</body>");
    out.println("</html>");
    out.close();

    

    }
    



}