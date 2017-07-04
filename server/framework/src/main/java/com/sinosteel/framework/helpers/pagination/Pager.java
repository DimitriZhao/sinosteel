package com.sinosteel.framework.helpers.pagination;

import java.io.Serializable;

public class Pager implements Serializable
{
	private static final long serialVersionUID = -7767180418198708899L;

	public int pageSize = 10;
	public int current = 1;
}
