import React, { Component } from 'react';
import { Button, Form, Input, message, Checkbox, Icon, Row, Col } from 'antd';
const FormItem = Form.Item;

import { Link, hashHistory} from 'react-router';

import {getStore} from 'STORE/globalStore';
import {setSysUser} from '../reducers/LoginReducer';
import {setModules} from 'layouts/store/CoreLayoutStore';
import {loginService} from 'services';

import './LoginView.scss';
import Logo from '../assets/logo-fav.png';

import {sysFetch} from 'utils/FetchUtil';

import Animate from 'rc-animate';

class LoginView extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.loginPath = loginService;
        this.state =
        {
            loading: false,
            loginText: '登录'
        };
    }

    handleSubmit = (e) => 
    {
        e.preventDefault();
        this.props.form.validateFields((err, values) => 
        {
            if (!err) 
            {
                this.login(values);
            }
        });
    }

    login = (values) =>
    {
        this.setState(
        {
            loading: true,
            loginText: '登录中，请稍候...'
        });

        sysFetch(this.loginPath, values, (res) =>
        {
            this.setState(
            {
                loading: false,
                loginText: '登录'
            });

            if(res.status == 'SUCCESS')
            {
                const user = res.data;

                getStore().dispatch(setSysUser(user));
                getStore().dispatch(setModules(user.modules));

                sessionStorage.setItem('sysUser', JSON.stringify(user));

                message.success("登录成功，正在跳转...");
                this.props.router.replace('/index');
            }
            else
            {
                message.error('登录失败，用户名或密码错误');
            }
        });
    }

    render() 
    {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-background">
                <div className="login-component">
                    <div className="login-title">
                        <img src={Logo} className="login-logo "></img>
                        <span><h2 style={{fontSize:'18px',color:'#666666'}}>SINOSTEEL信息系统框架</h2></span>
                    </div>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                        {
                            getFieldDecorator('username', 
                            {
                                rules: [{ required: true, message: '请输入您的用户名' }],
                            })(
                                <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
                            )
                        }
                        </FormItem>

                        <FormItem>
                        {
                            getFieldDecorator('password', 
                            {
                                rules: [{ required: true, message: '请输入您的密码' }],
                            })(
                                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
                            )
                        }
                        </FormItem>

                        <FormItem>
                        {
                            getFieldDecorator('remember', 
                            {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住用户名和密码</Checkbox>
                            )
                        }
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                                {this.state.loginText}
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(LoginView);