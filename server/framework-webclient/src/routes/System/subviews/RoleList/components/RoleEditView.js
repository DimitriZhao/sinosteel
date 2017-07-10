import React, {Component, PropTypes} from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, InputNumber, Card, Tabs } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import EditView from 'common/basic/components/EditView';

import FunctionTreeContainer from '../../../containers/FunctionTreeContainer';
import OrganizationTreeContainer from '../../../containers/OrganizationTreeContainer';

import {editRoleService} from 'services';

export default class RoleEditView extends EditView
{
	constructor(props)
	{
		super(props);

		this.editButtonName = "完成修改"; //“新增”按钮的名称
        this.editPath = editRoleService; //负责处理新增命令的url

        this.functions = [];
        this.queryAuthorizations = [];
        this.editAuthorizations = [];
        this.deleteAuthorizations = [];
	}

	handleInitValues = (initValues) =>
	{
		//functions
		const functions = initValues.functions;
		if(functions)
		{
			initValues['functions'] = functions.map(_function =>
			{
				return _function.id
			});
		}
	}

	handleValues = (values) =>
	{
		//功能权限
		values['functions'] = this.functions;

		//数据权限
		values['queryAuthorizations'] = this.queryAuthorizations;
		values['editAuthorizations'] = this.editAuthorizations;
		values['deleteAuthorizations'] = this.deleteAuthorizations;
	}

	setFunctions = (functions) =>
	{
		Object.assign(this.functions, functions);
	}

	setQueryAuthorizations = (organizations) =>
	{
		Object.assign(this.queryAuthorizations, organizations);
	}

	setDeleteAuthorizations = (organizations) =>
	{
		Object.assign(this.deleteAuthorizations, organizations);
	}

	setEditAuthorizations = (organizations) =>
	{
		Object.assign(this.editAuthorizations, organizations);
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

		const minHeight = 500;

		formItems.push(
        	<Card key='0' title='角色基本信息' style={{minHeight: minHeight}} style={{marginBottom: 20}}> 
	    	    <Row key='0'>
	    	    	<Col span={12}>
				        <FormItem 
				        	{...formItemLayout} 
				        	label="角色名称" 
				        >
				        	{getFieldDecorator('roleName', {

	                    	})(
			            		<Input style={{width: width}}/>
			            	)}
		        		</FormItem>
		        	</Col>
		        	<Col span={12}>
		        		<FormItem 
		        			{...formItemLayout} 
		        			label="角色代码" 
		        		>
		        			{getFieldDecorator('roleString', {

		        			})(
		            			<Input style={{width: width}}/>
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
		      			label="角色描述"
		    		>
		    			{getFieldDecorator('description', {

		        		})(
		        			<Input type="textarea" rows={8} />
		        		)}
		    		</FormItem>
		    	</Row>
	        </Card>
        );

		formItems.push(
			<Row key='2' gutter={16}>
				<Col span={12}>
					<Card key='1' title='功能权限设置' style={{minHeight: minHeight}}> 
		    	    	<FunctionTreeContainer checkable setCheckedKeys={this.setFunctions} checkedKeys={this.initValues.functions}/>
			        </Card>
			    </Col>
			    <Col span={12}>
			        <Card key='2' title='数据权限设置' style={{minHeight: minHeight}}> 
			        	<Tabs>
				        	<TabPane tab='查询权限' key='0'>
			    	    		<OrganizationTreeContainer checkable setCheckedKeys={this.setQueryAuthorizations} checkedKeys={this.initValues.queryAuthorizations}/>
			    	    	</TabPane>
			    	    	<TabPane tab='修改权限' key='1'>
			    	    		<OrganizationTreeContainer checkable setCheckedKeys={this.setEditAuthorizations} checkedKeys={this.initValues.editAuthorizations}/>
			    	    	</TabPane>
			    	    	<TabPane tab='删除权限' key='2'>
				        		<Row>
			    	    			<OrganizationTreeContainer checkable setCheckedKeys={this.setDeleteAuthorizations} checkedKeys={this.initValues.deleteAuthorizations}/>
			    	    		</Row>
			    	    	</TabPane>
			    	    </Tabs>
			        </Card>
			    </Col>
		    </Row>
		);

		return this.renderForm(formItems, (editButton) =>
		{
			return(
				<Row style={{marginTop: 20}}>
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