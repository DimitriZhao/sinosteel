package com.sinosteel.framework.core.auth;

import java.util.Iterator;
import java.util.List;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.base.domain.BaseEntity;
import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.core.cache.RedisService;
import com.sinosteel.framework.core.utils.cache.CacheUtil;
import com.sinosteel.framework.core.utils.spring.SpringUtil;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.RequestType;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.system.auth.service.AuthService;
import com.sinosteel.framework.system.basic.domain.User;
import com.sinosteel.framework.system.basic.service.UserService;
import com.sinosteel.framework.utils.json.JsonUtil;
import com.sinosteel.framework.utils.string.StringUtil;

@Component
@Aspect
public class AuthorizationAspect 
{
	@Autowired
	private RedisService redisService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthService authService;

	@Around("@annotation(com.sinosteel.framework.core.auth.RequiresAuthorization) && @annotation(authorizationAnnotation)")
	public Object filterAuthorizations(ProceedingJoinPoint joinPoint, RequiresAuthorization authorizationAnnotation) throws Throwable
	{	
		//MethodSignature sign = (MethodSignature) joinPoint.getSignature();
		Object[] args = joinPoint.getArgs();
		
		//if(args != null && args.length != 0) //判断参数不为空
		Object arg = args[0];
			
		//if(arg instanceof Request) //判断参数必须为Request
		Request request = (Request) arg;
		User requestUser = request.getUser();
				
		//if(sign.getReturnType().equals(Response.class)) //判断返回类型必须为Response
		RequestType requestType = authorizationAnnotation.requestType();
		Class<? extends BaseService<? extends BaseEntity>> serviceClass = authorizationAnnotation.serviceClass();
		
		AuthorizationScope queryScope = authorizationAnnotation.queryScope();
		AuthorizationScope editScope = authorizationAnnotation.editScope();
		AuthorizationScope deleteScope = authorizationAnnotation.deleteScope();
		
		//进行环绕处理
		//QUERY
		if(requestType == RequestType.QUERY)
		{
			Response response = (Response) joinPoint.proceed(args);
			JSON data = response.data;
			
			if(data instanceof JSONObject) //pageResult
			{
				JSONObject dataJson = (JSONObject) data;
				JSONArray dataJsonArray = dataJson.getJSONArray("data");

				int filteredDataCount = filterData(dataJsonArray, requestUser, queryScope, editScope, deleteScope);
				int total = dataJson.getIntValue("total");
				dataJson.put("total", total - filteredDataCount);
			}
			else if(data instanceof JSONArray) //list
			{
				JSONArray dataJsonArray = (JSONArray) data;
				filterData(dataJsonArray, requestUser, queryScope, editScope, deleteScope);
			}
			
			return response;
		}
		
		//DELETE || EDIT
		else if(requestType == RequestType.DELETE)
		{
			JSONObject dataJson = request.getParams();
			
			if(!hasDeleteAuthorization(dataJson, requestUser, serviceClass, deleteScope))
			{
				throw new Exception("NOT ENOUGH AUTHORIZATIONS");
			}
		}
		
		else if(requestType == RequestType.UPDATE)
		{
			JSONObject dataJson = request.getParams();
			
			if(!hasEditAuthorization(dataJson, requestUser, serviceClass, editScope))
			{
				throw new Exception("NOT ENOUGH AUTHORIZATIONS");
			}
		}
		
		return joinPoint.proceed(args);
	}	
	
	//QUERY
	//用户默认可以查询所在组织所有数据，修改和删除自己的数据
	private int filterData(JSONArray dataJsonArray, User requestUser, AuthorizationScope queryScope, AuthorizationScope editScope, AuthorizationScope deleteScope)
	{
		String requestUserId = requestUser.getId();
		String requestUsername = requestUser.getUsername();
		
		JSONObject requestUserJson = CacheUtil.getUserInfoJson(requestUsername);
		if(requestUserJson == null)
		{
			requestUserJson = CacheUtil.saveUserInfoCache(requestUser);
		}
		
		List<String> requestOrganizationIds = JsonUtil.toStringList(requestUserJson.getJSONArray("organizationIds"));
		List<String> queryAuthorizedOrganizationIds = JsonUtil.toStringList(requestUserJson.getJSONArray("queryAuthorizations"));
		List<String> deleteAuthorizedOrganizationIds = JsonUtil.toStringList(requestUserJson.getJSONArray("deleteAuthorizations"));
		List<String> editAuthorizedOrganizationIds = JsonUtil.toStringList(requestUserJson.getJSONArray("editAuthorizations"));
		
		int filteredDataCount = 0;
		Iterator<Object> iter = dataJsonArray.iterator();
		while(iter.hasNext())
		{
			JSONObject dataJson = (JSONObject) iter.next();
			boolean filtered = false;
			
			String authorizedUserId = dataJson.getString("createdUserId");
			
			if(StringUtil.isEmpty(authorizedUserId))
			{
				continue;
			}

			List<String> authorizedOrganizationIds = userService.getOrganizationIdsByUserId(authorizedUserId);
			
			//控制query权限
			switch(queryScope)
			{
				case ALL:
					break;
					
				case ORGANIZATION:
					if(!hasAuthorization(queryAuthorizedOrganizationIds, authorizedOrganizationIds) && !hasAuthorization(requestOrganizationIds, authorizedOrganizationIds))
					{
						iter.remove();
						filtered = true;
						filteredDataCount++;
					}
					break;
					
				case USER:
					if(!hasAuthorization(queryAuthorizedOrganizationIds, authorizedOrganizationIds) && !requestUserId.equals(authorizedUserId))
					{
						iter.remove();
						filtered = true;
						filteredDataCount++;
					}
					break;
					
				case NONE:
					iter.remove();
					filtered = true;
					filteredDataCount++;
					break;
			}
					
			if(!filtered)
			{
				//控制delete权限
				switch(deleteScope)
				{
					case ALL:
						dataJson.put("canDelete", "true");
						break;
						
					case ORGANIZATION:
						if(hasAuthorization(deleteAuthorizedOrganizationIds, authorizedOrganizationIds) || hasAuthorization(requestOrganizationIds, authorizedOrganizationIds))
						{
							dataJson.put("canDelete", "true");
						}
						break;
						
					case USER:
						if(hasAuthorization(deleteAuthorizedOrganizationIds, authorizedOrganizationIds) || requestUserId.equals(authorizedUserId))
						{
							dataJson.put("canDelete", "true");
						}
						break;
						
					case NONE:
						break;
				}
				
				//控制edit权限
				switch(editScope)
				{
					case ALL:
						dataJson.put("canEdit", "true");
						break;
						
					case ORGANIZATION:
						if(hasAuthorization(editAuthorizedOrganizationIds, authorizedOrganizationIds) || hasAuthorization(requestOrganizationIds, authorizedOrganizationIds))
						{
							dataJson.put("canEdit", "true");
						}
						break;
						
					case USER:
						if(hasAuthorization(editAuthorizedOrganizationIds, authorizedOrganizationIds) || requestUserId.equals(authorizedUserId))
						{
							dataJson.put("canEdit", "true");
						}
						break;
						
					case NONE:
						break;
				}
			}
		}

		return filteredDataCount;
	}
	
	@SuppressWarnings("unchecked")
	private <T extends BaseEntity, U extends BaseService<T>> boolean hasEditAuthorization(JSONObject dataJson, User requestUser, Class<? extends BaseService<? extends BaseEntity>> serviceClass, AuthorizationScope editScope)
	{
		String requestUserId = requestUser.getId();
		String requestUsername = requestUser.getUsername();
		
		JSONObject requestUserJson = CacheUtil.getUserInfoJson(requestUsername);
		if(requestUserJson == null)
		{
			requestUserJson = CacheUtil.saveUserInfoCache(requestUser);
		}
		
		List<String> requestOrganizationIds = JsonUtil.toStringList(requestUserJson.getJSONArray("organizationIds"));
		List<String> editAuthorizedOrganizationIds = JsonUtil.toStringList(requestUserJson.getJSONArray("editAuthorizations"));
	
		U service = (U) SpringUtil.applicationContext.getBean(serviceClass);
		String dataId = dataJson.getString("id");
		T data = service.findEntityById(dataId);
		String authorizedUserId = data.getCreatedUserId();
		
		if(StringUtil.isEmpty(authorizedUserId))
		{
			return true;
		}
		
		if(requestUser.getId().equals(authorizedUserId))
		{
			return true;
		}
		
		List<String> authorizedOrganizationIds = userService.getOrganizationIdsByUserId(authorizedUserId);
		
		//控制edit权限
		switch(editScope)
		{
			case ALL:
				return true;
				
			case ORGANIZATION:
				return (hasAuthorization(editAuthorizedOrganizationIds, authorizedOrganizationIds) || hasAuthorization(requestOrganizationIds, authorizedOrganizationIds));
					
			case USER:
				return (hasAuthorization(editAuthorizedOrganizationIds, authorizedOrganizationIds) || requestUserId.equals(authorizedUserId));

			case NONE:
				return false;
				
			default:
				return true;
		}
	}
	
	@SuppressWarnings("unchecked")
	private <T extends BaseEntity, U extends BaseService<T>> boolean hasDeleteAuthorization(JSONObject dataJson, User requestUser, Class<? extends BaseService<? extends BaseEntity>> serviceClass, AuthorizationScope deleteScope)
	{
		String requestUserId = requestUser.getId();
		String requestUsername = requestUser.getUsername();

		JSONObject requestUserJson = CacheUtil.getUserInfoJson(requestUsername);
		if(requestUserJson == null)
		{
			requestUserJson = CacheUtil.saveUserInfoCache(requestUser);
		}
		
		List<String> requestOrganizationIds = JsonUtil.toStringList(requestUserJson.getJSONArray("organizationIds"));
		List<String> deleteAuthorizedOrganizationIds = JsonUtil.toStringList(requestUserJson.getJSONArray("deleteAuthorizations"));
	
		U service = (U) SpringUtil.applicationContext.getBean(serviceClass);
		String dataId = dataJson.getString("id");
		T data = service.findEntityById(dataId);
		String authorizedUserId = data.getCreatedUserId();
		
		if(StringUtil.isEmpty(authorizedUserId))
		{
			return true;
		}
		
		if(requestUser.getId().equals(authorizedUserId))
		{
			return true;
		}
		
		List<String> authorizedOrganizationIds = userService.getOrganizationIdsByUserId(authorizedUserId);
			
		//控制delete权限
		switch(deleteScope)
		{
			case ALL:
				return true;
				
			case ORGANIZATION:
				return hasAuthorization(deleteAuthorizedOrganizationIds, authorizedOrganizationIds) || hasAuthorization(requestOrganizationIds, authorizedOrganizationIds);
				
			case USER:
				return hasAuthorization(deleteAuthorizedOrganizationIds, authorizedOrganizationIds) || requestUserId.equals(authorizedUserId);
				
			case NONE:
				return false;
				
			default:
				return true;
		}
	}
	
	private boolean hasAuthorization(List<String> requestOrganizationIds, List<String> authorizedOrganizationIds)
	{
		for(String requestOrganizationId : requestOrganizationIds)
		{
			for(String authorizedOrganizationId : authorizedOrganizationIds)
			{
				if(requestOrganizationId.equals(authorizedOrganizationId))
				{
					return true;
				}
			}
		}
		
		return false;
	}
}
