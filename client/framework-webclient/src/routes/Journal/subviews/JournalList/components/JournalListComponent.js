import React, { Component, PropTypes } from 'react';

import ListComponent from 'common/CRUD/components/ListComponent';

import {Button, Icon} from 'antd';

import JournalInspectView from './JournalInspectView';
import JournalEditView from './JournalEditView';

class JournalListComponent extends ListComponent
{
	constructor(props)
	{
		super(props);

		this.columns = 
        [
            {
                title: '编写人',
                dataIndex: 'personnel.personnelName'
            }, 
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

        this.inspectView = JournalInspectView;

        //edit
        this.editViewTabName = '修改项目日志'

        this.editView = JournalEditView;
	}

    getOperationColumn = () =>
    {
        const handleOpenInspect = this.handleOpenInspect;

        return(
        {
            title: '操作',
            width: '8%',
            dataIndex: 'operate',
            render(text, record, index) 
            {
                var props = 
                {
                    item: record
                };

                return( 
                    <div>
                        <a className='btn-inspect' style={{ marginLeft: 8}} onClick={() => handleOpenInspect(props)}><Icon type='info-circle-o' style={{marginRight: 4}}/>查看</a>
                    </div>
                )
            }
        });
    }
}

export default JournalListComponent;