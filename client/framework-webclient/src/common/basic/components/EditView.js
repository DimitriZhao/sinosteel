import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input, Row, Col, message } from 'antd';
const FormItem = Form.Item;

import {sysFetch} from 'utils/FetchUtil';

import {refreshList} from 'common/basic/reducers/ItemReducer'
import {getStore} from 'store/globalStore';

export default class EditView extends Component
{
    constructor(props)
    {
        super(props);

        this.editButtonName = '完成修改', //“修改”按钮的名称
        this.editPath = '' //负责处理修改命令的url;
        
        this.successMsg = '修改成功';
        this.errorMsg = '修改失败';
        this.warningMsg = '服务器错误';

        this.closeTabAfterEdit = true;

        this.initValues = Object.assign({}, this.props.item);

        this.files = null;
    }

    /*
    componentDidUpdate(prevProps, prevState)
    {
        if(JSON.stringify(prevProps.item) != JSON.stringify(this.props.item))
        {
            this.initValues = Object.assign({}, this.props.item);
            this.item = this.props.item;

            if(this.initValues)
            {
                const initValues = this.initValues;

                this.handleInitValues(initValues);
                this.props.form.setFieldsValue(initValues);
            }    
        }   
    }
    */

    componentDidMount()
    {   
        if(this.initValues)
        {
            let initValues = this.initValues;

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

    handleEdit = (e) =>
    {
        e.preventDefault();
        this.props.form.validateFields((err, values) => 
        {
            if(!err)
            {
                this.handleValues(values);
                this.editItem(
                {
                    ...this.props.item,
                    ...values
                });
            }
        });
    }

    editItem = (values) =>
    {
        const removeTab = this.props.removeTab;

        sysFetch(this.editPath, values, (res) =>
        {
            let status = res.status;
            
            if(status == 'SUCCESS')
            {
                message.success(this.successMsg);

                if(this.closeTabAfterEdit)
                {
                    removeTab();
                }

                getStore().dispatch(refreshList(this.props.storeName));
            }

            else if(status == 'FAILURE')
            {
                message.error(this.errorMsg);
                message.error(res.message);
            }

            else
            {
                message.warning(this.warningMsg);
            }
        }, this.files)
    }

    renderForm(formItems, customOperation)
    {
        const editButton = <Button type="primary" htmlType="submit" size="large" icon="check-circle-o" onClick={this.handleEdit}>{this.editButtonName}</Button>
        const operation = customOperation ?
            customOperation(editButton) :
            <Col>
                <FormItem>
                    {editButton}
                </FormItem>
            </Col>

        return(
            <Form>
                {formItems}
                <Row key='-1'>
                    {operation}
                </Row>
            </Form>
        );
    }
}