package com.sinosteel.framework.system.basic.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.sinosteel.framework.helpers.hierarchy.domain.Hierarchy;

@Entity
@Table(name = "TBL_SYS_ORGANIZATION")
public class Organization extends Hierarchy<Organization>
{
	private static final long serialVersionUID = -2012132102143789528L;

	@Column(name = "ORGANIZATION_NAME")
	private String organizationName;
	
	@Column(name = "DESCRIPTION")
	private String description;

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
