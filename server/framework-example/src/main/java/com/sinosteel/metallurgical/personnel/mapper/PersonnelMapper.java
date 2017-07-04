package com.sinosteel.metallurgical.personnel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectProvider;

import com.alibaba.fastjson.JSONArray;

@Mapper
public interface PersonnelMapper 
{
	@SelectProvider(type = PersonnelSQLProvider.class, method = "findPersonnelNamesByIds")
	List<String> findPersonnelNamesByIds(JSONArray personnelIds);
}
