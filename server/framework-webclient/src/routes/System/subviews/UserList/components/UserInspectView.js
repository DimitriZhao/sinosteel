import React, {Component, PropTypes} from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;

import QuerySelect from 'components/QuerySelect/QuerySelect.js';

import SubInspectView from 'common/basic/components/subComponents/SubInspectView';

import OrganizationTreeContainer from 'routes/System/containers/OrganizationTreeContainer';

import {getAllRolesService} from 'services';

export default class UserInspectView extends SubInspectView
{
	constructor(props)
	{
		super(props);

		this.organizationIds = [];
	}

	render()
	{
		const user = this.itemClone;

		const formItems = [];
		const { getFieldDecorator } = this.props.form;
		
		const formItemLayout = 
		{
  			labelCol: { span: 6 },
  			wrapperCol: { span: 15 },
		};

		const width = '100%';

        formItems.push(
    	    <Row key='0'>
		        <FormItem
		          	{...formItemLayout}
		          	label="用户名"
		        >
		        	{user.username}
        		</FormItem>
	        </Row>
	    );

	    formItems.push(
	    	<Row key='1'>
		    	<FormItem
		          	{...formItemLayout}
		          	label="角色"
		        >
			        <QuerySelect disabled value={user.roleIds} style={{width: width}} queryPath={getAllRolesService} valueIndex='id' textIndex='roleName' multiple/>
	    		</FormItem>
	    	</Row>
	    );

	    formItems.push(
    	    <Row key='2'>
		        <FormItem
		          	{...formItemLayout}
		          	label="所属组织"
		        >
	            	<OrganizationTreeContainer checkable disabled checkedKeys={user.organizationIds}/>
        		</FormItem>
	        </Row>
	    );

        return this.renderForm(formItems);
	}
}