package com.sinosteel.framework.utils.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

/*java.io.File*/
public class FileUtil 
{
	public static void transferFile(String filePath, String fileName, String destination) throws Exception
	{
		FileInputStream fIn = null;
		FileOutputStream fOut = null;
		
		try
		{
			File file = new File(filePath + "/" + fileName);
			fIn = new FileInputStream(file);
			
			File dir = new File(destination);
			if(!dir.exists())
			{
				dir.mkdirs();
			}
			
			File target = new File(destination, fileName);
			if(!target.exists())
			{
				target.createNewFile();
			}
			
			fOut = new FileOutputStream(destination + "/" + fileName);
			
			int size = (int)file.length();
			byte[] buffer = new byte[size];
			
			int byteRead = 0;
			while((byteRead = fIn.read(buffer)) != -1)
			{
				fOut.write(buffer, 0, byteRead); 
			}
			
			fIn.close();
			fOut.close();
			
			file.delete();
		}
		catch(FileNotFoundException ex)
		{
			throw ex;
		}
		catch(Exception e)
		{
			throw e;
		}
		finally
		{
			if(fIn != null)
			{
				fIn.close();
			}
			
			if(fOut != null)
			{
				fOut.close();
			}
		}
	}
	
	public static void deleteFile(String filePath, String fileName) throws Exception
	{
		File file = new File(filePath + "/" + fileName);
		file.delete();
	}
	
	public static void deleteFolder(String folderPath) throws Exception
	{
		File file = new File(folderPath);
		file.delete();
	}
}
