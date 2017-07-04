import React, {Component, PropTypes} from 'react';
import {Row, Col, Icon, DatePicker, Input, Form} from 'antd';

import ListView from 'common/CRUD/components/ListView';

import JournalSearchComponent from './JournalSearchComponent';
import JournalListComponent from './JournalListComponent';
import JournalOperationComponent from './JournalOperationComponent';

class JounralListView extends ListView
{
    constructor(props) 
    {
        super(props);

        //add
        this.operationComponent = null;
        this.addAuthString = 'none';
        this.deleteAuthString = 'none';

        //list
        this.searchComponent = JournalSearchComponent;
        this.listComponent = JournalListComponent;
        this.editAuthString = 'none';

        this.name = 'journal';
    }
}

export default JounralListView;
