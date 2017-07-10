import React, {Component, PropTypes} from 'react';

import {getStore} from 'store/globalStore';

let authWrap = ComposedComponent => class AuthWrap extends Component
{
	static propTypes = 
	{
		authString: PropTypes.string
	}

	constructor(props)
	{
		super(props);

		this.hasAuth = this.isPermitted();
	}

	isPermitted = () =>
	{
		const authString = this.props.authString;
		if(authString === 'all')
		{
			return true;
		}
		if(authString === 'none')
		{
			return false;
		}

		const functions = getStore().getState().system.sysUser.functions;

		for(const _function of functions)
		{	
			if(authString === _function.functionString)
			{
				return true;
			}
		}

		return false;
	}

	render()
	{
		const hasAuth = this.hasAuth;

		if(!hasAuth)
		{
			return null;
		}
		else
		{
			if(ComposedComponent instanceof Object)
			{
				return ComposedComponent;
			}
			else
			{
				return <ComposedComponent {...this.props} />
			}
		}
	}
};

export default authWrap;