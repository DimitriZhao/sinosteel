import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';

import {addProjectService} from 'services'; 

const FormItem = Form.Item;
const Option = Select.Option;

import AddView from 'common/basic/components/AddView';

import MilestonesComponent from './MilestonesComponent';

import TopicListView from './TopicListView';

import moment from 'moment'; 

export default class ProjectAddView extends AddView
{
    constructor(props)
    {
        super(props);

        this.addButtonName = "新增项目"; //“新增”按钮的名称
        this.addPath = addProjectService; //负责处理新增命令的url
    }

    handleValues = (values) =>
    {
    	//startTime
    	let date = values['startTime'];
        if(date)
        {
            values['startTime'] = date.format('YYYY-MM-DD');
        }
    }

    render()
    {
    	const formItems = [];
    	const { getFieldDecorator } = this.props.form;

		const formItemLayout = 
		{
  			labelCol: { span: 6 },
  			wrapperCol: { span: 14 },
		};

		const width = '100%';

        formItems.push(
        	<Card key='0' title='项目基本信息' style={{marginBottom: 20}}> 
	    	    <Row key='0'>
	  				<Col span={12}>
				        <FormItem
				          	{...formItemLayout}
				          	label="项目名称"
				        >
				        	{getFieldDecorator('projectName', {
				        		rules: [{ required: true, message: '请填写项目名称' }],
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
		        				rules: [{ required: true, message: '请选择开始时间' }],
		        			})(
		            			<DatePicker style={{width: width}}/>
		            		)}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row key='1'>
	  				<Col span={12}>
				        <FormItem
				          	{...formItemLayout}
				          	label="项目地点"
				        >
				        	{getFieldDecorator('location', {
				        		rules: [{ required: true, message: '请填写项目地点' }],
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
		        <Row key='2'>
	  				<Col span={12}>
				        <FormItem
				          	{...formItemLayout}
				          	label="预计工期 (月)"
				        >
				        	{getFieldDecorator('expectedDuration', {

		        			})(
			            		<InputNumber style={{width: width}}/>
			            	)}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="实际工期 (月)"
		        		>
		        			{getFieldDecorator('actualDuration', {

		        			})(
					       		<InputNumber style={{width: width}}/>
					       	)}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="是否已完成"
		        		>
		        			{getFieldDecorator('completed', {

		        			})(
			            		<Select style={{width: width}}>
			            			<Option value="1">已完成</Option>
		    						<Option value="0">未完成</Option>
			            		</Select>
			            	)}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row key='4'>
		    		<FormItem
		    		{
		    			...
		    			{
		    				labelCol: { span: 3 },
							wrapperCol: { span: 19 },
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
		    </Card>
        );

		return this.renderForm(formItems, (addButton) =>
		{
			return(
				<Row style={{marginBottom: 20}}>
					<Col span={12}>
						<Row>
							<Col span={7} />
							<Col span={14}>
								{addButton}
							</Col>
						</Row>
					</Col>
				</Row>
			);
		});
    }
}