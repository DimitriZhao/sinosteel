import React from 'react';

import SidemenuLayout from 'layouts/SidemenuLayout.js';

import ProjectListView from '../subviews/ProjectList/components/ProjectListView'
import ItemContainer from 'common/CRUD/containers/ItemContainer'

import PersonalJournalListView from 'routes/Journal/subviews/PersonalJournalList/components/PersonalJournalListView';
import JournalListView from 'routes/Journal/subviews/JournalList/components/JournalListView';
import JournalStatisticsView from 'routes/Journal/subviews/JournalStatistics/components/JournalStatisticsView';

class ProjectView extends SidemenuLayout
{
	constructor(props)
	{
		super(props);

        this.menus = 
        [
            {
                menuId: '0',
                menuName: '项目信息',
                menuIcon: 'database',
                menuPath: '/project_list'
            },
            {
                menuId: '1',
                menuName: '项目日志',
                menuIcon: 'laptop',
                menuPath: '',
                children:
                [
                    {
                        menuId: '1-0',
                        menuName: '个人项目日志',
                        menuIcon: 'tag-o',
                        menuPath: '/personnel_journals'
                    },
                    {
                        menuId: '1-1',
                        menuName: '项目日志信息',
                        menuIcon: 'tags',
                        menuPath: '/journal_list'
                    },
                    {
                        menuId: '1-2',
                        menuName: '日志信息统计',
                        menuIcon: 'line-chart',
                        menuPath: '/journal_statistics'
                    }
                ]
            },
            {
                menuId: '2',
                menuName: '国家标准规范',
                menuIcon: 'book',
                menuPath: '/project_list'
            }
        ];

        this.pages =
        [
            {
                path: '/project_list',
                component: ItemContainer('project', ProjectListView)
            },
            {
                path: '/personnel_journals',
                component: ItemContainer('personalJournal', PersonalJournalListView)
            },
            {
                path: '/journal_list',
                component: ItemContainer('journal', JournalListView)
            },
            {
                path: '/journal_statistics',
                component: JournalStatisticsView
            }
        ]

        this.defaultSelectedKeys = ['0'];
	}
}

export default ProjectView;