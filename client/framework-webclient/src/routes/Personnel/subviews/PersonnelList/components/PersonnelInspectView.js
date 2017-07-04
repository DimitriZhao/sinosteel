import React, {Component, PropTypes} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import InspectView from 'common/CRUD/components/InspectView';

import FormUpload from 'components/FormUpload/FormUpload.js';

import {downloadService} from 'services';

class PersonnelInspectView extends InspectView
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const personnel = this.props.item;

		const formItems = [];

		const formItemLayout = 
		{
  			labelCol: { span: 6 },
  			wrapperCol: { span: 14 },
		};

        formItems.push(
        	<Card key='0' title='员工基本信息' style={{marginBottom: 20}}> 
	    	    <Row key='0'>
	  				<Col span={12}>
				        <FormItem
				          	{...formItemLayout}
				          	label="员工姓名"
				        >
				        	{personnel.personnelName}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="生日"
		        		>
		        			{personnel.birthday}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row key='2'>
	  				<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="性别"
		        		>
		        			{getGender(personnel.gender)}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="学历"
		        		>
		        			{getScholar(personnel.scholar)}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row key='1'>
	  				<Col span={12}>
				        <FormItem
				          	{...formItemLayout}
				          	label="毕业时间"
				        >
				        	{personnel.graduateTime}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="毕业院校"
		        		>
		        			{personnel.graduateFrom}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="参加工作时间"
		        		>
		        			{personnel.workStartTime}
		        		</FormItem>
		        	</Col>
		        </Row>
		    </Card>
        );

        formItems.push(
            <Card key='2' title='员工简历' style={{marginBottom: 20}}> 
    		    <Row key='4'>
    	    		<FormItem
            		{
            			...
            			{
            				labelCol: { span: 3 },
    						wrapperCol: { span: 19 },
            			}	
            		}
              			label="附件"
            		>
    	        		<FormUpload fileList={personnel.resumes} attachmentOnly={true}/>
    	    		</FormItem>
    	    	</Row>
            </Card>
    	);

		return this.renderForm(formItems);
	}
}

function getScholar(scholar)
{
	if(scholar == 'bachelor')
	{
		return '学士';
	}

	else if(scholar == 'master')
	{
		return '硕士';
	}

	else if(scholar == 'doctor')
	{
		return '博士';
	}
}

function getGender(gender)
{
	if(gender == 'male')
	{
		return '男';
	}

	else if(gender == 'female')
	{
		return '女';
	}
}

export default PersonnelInspectView;