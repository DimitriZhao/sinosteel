import React, {Component, PropTypes} from 'react';
import {Cascader} from 'antd';

import {addKey, findItemById} from 'utils/ArrayUtil';
import {sysFetch} from 'utils/FetchUtil';

export default class QueryCascader extends Component
{
    static propTypes = 
    {
        queryParentsPath: PropTypes.string,
        queryChildrenPath: PropTypes.string,
        parentsValueIndex: PropTypes.string,
        parentsTextIndex: PropTypes.string,
        childrenValueIndex: PropTypes.string,
        childrenTextIndex: PropTypes.string,
        parentIdName: PropTypes.string
    }
    
    constructor(props)
    {
        super(props);

        this.state = 
        {
            value: [],
            data: []
        }

        this.parents = [];
        this.children = [];
    }
    
    componentDidMount()
    {
        this.fetchData();
    }

    componentWillReceiveProps(nextProps)
    {
        if ('value' in nextProps) 
        {
            const value = nextProps.value || [];
            this.setState(
            { 
                value: value 
            });
        }
    }

    handleChange = (value) =>
    {
        this.setState(
        {
            value: value
        });

        const onChange = this.props.onChange;
        if (onChange) 
        {
            onChange(value);
        }
    }

    fetchData = () =>
    {
        sysFetch(this.props.queryParentsPath, '', (res) =>
        {
            this.parents = res.data;

            sysFetch(this.props.queryChildrenPath, '', (res) =>
            {
                this.children = res.data;

                const data = this.getCascadeData();
                this.setState(
                {
                    data: data
                });
            });
        });
    }

    getCascadeData()
    {
        const parentsValueIndex = this.props.parentsValueIndex;
        const parentsTextIndex = this.props.parentsTextIndex;
        const childrenValueIndex = this.props.childrenValueIndex;
        const childrenTextIndex = this.props.childrenTextIndex;
        const parentIdName = this.props.parentIdName;

        const parents = this.parents;
        const children = this.children;

        let data = [];
        for(var i = 0; i < parents.length; i++)
        {
            const parent = parents[i];

            const option = 
            {
                value: parent[parentsValueIndex],
                label: parent[parentsTextIndex],
                children: children.filter(child => child[parentIdName] == parent.id).map(child => 
                {
                    return(
                    {
                        value: child[childrenValueIndex],
                        label: child[childrenTextIndex]
                    });
                })
            };

            data.push(option);
        }

        return data;
    }

    render()
    {
        return(
            <Cascader value={this.state.value} options={this.state.data} onChange={(value) => this.handleChange(value)} placeholder='' changeOnSelect />
        );
    }
}