import React, {Component, PropTypes} from 'react';

import { Form, Row, Col, Input, Button, Icon, DatePicker, Select } from 'antd';
const FormItem = Form.Item;

import DateRange from 'components/DateRange/DateRange.js';
import QuerySelect from 'components/QuerySelect/QuerySelect.js';

import SearchComponent from 'common/CRUD/components/SearchComponent';

import {sysFetch} from 'utils/FetchUtil';

class JournalStatisticsSearchComponent extends SearchComponent
{
	static PropTypes = 
	{
		queryParamsPath: PropTypes.string,
		queryPath: PropTypes.string,
		valueIndex: PropTypes.string,
		textIndex: PropTypes.string,
		label: PropTypes.string,
		setData: PropTypes.func,
	}

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
        };

        this.queryPath = this.props.queryPath;
	}

	queryItems = () =>
    {
    	const queryPath = this.props.queryPath;

        sysFetch(queryPath, this.state.queryParams, (res) =>
        {
            var data = res.data;
            this.props.setData(data);
        });
    }

	render()
	{
		const formItemLayout = 
        {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };

        const formItems = [];
        const { getFieldDecorator } = this.props.form;

        const queryPath = this.props.queryPath;
        const valueIndex = this.props.valueIndex;
        const textIndex = this.props.textIndex;
        const label = this.props.label;
        const queryParamsPath = this.props.queryParamsPath;

        formItems.push(
            <Row gutter={40} justify='end' key='0'>
                <Col span={6}>
                    <FormItem {...formItemLayout} label={label}>
                    	{getFieldDecorator(valueIndex + 's', {
                    		
                    	})(
                        	<QuerySelect multiple queryPath={queryParamsPath} valueIndex={valueIndex} textIndex={textIndex}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem {...formItemLayout} label='编写时间'>
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

export default Form.create()(JournalStatisticsSearchComponent);