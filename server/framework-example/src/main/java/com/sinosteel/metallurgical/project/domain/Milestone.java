package com.sinosteel.metallurgical.project.domain;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.alibaba.fastjson.annotation.JSONField;
import com.sinosteel.framework.core.base.domain.BaseEntity;

@Entity
@Table(name = "TBL_MILESTONE")
public class Milestone extends BaseEntity
{
	private static final long serialVersionUID = 1919968698850241465L;

	@Column(name = "MILESTONE_NAME")
	private String milestoneName;
	
	@Column(name = "MILESTONE_TIME")
	private String milestoneTime;
	
	@Column(name = "STATUS")
	private String status;
	
	@ManyToOne
	@JoinColumn(name = "PROJECT_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	@JSONField(serialize = false, deserialize = false)
	private Project project;

	public String getMilestoneName() {
		return milestoneName;
	}

	public void setMilestoneName(String milestoneName) {
		this.milestoneName = milestoneName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public String getMilestoneTime() {
		return milestoneTime;
	}

	public void setMilestoneTime(String milestoneTime) {
		this.milestoneTime = milestoneTime;
	}
}
