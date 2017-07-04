import React, {Component, PropTypes} from 'react';

import {getStore} from 'STORE/globalStore';
import {setSysUser} from 'routes/Login/containers/LoginContainer';
import {setModules} from 'layouts/store/CoreLayoutStore';

import './Blank.scss';

export default class Blank extends Component
{
	constructor(props)
	{
		super(props);
	}

	componentWillMount()
	{
		const sysUserString = sessionStorage.getItem('sysUser');
		if(sysUserString)
		{
			const sysUser = JSON.parse(sysUserString);
			getStore().dispatch(setSysUser(sysUser));
			getStore().dispatch(setModules(sysUser.modules));

			this.props.router.replace('/index');
		}
		else
		{
			this.props.router.replace('/login');
		}
	}

	render()
	{
		return(
            <div className="blank">
				{ this.props.children }
			</div>
		);
	}
}