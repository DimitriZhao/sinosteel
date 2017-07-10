import React, {Component, PropTypes} from 'react';
import { Form, Button } from 'antd';

import "./OperationComponent.scss";

import authWrap from 'components/AuthWrap/AuthWrap'

class OperationComponent extends Component
{
	static PropTypes = 
    {
        addTab: PropTypes.func, //addTab方法, 参数为addTab(key, name, component)
        addAuthString: PropTypes.string,
        deleteAuthString: PropTypes.string,
        removeTab: PropTypes.func,
    }

    static defaultProps = 
    {
    	addAuthString: 'all',
        deleteAuthString: 'all'
    }

	constructor(props)
	{
		super(props);

		this.addViewName = '';

		this.openAddButtonName  = '新增';
		this.addView = null;
		this.addAuthString = this.props.addAuthString

		this.batchDeleteButtonName = '批量删除';
		this.deletePath = '';
		this.deleteAuthString = this.props.deleteAuthString
	}

	componentWillMount()
	{
		const removeTab = this.props.removeTab;

		this.handleOpenAdd = () =>
		{
			this.props.addTab(this.addViewName, this.addViewName, Form.create()(this.addView), 
			{
				removeTab: () => removeTab(this.addViewName),
				storeName: this.props.storeName
			});
		}

		this.handleBatchDelete = () => 
		{
			
		}
	}

	render()
	{
		const addAuthString = this.addAuthString;
		const deleteAuthString = this.deleteAuthString;

		const AddButton = authWrap(
			<Button className="btn-add" type="primary" icon="plus-circle-o" onClick={this.handleOpenAdd}>{this.openAddButtonName}</Button>
		);

		const BatchDeleteButton = authWrap(
			<Button className="btn-batch-delete" type="primary" style={{ marginLeft: 8 }} icon="close-circle-o" onClick={this.handleBatchDelete}>{this.batchDeleteButtonName}</Button>
		);

		return(
			<div>
				<AddButton authString={addAuthString} />
				<BatchDeleteButton authString={deleteAuthString}/>
			</div>
				
		);
	}
}

export default OperationComponent