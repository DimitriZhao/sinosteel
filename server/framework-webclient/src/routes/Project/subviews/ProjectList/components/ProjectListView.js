import React, {Component, PropTypes} from 'react';
import {Row, Col, Icon, DatePicker, Input, Form} from 'antd';

import ListView from 'common/basic/components/ListView';

import ProjectSearchComponent from './ProjectSearchComponent';
import ProjectListComponent from './ProjectListComponent';
import ProjectOperationComponent from './ProjectOperationComponent';

class ProjectListView extends ListView
{
    constructor(props) 
    {
        super(props);

        //add
        this.operationComponent = ProjectOperationComponent;
        this.addAuthString = 'addProject';
        this.deleteAuthString = 'deleteProject';

        //list
        this.searchComponent = ProjectSearchComponent;
        this.listComponent = ProjectListComponent;
        this.editAuthString = 'editProject';

        this.name = 'project';
    }
}

export default ProjectListView;
