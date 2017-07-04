package com.sinosteel.framework.system.basic.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.sinosteel.framework.core.base.service.BaseService;
import com.sinosteel.framework.helpers.hierarchy.helper.HierarchyHelper;
import com.sinosteel.framework.system.basic.domain.Function;
import com.sinosteel.framework.system.basic.domain.Menu;
import com.sinosteel.framework.system.basic.domain.Module;
import com.sinosteel.framework.system.basic.repository.FunctionRepository;
import com.sinosteel.framework.system.basic.repository.MenuRepository;
import com.sinosteel.framework.utils.json.JsonUtil;

@Service
public class FunctionService extends BaseService<Function>
{
	@Autowired
	private FunctionRepository functionRepository;
	
	@Autowired
	private MenuRepository menuRepository;
	
	public JSONArray getAllFunctionsHierarchies()
	{
		List<Function> allFunctions = functionRepository.findAll();
		
		List<Menu> leafMenus = new ArrayList<Menu>();
		for(Function function : allFunctions)
		{
			Menu menu = function.getMenu();
			
			if(!leafMenus.contains(menu))
			{
				leafMenus.add(menu);
			}
		}
		
		List<Menu> menuHierarchies = HierarchyHelper.getHierarchiesBottomUp(leafMenus, menuRepository);
		
		List<Module> modules = new ArrayList<Module>();
		for(Menu menuHierarchy : menuHierarchies)
		{
			Module module = menuHierarchy.getModule();

			if(!modules.contains(module))
			{
				module.setMenus(new ArrayList<Menu>());
				module.getMenus().add(menuHierarchy);
				modules.add(module);
			}
			else
			{
				module = modules.get(modules.indexOf(module));
				module.getMenus().add(menuHierarchy);
			}
		}
		
		return JsonUtil.toJSONArray(modules);
	}
	
	public JSONArray getFunctionsHierarchies(List<Function> functions)
	{	
		List<Menu> leafMenus = new ArrayList<Menu>();
		for(Function function : functions)
		{
			Menu menu = function.getMenu();
			
			if(!leafMenus.contains(menu))
			{
				leafMenus.add(menu);
			}
		}

		List<Menu> menuHierarchies = HierarchyHelper.getHierarchiesBottomUp(leafMenus, menuRepository);
		
		List<Module> modules = new ArrayList<Module>();
		for(Menu menuHierarchy : menuHierarchies)
		{
			Module module = menuHierarchy.getModule();

			if(!modules.contains(module))
			{
				module.setMenus(new ArrayList<Menu>());
				module.getMenus().add(menuHierarchy);
				modules.add(module);
			}
			else
			{
				module = modules.get(modules.indexOf(module));
				module.getMenus().add(menuHierarchy);
			}
		}

		JSONArray modulesJsonArray = JsonUtil.toJSONArray(modules);
		return modulesJsonArray;
	}
}
