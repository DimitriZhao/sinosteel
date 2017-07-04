package com.sinosteel.framework.utils.excel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.base.domain.BaseEntity;
import com.sinosteel.framework.utils.json.JsonUtil;

public class ExcelUtil 
{
	public static JSONArray importExcel(MultipartFile file) throws Exception
	{
		HSSFWorkbook workbook = new HSSFWorkbook(file.getInputStream());
		
		try
		{
			HSSFSheet sheet = workbook.getSheetAt(0);
			
			int rowNum = sheet.getLastRowNum();
			if(rowNum < 2)
			{
				throw new Exception("Num of rows less than 2");
			}
			
			HSSFRow headerRow = sheet.getRow(0);
			int headerLength = headerRow.getLastCellNum();
			String[] headers = new String[headerLength];
			for(int i = 0; i < headerLength; i++)
			{
				headers[i] = headerRow.getCell(i).getStringCellValue();
			}
			
			JSONArray dataJsonArray = new JSONArray();
			for(int i = 1; i < rowNum; i++)
			{
				JSONObject dataJson = new JSONObject();
				
				HSSFRow row = sheet.getRow(i);
				for(int j = 0; j < headerLength; j++)
				{
					String value = row.getCell(j).getStringCellValue();
					
					dataJson.put(headers[j], value);
				}
				
				dataJsonArray.add(dataJson);
			}

			return dataJsonArray;
		}
		finally
		{
			workbook.close();
		}
	}
	
	public static <T extends BaseEntity> List<T> importExcel(MultipartFile file, Class<T> clazz) throws Exception
	{
		JSONArray dataJsonArray = importExcel(file);
		return JsonUtil.toObjects(dataJsonArray, clazz);
	}
	
	public static <T extends BaseEntity> List<T> importExcel(MultipartFile file, Class<T> clazz, HashMap<String, String> propsMap) throws Exception
	{
		HSSFWorkbook workbook = new HSSFWorkbook(file.getInputStream());
		
		try
		{
			HSSFSheet sheet = workbook.getSheetAt(0);
			
			int rowNum = sheet.getLastRowNum();
			if(rowNum < 2)
			{
				throw new Exception("Num of rows less than 2");
			}
			
			HSSFRow headerRow = sheet.getRow(0);
			int headerLength = headerRow.getLastCellNum();
			String[] headers = new String[headerLength];
			for(int i = 0; i < headerLength; i++)
			{
				headers[i] = propsMap.get(headerRow.getCell(i).getStringCellValue());
			}
			
			List<T> entities = new ArrayList<T>();
			for(int i = 1; i < rowNum; i++)
			{
				JSONObject dataJson = new JSONObject();
				
				HSSFRow row = sheet.getRow(i);
				for(int j = 0; j < headerLength; j++)
				{
					String value = row.getCell(j).getStringCellValue();
					
					dataJson.put(headers[j], value);
				}
				
				T entity = JSONObject.toJavaObject(dataJson, clazz);
				entities.add(entity);
			}

			return entities;
		}
		finally
		{
			workbook.close();
		}
	}
	
	public static HSSFWorkbook exportExcel(JSONArray dataJsonArray) throws Exception
	{
		HSSFWorkbook workbook = new HSSFWorkbook();
		
		try
		{
			
			HSSFSheet sheet = workbook.createSheet();
			
			if(dataJsonArray.size() == 0)
			{
				return workbook;
			}
			
			HSSFRow headerRow = sheet.createRow(0);
			
			JSONObject headerDataJson = dataJsonArray.getJSONObject(0);
			String[] headers = (String[]) headerDataJson.keySet().toArray();

			for(int j = 0; j < headers.length; j++)
			{
				HSSFCell headerCell = headerRow.createCell(j);
				headerCell.setCellValue(headers[j]);
			}
			
			for(int i = 0; i < dataJsonArray.size(); i++)
			{
				HSSFRow row = sheet.createRow(i + 1);
				
				JSONObject dataJson = dataJsonArray.getJSONObject(i);
				for(int j = 0; i < headers.length; j++)
				{
					HSSFCell cell = row.createCell(j);
					String value = dataJson.getString(headers[j]);
					cell.setCellValue(value);
				}
			}
			
			return workbook;
		}
		finally
		{
			workbook.close();
		}
	}
	
	public static <T extends BaseEntity> HSSFWorkbook exportExcel(JSONArray dataJsonArray, HashMap<String, String> propsMap) throws Exception
	{
		HSSFWorkbook workbook = new HSSFWorkbook();
		
		try
		{
			
			HSSFSheet sheet = workbook.createSheet();
			
			if(dataJsonArray.size() == 0)
			{
				return workbook;
			}
			
			HSSFRow headerRow = sheet.createRow(0);
			
			String[] headers = (String[]) propsMap.keySet().toArray();
			for(int j = 0; j < headers.length; j++)
			{
				HSSFCell headerCell = headerRow.createCell(j);
				headerCell.setCellValue(propsMap.get(headers[j]));
			}
			
			for(int i = 0; i < dataJsonArray.size(); i++)
			{
				HSSFRow row = sheet.createRow(i + 1);
				
				JSONObject dataJson = dataJsonArray.getJSONObject(i);
				for(int j = 0; i < headers.length; j++)
				{
					HSSFCell cell = row.createCell(j);
					String value = dataJson.getString(headers[j]);
					cell.setCellValue(value);
				}
			}
			
			return workbook;
		}
		finally
		{
			workbook.close();
		}
	}
}
