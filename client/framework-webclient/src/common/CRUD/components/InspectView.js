import React, {Component, PropTypes} from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;

//import './InspectView.scss';

class InspectView extends Component
{
	constructor(props)
	{
		super(props);

		this.itemClone = Object.assign({}, this.props.item);

	}

	renderForm(formItems)
	{
	 	return (
	      	<Form
	        	className="inspectView"
	      	>
		      	{formItems}
		    </Form>
	    );
	}
}

export default InspectView;