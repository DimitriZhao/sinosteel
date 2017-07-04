package com.sinosteel.framework.core.auth;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.sinosteel.framework.core.base.domain.BaseEntity;
import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.core.web.RequestType;

@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiresAuthorization
{
	RequestType requestType();
	
	AuthorizationScope queryScope() default AuthorizationScope.ORGANIZATION;
	
	AuthorizationScope editScope() default AuthorizationScope.USER;
	
	AuthorizationScope deleteScope() default AuthorizationScope.USER;
	
	Class<? extends BaseService<? extends BaseEntity>> serviceClass();
}
