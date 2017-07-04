import React, {Component, PropTypes} from 'react';

import ReactEcharts from 'echarts'; 

import {sysFetch} from 'utils/FetchUtil';

export default class QueryChart extends Component
{
	static PropTypes =
	{
		queryPath: PropTypes.string
	}

	constructor(props)
	{
		super(props);

		this.state = 
		{
			data: []
		}
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
		const queryPath = this.props.queryPath;

        sysFetch(queryPath, '', (res) =>
        {
            let data = res.data;

            this.setState(
            {
                data
            });
        });
	}

	render()
	{
		return(
			<ReactEcharts {...this.props}/>
		);
	}
}