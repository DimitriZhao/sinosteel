import React, {Component, PropTypes} from 'react';
import { Form, Row, Col, Input, Button, Icon, DatePicker } from 'antd';

import './SearchComponent.scss';

import {getStore} from 'STORE/globalStore';
import {refreshList, setQueryParams, setQueryPath} from 'common/basic/reducers/ItemReducer'

import {sysFetch} from 'utils/FetchUtil';

class SearchComponent extends Component 
{
	constructor(props)
	{
		super(props);

		this.queryPath = '';
	}

    componentWillMount()
    {
        getStore().dispatch(setQueryPath(this.props.storeName, this.queryPath));
    }

    componentDidMount()
    {
        this.queryItems();
    }

    componentDidUpdate(nextProps, nextState)
    {
        if(this.props.refreshList)
        {
            this.queryItems();
        }
    }

    handleValues = (values) =>
    {

    }

    handleSearch = (e) => 
    {
        e.preventDefault();
        this.props.form.validateFields((err, values) => 
        {
            this.handleValues(values);
            this.queryItems(values);
        });
    }

    handleReset = () =>
    {
        this.props.form.resetFields();
    }

    queryItems = (values) =>
    {
        getStore().dispatch(setQueryParams(this.props.storeName, values));
    }

	renderForm(formItems)
	{
	    return (
	      	<Form
	        	className="searchComponent"
	        	onSubmit={this.handleSearch}
	      	>
		      	{formItems}
	        	<Row>
	          		<Col span={24} style={{ textAlign: 'right' }}>
	            		<Button type="primary" icon="search" htmlType="submit">搜索</Button>
		            	<Button style={{ marginLeft: 8 }} icon="close" onClick={this.handleReset}>
		              		清除
		            	</Button>
	          		</Col>
	        	</Row>
		    </Form>
	    );
	}
}

function addKey(jsonArray)
{
    let newJsonArray = [];

    for(var i = 0; i < jsonArray.length; i++)
    {
        let jsonObject = jsonArray[i];

        let newJsonObject = 
        {
            key: i,
            ...jsonObject
        }

        newJsonArray.push(newJsonObject);
    }

    return newJsonArray;
}

export default SearchComponent;