package com.sinosteel.framework.helpers.file.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import com.alibaba.fastjson.annotation.JSONField;
import com.sinosteel.framework.core.base.domain.BaseEntity;

@Entity
@Table(name = "TBL_SYS_FILE")
@Inheritance(strategy = InheritanceType.JOINED)
public class File extends BaseEntity
{
	private static final long serialVersionUID = 8800607727978935751L;

	@Column(name = "FILE_NAME")
	private String fileName;
	
	@Column(name = "FILE_PATH")
	@JSONField(serialize = false)
	private String filePath;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
}
