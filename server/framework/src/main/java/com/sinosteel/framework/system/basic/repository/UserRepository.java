package com.sinosteel.framework.system.basic.repository;

import org.springframework.stereotype.Repository;

import com.sinosteel.framework.core.base.repository.BaseRepository;
import com.sinosteel.framework.system.basic.domain.User;

@Repository
public interface UserRepository extends BaseRepository<User>
{
	User findByUsername(String username);
}
