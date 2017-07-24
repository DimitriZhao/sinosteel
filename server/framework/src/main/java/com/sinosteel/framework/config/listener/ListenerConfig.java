package com.sinosteel.framework.config.listener;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sinosteel.framework.core.listener.ApplicationStartListener;

@Configuration
public class ListenerConfig 
{
	@Bean
	public ApplicationStartListener applicationStartListener()
	{
		return new ApplicationStartListener();
	}
}
