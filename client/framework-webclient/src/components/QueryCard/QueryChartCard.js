import React, {Component, PropTypes} from 'react';

import {Card} from 'antd';

import ReactEchart from 'echarts-for-react';

import './queryCard.scss';
//import infographic_theme from 'styles/echarts/infographic';

import {sysFetch} from 'utils/FetchUtil';

export default class QueryChartCard extends Component
{	
	static propTypes =
	{
		title: PropTypes.string,
		queryPath: PropTypes.string,
		handleResponse: PropTypes.func
	}

	constructor(props)
	{
		super(props);

		this.state =
		{
			value: ''
		};
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
		const {queryPath, handleResponse} = this.props;

		sysFetch(queryPath, '', (res) =>
		{
            let value = res.data;
           	value = handleResponse(value);

            this.setState(
            {
                value: value
            });
		})
	}

	render()
	{
		const { icon, color, title } = this.props;
		const value = this.state.value;

		const option =
		{
		    legend: {},
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
		            radius : [30, 45],
		            //x: '0%', // for funnel
		            data : 
		            [
		                {
		                	name: value.otherName, 
		                	value: value.otherValue
		                },
		                {
		                	name: value.name, 
		                	value: value.value
		                }
		            ]
		        },
		    ]
		};

		return(
			<Card className='queryCard' bordered={true} bodyStyle={{padding: 0}}>
				<div className='chartWrap'>
					<ReactEchart option={option} style={
						{
							width: 200, 
							height: 150, 
							left: 'center',
							top: 'middle'
						}}/>
				</div>
		      	
		      	<div className='chartCardContent'>
		        	<p className='title'>
		        		{title || 'No Title'}
		        	</p>
		        	<p className='text'>
			          	{value.text}
		        	</p>
		      	</div>
		    </Card>
		);
	}
}