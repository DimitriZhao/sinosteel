import React, {PropTypes, Component} from 'react';

import {Row, Col} from 'antd';

import ReactEchart from 'plugins/echarts/echarts-for-react';
require('plugins/echarts/china.js');

import EvectionsSearch from './EvectionsSearch';

export default class EvectionsMap extends Component
{
	constructor(props)
	{
		super(props);
		
		this.state = 
		{
			personnelName: [],
			evections: []
		}
	}

	setData = (data) =>
	{
		this.setState(
		{
			personnelName: data.personnelNames,
			evections: data.evections
		});
	}

	render()
	{
        const setData = (data) => 
        {
        	this.setData(data)
        };

        const {personnelNames, evections} = this.state;

        let data = this.state.data;
        const option = 
        {
		    title: {},
		    tooltip: 
		    {
		        trigger: 'item'
		    },
		    geo:
	        {
	        	left: '10%',
	        	top: '10%',
	        	right: '10%',
	        	bottom: '10%',
	        },
		    legend: {},
		    toolbox: 
		    {
		        show: true,
		        orient: 'vertical',
		        left: 'right',
		        top: 'center',
		        feature:
		        {
		            dataView: 
		            {
		            	readOnly: false
		            },
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    series: (() =>
		    {
		    	return evections.map(evection =>
		    	{
		    		return(
		    		{
		    			name: evection.name,
		    			type: 'map',
		    			mapType: 'china',
		    			roam: false,
		    			label: 
		    			{
			                normal: 
			                {
			                    show: true
			                },
			                emphasis: 
			                {
			                    show: true
			                }
			            },
			            data: evection.data
		    		});
		    	});
		    })()
		};

		return(
			<div>
				<Row>
					<EvectionsSearch setData={setData} />
				</Row>
				<Row>
					<div style={{marginTop: 24, width: '100%'}}>
						<ReactEchart 
							option={option}
							style={{minHeight: '800px', width: '100%'}} 
						/>
					</div>
				</Row>
			</div>
		);
	}
}