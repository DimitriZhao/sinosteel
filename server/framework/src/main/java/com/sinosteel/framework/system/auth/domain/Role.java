package com.sinosteel.framework.system.auth.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.alibaba.fastjson.annotation.JSONField;
import com.sinosteel.framework.core.base.domain.BaseEntity;
import com.sinosteel.framework.system.basic.domain.Function;

@Entity
@Table(name = "TBL_SYS_ROLE")
public class Role extends BaseEntity
{
	private static final long serialVersionUID = 2857988380369247437L;

	@Column(name = "ROLE_NAME")
	private String roleName;
	
	@Column(name = "ROLE_STRING")
	private String roleString;
	
	@Column(name = "DESCRIPTION")
	private String description;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "TBL_SYS_ROLE_FUNCTION", joinColumns = 
	{
		@JoinColumn(name = "ROLE_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	}, inverseJoinColumns = 
	{
		@JoinColumn(name = "FUNCTION_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	})
	@JSONField(deserialize = false)
	private List<Function> functions;
	
	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public List<Function> getFunctions() {
		return functions;
	}

	@JSONField(deserialize = false)
	public void setFunctions(List<Function> functions) {
		this.functions = functions;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRoleString() {
		return roleString;
	}

	public void setRoleString(String roleString) {
		this.roleString = roleString;
	}
}
