package com.sinosteel.metallurgical.journal.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

@Mapper
public interface JournalMapper
{
	@Select("SELECT COUNT(ID) FROM TBL_JOURNAL "
			+ "WHERE WRITE_TIME >= #{startDate} "
			+ "AND WRITE_TIME <= #{endDate}")
	Long queryJournalsTotalAmount(@Param("startDate")String startDate, @Param("endDate")String endDate);
	
	@Select("SELECT PERSONNEL_NAME, COUNT(journal.ID) AS TOTAL FROM TBL_PERSONNEL personnel "
			+ "INNER JOIN TBL_JOURNAL journal WHERE personnel.ID = journal.PERSONNEL_ID "
			+ "AND WRITE_TIME >= #{startDate} AND WRITE_TIME <= #{endDate} "
			+ "GROUP BY personnel.ID "
			+ "ORDER BY COUNT(journal.ID) DESC "
			+ "LIMIT 1")
	Map<String, Object> queryMostJournalsPersonnel(@Param("startDate")String startDate, @Param("endDate")String endDate);
	
	@Select("SELECT PERSONNEL_NAME, COUNT(journal.ID) AS TOTAL FROM TBL_PERSONNEL personnel "
			+ "INNER JOIN TBL_JOURNAL journal WHERE personnel.ID = journal.PERSONNEL_ID "
			+ "AND WRITE_TIME >= #{startDate} AND WRITE_TIME <= #{endDate} "
			+ "AND LOCATION != '北京' "
			+ "GROUP BY personnel.ID "
			+ "ORDER BY COUNT(journal.ID) DESC "
			+ "LIMIT #{limit}")
	List<Map<String, Object>> queryMostEvectionPersonnels(@Param("startDate")String startDate, @Param("endDate")String endDate, @Param("limit")int limit);
	
	@Select("SELECT LOCATION, COUNT(LOCATION) AS TOTAL FROM TBL_JOURNAL WHERE LOCATION != '北京' "
			+ "GROUP BY LOCATION "
			+ "ORDER BY COUNT(LOCATION) DESC "
			+ "LIMIT #{limit}")
	List<Map<String, Object>> queryMostFrequentEvectionPlaces(@Param("limit")int limit);
	
	@Select("SELECT COUNT(LOCATION) FROM TBL_JOURNAL WHERE LOCATION != '北京'")
	Long queryTotalEvections();
	
	@SelectProvider(type = JournalSQLProvider.class, method = "queryEvections")
	List<Map<String, Object>>queryEvections(@Param("personnelName")String personnelName, @Param("startTime")String startTime, @Param("endTime")String endTime);
}
