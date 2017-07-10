import React, {Component, PropTypes} from 'react' 
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select } from 'antd';
import DateRange from 'components/DateRange/DateRange.js';

import SearchComponent from 'common/basic/components/SearchComponent';

import moment from 'moment';
import {queryStandardsService} from 'services'; 

import {toStringRange} from 'utils/DateUtil';

import QuerySelect from 'components/QuerySelect/QuerySelect.js';

const FormItem = Form.Item;
const Option = Select.Option;

class StandardSearchComponent extends SearchComponent
{
	constructor(props)
	{
		super(props);

        this.queryPath = queryStandardsService;
	}

    handleValues = (values) =>
    {
        //issueDate
        let issueDate = values['issueDate'];
        if(issueDate)
        {
            values['issueDate'] = toStringRange(issueDate);
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

        const width = '100%';

        formItems.push(
            <Row key='0'>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='标准名称'>
                    	{getFieldDecorator('name', {
                    		
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
                    } label='颁布时间'>
                        {getFieldDecorator('issueDate', {

                        })(
                            <DateRange />
                        )} 
                    </FormItem>
                </Col>
            </Row>
        );

        formItems.push(
            <Row key='1'>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='状态'>
                        {getFieldDecorator('status', {
                            
                        })(
                            <Select style={{width: width}}>
                                <Option value="1">在执行</Option>
                                <Option value="0">废止</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='类型'>
                        {getFieldDecorator('type', {

                        })(
                            <Select style={{width: width}}>
                                <Option value="0">强制</Option>
                                <Option value="1">行业</Option>
                                <Option value="2">推荐</Option>
                            </Select>
                        )} 
                    </FormItem>
                </Col>
            </Row>
        );

        return this.renderForm(formItems);
	}
}

export default StandardSearchComponent;