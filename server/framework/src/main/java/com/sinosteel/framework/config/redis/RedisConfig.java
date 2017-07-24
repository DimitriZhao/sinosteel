package com.sinosteel.framework.config.redis;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

@Configuration
@ConfigurationProperties(locations = "classpath:config/redis.properties", prefix = "spring.redis")
public class RedisConfig extends CachingConfigurerSupport
{  
    private String hostName;

    private int port;

    private int timeout;

    private int maxIdle;

    private long maxWaitMillis;

    private String password;

    @Bean
    public JedisPool jedisPool() 
    {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(maxIdle);
        jedisPoolConfig.setMaxWaitMillis(maxWaitMillis);

        JedisPool jedisPool = new JedisPool(jedisPoolConfig, hostName, port, timeout, password);

        return jedisPool;
    }
    
    @Bean
    public JedisPoolConfig jedisPoolConfig ()
    {  
        JedisPoolConfig config = new JedisPoolConfig();  
        config.setMaxIdle(maxIdle);  
        config.setMaxWaitMillis(maxWaitMillis);  
        return config;  
    }  
}  

