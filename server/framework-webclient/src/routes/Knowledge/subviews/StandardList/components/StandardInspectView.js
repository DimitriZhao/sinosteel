import React, {Component, PropTypes} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import InspectView from 'common/basic/components/InspectView';

import FormUpload from 'components/FormUpload/FormUpload.js';

import {downloadService} from 'services';

class StandardInspectView extends InspectView
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const standard = this.props.item;

		const formItems = [];

		const formItemLayout = 
		{
  			labelCol: { span: 6 },
  			wrapperCol: { span: 14 },
		};

        formItems.push(
        	<Card key='0' title='标准基本信息' style={{marginBottom: 20}}> 
	    	    <Row key='0'>
		        	<Col span={12}>
		        		<FormItem
		        			{...formItemLayout}
		          			label="标准名称"
		        		>
		        			{standard.name}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
				        <FormItem
				        {
	          		    	...
	                        {
	                            labelCol: { span: 6 },
	                            wrapperCol: { span: 18 },
	                        }		
		          		}
				          	label="标准号"
				        >
				        	{standard.code}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row key='1'>
		        	<Col span={12}>
	                    <FormItem {...formItemLayout} label='状态'>
	                        {getStatus(standard.status)}
	                    </FormItem>
	                </Col>
	                <Col span={12}>
	                    <FormItem {...formItemLayout} label='类型'>
	                        {getType(standard.type)}
	                    </FormItem>
	                </Col>
		        </Row>
		        <Row key='2'>
		        	<Col span={12}>
		        		<FormItem
		        			{...formItemLayout}
		          			label="颁布日期"
		        		>
		        			{standard.issueDate}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row key='3'>
    		        <FormItem
            		{
            			...
            			{
            				labelCol: { span: 3 },
    						wrapperCol: { span: 19 },
            			}	
            		}
              			label="概述"
            		>
    		        	{standard.summary}
            		</FormItem>
    	        </Row>
		    </Card>
        );

		formItems.push(
            <Card key='2' title='标准附件' style={{marginBottom: 20}}> 
                <Row key='4'>
                    <FormItem
                    {
                        ...
                        {
                            labelCol: { span: 3 },
                            wrapperCol: { span: 19 },
                        }   
                    }
                        label="附件上传"
                    >
                        <FormUpload fileList={standard.resources} attachmentOnly={true}/>
                    </FormItem>
                </Row>
            </Card>
        );

		return this.renderForm(formItems);
	}
}

function getType(type)
{
	if(type == '0')
	{
		return '强制';
	}
	else if(type == '1')
	{
		return '行业';
	}
	else if(type == '2')
	{
		return '推荐';
	}
}

function getStatus(status)
{
	if(status == '1')
	{
		return '在执行';
	}
	else if(status == '0')
	{
		return '废止';
	}
}

export default StandardInspectView;