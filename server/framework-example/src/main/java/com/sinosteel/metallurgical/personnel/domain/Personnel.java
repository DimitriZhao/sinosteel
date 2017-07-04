package com.sinosteel.metallurgical.personnel.domain;

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
@Table(name = "TBL_PERSONNEL")
public class Personnel extends BaseEntity
{
	private static final long serialVersionUID = 3458657259600964315L;
	
	@Column(name = "PERSONNEL_NAME")
	private String personnelName;
	
	@Column(name = "GENDER")
	private String gender;
	
	@Column(name = "BIRTHDAY")
	private String birthday;
	
	@Column(name = "SCHOLAR")
	private String scholar;

	@Column(name = "GRADUATE_FROM")
	private String graduateFrom;
	
	@Column(name = "GRADUATE_TIME")
	private String graduateTime;
	
	@Column(name = "WORK_START_TIME")
	private String workStartTime;
	
	@OneToMany
	@JoinColumn(name = "PERSONNEL_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	@JSONField(deserialize = false)
	private List<Resume> resumes;

	public String getPersonnelName() {
		return personnelName;
	}

	public void setPersonnelName(String personnelName)
	{
		super.setName(personnelName);
		this.personnelName = personnelName;
	}

	public String getGraduateFrom() {
		return graduateFrom;
	}

	public void setGraduateFrom(String graduateFrom) {
		this.graduateFrom = graduateFrom;
	}

	public String getGraduateTime() {
		return graduateTime;
	}

	public void setGraduateTime(String graduateTime) {
		this.graduateTime = graduateTime;
	}

	public String getWorkStartTime() {
		return workStartTime;
	}

	public void setWorkStartTime(String workStartTime) {
		this.workStartTime = workStartTime;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getScholar() {
		return scholar;
	}

	public void setScholar(String scholar) {
		this.scholar = scholar;
	}

	public List<Resume> getResumes() {
		return resumes;
	}

	public void setResumes(List<Resume> resumes) {
		this.resumes = resumes;
	}
}
