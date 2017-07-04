import React, {Component, PropTypes} from 'react';
import LzEditor from 'react-lz-editor';

export default class RichTextEditor extends Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			value: ''
		};
	}

	handleReceiveHtml = (content) =>
	{
		this.props.onChange(content);
	}

	componentWillReceiveProps(nextProps)
    {
        if ('value' in nextProps) 
        {
            const value = nextProps.value || '';

            this.setState(
            {
            	value
            });
        }
    }

	render()
	{
		const value = this.state.value;

		return(
			<LzEditor 
				active={false}
				HtmlContent={value}
				Audio={false}
				Video={false}
				Image={false}
				AutoSave={false}
				cbReceiver={(content) => this.handleReceiveHtml(content)}
			/>
		);
	}
}