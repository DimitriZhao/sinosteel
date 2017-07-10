import React, { Component, PropTypes } from 'react';

import ListComponent from 'common/basic/components/ListComponent';

import RoleInspectView from './RoleInspectView';
import RoleEditView from './RoleEditView';

import {deleteRoleService} from 'services'; 

class RoleListComponent extends ListComponent
{
	constructor(props)
	{
		super(props);
        
		this.columns = 
        [
            {
                title: '角色名称',
                dataIndex: 'roleName'
            }, 
            {
                title: '角色代码',
                dataIndex: 'roleString',
            }, 
            {
                title: '创建时间',
                dataIndex: 'createdTime',
            },  
            {
                title: '角色描述',
                dataIndex: 'description',
            }
        ];

        //inspect
        this.inspectViewTabName = '查看角色信息';

        this.inspectView = RoleInspectView;
        this.inspect = false;

        //edit
        this.editViewTabName = '修改角色信息'

        this.editView = RoleEditView;

        //delete
        this.deletePath = deleteRoleService;
	}
}

export default RoleListComponent;