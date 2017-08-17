package com.sinosteel.framework.config.spring;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("config/spring.properties")
@ConfigurationProperties(prefix = "spring.datasource")
public class SpringConfig 
{

}
