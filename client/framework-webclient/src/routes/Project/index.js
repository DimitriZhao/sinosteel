import ProjectView from './components/ProjectView'

import ProjectListView from './subviews/ProjectList'

// 异步路由定义

export default 
{
  	path: 'project',
  	component: ProjectView,
  	childRoutes:
  	[
    	ProjectListView
  	]
}
