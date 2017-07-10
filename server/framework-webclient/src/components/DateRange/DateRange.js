import React from 'react';

import { DatePicker } from 'antd';

export default class DateRange extends React.Component 
{
	constructor(props)
	{
		super(props);
    
	    this.state = 
	  	{
		    value: [null, null]
	  	};
	}

	componentWillReceiveProps(nextProps)
	{
	    if ('value' in nextProps) 
	    {
	      	const value = nextProps.value || [];
	      	this.setState({ value });
	    }
	}

  	disabledStartDate = (startValue) => 
  	{
    	const endValue = this.state.value[1];
    	if (!startValue || !endValue) 
    	{
      		return false;
    	}
    	return startValue.valueOf() > endValue.valueOf();
  	}

  	disabledEndDate = (endValue) =>
  	{
    	const startValue = this.state.value[0];
    	if (!endValue || !startValue) 
    	{
      		return false;
    	}
    	return endValue.valueOf() <= startValue.valueOf();
  	}

  	onChange = (field, value) =>
  	{
 		const val = this.state.value;

  		if(field == 'startValue')
  		{
  			val[0] = value;
  		}
  		else
  		{
  			val[1] = value;
  		}

  		this.setState(
  		{
  			value: val
  		});

  		const onChange = this.props.onChange;
        if(onChange)
        {
            onChange(val);
        }
  	}

  	onStartChange = (value) => 
  	{
    	this.onChange('startValue', value);
  	}

  	onEndChange = (value) =>
   	{
    	this.onChange('endValue', value);
  	}

  	render() 
  	{
    	const { value, endOpen } = this.state;
    	const startValue = value[0];
    	const endValue = value[1];

    	return (
      		<div>
        		<DatePicker
          			disabledDate={this.disabledStartDate}
		          	format="YYYY-MM-DD"
		          	value={startValue}
		          	placeholder="起始时间"
		          	onChange={this.onStartChange}
        		/>
        		{' ~ '}
		        <DatePicker
		          	disabledDate={this.disabledEndDate}
		          	format="YYYY-MM-DD"
		          	value={endValue}
		          	placeholder="结束时间"
		          	onChange={this.onEndChange}
        		/>
      		</div>
    	);
  	}
}