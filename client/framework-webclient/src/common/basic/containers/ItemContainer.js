import { connect } from 'react-redux'
import { setItems, queryItems, setCurrentEditingItem } from '../reducers/ItemReducer'

import { injectReducer } from 'STORE/reducers'
import { getStore } from 'STORE/globalStore'

import {sysFetch} from 'utils/FetchUtil';
import {addKey, findItemById} from 'utils/ArrayUtil'; 

export const initialState = 
{
	items: [],
	total: 0,
	currentEditingItem: null,
	queryParams: null,
	pagination: null,
	queryPath: '',
	loading: false
};

export function injectItemReducers(key)
{
	let SET_ITEMS = 'set_' + key;
	let SET_TOTAL = 'total_' + key;
	let QUERY_ITEMS = 'query_' + key;
	let SET_CURRENT_EDITING_ITEM = 'setCurrentEditingItem_' + key;
	let SET_QUERY_PATH = 'setQueryPath_' + key;
	let SET_QUERY_PARAMS = 'setQueryParams_' + key;
	let SET_PAGINATION = 'setPagination_' + key; 
	let SET_LOADING = 'setLoading_' + key;

	injectReducer(getStore(), 
	{
		key: key,
		reducer: (state = initialState, action) =>
		{
			switch(action.type)
			{
				case SET_ITEMS:
					return(
					{
						...state,
						items: action.payload
					});

				case SET_TOTAL:
					return(
					{
						...state,
						total: action.payload
					});

				case SET_QUERY_PATH:
					return(
					{
						...state,
						queryPath: action.payload
					});

				case SET_QUERY_PARAMS:
					return(
					{
						...state,
						queryParams: action.payload
					});

				case SET_PAGINATION:
					return(
					{
						...state,
						pagination: 
						{
							...state.pagination,
							...action.payload
						}
					});

				case SET_LOADING:
					return(
					{
						...state,
						loading: action.payload
					});

				case QUERY_ITEMS:
					const queryPath = action.queryPath;
					const queryParams = action.payload;
					const name = action.name;

					return queryItems(name, queryPath, queryParams);

				case SET_CURRENT_EDITING_ITEM:
					const currentEditingItemId = action.payload;
					const item = findItemById(state.items, currentEditingItemId);

					return(
					{
						...state,
						currentEditingItem: item
					});

				default:
					return state
			}
		}
	});
}

export default (key, component) =>
{	
	const mapDispatchToProps = 
	{
	  	setItems: (items) => setItems(items, key)
	}

	injectItemReducers(key);

	return connect(null, mapDispatchToProps)(component);
}

