package com.sinosteel.framework.system.basic.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sinosteel.framework.core.base.web.BaseController;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.framework.system.basic.service.FunctionService;

@RestController
public class FunctionController extends BaseController
{
	@Autowired
	private FunctionService functionService;
	
	@RequestMapping(value = "/getAllFunctionsHierarchies")
	public Response getAllFunctionsHierarchies(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			response.data = functionService.getAllFunctionsHierarchies();
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
}
