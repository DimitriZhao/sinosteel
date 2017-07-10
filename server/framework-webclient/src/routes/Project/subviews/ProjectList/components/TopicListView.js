import React, {Component, PropTypes} from 'react';

import { Form, Table, Row, Button, Spin, message, Icon, Modal } from 'antd';

import SubListView from 'common/basic/components/subComponents/SubListView.js';

import TopicAddView from './TopicAddView';
import TopicInspectView from './TopicInspectView';
import TopicEditView from './TopicEditView';

import {addTopicService, deleteTopicService, editTopicService, queryTopicsService} from 'services';

export default class TopicListView extends SubListView
{
	constructor(props)
	{
		super(props);

		this.storeName = 'topic';

        this.queryPath = queryTopicsService;
        this.parentIdName = 'projectId';

		//add
		this.addViewModalName = '新增课题';
        this.addView = TopicAddView;
        this.addPath = addTopicService;
        this.addAuthString = 'addTopic';

		//inspect
        this.inspectViewModalName = '查看课题';
        this.inspectView = TopicInspectView;

        //edit
        this.editViewModalName = '修改课题';
        this.editView = TopicEditView;
        this.editPath = editTopicService;
        this.editAuthString = 'editTopic';

        //delete
        this.deletePath = deleteTopicService;
        this.deleteAuthString = 'deleteTopic';

		this.columns = 
	    [
	        {
	            title: '课题名称',
	            dataIndex: 'topicName'
	        }, 
	        {
	            title: '课题地点',
	            dataIndex: 'location',
	        }, 
	        {
	            title: '开始时间',
	            dataIndex: 'startTime',
	        }, 
	        {
	            title: '负责人',
	            dataIndex: 'directorId'
	        }
	    ];
	}
}