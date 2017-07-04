package com.sinosteel.framework.core.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;

@ControllerAdvice
public class GlobalExceptionHandler
{
	@ExceptionHandler(value = Exception.class)
	@ResponseBody
	public Response defaultExceptionHandler(HttpServletRequest request, Exception e) throws Exception 
	{
		e.printStackTrace();
		
		Response response = new Response();
		
		response.status = ResponseType.FAILURE;
		response.message = e.getMessage();
		
		return response;
    }
}
