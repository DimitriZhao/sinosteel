package com.sinosteel.metallurgical.knowledge.web;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sinosteel.framework.core.auth.AuthorizationScope;
import com.sinosteel.framework.core.auth.RequiresAuthorization;
import com.sinosteel.framework.core.base.web.BaseController;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.RequestType;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.framework.helpers.file.helper.FileHelper;
import com.sinosteel.framework.system.basic.service.UserService;
import com.sinosteel.metallurgical.knowledge.service.StandardResourceService;
import com.sinosteel.metallurgical.knowledge.service.StandardService;

@RestController
public class StandardController extends BaseController
{
	@Autowired
	private StandardService standardService;
	
	@RequestMapping(value = "/queryStandards")
	@RequiresAuthorization(
			requestType = RequestType.QUERY, 
			serviceClass = UserService.class, 
			queryScope = AuthorizationScope.ALL,
			editScope = AuthorizationScope.ORGANIZATION,
			deleteScope = AuthorizationScope.ORGANIZATION)
	public Response queryStandards(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = standardService.queryStandards(request.getParams());
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/addStandard")
	@RequiresPermissions(value = "addStandard")
	public Response addStandard(Request request)
	{
		Response response = new Response();
		
		try
		{
			standardService.addStandard(request.getParams(), request.getFiles(), request.getUser());
			
			response.status = ResponseType.SUCCESS;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/deleteStandard")
	@RequiresPermissions(value = "deleteStandard")
	public Response deleteStandard(Request request)
	{
		Response response = new Response();
		
		try
		{
			standardService.deleteStandard(request.getParams());
			
			response.status = ResponseType.SUCCESS;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/deleteStandardResource")
	public Response deleteStandardResource(Request request)
	{
		Response response = new Response();
		
		try
		{
			FileHelper.deleteFile(request.getParams(), StandardResourceService.class);
			
			response.status = ResponseType.SUCCESS;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/editStandard")
	@RequiresPermissions(value = "editStandard")
	public Response editStandard(Request request)
	{
		Response response = new Response();
		
		try
		{
			standardService.editStandard(request.getParams(), request.getFiles(), request.getUser());
			
			response.status = ResponseType.SUCCESS;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
}
