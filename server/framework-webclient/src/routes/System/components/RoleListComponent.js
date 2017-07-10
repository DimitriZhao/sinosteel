import React, {Component, PropTypes} from 'react';

import ListComponent from 'common/basic/components/ListComponent.js'

import {getAllRolesService} from 'services';

import {getStore} from 'STORE/globalStore';
import {setItems} from 'common/basic/reducers/ItemReducer'

import ItemContainer from 'common/basic/containers/ItemContainer'
import ListContainer from 'common/basic/containers/ListContainer'

import {sysFetch} from 'utils/FetchUtil';

class RoleListComponent extends ListComponent
{
	constructor(props)
	{
		super(props);

        this.operationColumnWidth = '30%';

        this.columns = 
        [
            {
                title: '岗位编号',
                width: '30%',
                dataIndex: 'code'
            }, 
            {
                title: '岗位名称',
                width: '40%',
                dataIndex: 'roleName',
            }
        ];
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
        sysFetch(getAllRolesService, '', (res) =>
        {
            var items = addKey(res.data);

            getStore().dispatch(setItems(items, 'role'));

            this.setState(
            {
                loading: false
            });
        });
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

export default ListContainer('role', RoleListComponent);

