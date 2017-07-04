package com.sinosteel.framework.system.auth.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface QueryAuthorizationMapper
{
	@Select("SELECT query_auth.ORGANIZATION_ID FROM TBL_SYS_QUERY_AUTHORIZATION query_auth "
			+ "WHERE EXISTS "
			+ "(SELECT 1 FROM TBL_SYS_ROLE_USER role_user "
			+ "WHERE role_user.ROLE_ID = query_auth.ROLE_ID "
			+ "AND role_user.USER_ID = #{userId})")
	List<String> getAuthorizedOrganizationIds(@Param("userId")String userId);
	
	@Select("SELECT ORGANIZATION_ID FROM TBL_SYS_QUERY_AUTHORIZATION "
			+ "WHERE ROLE_ID = #{roleId}")
	List<String> getAuthorizedOrganizationIdsByRoleId(@Param("roleId")String roleId);
	
	@Insert("INSERT INTO TBL_SYS_QUERY_AUTHORIZATION(ROLE_ID, ORGANIZATION_ID) VALUES (#{roleId}, #{organizationId})")
	void addAuthorization(@Param("roleId")String roleId, @Param("organizationId")String organizationId);
	
	@Delete("DELETE FROM TBL_SYS_QUERY_AUTHORIZATION WHERE ROLE_ID = #{roleId} AND ORGANIZATION_ID = #{organizationId}")
	void deleteAuthorization(@Param("roleId")String roleId, @Param("organizationId")String organizationId);
	
	@Delete("DELETE FROM TBL_SYS_QUERY_AUTHORIZATION WHERE ROLE_ID = #{roleId}")
	void deleteAuthorizationByRoleId(@Param("roleId")String roleId);
	
	@Delete("DELETE FROM TBL_SYS_QUERY_AUTHORIZATION WHERE ORGANIZATION_ID = #{organizationId}")
	void deleteAuthorizationByOrganizationId(@Param("organizationId")String organizationId);
}
