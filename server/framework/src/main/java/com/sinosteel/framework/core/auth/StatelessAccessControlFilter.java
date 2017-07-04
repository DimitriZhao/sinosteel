package com.sinosteel.framework.core.auth;

import java.io.IOException;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.web.filter.AccessControlFilter;

public class StatelessAccessControlFilter extends AccessControlFilter
{

	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue)
           throws Exception 
	{
		return false;
    }
 
    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception 
    {
    	String clientDigest = request.getParameter("clientDigest");
    	String username = request.getParameter("username");

    	StatelessAuthenticationToken token = new StatelessAuthenticationToken(username, clientDigest);
    	
    	try 
    	{
    		getSubject(request, response).login(token);
    		return true;
    	} 
    	catch (Exception e) 
    	{
    		e.printStackTrace();
    		onLoginFail(response);
           
    		return false;
    	}
    }
   
    private void onLoginFail(ServletResponse response) throws IOException 
    {
    	HttpServletResponse httpResponse = (HttpServletResponse) response;
    	httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    	httpResponse.getWriter().write("login error");
    }
}
