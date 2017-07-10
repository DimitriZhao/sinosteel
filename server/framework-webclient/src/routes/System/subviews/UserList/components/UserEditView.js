import React, {Component, PropTypes} from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;

import QuerySelect from 'components/QuerySelect/QuerySelect.js';

import SubEditView from 'common/basic/components/subComponents/SubEditView';

import OrganizationTreeContainer from 'routes/System/containers/OrganizationTreeContainer';

import {getAllRolesService} from 'services';

export default class UserEditView extends SubEditView
{
	constructor(props)
	{
		super(props);

		this.organizationIds = [];
	}

	handleInitValues = (initValues) =>
	{
		//roleIds
		const roles = initValues.roles;
		if(roles)
		{
			initValues['roleIds'] = roles.map(role =>
			{
				return role.id
			});
		}
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
	            		<Input style={{width: width}}/>
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
			        	<QuerySelect style={{width: width}} queryPath={getAllRolesService} valueIndex='id' textIndex='roleName' multiple/>
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
	            	<OrganizationTreeContainer checkable setCheckedKeys={this.setOrganizationIds} checkedKeys={this.initValues.organizationIds}/>
        		</FormItem>
	        </Row>
	    );

        return this.renderForm(formItems);
	}
}