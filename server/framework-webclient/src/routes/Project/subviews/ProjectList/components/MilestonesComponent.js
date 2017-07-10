import React, {Component, PropTypes} from 'react';

import {Steps, Button, Row, Col, Form, Popover, DatePicker, Input, Icon, Modal} from 'antd';
const confirm = Modal.confirm;

const Step = Steps.Step;
const FormItem = Form.Item;

import moment from 'moment';
import Animate from 'rc-animate';

import SubListView from 'common/basic/components/subComponents/SubListView.js';

import authWrap from 'components/AuthWrap/AuthWrap';

import MilestoneEditView from './MilestoneEditView';
import MilestoneAddView from './MilestoneAddView';

import {addMilestoneService, deleteMilestoneService, editMilestoneService, queryMilestonesService} from 'services';

export default class MilestonesComponent extends SubListView
{
	constructor(props)
	{
		super(props);

		this.storeName = 'milestone';

        this.queryPath = queryMilestonesService;
        this.parentIdName = 'projectId';

		//add
		this.addViewModalName = '新增关键节点';
        this.addView = MilestoneEditView;
        this.addPath = addMilestoneService;
        this.addAuthString = 'addMilestone';

        //edit
        this.editViewModalName = '修改关键节点';
        this.editView = MilestoneAddView;
        this.editPath = editMilestoneService;
        this.editAuthString = 'editMilestone';

        //delete
        this.deletePath = deleteMilestoneService;
        this.deleteAuthString = 'deleteMilestone';
	}

	render()
	{
		const milestones = this.props.items;

		if(!milestones)
		{
			return <div />
		}

		const operationPopover = (dot, { status, index, title, description}) =>
		{
			const wrapperStyle =
			{
				padding: 8
			};

			const milestone = milestones[index];

			const prop = 
			{
				item: milestone
			}

			const handleDelete = this.handleDelete;

			const readonly = this.props.readonly;

			const editAuthString = this.editAuthString;
			const deleteAuthString = this.deleteAuthString;

			const EditButton = authWrap(
				<a className='btn-edit' onClick={() => this.handleOpenEdit(prop)} style={{ marginLeft: 8}}><Icon type='edit' style={{marginRight: 4}}/>修改</a>
			);
			const DeleteButton = authWrap(
				<a className='btn-delete' onClick={() => 
                {
                    confirm(
                    {
                        title: '确认删除该记录?',
                        content: '',
                        onOk() 
                        {
                            handleDelete(milestone.id)
                        }
                    });   
                }} style={{ marginLeft: 8}}><Icon type='delete' style={{marginRight: 4}}/>删除</a>
			);

			return (
				<Popover content=
				{
					<div>
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
						{
							readonly ? <div /> : (
								<Row>
									<div style={wrapperStyle}> 
										<EditButton authString={editAuthString} />
					                    <DeleteButton authString={deleteAuthString} />
					                </div>
								</Row>
							)
						}
					</div>
				}>
					{dot}
				</Popover>
			)
		}

		const milestoneSteps = milestones.map((milestone) =>
		{
			return(
				<Step key={milestone.key} title={milestone.milestoneName} description={milestone.milestoneTime} />
			)
		});

		const AddView = Form.create()(MilestoneAddView);
        const EditView = Form.create()(MilestoneEditView);
        const width = 400;

        const addAuthString = this.addAuthString;
        const AddButton = authWrap(
        	<Button className="btn-add" type="primary" icon="plus-circle-o" onClick={this.handleOpenAdd}>{'新增'}</Button>
        );

        const operation = this.props.readonly ? <div /> : (
        	<Row style={{'marginBottom': 30}}>
                <AddButton authString={addAuthString} />
            </Row>
        );

		return(
			<div>
				{operation}
                <Row>
					<Steps progressDot={operationPopover}>
						{milestoneSteps}
					</Steps>

					<Modal title='新增关键节点' width={width} visible={this.state.openAddModal} onOk={this.handleAdd} onCancel={this.handleCloseAdd}>
	                    <AddView setItemToAdd={this.setItemToAdd}/>
	                </Modal>

	                <Modal title='修改关键节点' width={width} visible={this.state.openEditModal} onOk={this.handleEdit} onCancel={this.handleCloseEdit}>
	                    <EditView item={this.state.selectedItem} setItemToEdit={this.setItemToEdit} />
	                </Modal>
	            </Row>
			</div>
		);
	}
} 