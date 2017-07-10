import React, {PropTypes, Component} from 'react';

import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default class AdditionalAuthCheckbox extends Component
{
	static propTypes = 
	{
		setAdditionalAuthorizations: PropTypes.func
	}

	constructor(props)
	{
		super(props);

		this.options =
		[
		  	{ label: '个人所有', value: 'self' },
		  	{ label: '所在部门所有', value: 'affiliate' },
		];
	}

	onChange(checkedValues)
	{
		this.props.setAdditionalAuthorizations(checkValues);
	}

	render()
	{
		return(
			<CheckboxGroup options={this.options} onChange={this.onChange} />
		);
	}
}