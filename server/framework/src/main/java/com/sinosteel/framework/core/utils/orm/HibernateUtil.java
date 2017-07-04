package com.sinosteel.framework.core.utils.orm;

import javax.persistence.Table;

public class HibernateUtil
{
	public static <T> String getTableName(Class<T> clazz)
	{
        Table annotation = (Table)clazz.getAnnotation(Table.class);
        if(annotation != null)
        {
            return annotation.name();
        }
 
        return null;
    }
}
