package com.sinosteel.framework.core.web;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.system.basic.domain.User;
import com.sinosteel.framework.system.basic.service.UserService;
import com.sinosteel.framework.utils.date.DateUtil;
import com.sinosteel.framework.utils.string.StringUtil;

public class RequestArgumentResolver implements HandlerMethodArgumentResolver 
{
	@Autowired
	private UserService userService;
	
    @Override
    public boolean supportsParameter(MethodParameter methodParameter) 
    {
        return methodParameter.getParameterType().equals(Request.class);
    }
 
    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception 
    {
    	Request request = new Request();
    	
    	String username = webRequest.getParameter("username");
    	User user = userService.getUserByUsername(username);
    	request.setUser(user);
    	
    	String[] descriptions = webRequest.getDescription(true).split(";");
    	String uri = descriptions[0].split("=")[1];
    	String client = descriptions[1].split("=")[1];
    	request.setUri(uri);
    	request.setClient(client);
    	
    	String dateTime = DateUtil.formatTime(new Date());
    	request.setDateTime(dateTime);
    	
        String paramsString = webRequest.getParameter("params");
        JSONObject params = JSONObject.parseObject(paramsString);
        
        request.setParams(params);
        
        String totalFilesInfo = webRequest.getParameter("totalFiles");
        if(!StringUtil.isEmpty(totalFilesInfo) && !"undefined".equals(totalFilesInfo))
        {
        	MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) webRequest.getNativeRequest();
        	List<MultipartFile> files = new ArrayList<MultipartFile>();
        	
    		int totalFiles = Integer.parseInt(totalFilesInfo);
    		for(int i = 0; i < totalFiles; i++)
    		{
    			MultipartFile file = multipartHttpServletRequest.getFile("file" + i);
    			
    			files.add(file);
    		}
    		
    		request.setFiles(files);
        }

        return request;
    }
}