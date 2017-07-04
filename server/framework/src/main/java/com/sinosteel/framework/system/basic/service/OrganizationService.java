package com.sinosteel.framework.system.basic.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.core.utils.cache.CacheUtil;
import com.sinosteel.framework.helpers.hierarchy.helper.HierarchyHelper;
import com.sinosteel.framework.helpers.pagination.PageResult;
import com.sinosteel.framework.helpers.pagination.Pager;
import com.sinosteel.framework.system.auth.mapper.DeleteAuthorizationMapper;
import com.sinosteel.framework.system.auth.mapper.EditAuthorizationMapper;
import com.sinosteel.framework.system.auth.mapper.QueryAuthorizationMapper;
import com.sinosteel.framework.system.basic.domain.Organization;
import com.sinosteel.framework.system.basic.domain.User;
import com.sinosteel.framework.system.basic.mapper.OrganizationUserMapper;
import com.sinosteel.framework.system.basic.repository.OrganizationRepository;
import com.sinosteel.framework.system.basic.repository.UserRepository;
import com.sinosteel.framework.utils.json.JsonUtil;
import com.sinosteel.framework.utils.string.StringUtil;

@Service
public class OrganizationService extends BaseService<Organization>
{
	@Autowired
	private OrganizationRepository organizationRepository;
	
	@Autowired
	private OrganizationUserMapper organizationUserMapper;
	
	@Autowired
	private QueryAuthorizationMapper queryAuthorizationMapper;
	
	@Autowired
	private EditAuthorizationMapper editAuthorizationMapper;
	
	@Autowired
	private DeleteAuthorizationMapper deleteAuthorizationMapper;
	
	@Autowired
	private UserRepository userReposiotory;
	
	@Autowired
	private UserRepository userRepository;
	
	public JSONArray getAllOrganizationHierarchies()
	{
		List<Organization> allOrganizationHierarchies = HierarchyHelper.getAllHierarchies(organizationRepository);
		
		return JsonUtil.toJSONArray(allOrganizationHierarchies);
	}
	
	public JSONObject queryOrganizations(JSONObject params)
	{
		StringBuilder hqlBuilder = new StringBuilder("FROM Organization org WHERE 1 = 1 ");
		HashMap<String, Object> paramsMap = new HashMap<String, Object>();
		
		if(params != null)
		{
			String parentId = params.getString("parentId");
			if(!StringUtil.isEmpty(parentId))
			{
				hqlBuilder.append("AND org.parentId = :parentId ");
				paramsMap.put("parentId", parentId);
			}
			else
			{
				hqlBuilder.append("AND org.id = 'empty result list' "); //在没有部门ID的情况下，不返回任何结果; 因druid的原因，不能写1 = -1，会被认为是sql注入，未来会进一步配置
			}
		}
		else
		{
			hqlBuilder.append("AND org.id = 'empty result list' "); //在没有部门ID的情况下，不返回任何结果; 因druid的原因，不能写1 = -1，会被认为是sql注入，未来会进一步配置
		}
		
		Pager pager = JSONObject.toJavaObject(params.getJSONObject("pagination"), Pager.class);
		PageResult<Organization> queryResult = organizationRepository.executeHql(hqlBuilder.toString(), paramsMap, pager);
		
		List<Organization> organizations = queryResult.data;
		JSONArray organizationsJsonArray = JsonUtil.toJSONArray(organizations);
		for(int i = 0; i < organizationsJsonArray.size(); i++)
		{
			JSONObject organizationJson = organizationsJsonArray.getJSONObject(i);
			
			String organizationId = organizationJson.getString("id");
			String principalId = organizationUserMapper.findPrincipalId(organizationId);

			if(!StringUtil.isEmpty(principalId))
			{
				User principal = userRepository.findOne(principalId);
				
				organizationJson.put("principalId", principalId);
				organizationJson.put("principalName", principal.getName());
			}
		}
		
		JSONObject resultJson = new JSONObject();
		
		resultJson.put("total", queryResult.total);
		resultJson.put("data", organizationsJsonArray);
		
		return resultJson;
	}
	
	public void addOrganization(JSONObject params, User user)
	{
		Organization organization = JSONObject.toJavaObject(params, Organization.class);
		
		String parentId = params.getString("parentId");
		if(!StringUtil.isEmpty(parentId)) //实际上，这种情况不可能出现
		{
			Organization parent = organizationRepository.findOne(parentId);
			organization.setParent(parent);
		}
		
		this.saveEntity(organization, user);
		
		String principalId = params.getString("principalId");
		if(!StringUtil.isEmpty(principalId))
		{
			User principal = userRepository.findOne(principalId);
			
			if(principal != null)
			{
				organizationUserMapper.insertOrganizationUser(organization.getId(), principalId, "1");
			}
		}
	}
	
	public void editOrganization(JSONObject params, User user)
	{
		Organization organization = this.updateEntity(params, Organization.class, user);
		
		String principalId = params.getString("principalId");
		if(!StringUtil.isEmpty(principalId))
		{
			User principal = userRepository.findOne(principalId);
			
			if(principal != null)
			{
				organizationUserMapper.updatePrincipal(organization.getId(), principalId);
			}
		}
		
		CacheUtil.evictAllUserInfoCaches();
	}
	
	public void deleteOrganization(JSONObject params)
	{
		String organizationId = params.getString("id");
		organizationRepository.delete(organizationId);
		
		organizationUserMapper.deleteOrganizationUserByOrganizationId(organizationId);
		
		queryAuthorizationMapper.deleteAuthorizationByOrganizationId(organizationId);
		editAuthorizationMapper.deleteAuthorizationByOrganizationId(organizationId);
		deleteAuthorizationMapper.deleteAuthorizationByOrganizationId(organizationId);
		
		CacheUtil.evictAllUserInfoCaches();
	}
}
