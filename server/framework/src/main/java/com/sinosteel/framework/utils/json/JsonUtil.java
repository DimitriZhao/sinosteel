package com.sinosteel.framework.utils.json;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class JsonUtil 
{
	public static <T> JSONArray toJSONArray(List<T> objects)
	{
		JSONArray objectJsonArray = new JSONArray();
		
		for(T object : objects)
		{
			JSONObject objectJson = JSONObject.parseObject(JSONObject.toJSONString(object));
			
			objectJsonArray.add(objectJson);
		}
		
		return objectJsonArray;
	}
	
	public static <T> List<T> toObjects(JSONArray jsonArray, Class<T> clazz)
	{
		List<T> list = new ArrayList<T>();
		
		for(int i = 0; i < jsonArray.size(); i++)
		{
			JSONObject json = jsonArray.getJSONObject(i);
			T object = JSONObject.toJavaObject(json, clazz);
			
			list.add(object);
		}
		
		return list;
	}
	
	public static List<String> toStringList(JSONArray objects)
	{
		List<String> contents = new ArrayList<String>();
		
		for(int i = 0; i < objects.size(); i++)
		{
			String content = objects.get(i).toString();
			contents.add(content);
		}
		
		return contents;
	}
	
	public static JSONArray toStringJsonArray(List<String> contents)
	{
		JSONArray contentsJsonArray = new JSONArray();
		
		for(String content : contents)
		{
			contentsJsonArray.add(content);
		}
		
		return contentsJsonArray;
	}
	
	public static String ConvertStreamToJsonString(InputStream inputStream)
    {
        String jsonString = "";
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        
        byte[] buffer = null;
        try
        {
        	int i;
        	while((i = inputStream.read()) != -1)
        	{
        		outputStream.write(i);
        	}
        	
        	buffer = outputStream.toByteArray();
            jsonString = new String(buffer);
            
            outputStream.close();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        
        inputStream = new ByteArrayInputStream(buffer);
        return jsonString;
    }
}
