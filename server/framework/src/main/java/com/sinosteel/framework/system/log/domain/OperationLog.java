package com.sinosteel.framework.system.log.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.sinosteel.framework.core.base.domain.BaseEntity;

@Entity
@Table(name = "TBL_SYS_OPERATION_LOG")
public class OperationLog extends BaseEntity
{
	private static final long serialVersionUID = -2820158853327418625L;
	
	@Column(name = "URI")
	private String uri;
	
	@Column(name = "CLIENT")
	private String client;
	
	@Column(name = "USERNAME")
	private String username;
	
	@Column(name = "DATE_TIME")
	private String dateTime;
	
	@Column(name = "PARAMS")
	private String params;
	
	@Column(name = "FILE_NAMES")
	private String fileNames;
	
	@Column(name = "RESPONSE_STATUS")
	private String responseStatus;

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public String getFileNames() {
		return fileNames;
	}

	public void setFileNames(String fileNames) {
		this.fileNames = fileNames;
	}

	public String getResponseStatus() {
		return responseStatus;
	}

	public void setResponseStatus(String responseStatus) {
		this.responseStatus = responseStatus;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}
}
