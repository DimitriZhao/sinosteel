import SidemenuLayout from 'layouts/SidemenuLayout.js';

import PersonalJournalListView from '../subviews/PersonalJournalList/components/PersonalJournalListView';
import JournalListView from '../subviews/JournalList/components/JournalListView';
import JournalStatisticsView from '../subviews/JournalStatistics/components/JournalStatisticsView';

import ItemContainer from 'common/CRUD/containers/ItemContainer';

class JournalView extends SidemenuLayout
{
	constructor(props, menus)
	{
		super(props);
        this.menus = 
        [
            {
                menuId: '0',
                menuName: '个人项目日志',
                menuIcon: 'bars',
                menuPath: '/personnel_journals'
            },
            {
                menuId: '1',
                menuName: '项目日志列表',
                menuIcon: 'solution',
                menuPath: '/journal_list'
            },
            {
                menuId: '2',
                menuName: '日志信息统计',
                menuIcon: 'line-chart',
                menuPath: '/journal_statistics'
            }
        ];

        this.pages =
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
                path: '/journal_statistics',
                component: JournalStatisticsView
            }
        ]
	}
}

export default JournalView;