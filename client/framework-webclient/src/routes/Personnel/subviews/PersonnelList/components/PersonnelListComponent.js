import React, { Component, PropTypes } from 'react';

import ListComponent from 'common/CRUD/components/ListComponent';

import PersonnelInspectView from './PersonnelInspectView';
import PersonnelEditView from './PersonnelEditView';

import {deletePersonnelService} from 'services'; 

class PersonnelListComponent extends ListComponent
{
	constructor(props)
	{
		super(props);
        
		this.columns = 
        [
            {
                title: '姓名',
                dataIndex: 'personnelName'
            }, 
            {
                title: '性别',
                dataIndex: 'gender',
                render(text)
                {
                    if(text == 'male')
                    {
                        return '男';
                    }
                    else if(text == 'female')
                    {
                        return '女';
                    }
                }
            }, 
            {
                title: '出生日期',
                dataIndex: 'birthday',
            }, 
            {
                title: '学历',
                dataIndex: 'scholar',
                render(text)
                {
                    if(text == 'bachelor')
                    {
                        return '学士';
                    }
                    else if(text == 'master')
                    {
                        return '硕士';
                    }
                    else if(text == 'doctor')
                    {
                        return '博士';
                    }
                }
            },  
            {
                title: '毕业院校',
                dataIndex: 'graduateFrom',
            }, 
            {
                title: '毕业时间',
                dataIndex: 'graduateTime',
            }, 
            {
                title: '参加工作时间',
                dataIndex: 'workStartTime',
            }
        ];

        //inspect
        this.inspectViewTabName = '查看员工信息';

        this.inspectView = PersonnelInspectView;

        //edit
        this.editViewTabName = '修改员工信息'

        this.editView = PersonnelEditView;

        //delete
        this.deletePath = deletePersonnelService;
	}
}

export default PersonnelListComponent;