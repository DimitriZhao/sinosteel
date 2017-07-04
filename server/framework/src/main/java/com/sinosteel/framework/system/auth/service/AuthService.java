package com.sinosteel.framework.system.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sinosteel.framework.system.auth.mapper.DeleteAuthorizationMapper;
import com.sinosteel.framework.system.auth.mapper.EditAuthorizationMapper;
import com.sinosteel.framework.system.auth.mapper.QueryAuthorizationMapper;
import com.sinosteel.framework.system.auth.mapper.RoleMapper;

@Service
public class AuthService
{
	@Autowired
	private QueryAuthorizationMapper queryAuthorizationMapper;
	
	@Autowired
	private DeleteAuthorizationMapper deleteAuthorizationMapper;
	
	@Autowired
	private EditAuthorizationMapper editAuthorizationMapper;
	
	@Autowired
	private RoleMapper roleMapper;
	
	public List<String> getOrganizationIdsByUserId(String userId)
	{
		return roleMapper.getOrganizationIdsByUserId(userId);
	}
	
	public List<String> getQueryAuthorizedOrganizationIds(String userId)
	{		
		return queryAuthorizationMapper.getAuthorizedOrganizationIds(userId);
	}
	
	public List<String> getEditAuthorizedOrganizationIds(String userId)
	{
		return editAuthorizationMapper.getAuthorizedOrganizationIds(userId);
	}
	
	public List<String> getDeleteAuthorizedOrganizationIds(String userId)
	{
		return deleteAuthorizationMapper.getAuthorizedOrganizationIds(userId);
	}
}
