package com.sinosteel.framework.utils.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class JdbcUtil 
{
	@Autowired
	private static JdbcTemplate jdbcTemplate;
	
}
