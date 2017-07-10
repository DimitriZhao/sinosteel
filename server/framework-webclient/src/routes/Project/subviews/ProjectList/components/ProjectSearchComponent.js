import React, {Component, PropTypes} from 'react' 
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select } from 'antd';
import DateRange from 'components/DateRange/DateRange.js';

import SearchComponent from 'common/basic/components/SearchComponent';

import moment from 'moment';
import {queryProjectsService} from 'services'; 

import {toStringRange} from 'utils/DateUtil';

const FormItem = Form.Item;
const Option = Select.Option;

class ProjectSearchComponent extends SearchComponent
{
	constructor(props)
	{
		super(props);

        this.queryPath = queryProjectsService;
	}

    handleValues = (values) =>
    {
        let dates = values['startTime'];
        if(dates)
        {
            values['startTime'] = toStringRange(dates);
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
                    <FormItem {...formItemLayout} label='项目名称'>
                    	{getFieldDecorator('projectName', {
                    		
                    	})(
                        	<Input style={{width: width}}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='项目地点'>
                    	{getFieldDecorator('location', {
                    		
                    	})(
                        	<Input style={{width: width}}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='是否完成'>
                        {getFieldDecorator('completed', {

                        })(
                            <Select allowClear style={{width: width}}>
                                <Option value="1">已完成</Option>
                                <Option value="0">未完成</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
            </Row>
        );

        formItems.push(
            <Row key='1'>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='预计工期'>
                        {getFieldDecorator('expectedDuration', {
                            
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
                    } label='开始时间'>
                        {getFieldDecorator('startTime', {

                        })(
                            <DateRange style={{width: width}}/>
                        )} 
                    </FormItem>
                </Col>
            </Row>
        );

        return this.renderForm(formItems);
	}
}

export default ProjectSearchComponent;