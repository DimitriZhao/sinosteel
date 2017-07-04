package com.sinosteel.metallurgical.project.web;

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
import com.sinosteel.metallurgical.project.domain.Project;
import com.sinosteel.metallurgical.project.service.ProjectService;

@RestController
public class ProjectController extends BaseController
{
	@Autowired
	private ProjectService projectService;
	
	@RequestMapping(value = "/queryProjects")
	@RequiresAuthorization(requestType = RequestType.QUERY, serviceClass = ProjectService.class)
	public Response queryProjects(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = projectService.queryProjects(request.getParams());
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
	
	@RequestMapping(value = "/queryAllProjects")
	@RequiresAuthorization(requestType = RequestType.QUERY, serviceClass = ProjectService.class)
	public Response queryAllProjects(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = projectService.queryAllProjects();
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
	
	@RequestMapping(value = "/addProject")
	@RequiresPermissions(value = "addProject")
	public Response addProject(Request request)
	{
		Response response = new Response();
		
		try
		{
			projectService.saveEntity(request.getParams(), Project.class, request.getUser());
			
			response.status = ResponseType.SUCCESS;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = "SERVER_ERROR";
		}
		
		return response;
	}
	
	@RequestMapping(value = "/editProject")
	@RequiresPermissions(value = "editProject")
	@RequiresAuthorization(requestType = RequestType.UPDATE, serviceClass = ProjectService.class)
	public Response editProject(Request request)
	{
		Response response = new Response();
		
		try
		{
			projectService.updateEntity(request.getParams(), Project.class, request.getUser());
			
			response.status = ResponseType.SUCCESS;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = "SERVER_ERROR";
		}
		
		return response;
	}
	
	@RequestMapping(value = "/deleteProject")
	@RequiresPermissions(value = "deleteProject")
	@RequiresAuthorization(requestType = RequestType.DELETE, serviceClass = ProjectService.class)
	public Response deleteProject(Request request)
	{
		Response response = new Response();
		
		try
		{
			projectService.deleteEntity(request.getParams().getString("id"));
			
			response.status = ResponseType.SUCCESS;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = "SERVER_ERROR";
		}
		
		return response;
	}
}
