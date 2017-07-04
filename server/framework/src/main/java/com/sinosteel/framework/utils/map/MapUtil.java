package com.sinosteel.framework.utils.map;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

public class MapUtil 
{
	/**
	 * 要求key和value全部没有重复 
	 */
	public Map<String, String> reverseMap(Map<String, String> map)
	{
		Map<String, String> reversedMap = new HashMap<String, String>();
		
		Iterator<Entry<String, String>> iter = map.entrySet().iterator();
		while(iter.hasNext())
		{
			Entry<String, String> entry = iter.next();
			
			reversedMap.put(entry.getValue(), entry.getKey());
		}
		
		return reversedMap;
	}
}
