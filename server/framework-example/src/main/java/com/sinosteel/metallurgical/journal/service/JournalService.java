package com.sinosteel.metallurgical.journal.service;

import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.helpers.file.helper.FileHelper;
import com.sinosteel.framework.helpers.pagination.PageResult;
import com.sinosteel.framework.helpers.pagination.Pager;
import com.sinosteel.framework.system.basic.domain.User;
import com.sinosteel.framework.utils.blob.BlobUtil;
import com.sinosteel.framework.utils.date.DateUtil;
import com.sinosteel.framework.utils.string.StringUtil;
import com.sinosteel.metallurgical.journal.domain.Journal;
import com.sinosteel.metallurgical.journal.domain.JournalResource;
import com.sinosteel.metallurgical.journal.mapper.JournalMapper;
import com.sinosteel.metallurgical.journal.repository.JournalRepository;
import com.sinosteel.metallurgical.journal.repository.JournalResourceRepository;
import com.sinosteel.metallurgical.personnel.domain.Personnel;
import com.sinosteel.metallurgical.personnel.mapper.PersonnelMapper;
import com.sinosteel.metallurgical.personnel.repository.PersonnelRepository;
import com.sinosteel.metallurgical.project.domain.Project;
import com.sinosteel.metallurgical.project.domain.Topic;
import com.sinosteel.metallurgical.project.repository.ProjectRepository;
import com.sinosteel.metallurgical.project.repository.TopicRepository;

@Service
public class JournalService extends BaseService<Journal>
{
	@Value("${journalResourcePathHead}")
	private String journalResourcePathHead;
	
	@Autowired
	private JournalRepository journalRepository;
	
	@Autowired
	private TopicRepository topicRepository;
	
	@Autowired
	private PersonnelRepository personnelRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private JournalResourceRepository journalResourceRepository;
	
	@Autowired
	private JournalMapper journalMapper;
	
	@Autowired
	private PersonnelMapper personnelMapper;
	
	public JSONObject queryJournals(JSONObject params)
	{		
		StringBuilder hqlBuilder = new StringBuilder("FROM Journal journal WHERE 1 = 1 ");
		HashMap<String, Object> paramsMap = new HashMap<String, Object>();
		
		if(params != null)
		{
			String personnelId = params.getString("personnelId");
			if(!StringUtil.isEmpty(personnelId))
			{
				hqlBuilder.append("AND journal.personnel.id = :personnelId ");
				paramsMap.put("personnelId", personnelId);
			}
			
			JSONArray topicIdJsonArray = params.getJSONArray("topicId");
			if(topicIdJsonArray != null && topicIdJsonArray.size() != 0)
			{
				String projectId = topicIdJsonArray.getString(0);
				hqlBuilder.append("AND journal.projectId = :projectId ");
				paramsMap.put("projectId", projectId);
				
				if(topicIdJsonArray.size() == 2)
				{
					String topicId = topicIdJsonArray.getString(1);
					hqlBuilder.append("AND journal.topicId = :topicId ");
					paramsMap.put("topicId", topicId);
				}
			}
		}
		
		hqlBuilder.append("ORDER BY CREATED_TIME DESC ");
	
		Pager pager = JSONObject.toJavaObject(params.getJSONObject("pagination"), Pager.class);
		PageResult<Journal> pageResult = journalRepository.executeHql(hqlBuilder.toString(), paramsMap, pager);
		
		List<Journal> journals = pageResult.data;
		for(Journal journal : journals)
		{
			String projectId = journal.getProjectId();		
			if(!StringUtil.isEmpty(projectId))
			{
				Project project = projectRepository.findOne(projectId);
				journal.setProjectName(project.getProjectName());
			}
			
			String topicId = journal.getTopicId();
			if(!StringUtil.isEmpty(topicId))
			{
				Topic topic = topicRepository.findOne(topicId);
				journal.setTopicName(topic.getTopicName());
			}
		}
		
		return pageResult.toJSONObject();
	}
	
	public void addJournal(JSONObject params, List<MultipartFile> files, User user) throws Exception
	{	
		Journal journal = new Journal();
		
		String journalId = UUID.randomUUID().toString();
		journal.setId(journalId);
		
		String personnelId = params.getString("personnelId");
		if(StringUtil.isEmpty(personnelId))
		{
			throw new Exception("personnelId is empty");
		}
		Personnel personnel = personnelRepository.findOne(personnelId);
		journal.setPersonnel(personnel);
		
		String writeTime = params.getString("writeTime");
		if(!StringUtil.isEmpty(writeTime))
		{
			journal.setWriteTime(writeTime);
		}
		
		String location = params.getString("location");
		if(!StringUtil.isEmpty(location))
		{
			journal.setLocation(location);
		}
		
		JSONArray topicIdJsonArray = params.getJSONArray("topicId");
		if(topicIdJsonArray != null && topicIdJsonArray.size() != 0)
		{
			String projectId = topicIdJsonArray.getString(0);
			journal.setProjectId(projectId);
			
			if(topicIdJsonArray.size() == 2)
			{
				String topicId = topicIdJsonArray.getString(1);
				journal.setTopicId(topicId);
			}
		}
		
		String specificationString = params.getString("specification");
		if(!StringUtil.isEmpty(specificationString))
		{
			Blob specification = BlobUtil.stringToBlob(specificationString);
			journal.setSpecification(specification);
		}

		if(files != null)
		{
			String destination = journalResourcePathHead + personnelId + "/" + journalId;
			List<JournalResource> journalResources = new ArrayList<JournalResource>();
			for(int i = 0; i < files.size(); i++)
			{
				MultipartFile file = files.get(i);
				JournalResource journalResource = FileHelper.saveFile(file, destination, JournalResource.class);
				journalResourceRepository.save(journalResource);
				
				journalResources.add(journalResource);
			}
			
			journal.setResources(journalResources);
		}
		
		this.saveEntity(journal, user);
	}
	
	public void deleteJournal(JSONObject params) throws Exception
	{
		String journalId = params.getString("id");
		Journal journal = journalRepository.findOne(journalId);
		
		List<JournalResource> journalResources = journal.getResources();
		FileHelper.deleteFiles(journalResourceRepository, journalResources);
		
		journalRepository.delete(journalId);
	}
	
	public void editJournal(JSONObject params, List<MultipartFile> files, User user) throws Exception
	{
		String journalId = params.getString("id");
		Journal journal = journalRepository.findOne(journalId);
		
		String personnelId = params.getString("personnelId");
		
		String writeTime = params.getString("writeTime");
		if(!StringUtil.isEmpty(writeTime))
		{
			journal.setWriteTime(writeTime);
		}
		
		String location = params.getString("location");
		if(!StringUtil.isEmpty(location))
		{
			journal.setLocation(location);
		}
		
		String specificationString = params.getString("specification");
		if(!StringUtil.isEmpty(specificationString))
		{
			Blob specification = BlobUtil.stringToBlob(specificationString);
			journal.setSpecification(specification);
		}
		
		JSONArray topicIdJsonArray = params.getJSONArray("topicId");
		if(topicIdJsonArray != null && topicIdJsonArray.size() != 0)
		{
			String projectId = topicIdJsonArray.getString(0);
			journal.setProjectId(projectId);
			
			if(topicIdJsonArray.size() == 2)
			{
				String topicId = topicIdJsonArray.getString(1);
				journal.setTopicId(topicId);
			}
		}
		
		if(files != null)
		{
			String destination = journalResourcePathHead + personnelId + "/" + journalId;
			List<JournalResource> journalResources = journal.getResources();
			for(int i = 0; i < files.size(); i++)
			{
				MultipartFile file = files.get(i);
				JournalResource journalResource = FileHelper.saveFile(file, destination, JournalResource.class);
				journalResourceRepository.save(journalResource);
				
				journalResources.add(journalResource);
			}
			
			journal.setResources(journalResources);
		}
		
		this.updateEntity(journal, user);
	}
	
	public JSONObject queryJournalsTotalAmount()
	{
		String startDate = new SimpleDateFormat("yyyy-MM-dd").format(DateUtil.getFirstDayOfMonth());
		String endDate = new SimpleDateFormat("yyyy-MM-dd").format(DateUtil.getLastDayOfMonth());
		
		long result = journalMapper.queryJournalsTotalAmount(startDate, endDate);
		
		JSONObject resultsJson = new JSONObject();
		resultsJson.put("total", result);
		
		return resultsJson;
	}
	
	public JSONObject queryJournalsIncrement()
	{
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		Date today = new Date();
		
		String startDate = format.format(DateUtil.getFirstDayOfMonth());
		String endDate = format.format(DateUtil.getLastDayOfMonth());
		long total = journalMapper.queryJournalsTotalAmount(startDate, endDate);
		
		String startDateLastMonth = format.format(DateUtil.getFirstDayOfMonth(DateUtil.addMonths(today, -1)));
		String endDateLastMonth = format.format(DateUtil.getLastDayOfMonth(DateUtil.addMonths(today, -1)));
		long totalLastMonth = journalMapper.queryJournalsTotalAmount(startDateLastMonth, endDateLastMonth);
		
		String startDateBeforeLastMonth = format.format(DateUtil.getFirstDayOfMonth(DateUtil.addMonths(today, -2)));
		String endDateBeforeLastMonth = format.format(DateUtil.getLastDayOfMonth(DateUtil.addMonths(today, -2)));
		long totalBeforeLastMonth = journalMapper.queryJournalsTotalAmount(startDateBeforeLastMonth, endDateBeforeLastMonth);
		
		JSONObject resultsJson = new JSONObject();
		resultsJson.put("totalLastMonth", totalLastMonth);
		resultsJson.put("totalBeforeLastMonth", totalBeforeLastMonth);
		resultsJson.put("total", total);
		
		return resultsJson;
	}
	
	public JSONObject queryMostJournalsPersonnel()
	{
		String startDate = new SimpleDateFormat("yyyy-MM-dd").format(DateUtil.getFirstDayOfMonth());
		String endDate = new SimpleDateFormat("yyyy-MM-dd").format(DateUtil.getLastDayOfMonth());
		
		Map<String, Object> result = journalMapper.queryMostJournalsPersonnel(startDate, endDate);
		long personnelTotal = (Long) result.get("TOTAL");
		String personnelName = (String) result.get("PERSONNEL_NAME");
		
		long total = journalMapper.queryJournalsTotalAmount(startDate, endDate);
		
		JSONObject resultsJson = new JSONObject();
		resultsJson.put("personnelName", personnelName);
		resultsJson.put("personnelTotal", personnelTotal);
		resultsJson.put("total", total);
		
		return resultsJson;
	}
	
	public JSONObject queryMostEvectionPersonnels()
	{
		String startDate = new SimpleDateFormat("yyyy-MM-dd").format(DateUtil.getFirstDayOfMonth());
		String endDate = new SimpleDateFormat("yyyy-MM-dd").format(DateUtil.getLastDayOfMonth());
		int limit = 3;
		
		List<Map<String, Object>> results = journalMapper.queryMostEvectionPersonnels(startDate, endDate, limit);
		JSONArray personnelNames = new JSONArray();
		JSONArray personnelTotals = new JSONArray();
		for(int i = 0; i < results.size(); i++)
		{
			Map<String, Object> result = results.get(i);
			
			String personnelName = (String) result.get("PERSONNEL_NAME");
			long personnelTotal = (Long) result.get("TOTAL");
			
			personnelNames.add(personnelName);
			personnelTotals.add(personnelTotal);
		}
		
		JSONObject resultsJson = new JSONObject();
		resultsJson.put("personnelNames", personnelNames);
		resultsJson.put("personnelTotals", personnelTotals);
		
		return resultsJson;
	}
	
	public JSONObject queryMostFrequentEvectionPlaces()
	{
		int limit = 6;
		List<Map<String, Object>> results = journalMapper.queryMostFrequentEvectionPlaces(limit);
		
		JSONArray locations = new JSONArray();
		JSONArray evections = new JSONArray();
		for(int i = 0; i < results.size(); i++)
		{
			Map<String, Object> result = results.get(i);
			
			String location = (String) result.get("LOCATION");
			long evection = (Long) result.get("TOTAL");
			
			locations.add(location);
			evections.add(evection);
		}
		
		JSONObject resultsJson = new JSONObject();
		resultsJson.put("locations", locations);
		resultsJson.put("evections", evections);
		
		long total = journalMapper.queryTotalEvections();
		resultsJson.put("total", total);
		
		return resultsJson;
	}
	
	/*
	public JSONObject queryEvections(JSONObject params)
	{
		//获取人名信息
		StringBuilder personnelNamesSqlBuilder = new StringBuilder("SELECT DISTINCT PERSONNEL_NAME FROM TBL_PERSONNEL WHERE 1 = 1 ");
		HashMap<String, Object> paramsMap = new HashMap<String, Object>();
		if(params != null)
		{
			JSONArray personnelIds = params.getJSONArray("personnelIds");
			if(personnelIds != null)
			{
				personnelNamesSqlBuilder.append("AND ID IN (");
				
				for(int i = 0; i < personnelIds.size(); i++)
				{
					String personnelId = personnelIds.getString(i);
					personnelNamesSqlBuilder.append(":personnelId" + i);
					paramsMap.put("personnelId" + i, personnelId);
					
					if(i != personnelIds.size() - 1)
					{
						personnelNamesSqlBuilder.append(", ");
					}
					else
					{
						personnelNamesSqlBuilder.append(") "); 
					}
				}
			}
		}
		
		List<String> personnelNamesResults = this.baseRepository.executeSql(personnelNamesSqlBuilder.toString(), paramsMap);
		JSONArray personnelNames = new JSONArray();
		for(String personnelName : personnelNamesResults)
		{
			personnelNames.add(personnelName);
		}
		paramsMap.clear();
		
		//获取出差数据
		String lowerLimit = "";
		String upperLimit = "";
		if(params != null)
		{
			JSONArray writeTime = params.getJSONArray("writeTime");
			
			if(writeTime != null && writeTime.size() == 2)
			{
				lowerLimit = writeTime.getString(0);
				paramsMap.put("lowerLimit", lowerLimit);
				
				upperLimit = writeTime.getString(1);
				paramsMap.put("upperLimit", upperLimit);
			}
		}
		
		JSONArray evections = new JSONArray();
		for(int i = 0; i < personnelNames.size(); i++)
		{
			String personnelName = personnelNames.getString(i);
			paramsMap.put("personnelName", personnelName);
			
			StringBuilder evectionsSqlBuilder = new StringBuilder("SELECT journal.LOCATION, COUNT(journal.ID) FROM TBL_JOURNAL journal ")
				.append("RIGHT JOIN TBL_PERSONNEL personnel ")
				.append("ON journal.PERSONNEL_ID = personnel.ID ")
				.append("AND personnel.PERSONNEL_NAME = :personnelName ");
			
			if(!StringUtil.isEmpty(lowerLimit))
			{
				evectionsSqlBuilder.append("AND journal.WRITE_TIME >= :lowerLimit ");
			}
			if(!StringUtil.isEmpty(upperLimit))
			{
				evectionsSqlBuilder.append("AND journal.WRITE_TIME <= :upperLimit ");
			}
			
			evectionsSqlBuilder.append("GROUP BY journal.LOCATION ");
			
			List<Object[]> evectionsResults = this.baseRepository.executeSql(evectionsSqlBuilder.toString(), paramsMap);
			JSONArray evectionsResultsJsonArray = new JSONArray();
			for(Object[] evectionsResult : evectionsResults)
			{
				JSONObject evectionResultJson = new JSONObject();
				
				String location = (String) evectionsResult[0];
				Integer total = Integer.parseInt(String.valueOf(evectionsResult[1]));
				
				evectionResultJson.put("name", location);
				evectionResultJson.put("value", total);
				
				evectionsResultsJsonArray.add(evectionResultJson);
			}
			
			JSONObject evection = new JSONObject();
			evection.put("name", personnelName);
			evection.put("data", evectionsResultsJsonArray);
			
			evections.add(evection);
		}
		
		JSONObject evectionJson = new JSONObject();
		evectionJson.put("personnelNames", personnelNames);
		evectionJson.put("evections", evections);
		
		return evectionJson;
	}
	*/
	
	public JSONObject queryEvections(JSONObject params)
	{	
		JSONArray personnelIds = null;
		if(params != null)
		{
			personnelIds = params.getJSONArray("personnelIds");
		}
		
		List<String> personnelNamesResults = personnelMapper.findPersonnelNamesByIds(personnelIds);
		JSONArray personnelNames = new JSONArray();
		for(String personnelName : personnelNamesResults)
		{
			personnelNames.add(personnelName);
		}
		
		//获取出差数据
		String startTime = "";
		String endTime = "";
		if(params != null)
		{
			JSONArray writeTime = params.getJSONArray("writeTime");
			
			if(writeTime != null && writeTime.size() == 2)
			{
				startTime = writeTime.getString(0);			
				endTime = writeTime.getString(1);
			}
		}
		
		JSONArray evections = new JSONArray();
		for(int i = 0; i < personnelNames.size(); i++)
		{
			String personnelName = personnelNames.getString(i);
			
			List<Map<String, Object>> evectionsResults = journalMapper.queryEvections(personnelName, startTime, endTime);
			JSONArray evectionsResultsJsonArray = new JSONArray();
			for(Map<String, Object> evectionsResult : evectionsResults)
			{
				JSONObject evectionResultJson = new JSONObject();
				
				String location = (String) evectionsResult.get("LOCATION");
				long total = (Long) evectionsResult.get("TOTAL");
				
				evectionResultJson.put("name", location);
				evectionResultJson.put("value", total);
				
				evectionsResultsJsonArray.add(evectionResultJson);
			}
			
			JSONObject evection = new JSONObject();
			evection.put("name", personnelName);
			evection.put("data", evectionsResultsJsonArray);
			
			evections.add(evection);
		}
		
		JSONObject evectionJson = new JSONObject();
		evectionJson.put("personnelNames", personnelNames);
		evectionJson.put("evections", evections);
		
		return evectionJson;
	}
	
	public JSONObject queryLeastJournalsPersonnel()
	{
		String startDate = new SimpleDateFormat("yyyy-MM-dd").format(DateUtil.getFirstDayOfMonth());
		String endDate = new SimpleDateFormat("yyyy-MM-dd").format(DateUtil.getLastDayOfMonth());
		
		String sql = "SELECT PERSONNEL_NAME, COUNT(journal.ID) FROM TBL_PERSONNEL personnel "
				+ "INNER JOIN TBL_JOURNAL journal WHERE personnel.ID = journal.PERSONNEL_ID "
				+ "AND WRITE_TIME >= '" + startDate + "' AND WRITE_TIME <= '" + endDate + "' ";
		
		sql = sql + "GROUP BY personnel.ID ORDER BY COUNT(journal.ID) ASC";
		
		List<Object[]> results = this.baseRepository.executeSql(sql, null);
		Integer personnelTotal = Integer.parseInt(String.valueOf(results.get(0)[1]));
		String personnelName = (String) results.get(0)[0];
		
		String sqlTotal = "SELECT COUNT(1) FROM TBL_JOURNAL WHERE WRITE_TIME >= '" + startDate + "' AND WRITE_TIME <= '" + endDate + "'";
		Integer total = Integer.parseInt(this.baseRepository.executeSql(sqlTotal, null).get(0).toString());
		
		JSONObject resultsJson = new JSONObject();
		resultsJson.put("personnelName", personnelName);
		resultsJson.put("personnelTotal", personnelTotal);
		resultsJson.put("total", total);
		
		return resultsJson;
	}
	
	public JSONArray queryRatiosByProjects()
	{
		String sql = "SELECT PROJECT_NAME, COUNT(1) FROM TBL_JOURNAL journal INNER JOIN TBL_PROJECT project ON journal.PROJECT_ID = project.ID GROUP BY project.ID";
		List<Object[]> results = this.baseRepository.executeSql(sql, null);
		
		JSONArray resultsJsonArray = new JSONArray();
		for(Object[] result : results)
		{
			JSONObject resultJson = new JSONObject();
			
			resultJson.put("name", result[0]);
			resultJson.put("amount", result[1]);
			
			resultsJsonArray.add(resultJson);
		}
		
		return resultsJsonArray;
	}
	
	public JSONArray queryRatiosByPersonnels()
	{
		String sql = "SELECT PERSONNEL_NAME, COUNT(1) FROM TBL_JOURNAL journal INNER JOIN TBL_PERSONNEL personnel ON journal.PERSONNEL_ID = personnel.ID GROUP BY personnel.ID";
		List<Object[]> results = this.baseRepository.executeSql(sql, null);
		
		JSONArray resultsJsonArray = new JSONArray();
		for(Object[] result : results)
		{
			JSONObject resultJson = new JSONObject();
			
			resultJson.put("name", result[0]);
			resultJson.put("amount", result[1]);
			
			resultsJsonArray.add(resultJson);
		}
		
		return resultsJsonArray;
	}
	
	public JSONArray queryRatiosByMonths()
	{
		String sql = "SELECT LEFT(WRITE_TIME, 7) AS MONTH, COUNT(1) FROM TBL_JOURNAL GROUP BY LEFT(WRITE_TIME, 7)";
		List<Object[]> results = this.baseRepository.executeSql(sql, null);
		
		JSONArray resultsJsonArray = new JSONArray();
		for(Object[] result : results)
		{
			JSONObject resultJson = new JSONObject();
			
			resultJson.put("name", result[0]);
			resultJson.put("amount", result[1]);
			
			resultsJsonArray.add(resultJson);
		}
		
		return resultsJsonArray;
	}
	
	public JSONObject queryTotalsByProjects(JSONObject params)
	{
		String sql = "SELECT PROJECT_NAME, LEFT(WRITE_TIME, 7) AS MONTH, COUNT(journal.ID) AS AMOUNT"
				+ " FROM TBL_PROJECT project LEFT JOIN TBL_JOURNAL journal ON journal.PROJECT_ID = project.ID";
		
		if(params != null)
		{
			JSONArray projectIds = params.getJSONArray("ids");
			if(projectIds != null && projectIds.size() != 0)
			{
				sql = sql + " AND project.ID IN (";
				
				for(int i = 0; i < projectIds.size(); i++)
				{
					String projectId = projectIds.getString(i);			
					sql = sql + projectId;
					
					if(i != projectIds.size() - 1)
					{
						sql = sql + ", ";
					}
					else
					{
						sql = sql + ")";
					}
				}
			}
			
			JSONArray writeTime = params.getJSONArray("writeTime");
			if(writeTime != null && writeTime.size() != 0)
			{
				String lowerLimit = writeTime.getString(0);
				String upperLimit = writeTime.getString(1);
				
				if(!StringUtil.isEmpty(lowerLimit))
				{
					sql = sql + " AND WRITE_TIME >= " + lowerLimit;
				}
				
				if(!StringUtil.isEmpty(upperLimit))
				{
					sql = sql + " AND WRITE_TIME <= " + upperLimit;
				}
			}
		}
		
		sql = sql + " GROUP BY project.ID, LEFT(WRITE_TIME, 7) ORDER BY LEFT(WRITE_TIME, 7) ASC";
		
		List<Object[]> results = this.baseRepository.executeSql(sql, null);
		return convertTotalsResultsToJsonObject(results);
	}
	
	public JSONObject queryTotalsByPersonnels(JSONObject params)
	{
		String sql = "SELECT PERSONNEL_NAME, LEFT(WRITE_TIME, 7) AS MONTH, COUNT(journal.ID) AS AMOUNT"
				+ " FROM TBL_PERSONNEL personnel LEFT JOIN TBL_JOURNAL journal ON journal.PERSONNEL_ID = personnel.ID";
		
		if(params != null)
		{
			JSONArray personnelIds = params.getJSONArray("ids");
			if(personnelIds != null && personnelIds.size() != 0)
			{
				sql = sql + " AND personnel.ID IN (";
				
				for(int i = 0; i < personnelIds.size(); i++)
				{
					String personnelId = personnelIds.getString(i);
					sql = sql + personnelId;
					
					if(i != personnelIds.size() - 1)
					{
						sql = sql + ", ";
					}
					else
					{
						sql = sql + ")";
					}
				}
			}
			
			JSONArray writeTime = params.getJSONArray("writeTime");
			if(writeTime != null && writeTime.size() != 0)
			{
				String lowerLimit = writeTime.getString(0);
				String upperLimit = writeTime.getString(1);
				
				if(!StringUtil.isEmpty(lowerLimit))
				{
					sql = sql + " AND WRITE_TIME >= " + lowerLimit;
				}
				
				if(!StringUtil.isEmpty(upperLimit))
				{
					sql = sql + " AND WRITE_TIME <= " + upperLimit;
				}
			}
		}
		
		sql = sql + " GROUP BY personnel.ID, LEFT(WRITE_TIME, 7) ORDER BY LEFT(WRITE_TIME, 7) ASC";
		
		List<Object[]> results = this.baseRepository.executeSql(sql, null);
		return convertTotalsResultsToJsonObject(results);
	}
	
	private JSONObject convertTotalsResultsToJsonObject(List<Object[]> results)
	{
		List<String> monthsList = new ArrayList<String>();
		HashMap<String, HashMap<String, Integer>> seriesMap = new HashMap<String, HashMap<String, Integer>>();
		List<String> namesList = new ArrayList<String>();
		
		for(int i = 0; i < results.size(); i++)
		{
			Object[] result = results.get(i);
			
			String name = (String) result[0];
			String month = (String) result[1];
			int total = Integer.parseInt(String.valueOf(result[2]));
			
			if(!monthsList.contains(month))
			{
				monthsList.add(month);
				
				HashMap<String, Integer> valuesMap = new HashMap<String, Integer>();
				valuesMap.put(name, total);
				
				seriesMap.put(month, valuesMap);
			}
			else
			{
				HashMap<String, Integer> valuesMap = seriesMap.get(month);
				
				if(valuesMap.containsKey(name))
				{
					int value = valuesMap.get(name);
					value = value + total;
					valuesMap.put(name, value);
				}
				else
				{
					valuesMap.put(name, total);
				}
			}
			
			if(!namesList.contains(name))
			{
				namesList.add(name);
			}
		}

		JSONArray monthsJsonArray = JSONArray.parseArray(JSONArray.toJSONString(monthsList));
		
		JSONArray seriesJsonArray = new JSONArray();

		if(seriesMap.size() != 0)
		{
			HashMap<String, List<Integer>> valuesMap = new HashMap<String, List<Integer>>();
			
			for(String month : monthsList)
			{
				HashMap<String, Integer> seriesEntry = seriesMap.get(month);
				
				for(String name : namesList)
				{
					Integer value = seriesEntry.get(name);
					value = value == null ? 0 : value;
					
					if(!valuesMap.containsKey(name))
					{
						List<Integer> values = new ArrayList<Integer>();
						values.add(value);
						
						valuesMap.put(name, values);
					}
					else
					{
						List<Integer> values = valuesMap.get(name);
						values.add(value);
					}
				}
			}
			
			Iterator<Entry<String, List<Integer>>> iter = valuesMap.entrySet().iterator();
			while(iter.hasNext())
			{
				Entry<String, List<Integer>> entry = iter.next();
				
				String name = entry.getKey();
				List<Integer> values = entry.getValue();
				
				JSONObject seriesJson = new JSONObject();
				seriesJson.put("name", name);
				seriesJson.put("data", JSONArray.parse(JSONArray.toJSONString(values)));
				
				seriesJsonArray.add(seriesJson);
			}
		}
		
		JSONObject resultsJson = new JSONObject();
		resultsJson.put("months", monthsJsonArray);
		resultsJson.put("series", seriesJsonArray);
		resultsJson.put("legends", JSONArray.parse(JSONArray.toJSONString(namesList)));
		
		return resultsJson;
	}
}
