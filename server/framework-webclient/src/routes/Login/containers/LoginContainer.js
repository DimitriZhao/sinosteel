import {connect} from 'react-redux';
import LoginView from '../components/LoginView';

import {injectReducer} from 'STORE/reducers';

const SET_MODULES = "SET_MODULES";
const SET_SYS_USER = 'SET_SYS_USER';

export const setSysUser = (sysUser) =>
{
	return(
	{
		type: SET_SYS_USER,
		payload: sysUser
	});
}


const setModules = (modules) =>
{
	return(
	{
		type: SET_MODULES,
		payload: modules
	})
}

const initialState = 
{
	sysUser: {},
	modules: []
}

const LoginReducer = (state = initialState, action) =>
{
	switch(action.type)
	{
		case SET_SYS_USER:
			return(
			{
				...state,
				sysUser: action.payload
			});

		case SET_MODULES:
			return(
			{
				...state,
				modules: action.payload
			})

		default:
			return state;
	}
}

export default (store) =>
{
	injectReducer(store,
	{
		key: 'system',
		reducer: LoginReducer
	});

	return connect(null, null)(LoginView);
}