import React, {Component, PropTypes} from 'react';
import {Row, Col, Icon, DatePicker, Input, Form} from 'antd';

import ListView from 'common/CRUD/components/ListView';

import PersonalJournalSearchComponent from './PersonalJournalSearchComponent';
import PersonalJournalListComponent from './PersonalJournalListComponent';
import PersonalJournalOperationComponent from './PersonalJournalOperationComponent';

class PersonalJournalListView extends ListView
{
    constructor(props) 
    {
        super(props);

        //add
        this.operationComponent = PersonalJournalOperationComponent;
        this.addAuthString = 'addJournal';
        this.deleteAuthString = 'deleteJournal';

        //list
        this.searchComponent = PersonalJournalSearchComponent;
        this.listComponent = PersonalJournalListComponent;
        this.editAuthString = 'editJournal';

        this.name = 'personalJournal';
    }
}

export default PersonalJournalListView;
