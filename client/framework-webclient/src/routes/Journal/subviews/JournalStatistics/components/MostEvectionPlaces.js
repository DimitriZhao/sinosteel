import React, {Component, PropTypes} from 'react';

import {Card, Row, Col} from 'antd';

import ReactEchart from 'echarts-for-react';

import createG2 from 'g2-react';
import { Stat } from 'g2';

import {queryMostFrequentEvectionPlacesService} from 'services';
import {sysFetch} from 'utils/FetchUtil';

import './JournalStatisticCard.scss';

export default class MostEvectionPlaces extends Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			locations: [],
			evections: [],
			total: 0
		}
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
		sysFetch(queryMostFrequentEvectionPlacesService, '', (res) =>
		{
			const data = res.data;

			this.setState(
			{
				locations: data.locations,
				evections: data.evections,
				total: data.total
			});
		});
	}

	render()
	{
		const {locations, evections, total} = this.state;

		const option =
		{
		    legend: {},
		    series : 
		    [
		        {
		            type : 'pie',
		            radius : [0, 60],
		            data : (() =>
		            {
		            	let data = [];
		            	let rest = total;

		            	for(var i = 0; i < evections.length; i++)
		            	{
		            		const name = locations[i];
		            		const value = evections;
		            		rest = rest - value;

		            		data.push(
		            		{
		            			name: name,
		            			value: value,
		            		});
		            	}

		            	data.push(
		            	{
		            		name: '其它地点',
		            		value: rest
		            	});

		            	return data;
		            })(),
		            label:
		        	{
		        		normal: 
		        		{
		        			show: true,
		        			textStyle:
		        			{
		        				color: 'black'
		        			}
		        		}
		        	},

		        	roseType: 'radius'
		        },
		    ]
		};

		return(
			<Card className='journalStatisticCard' title='出差最多地点'>
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