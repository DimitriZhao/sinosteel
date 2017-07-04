package com.sinosteel.metallurgical.project.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sinosteel.framework.core.auth.RequiresAuthorization;
import com.sinosteel.framework.core.base.web.BaseController;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.RequestType;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.metallurgical.project.service.TopicService;

@RestController
public class TopicController extends BaseController
{
	@Autowired
	private TopicService topicService;
	
	@RequestMapping(value = "/queryAllTopics")
	@RequiresAuthorization(requestType = RequestType.QUERY, serviceClass = TopicService.class)
	public Response queryAllTopics(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = topicService.queryAllTopics();
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
	
	@RequestMapping(value = "/queryTopics")
	@RequiresAuthorization(requestType = RequestType.QUERY, serviceClass = TopicService.class)
	public Response queryTopics(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = topicService.queryTopics(request.getParams());
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
	
	@RequestMapping(value = "/addTopic")
	public Response addTopic(Request request)
	{
		Response response = new Response();
		
		try
		{
			topicService.addTopic(request.getParams(), request.getUser());
			
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
	
	@RequestMapping(value = "/deleteTopic")
	@RequiresAuthorization(requestType = RequestType.DELETE, serviceClass = TopicService.class)
	public Response deleteTopic(Request request)
	{
		Response response = new Response();
		
		try
		{
			topicService.deleteEntity(request.getParams().getString("id"));
			
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
	
	@RequestMapping(value = "/editTopic")
	@RequiresAuthorization(requestType = RequestType.UPDATE, serviceClass = TopicService.class)
	public Response editTopic(Request request)
	{
		Response response = new Response();
		
		try
		{
			topicService.editTopic(request.getParams(), request.getUser());
			
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
