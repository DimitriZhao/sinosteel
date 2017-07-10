import { connect } from 'react-redux'

import { getStore } from 'STORE/globalStore'

export default (key, component) =>
{	
	const mapStateToProps = (state) => 
	{
		return(
		{
		  	item: state[key].currentEditingItem
		})
	}

	return connect(mapStateToProps, null)(component);
}

