package com.sinosteel;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.sinosteel.framework.core.base.repository.BaseRepositoryFactoryBean;

@SpringBootApplication
@EnableJpaRepositories(repositoryFactoryBeanClass = BaseRepositoryFactoryBean.class)
@EnableCaching
@EnableAsync
@EnableScheduling
@EnableAspectJAutoProxy
public class ExampleApplication
{
	public static void main(String[] args)
	{	
		new SpringApplicationBuilder(ExampleApplication.class).web(true).run(args);
	}
}
