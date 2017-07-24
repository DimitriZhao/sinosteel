package com.sinosteel.framework.config.web;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import com.sinosteel.framework.core.web.RequestArgumentResolver;

@Configuration
public class WebConfig extends WebMvcConfigurerAdapter
{
	@Bean
	public RequestArgumentResolver requestArgumentResolver()
	{
		return new RequestArgumentResolver();
	}
	
	@Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) 
	{
		argumentResolvers.add(requestArgumentResolver());
        super.addArgumentResolvers(argumentResolvers);
    }
	
	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters)
	{ 
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
        
        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
        fastConverter.setFastJsonConfig(fastJsonConfig);
      
        converters.add(fastConverter);
	}
}
