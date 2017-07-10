import React, {Component, PropTypes} from 'react';

import {Card, Icon} from 'antd';

import './queryCard.scss';

import {sysFetch} from 'utils/FetchUtil';

export default class QueryCard extends Component
{	
	static propTypes =
	{
		icon: PropTypes.string,
		color: PropTypes.string,
		title: PropTypes.string,
		queryPath: PropTypes.string,
		queryParams: PropTypes.object,
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
		const {queryPath, queryParams, handleResponse} = this.props;

		sysFetch(queryPath, queryParams ? queryParams : '', (res) =>
		{
			let value = res.data;

            if(handleResponse)
            {
            	value = handleResponse(value);
            }

            this.setState(
            {
                value: value
            });
		});
	}

	render()
	{
		const { icon, color, title } = this.props;

		return(
			<Card className='queryCard' bordered={true} bodyStyle={{padding: 0}}>
		      	<Icon className='iconWarp' style={{ color: color }} type={icon} />
		      	<div className='content'>
		        	<p className='title'>
		        		{title || 'No Title'}
		        	</p>
		        	<p className='number'>
			          	{this.state.value}
		        	</p>
		      	</div>
		    </Card>
		);
	}
}