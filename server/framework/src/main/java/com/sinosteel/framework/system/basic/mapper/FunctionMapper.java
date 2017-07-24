package com.sinosteel.framework.system.basic.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FunctionMapper
{
	@Delete("DELETE FROM TBL_SYS_ROLE_FUNCTION "
			+ "WHERE FUNCTION_ID NOT IN "
			+ "(SELECT ID FROM TBL_SYS_FUNCTION)")
	void deleteNonExistentRoleFunction();
}
