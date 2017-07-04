package com.sinosteel.metallurgical.personnel.web;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sinosteel.framework.core.auth.RequiresAuthorization;
import com.sinosteel.framework.core.base.web.BaseController;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.RequestType;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.framework.helpers.file.helper.FileHelper;
import com.sinosteel.metallurgical.personnel.service.PersonnelService;
import com.sinosteel.metallurgical.personnel.service.ResumeService;

@RestController
public class PersonnelController extends BaseController
{
	@Autowired
	private PersonnelService personnelService;
	
	@RequestMapping(value = "/queryAllPersonnels")
	public Response queryAllPersonnels(Request request)
	{
		Response response = new Response();
		
		try
		{	
			response.status = ResponseType.SUCCESS;
			response.data = personnelService.queryAllPersonnels();
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
	
	@RequestMapping(value = "/queryPersonnels")
	@RequiresAuthorization(requestType = RequestType.QUERY, serviceClass = PersonnelService.class)
	public Response queryPersonnels(Request request)
	{
		Response response = new Response();
		
		try
		{	
			response.status = ResponseType.SUCCESS;
			response.data = personnelService.queryPersonnels(request.getParams());
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
	
	@RequestMapping(value = "/addPersonnel")
	@RequiresPermissions(value = "addPersonnel")
	public Response addPersonnel(Request request)
	{
		Response response = new Response();
		
		try
		{
			personnelService.addPersonnel(request.getParams(), request.getFiles(), request.getUser());
			
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
	
	@RequestMapping(value = "/deletePersonnel")
	@RequiresPermissions(value = "deletePersonnel")
	@RequiresAuthorization(requestType = RequestType.DELETE, serviceClass = PersonnelService.class)
	public Response deletePersonnel(Request request)
	{
		Response response = new Response();
		
		try
		{
			personnelService.deletePersonnel(request.getParams());
			
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
	
	@RequestMapping(value = "/editPersonnel")
	@RequiresPermissions(value = "editPersonnel")
	@RequiresAuthorization(requestType = RequestType.UPDATE, serviceClass = PersonnelService.class)
	public Response editPersonnel(Request request)
	{
		Response response = new Response();
		
		try
		{
			personnelService.editPersonnel(request.getParams(), request.getFiles(), request.getUser());
			
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
	
	@RequestMapping(value = "/deleteResume")
	@RequiresAuthorization(requestType = RequestType.DELETE, serviceClass = ResumeService.class)
	public Response deleteResume(Request request)
	{
		Response response = new Response();

		try
		{
			FileHelper.deleteFile(request.getParams(), ResumeService.class);
			
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
