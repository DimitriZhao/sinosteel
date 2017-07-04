import SidemenuLayout from 'layouts/SidemenuLayout.js';

import PersonnelListView from '../subviews/PersonnelList/components/PersonnelListView';
import ItemContainer from 'common/CRUD/containers/ItemContainer';

class PersonnelView extends SidemenuLayout
{
	constructor(props)
	{
		super(props);
        this.menus = 
        [
            {
                menuId: '0',
                menuName: '员工信息',
                menuIcon: 'solution',
                menuPath: '/personnel_list'
            }
        ];

        this.pages =
        [
            {
                path: '/personnel_list',
                component: ItemContainer('personnel', PersonnelListView)
            }
        ]
	}
}

export default PersonnelView;