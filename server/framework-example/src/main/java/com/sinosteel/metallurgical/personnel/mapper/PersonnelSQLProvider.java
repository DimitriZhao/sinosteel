package com.sinosteel.metallurgical.personnel.mapper;

import org.apache.ibatis.jdbc.SQL;

import com.alibaba.fastjson.JSONArray;

public class PersonnelSQLProvider
{
	public String findPersonnelNamesByIds(JSONArray personnelIds)
	{
		SQL sql = new SQL();
		
		sql.SELECT("DISTINCT PERSONNEL_NAME");
		sql.FROM("TBL_PERSONNEL");
		
		if(personnelIds != null)
		{
			StringBuilder whereSqlBuilder = new StringBuilder("ID IN (");
			
			for(int i = 0; i < personnelIds.size(); i++)
			{
				String personnelId = personnelIds.getString(i);
				whereSqlBuilder.append(personnelId);
				
				if(i != personnelIds.size() - 1)
				{
					whereSqlBuilder.append(", ");
				}
				else
				{
					whereSqlBuilder.append(") "); 
				}
			}
			
			sql.WHERE(whereSqlBuilder.toString());
		}
		
		return sql.toString();
	}
}
