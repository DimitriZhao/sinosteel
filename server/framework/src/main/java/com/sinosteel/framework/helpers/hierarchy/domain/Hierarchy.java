package com.sinosteel.framework.helpers.hierarchy.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import com.sinosteel.framework.core.base.domain.BaseEntity;

@MappedSuperclass
public class Hierarchy extends BaseEntity
{
	private static final long serialVersionUID = 4998039521607719893L;

	@Column(name = "PARENT_ID")
	private String parentId;
	
	@Transient
	private List<? extends Hierarchy> children;
	
	@Transient
	private Hierarchy parent;

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public List<? extends Hierarchy> getChildren() 
	{
		return children;
	}

	public void setChildren(List<? extends Hierarchy> children) 
	{
		this.children = children;
	}

	public Hierarchy getParent() 
	{
		return parent;
	}

	public void setParent(Hierarchy parent) 
	{
		this.parent = parent;
	}
}
