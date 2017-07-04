package com.sinosteel.metallurgical.journal.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.sinosteel.framework.helpers.file.domain.File;

@Entity
@Table(name = "TBL_JOURNAL_RESOURCE")
public class JournalResource extends File
{
	private static final long serialVersionUID = -8181480907988033293L;
	
	@Column(name = "JOURNAL_ID")
	private String journalId;

	public String getJournalId() {
		return journalId;
	}

	public void setJournalId(String journalId) {
		this.journalId = journalId;
	}
}
