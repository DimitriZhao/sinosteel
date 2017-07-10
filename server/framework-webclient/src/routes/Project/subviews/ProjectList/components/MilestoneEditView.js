import React, {Component, PropTypes} from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;

import moment from 'moment';

import SubEditView from 'common/basic/components/subComponents/SubEditView';

export default class MilestoneEditView extends SubEditView
{
	constructor(props)
	{
		super(props);
	}

	handleInitValues = (initValues) =>
    {
    	//milestoneTime
    	initValues.milestoneTime = moment(initValues.milestoneTime, 'YYYY-MM-DD');
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