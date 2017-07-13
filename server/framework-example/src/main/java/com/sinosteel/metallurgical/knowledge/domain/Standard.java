package com.sinosteel.metallurgical.knowledge.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.sinosteel.framework.core.base.domain.BaseEntity;

@Entity
@Table(name = "TBL_STANDARD")
public class Standard extends BaseEntity
{
	private static final long serialVersionUID = -7239923911792108248L;

	@Column(name = "ISSUE_DATE")
	private String issueDate;
	
	@Column(name = "SUMMARY")
	private String summary;
	
	@Column(name = "STATUS")
	private String status; //1:在执行   0:废止
	
	@Column(name = "TYPE")
	private String type; //0:强制  1:行业  2:推荐
	
	@OneToMany
	@JoinColumn(name = "STANDARD_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	private List<StandardResource> resources;

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<StandardResource> getResources() {
		return resources;
	}

	public void setResources(List<StandardResource> resources) {
		this.resources = resources;
	}

	public String getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(String issueDate) {
		this.issueDate = issueDate;
	}
}
