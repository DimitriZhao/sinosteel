import React, {Component, PropTypes} from 'react';
import {Row, Col, Icon, DatePicker, Input, Form} from 'antd';

import ListView from 'common/basic/components/ListView';

import StandardSearchComponent from './StandardSearchComponent';
import StandardListComponent from './StandardListComponent';
import StandardOperationComponent from './StandardOperationComponent';

class StandardListView extends ListView
{
    constructor(props) 
    {
        super(props);

        //add
        this.operationComponent = StandardOperationComponent;
        this.addAuthString = 'addStandard';
        this.deleteAuthString = 'deleteStandard';

        //list
        this.searchComponent = StandardSearchComponent;
        this.listComponent = StandardListComponent;
        this.editAuthString = 'editStandard';

        this.name = 'standard';
    }
}

export default StandardListView;
