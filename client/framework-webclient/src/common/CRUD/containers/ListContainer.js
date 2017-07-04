import { connect } from 'react-redux'

import { getStore } from 'STORE/globalStore'

export default (key, component) =>
{	
	const mapStateToProps = (state) => 
	{
		const pagination = state[key]['pagination'];

		return(
		{
		  	items: state[key].items,
		  	total: state[key].total,
		  	current: pagination ? pagination.current : 1,
		  	pageSize: pagination ? pagination.pageSize : 10,
		  	refreshList: state[key].refreshList,
		  	loading: state[key].loading
		})
	}

	return connect(mapStateToProps, null)(component);
}

