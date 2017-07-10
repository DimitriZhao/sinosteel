import React, {Component, PropTypes} from 'react' 

import SearchComponent from 'common/basic/components/SearchComponent';

import {getAllRolesService} from 'services'; 

class RoleSearchComponent extends SearchComponent
{
	constructor(props)
	{
		super(props);

        this.queryPath = getAllRolesService;
	}

	render()
	{
		return <div />
	}
}

export default RoleSearchComponent;