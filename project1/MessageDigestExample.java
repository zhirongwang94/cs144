import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import java.security.MessageDigest;

public class MessageDigestExample {
   public static void main(String args[]) throws Exception{

      if (args.length !=  1 ){
         System.out.println("Usage: java ComputeSHA filename.txt\n");
         return; 
      }

      Path fileName = Path.of(args[0]);
      String fileContent = Files.readString(fileName);
      // System.out.println(fileContent);
   

      //Creating the MessageDigest object  
      MessageDigest md = MessageDigest.getInstance("SHA-256");

      //Passing data to the created MessageDigest Object
      md.update(fileContent.getBytes());
      
      //Compute the message digest
      byte[] digest = md.digest();      
      // System.out.println(digest);  
     
      //Converting the byte array in to HexString format
      StringBuffer hexString = new StringBuffer();
      
      for (int i = 0;i<digest.length;i++) {
         hexString.append(Integer.toHexString(0xFF & digest[i]));
      }
      System.out.println(hexString.toString());  

   }
}



// reference: https://www.tutorialspoint.com/java_cryptography/java_cryptography_message_digest.htm