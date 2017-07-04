import React, { Component, PropTypes } from 'react'
import Topnav from 'COMPONENTS/Topnav'
import 'STYLES/antd.min.css'
import 'STYLES/core.scss'
import './CoreLayout.scss'

import { Layout, Menu, Breadcrumb, Icon, Row, Col, Tabs, message, Modal, Form, Input } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

import Animate from 'rc-animate';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Logo from './assets/logo.png';

import tabsmap from 'routes/tabsmap';

import ItemContainer from 'common/basic/containers/ItemContainer';

import {logoutService, resetPasswordService} from 'services';
import {sysFetch} from 'utils/FetchUtil';

const ResetPasswordForm = Form.create()((props) => 
{
	const { visible, onCancel, resetPassword, form } = props;
	const { getFieldDecorator } = form;
	const formItemLayout = 
	{
		labelCol: { span: 3 },
		wrapperCol: { span: 20 },
	};

	return (
  		<Modal
    		visible={visible}
    		title="修改密码"
    		onCancel={onCancel}
    		onOk={resetPassword}
  		>
    		<Form layout="vertical">
      			<FormItem {...formItemLayout} label="原密码">
            		{getFieldDecorator('password', {
             
            		})(
              			<Input />
            		)}
      			</FormItem>
      			<FormItem {...formItemLayout} label="新密码">
        			{getFieldDecorator('newPassword', {

        			})(
        				<Input />
        			)}
      			</FormItem>
    		</Form>
  		</Modal>
	);
});

export default class CoreLayout extends Component
{
	static propTypes = 
	{
		children: PropTypes.element,
		setModules: PropTypes.func,
		modules: PropTypes.array,
		sysUser: PropTypes.object,
	};

	constructor(props)
	{
		super(props);
		
		this.state =
		{
			panes: [],
			activeKey: '',
			showResetPasswordModal: false,
		};

		this.defaultSelectedKeys = [];
		this.pages = [];
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

	handleNavmenuClick = (e) =>
	{
		const key = e.key;

		if(key == 'resetPassword')
		{
			this.showResetPasswordModal();
		}
		else if(key == 'logout')
		{
			this.logout();
		}
	}

	showResetPasswordModal = () =>
	{
		this.setState(
		{
			showResetPasswordModal: true
		});
	}

	closeResetPasswordModal = () =>
	{
		this.setState(
		{
			showResetPasswordModal: false
		});
	}

	saveResetPasswordFormRef = (form) => 
	{
    	this.resetPasswordFormRef = form;
  	}

	resetPassword = () =>
	{
		const form = this.resetPasswordFormRef;
	    form.validateFields((err, values) => 
	    {
	      	if (err) 
	      	{
	        	return;
	      	}

	      	sysFetch(resetPasswordService, values, (res) =>
		    {
		    	const status = res.status;
            
	            if(status == 'SUCCESS')
	            {
	                message.success('修改密码成功');
	               	this.closeResetPasswordModal();
	            }

	            else if(status == 'FAILURE')
	            {
	                message.error('修改密码失败');
	            }

	            else
	            {
	                message.warning('服务器错误');
	            }
		    });
	    });
	}

	logout()
	{
		sessionStorage.removeItem('sysUser');

		message.success("退出登录成功，正在跳转...");
       	window.location.href = this.getRootPath();
	}

	getRootPath()
	{
	    var curPath = window.document.location.href;
	    var pathName = window.document.location.pathname;
	    var pos = curPath.indexOf(pathName);
	    var localhostPaht = curPath.substring(0,pos);
	    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/') + 1);
	    return (localhostPaht + projectName);
	}

	render()
	{
		let pages = tabsmap;
		let menus = this.props.modules;

		this.handleClick = (e) =>
		{
			let menu = findMenuByKey(e.key, menus);
			let component = findPageByPath(menu.menuPath, pages);

			this.addTab(menu.id, menu.name, component);
		}

		this.onChange = (activeKey) => 
		{
	    	this.setState({ activeKey });
	  	}

		this.onEdit = (targetKey) =>
		{
		    this.removeTab(targetKey);
		}

		const { sysUser } = this.props;

		return (
			<Layout>
                <Sider>
		        	<Row>
	                	<div className="logoV2Container" style={{marginBottom: '20px', background: '#333'}}>
	                		<img src={Logo} className="logoV2"></img>
	                	</div>
	                </Row>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={this.defaultSelectedKeys}
                        onClick={this.handleClick}
                    >
                        {this.genSidemenu(menus)}
                    </Menu>
                </Sider>
            	<Layout>
			        <Header style={{ background: '#fff', padding: 0 }}>
			            <div className='navmenu'>
                            <Menu
                                mode="horizontal"
                                theme="light"
                                style={{background: '#FFF', height: 0, lineHeight: '65px'}}
                                onClick={this.handleNavmenuClick}
                            >
                            	<SubMenu title={<span><Icon type="mail" />消息通知</span>}>
                                </SubMenu>
                                <SubMenu title={<span><Icon type="user" />{sysUser.name}</span>}>
                                    <Menu.Item key="resetPassword">修改密码</Menu.Item>
                                    <Menu.Item key="logout">退出登录</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                        <ResetPasswordForm
                         	ref={this.saveResetPasswordFormRef}
				          	visible={this.state.showResetPasswordModal}
				          	onCancel={this.closeResetPasswordModal}
				          	resetPassword={this.resetPassword}
				        />
			        </Header>
			        <Content style={{ margin: '0px 16px', padding: 24, background: '#fff', minHeight: 800 }}>
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
			        <Footer style={{ textAlign: 'center' }}>
			            中钢国际工程公司 ©2017 赵易辰 出品 @QQ:1026608946
			        </Footer>
			    </Layout>
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

		if(menu.id == key)
		{
			_menu = menu;
		}
		else if(menu.children && menu.children instanceof Array)
		{
			_menu = findMenuByKey(key, menu.children);
		}
		else if(menu.menus && menu.menus instanceof Array)
		{
			_menu = findMenuByKey(key, menu.menus);
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