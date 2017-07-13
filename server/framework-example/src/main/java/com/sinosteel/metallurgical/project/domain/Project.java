package com.sinosteel.metallurgical.project.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.alibaba.fastjson.annotation.JSONField;
import com.sinosteel.framework.core.base.domain.BaseEntity;

@Entity
@Table(name = "TBL_PROJECT")
public class Project extends BaseEntity
{
	private static final long serialVersionUID = 8921532687244475870L;
	
	@Column(name = "PROJECT_NAME")
	private String projectName;
	
	@Column(name = "START_TIME")
	private String startTime;
	
	@Column(name = "DIRECTOR_ID")
	private String directorId;
	
	@Column(name = "location")
	private String location;
	
	@Column(name = "EXPECTED_DURATION")
	private Integer expectedDuration;
	
	@Column(name = "ACTUAL_DURATION")
	private Integer actualDuration;
	
	@Column(name = "COMPLETED")
	private String completed;
	
	@Column(name = "COMMENT")
	private String comment;
	
	@OneToMany
	@JoinColumn(name = "PROJECT_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	@JSONField(serialize = false)
	private List<Topic> topics;
	
	@OneToMany
	@JoinColumn(name = "PROJECT_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	@JSONField(serialize = false)
	private List<Milestone> milestones;
 
	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getDirectorId() {
		return directorId;
	}

	public void setDirectorId(String directorId) {
		this.directorId = directorId;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Integer getExpectedDuration() {
		return expectedDuration;
	}

	public void setExpectedDuration(Integer expectedDuration) {
		this.expectedDuration = expectedDuration;
	}

	public Integer getActualDuration() {
		return actualDuration;
	}

	public void setActualDuration(Integer actualDuration) {
		this.actualDuration = actualDuration;
	}

	public String getCompleted() {
		return completed;
	}

	public void setCompleted(String completed) {
		this.completed = completed;
	}

	public String getComment() {
		return comment;
	}

	public List<Topic> getTopics() {
		return topics;
	}

	public void setTopics(List<Topic> topics) {
		this.topics = topics;
	}

	public List<Milestone> getMilestones() {
		return milestones;
	}

	public void setMilestones(List<Milestone> milestones) {
		this.milestones = milestones;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
}
