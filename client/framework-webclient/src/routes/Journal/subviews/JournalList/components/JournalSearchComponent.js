import React, {Component, PropTypes} from 'react' 
import { Form, Row, Col, Input, Button, Icon, DatePicker } from 'antd';

import SearchComponent from 'common/CRUD/components/SearchComponent';
import DateRange from 'COMPONENTS/DateRange/DateRange.js';
import moment from 'moment';

import QueryCascader from 'components/QueryCascader/QueryCascader.js';

import {queryJournalsService, queryAllProjectsService, queryAllTopicsService} from 'services'; 

const FormItem = Form.Item;

class JournalSearchComponent extends SearchComponent
{
	constructor(props)
	{
		super(props);

		this.handleValues = (values) =>
        {
            let dates = values['writeTime'];
            if(dates instanceof Array)
            {
                var dateStrings = new Array(2);

                for(var i = 0; i < 2; i++)
                {
                    var date = dates[i];

                    if(date)
                    {
                        var dateString = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                        dateStrings[i] = dateString;
                    }
                    else
                    {
                        dateStrings[i] = '';
                    }
                }

                values['writeTime'] = dateStrings;
            }
        }

        this.queryPath = queryJournalsService;
	}

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
                    <FormItem {...formItemLayout} label='编写人'>
                    	{getFieldDecorator('personnelName', {
                    		
                    	})(
                        	<Input />
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

        formItems.push(
            <Row>
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
            </Row>
        );

        return this.renderForm(formItems);
	}
}

export default JournalSearchComponent;