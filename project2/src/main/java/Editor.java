import java.io.IOException;
import java.sql.* ;
import java.util.List;
import java.util.ArrayList;
import java.util.Date;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.commonmark.node.*;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;

/**
 * Servlet implementation class for Servlet: ConfigurationTest
 *
 */
public class Editor extends HttpServlet {
    /**
     * The Servlet constructor
     * 
     * @see javax.servlet.http.HttpServlet#HttpServlet()
     */
    public Editor() {}

    public void init() throws ServletException
    {
        /*  write any servlet initialization code here or remove this function */
    }
    
    public void destroy()
    {
        /*  write any servlet cleanup code here or remove this function */
    }

    /**
     * Handles HTTP GET requests
     * 
     * @see javax.servlet.http.HttpServlet#doGet(HttpServletRequest request,
     *      HttpServletResponse response)
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException 
    {
        System.out.println("hello from doGEt");
        String action = request.getParameter("action");
        String username = request.getParameter("username");
        String id_str = request.getParameter("postid");
        int postid = (id_str == null) ? 0 : Integer.parseInt(id_str);
        String title = request.getParameter("title");
        String body = request.getParameter("body");
        String error = check("GET", action, username, postid, title, body);
        // if (!error.equals("good")) {
        //     action = "error";
        //     request.setAttribute("error", error);
        // }
        System.out.println("action is: " + action);
        switch (action) {
            case "list":
                List<Post> posts = getPosts(username);
                List<String> names = new ArrayList<String>();
                List<Integer> ids = new ArrayList<Integer>();
                List<String> titles = new ArrayList<String>();
                List<String> createds = new ArrayList<String>();
                List<String> modifieds = new ArrayList<String>();
                for (Post post : posts) {
                    names.add(post.username);
                    ids.add(post.postid);
                    titles.add(post.title);
                    createds.add(post.created_formatted);
                    modifieds.add(post.modified_formatted);
                }
                request.setAttribute("count", ids.size());
                request.setAttribute("names", names);
                request.setAttribute("ids", ids);
                request.setAttribute("titles", titles);
                request.setAttribute("createds", createds);
                request.setAttribute("modifieds", modifieds);
                request.getRequestDispatcher("/list.jsp").forward(request, response);
                break;
            case "open":
                System.out.println("hello from doGEt open");
                if (postid <= 0) {
                    System.out.println("hello from zerooo ");
                    title = "";
                    body = "";
                }

                System.out.println("userneame:  " +  username  + " postid: " + postid);
                // else if (title == null || body == null || title == "" || body == "") {
                    System.out.println("hello from doGet open");
                    Post post = getPost(username, postid);
                    if (title == null)
                        title = (post == null) ? "" : post.title;
                    if (body == null)
                        body = (post == null) ? "" : post.body;
                // }
                // System.out.println("hello from zerooo else ");
                System.out.println("hello from doGet done");
                System.out.println("title: " + title + " body: " + body);

                request.setAttribute("title", title);
                request.setAttribute("body", body);
                request.getRequestDispatcher("/edit.jsp").forward(request, response);
                break;
            case "preview":
                Parser parser = Parser.builder().build();
                Node title_node = parser.parse(title);
                Node body_node = parser.parse(body);
                HtmlRenderer renderer = HtmlRenderer.builder().build();
                request.setAttribute("title_render", renderer.render(title_node));
                request.setAttribute("body_render", renderer.render(body_node));
                request.getRequestDispatcher("/preview.jsp").forward(request, response);
                break;
            default:
                System.out.println("hello from doGEt default");
                request.getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }
    
    /**
     * Handles HTTP POST requests
     * 
     * @see javax.servlet.http.HttpServlet#doPost(HttpServletRequest request,
     *      HttpServletResponse response)
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException 
    {
        System.out.println("hello from doPost");
        String action = request.getParameter("action");
        String username = request.getParameter("username");
        String id_str = request.getParameter("postid");
        int postid = (id_str == null) ? 0 : Integer.parseInt(id_str);
        String title = request.getParameter("title");
        String body = request.getParameter("body");
        System.out.println("hello before check");
        String error = check("POST", action, username, postid, title, body);
        if (!error.equals("good")) {
            action = "error";
            request.setAttribute("error", error);
        }
        System.out.println("hello after check");
        switch (action) {
            case "save":
                System.out.println("hello from doPost save");
                if (postid <= 0){
                    System.out.println("hello from doPost open if");
                    addPost(username, title, body);
                }
                else{
                    System.out.println("hello from doPost open else");
                    updatePost(username, postid, title, body);
                }
            case "delete":
                if (action.equals("delete")) {
                    deletePost(username, postid);
                }
            case "list":
                List<Post> posts = getPosts(username);
                List<String> names = new ArrayList<String>();
                List<Integer> ids = new ArrayList<Integer>();
                List<String> titles = new ArrayList<String>();
                List<String> createds = new ArrayList<String>();
                List<String> modifieds = new ArrayList<String>();
                for (Post post : posts) {
                    names.add(post.username);
                    ids.add(post.postid);
                    titles.add(post.title);
                    createds.add(post.created_formatted);
                    modifieds.add(post.modified_formatted);
                }
                request.setAttribute("count", ids.size());
                request.setAttribute("names", names);
                request.setAttribute("ids", ids);
                request.setAttribute("titles", titles);
                request.setAttribute("createds", createds);
                request.setAttribute("modifieds", modifieds);
                request.getRequestDispatcher("/list.jsp").forward(request, response);
                break;
            case "open":
                if (postid <= 0) {
                    title = "";
                    body = "";
                }

                else if (title == null || body == null) {
                    Post post = getPost(username, postid);
                    if (title == null)
                        title = (post == null) ? "" : post.title;
                    if (body == null)
                        body = (post == null) ? "" : post.body;
                }
                request.setAttribute("title", title);
                request.setAttribute("body", body);
                request.getRequestDispatcher("/edit.jsp").forward(request, response);
                break;
            case "preview":
                Parser parser = Parser.builder().build();
                Node title_node = parser.parse(title);
                Node body_node = parser.parse(body);
                HtmlRenderer renderer = HtmlRenderer.builder().build();
                request.setAttribute("title_render", renderer.render(title_node));
                request.setAttribute("body_render", renderer.render(body_node));
                request.getRequestDispatcher("/preview.jsp").forward(request, response);
                break;
            default:
                request.getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }

    private String check(String method, String action, String username, int postid, String title, String body) {
        StringBuilder sb = new StringBuilder();
        if (action == null)
            sb.append("Action cannot be issued via ").append(method).append(" method");
        else if (username == null || username.length() == 0)
            sb.append("Invalid action parameter");
        else if (action.equals("open") || action.equals("preview") || action.equals("list")) {
            sb.append("good");
        }
        else if (action.equals("save")) {
            if (method.equals("GET"))
                sb.append("Action save cannot be issued via GET method");
            else
                sb.append("good");
        }
        else if (action.equals("delete")) {
            if (method.equals("GET"))
                sb.append("Action delete cannot be issued via GET method");
            else
                sb.append("good");
        }
        else
            sb.append("Action ").append(action).append(" cannot be issued via ").append(method).append(" method");
        return sb.toString();
    }

    private void addPost(String username, String title, String body) {
        // try {
        //     Class.forName("com.mysql.jdbc.Driver");
        // } catch (ClassNotFoundException ex) {
        //     System.out.println(ex);
        //     return;
        // }
    
        Connection c = null;
        PreparedStatement s = null;
        PreparedStatement s2 = null;
        ResultSet rs = null; 

        try {
            /* create an instance of a Connection object */
            c = DriverManager.getConnection("jdbc:mysql://localhost:3306/CS144", "cs144", ""); 

            s = c.prepareStatement(
                "SELECT Max(postid) max_id FROM Posts WHERE username = ?"
            );
            s.setString(1, username);
            rs = s.executeQuery() ;
            rs.next();
            int new_id = rs.getInt("max_id") + 1;

            s2 = c.prepareStatement(
                "INSERT INTO Posts (username, postid, title, body, modified, created) VALUES (?, ?, ?, ?, ?, ?)"
            );
            s2.setString(1, username);
            s2.setInt(2, new_id);
            s2.setString(3, title);
            s2.setString(4, body);
            Date date = new Date();
            Timestamp timestamp = new Timestamp(date.getTime());
            s2.setTimestamp(5, timestamp);
            s2.setTimestamp(6, timestamp);

            s2.executeUpdate();
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
            try { s2.close(); } catch (Exception e) { /* ignored */ }
            try { c.close(); } catch (Exception e) { /* ignored */ }
        }
    }

    private void updatePost(String username, int postid, String title, String body) {

        Connection c = null;
        PreparedStatement s = null;
        ResultSet rs = null; 

        try {
            /* create an instance of a Connection object */
            c = DriverManager.getConnection("jdbc:mysql://localhost:3306/CS144", "cs144", ""); 

            s = c.prepareStatement(
                "UPDATE Posts SET title = ?, body = ?, modified = ? WHERE username = ? AND postid = ?"
            );
            s.setString(1, title);
            s.setString(2, body);
            Date date = new Date();
            s.setTimestamp(3, new Timestamp(date.getTime()));
            s.setString(4, username);
            s.setInt(5, postid);

            s.executeUpdate();
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
    }

    private void deletePost(String username, int postid) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException ex) {
            System.out.println(ex);
            return;
        }
    
        Connection c = null;
        PreparedStatement s = null;
        ResultSet rs = null; 

        try {
            /* create an instance of a Connection object */
            c = DriverManager.getConnection("jdbc:mysql://localhost:3306/CS144", "cs144", ""); 

            s = c.prepareStatement(
                "DELETE FROM Posts WHERE username = ? AND postid = ?"
            );
            s.setString(1, username);
            s.setInt(2, postid);

            s.executeUpdate();
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
    }

    private Post getPost(String username, int postid) {
        Post post = null;
        System.out.println("hello from getPost");

        if (username == null || username.length() == 0){
            System.out.println("hello from retrun");
            return post;
        }
        System.out.println("hello from after retrun");

        Connection c = null;
        Statement  s = null;
        ResultSet rs = null; 

        try {
            System.out.println("hello from getPost");
            System.out.println("username: " + username + "postid: " + postid);



            c = DriverManager.getConnection("jdbc:mysql://localhost:3306/CS144", "cs144", ""); 
            s = c.createStatement() ;
            String query = "SELECT * FROM Posts WHERE username=\"" + username + "\" AND postid=" + postid;

            System.out.println("query :  " + query);
            rs = s.executeQuery(query) ;
            rs.next();
            post = new Post(rs.getString("username"), rs.getInt("postid"), 
                rs.getString("title"), rs.getString("body"), 
                rs.getTimestamp("modified"), rs.getTimestamp("created"));
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
            return post;
        }
    }

    private List<Post> getPosts(String username) {
        List<Post> posts = new ArrayList<Post>();
        if (username == null || username.length() == 0)
            return posts;

        Connection c = null;
        Statement  s = null;
        ResultSet rs = null; 

        try {
            c = DriverManager.getConnection("jdbc:mysql://localhost:3306/CS144", "cs144", ""); 
            s = c.createStatement() ;

            String query = "SELECT * FROM Posts WHERE username=\"" + username + "\""; 
            rs = s.executeQuery(query) ;
            while( rs.next() ){
                 Post post = new Post(rs.getString("username"), rs.getInt("postid"), 
                    rs.getString("title"), rs.getString("body"), 
                    rs.getTimestamp("modified"), rs.getTimestamp("created"));
                 posts.add(post);
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
            return posts;
        }
    }
}

