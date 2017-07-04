import React, {Component, PropTypes} from 'react';
import {Row, Col, Icon, DatePicker, Input, Form} from 'antd';

import ListView from 'common/CRUD/components/ListView';

import PersonnelSearchComponent from './PersonnelSearchComponent';
import PersonnelListComponent from './PersonnelListComponent';
import PersonnelOperationComponent from './PersonnelOperationComponent';

class PersonnelListView extends ListView
{
    constructor(props) 
    {
        super(props);

        //add
        this.operationComponent = PersonnelOperationComponent;
        this.addAuthString = 'addPersonnel';
        this.deleteAuthString = 'deletePersonnel';

        //list
        this.searchComponent = PersonnelSearchComponent;
        this.listComponent = PersonnelListComponent;
        this.editAuthString = 'editPersonnel';

        this.name = 'personnel';
    }
}

export default PersonnelListView;
