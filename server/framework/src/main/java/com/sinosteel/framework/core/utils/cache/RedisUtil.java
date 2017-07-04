package com.sinosteel.framework.core.utils.cache;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;

public class RedisUtil
{
	@Autowired  
    private static RedisTemplate<String, String> redisTemplate;  
      
    public static boolean set(final String key, final String value) 
    {  
        boolean result = redisTemplate.execute(new RedisCallback<Boolean>() 
        {  
            @Override  
            public Boolean doInRedis(RedisConnection connection) throws DataAccessException 
            {  
                RedisSerializer<String> serializer = redisTemplate.getStringSerializer();  
                connection.set(serializer.serialize(key), serializer.serialize(value));  
                return true;  
            }  
        });  
        
        return result;  
    }  
  
    public static String get(final String key)
    {  
        String result = redisTemplate.execute(new RedisCallback<String>() 
        {  
            @Override  
            public String doInRedis(RedisConnection connection) throws DataAccessException 
            {  
                RedisSerializer<String> serializer = redisTemplate.getStringSerializer();  
                byte[] value =  connection.get(serializer.serialize(key));  
                return serializer.deserialize(value);  
            }  
        });  
        return result;  
    }  
  
    public static boolean expire(final String key, long expire) 
    {  
        return redisTemplate.expire(key, expire, TimeUnit.SECONDS);  
    }  
  
    /*
    public long lpush(final String key, Object obj) {  
        final String value = JSONUtil.toJson(obj);  
        long result = redisTemplate.execute(new RedisCallback<Long>() {  
            @Override  
            public Long doInRedis(RedisConnection connection) throws DataAccessException {  
                RedisSerializer<String> serializer = redisTemplate.getStringSerializer();  
                long count = connection.lPush(serializer.serialize(key), serializer.serialize(value));  
                return count;  
            }  
        });  
        return result;  
    }  
   
    public long rpush(final String key, Object obj) {  
        final String value = JSONUtil.toJson(obj);  
        long result = redisTemplate.execute(new RedisCallback<Long>() {  
            @Override  
            public Long doInRedis(RedisConnection connection) throws DataAccessException {  
                RedisSerializer<String> serializer = redisTemplate.getStringSerializer();  
                long count = connection.rPush(serializer.serialize(key), serializer.serialize(value));  
                return count;  
            }  
        });  
        return result;  
    }  
  
    public String lpop(final String key) {  
        String result = redisTemplate.execute(new RedisCallback<String>() {  
            @Override  
            public String doInRedis(RedisConnection connection) throws DataAccessException {  
                RedisSerializer<String> serializer = redisTemplate.getStringSerializer();  
                byte[] res =  connection.lPop(serializer.serialize(key));  
                return serializer.deserialize(res);  
            }  
        });  
        return result;  
    }  
    */
}
