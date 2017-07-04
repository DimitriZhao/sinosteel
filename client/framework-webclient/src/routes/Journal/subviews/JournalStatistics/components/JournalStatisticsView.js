import React, {Component, PropTypes} from 'react';

import {Row, Col, Form, Tabs} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

import TotalJournalsCurrentMonth from './TotalJournalsCurrentMonth';
import MostJournalsCurrentMonth from './MostJournalsCurrentMonth';
import MostEvectionsCurrentMonth from './MostEvectionsCurrentMonth';
import MostEvectionPlaces from './MostEvectionPlaces';

import EvectionsMap from './EvectionsMap';

export default class JournalStatistics extends Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const formItemLayout = 
        {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };

		return(
			<div>
				<Row gutter={24} style={{width: '100%', marginBottom: 20}}>
					<Col span={8}>
						<TotalJournalsCurrentMonth />
					</Col>
					<Col span={8}>
						<MostJournalsCurrentMonth />
					</Col>
					<Col span={8}>
						<MostEvectionsCurrentMonth />
					</Col>
				</Row>
				<Row>
					<Tabs>
						<TabPane tab="出差信息" key="1">
							<EvectionsMap />
						</TabPane>
					</Tabs>
				</Row>
				<Row>
				</Row>
			</div>
		)
	}
}