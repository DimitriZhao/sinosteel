package com.sinosteel.framework.core.auth;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.cache.RedisService;
import com.sinosteel.framework.core.utils.cache.CacheUtil;
import com.sinosteel.framework.system.basic.domain.User;
import com.sinosteel.framework.system.basic.repository.UserRepository;
import com.sinosteel.framework.utils.encryption.HmacSHA256Util;

public class StatelessAuthorizingRealm extends AuthorizingRealm
{
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RedisService redisService;
	
	@Override
    public boolean supports(AuthenticationToken token) 
	{
		return token instanceof StatelessAuthenticationToken;
    }
   
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException 
    {	
    	StatelessAuthenticationToken statelessToken = (StatelessAuthenticationToken)token;
    	String username = (String)statelessToken.getPrincipal();
    	
    	JSONObject userInfoJson = CacheUtil.getUserInfoJson(username);
    	if(userInfoJson == null)
    	{ 	
    		User user = userRepository.findByUsername(username);  
        	if(user == null)
        	{
                return null;
            }
        	
        	userInfoJson = CacheUtil.saveUserInfoCache(user);
    	}
    	
    	String serverDigest = HmacSHA256Util.digest(getKey(username), userInfoJson.getString("password"));

    	SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(username, serverDigest, getName());
    	return authenticationInfo;
    }
   
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) 
    {
    	String username = (String) principals.getPrimaryPrincipal();
    	SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
    	
    	JSONObject userInfoJson = CacheUtil.getUserInfoJson(username);
    	if(userInfoJson == null)
    	{
    		User user = userRepository.findByUsername(username);  
        	if(user == null)
        	{
                return null;
            }
        	
        	userInfoJson = CacheUtil.saveUserInfoCache(user);
    	}
    	
    	JSONArray rolesJsonArray = userInfoJson.getJSONArray("roles");
    	for(int i = 0; i < rolesJsonArray.size(); i++)
    	{
    		String roleString = rolesJsonArray.getString(i);
    		authorizationInfo.addRole(roleString);
    	}
    	
    	JSONArray functionsJsonArray = userInfoJson.getJSONArray("functions");
    	for(int i = 0; i < functionsJsonArray.size(); i++)
    	{
    		String functionString = functionsJsonArray.getString(i);
    		authorizationInfo.addStringPermission(functionString);
    	}

    	return authorizationInfo;
    }
    
    //Key的生成策略
    private String getKey(String username) 
    {
		return username;
	}
}
