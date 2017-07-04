import OrganizationTreeComponent from '../components/OrganizationTreeComponent.js';

import React, {Component, PropTypes} from 'react'

import { connect } from 'react-redux'
import { injectReducer } from 'STORE/reducers'
import { getStore } from 'STORE/globalStore'

import {getAllOrganizationHierarchiesService} from 'services';

import {sysFetch} from 'utils/FetchUtil';

export const setOrgs = (orgs) =>
{
	return(
	{
		type: 'set_orgs',
		payload: orgs
	});
}

export const refreshOrgs = () => dispatch =>
{
	sysFetch(getAllOrganizationHierarchiesService, '', (res) =>
	{
		let orgs = res.data;

        dispatch(
		{
			type: 'set_orgs',
			payload: orgs
		});
	});
}

const mapStateToProps = (state) => 
{
	return(
	{
	  	orgs: state.organization.orgs
	})
}

const mapDispatchToProps = 
{
	setOrgs: (orgs) => setOrgs(orgs)
}

const initialState = 
{
	orgs: []
};

export default class OrganizationTreeContainer extends Component
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
        getStore().dispatch(refreshOrgs())
	}

	render()
	{
		injectReducer(getStore(), 
		{
			key: 'organization',
			reducer: (state = initialState, action) =>
			{
				switch(action.type)
				{
					case 'set_orgs':
						return(
						{
							orgs: action.payload
						});

					default:
						return state
				}
			}
		});

		const OrgTreeContainer = connect(mapStateToProps, mapDispatchToProps)(OrganizationTreeComponent);
		return <OrgTreeContainer {...this.props}/>
	}
}
