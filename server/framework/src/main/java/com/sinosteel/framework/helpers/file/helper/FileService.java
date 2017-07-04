package com.sinosteel.framework.helpers.file.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.helpers.file.domain.File;
import com.sinosteel.framework.helpers.file.domain.FileRepository;

@Service
public class FileService extends BaseService<File>
{
	@Autowired
	private FileRepository fileRepository;
}
