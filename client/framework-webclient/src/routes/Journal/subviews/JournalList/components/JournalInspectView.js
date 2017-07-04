import React, {Component, PropTypes} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import FormUpload from 'components/FormUpload/FormUpload.js';

import {downloadService} from 'services';

import InspectView from 'common/CRUD/components/InspectView';

class JournalInspectView extends InspectView
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const journal = this.itemClone;

		const formItems = [];

		const formItemLayout = 
		{
  			labelCol: { span: 6 },
  			wrapperCol: { span: 14 },
		};

        formItems.push(
            <Card key='0' title='日志基本信息' style={{marginBottom: 20}}> 
        	    <Row key='0'>
      				<Col span={12}>
    			        <FormItem
    			          	{...formItemLayout}
    			          	label="编写时间"
    			        >
    		            	{journal.writeTime}
    	        		</FormItem>
    	        	</Col>
    	        	<Col span={12}>
    	        		<FormItem
    	          			{...formItemLayout}
    	          			label="地点"
    	        		>
    	        			{journal.location}
    	        		</FormItem>
    	        	</Col>
    	        </Row>
                <Row key='1'>
                    <Col span={12}>
                        <FormItem
                            {...formItemLayout}
                            label="项目"
                        >
                            {journal.projectName}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            {...formItemLayout}
                            label="课题"
                        >
                            { journal.topicName}
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
    		        	{journal.summary}
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
                        <div dangerouslySetInnerHTML={{__html: journal.specification}} />
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
              			label="附件"
            		>
    	        		<FormUpload fileList={journal.resources} attachmentOnly={true}/>
    	    		</FormItem>
    	    	</Row>
            </Card>
    	);

		return this.renderForm(formItems);
	}
}

export default JournalInspectView;