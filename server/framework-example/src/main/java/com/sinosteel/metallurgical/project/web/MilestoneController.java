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
import com.sinosteel.metallurgical.project.service.MilestoneService;

@RestController
public class MilestoneController extends BaseController
{
	@Autowired
	private MilestoneService milestoneService;
	
	@RequestMapping(value = "/queryMilestones")
	@RequiresAuthorization(requestType = RequestType.QUERY, serviceClass = MilestoneService.class)
	public Response queryMilestones(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = milestoneService.queryMilestones(request.getParams());
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

	@RequestMapping(value = "/addMilestone")
	@RequiresPermissions(value = "addMilestone")
	public Response addMilestone(Request request)
	{
		Response response = new Response();
		
		try
		{
			milestoneService.addMilestone(request.getParams(), request.getUser());
			
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
	
	@RequestMapping(value = "/editMilestone")
	@RequiresPermissions(value = "editMilestone")
	@RequiresAuthorization(requestType = RequestType.UPDATE, serviceClass = MilestoneService.class)
	public Response editMilestone(Request request)
	{
		Response response = new Response();
		
		try
		{
			milestoneService.editMilestone(request.getParams(), request.getUser());
			
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
	
	@RequestMapping(value = "/deleteMilestone")
	@RequiresPermissions(value = "deleteMilestone")
	@RequiresAuthorization(requestType = RequestType.DELETE, serviceClass = MilestoneService.class)
	public Response deleteMilestone(Request request)
	{
		Response response = new Response();
		
		try
		{
			milestoneService.deleteEntity(request.getParams().getString("id"));
			
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
