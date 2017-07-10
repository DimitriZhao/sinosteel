import {sysFetch} from 'utils/FetchUtil';
import {getStore} from 'store/globalStore';
const dispatch = getStore().dispatch;

import {findItemById} from 'utils/ArrayUtil'; 

import {addKey} from 'utils/ArrayUtil';

export const setItems = (items, name) =>
{
	return(
	{
		type: 'set_' + name,
		payload: items,
		name: name
	})
}

export const setQueryPath = (name, queryPath) =>
{
	return(
	{
		type: 'setQueryPath_' + name,
		payload: queryPath,
		name: name
	});
}

export const setQueryParams = (name, queryParams) => dispatch =>
{
	dispatch(
	{
		type: 'setQueryParams_' + name,
		payload: queryParams,
		name: name
	});

	const store = getStore();
	if(store[name] && store[name]['pagination'])
	{
		let pagination = store[name]['pagination']

		dispatch(
		{
			type: 'setPagination_' + name,
			payload:
			{
				...pagination,
				current: 1
			},
			name: name
		});
	}

	return queryItems(name, dispatch);
}

export const setPagination = (name, pagination) => dispatch =>
{
	dispatch(
	{
		type: 'setPagination_' + name,
		payload: pagination,
		name: name
	});

	return queryItems(name, dispatch);
}

const queryItems = (name, dispatch) =>
{
	dispatch(
	{
		type: 'setLoading_' + name,
		payload: true,
		name: name
	});

	const store = getStore();
	const state = store.getState();
	if(state)
	{
		const queryPath = state[name]['queryPath'];
		const queryParams = state[name]['queryParams'];
		const pagination = state[name]['pagination'];

		const params = 
		{
			...queryParams,
			pagination: pagination
		}

		sysFetch(queryPath, params, (res) =>
	    {
	    	const result = res.data;

	    	let items = [];
	    	let total = 0;

	    	if(result instanceof Array)
	    	{
	    		total = items.length;
	    		items = addKey(result)
	    	}
	    	else
	    	{
	    		items = addKey(result.data);
	        	total = result.total;
	    	}

	        dispatch(
	        {
	        	type: 'total_' + name,
	        	payload: total,
	        	name: name
	        });

	        dispatch(
	        {
	        	type: 'set_' + name,
	        	payload: items,
	        	name: name
	        });

	        dispatch(
	        {
	        	type: 'setLoading_' + name,
	        	payload: false,
	        	name: name
	        });
	    });
	}	
}

export const refreshList = (name) => dispatch =>
{
	return queryItems(name, dispatch);
}

/*
export const queryItems = (name, queryPath, params) => dispatch =>
{
	dispatch(
	{
		type: 'query_' + name
	});

	return sysFetch(queryPath, params, (res) =>
    {
        var items = addKey(res.data);

        dispatch(
        {
        	type: 'set_' + name,
        	payload: items,
        	name: name
        });

        return items =>
        {
    		const store = getStore();
	    	if(store[name] && store[name]['currentEditingItem'])
	    	{
	    		var itemId = store[name]['currentEditingItem'];

	    		dispatch(
	    		{
	    			type: 'setCurrentEditingItem_' + name,
					payload: itemId,
					name: name
	    		});
	    	}
        };
    });
}
*/

export const setCurrentEditingItem = (name, currentEditingItemId) =>
{
	return(
	{
		type: 'setCurrentEditingItem_' + name,
		payload: currentEditingItemId,
		name: name
	});
}