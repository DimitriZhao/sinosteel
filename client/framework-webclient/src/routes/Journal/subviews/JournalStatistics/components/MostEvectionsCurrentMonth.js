import React, {Component, PropTypes} from 'react';

import {Card, Row, Col} from 'antd';

import ReactEchart from 'echarts-for-react';

import createG2 from 'g2-react';
import { Stat } from 'g2';

import {queryMostEvectionPersonnelsService} from 'services';
import {sysFetch} from 'utils/FetchUtil';

import './JournalStatisticCard.scss';

export default class MostEvectionsCurrentMonth extends Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			personnelNames: [],
			personnelTotals: [],
		}
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
		sysFetch(queryMostEvectionPersonnelsService, '', (res) =>
		{
			const data = res.data;

			this.setState(
			{
				personnelNames: data.personnelNames,
				personnelTotals: data.personnelTotals,
			});
		});
	}

	render()
	{
		const {personnelNames, personnelTotals} = this.state;

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
	            data: personnelNames,
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
	        },
	        series: [
	        {
	        	data: personnelTotals,
	        	type: 'bar',
	        	barWidth: '25%',
	        	label:
	        	{
	        		normal: 
	        		{
	        			show: true,
	        			position: 'top',
	        			textStyle:
	        			{
	        				fontSize: 20,
	        				color: 'black'
	        			}
	        		}
	        	},
	        	itemStyle:
	        	{
	        		normal:
	        		{
	        			color: (params) =>
	        			{
	                        const colorList = ['#ea9999','#f6b26b','#93c47d'];
	                        return colorList[params.dataIndex];
	                    }
	        		}
	        	}
	        }]
		};

		return(
			<Card className='journalStatisticCard' title='本月出差最多'>
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