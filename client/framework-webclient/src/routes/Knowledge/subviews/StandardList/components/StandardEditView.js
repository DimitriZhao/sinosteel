import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import EditView from 'common/basic/components/EditView';
import moment from 'moment';

import FormUpload from 'components/FormUpload/FormUpload.js';

import {editStandardService, deleteStandardResourceService} from 'services'; 

import {addKey} from 'utils/ArrayUtil';

import SubItemContainer from 'common/basic/containers/SubItemContainer'

export default class StandardEditView extends EditView
{
    constructor(props)
    {
        super(props);

        this.editPath = editStandardService //负责处理新增命令的url
    }

    handleInitValues = (initValues) =>
    {
    	//issueDate
    	if(initValues.issueDate)
    	{
    		initValues.issueDate = moment(initValues.issueDate, 'YYYY-MM-DD');
    	}
    }

    handleValues = (values) =>
    {
    	//issueDate
    	let date = values['issueDate'];
        if(date)
        {
            values['issueDate'] = date.format('YYYY-MM-DD');
        }

        //files
        this.files = values['resources'] || true;
        values['resources'] = null;
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
        	<Card key='0' title='标准基本信息' style={{marginBottom: 20}}> 
	    	    <Row key='0'>
		        	<Col span={12}>
		        		<FormItem
		        			{...formItemLayout}
		          			label="标准名称"
		        		>
		        			{getFieldDecorator('name', {
				        		rules: [{ required: true, message: '请填写标准名称' }],
	                    	})(
			            		<Input style={{width: width}}/>
			            	)}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
				        <FormItem
                            {...formItemLayout}
				          	label="标准号"
				        >
				        	{getFieldDecorator('code', {
				        		rules: [{ required: true, message: '请填写标准号' }],
	                    	})(
			            		<Input style={{width: width}}/>
			            	)}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row key='1'>
		        	<Col span={12}>
	                    <FormItem {...formItemLayout} label='状态'>
	                        {getFieldDecorator('status', {
	                            
	                        })(
	                            <Select style={{width: width}}>
	                                <Option value="1">在执行</Option>
	                                <Option value="0">废止</Option>
	                            </Select>
	                        )}
	                    </FormItem>
	                </Col>
	                <Col span={12}>
	                    <FormItem {...formItemLayout} label='类型'>
	                        {getFieldDecorator('type', {

	                        })(
	                            <Select style={{width: width}}>
	                                <Option value="0">强制</Option>
	                                <Option value="1">行业</Option>
	                                <Option value="2">推荐</Option>
	                            </Select>
	                        )} 
	                    </FormItem>
	                </Col>
		        </Row>
		        <Row key='2'>
		        	<Col span={12}>
		        		<FormItem
		        			{...formItemLayout}
		          			label="颁布日期"
		        		>
		        			{getFieldDecorator('issueDate', {
		        				rules: [{ required: true, message: '请选择颁布日期' }],
		        			})(
		            			<DatePicker style={{width: width}}/>
		            		)}
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
    		        	{getFieldDecorator('summary', {

            			})(
    	            		<Input type="textarea" rows={4} />
    	            	)}
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
                        {getFieldDecorator('resources', {

                        })(
                            <FormUpload deletePath={deleteStandardResourceService} storeName={this.props.storeName}/>
                        )}
                    </FormItem>
                </Row>
            </Card>
        );

		return this.renderForm(formItems, (editButton) =>
        {
            return(
                <Row style={{marginBottom: 20}}>
                    <Col span={12}>
                        <Row>
                            <Col span={7} />
                            <Col span={14}>
                                {editButton}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        });
    }
}