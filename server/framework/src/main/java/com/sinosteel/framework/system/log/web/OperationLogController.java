package com.sinosteel.framework.system.log.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.sinosteel.framework.core.base.web.BaseController;
import com.sinosteel.framework.system.log.service.OperationLogService;

@RestController
public class OperationLogController extends BaseController
{
	@Autowired
	private OperationLogService operationLogService;
}
