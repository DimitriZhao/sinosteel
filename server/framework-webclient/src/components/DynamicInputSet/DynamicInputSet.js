import React, {Component, PropTypes} from 'react';

import { Form, Input, Icon, Button, Row } from 'antd';
const FormItem = Form.Item;

let uuid = 0;
export default class DynamicInputSet extends Component 
{
    static propTypes = 
    {
        addButtonName: PropTypes.string,
        width: PropTypes.string
    }

    constructor(props)
    {
        super(props);

        this.state = 
        {
            valuesObject: {}
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if ('value' in nextProps) 
        {
            const value = nextProps.value || [];
            this.setState(
            { 
                valuesObject: value 
            });
        }
    }

    remove = (k) => 
    {
        let valuesObject = this.state.valuesObject;
        delete valuesObject[k];
        this.setState(
        {
            valuesObject: valuesObject
        });
    }

    add = () => 
    {
        const k = uuid;

        let valuesObject = this.state.valuesObject;
        valuesObject[k] = null;

        this.setState(
        {
            valuesObject
        });

        uuid++;
    }

    onChange = (value, k) =>
    {
        let valuesObject = this.state.valuesObject;
        valuesObject[k] = value;

        this.setState(
        {
            valuesObject: valuesObject
        });

        this.props.onChange(this.state.valuesObject);
    }

    render() 
    {
        const valuesObject = this.state.valuesObject;
        const valueKeys = Object.keys(valuesObject);

        let width = this.props.width || '100%';

        let inputsArray = valueKeys.map((valueKey) =>
        {
            const value = valuesObject[valueKey];

            return(
                <Row key={valueKey}>
                    <Input value={value} style={{ width: width, marginRight: 8 }} onChange={(e) => this.onChange(e.target.value, valueKey)}/>
                    <Icon
                        type="minus-circle-o"
                        onClick={() => this.remove(valueKey)}
                    />
                </Row>
            );
        });

        uuid = valueKeys.length;

        return(
            <div>
                {inputsArray}
                <Row key={uuid + 1}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" />{this.props.addButtonName}
                    </Button>
                </Row>
            </div>
        );
    }
}