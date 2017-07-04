package com.sinosteel.framework.utils.collection;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class CollectionUtil 
{	
	public static <T, U extends List<T>> List<T> mergeList(Class<U> clazz, List<T>... lists)
	{
		try
		{
			U mergedList = clazz.newInstance();
			
			for(List<T> list : lists)
			{
				for(T t : list)
				{
					if(!mergedList.contains(t))
					{
						mergedList.add(t);
					}
				}
			}
			
			return mergedList;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			return null;
		}
	}
	
	public static <K, V, U extends Map<K, V>> Map<K, V> mergedMap(Class<U> clazz, Collection<Map<K, V>> maps)
	{
		try
		{
			U mergedMap = clazz.newInstance();
			
			Iterator<Map<K, V>> mapIter = maps.iterator();
			
			while(mapIter.hasNext())
			{
				Map<K, V> map = mapIter.next();
				Iterator<Entry<K, V>> entryIter = map.entrySet().iterator();
				
				while(entryIter.hasNext())
				{
					Entry<K, V> entry = entryIter.next();
					
					K key = entry.getKey();
					V value = entry.getValue();
					
					if(!mergedMap.containsKey(key))
					{
						mergedMap.put(key, value);
					}
				}
			}
			
			return mergedMap;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			return null;
		}
	}
}
