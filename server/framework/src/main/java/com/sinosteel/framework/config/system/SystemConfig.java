package com.sinosteel.framework.config.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Configuration
@PropertySource("config/system.properties")
@Component
public class SystemConfig
{
	@Autowired
	private Environment env;
	
	public String getProperty(String propertyName)
	{
		return env.getProperty(propertyName);
	}
}
