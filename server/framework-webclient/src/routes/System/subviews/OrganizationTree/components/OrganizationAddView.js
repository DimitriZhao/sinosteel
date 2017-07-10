import React, {Component, PropTypes} from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;

import QuerySelect from 'components/QuerySelect/QuerySelect.js';

import SubAddView from 'common/basic/components/subComponents/SubAddView';

import {queryAllUsersService} from 'services';

export default class OrganizationAddView extends SubAddView
{
	constructor(props)
	{
		super(props);
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
  				<Col span={12}>
			        <FormItem
			          	{...formItemLayout}
			          	label="组织名称"
			        >
			        	{getFieldDecorator('organizationName', {

                    	})(
		            		<Input style={{width: width}}/>
		            	)}
	        		</FormItem>
	        	</Col>
	        	<Col span={12}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="组织负责人"
	        		>
	        			{getFieldDecorator('principalId', {

	        			})(
	            			<QuerySelect queryPath={queryAllUsersService} valueIndex='id' textIndex='name'/>
	            		)}
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
	    			{getFieldDecorator('description', {

	        		})(
	        			<Input type="textarea" rows={8} />
	        		)}
	    		</FormItem>
	    	</Row>
        );

        return this.renderForm(formItems);
	}
}