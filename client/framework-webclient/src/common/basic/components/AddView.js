import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input, Row, Col, message } from 'antd';
const FormItem = Form.Item;

import {sysFetch} from 'utils/FetchUtil';

import {refreshList} from 'common/basic/reducers/ItemReducer'
import {getStore} from 'store/globalStore'

export default class AddView extends Component
{
    constructor(props)
    {
        super(props);

        this.addButtonName = '新增', //“新增”按钮的名称
        this.addPath = '' //负责处理新增命令的url

        this.successMsg = '新增成功';
        this.errorMsg = '新增失败';
        this.warningMsg = '服务器错误';

        this.files = null;
    }

    handleAdd = (e) =>
    {
        e.preventDefault();
        this.props.form.validateFields((err, values) => 
        {
            if(!err)
            {
                this.handleValues(values);
                this.addItem(values);
            }
        });
    }

    handleValues = (values) =>
    {

    }

    addItem = (values) =>
    {
        const removeTab = this.props.removeTab;

        sysFetch(this.addPath, values, (res) =>
        {
            const status = res.status;
            
            if(status == 'SUCCESS')
            {
                message.success(this.successMsg);
                removeTab();

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
        const addButton = <Button type="primary" htmlType="submit" size="large" icon="check-circle-o" onClick={this.handleAdd}>{this.addButtonName}</Button>

        const operation = customOperation ? 
            customOperation(addButton) :
            <Col>
                <FormItem>
                    {addButton}
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