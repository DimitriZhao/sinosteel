import ProjectListView from 'routes/Project/subviews/ProjectList/components/ProjectListView';

import StandardListView from 'routes/Knowledge/subviews/StandardList/components/StandardListView';

import UserTreeView from 'routes/System/subviews/UserList/components/UserTreeView';
import OrganizationTreeView from 'routes/System/subviews/OrganizationTree/components/OrganizationTreeView';
import RoleListView from 'routes/System/subviews/RoleList/components/RoleListView';

import ItemContainer from 'common/basic/containers/ItemContainer';

const tabsmap = 
[
    {
        path: '/project_list',
        component: ItemContainer('project', ProjectListView)
    },
    {
        path: '/standard_list',
        component: ItemContainer('standard', StandardListView)
    },
    {
        path: '/user_list',
        component: UserTreeView
    },
    {
        path: '/organization_tree',
        component: OrganizationTreeView
    },
    {
        path: '/role_list',
        component: ItemContainer('role', RoleListView)
    }
]

export default tabsmap