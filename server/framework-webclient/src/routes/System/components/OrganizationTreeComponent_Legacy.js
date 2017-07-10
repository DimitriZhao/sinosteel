import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

import {Tree, Menu, Icon} from 'antd';
const TreeNode = Tree.TreeNode;

import Animate from 'rc-animate';

import './OrganizationTreeComponent.scss';

export default class OrganizationTreeComponent extends Component
{
	static PropTypes = 
	{
		checkable: PropTypes.bool,
		orgs: PropTypes.array
	}

	static defaultProps = 
    {
        orgs: []
    };

	constructor(props)
	{
		super(props);

		this.menu = null;
	}

	componentWillUnmount() 
	{
    	this.removeMenu();

    	if(this.menuContainer) 
    	{
      		ReactDOM.unmountComponentAtNode(this.menuContainer);
      		document.body.removeChild(this.menuContainer);
      		this.menuContainer = null;
    	}

    	document.body.removeEventListener('click', () => this.removeMenu());
  	}

	componentDidMount()
	{
		this.getMenuContainer();

		document.body.addEventListener('click', () => this.removeMenu());
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

	onRightClick(info)
	{
		this.renderMenu(info);
	}

	removeMenu()
	{
		if(this.menu)
		{
			ReactDOM.unmountComponentAtNode(this.menuContainer);
			this.menu = null;
		}
	}

	getMenuContainer()
	{
		if(!this.menuContainer)
		{
			this.menuContainer = document.createElement('div');
			document.body.appendChild(this.menuContainer);
		}

		return this.menuContainer;
	}

	renderMenu(info)
	{
		if(this.menu)
		{
			ReactDOM.unmountComponentAtNode(this.menuContainer);
			this.menu = null;
		}

		const pageX = info.event.pageX;
		const pageY = info.event.pageY;

		const tempStyle = 
		{
            position: 'absolute',
            left: `${pageX}px`,
            top: `${pageY}px`
        };

        this.menu = (
            <Menu className='orgMenu'>
                <Menu.Item key='1'><Icon type='plus-circle-o'/>新增下级部门</Menu.Item>
                <Menu.Item key='4'><Icon type='edit'/>修改部门</Menu.Item>
                <Menu.Item key='3'><Icon type='minus-circle-o'/>删除部门</Menu.Item>
            </Menu>
        );

        const menuContainer = this.getMenuContainer();
        assign(this.menuContainer.style, tempStyle);

        ReactDOM.render(
        	<Animate transitionName='fade'>
        		{this.menu}
        	</Animate>, menuContainer);
	}

	render()
	{
		const orgs = this.props.orgs;

		return(
			<Tree className='orgTree' checkable={this.props.checkable} onRightClick={(info) => 
			{
				this.onRightClick(info)
			}}>
				{ orgs ? this.genTreeNodes(orgs) : ''}
			</Tree>
		);
	}
}