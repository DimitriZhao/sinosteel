import React, {PropTypes, Component} from 'react';

import { Form, Row, Col, Input, Button, Icon, DatePicker, Select } from 'antd';
const FormItem = Form.Item;

import DateRange from 'components/DateRange/DateRange.js';
import QuerySelect from 'components/QuerySelect/QuerySelect.js';

import SearchComponent from 'common/CRUD/components/SearchComponent';

import {sysFetch} from 'utils/FetchUtil';
import {toStringRange} from 'utils/DateUtil';

import {queryAllPersonnelsService, queryEvectionsService} from 'services';

class EvectionMap extends SearchComponent
{
	static propTypes = 
	{
		setData: PropTypes.func
	}

	constructor(props)
	{
		super(props);
	}

	handleValues = (values) =>
    {
        let dates = values['writeTime'];
        if(dates)
        {
            values['writeTime'] = toStringRange(dates);
        }
    };

	queryItems = (values) =>
    {
    	const setData = this.props.setData;

        sysFetch(queryEvectionsService, values, (res) =>
        {
            const data = res.data;
            setData(data);
        });
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
                    <FormItem {...formItemLayout} label='选择员工'>
                    	{getFieldDecorator('personnelIds', {
                    		
                    	})(
                        	<QuerySelect multiple queryPath={queryAllPersonnelsService} valueIndex='id' textIndex='personnelName'/>
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
                    } label='选择时间'>
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

export default Form.create()(EvectionMap);