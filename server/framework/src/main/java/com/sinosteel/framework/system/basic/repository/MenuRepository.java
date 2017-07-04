package com.sinosteel.framework.system.basic.repository;

import org.springframework.stereotype.Repository;

import com.sinosteel.framework.helpers.hierarchy.domain.HierarchyRepository;
import com.sinosteel.framework.system.basic.domain.Menu;

@Repository
public interface MenuRepository extends HierarchyRepository<Menu>
{

}
