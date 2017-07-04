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
import com.sinosteel.framework.system.basic.service.OrganizationService;

@RestController
public class OrganizationController extends BaseController
{
	@Autowired
	private OrganizationService organizationService;
	
	@RequestMapping(value = "/getAllOrganizationHierarchies")
	public Response getAllOrganizationHierarchies(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = organizationService.getAllOrganizationHierarchies();
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
	
	@RequestMapping(value = "/queryOrganizations")
	@RequiresAuthorization(
			requestType = RequestType.QUERY, 
			serviceClass = OrganizationService.class, 
			editScope = AuthorizationScope.ALL,
			deleteScope = AuthorizationScope.ALL)
	public Response queryOrganizations(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = organizationService.queryOrganizations(request.getParams());
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
	
	@RequestMapping(value = "/addOrganization")
	public Response addOrganization(Request request)
	{
		Response response = new Response();
		
		try
		{
			organizationService.addOrganization(request.getParams(), request.getUser());
			
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
	
	@RequestMapping(value = "/editOrganization")
	public Response editOrganization(Request request)
	{
		Response response = new Response();
		
		try
		{
			organizationService.editOrganization(request.getParams(), request.getUser());
			
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
	
	@RequestMapping(value = "/deleteOrganization")
	public Response deleteOrganization(Request request)
	{
		Response response = new Response();
		
		try
		{
			organizationService.deleteOrganization(request.getParams());
			
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
