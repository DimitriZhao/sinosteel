import React, { Component, PropTypes } from 'react';

import OperationComponent from 'common/basic/components/OperationComponent';
import RoleAddView from './RoleAddView';

class RoleOperationComponent extends OperationComponent
{
    constructor(props)
    {
    	super(props);

        //add
        this.addViewName = '新增角色'; //打开新增视图“新增”按钮的名称
        this.addView = RoleAddView; //负责处理新增命令的视图

        //batch delete
        this.deletePath = ''; //负责处理删除命令的url
    }
}

export default RoleOperationComponent;