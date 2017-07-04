import React, {Component, PropTypes} from 'react';

import {Card, Row, Col} from 'antd';

import ReactEchart from 'echarts-for-react';

import createG2 from 'g2-react';
import { Stat } from 'g2';

import {queryMostJournalsPersonnelService} from 'services';
import {sysFetch} from 'utils/FetchUtil';

import './JournalStatisticCard.scss';

export default class MostJournalsCurrentMonth extends Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			personnelName: '',
			personnelTotal: 0,
			total: 0,
		}
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
		sysFetch(queryMostJournalsPersonnelService, '', (res) =>
		{
			const data = res.data;

			this.setState(
			{
				personnelName: data.personnelName,
				personnelTotal: data.personnelTotal,
				total: data.total,
			});
		});
	}

	render()
	{
		const {personnelName, personnelTotal, total} = this.state;

		const option =
		{
		    legend: {},
		    title: 
		    {
		        text: personnelTotal,
		        x: 'center',
		        y: 'center',
		        textStyle:
		        {
		        	fontSize: 38,
		        	fontWeight: 'bold'
		        }
		   	},
		    tooltip:
		    {
		    	show: false
		    },
		    toolbox: 
		    {
		    	show: false
		    },
		    series : 
		    [
		        {
		            type : 'pie',
		            radius : [50, 60],
		            data : 
		            [
		                {
		                	name: personnelName, 
		                	value: personnelTotal,
		                	itemStyle:
		                	{
		                		normal:
		                		{
		                			color: '#00ffff'
		                		}
		                	},
		                	tooltip : 
		                	{ 
						        trigger: 'item', 
						        formatter: ''
						    },
		                },
		                {
		                	name: '其它员工',
		                	value: total - personnelTotal,
		                	itemStyle:
		                	{
		                		normal:
		                		{
		                			color: '#4a86e8'
		                		}
		                	},
		                	tooltip : 
		                	{ 
						        trigger: 'item', 
						        formatter: ''
						    },
		                }
		            ],
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
		        	itemStyle:
		        	{ 
			            emphasis:
			            { 
			                label:
			                { 
			                    show: true, 
			                   // formatter: '{b} : {c} ({d}%)' 
			                }, 
			                labelLine:
			                {
			                	show: true
			                } 
			            } 
			        } 
		        },
		    ]
		};

		return(
			<Card className='journalStatisticCard' title='本月日志最多'>
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