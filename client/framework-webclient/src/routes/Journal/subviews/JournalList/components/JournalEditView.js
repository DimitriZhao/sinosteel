import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import EditView from 'common/CRUD/components/EditView';
import moment from 'moment';

export default class JournalEditView extends EditView
{
    constructor(props)
    {
        super(props);

        this.editButtonName = "完成修改", //“新增”按钮的名称
        this.editPath = '' //负责处理新增命令的url
        this.initValues = 
        {
        	...this.props.item
        };

        this.initValues.startTime = moment(this.initValues.startTime, 'YYYY-MM-DD');
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
			          	label="项目名称"
			        >
			        	{getFieldDecorator('projectName', {

                    	})(
		            		<Input />
		            	)}
	        		</FormItem>
	        	</Col>
	        	<Col span={8}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="开始时间"
	        		>
	        			{getFieldDecorator('startTime', {

	        			})(
	            			<DatePicker />
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
			          	label="项目地点"
			        >
			        	{getFieldDecorator('location', {

	        			})(
		            		<Input />
		            	)}
	        		</FormItem>
	        	</Col>
	        	<Col span={8}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="负责人"
	        		>
	        			{getFieldDecorator('directorId', {

	        			})(
				        	<Input />
				        )}
	        		</FormItem>
	        	</Col>
	        </Row>
        );


        formItems.push(
    	    <Row key='2'>
  				<Col span={8}>
			        <FormItem
			          	{...formItemLayout}
			          	label="预计工期"
			        >
			        	{getFieldDecorator('expectedDuration', {

	        			})(
		            		<InputNumber style={{width: 160}}/>
		            	)} 月
	        		</FormItem>
	        	</Col>
	        	<Col span={8}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="实际工期"
	        		>
	        			{getFieldDecorator('actualDuration', {

	        			})(
				       		<InputNumber style={{width: 160}}/>
				       	)} 月
	        		</FormItem>
	        	</Col>
	        	<Col span={8}>
	        		<FormItem
	          			{...formItemLayout}
	          			label="是否已完成"
	        		>
	        			{getFieldDecorator('completed', {

	        			})(
		            		<Select style={{width: 160}}>
		            			<Option value="true">已完成</Option>
	    						<Option value="false">未完成</Option>
		            		</Select>
		            	)}
	        		</FormItem>
	        	</Col>
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