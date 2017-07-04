package com.sinosteel.framework.system.auth.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface RoleMapper 
{
	@Select("SELECT organization.ID FROM TBL_SYS_ORGANIZATION organization "
			+ "WHERE EXISTS "
			+ "(SELECT org_user.ORGANIZATION_ID FROM TBL_SYS_ORGANIZATION_USER org_user "
			+ "WHERE organization.ID = org_user.ORGANIZATION_ID "
			+ "AND org_user.USER_ID = #{userId}")
	List<String> getOrganizationIdsByUserId(@Param("userId")String userId);
}
