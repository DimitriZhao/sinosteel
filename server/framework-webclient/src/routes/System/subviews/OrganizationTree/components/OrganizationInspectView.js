import React, {Component, PropTypes} from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;

import QuerySelect from 'components/QuerySelect/QuerySelect.js';

import SubInspectView from 'common/basic/components/subComponents/SubInspectView';

import {queryAllUsersService} from 'services';

export default class OrganizationInspectView extends SubInspectView
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const organization = this.itemClone;

		const formItems = [];
		
		const formItemLayout = 
		{
  			labelCol: { span: 6 },
  			wrapperCol: { span: 15 },
		};

		const width = '100%';

        formItems.push(
    	    <Row key='0'>
  				<Col span={12}>
			        <FormItem
			          	{...formItemLayout}
			          	label="组织名称"
			        >
			        	{organization.organizationName}
	        		</FormItem>
	        	</Col>
	        	<Col span={12}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="组织负责人"
	        		>
	        			{organization.principalName}
	        		</FormItem>
	        	</Col>
	        </Row>
	    );

		formItems.push(
	        <Row key='4'>
	    		<FormItem
	    		{
	    			...
	    			{
	    				labelCol: { span: 3 },
						wrapperCol: { span: 20 },
	    			}	
	    		}
	      			label="描述"
	    		>
	    			{organization.description}
	    		</FormItem>
	    	</Row>
        );

        return this.renderForm(formItems);
	}
}