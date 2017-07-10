import { connect } from 'react-redux'
import ProjectReducer, { setProjects } from '../store/ProjectStore'

import { injectReducer } from 'STORE/reducers'

import ProjectListView from '../subviews/ProjectList/ProjectListView'

const mapDispatchToProps = 
{
  	setProjects: (projects) => setProjects(projects)
}

const mapStateToProps = (state) => (
{
  	projects: state.projects
})

export default (store) =>
{	
	injectReducer( store, 
	{
		key: 'project',
		reducer: ProjectReducer
	});

	return connect(mapStateToProps, mapDispatchToProps)(ProjectListView);
}
