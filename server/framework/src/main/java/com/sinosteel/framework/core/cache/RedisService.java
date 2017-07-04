package com.sinosteel.framework.core.cache;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

@Component
public class RedisService
{
	@Resource
    private JedisPool jedisPool;
	
	public List<String> keys(String pattern)
	{
		Jedis jedis = jedisPool.getResource();
		
		try
		{
			List<String> keys = new ArrayList<String>();
			keys.addAll(jedis.keys(pattern));
			return keys;
		}
		finally
		{
			jedis.close();
		}
	}
	
	public void set(String key, String value)
	{
		Jedis jedis = jedisPool.getResource();
		
		try
		{
			if(value != null)
			{
				jedis.set(key, value);
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			jedis.close();
		}
	}
	
	public void set(String key, JSON value)
	{
		Jedis jedis = jedisPool.getResource();
		
		try
		{
			if(value != null)
			{
				String valueString = value.toJSONString();
				jedis.set(key, valueString);
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			jedis.close();
		}
	}
	
	public String getString(String key)
	{
		Jedis jedis = jedisPool.getResource();
		
		try
		{
			if(!jedis.exists(key))
			{
				return null;
			}
			
			return jedis.get(key);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
		finally
		{
			jedis.close();
		}
	}
	
	public JSON getJson(String key)
	{
		Jedis jedis = jedisPool.getResource();
		
		try
		{
			if(!jedis.exists(key))
			{
				return null;
			}
			
			String valueString = jedis.get(key);
			JSON valueJson = JSON.parseObject(valueString);
			
			return valueJson;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
		finally
		{
			jedis.close();
		}
	}
	
	public void delete(String key)
	{
		Jedis jedis = jedisPool.getResource();
		
		try
		{
			if(jedis.exists(key))
			{
				jedis.del(key);
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			jedis.close();
		}
	}
}
