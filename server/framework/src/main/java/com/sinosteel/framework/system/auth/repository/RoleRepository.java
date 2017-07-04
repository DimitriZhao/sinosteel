package com.sinosteel.framework.system.auth.repository;

import org.springframework.stereotype.Repository;

import com.sinosteel.framework.core.base.repository.BaseRepository;
import com.sinosteel.framework.system.auth.domain.Role;

@Repository
public interface RoleRepository extends BaseRepository<Role>
{

}
