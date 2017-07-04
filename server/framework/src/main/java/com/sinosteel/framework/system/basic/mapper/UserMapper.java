package com.sinosteel.framework.system.basic.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Select;

import com.sinosteel.framework.system.basic.domain.Organization;

@Mapper
public interface UserMapper 
{
	@Result
	@Select("SELECT * FROM TBL_SYS_ORGANIZATION WHERE ID IN "
			+ "(SELECT ORGANIZATION_ID FROM TBL_SYS_ORGANIZATION_USER WHERE USER_ID IN "
			+ "(SELECT ID FROM TBL_SYS_USER WHERE USERNAME = #{username}))")
	List<Organization> getOrganizations(String username);
	
	@Select("SELECT org.ID FROM TBL_SYS_ORGANIZATION org "
			+ "WHERE EXISTS "
			+ "(SELECT 1 FROM TBL_SYS_ORGANIZATION_USER org_user "
			+ "WHERE org.ID = org_user.ORGANIZATION_ID "
			+ "AND org_user.USER_ID = #{userId})")
	List<String> getOrganizationIdsByUserId(@Param("userId")String userId);
}
