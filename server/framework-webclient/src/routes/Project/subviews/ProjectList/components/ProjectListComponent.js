import React, { Component, PropTypes } from 'react';

import ListComponent from 'common/basic/components/ListComponent';

import ProjectInspectView from './ProjectInspectView';
import ProjectEditView from './ProjectEditView';

import {deleteProjectService} from 'services'; 

class ProjectListComponent extends ListComponent
{
	constructor(props)
	{
		super(props);

		this.columns = 
        [
            {
                title: '项目名称',
                dataIndex: 'projectName'
            }, 
            {
                title: '项目地点',
                dataIndex: 'location',
            }, 
            {
                title: '开始时间',
                dataIndex: 'startTime',
            }, 
            {
                title: '预计工期（月）',
                dataIndex: 'expectedDuration',
            }, 
            {
                title: '是否完成',
                dataIndex: 'completed',
                render: (text) =>
                {
                    if(text == '1')
                    {
                        return '已完成';
                    }
                    else
                    {
                        return '未完成';
                    }
                }
            }, 
            {
                title: '实际工期（月）',
                dataIndex: 'actualDuration',
            }, 
            {
                title: '备注',
                dataIndex: 'comment',
            }
        ];

        //inspect
        this.inspectViewTabName = '查看项目';

        this.inspectView = ProjectInspectView;

        //edit
        this.editViewTabName = '修改项目'

        this.editView = ProjectEditView;

        //delete
        this.deletePath = deleteProjectService;
	}
}

export default ProjectListComponent;