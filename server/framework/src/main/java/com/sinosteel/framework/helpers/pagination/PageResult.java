package com.sinosteel.framework.helpers.pagination;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.utils.json.JsonUtil;

public class PageResult<T>
{
	public int total;
	public List<T> data;
	
	public PageResult()
	{
		
	}
	
	public PageResult(int total, List<T> data)
	{
		this.total = total;
		this.data = data;
	}
	
	public JSONObject toJSONObject()
	{
		JSONObject queryResultJson = new JSONObject();
		
		queryResultJson.put("total", total);
		queryResultJson.put("data", JsonUtil.toJSONArray(data));
		
		return queryResultJson;
	}
	
	@Override
	public String toString()
	{
		return this.toJSONObject().toJSONString();
	}
}
