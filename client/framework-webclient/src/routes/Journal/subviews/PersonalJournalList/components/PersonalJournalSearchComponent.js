import React, {Component, PropTypes} from 'react' 
import { Form, Row, Col, Input, Button, Icon, DatePicker } from 'antd';

import SearchComponent from 'common/CRUD/components/SearchComponent';

import DateRange from 'COMPONENTS/DateRange/DateRange.js';
import QueryCascader from 'COMPONENTS/QueryCascader/QueryCascader.js';

import moment from 'moment';
import {queryPersonalJournalsService, queryAllProjectsService, queryAllTopicsService} from 'services'; 

import {getStore} from 'STORE/globalStore';

import {toStringRange} from 'utils/ArrayUtil';

const FormItem = Form.Item;

class PersonalJournalSearchComponent extends SearchComponent
{
	constructor(props)
	{
		super(props);

        this.queryPath = queryPersonalJournalsService;
	}

    handleValues = (values) =>
    {
        //writeTime
        let dates = values['writeTime'];
        if(dates)
        {
            values['writeTime'] = toStringRange(dates);
        }
    };

	render()
	{
		const formItemLayout = 
        {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };

        const formItems = [];
        const { getFieldDecorator } = this.props.form;

        formItems.push(
            <Row key='0'>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='项目课题'>
                    	{getFieldDecorator('topicId', {
                    		
                    	})(
                        	<QueryCascader
                                queryParentsPath={queryAllProjectsService}
                                queryChildrenPath={queryAllTopicsService}
                                parentsValueIndex='id'
                                parentsTextIndex='projectName'
                                childrenValueIndex='id'
                                childrenTextIndex='topicName'
                                parentIdName='projectId'
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span={16}>
                    <FormItem 
                    {
                        ...
                        {
                            labelCol: { span: 3 },
                            wrapperCol: { span: 21 },
                        }
                    } label='编写时间'>
                        {getFieldDecorator('writeTime', {

                        })(
                            <DateRange />
                        )}
                    </FormItem>
                </Col>
            </Row>
        );

        return this.renderForm(formItems);
	}
}

export default PersonalJournalSearchComponent;