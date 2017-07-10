import React, {Component, PropTypes} from 'react';

import ListView from 'common/basic/components/ListView';

import RoleListComponent from './RoleListComponent';
import RoleSearchComponent from './RoleSearchComponent';
import RoleOperationComponent from './RoleOperationComponent';

export default class RoleListView extends ListView
{
	constructor(props) 
    {
        super(props);

        //add
        this.operationComponent = RoleOperationComponent;
        this.addAuthString = 'addRole';
        this.deleteAuthString = 'deleteRole';

        //list
        this.searchComponent = RoleSearchComponent;
        this.listComponent = RoleListComponent;
        this.editAuthString = 'editRole';

        this.name = 'role';
    }
}