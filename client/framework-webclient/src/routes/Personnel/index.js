import PersonnelView from './components/PersonnelView'
import PersonnelListView from './subviews/PersonnelList'

// 异步路由定义
export default 
{
	path: 'personnel',
	component : PersonnelView,
	childRoutes:
	[
	    PersonnelListView
	]
}
