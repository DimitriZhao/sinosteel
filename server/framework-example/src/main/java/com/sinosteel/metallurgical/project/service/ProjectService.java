package com.sinosteel.metallurgical.project.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.helpers.pagination.PageResult;
import com.sinosteel.framework.helpers.pagination.Pager;
import com.sinosteel.framework.utils.json.JsonUtil;
import com.sinosteel.framework.utils.string.StringUtil;
import com.sinosteel.metallurgical.project.domain.Project;
import com.sinosteel.metallurgical.project.repository.ProjectRepository;

@Service
public class ProjectService extends BaseService<Project>
{
	@Autowired
	private ProjectRepository projectRepository;
	
	public JSONArray queryAllProjects()
	{
		return JsonUtil.toJSONArray(projectRepository.findAll());
	}
	
	public JSONObject queryProjects(JSONObject params)
	{	
		StringBuilder hqlBuilder = new StringBuilder("FROM Project project WHERE 1 = 1 ");
		HashMap<String, Object> paramsMap = new HashMap<String, Object>();
		
		if(params != null)
		{
			JSONArray startTime = params.getJSONArray("startTime");
			if(startTime != null && startTime.size() == 2)
			{
				String lowerLimit = startTime.getString(0);
				if(!StringUtil.isEmpty(lowerLimit))
				{
					hqlBuilder.append("AND project.startTime >= :lowerLimit ");
					paramsMap.put("lowerLimit", lowerLimit);
				}
				
				String upperLimit = startTime.getString(1);
				if(!StringUtil.isEmpty(upperLimit))
				{
					hqlBuilder.append("AND project.startTime <= :upperLimit ");
					paramsMap.put("upperLimit", upperLimit);
				}
			}
			
			String projectName = params.getString("projectName");
			if(!StringUtil.isEmpty(projectName))
			{
				hqlBuilder.append("AND project.projectName LIKE :projectName ");
				paramsMap.put("projectName", "%" + projectName + "%");
			}
			
			String location = params.getString("location");
			if(!StringUtil.isEmpty(location))
			{
				hqlBuilder.append("AND project.location LIKE :location ");
				paramsMap.put("location", "%" + location + "%");
			}
			
			String completed = params.getString("completed");
			if(!StringUtil.isEmpty(completed))
			{
				hqlBuilder.append("AND project.completed = :completed ");
				paramsMap.put("completed", completed);
			}
			
			Integer expectedDuration = params.getInteger("expectedDuration");
			if(expectedDuration != null)
			{
				hqlBuilder.append("AND project.expectedDuration = :expectedDuration ");
				paramsMap.put("expectedDuration", expectedDuration);
			}
		}
		
		hqlBuilder.append("ORDER BY CREATED_TIME DESC ");
		
		Pager pager = JSONObject.toJavaObject(params.getJSONObject("pagination"), Pager.class);
		PageResult<Project> pageResult = projectRepository.executeHql(hqlBuilder.toString(), paramsMap, pager);
		
		return pageResult.toJSONObject();
	}
}
