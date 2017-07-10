import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input, Row, Col, message } from 'antd';
const FormItem = Form.Item;

export default class SubEditView extends Component
{
    static propTypes = 
    {
        setItemToEdit: PropTypes.func,
        setFiles: PropTypes.func
    }

    constructor(props)
    {
        super(props);
        
        this.initValues = Object.assign({}, this.props.item);
    }

    componentDidMount()
    {   
        if(this.initValues)
        {
            const initValues = this.initValues;

            this.handleInitValues(initValues);
            this.props.form.setFieldsValue(initValues);
        }     
    }

    handleInitValues = (initValues) =>
    {

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
                this.props.setItemToEdit(
                {
                    ...this.props.item,
                    ...values
                });
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