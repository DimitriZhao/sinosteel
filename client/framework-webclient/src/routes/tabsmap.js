import PersonnelListView from 'routes/Personnel/subviews/PersonnelList/components/PersonnelListView';

import PersonalJournalListView from 'routes/Journal/subviews/PersonalJournalList/components/PersonalJournalListView';
import JournalListView from 'routes/Journal/subviews/JournalList/components/JournalListView';
import JournalStatisticsView from 'routes/Journal/subviews/JournalStatistics/components/JournalStatisticsView';

import ProjectListView from 'routes/Project/subviews/ProjectList/components/ProjectListView';

import UserTreeView from 'routes/System/subviews/UserList/components/UserTreeView';
import OrganizationTreeView from 'routes/System/subviews/OrganizationTree/components/OrganizationTreeView';
import RoleListView from 'routes/System/subviews/RoleList/components/RoleListView';

import ItemContainer from 'common/CRUD/containers/ItemContainer';

const tabsmap = 
[
    {
        path: '/personnel_journals',
        component: ItemContainer('personalJournal', PersonalJournalListView)
    },
    {
        path: '/journal_list',
        component: ItemContainer('journal', JournalListView)
    },
    {
        path: '/personnel_list',
        component: ItemContainer('personnel', PersonnelListView)
    },
    {
        path: '/project_list',
        component: ItemContainer('project', ProjectListView)
    },
    {
        path: '/journal_statistics',
        component: JournalStatisticsView
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