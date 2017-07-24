package com.sinosteel.framework.helpers.hierarchy.domain;

import java.util.List;

import org.springframework.data.repository.NoRepositoryBean;

import com.sinosteel.framework.core.base.repository.BaseRepository;

@NoRepositoryBean
public interface HierarchyRepository<T extends Hierarchy<T>> extends BaseRepository<T> 
{
	List<T> findByParentId(String parentId);
}
