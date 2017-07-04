import React, {Component, PropTypes} from 'react';

import {Tree} from 'antd';
const TreeNode = Tree.TreeNode;

import './OrganizationTreeComponent.scss';

export default class FunctionTreeComponent extends Component
{
	static PropTypes = 
	{
		funcs: PropTypes.array,
		checkedKeys: PropTypes.array,
		setCheckedKeys: PropTypes.func
	}

	static defaultProps = 
	{
		checkedKeys: []
	}

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

	genTreeNodes(nodes)
	{
		return nodes.map((node) =>
		{
			let children = [];
			if(node.children && node.children.length)
			{
				children = node.children;
			}
			else if(node.menus && node.menus.length)
			{
				children = node.menus;
			}
			else if(node.functions && node.functions.length)
			{
				children = node.functions;
			}

			if(children && children.length)
			{
				return(
					<TreeNode key={node.id} title={node.name}>
					{
						this.genTreeNodes(children)
					}
					</TreeNode>
				);
			}
			else
			{
				return(
					<TreeNode key={node.id} title={node.name} />
				);
			}
		});
	}

	render()
	{
		const funcs = this.props.funcs;
		const checkedKeys = this.props.checkedKeys;
		
		return(
			<Tree className='orgTree' showLine defaultCheckedKeys={checkedKeys} checkable={this.props.checkable} onCheck={this.onCheck}>
				{ funcs ? this.genTreeNodes(funcs) : ''}
			</Tree>
		);
	}
}