import React, {Component, PropTypes} from 'react' 
import { Form, Row, Col, Input, Button, Icon, Select, InputNumber } from 'antd';

import DateRange from 'COMPONENTS/DateRange/DateRange.js';

import SearchComponent from 'common/CRUD/components/SearchComponent';
import moment from 'moment';
import {queryPersonnelsService} from 'services'; 

import {toStringRange} from 'utils/DateUtil';

const FormItem = Form.Item;
const Option = Select.Option;

class PersonnelSearchComponent extends SearchComponent
{
	constructor(props)
	{
		super(props);

        this.queryPath = queryPersonnelsService;
	}

    handleValues = (values) =>
    {
        //graduateTime
        let graduateTime = values['graduateTime'];
        if(graduateTime)
        {
            values['graduateTime'] = toStringRange(graduateTime);
        }

        //workStartTime
        let workStartTime = values['workStartTime'];
        if(workStartTime)
        {
            values['workStartTime'] = toStringRange(workStartTime);
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
                    <FormItem {...formItemLayout} label='员工姓名'>
                    	{getFieldDecorator('personnelName', {
                    		
                    	})(
                        	<Input style={{width: width}}/>
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
                    } label='工作时间'>
                        {getFieldDecorator('workStartTime', {

                        })(
                            <DateRange style={{width: width}}/>
                        )}
                    </FormItem>
                </Col>
            </Row>
        );

        formItems.push(
            <Row key='1'>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='年龄'>
                        {getFieldDecorator('age', {

                        })(
                            <InputNumber style={{width: width}}/>
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
                    } label='毕业时间'>
                        {getFieldDecorator('graduateTime', {

                        })(
                            <DateRange style={{width: width}}/>
                        )}
                    </FormItem>
                </Col>
            </Row>
        );

        formItems.push(
            <Row key='2'>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='毕业院校'>
                        {getFieldDecorator('graduateFrom', {

                        })(
                            <Input style={{width: width}}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='学历'>
                        {getFieldDecorator('scholar', {

                        })(
                            <Select style={{width: width}}>
                                <Option value="bachelor">学士</Option>
                                <Option value="master">硕士</Option>
                                <Option value="doctor">博士</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
            </Row>
        );

        return this.renderForm(formItems);
	}
}

export default PersonnelSearchComponent;