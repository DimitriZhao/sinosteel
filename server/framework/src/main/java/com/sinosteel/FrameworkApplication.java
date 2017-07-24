package com.sinosteel;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.sinosteel.framework.core.base.repository.BaseRepositoryFactoryBean;

@SpringBootApplication
@EnableAutoConfiguration
@EnableCaching
@EnableAsync
@EnableScheduling
@EnableAspectJAutoProxy
@EnableTransactionManagement
@EnableJpaRepositories(repositoryFactoryBeanClass = BaseRepositoryFactoryBean.class)
public class FrameworkApplication
{
	public static void main(String[] args)
	{	
		new SpringApplicationBuilder(FrameworkApplication.class).web(true).run(args);
	}
}
