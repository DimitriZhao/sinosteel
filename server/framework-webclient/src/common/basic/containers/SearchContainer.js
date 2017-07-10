import { connect } from 'react-redux'

import { getStore } from 'STORE/globalStore'

export default (key, component) =>
{	
	const mapStateToProps = (state) => 
	{
		return(
		{
		  	refreshList: state[key].refreshList
		})
	}

	return connect(mapStateToProps, null)(component);
}

