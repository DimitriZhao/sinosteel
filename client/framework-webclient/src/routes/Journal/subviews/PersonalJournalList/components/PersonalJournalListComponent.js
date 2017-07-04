import React, { Component, PropTypes } from 'react';

import ListComponent from 'common/CRUD/components/ListComponent';

import PersonalJournalInspectView from './PersonalJournalInspectView';
import PersonalJournalEditView from './PersonalJournalEditView';

import {deleteJournalService} from 'services';

class PersonalJournalListComponent extends ListComponent
{
	constructor(props)
	{
		super(props);
        
		this.columns = 
        [
            {
                title: '编写时间',
                dataIndex: 'writeTime'
            }, 
            {
                title: '地点',
                dataIndex: 'location',
            }, 
            {
                title: '项目',
                dataIndex: 'projectName',
            }, 
            {
                title: '课题',
                dataIndex: 'topicName',
            }
        ];

        //inspect
        this.inspectViewTabName = '查看项目日志';

        this.inspectView = PersonalJournalInspectView;

        //edit
        this.editViewTabName = '修改项目日志'

        this.editView = PersonalJournalEditView;

        //delete
        this.deletePath = deleteJournalService;

        this.successMsg = '删除项目日志成功';
        this.errorMsg = '删除项目日志失败';
        this.warningMsg = '服务器错误';
	}
}

export default PersonalJournalListComponent;