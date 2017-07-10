import React, {Component, PropTypes} from 'react';

import {Row, Col, Card, Tabs, Layout, Form} from 'antd';
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

import SubItemContainer from 'common/basic/containers/SubItemContainer';

import OrganizationTreeContainer from 'routes/System/containers/OrganizationTreeContainer';
import UserListView from './UserListView';

export default class UserTreeView extends Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			organizationId: ''
		}
	}

	setOrganizationId = (organizationId) =>
	{
		this.setState(
		{
			organizationId: organizationId
		});
	}

	render()
	{
		const minHeight = '850px';

		const userStoreName = 'user';
		const _UserListView = SubItemContainer(userStoreName, UserListView);

		return(
			<Row gutter={16}>
				<Col span={8}>
					<Card title='组织结构' style={{minHeight: minHeight}}>
						<OrganizationTreeContainer setParentId={(organizationId) => this.setOrganizationId(organizationId)}/>
					</Card>
				</Col>
				<Col span={16}>
					<Card title='用户列表' style={{minHeight: minHeight}}>
						<_UserListView storeName={userStoreName} parentId={this.state.organizationId} />
					</Card>
				</Col>
			</Row>
		);
	}
}