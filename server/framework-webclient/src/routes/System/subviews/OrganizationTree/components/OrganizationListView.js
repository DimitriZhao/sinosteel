import React, {Component, PropTypes} from 'react';

import { Form, Table, Row, Button, Spin, message, Icon, Modal } from 'antd';

import SubListView from 'common/basic/components/subComponents/SubListView.js';

import OrganizationAddView from './OrganizationAddView';
import OrganizationEditView from './OrganizationEditView';

import {addOrganizationService, deleteOrganizationService, editOrganizationService, queryOrganizationsService} from 'services';
import {getStore} from 'store/globalStore';
import {setQueryParams, setQueryPath, refreshList, setPagination} from 'common/basic/reducers/ItemReducer'

import {refreshOrgs} from 'routes/System/containers/OrganizationTreeContainer';

export default class OrganizationListView extends SubListView
{
	constructor(props)
	{
		super(props);

        this.queryPath = queryOrganizationsService;
        this.parentIdName = 'parentId';

		//add
		this.addViewModalName = '新增组织';
        this.addView = OrganizationAddView;
        this.addPath = addOrganizationService;
        this.addAuthString = 'addOrganization';

		//inspect
        this.inspectView = null;
        this.inspect = false;

        //edit
        this.editViewModalName = '修改组织';
        this.editView = OrganizationEditView;
        this.editPath = editOrganizationService;
        this.editAuthString = 'editOrganization';

        //delete
        this.deletePath = deleteOrganizationService;
        this.deleteAuthString = 'deleteOrganization';

		this.columns = 
	    [
	        {
	            title: '组织名称',
	            dataIndex: 'organizationName'
	        }, 
	        {
	            title: '组织负责人',
	            dataIndex: 'principalName',
	        }
	    ];
	}

	queryItems = () =>
    {
        const parentIdName = this.parentIdName;

        let queryParams = {};
        queryParams[parentIdName] = this.props.parentId;

        getStore().dispatch(setQueryParams(this.props.storeName, queryParams));
        getStore().dispatch(refreshOrgs());
    }
}