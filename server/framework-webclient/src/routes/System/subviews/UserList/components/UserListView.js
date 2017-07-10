import React, {Component, PropTypes} from 'react';

import { Form, Table, Row, Button, Spin, message, Icon, Modal } from 'antd';

import SubListView from 'common/basic/components/subComponents/SubListView.js';

import UserAddView from './UserAddView';
import UserEditView from './UserEditView';

import {addUserService, deleteUserService, editUserService, queryUsersService} from 'services';

import {replaceItemById} from 'utils/ArrayUtil';

import {sysFetch} from 'utils/FetchUtil';

export default class UserListView extends SubListView
{
	constructor(props)
	{
		super(props);

        this.queryPath = queryUsersService;
        this.parentIdName = 'organizationId';

        this.modalWidth = 500;

		//add
		this.addViewModalName = '新增用户';
        this.addView = UserAddView;
        this.addPath = addUserService;
        this.addAuthString = 'addUser';

		//inspect
        this.inspectView = null;
        this.inspect = false;

        //edit
        this.editViewModalName = '修改用户';
        this.editView = UserEditView;
        this.editPath = editUserService;
        this.editAuthString = 'editUser';

        //delete
        this.deletePath = deleteUserService;
        this.deleteAuthString = 'deleteUser';

		this.columns = 
	    [
	        {
	            title: '用户名',
	            dataIndex: 'username'
	        }, 
	        {
	            title: '创建时间',
	            dataIndex: 'createdTime',
	        }, 
	        {
	            title: '修改时间',
	            dataIndex: 'alteredTime',
	        }
	    ];
	}

	handleAdd = () =>
    {
        this.setState(
        {
            openAddModal: false
        });

        sysFetch(this.addPath, this.itemToAdd, (res) =>
        {
            let status = res.status;
            
            if(status == 'SUCCESS')
            {
                message.success(this.successMsgAdd);
                this.queryItems();
            }

            else if(status == 'FAILURE')
            {
                message.error(this.errorMsgAdd);
            }

            else
            {
                message.warning(this.warningMsgAdd);
            }

            this.itemToAdd = {};
        }, this.files)
    }

    handleEdit = () =>
    {
        this.setState(
        {
            openEditModal: false
        });

        sysFetch(this.editPath, this.itemToEdit, (res) =>
        {
            let status = res.status;
            
            if(status == 'SUCCESS')
            {
                replaceItemById(this.props.items, this.itemToEdit);
                message.success('修改成功');

                this.queryItems();
            }

            else if(status == 'FAILURE')
            {
                message.error('修改失败');
            }

            else
            {
                message.warning('服务器错误');
            }

            this.itemToEdit = {};
        }, this.files)
    }
}