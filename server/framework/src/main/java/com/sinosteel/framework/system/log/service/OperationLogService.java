package com.sinosteel.framework.system.log.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.system.log.domain.OperationLog;
import com.sinosteel.framework.system.log.repository.OperationLogRepository;

@Service
public class OperationLogService extends BaseService<OperationLog>
{
	@Autowired
	private OperationLogRepository operationLogRepository;
}
