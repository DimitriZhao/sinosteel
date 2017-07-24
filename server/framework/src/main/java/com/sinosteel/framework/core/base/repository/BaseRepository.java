package com.sinosteel.framework.core.base.repository;

import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Component;

import com.sinosteel.framework.core.base.domain.BaseEntity;
import com.sinosteel.framework.helpers.pagination.PageResult;
import com.sinosteel.framework.helpers.pagination.Pager;

@Component(value = "baseRepository")
@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity> extends JpaRepository<T, String>, JpaSpecificationExecutor<T>, PagingAndSortingRepository<T, String>
{
	boolean support(String modelType);
	
	EntityManager getEntityManager();
	
	<U> List<U> executeSql(String sql, HashMap<String, Object> paramsMap);
	
	int executeSql(String sql);
	
	List<T> executeHql(String hql, HashMap<String, Object> paramsMap);

	<U> List<U> executeHqlIndicatingType(String hql, HashMap<String, Object> paramsMap);
	
	<U> PageResult<U> executeSql(String sql, HashMap<String, Object> paramsMap, Pager pager);
	
	PageResult<T> executeHql(String hql, HashMap<String, Object> paramsMap, Pager pager);
}