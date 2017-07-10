import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import { Menu, Icon, Switch } from 'antd'
import './Sidebar.scss'
const SubMenu = Menu.SubMenu

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'dark',
      current: ''
    }
    // 监听 history 激活对应菜单
    browserHistory.listen(() => {
      this.setActiveMenu()
    })
  }

  changeTheme(value) {
    this.setState({
      theme: value ? 'dark' : 'light'
    })
  }

  setActiveMenu () {
    let key = browserHistory.getCurrentLocation().pathname.split('/')[1]
    let current = 'home'
    key ? current = key : null
    this.setState({
      current: current
    })
  }

  componentDidMount () {
    this.setActiveMenu()
  }

  render() {
    return (
      <div className={this.state.theme === 'dark' ? 'sidebar' : 'sidebar light'}>
        <div className="switchTheme">
        <span className='title'>主题切换</span>
          <Switch
            checked={this.state.theme === 'dark'}
            onChange={e => this.changeTheme(e)}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>
        <Menu
          theme={this.state.theme}
          style={{ width: 240 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="sub1" title={<span><Icon type="laptop" /><span>今日实时</span></span>}>
            <Menu.Item key="home">
              <IndexLink to='/'>首页一览</IndexLink>
            </Menu.Item>
            <Menu.Item key="counter">
              <IndexLink to='/counter'>统计中心</IndexLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="team" /><span>用户中心</span></span>}>
            <Menu.Item key="user">
              <IndexLink to='/user'>用户信息</IndexLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="setting" /><span>Navigation</span></span>}>
            <Menu.Item key="nofound">
              <IndexLink to='/nofound'>不存在页面</IndexLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }  
}
