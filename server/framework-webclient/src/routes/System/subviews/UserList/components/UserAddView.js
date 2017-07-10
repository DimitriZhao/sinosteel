import React, {Component, PropTypes} from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;

import QuerySelect from 'components/QuerySelect/QuerySelect.js';

import SubAddView from 'common/basic/components/subComponents/SubAddView';

import OrganizationTreeContainer from 'routes/System/containers/OrganizationTreeContainer';

import {getAllRolesService} from 'services';

export default class UserAddView extends SubAddView
{
	constructor(props)
	{
		super(props);

		this.organizationIds = [];
	}

	handleValues = (values) =>
	{
		//organizations
		values['organizationIds'] = this.organizationIds;
	}

	setOrganizationIds = (organizationIds) =>
	{
		Object.assign(this.organizationIds, organizationIds);
	}

	render()
	{
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
		        	{getFieldDecorator('username', {

                	})(
	            		<Input />
	            	)}
        		</FormItem>
	        </Row>
	    );

	    formItems.push(
	    	<Row key='1'>
	    		<FormItem
    				{...formItemLayout}
          			label="角色"
        		>
        			{getFieldDecorator('roleIds', {

        			})(
			        	<QuerySelect queryPath={getAllRolesService} valueIndex='id' textIndex='roleName' multiple />
			        )}
        		</FormItem>
	    	</Row>
	    );

	    formItems.push(
    	    <Row key='2'>
		        <FormItem
		          	{...formItemLayout}
		          	label="所属组织"
		        >
	            	<OrganizationTreeContainer checkable setCheckedKeys={this.setOrganizationIds} />
        		</FormItem>
	        </Row>
	    );

        return this.renderForm(formItems);
	}
}