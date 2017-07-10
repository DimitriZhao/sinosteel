import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

import { Layout, Menu, Icon, Row, Col } from 'antd';

import Logo from './assets/logo-sinosteel.jpg';

import './Topnav.scss';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class Topnav extends Component
{
    static propTypes =
    {
        modules: PropTypes.array.isRequired,
        sysUser: PropTypes.object.isRequired
    }

	constructor(props) 
    {
        super(props);
    }

    componentWillMount()
    {
    	/*
        fetch("http://localhost:8152/data/modules.json")
        .then(res => res.json())
        .then(res => this.setState(
        {
            modules: res
        }));
        */
    }

    genNavmenu(modules)
    {
        let vdom = [];

        if(modules instanceof Array)
        {
            for(var i=0; i<modules.length; i++)
            {
                let module = modules[i];

                vdom.push(
                    <Menu.Item key={i}>
                        <Link to={module.modulePath}>
                            <Icon type={module.moduleIcon} />{module.name}
                        </Link>
                    </Menu.Item>
                );
            }
        }

        return vdom;
    }

    render() 
    {
        const { modules, sysUser } = this.props;
 
        return (
            <div className='topnav'>
                <Row>
                    <Col span={ 9 }>
                        <img src={Logo} className="logo"></img>
                        <span className="logo-text">欢迎使用中钢云智平台</span>
                    </Col>
                    <Col span={ 15 }>
                        <div className='navmenu'>
                            <Menu
                                mode="horizontal"
                                theme="light"
                                style={{background: '#FFF'}}
                            >
                                {this.genNavmenu(this.props.modules)}
                                <SubMenu title={<span><Icon type="user" />{sysUser.personnelName}</span>}>
                                    <Menu.Item key="setting:0">修改密码</Menu.Item>
                                    <Menu.Item key="setting:1">退出</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}