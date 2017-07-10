import React, { Component, PropTypes } from 'react'

import { Link } from 'react-router';

import "./SidemenuLayout.scss";

// 引入Antd的导航组件
import { Layout, Menu, Icon } from 'antd';
import { Tabs } from 'antd';

//import Test from 'test/test'

const TabPane = Tabs.TabPane;
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

import {getStore} from 'STORE/globalStore';

export default class SidemenuLayout extends Component
{
	constructor(props)
	{
		super(props);

		this.menus = [];

		this.pages = [];
		
		this.state =
		{
			panes: [],
			activeKey: ''
		};

		this.defaultSelectedKeys = [];
	}

	genSidemenu(menus)
	{
		let vdom = [];

		if(menus instanceof Array)
		{
			for(var i=0; i<menus.length; i++)
			{
				let menu = menus[i];

				if(menu.children)
				{
					vdom.push(
						<SubMenu key={menu.id} title={<span><Icon type={menu.menuIcon} /><span>{menu.name}</span></span>}>
                            {this.genSidemenu(menu.children)}
                        </SubMenu>
					);
				}
				else if(menu.menus)
				{
					vdom.push(
						<SubMenu key={menu.id} title={<span><Icon type={menu.moduleIcon} /><span>{menu.name}</span></span>}>
                            {this.genSidemenu(menu.menus)}
                        </SubMenu>
					);
				}
				else
				{
					vdom.push(
						<Menu.Item key={menu.id}>
	                    	<Icon type={menu.menuIcon} />{menu.name}
	                    </Menu.Item>
					);
				}
			}
		}

		return vdom;
	}

	componentWillMount()
	{
		this.handleClick = (e) =>
		{
			let menu = findMenuByKey(e.key, this.menus);
			let component = findPageByPath(menu.menuPath, this.pages);

			this.addTab(menu.menuId, menu.menuName, component);
		}

		this.onChange = (activeKey) => 
		{
	    	this.setState({ activeKey });
	  	}

		this.onEdit = (targetKey) =>
		{
		    this.removeTab(targetKey);
		}
	}

	addTab(key, name, component, props)
	{
		const panes = this.state.panes;
		const activeKey = key;

		if(!containsPane(key, panes))
		{
			panes.push({ title: name, content: React.createElement(component, 
			{
				'addTab': (_key, _name, _component, _props) => this.addTab(_key, _name, _component, _props),
				'removeTab': (_targetKey) => this.removeTab(_targetKey),
				...props
			}), key: activeKey });
		}

		this.setState({ panes, activeKey });
	}

	removeTab(targetKey) 
	{
	    let activeKey = this.state.activeKey;
	    let lastIndex;
	    this.state.panes.forEach((pane, i) => 
	    {
	      	if (pane.key === targetKey) 
	      	{
	        	lastIndex = i - 1;
	      	}
	    });

	    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
	    if (lastIndex >= 0 && activeKey === targetKey) 
	    {
	      	activeKey = panes[lastIndex].key;
	    }

	    this.setState({ panes, activeKey });
	}

	render()
	{
		return (
			<Layout className='sideMenuLayout' style={{ padding: '24px 0', background: '#fff', display:'flex' }}>
                <Sider style={{ width: 200, background: '#fff' }}>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={this.defaultSelectedKeys}
                        onClick={this.handleClick}
                    >
                        {this.genSidemenu(this.menus)}
                    </Menu>
                </Sider>
                <Content className='rightWrap' style={{ padding: '0 24px' }}>
                	<Tabs 
                		className="contentTab" 
                		type="editable-card" 
                		onChange={this.onChange}
				        onEdit={this.onEdit}
                		hideAdd="true" 
                		activeKey={this.state.activeKey}>
				      	{this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
				    </Tabs>      
                </Content>
            </Layout>
		);
	}
}

function findMenuByKey(key, menus)
{
	let _menu = null;

	for(var i=0; i<menus.length; i++)
	{
		let menu = menus[i];

		if(menu.menuId == key)
		{
			_menu = menu;
		}
		else if(menu.children && menu.children instanceof Array)
		{
			_menu = findMenuByKey(key, menu.children);
		}

		if(_menu)
		{
			break;
		}
	}

	return _menu;
}

function findPageByPath(path, pages)
{
	for(var i=0; i<pages.length; i++)
	{
		let page = pages[i];

		if(page.path == path)
		{
			return page.component;
		}
	}

	return null;
}

function containsPane(key, panes)
{
	for(var i=0; i<panes.length; i++)
	{
		if(key == panes[i].key)
		{
			return true;
		}
	}

	return false;
}