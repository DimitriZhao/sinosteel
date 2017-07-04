import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Upload } from 'antd';
import FormUpload from 'components/FormUpload/FormUpload.js';
const FormItem = Form.Item;
const Option = Select.Option;

import AddView from 'common/CRUD/components/AddView';

export default class JournalAddView extends AddView
{
    constructor(props)
    {
        super(props);

        this.addButtonName = "新增项目日志", //“新增”按钮的名称
        this.addPath = '' //负责处理新增命令的url
    }

    render()
    {
    	const formItems = [];
    	const { getFieldDecorator } = this.props.form;

		const formItemLayout = 
		{
  			labelCol: { span: 6 },
  			wrapperCol: { span: 11 },
		};

        formItems.push(
    	    <Row key='0'>
  				<Col span={8}>
			        <FormItem
			          	{...formItemLayout}
			          	label="编写时间"
			        >
			        	{getFieldDecorator('writeTime', {

                    	})(
		            		<DatePicker />
		            	)}
	        		</FormItem>
	        	</Col>
	        	<Col span={8}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="地点"
	        		>
	        			{getFieldDecorator('location', {

	        			})(
	            			<Input />
	            		)}
	        		</FormItem>
	        	</Col>
	        </Row>
        );


        formItems.push(
    	    <Row key='1'>
  				<Col span={8}>
			        <FormItem
			          	{...formItemLayout}
			          	label="项目名称"
			        >
			        	{getFieldDecorator('projectId', {

	        			})(
		            		<Input />
		            	)}
	        		</FormItem>
	        	</Col>
	        	<Col span={8}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="课题"
	        		>
	        			{getFieldDecorator('topicId', {

	        			})(
				        	<Input />
				        )}
	        		</FormItem>
	        	</Col>
	        </Row>
        );


        formItems.push(
    	    <Row key='2'>
		        <FormItem
        		{
        			...
        			{
        				labelCol: { span: 2 },
						wrapperCol: { span: 20 },
        			}	
        		}
          			label="概述"
        		>
		        	{getFieldDecorator('summary', {

        			})(
	            		<Input type="textarea" rows={4} />
	            	)}
        		</FormItem>
	        </Row>
        );

        formItems.push(
		    <Row key='3'>
        		<FormItem
        		{
        			...
        			{
        				labelCol: { span: 2 },
						wrapperCol: { span: 20 },
        			}	
        		}
          			label="详细内容"
        		>
        			{getFieldDecorator('specification', {

        			})(
			       		<Input type="textarea" rows={8} />
			       	)} 
        		</FormItem>
	    	</Row>
    	);

		formItems.push(
		    <Row key='4'>
	    		<FormItem
        		{
        			...
        			{
        				labelCol: { span: 2 },
						wrapperCol: { span: 20 },
        			}	
        		}
          			label="附件上传"
        		>
	    			{getFieldDecorator('resources', {

	        		})(
	        			<FormUpload />
	        		)}
	    		</FormItem>
	    	</Row>
    	);

		return this.renderForm(formItems);
    }
}