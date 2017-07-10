import { connect } from 'react-redux'
import CoreLayout from 'layouts/CoreLayout'

const mapStateToProps = (state) => (
{
  	modules: state.system.modules,
  	sysUser: state.system.sysUser
})

export default (store) =>
{	
	return connect(mapStateToProps, null)(CoreLayout);
}
