package com.sinosteel.framework.system.basic.domain;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.alibaba.fastjson.annotation.JSONField;
import com.sinosteel.framework.core.base.domain.BaseEntity;
import com.sinosteel.framework.system.basic.domain.Menu;

@Entity
@Table(name = "TBL_SYS_FUNCTION")
public class Function extends BaseEntity
{
	private static final long serialVersionUID = -5461914450646641917L;
	
	@Column(name = "FUNCTION_PATH")
	@JSONField(serialize = false)
	private String functionPath;
	
	@Column(name = "FUNCTION_STRING")
	private String functionString;
	
	@ManyToOne
	@JoinColumn(name = "MENU_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	@JSONField(serialize = false)
	private Menu menu;

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	public String getFunctionPath() {
		return functionPath;
	}

	public void setFunctionPath(String functionPath) {
		this.functionPath = functionPath;
	}

	public String getFunctionString() {
		return functionString;
	}

	public void setFunctionString(String functionString) {
		this.functionString = functionString;
	}
}
