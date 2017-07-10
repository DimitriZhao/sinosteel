import React, {Component, PropTypes} from 'react';

import {Row, Col, Card, Tabs, Layout, Form} from 'antd';
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

import SubItemContainer from 'common/basic/containers/SubItemContainer';

import OrganizationTreeContainer from '../../../containers/OrganizationTreeContainer';
import OrganizationListView from './OrganizationListView';

export default class OrganizationTreeView extends Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			parentId: ''
		}
	}

	setParentId = (parentId) =>
	{
		this.setState(
		{
			parentId: parentId
		})
	}

	render()
	{
		const minHeight = '850px';

		const subOrganizationStoreName = 'subOrganization';
		const _OrganizationListView = SubItemContainer(subOrganizationStoreName, OrganizationListView);

		return(
			<Row gutter={16}>
				<Col span={8}>
					<Card title='组织结构' style={{minHeight: minHeight}}>
						<OrganizationTreeContainer setParentId={(parentId) => this.setParentId(parentId)}/>
					</Card>
				</Col>
				<Col span={16}>
					<Card title='下级组织列表' style={{minHeight: minHeight}}>
						<_OrganizationListView storeName={subOrganizationStoreName} parentId={this.state.parentId} />
					</Card>
				</Col>
			</Row>
		);
	}
}