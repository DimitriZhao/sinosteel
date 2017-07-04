import FunctionTreeComponent from '../components/FunctionTreeComponent.js';

import React, {Component, PropTypes} from 'react'

import { connect } from 'react-redux'
import { injectReducer } from 'STORE/reducers'
import { getStore } from 'STORE/globalStore'

import {getAllFunctionsHierarchiesService} from 'services';
import {sysFetch} from 'utils/FetchUtil';

const setFuncs = (funcs) =>
{
	return(
	{
		type: 'set_funcs',
		payload: funcs
	});
}

const mapStateToProps = (state) => 
{
	return(
	{
	  	funcs: state.functions.funcs
	})
}

const mapDispatchToProps = 
{
	setFuncs: (funcs) => setFuncs(funcs)
}

const initialState = 
{
	funcs: []
};

export default class FunctionTreeContainer extends Component
{
	constructor(props)
	{
		super(props)
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
		sysFetch(getAllFunctionsHierarchiesService, '', (res) =>
		{
			let data = res.data;

            getStore().dispatch(setFuncs(data))
		})
	}

	render()
	{
		injectReducer(getStore(), 
		{
			key: 'functions',
			reducer: (state = initialState, action) =>
			{
				switch(action.type)
				{
					case 'set_funcs':
						return(
						{
							funcs: action.payload
						});

					default:
						return state
				}
			}
		});

		const FuncTreeContainer = connect(mapStateToProps, mapDispatchToProps)(FunctionTreeComponent);
		return <FuncTreeContainer {...this.props}/>
	}
}
