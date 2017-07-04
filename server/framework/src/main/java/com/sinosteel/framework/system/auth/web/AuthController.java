package com.sinosteel.framework.system.auth.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.cache.RedisService;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.framework.system.basic.domain.User;
import com.sinosteel.framework.system.basic.service.FunctionService;
import com.sinosteel.framework.system.basic.service.UserService;
import com.sinosteel.framework.utils.encryption.HmacSHA256Util;
import com.sinosteel.framework.utils.encryption.MD5Util;

@RestController
public class AuthController 
{
	@Autowired
	private RedisService redisService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private FunctionService functionService;
	
	/**作为无状态WEB应用，仅需要登录时授予一个密码摘要，并且无需登出操作*/
	@RequestMapping(value = "/login")
	public Response login(Request request)
	{
		Response response = new Response();
		
		try
		{
			User user = userService.getLoginUser(request.getParams());
			JSONObject userJson = JSONObject.parseObject(JSONObject.toJSONString(user));
			userJson.put("modules", functionService.getFunctionsHierarchies(user.getFunctions()));
			
			String digest = HmacSHA256Util.digest(user.getUsername(), user.getPassword());
			userJson.put("clientDigest", digest);
			
			response.status = ResponseType.SUCCESS;
			response.data = userJson;
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
	
	@RequestMapping(value = "/resetPassword")
	public Response resetPassword(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			
			String password = request.getParams().getString("password");
			String encrptedPassword = MD5Util.encrypt(password);
			
			User user = request.getUser();
			if(encrptedPassword.equals(user.getPassword()))
			{
				String newPassword = request.getParams().getString("newPassword");
				String encrptedNewPassword = MD5Util.encrypt(newPassword);
				
				user.setPassword(encrptedNewPassword);
				userService.updateEntity(user, user);
			}
			else
			{
				throw new Exception("INCORRECT PASSWORD");
			}
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
