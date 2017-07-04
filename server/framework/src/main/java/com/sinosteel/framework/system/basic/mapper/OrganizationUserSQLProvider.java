package com.sinosteel.framework.system.basic.mapper;

import java.util.List;

public class OrganizationUserSQLProvider 
{
	public String findUserIdsByOrganizationIds(List<String> organizationIds)
	{
		StringBuilder sqlBuilder = new StringBuilder("SELECT USER_ID FROM TBL_SYS_ORGANIZATION_USER WHERE ORGANIZATION_ID IN (");
		
		for(int i = 0; i < organizationIds.size(); i++)
		{
			String organizationId = organizationIds.get(i);
			sqlBuilder.append("'" + organizationId + "'");
			
			if(i != organizationIds.size() - 1)
			{
				sqlBuilder.append(", ");
			}
		}
		
		sqlBuilder.append(")");
		
		return sqlBuilder.toString();
	}
}
