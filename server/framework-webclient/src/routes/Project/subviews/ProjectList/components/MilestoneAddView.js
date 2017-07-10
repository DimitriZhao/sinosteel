import React, {Component, PropTypes} from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;

import SubAddView from 'common/basic/components/subComponents/SubAddView';

import moment from 'moment';

export default class MilestoneAddView extends SubAddView
{
	constructor(props)
	{
		super(props);
	}

	handleValues = (values) =>
    {
    	//milestoneTime
    	let date = values['milestoneTime'];
        if(date instanceof moment)
        {
            values['milestoneTime'] = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        }
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
		          	label="节点名称"
		        >
		        	{getFieldDecorator('milestoneName', {

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
          			label="节点时间"
        		>
        			{getFieldDecorator('milestoneTime', {

        			})(
            			<DatePicker style={{width: width}}/>
            		)}
        		</FormItem>
	        </Row>
		);
		
        return this.renderForm(formItems);
	}
}