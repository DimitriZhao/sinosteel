package com.sinosteel.framework.system.basic.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.config.system.SystemConfig;
import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.core.utils.cache.CacheUtil;
import com.sinosteel.framework.helpers.hierarchy.helper.HierarchyHelper;
import com.sinosteel.framework.helpers.pagination.PageResult;
import com.sinosteel.framework.helpers.pagination.Pager;
import com.sinosteel.framework.system.auth.domain.Role;
import com.sinosteel.framework.system.auth.repository.RoleRepository;
import com.sinosteel.framework.system.basic.domain.Organization;
import com.sinosteel.framework.system.basic.domain.User;
import com.sinosteel.framework.system.basic.mapper.OrganizationUserMapper;
import com.sinosteel.framework.system.basic.mapper.UserMapper;
import com.sinosteel.framework.system.basic.repository.OrganizationRepository;
import com.sinosteel.framework.system.basic.repository.UserRepository;
import com.sinosteel.framework.utils.encryption.MD5Util;
import com.sinosteel.framework.utils.json.JsonUtil;
import com.sinosteel.framework.utils.list.ListUtil;
import com.sinosteel.framework.utils.string.StringUtil;

@Service
public class UserService extends BaseService<User>
{
	@Autowired
	private SystemConfig systemConfig;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private OrganizationRepository organizationRepository;
	
	@Autowired
	private OrganizationUserMapper organizationUserMapper;
	
	public User getUserByUsername(String username)
	{
		return userRepository.findByUsername(username);
	}

	public User getLoginUser(JSONObject params) throws Exception
	{
		String userName = params.getString("username");
		if(StringUtil.isEmpty(userName))
		{
			throw new Exception("empty username");
		}
		
		String password = params.getString("password");
		if(StringUtil.isEmpty(password))
		{
			throw new Exception("empty password");
		}
		
		User user = userRepository.findByUsername(userName);
		if(user == null)
		{
			throw new Exception("no such user");
		}
		
		String encrptedPassword = MD5Util.encrypt(password);
		if(!encrptedPassword.equals(user.getPassword()))
		{
			throw new Exception("incorrect password");
		}
		
		return user;
	}
	
	public JSONArray queryAllUsers()
	{
		return JsonUtil.toJSONArray(userRepository.findAll());
	}
	
	public JSONObject queryUsers(JSONObject params)
	{
		StringBuilder hqlBuilder = new StringBuilder("FROM User user WHERE 1 = 1 ");
		HashMap<String, Object> paramsMap = new HashMap<String, Object>();
		
		if(params != null)
		{
			String organizationId = params.getString("organizationId");
			if(!StringUtil.isEmpty(organizationId))
			{
				List<String> organizationIds = HierarchyHelper.getHierarchyIds(organizationRepository, organizationId);
				List<String> userIds = organizationUserMapper.findUserIdsByOrganizationIds(organizationIds);
				
				if(userIds.size() != 0)
				{
					hqlBuilder.append("AND user.id IN (");
					for(int i = 0; i < userIds.size(); i++)
					{
						String userId = userIds.get(i);
						hqlBuilder.append("'" + userId + "'");
						
						if(i != userIds.size() - 1)
						{
							hqlBuilder.append(", ");
						}
						else
						{
							hqlBuilder.append(")");
						}
					}
				}
				else
				{
					hqlBuilder.append("AND user.id = 'empty result list' "); //在没有部门ID的情况下，不返回任何结果; 因druid的原因，不能写1 = -1，会被认为是sql注入，未来会进一步配置
				}
			}
			else
			{
				hqlBuilder.append("AND user.id = 'empty result list' "); //在没有部门ID的情况下，不返回任何结果; 因druid的原因，不能写1 = -1，会被认为是sql注入，未来会进一步配置
			}
		}
		
		Pager pager = JSONObject.toJavaObject(params.getJSONObject("pagination"), Pager.class);
		PageResult<User> queryResult = userRepository.executeHql(hqlBuilder.toString(), paramsMap, pager);

		JSONObject resultJson = queryResult.toJSONObject();
		JSONArray data = resultJson.getJSONArray("data");
		for(int i = 0; i < data.size(); i++)
		{
			JSONObject userJson = data.getJSONObject(i);
			String userId = userJson.getString("id");
			
			List<String> organizationIds = organizationUserMapper.findOrganizationIdsByUserId(userId);
			userJson.put("organizationIds", JsonUtil.toStringJsonArray(organizationIds));
		}
		
		return resultJson;
	}
	
	/**新添加的用户密码固定为123456*/
	public void addUser(JSONObject params, User user)
	{
		User userToAdd = JSONObject.toJavaObject(params, User.class);
		
		String password = MD5Util.encrypt("123456");
		userToAdd.setPassword(password);
		
		userToAdd.setName(userToAdd.getUsername());
		
		JSONArray roleIds = params.getJSONArray("roleIds");
		if(roleIds != null)
		{
			List<Role> roles = new ArrayList<Role>();
			
			for(int i = 0; i < roleIds.size(); i++)
			{
				String roleId = roleIds.getString(i);
				Role role = roleRepository.findOne(roleId);
				
				roles.add(role);
			}
			
			userToAdd.setRoles(roles);
		}
		
		this.saveEntity(userToAdd, user);
		
		JSONArray organizationIds = params.getJSONArray("organizationIds");
		if(organizationIds != null)
		{
			String userId = userToAdd.getId();
			
			for(int i = 0; i < organizationIds.size(); i++)
			{
				String organizationId = organizationIds.getString(i);
				organizationUserMapper.insertOrganizationUser(organizationId, userId, "0");
			}
		}
	}
	
	public void addUser(String userId, String username, String name, User user)
	{
		User userToAdd = new User();
		
		userToAdd.setId(userId);
		userToAdd.setUsername(username);
		userToAdd.setName(name);
		
		String password = MD5Util.encrypt("123456");
		userToAdd.setPassword(password);
		
		this.saveEntity(userToAdd, user);
		
		String primeOrganization = systemConfig.getProperty("primeOrganization");
		organizationUserMapper.insertOrganizationUser(primeOrganization, userId, "0");
	}
	
	public void editUser(JSONObject params, User user)
	{
		String userId = params.getString("id");
		User userToEdit = userRepository.findOne(userId);
		
		String username = params.getString("username");
		if(!StringUtil.isEmpty(username))
		{
			userToEdit.setUsername(username);
		}
		
		JSONArray roleIds = params.getJSONArray("roleIds");
		if(roleIds != null)
		{
			List<Role> roles = new ArrayList<Role>();
			
			for(int i = 0; i < roleIds.size(); i++)
			{
				String roleId = roleIds.getString(i);
				Role role = roleRepository.findOne(roleId);
				
				roles.add(role);
			}
			
			userToEdit.setRoles(roles);
		}
		
		this.updateEntity(userToEdit, user);
		
		JSONArray organizationIdsJsonArray = params.getJSONArray("organizationIds");
		if(organizationIdsJsonArray != null)
		{
			List<String> organizationIds = JsonUtil.toStringList(organizationIdsJsonArray);
			List<String> existedOrganizationIds = organizationUserMapper.findOrganizationIdsByUserId(userId);

			List<String> toBeAddedOrganizationIds = ListUtil.getDifference(organizationIds, existedOrganizationIds);
			List<String> toBeDeletedOrganizationIds = ListUtil.getDifference(existedOrganizationIds, organizationIds);
			
			for(String organizationId : toBeAddedOrganizationIds)
			{
				organizationUserMapper.insertOrganizationUser(organizationId, userId, "0");
			}
			
			for(String organizationId : toBeDeletedOrganizationIds)
			{
				organizationUserMapper.deleteOrganizationUser(organizationId, userId);
			}
		}
		
		CacheUtil.evictUserInfoCache(username);
	}
	
	public void deleteUser(JSONObject params)
	{
		String userId = params.getString("id");
		User user = userRepository.findOne(userId);
		String username = user.getUsername();
		
		userRepository.delete(userId);
		organizationUserMapper.deleteOrganizationUserByUserId(userId);
		
		CacheUtil.evictUserInfoCache(username);
	}
	
	public List<Organization> getOrganizations(String username)
	{
		return userMapper.getOrganizations(username);
	}
	
	public List<String> getOrganizationIdsByUserId(String userId)
	{
		return userMapper.getOrganizationIdsByUserId(userId);
	}
}
