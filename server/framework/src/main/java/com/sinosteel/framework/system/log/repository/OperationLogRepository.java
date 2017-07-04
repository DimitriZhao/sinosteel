package com.sinosteel.framework.system.log.repository;

import org.springframework.stereotype.Repository;

import com.sinosteel.framework.core.base.repository.BaseRepository;
import com.sinosteel.framework.system.log.domain.OperationLog;

@Repository
public interface OperationLogRepository extends BaseRepository<OperationLog>
{

}
