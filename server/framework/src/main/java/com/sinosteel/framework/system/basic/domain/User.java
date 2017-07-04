package com.sinosteel.framework.system.basic.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.sinosteel.framework.core.base.domain.BaseEntity;
import com.sinosteel.framework.system.auth.domain.Role;

@Entity
@Table(name = "TBL_SYS_USER")
@Inheritance(strategy = InheritanceType.JOINED)
public class User extends BaseEntity
{
	private static final long serialVersionUID = 6536862440622576274L;
	
	@Column(name = "USERNAME")
	private String username;
	
	@Column(name = "PASSWORD")
	private String password;
	
	private String salt;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "TBL_SYS_ROLE_USER", joinColumns = 
	{
		@JoinColumn(name = "USER_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	}, inverseJoinColumns = 
	{
		@JoinColumn(name = "ROLE_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	})
	private List<Role> roles;
	
	@Transient
	private List<Function> functions;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public List<Function> getFunctions() 
	{
		List<Role> roles = this.roles;
		
		if(roles != null && roles.size() != 0)
		{
			List<Function> functions = new ArrayList<Function>();
			
			for(Role role : roles)
			{
				List<Function> subFunctions = role.getFunctions();
				
				functions.addAll(subFunctions);
			}
			
			return functions;
		}
		
		return this.functions;
	}

	public void setFunctions(List<Function> functions) {
		this.functions = functions;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}
	
	/**
     * 密码盐.
     * @return
     */
    public String getCredentialsSalt()
    {
       return this.username + this.salt;
    }
}
