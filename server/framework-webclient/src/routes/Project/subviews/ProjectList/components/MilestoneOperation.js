import React, {Component, PropTypes} from 'react';

import {Button, Row, Form, DatePicker, Input, Icon} from 'antd';

const FormItem = Form.Item;

import moment from 'moment';

class MilestoneOperation extends Component
{
	static propTypes =
	{
		milestone: PropTypes.object,
		editMilestone: PropTypes.func,
	}

	constructor(props)
	{
		super(props);

		this.state = 
		{
			milestone: this.props.milestone || 
			{
				index: 0,
				milestoneName: '',
				milestoneTime: ''
			},
			lock: true
		}
	}

	handleOpenEdit = () =>
	{
		this.setState(
		{
			lock: false
		})

		let milestone = Object.assign({}, this.state.milestone);
		milestone.milestoneTime = moment(milestone.milestoneTime, 'YYYY-MM-DD').format('YYYY-MM-DD');
	}

	handleEdit = (e) =>
	{
		e.preventDefault();
        this.props.form.validateFields((err, values) => 
        {
        	values.milestoneTime = moment(values.milestoneTime, 'YYYY-MM-DD').format('YYYY-MM-DD');
        	let milestone = 
        	{
        		...this.state.milestone,
        		...values
        	};

           	this.props.editMilestone(milestone);
           	this.setState(
           	{
           		milestone: milestone
           	});
        });
	}

	render()
	{
		let milestone = this.state.milestone;

		const { getFieldDecorator } = this.props.form;

		const wrapperStyle =
		{
			padding: 8
		};

		const width = 200;

		const addMilestoneForm = this.state.lock ? (
			<Form>
				<Row>
					<div style={wrapperStyle}>
						<span>节点名称: </span>{milestone.milestoneName}
					</div>
				</Row>
				<Row>
					<div style={wrapperStyle}>
						<span>节点时间: </span>{milestone.milestoneTime}
					</div>
				</Row>
				<Row>
					<div style={wrapperStyle}>
						<a className='btn-edit' onClick={this.handleOpenEdit} style={{ marginLeft: 8}}><Icon type='edit' style={{marginRight: 4}}/>修改</a>
	                    <a className='btn-delete' style={{ marginLeft: 8}}><Icon type='delete' style={{marginRight: 4}}/>删除</a>
	                </div>
				</Row>
			</Form>
		) : (
			<Form>
				<Row>
					<div style={wrapperStyle}>
						<span>节点名称: </span>
						{getFieldDecorator('milestoneName', {

		        		})(
							<Input style={{width: width}}/>
						)}
					</div>
				</Row>
				<Row>
					<div style={wrapperStyle}>
						<span>节点时间: </span>
						{getFieldDecorator('milestoneTime', {

		        		})(
							<DatePicker style={{width: width}}/>
						)}
					</div>
				</Row>
				<Row>
					<div style={wrapperStyle}>
						<a className='btn-inspect' onClick={this.handleEdit} style={{ marginLeft: 8}}><Icon type='check' style={{marginRight: 4}}/>确认</a>
	                    <a className='btn-delete' style={{ marginLeft: 8}}><Icon type='delete' style={{marginRight: 4}}/>删除</a>
	                </div>
				</Row>
			</Form>
		);

		return addMilestoneForm;
	}
}

export default Form.create()(MilestoneOperation);