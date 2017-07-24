package com.sinosteel.framework.system.basic.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.alibaba.fastjson.annotation.JSONField;
import com.sinosteel.framework.helpers.hierarchy.domain.Hierarchy;
import com.sinosteel.framework.system.basic.domain.Module;

@Entity
@Table(name = "TBL_SYS_MENU")
public class Menu extends Hierarchy<Menu>
{
	private static final long serialVersionUID = -2328400315682798977L;
	
	@Column(name = "MENU_PATH")
	private String menuPath;
	
	@Column(name = "MENU_ICON")
	private String menuIcon;
	
	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name = "MENU_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	private List<Function> functions;
	
	@ManyToOne
	@JoinColumn(name = "MODULE_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	@JSONField(serialize = false)
	private Module module;

	public String getMenuPath() {
		return menuPath;
	}

	public void setMenuPath(String menuPath) {
		this.menuPath = menuPath;
	}

	public String getMenuIcon() {
		return menuIcon;
	}

	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}

	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	public List<Function> getFunctions() {
		return functions;
	}

	public void setFunctions(List<Function> functions) {
		this.functions = functions;
	}
}
