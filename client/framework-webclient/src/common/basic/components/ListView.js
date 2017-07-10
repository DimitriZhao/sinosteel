import React, {Component, PropTypes} from 'react';
import { Form, Row } from 'antd';
import ListContainer from '../containers/ListContainer'
import SearchContainer from '../containers/SearchContainer'

import Animate from 'rc-animate';

export default class ListView extends Component 
{
    static PropTypes = 
    {
        addTab: PropTypes.func,
        removeTab: PropTypes.func,
        setItems: PropTypes.func,
    }

    constructor(props) 
    {
        super(props);

        //add
        this.operationComponent = null;
        this.addAuthString = 'all';

        //list
        this.searchComponent = null;
        this.listComponent = null;
        this.deleteAuthString = 'all';
        this.editAuthString = 'all';

        this.name = '';
    }

    render() 
    {
        const addAuthString = this.addAuthString;
        const editAuthString = this.editAuthString;
        const deleteAuthString = this.deleteAuthString;

        const SearchComponent = this.searchComponent == null ? null : SearchContainer(this.name, Form.create()(this.searchComponent));
        const _SearchComponent = SearchComponent == null ? <div /> : <SearchComponent storeName={this.name}/>

        const OperationComponent = this.operationComponent == null ? null : this.operationComponent;
        const _OperationComponent = OperationComponent == null ? 
            <div /> : 
            <OperationComponent 
                addTab={this.props.addTab} 
                removeTab={this.props.removeTab} 
                storeName={this.name}
                addAuthString={addAuthString}
                deleteAuthString={deleteAuthString}
            />

        const ListComponent = this.listComponent == null ? null : ListContainer(this.name, this.listComponent);
        const _ListComponent = ListComponent == null ? 
            <div /> : 
            <ListComponent 
                addTab={this.props.addTab} 
                removeTab={this.props.removeTab} 
                storeName={this.name}
                editAuthString={editAuthString}
                deleteAuthString={deleteAuthString}
            />

        return (
            <Animate
                transitionName="fade"
                component=""
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                <div>
                    <Row style={{'marginBottom': 15}}>
                        {_SearchComponent}
                    </Row>
                    <Row style={{'marginBottom': 10}}>
                        {_OperationComponent}
                    </Row>
                    <Row>
                        {_ListComponent}
                    </Row>
                </div>
            </Animate>
        )
    }
}


