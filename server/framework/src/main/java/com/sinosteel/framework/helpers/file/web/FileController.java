package com.sinosteel.framework.helpers.file.web;

import javax.servlet.http.HttpServletResponse;

import org.aspectj.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sinosteel.framework.core.base.web.BaseController;
import com.sinosteel.framework.helpers.file.domain.File;
import com.sinosteel.framework.helpers.file.helper.FileService;

@RestController
public class FileController extends BaseController
{	
	@Autowired
	private FileService fileService;
	
	@RequestMapping(value = "/downloadFile", method = RequestMethod.GET)
	public ResponseEntity<byte[]> downloadFile(@RequestParam(required = true)String id, HttpServletResponse response)
	{
		HttpHeaders headers = new HttpHeaders();
		
		try
		{
			File file = fileService.findEntityById(id);
			
			java.io.File targetFile = new java.io.File(file.getFilePath() + "/" + file.getFileName());
			byte[] stream = FileUtil.readAsByteArray(targetFile);
			
			String dfileName = new String(file.getFileName().getBytes("gb2312"), "iso8859-1");  
 
	        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);  
	        headers.setContentDispositionFormData("attachment", dfileName);  
	        return new ResponseEntity<byte[]>(stream, headers, HttpStatus.CREATED);  
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			headers.setContentType(MediaType.TEXT_PLAIN);
			return new ResponseEntity<byte[]>("SERVER ERROR".getBytes(), headers, HttpStatus.CREATED);  
		}
	}
}