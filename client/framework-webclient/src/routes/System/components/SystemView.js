import SidemenuLayout from 'layouts/SidemenuLayout.js';

import OrgRoleView from '../subviews/OrgRole/components/OrgRoleView'
import AuthView from '../subviews/Auth/components/AuthView'

class SystemView extends SidemenuLayout
{
	constructor(props)
	{
		super(props);
        this.menus = 
        [
            {
                menuId: '0',
                menuName: '用户管理',
                menuIcon: 'idcard',
                menuPath: ''
            },
            {
                menuId: '1',
                menuName: '组织岗位管理',
                menuIcon: 'usb',
                menuPath: '/org_role'
            },
            {
                menuId: '2',
                menuName: '权限管理',
                menuIcon: 'key',
                menuPath: '/auth'
            }
        ]

        this.pages =
        [
            {
                path: '/org_role',
                component: OrgRoleView
            },
            {
                path: '/auth',
                component: AuthView
            },
        ]
	}
}

export default SystemView;