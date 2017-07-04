import React, {Component, PropTypes} from 'react';

import { Select } from 'antd';
const Option = Select.Option;

import {sysFetch} from 'utils/FetchUtil';

export default class QuerySelect extends Component
{
    static propTypes = 
    {
        queryPath: PropTypes.string,
        valueIndex: PropTypes.string,
        textIndex: PropTypes.string,
    }

    constructor(props)
    {
        super(props);

        this.state = 
        {
            data: []
        }
    }

    componentDidMount()
    {
        this.fetchData();
    }

    fetchData = () =>
    {
        sysFetch(this.props.queryPath, '', (res) =>
        {
            let data = res.data.map((data) =>
            {
                return(
                {
                    value: data[this.props.valueIndex],
                    text: data[this.props.textIndex]
                });
            });

            this.setState(
            {
                data
            });
        });
    }

    render() 
    {
        const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
        return (
            <Select {...this.props} allowClear>
                {options}
            </Select>
        );
    }
}