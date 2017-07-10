import React, { Component, PropTypes } from 'react';

import ListComponent from 'common/basic/components/ListComponent';

import StandardInspectView from './StandardInspectView';
import StandardEditView from './StandardEditView';

import {deleteStandardService} from 'services';

class StandardListComponent extends ListComponent
{
	constructor(props)
	{
		super(props);
        
		this.columns = 
        [
            {
                title: '标准名称',
                dataIndex: 'name'
            },
            {
                title: '标准号',
                dataIndex: 'code'
            },
            {
                title: '颁布时间',
                dataIndex: 'issueDate'
            }, 
            {
                title: '状态',
                dataIndex: 'status',
                render(text)
                {
                    if(text == '1')
                    {
                        return '在执行';
                    }
                    else if(text == '0')
                    {
                        return '废止';
                    }
                }
            }, 
            {
                title: '类型',
                dataIndex: 'type',
                render(text)
                {
                    if(text == '0')
                    {
                        return '强制';
                    }
                    else if(text == '1')
                    {
                        return '行业';
                    }
                    else if(text == '2')
                    {
                        return '推荐';
                    }
                }
            }
        ];

        //inspect
        this.inspectViewTabName = '查看国家标准';

        this.inspectView = StandardInspectView;

        //edit
        this.editViewTabName = '修改国家标准'

        this.editView = StandardEditView;

        //delete
        this.deletePath = deleteStandardService;

        this.successMsg = '删除标准成功';
        this.errorMsg = '删除标准失败';
        this.warningMsg = '服务器错误';
	}
}

export default StandardListComponent;