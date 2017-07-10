import React, {Component, PropTypes} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import InspectView from 'common/basic/components/InspectView';

import SubItemContainer from 'common/basic/containers/SubItemContainer'

import MilestonesComponent from './MilestonesComponent';
import TopicListView from './TopicListView';

class ProjectInspectView extends InspectView
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const project = this.itemClone;

		const formItems = [];

		const formItemLayout = 
		{
  			labelCol: { span: 6 },
  			wrapperCol: { span: 14 },
		};

        formItems.push(
        	<Card key='0' title='项目基本信息' style={{marginBottom: 20}}> 
	    	    <Row key='0'>
	  				<Col span={12}>
				        <FormItem
				          	{...formItemLayout}
				          	label="项目名称"
				        >
				        	{project.projectName}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="开始时间"
		        		>
		        			{project.startTime}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row key='1'>
	  				<Col span={12}>
				        <FormItem
				          	{...formItemLayout}
				          	label="项目地点"
				        >
				        	{project.location}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="负责人"
		        		>
		        			{project.directorId}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row key='2'>
	  				<Col span={12}>
				        <FormItem
				          	{...formItemLayout}
				          	label="预计工期 (月)"
				        >
				        	{project.expectedDuration}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="实际工期 (月)"
		        		>
		        			{project.actualDuration}
		        		</FormItem>
		        	</Col>
		        </Row>
		        <Row>
		        	<Col span={12}>
		        		<FormItem
		          			{...formItemLayout}
		          			label="是否已完成"
		        		>
		        			{project.completed == '1' ? '已完成' : '未完成'}
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
		      			label="备注"
		    		>
		    			{project.comment}
		    		</FormItem>
		    	</Row>
		    </Card>
        );

        const topicStoreName = 'topic';
		const _TopicListView = SubItemContainer(topicStoreName, TopicListView);
        formItems.push(
        	<Card key='1' title='项目课题' style={{marginBottom: 20}}>
	    	    <Row key='3'>
	  				<_TopicListView storeName={topicStoreName} parentId={this.props.item.id} readonly/>
		        </Row>
		    </Card>
        );

        const milestoneStoreName = 'milestone';
        const _MilestonesComponent = SubItemContainer(milestoneStoreName, MilestonesComponent);
        formItems.push(
        	<Card key='2' title='项目关键节点' style={{marginBottom: 20}}>
	    	    <Row key='3'>
	            	<_MilestonesComponent storeName={milestoneStoreName} parentId={this.props.item.id} readonly/>
		        </Row>
	        </Card>
        );

		return this.renderForm([formItems]);
	}
}

export default ProjectInspectView;