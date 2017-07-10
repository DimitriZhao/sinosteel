import React, {Component, PropTypes} from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;

import SubInspectView from 'common/basic/components/subComponents/SubInspectView';

import moment from 'moment';

class TopicInspectView extends SubInspectView
{
	constructor(props)
	{
		super(props);
	}

    render()
    {
    	const topic = this.itemClone;

    	const formItems = [];
		
		const formItemLayout = 
		{
  			labelCol: { span: 6 },
  			wrapperCol: { span: 15 },
		};

        formItems.push(
    	    <Row key='0'>
  				<Col span={12}>
			        <FormItem
			          	{...formItemLayout}
			          	label="课题名称"
			        >
			        	{topic.topicName}
	        		</FormItem>
	        	</Col>
	        	<Col span={12}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="开始时间"
	        		>
	        			{topic.startTime}
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
			        	{topic.location}
	        		</FormItem>
	        	</Col>
	        	<Col span={12}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="负责人"
	        		>
	        			{topic.directorId}
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
	    			{topic.comment}
	    		</FormItem>
	    	</Row>
        );

        return this.renderForm(formItems);
    }
}

export default TopicInspectView;