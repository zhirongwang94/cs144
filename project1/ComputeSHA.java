import java.security.MessageDigest;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;

// Java program to calculate SHA hash value

class ComputeSHA {
   public static byte[] getSHA(String input) throws NoSuchAlgorithmException
   {
      MessageDigest md = MessageDigest.getInstance("SHA-256");
      return md.digest(input.getBytes(StandardCharsets.UTF_8));
   }
   


   public static String toHexString(byte[] hash)
   {
      // Convert byte array into signum representation
      BigInteger number = new BigInteger(1, hash);

      // Convert message digest into hex value
      StringBuilder hexString = new StringBuilder(number.toString(16));

      // Pad with leading zeros
      while (hexString.length() < 32)
      {
         hexString.insert(0, '0');
      }

      return hexString.toString();
   }



   public static void main(String args[])
   {
      if (args.length !=  1 ){
         System.out.println("Usage: java ComputeSHA filename.txt\n");
         return; 
      }

      Path fileName = Path.of(args[0]);

      String fileContent ="";
      try {
         fileContent = Files.readString(fileName);
      }
      catch(IOException e) {
         e.printStackTrace();
      }


      try
      {
         System.out.println(toHexString(getSHA(fileContent)));
         // boolean check = toHexString(getSHA(fileContent)) == "addb41d9c1ea67ec0d6cc29dbb2f0248a3f077b7aedf6e5d3405fb462e4b955b";
         // System.out.println(check);
      }
      // For specifying wrong message digest algorithms
      catch (NoSuchAlgorithmException e) {
         System.out.println("Exception thrown for incorrect algorithm: " + e);
      }

   }
}



