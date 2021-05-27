import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class Halo extends HttpServlet implements Servlet {
       
    public Halo() {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head><title>Servlet Example</title></head>");
        out.println("<body>Halo, " + request.getParameter("name") + "!<br>");
        out.println("Greetings from a Java Halo Servlet.</body>");
        out.println("</html>");
        out.close();
    }
}