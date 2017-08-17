package com.sinosteel.framework.config.database;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("config/datasource.properties")
public class RepositoryConfig
{
	/**
	 * Reserverd for customized usage
	 */
	
	/*
	@Autowired
	private Environment env;
	
	@Autowired
	private DataSource dataSource;
	
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory()
    {
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(dataSource);
        factory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        factory.setPackagesToScan("com.sinosteel");
        factory.setJpaProperties(hibernateProperties());
        factory.afterPropertiesSet();
        return factory;
    }

    @Bean
    public JpaTransactionManager jpaTransactionManager() 
    {
        JpaTransactionManager manager = new JpaTransactionManager();
        manager.setEntityManagerFactory(entityManagerFactory().getObject());
        return manager;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception
    {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource);
        return sessionFactory.getObject();
    }
    
    private Properties hibernateProperties() 
    {
        Properties properties = new Properties();

        properties.put("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
        properties.put("hibernate.format_sql", env.getProperty("hibernate.format_sql")); 
        properties.put("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));
        properties.put("hibernate.connection.characterEncoding", env.getProperty("hibernate.connection.characterEncoding"));
        properties.put("hibernate.connection.CharSet", env.getProperty("hibernate.connection.CharSet"));
        
        return properties;
    }
    
    */
}