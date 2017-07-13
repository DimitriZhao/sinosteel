package com.sinosteel.metallurgical.knowledge.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.sinosteel.framework.helpers.file.domain.File;

@Entity
@Table(name = "TBL_STANDARD_RESOURCE")
public class StandardResource extends File
{
	private static final long serialVersionUID = 1L;
}
