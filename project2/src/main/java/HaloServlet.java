import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class HaloServlet extends HttpServlet implements Servlet {
       
    public HaloServlet() {}

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {
        PrintWriter out = response.getWriter();

        String username = request.getParameter("username");
        String password = request.getParameter("password");
         
        System.out.println("username: " + username);
        System.out.println("password: " + password);


        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head><title>Halo Servlet Example</title></head>");
        out.println("<body>username, " + username + "!<br>");
        out.println("<body>password, " + password + "!<br>");
        out.println("Greetings from a Java Halo Servlet.</body>");
        out.println("</html>");
        out.close();
    }
}