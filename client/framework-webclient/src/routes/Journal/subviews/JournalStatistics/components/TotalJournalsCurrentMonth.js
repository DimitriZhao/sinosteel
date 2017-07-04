import React, {Component, PropTypes} from 'react';

import {Card, Row, Col} from 'antd';

import ReactEchart from 'echarts-for-react';

import {queryJournalsIncrementService} from 'services';
import {sysFetch} from 'utils/FetchUtil';

import './JournalStatisticCard.scss';

export default class TotalJouranlsCurrentMonth extends Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			total: 0,
			totalLastMonth: 0,
			totalBeforeLastMonth: 0
		}
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
		sysFetch(queryJournalsIncrementService, '', (res) =>
		{
			const data = res.data;

			this.setState(
			{
				total: data.total,
				totalLastMonth: data.totalLastMonth,
				totalBeforeLastMonth: data.totalBeforeLastMonth
			});
		});
	}

	render()
	{
		const data = this.state;

		const total = data.total;
		const totalLastMonth = data.totalLastMonth;
		const totalBeforeLastMonth = data.totalBeforeLastMonth;

		const max = Math.max(total, totalLastMonth, totalBeforeLastMonth);
		const min = Math.min(total, totalLastMonth, totalBeforeLastMonth);

		const option =
		{
		    title: {},
	        tooltip: {},
	        legend: {},
	        grid:
	        {
	        	show: false,
	        	left: '10%',
	        	top: '10%',
	        	right: '10%',
	        	bottom: '10%',
	        },
	        xAxis: 
	        {
	            data: ['前月总量', '上月总量', '本月总量'],
	            splitLine:
	            {
	            	show: false
	            },
	            axisTick:
	            {
	            	show: false
	            },
	            axisLabel:
	            {
	            	textStyle:
	            	{
	            		color: 'rgba(148, 147, 147, 0.85)'
	            	}
	            },
	            axisLine:
	            {
	            	lineStyle:
	            	{
	            		color: 'rgba(148, 147, 147, 0.85)'
	            	}
	            }
	        },
	        yAxis: 
	        {
	        	splitLine:
	            {
	            	show: false
	            },
	            axisTick:
	            {
	            	show: false
	            },
	            axisLabel:
	            {
	            	textStyle:
	            	{
	            		color: 'rgba(148, 147, 147, 0.85)'
	            	}
	            },
	            axisLine:
	            {
	            	lineStyle:
	            	{
	            		color: 'rgba(148, 147, 147, 0.85)'
	            	}
	            },
	            interval:  Math.round(max / 2)
	        },
	        series: [
	        {
	        	data: [totalBeforeLastMonth, totalLastMonth, total],
	        	type: 'line',
	        	lineStyle:
	        	{
	        		normal:
	        		{
	        			width: 3,
	        		}
	        	},
	        	itemStyle:
	        	{
	        		normal:
	        		{
	        			borderWidth: 3,
	        			color: '#8e7cc3'
	        		}
	        	},
	        	label:
	        	{
	        		normal: 
	        		{
	        			show: true,
	        			textStyle:
	        			{
	        				fontSize: 20,
	        				color: 'black'
	        			}
	        		}
	        	}
	        }]
		};

		return(
			<Card className='journalStatisticCard' title='本月日志总量'>
				<ReactEchart option={option} style={
				{
					width: 300, 
					height: 200, 
					left: 'center',
					top: 'middle',
				}} />
			</Card>
		)
	}
}