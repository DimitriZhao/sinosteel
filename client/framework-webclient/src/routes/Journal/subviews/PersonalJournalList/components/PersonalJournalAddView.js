import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Upload, Card } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

import moment from 'moment';

import QueryCascader from 'components/QueryCascader/QueryCascader.js';
import RichTextEditor from 'components/RichTextEditor/RichTextEditor.js';
import FormUpload from 'components/FormUpload/FormUpload.js';

import {queryAllProjectsService, queryAllTopicsService, deleteJournalResourceService, addJournalService} from 'services';

import AddView from 'common/CRUD/components/AddView';

import {getStore} from 'STORE/globalStore';

export default class PersonalJournalAddView extends AddView
{
    constructor(props)
    {
        super(props);

        this.addButtonName = "新增项目日志", //“新增”按钮的名称
        this.addPath = addJournalService //负责处理新增命令的url
    }

    handleValues = (values) =>
    {
        //writeTime
        let date = values['writeTime'];
        if(date)
        {
            values['writeTime'] = date.format('YYYY-MM-DD');
        }

        //personnelId
        var sysUser = getStore().getState().system.sysUser;
        values['personnelId'] = sysUser.id;

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
            <Card key='0' title='日志基本信息' style={{marginBottom: 20}}> 
        	    <Row key='0'>
      				<Col span={12}>
    			        <FormItem
    			          	{...formItemLayout}
    			          	label="编写时间"
    			        >
    			        	{getFieldDecorator('writeTime', {
                                rules: [{ required: true, message: '请填写编写时间' }],
                        	})(
    		            		<DatePicker style={{width: width}} />
    		            	)}
    	        		</FormItem>
    	        	</Col>
    	        	<Col span={12}>
    	        		<FormItem
    	          			{...formItemLayout}
    	          			label="地点"
    	        		>
    	        			{getFieldDecorator('location', {
                                rules: [{ required: true, message: '请填写地点' }],
    	        			})(
    	            			<Input style={{width: width}} />
    	            		)}
    	        		</FormItem>
    	        	</Col>
    	        </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            {...formItemLayout}
                            label="项目课题"
                        >
                            {getFieldDecorator('topicId', {
                                rules: [{ required: true, message: '请选择项目或课题' }],
                            })(
                                <QueryCascader
                                    queryParentsPath={queryAllProjectsService}
                                    queryChildrenPath={queryAllTopicsService}
                                    parentsValueIndex='id'
                                    parentsTextIndex='projectName'
                                    childrenValueIndex='id'
                                    childrenTextIndex='topicName'
                                    parentIdName='projectId'
                                    style={{width: width}}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Card>
        );

        formItems.push(
            <Card key='1' title='日志内容' style={{marginBottom: 20}}> 
        	    <Row key='2'>
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
                <Row key='3'>
                    <FormItem
                    {
                        ...
                        {
                            labelCol: { span: 3 },
                            wrapperCol: { span: 19 },
                        }   
                    }
                        label="详细内容"
                    >
                        {getFieldDecorator('specification', {

                        })(
                            <RichTextEditor />
                        )} 
                    </FormItem>
                </Row>
            </Card>
        );

		formItems.push(
            <Card key='2' title='日志附件' style={{marginBottom: 20}}> 
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
                            <FormUpload deletePath={deleteJournalResourceService} storeName={this.props.storeName}/>
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