package com.sinosteel.framework.core.utils.cache;

public class CacheRule
{
	public static final String _USER_INFO = "_user_info";
	
	public static String userInfo(String username)
	{
		return username + _USER_INFO;
	}
}
