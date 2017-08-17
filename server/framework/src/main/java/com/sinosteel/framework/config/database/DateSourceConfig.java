package com.sinosteel.framework.config.database;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("config/datasource.properties")
@ConfigurationProperties(prefix = "spring.datasource")
public class DateSourceConfig
{
	/**
	 * Reserverd for customized usage
	 */
	
	/*
    private String driverClassName;

    private String url;

    private String username;

    private String password;

    @Bean
    public DataSource dataSource() 
    {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
    */
}