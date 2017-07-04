import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import AddView from 'common/CRUD/components/AddView';
import moment from 'moment';

import FormUpload from 'components/FormUpload/FormUpload.js';

import {deleteResumeService, addPersonnelService} from 'services';

export default class PersonnelAddView extends AddView
{
    constructor(props)
    {
        super(props);

        this.addButtonName = "新增员工", //“新增”按钮的名称
        this.addPath = addPersonnelService //负责处理新增命令的url
    }

    handleValues = (values) =>
    {
    	//birthday
    	let birthday = values['birthday'];
        if(birthday)
        {
            values['birthday'] = birthday.format('YYYY-MM-DD');
        }

        //graduateTime
    	let graduateTime = values['graduateTime'];
        if(graduateTime)
        {
            values['graduateTime'] = graduateTime.format('YYYY-MM-DD');
        }

        //workStartTime
    	let workStartTime = values['workStartTime'];
        if(workStartTime)
        {
            values['workStartTime'] = workStartTime.format('YYYY-MM-DD');
        }

        //files
        this.files = values['resumes'] || true;
        values['resumes'] = null;
    }

    render()
    {
    	const formItems = [];
    	const { getFieldDecorator } = this.props.form;

    	const width = '100%';

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
				        	{getFieldDecorator('personnelName', {

	                    	})(
			            		<Input style={{width: width}}/>
			            	)}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="生日"
		        		>
		        			{getFieldDecorator('birthday', {

		        			})(
		            			<DatePicker style={{width: width}}/>
		            		)}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row key='2'>
	  				<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="性别"
		        		>
		        			{getFieldDecorator('gender', {

		        			})(
			            		<Select style={{width: width}}>
			            			<Option value="male">男</Option>
		    						<Option value="female">女</Option>
			            		</Select>
			            	)}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="学历"
		        		>
		        			{getFieldDecorator('scholar', {

		        			})(
			            		<Select style={{width: width}}>
			            			<Option value="bachelor">学士</Option>
		    						<Option value="master">硕士</Option>
		    						<Option value="doctor">博士</Option>
			            		</Select>
			            	)}
		        		</FormItem>
		        	</Col>	
		        </Row>
		        <Row key='1'>
	  				<Col span={12}>
				        <FormItem
				          	{...formItemLayout}
				          	label="毕业时间"
				        >
				        	{getFieldDecorator('graduateTime', {

		        			})(
			            		<DatePicker style={{width: width}}/>
			            	)}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="毕业院校"
		        		>
		        			{getFieldDecorator('graduateFrom', {

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
		          			label="参加工作时间"
		        		>
		        			{getFieldDecorator('workStartTime', {

		        			})(
					        	<DatePicker style={{width: width}}/>
					        )}
		        		</FormItem>
		        	</Col>
	        	</Row>
	        </Card>
        );

        formItems.push(
            <Card key='1' title='员工简历' style={{marginBottom: 20}}> 
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
    	        		{getFieldDecorator('resumes', {

                        })(
                            <FormUpload deletePath={deleteResumeService} storeName={this.props.storeName}/>
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