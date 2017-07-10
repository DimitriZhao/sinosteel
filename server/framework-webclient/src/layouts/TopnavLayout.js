import React, { Component, PropTypes } from 'react'
import Topnav from 'COMPONENTS/Topnav'
import 'STYLES/antd.min.css'
import 'STYLES/core.scss'
import './CoreLayout.scss'

import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

import Animate from 'rc-animate';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class TopnavLayout extends Component
{
	static propTypes = 
	{
		children: PropTypes.element,
		setModules: PropTypes.func,
		modules: PropTypes.array,
		sysUser: PropTypes.object
	};

	constructor(props)
	{
		super(props);
	}

	render()
	{
		return(
			<Layout className='coreLayout'>
				<Header>
			    	<Topnav style={{width: '100%'}} modules={this.props.modules} sysUser={this.props.sysUser}/>
			    </Header>
			    <Content style={{ padding: '0 50px' }}>
			    	<Animate
		                transitionName="fade"
		                component="div"
		                transitionEnterTimeout={300}
		                transitionLeaveTimeout={300}
		            >
		                <div key={this.props.location.pathname}>
				   			{ this.props.children }
				   		</div>
				   	</Animate>
			    </Content>
			    <Footer className='footer' style={{ textAlign: 'center' }}>
			        中钢国际工程公司 ©2017 赵易辰 出品 @QQ:1026608946
			    </Footer>
			</Layout>
		);
	}
}
