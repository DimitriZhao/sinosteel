import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import EditView from 'common/basic/components/EditView';
import moment from 'moment';

import MilestonesComponent from './MilestonesComponent';
import TopicListView from './TopicListView';

import {editProjectService} from 'services'; 

import SubItemContainer from 'common/basic/containers/SubItemContainer'

export default class ProjectEditView extends EditView
{
    constructor(props)
    {
        super(props);

        this.editButtonName = "修改基本信息";//“新增”按钮的名称
        this.editPath = editProjectService; //负责处理新增命令的url

        this.closeTabAfterEdit = false;

        const topicStoreName = 'topic';
		const _TopicListView = SubItemContainer(topicStoreName, TopicListView);
		this.topicListView = <_TopicListView storeName={topicStoreName} parentId={this.props.item.id}/>;

        const milestoneStoreName = 'milestone';
        const _MilestonesComponent = SubItemContainer(milestoneStoreName, MilestonesComponent);
        this.milestoneComponent = <_MilestonesComponent storeName={milestoneStoreName} parentId={this.props.item.id}/>;
    }

    handleInitValues = (initValues) =>
    {
    	//startTime
    	if(initValues.startTime)
    	{
    		initValues.startTime = moment(initValues.startTime, 'YYYY-MM-DD');
    	}
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

		const editForm = this.renderForm(formItems, (editButton) =>
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

		return(
			<div>
				<Row>
					{editForm}
				</Row>
				<Row>
					<Card key='1' title='项目课题' style={{marginBottom: 20}}>
			    	    <Row key='3'>
			  				{this.topicListView}
				        </Row>
				    </Card>
				</Row>
				<Row>
					<Card key='2' title='项目关键节点' style={{marginBottom: 20}}>
			    	    <Row key='3'>
			            	{this.milestoneComponent}
				        </Row>
			        </Card>
				</Row>
			</div>
		);
    }
}