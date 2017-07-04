package com.sinosteel.metallurgical.journal.web;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.auth.RequiresAuthorization;
import com.sinosteel.framework.core.base.web.BaseController;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.RequestType;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.framework.helpers.file.helper.FileHelper;
import com.sinosteel.metallurgical.journal.service.JournalResourceService;
import com.sinosteel.metallurgical.journal.service.JournalService;

@RestController
public class JournalController extends BaseController
{
	@Autowired
	private JournalService journalService;
	
	@RequestMapping(value = "/queryJournals")
	@RequiresAuthorization(requestType = RequestType.QUERY, serviceClass = JournalService.class)
	public Response queryJournals(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryJournals(request.getParams());
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
	
	@RequestMapping(value = "/queryPersonalJournals")
	@RequiresAuthorization(requestType = RequestType.QUERY, serviceClass = JournalService.class)
	public Response queryPersonalJournals(Request request)
	{
		Response response = new Response();
		
		try
		{
			JSONObject params = request.getParams();
			if(params == null)
			{
				params = new JSONObject();
			}
			
			params.put("personnelId", request.getUser().getId());
			
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryJournals(params);
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

	@RequestMapping(value = "/addJournal")
	@RequiresPermissions(value = "addJournal")
	public Response addJournal(Request request)
	{
		Response response = new Response();
		
		try
		{
			journalService.addJournal(request.getParams(), request.getFiles(), request.getUser());
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
	
	@RequestMapping(value = "/deleteJournal")
	@RequiresPermissions(value = "deleteJournal")
	@RequiresAuthorization(requestType = RequestType.DELETE, serviceClass = JournalService.class)
	public Response deleteJournal(Request request)
	{
		Response response = new Response();
		
		try
		{
			journalService.deleteJournal(request.getParams());
			
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
	
	@RequestMapping(value = "/deleteJournalResource")
	@RequiresAuthorization(requestType = RequestType.DELETE, serviceClass = JournalResourceService.class)
	public Response deleteJournalResource(Request request)
	{
		Response response = new Response();

		try
		{
			FileHelper.deleteFile(request.getParams(), JournalResourceService.class);
			
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

	@RequestMapping(value = "/editJournal")
	@RequiresPermissions(value = "editJournal")
	@RequiresAuthorization(requestType = RequestType.UPDATE, serviceClass = JournalService.class)
	public Response editJournal(Request request)
	{
		Response response = new Response();
		
		try
		{
			journalService.editJournal(request.getParams(), request.getFiles(), request.getUser());
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
	
	@RequestMapping(value = "/queryJournalsTotalAmount")
	public Response queryJournalsTotalAmount()
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryJournalsTotalAmount();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryEvections")
	public Response queryEvections(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryEvections(request.getParams());
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryJournalsIncrement")
	public Response queryJournalsIncrement()
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryJournalsIncrement();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryMostJournalsPersonnel")
	public Response queryMostJournalsPersonnel()
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryMostJournalsPersonnel();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryMostEvectionPersonnels")
	public Response queryMostEvectionPersonnels()
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryMostEvectionPersonnels();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryMostFrequentEvectionPlaces")
	public Response queryMostFrequentEvectionPlaces()
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryMostFrequentEvectionPlaces();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryLeastJournalsPersonnel")
	public Response queryLeastJournalsPersonnel()
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryLeastJournalsPersonnel();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryTotalsByProjects")
	public Response queryTotalsByProjects(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryTotalsByProjects(request.getParams());
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryTotalsByPersonnels")
	public Response queryTotalsByPersonnels(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryTotalsByPersonnels(request.getParams());
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryRatiosByProjects")
	public Response queryRatiosByProjects()
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryRatiosByProjects();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryRatiosByPersonnels")
	public Response queryRatiosByPersonnels()
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryRatiosByPersonnels();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/queryRatiosByMonths")
	public Response queryRatiosByMonths()
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = journalService.queryRatiosByMonths();
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
