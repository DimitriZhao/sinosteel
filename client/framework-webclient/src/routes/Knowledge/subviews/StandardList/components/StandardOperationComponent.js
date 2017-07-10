import React, { Component, PropTypes } from 'react';

import OperationComponent from 'common/basic/components/OperationComponent';
import StandardAddView from './StandardAddView';

class StandardOperationComponent extends OperationComponent
{
	constructor(props)
	{
		super(props);

        //add
        this.addViewName = '新增国家标准'; //打开新增视图“新增”按钮的名称
        this.addView = StandardAddView; //负责处理新增命令的视图

        //batch delete
        this.deletePath = ''; //负责处理删除命令的url
	}
}

export default StandardOperationComponent;