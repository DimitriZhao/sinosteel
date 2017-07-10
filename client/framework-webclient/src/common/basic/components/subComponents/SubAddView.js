import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input, Row, Col, message } from 'antd';
const FormItem = Form.Item;

export default class SubAddView extends Component
{
    static propTypes = 
    {
        setItemToAdd: PropTypes.func,
        setFiles: PropTypes.func
    }

    constructor(props)
    {
        super(props);
    }

    handleValues = (values) =>
    {

    }

    componentWillUpdate()
    {
        this.props.form.validateFields((err, values) => 
        {
            if(!err)
            {
                this.handleValues(values);
                this.props.setItemToAdd(values);
            }
        });
    }

    renderForm(formItems)
    {
        return(
            <Form>
                {formItems}
            </Form>
        );
    }
}