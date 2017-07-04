package com.sinosteel.framework.helpers.file.helper;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.base.repository.BaseRepository;
import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.core.utils.spring.SpringUtil;
import com.sinosteel.framework.helpers.file.domain.File;
import com.sinosteel.framework.utils.file.FileUtil;

/*com.sinosteel.framework.helpers.file*/
public class FileHelper
{
	public static <T extends File> T saveFile(MultipartFile file, String filePath, Class<T> clazz) throws Exception
	{
		java.io.File dir = new java.io.File(filePath);
		
		if(!dir.exists())
		{
			dir.mkdirs();
		}
		
		java.io.File destinationFile = new java.io.File(filePath + "/" + file.getOriginalFilename());	
		file.transferTo(destinationFile);
		
		T resource = clazz.newInstance();
		resource.setId(UUID.randomUUID().toString());
		resource.setFileName(destinationFile.getName());
		resource.setFilePath(filePath);
		
		return resource;
	}
	
	public static <T extends File, U extends BaseRepository<T>> void deleteFile(U fileRepository, T file) throws Exception
	{
		String filePath = file.getFilePath();
		String fileName = file.getFileName();
		FileUtil.deleteFile(filePath, fileName);
		
		fileRepository.delete(file.getId());
	}
	
	public static <T extends File, U extends BaseService<T>> void deleteFile(JSONObject params, Class<U> serviceClass) throws Exception
	{
		U fileService = SpringUtil.applicationContext.getBean(serviceClass);
		
		String id = params.getString("id");
		T file = fileService.findEntityById(id);
		
		String filePath = file.getFilePath();
		String fileName = file.getFileName();
		FileUtil.deleteFile(filePath, fileName);
		
		fileService.deleteEntity(file);
	}
	
	public static <T extends File, U extends BaseRepository<T>> void deleteFiles(U fileRepository, List<T> files) throws Exception
	{
		if(files.size() > 0)
		{
			String folderPath = files.get(0).getFilePath();
			
			for(T file : files)
			{
				if(!file.getFilePath().equals(folderPath))
				{
					throw new Exception("Files are not in the same folder");
				}
			}
			
			for(T file : files)
			{
				deleteFile(fileRepository, file);
			}
			
			FileUtil.deleteFolder(folderPath);
		}
	}
}
