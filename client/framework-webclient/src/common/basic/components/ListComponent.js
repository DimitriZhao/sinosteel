import React, { Component, PropTypes } from 'react'
import { Form, Table, Row, Button, Spin, message, Icon, Modal } from 'antd';
const confirm = Modal.confirm;

import './ListComponent.scss';

import EditContainer from '../containers/EditContainer'

import AnimTableBody from 'components/DataTable/AnimTableBody'
import authWrap from 'components/AuthWrap/AuthWrap'

import {getStore} from 'STORE/globalStore'

import {sysFetch} from 'utils/FetchUtil';

import {refreshList, setCurrentEditingItem, setPagination} from 'common/basic/reducers/ItemReducer'

class ListComponent extends Component 
{
    static propTypes = 
    {
        addTab: PropTypes.func,
        removeTab: PropTypes.func,
        setItems: PropTypes.func,
        items: PropTypes.array,
        total: PropTypes.number,
        current: PropTypes.number,
        pageSize: PropTypes.number,
        loading: PropTypes.bool,
        storeName: PropTypes.string,

        editAuthString: PropTypes.string,
        deleteAuthString: PropTypes.string,
    };

    static defaultProps = 
    {
        items: [],
        total: 0,
        current: 1,
        pagination: 10,
        loading: false,

        editAuthString: 'all',
        deleteAuthString: 'all',
    };

    constructor(props) 
    {
        super(props);

        this.operationColumnWidth = '13%';

        //list
        this.state = 
        {
            selectedRowKeys: []
        };

        this.columns = [];

        //inspect
        this.inspectViewTabName = '';
        this.inspectIndex = 0;

        this.inspectView = null;
        this.inspect = true;

        //edit
        this.editViewTabName = '';
        this.editIndex = 0;

        this.editView = null;
        this.editAuthString = this.props.editAuthString;

        //delete
        this.deletePath = '';
        this.deleteAuthString = this.props.deleteAuthString;

        this.successMsg = '删除成功';
        this.errorMsg = '删除失败';
        this.warningMsg = '服务器错误';
    }

    handleOpenInspect = (props) =>
    {
        this.props.addTab(this.inspectViewTabName, this.inspectViewTabName, Form.create()(this.inspectView), props);
    }

    handleOpenEdit = (record) =>
    {
        getStore().dispatch(setCurrentEditingItem(this.props.storeName, record.id));

        const removeTab = this.props.removeTab;

        this.props.addTab(this.editViewTabName, this.editViewTabName, EditContainer(this.props.storeName, Form.create()(this.editView)), 
        {
            removeTab: () => removeTab(this.editViewTabName),
            storeName: this.props.storeName
        });
    }

    handleDelete = (id) =>
    {
        this.deleteItem(id);
    }

    deleteItem = (id) =>
    {
        sysFetch(this.deletePath, 
        {
            id: id
        }, (res) =>
        {
            let status = res.status;
            
            if(status == 'SUCCESS')
            {
                message.success(this.successMsg);
                getStore().dispatch(refreshList(this.props.storeName, true));
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
        });
    }

    getOperationColumn = () =>
    {
        const handleOpenInspect = this.handleOpenInspect;
        const handleOpenEdit = this.handleOpenEdit;
        const handleDelete = this.handleDelete;

        const inspect = this.inspect;

        return(
        {
            title: '操作',
            dataIndex: 'operate',
            fixed: 'right',
            width: !inspect ? 140 : 190,
            render(text, record, index) 
            {
                var props = 
                {
                    item: record
                };

                const editAuthString = record.canEdit == 'true' ? 'all' : 'none';
                const deleteAuthString = record.canDelete == 'true' ? 'all' : 'none';

                const EditButton = authWrap(
                    <a className='btn-edit' style={{ marginLeft: 8}} onClick={() => handleOpenEdit(record)}><Icon type='edit' style={{marginRight: 4}}/>修改</a>
                );
                const DeleteButton = authWrap(
                    <a className='btn-delete' style={{ marginLeft: 8}} onClick={() => 
                    {
                        confirm(
                        {
                            title: '确认删除该记录?',
                            content: '',
                            onOk() 
                            {
                                handleDelete(record.id)
                            }
                        });   
                    }}><Icon type='delete' style={{marginRight: 4}}/>删除</a>
                );

                return( 
                    inspect ?
                    (
                        <div>
                            <a className='btn-inspect' style={{ marginLeft: 8}} onClick={() => handleOpenInspect(props)}><Icon type='info-circle-o' style={{marginRight: 4}}/>查看</a>
                            <EditButton authString={editAuthString}/>
                            <DeleteButton authString={deleteAuthString}/>
                        </div>
                    ) :
                    (
                        <div>
                            <EditButton authString={editAuthString}/>
                            <DeleteButton authString={deleteAuthString}/>
                        </div>
                    )
                )
            }
        });
    }

    // checkbox状态
    onSelectChange(selectedRowKeys)
    {
        this.setState({ selectedRowKeys })
    }

    onPageChange = (page, pageSize) =>
    {
        getStore().dispatch(setPagination(this.props.storeName, 
        {
            current: page,
            pageSize: pageSize
        }));
    }

    onShowSizeChange = (current, size) =>
    {
        getStore().dispatch(setPagination(this.props.storeName, 
        {
            current: current,
            pageSize: size
        }));
    }

    render() 
    {
        const columns = [];
        columns.push(...this.columns);
        columns.push(this.getOperationColumn());

        const { selectedRowKeys } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        }

        let dataSource = this.props.items;
        dataSource = dataSource == null ? [] : dataSource;

        let total = this.props.total;

        const pagination = 
        {
            total: total,
            showSizeChanger: true,
            onChange: this.onPageChange,
            onShowSizeCchange: this.onShowSizeChange,
            defaultCurrent: this.props.current,
            defaultPageSize: this.props.pageSize
        }

        const getBodyWrapperProps = 
        {
            current: pagination.current,
        }

        const getBodyWrapper = body => 
        { 
            return (<AnimTableBody {...getBodyWrapperProps} body={body} />)
        }

        return (
            <Spin size="large" spinning={this.props.loading} tip="加载中...请稍候">
                <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} bordered pagination={pagination} getBodyWrapper={getBodyWrapper} />
            </Spin>
        )
    }
}

export default ListComponent;
