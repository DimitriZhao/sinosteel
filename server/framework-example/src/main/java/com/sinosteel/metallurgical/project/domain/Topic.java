package com.sinosteel.metallurgical.project.domain;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.alibaba.fastjson.annotation.JSONField;
import com.sinosteel.framework.core.base.domain.BaseEntity;

@Entity
@Table(name = "TBL_TOPIC")
public class Topic extends BaseEntity
{
	private static final long serialVersionUID = 2823520571030592510L;

	@Column(name = "TOPIC_NAME")
	private String topicName;
	
	@Column(name = "LOCATION")
	private String location;
	
	@Column(name = "START_TIME")
	private String startTime;
	
	@Column(name = "DIRECTOR_ID")
	private String directorId;
	
	@Column(name = "COMMENT")
	private String comment;
	
	@ManyToOne
	@JoinColumn(name = "PROJECT_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	@JSONField(serialize = false, deserialize = false)
	private Project project;

	@Transient
	private String projectId;
	
	public String getTopicName() {
		return topicName;
	}

	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getDirectorId() {
		return directorId;
	}

	public void setDirectorId(String directorId) {
		this.directorId = directorId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getProjectId() {
		return this.project.getId();
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
}
