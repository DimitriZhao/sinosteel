import React, {Component, PropTypes} from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;

import SubAddView from 'common/basic/components/subComponents/SubAddView';

import moment from 'moment';

export default class TopicAddView extends SubAddView
{
	constructor(props)
	{
		super(props);
	}

	handleValues = (values) =>
    {
    	//startTime
    	let date = values['startTime'];
        if(date instanceof moment)
        {
            values['startTime'] = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
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
  				<Col span={12}>
			        <FormItem
			          	{...formItemLayout}
			          	label="课题名称"
			        >
			        	{getFieldDecorator('topicName', {

                    	})(
		            		<Input style={{width: width}}/>
		            	)}
	        		</FormItem>
	        	</Col>
	        	<Col span={12}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="开始时间"
	        		>
	        			{getFieldDecorator('startTime', {

	        			})(
	            			<DatePicker style={{width: width}}/>
	            		)}
	        		</FormItem>
	        	</Col>
	        </Row>
	    );

	    formItems.push(
	        <Row key='1'>
  				<Col span={12}>
			        <FormItem
			          	{...formItemLayout}
			          	label="课题地点"
			        >
			        	{getFieldDecorator('location', {

	        			})(
		            		<Input style={{width: width}}/>
		            	)}
	        		</FormItem>
	        	</Col>
	        	<Col span={12}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="负责人"
	        		>
	        			{getFieldDecorator('directorId', {

	        			})(
				        	<Input style={{width: width}}/>
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
	      			label="备注"
	    		>
	    			{getFieldDecorator('comment', {

	        		})(
	        			<Input type="textarea" rows={8} />
	        		)}
	    		</FormItem>
	    	</Row>
        );

        return this.renderForm(formItems);
	}
}