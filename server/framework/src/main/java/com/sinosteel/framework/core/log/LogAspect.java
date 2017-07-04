package com.sinosteel.framework.core.log;

import java.util.List;
import java.util.UUID;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.system.basic.domain.User;
import com.sinosteel.framework.system.log.domain.OperationLog;
import com.sinosteel.framework.system.log.service.OperationLogService;

@Component
@Aspect
public class LogAspect 
{
	@Autowired
	private OperationLogService operationLogService;
	
	@Around("@annotation(com.sinosteel.framework.core.log.RecordsLog)")
	public Object recordOperationLog(ProceedingJoinPoint joinPoint) throws Throwable
	{
		MethodSignature sign = (MethodSignature) joinPoint.getSignature();
		Object[] args = joinPoint.getArgs();

		if(args != null && args.length != 0) //判断参数不为空
		{
			Object arg = args[0];
			
			if(arg instanceof Request) //判断参数必须为Request
			{
				Request request = (Request) arg;
				User requestUser = request.getUser();
				
				if(sign.getReturnType().equals(Response.class)) //判断返回类型必须为Response
				{
					OperationLog operationLog = new OperationLog();
					
					operationLog.setId(UUID.randomUUID().toString());
					operationLog.setUri(request.getUri());
					operationLog.setClient(request.getClient());
					operationLog.setUsername(requestUser.getUsername());
					operationLog.setDateTime(request.getDateTime());
					
					JSONObject paramsJson = request.getParams();
					if(paramsJson != null)
					{
						operationLog.setParams(paramsJson.toJSONString());
					}
					
					List<MultipartFile> files = request.getFiles();
					if(files != null && files.size() != 0)
					{
						JSONArray fileNamesJsonArray = new JSONArray();
						
						for(MultipartFile file : files)
						{
							fileNamesJsonArray.add(file.getName());
						}
						
						operationLog.setFileNames(fileNamesJsonArray.toJSONString());
					}
					
					Response response = (Response) joinPoint.proceed();
					
					String responseStatus = response.status.toString();
					operationLog.setResponseStatus(responseStatus);
					
					operationLogService.saveEntity(operationLog, null);
					return response;
				}
			}
		}
		
		return joinPoint.proceed(args);
	}
}
