package com.sinosteel.framework.utils.blob;

import java.nio.charset.Charset;
import java.sql.Blob;

import javax.sql.rowset.serial.SerialBlob;

public class BlobUtil
{
	public static Blob stringToBlob(String string) throws Exception
	{
		return new SerialBlob(string.getBytes(Charset.forName("utf-8")));
	}
	
	public static String blobToString(Blob blob) throws Exception
	{
		return new String(blob.getBytes((long)1, (int)blob.length()));
	}
}
