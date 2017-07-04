import React, {Component, PropTypes} from 'react';

import {Tree, Menu, Icon} from 'antd';
const TreeNode = Tree.TreeNode;

import Animate from 'rc-animate';

import './OrganizationTreeComponent.scss';

export default class OrganizationTreeComponent extends Component
{
	static PropTypes = 
	{
		checkable: PropTypes.bool,
		orgs: PropTypes.array,
		checkedKeys: PropTypes.array,
		setCheckedKeys: PropTypes.func,
		setParentId: PropTypes.func,
	}

	static defaultProps = 
    {
        checkedKeys: []
    };

	constructor(props)
	{
		super(props);
	}

	onCheck = (checkedKeys, info) =>
	{
		const setCheckedKeys = this.props.setCheckedKeys;
		if(setCheckedKeys)
		{
			setCheckedKeys(checkedKeys);
		}
	}

	onSelect = (selectedKeys, info) =>
	{
		const setParentId = this.props.setParentId;

		if(setParentId)
		{
			const parentId = selectedKeys[0];
			setParentId(parentId);
		}
	}

	genTreeNodes(orgs)
	{
		return orgs.map((org) =>
		{
			if(org.children && org.children.length)
			{
				return(
					<TreeNode key={org.id} title={org.organizationName}>
					{
						this.genTreeNodes(org.children)
					}
					</TreeNode>
				);
			}
			else
			{
				return(
					<TreeNode key={org.id} title={org.organizationName} />
				);
			}
		});
	}

	render()
	{
		const orgs = this.props.orgs;
		const checkedKeys = this.props.checkedKeys;

		return(
			<Tree className='orgTree' showLine defaultExpandAll defaultCheckedKeys={checkedKeys} checkable={this.props.checkable} onSelect={this.onSelect} onCheck={this.onCheck}>
				{ orgs ? this.genTreeNodes(orgs) : ''}
			</Tree>
		);
	}
}