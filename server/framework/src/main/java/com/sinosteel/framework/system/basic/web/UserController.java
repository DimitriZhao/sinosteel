package com.sinosteel.framework.system.basic.web;

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
import com.sinosteel.framework.system.basic.service.UserService;

@RestController
public class UserController extends BaseController
{
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "queryAllUsers")
	public Response queryAllUsers(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = userService.queryAllUsers();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryUsers")
	@RequiresAuthorization(
			requestType = RequestType.QUERY, 
			serviceClass = UserService.class, 
			editScope = AuthorizationScope.ALL,
			deleteScope = AuthorizationScope.ALL)
	public Response queryUsers(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = userService.queryUsers(request.getParams());
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/addUser")
	public Response addUser(Request request)
	{
		Response response = new Response();
		
		try
		{
			userService.addUser(request.getParams(), request.getUser());
			
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
	
	@RequestMapping(value = "/editUser")
	public Response editUser(Request request)
	{
		Response response = new Response();
		
		try
		{
			userService.editUser(request.getParams(), request.getUser());
			
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
	
	@RequestMapping(value = "/deleteUser")
	public Response deleteUser(Request request)
	{
		Response response = new Response();
		
		try
		{
			userService.deleteUser(request.getParams());
			
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
