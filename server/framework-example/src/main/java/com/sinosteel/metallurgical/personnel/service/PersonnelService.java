package com.sinosteel.metallurgical.personnel.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.core.utils.cache.CacheUtil;
import com.sinosteel.framework.helpers.file.helper.FileHelper;
import com.sinosteel.framework.helpers.pagination.PageResult;
import com.sinosteel.framework.helpers.pagination.Pager;
import com.sinosteel.framework.system.basic.domain.User;
import com.sinosteel.framework.system.basic.service.UserService;
import com.sinosteel.framework.utils.date.DateUtil;
import com.sinosteel.framework.utils.json.JsonUtil;
import com.sinosteel.framework.utils.string.StringUtil;
import com.sinosteel.metallurgical.personnel.domain.Personnel;
import com.sinosteel.metallurgical.personnel.domain.Resume;
import com.sinosteel.metallurgical.personnel.repository.PersonnelRepository;
import com.sinosteel.metallurgical.personnel.repository.ResumeRepository;

@Service
public class PersonnelService extends BaseService<Personnel>
{
	@Value("${resumePathHead}")
	private String resumePathHead;
	
	@Autowired
	private PersonnelRepository personnelRepository;

	@Autowired
	private ResumeRepository resumeRepository;
	
	@Autowired
	private UserService userService;
	
	public JSONArray queryAllPersonnels()
	{
		return JsonUtil.toJSONArray(personnelRepository.findAll());
	}
	
	public JSONObject queryPersonnels(JSONObject params)
	{
		StringBuilder hqlBuilder = new StringBuilder("FROM Personnel personnel WHERE 1 = 1 ");
		HashMap<String, Object> paramsMap = new HashMap<String, Object>();
		
		if(params != null)
		{
			String personnelName = params.getString("personnelName");
			if(!StringUtil.isEmpty(personnelName))
			{
				hqlBuilder.append("AND personnel.personnelName LIKE :personnelName ");
				paramsMap.put("personnelName", "%" + personnelName + "%");
			}
			
			Integer age = params.getInteger("age");
			if(age != null)
			{
				Date birthday = DateUtil.addDays(new Date(), age * -1);
				hqlBuilder.append("AND personnel.birthday = :birthday ");
				paramsMap.put("birthday", DateUtil.formatDate(birthday));
			}
			
			JSONArray graduateTime = params.getJSONArray("graduateTime");
			if(graduateTime != null && graduateTime.size() == 2)
			{
				String lowerLimit = graduateTime.getString(0);
				if(!StringUtil.isEmpty(lowerLimit))
				{
					hqlBuilder.append("AND personnel.graduateTime >= :lowerLimitGraduateTime ");
					paramsMap.put("lowerLimitGraduateTime", lowerLimit);
				}
				
				String upperLimit = graduateTime.getString(1);
				if(!StringUtil.isEmpty(upperLimit))
				{
					hqlBuilder.append("AND personnel.graduateTime <= :upperLimitGraduateTime ");
					paramsMap.put("upperLimitGraduateTime", upperLimit);
				}
			}
			
			String graduateFrom = params.getString("graduateFrom");
			if(!StringUtil.isEmpty(graduateFrom))
			{
				hqlBuilder.append("AND personnel.graduateFrom LIKE :graduateFrom ");
				paramsMap.put("graduateFrom", "%" + graduateFrom + "%");
			}
			
			String scholar = params.getString("scholar");
			if(!StringUtil.isEmpty(scholar))
			{
				hqlBuilder.append("AND personnel.scholar = :scholar ");
				paramsMap.put("scholar", scholar);
			}
			
			JSONArray workStartTime = params.getJSONArray("workStartTime");
			if(workStartTime != null && workStartTime.size() == 2)
			{
				String lowerLimit = workStartTime.getString(0);
				if(!StringUtil.isEmpty(lowerLimit))
				{
					hqlBuilder.append("AND personnel.workStartTime >= :lowerLimitWorkStartTime ");
					paramsMap.put("lowerLimitWorkStartTime", lowerLimit);
				}
				
				String upperLimit = workStartTime.getString(1);
				if(!StringUtil.isEmpty(upperLimit))
				{
					hqlBuilder.append("AND personnel.workStartTime <= :upperLimitWorkStartTime ");
					paramsMap.put("upperLimitWorkStartTime", upperLimit);
				}
			}
		}
		
		hqlBuilder.append("ORDER BY CREATED_TIME DESC ");
		
		Pager pager = JSONObject.toJavaObject(params.getJSONObject("pagination"), Pager.class);
		PageResult<Personnel> queryResult = personnelRepository.executeHql(hqlBuilder.toString(), paramsMap, pager);
		
		return queryResult.toJSONObject();
	}
	
	public void addPersonnel(JSONObject params, List<MultipartFile> files, User user) throws Exception
	{
		String personnelId = UUID.randomUUID().toString();
		
		Personnel personnel = JSONObject.toJavaObject(params, Personnel.class);
		personnel.setId(personnelId);
		
		if(files != null)
		{
			String destination = resumePathHead + personnelId;
			List<Resume> resumes = new ArrayList<Resume>();
			for(int i = 0; i < files.size(); i++)
			{
				MultipartFile file = files.get(i);
				Resume resume = FileHelper.saveFile(file, destination, Resume.class);
				resumeRepository.save(resume);
				
				resumes.add(resume);
			}
			
			personnel.setResumes(resumes);
		}

		this.saveEntity(personnel, user);
		
		userService.addUser(personnelId, personnel.getPersonnelName(), personnel.getPersonnelName(), user);
	}
	
	/*该方法不删除相关简历*/
	public void deletePersonnel(JSONObject params)
	{
		String personnelId = params.getString("id");
		personnelRepository.delete(personnelId);
		
		User user = userService.findEntityById(personnelId);
		if(user != null)
		{
			CacheUtil.evictUserInfoCache(user.getUsername());
			userService.deleteEntity(user);
		}
	}
	
	public void editPersonnel(JSONObject params, List<MultipartFile> files, User user) throws Exception
	{
		Personnel personnel = JSONObject.toJavaObject(params, Personnel.class);
		String personnelId = personnel.getId();
		
		if(files != null)
		{
			String destination = resumePathHead + personnelId;
			List<Resume> resumes = personnel.getResumes();
			for(int i = 0; i < files.size(); i++)
			{
				MultipartFile file = files.get(i);
				Resume resume = FileHelper.saveFile(file, destination, Resume.class);
				resumeRepository.save(resume);
				
				resumes.add(resume);
			}
			
			personnel.setResumes(resumes);
		}
		
		this.updateEntity(personnel, user);
	}
}
