package com.sinosteel.framework.core.web;

import com.alibaba.fastjson.JSON;

public class Response 
{
	public ResponseType status;
	public JSON data;
	public String message;
	
	public Response()
	{
		this.status = null;
		this.data = null;
		this.message = null;
	}
	
	public Response(ResponseType status, JSON data, String message)
	{
		this.status = status;
		this.data = data;
		this.message = message;
	}
}