package com.sinosteel.metallurgical.journal.mapper;

import org.apache.ibatis.jdbc.SQL;

import com.sinosteel.framework.utils.string.StringUtil;

public class JournalSQLProvider
{
	public String queryEvections(String personnelName, String startTime, String endTime)
	{
		SQL sql = new SQL();
		
		sql.SELECT("journal.LOCATION, COUNT(journal.ID) AS TOTAL");
		sql.FROM("TBL_JOURNAL journal");
		sql.RIGHT_OUTER_JOIN("TBL_PERSONNEL personnel ON journal.PERSONNEL_ID = personnel.ID");
		sql.WHERE("personnel.PERSONNEL_NAME = #{personnelName}");
		
		if(!StringUtil.isEmpty(startTime))
		{
			sql.WHERE("journal.WRITE_TIME >= #{startTime}");
		}
		
		if(!StringUtil.isEmpty(endTime))
		{
			sql.WHERE("journal.WRITE_TIME <= #{startTime}");
		}
		
		sql.GROUP_BY("journal.LOCATION");
		
		return sql.toString();
	}
}
