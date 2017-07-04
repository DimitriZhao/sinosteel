package com.sinosteel.framework.system.basic.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface OrganizationUserMapper 
{
	@Select("SELECT ORGANIZATION_ID FROM TBL_SYS_ORGANIZATION_USER WHERE USER_ID = #{userId}")
	List<String> findOrganizationIdsByUserId(@Param("userId")String userId);
	
	@Select("SELECT USER_ID FROM TBL_SYS_ORGANIZATION_USER WHERE ORGANIZATION_ID = #{organizationId}")
	List<String> findUserIdsByOrganizationId(@Param("organizationId")String organizationId);
	
	@SelectProvider(type = OrganizationUserSQLProvider.class, method = "findUserIdsByOrganizationIds")
	List<String> findUserIdsByOrganizationIds(@Param("organizationIds")List<String> organizationIds);
	
	@Insert("INSERT INTO TBL_SYS_ORGANIZATION_USER(ORGANIZATION_ID, USER_ID, IS_PRINCIPAL) VALUES (#{organizationId}, #{userId}, #{isPrincipal})")
	void insertOrganizationUser(@Param("organizationId")String organizationId, @Param("userId")String userId, @Param("isPrincipal")String isPrincipal);

	@Delete("DELETE FROM TBL_SYS_ORGANIZATION_USER WHERE ORGANIZATION_ID = #{organizationId} AND USER_ID = #{userId}")
	void deleteOrganizationUser(@Param("organizationId")String organizationId, @Param("userId")String userId);
	
	@Delete("DELETE FROM TBL_SYS_ORGANIZATION_USER WHERE ORGANIZATION_ID = #{organizationId}")
	void deleteOrganizationUserByOrganizationId(@Param("organizationId")String organizationId);
	
	@Delete("DELETE FROM TBL_SYS_ORGANIZATION_USER WHERE USER_ID = #{userId}")
	void deleteOrganizationUserByUserId(@Param("userId")String userId);
	
	@Update("UPDATE TBL_SYS_ORGANIZATION_USER SET IS_PRINCIPAL = '0' WHERE ORGANIZATION_ID = #{organizationId};"
			+ "UPDATE _TBL_SYS_ORGANIZATION_USER SET IS_PRINCIPAL = '1' WHERE ORGANIZATION_ID = #{organizationId} AND USER_ID = #{userId}")
	void updatePrincipal(@Param("organizationId")String organizationId, @Param("userId")String userId);

	@Select("SELECT USER_ID FROM TBL_SYS_ORGANIZATION_USER WHERE ORGANIZATION_ID = #{organizationId} AND IS_PRINCIPAL = '1'")
	String findPrincipalId(@Param("organizationId")String organizationId);
}
