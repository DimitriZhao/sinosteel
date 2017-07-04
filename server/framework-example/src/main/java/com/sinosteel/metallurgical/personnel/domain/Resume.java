package com.sinosteel.metallurgical.personnel.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.sinosteel.framework.helpers.file.domain.File;

@Entity
@Table(name = "TBL_RESUME")
public class Resume extends File
{
	private static final long serialVersionUID = 4492463058917829775L;
}
