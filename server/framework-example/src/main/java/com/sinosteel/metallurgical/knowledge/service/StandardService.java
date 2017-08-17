package com.sinosteel.metallurgical.knowledge.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.config.system.SystemConfig;
import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.helpers.file.helper.FileHelper;
import com.sinosteel.framework.helpers.pagination.PageResult;
import com.sinosteel.framework.helpers.pagination.Pager;
import com.sinosteel.framework.system.basic.domain.User;
import com.sinosteel.framework.utils.string.StringUtil;
import com.sinosteel.metallurgical.knowledge.domain.Standard;
import com.sinosteel.metallurgical.knowledge.domain.StandardResource;
import com.sinosteel.metallurgical.knowledge.repository.StandardRepository;
import com.sinosteel.metallurgical.knowledge.repository.StandardResourceRepository;

@Service
public class StandardService extends BaseService<Standard>
{
	@Autowired
	private SystemConfig systemConfig;
	
	@Autowired
	private StandardRepository standardRepository;
	
	@Autowired
	private StandardResourceRepository standardResourceRepository;
	
	public JSONObject queryStandards(JSONObject params)
	{
		StringBuilder hqlBuilder = new StringBuilder("FROM Standard standard WHERE 1 = 1 ");
		HashMap<String, Object> paramsMap = new HashMap<String, Object>();
		
		String name = params.getString("name");
		if(!StringUtil.isEmpty(name))
		{
			hqlBuilder.append("AND standard.name LIKE :name ");
			paramsMap.put("name", "%" + name + "%");
		}
		
		String status = params.getString("status");
		if(!StringUtil.isEmpty(status))
		{
			hqlBuilder.append("AND standard.status = :status ");
			paramsMap.put("status", status);
		}
		
		String type = params.getString("type");
		if(!StringUtil.isEmpty(type))
		{
			hqlBuilder.append("AND standard.type = :type ");
			paramsMap.put("type", type);
		}
		
		JSONArray issueDate = params.getJSONArray("issueData");
		if(issueDate != null)
		{
			String lowerLimit = issueDate.getString(0);
			if(!StringUtil.isEmpty(lowerLimit))
			{
				hqlBuilder.append("AND standard.issueDate >= :lowerLimit ");
				paramsMap.put("lowerLimit", lowerLimit);
			}
			
			String upperLimit = issueDate.getString(1);
			if(!StringUtil.isEmpty(upperLimit))
			{
				hqlBuilder.append("AND standard.issueDate <= :upperLimit ");
				paramsMap.put("upperLimit", upperLimit);
			}
		}
		
		hqlBuilder.append("ORDER BY ISSUE_DATE DESC");
		
		Pager pager = JSONObject.toJavaObject(params.getJSONObject("pagination"), Pager.class);
		PageResult<Standard> pageResult = standardRepository.executeHql(hqlBuilder.toString(), paramsMap, pager);
		
		return pageResult.toJSONObject();
	}
	
	public void addStandard(JSONObject params, List<MultipartFile> files, User user) throws Exception
	{
		String standardResourcePathHead = systemConfig.getProperty("standardResourcePathHead");
		String standardId = UUID.randomUUID().toString();
		
		Standard standard = JSONObject.toJavaObject(params, Standard.class);
		standard.setId(standardId);
		
		if(files != null)
		{
			String destination = standardResourcePathHead + standardId;
			List<StandardResource> resources = new ArrayList<StandardResource>();
			for(int i = 0; i < files.size(); i++)
			{
				MultipartFile file = files.get(i);
				StandardResource resource = FileHelper.saveFile(file, destination, StandardResource.class);
				standardResourceRepository.save(resource);
				
				resources.add(resource);
			}
			
			standard.setResources(resources);
		}
		
		this.saveEntity(standard, user);
	}
	
	public void editStandard(JSONObject params, List<MultipartFile> files, User user) throws Exception
	{
		String standardResourcePathHead = systemConfig.getProperty("standardResourcePathHead");
		System.out.println(standardResourcePathHead);
		Standard standard = JSONObject.toJavaObject(params, Standard.class);
		String standardId = standard.getId();
		
		if(files != null)
		{
			String destination = standardResourcePathHead + standardId;
			List<StandardResource> resources = new ArrayList<StandardResource>();
			for(int i = 0; i < files.size(); i++)
			{
				MultipartFile file = files.get(i);
				StandardResource resource = FileHelper.saveFile(file, destination, StandardResource.class);
				standardResourceRepository.save(resource);
				
				resources.add(resource);
			}
			
			standard.setResources(resources);
		}
		
		this.updateEntity(standard, user);
	}
	
	/*该方法不删除相关标准文件*/
	public void deleteStandard(JSONObject params)
	{
		String standardId = params.getString("id");
		standardRepository.delete(standardId);
	}
}
