package com.sinosteel.metallurgical.journal.domain;

import java.sql.Blob;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.alibaba.fastjson.annotation.JSONField;
import com.sinosteel.framework.core.base.domain.BaseEntity;
import com.sinosteel.framework.utils.blob.BlobUtil;
import com.sinosteel.metallurgical.personnel.domain.Personnel;

@Entity
@Table(name = "TBL_JOURNAL")
public class Journal extends BaseEntity
{
	private static final long serialVersionUID = -4467478181779740520L;
	
	@Column(name = "WRITE_TIME")
	private String writeTime;
	
	@Column(name = "LOCATION")
	private String location;
	
	@Column(name = "SUMMARY")
	private String summary;
	
	@Column(name = "SPECIFICATION")
	private Blob specification;	
	
	@Column(name = "TOPIC_ID")
	@JSONField(deserialize = false)
	private String topicId;
	
	@Column(name = "PROJECT_ID")
	private String projectId;
	
	@Transient
	private String topicName;
	
	@Transient
	private String projectName;
	
	@ManyToOne
	@JoinColumn(name = "PERSONNEL_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	private Personnel personnel;
	
	@OneToMany
	@JoinColumn(name = "JOURNAL_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	@JSONField(deserialize = false)
	private List<JournalResource> resources;

	public String getWriteTime() {
		return writeTime;
	}

	public void setWriteTime(String writeTime) {
		this.writeTime = writeTime;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public Personnel getPersonnel() {
		return personnel;
	}

	public void setPersonnel(Personnel personnel) {
		this.personnel = personnel;
	}

	public List<JournalResource> getResources() {
		return resources;
	}

	public void setResources(List<JournalResource> resources) {
		this.resources = resources;
	}

	public String getSpecification()
	{
		try
		{
			return specification == null ? "" : BlobUtil.blobToString(specification);
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
			return null;
		}
	}

	public void setSpecification(Blob specification) {
		this.specification = specification;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getTopicId() {
		return topicId;
	}

	public void setTopicId(String topicId) {
		this.topicId = topicId;
	}

	public String getTopicName() {
		return topicName;
	}

	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
}
