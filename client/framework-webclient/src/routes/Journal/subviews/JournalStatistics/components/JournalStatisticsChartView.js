import React, {Component, PropTypes} from 'react';

import {Row, Col} from 'antd';

import ReactEchart from 'echarts-for-react';
import JournalStatisticsSearchComponent from './JournalStatisticsSearchComponent';

export default class JournalStatisticsChartView extends Component
{
	static PropTypes = 
	{
		queryPath: PropTypes.string,
		queryParamsPath: PropTypes.string,
		valueIndex: PropTypes.string,
		textIndex: PropTypes.string,
		label: PropTypes.string,
	}

	constructor(props)
	{
		super(props);

		this.state = 
		{
			data: null,
			chartType: 'line',
		};
	}

	setData(data)
	{
		this.setState(
		{
			data: data
		});
	}

	render()
	{
		const queryPath = this.props.queryPath;
        const valueIndex = this.props.valueIndex;
        const textIndex = this.props.textIndex;
        const label = this.props.label;
        const queryParamsPath = this.props.queryParamsPath;
        const setData = (data) => 
        {
        	this.setData(data)
        };

        let data = this.state.data;
        const option = 
        {
	        title: 
	        {
	            text: '日志数统计',
	            subText: '(个)'
	        },
	        tooltip: {},
	        legend: 
	        {
				data: data != null ? data.legends: []
			},
	        xAxis: 
	        {
	            data: data != null ? data.months : []
	        },
	        yAxis: {},
	        series: data != null ? addChartTypeToSeries(data.series, this.state.chartType) : []
	    };

		return(
			<div>
				<Row>
					<JournalStatisticsSearchComponent queryParamsPath={queryParamsPath} queryPath={queryPath} valueIndex={valueIndex} textIndex={textIndex} label={label} setData={setData} />
				</Row>
				<Row>
					<div style={{marginTop: 24, width: '100%'}}>
						<ReactEchart 
							option={option}
							style={{minHeight: '500px', width: '100%'}} 
						/>
					</div>
				</Row>
			</div>
		);
	}
}

function addChartTypeToSeries(series, chartType)
{
	series.map(serie =>
	{
		serie['type'] = chartType;
		serie['smooth'] = true;
	});

	return series;
}