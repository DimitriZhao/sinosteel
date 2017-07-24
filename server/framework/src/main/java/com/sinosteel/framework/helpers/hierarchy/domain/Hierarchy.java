package com.sinosteel.framework.helpers.hierarchy.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import com.sinosteel.framework.core.base.domain.BaseEntity;

@MappedSuperclass
public class Hierarchy<T extends Hierarchy<T>> extends BaseEntity
{
	private static final long serialVersionUID = 4998039521607719893L;

	@Column(name = "PARENT_ID")
	private String parentId;
	
	@Transient
	private List<T> children;
	
	@Transient
	private Hierarchy<T> parent;

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public List<T> getChildren() {
		return children;
	}

	public void setChildren(List<T> children) {
		this.children = children;
	}

	public Hierarchy<T> getParent() {
		return parent;
	}

	public void setParent(Hierarchy<T> parent) {
		this.parent = parent;
	}
}
