
import { injectReducer } from 'STORE/reducers'

const mapStateToProps = (state) => (
{
  	menus: state.moduleReducer.modules
})

export default (store) =>
{	
	injectReducer( store, 
	{
		key: 'moduleReducer',
		reducer: CoreLayoutReducer
	});

	return connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
}
