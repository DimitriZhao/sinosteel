package com.sinosteel.framework.system.auth.web;

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
import com.sinosteel.framework.system.auth.service.RoleService;

@RestController
public class RoleController extends BaseController
{
	@Autowired
	private RoleService roleService;
	
	@RequestMapping(value = "/getAllRoles")
	@RequiresAuthorization(
			requestType = RequestType.QUERY, 
			serviceClass = RoleService.class, 
			editScope = AuthorizationScope.ALL,
			deleteScope = AuthorizationScope.ALL)
	public Response getAllRoles(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = roleService.getAllRoles();
			response.message = "";
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;	
	}
	
	@RequestMapping(value = "/addRole")
	public Response addRole(Request request)
	{
		Response response = new Response();
		
		try
		{
			roleService.addRole(request.getParams(), request.getUser());
			
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
	
	@RequestMapping(value = "/editRole")
	public Response editRole(Request request)
	{
		Response response = new Response();
		
		try
		{
			roleService.editRole(request.getParams(), request.getUser());
			
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
	
	@RequestMapping(value = "/deleteRole")
	public Response deleteRole(Request request)
	{
		Response response = new Response();
		
		try
		{
			roleService.deleteRole(request.getParams());
			
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
