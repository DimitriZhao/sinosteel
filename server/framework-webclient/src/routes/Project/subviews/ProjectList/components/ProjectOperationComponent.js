import React, { Component, PropTypes } from 'react';

import OperationComponent from 'common/basic/components/OperationComponent';
import ProjectAddView from './ProjectAddView';

class ProjectOperationComponent extends OperationComponent
{
	constructor(props)
	{
		super(props);

        //add
        this.addViewName = '新增项目'; //打开新增视图“新增”按钮的名称
        this.addView = ProjectAddView; //负责处理新增命令的视图

        //batch delete
        this.deletePath = ''; //负责处理删除命令的url
	}
}

export default ProjectOperationComponent;