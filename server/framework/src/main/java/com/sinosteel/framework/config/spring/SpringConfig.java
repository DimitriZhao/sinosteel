package com.sinosteel.framework.config.spring;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(locations = "classpath:config/spring.properties", prefix = "spring.datasource")
public class SpringConfig 
{

}
