import React, { Component, PropTypes } from 'react'
import { Form, Table, Row, Button, Spin, message, Icon, Modal } from 'antd';
const confirm = Modal.confirm;

import '../ListComponent.scss';

import authWrap from 'components/AuthWrap/AuthWrap';

import {replaceItemById} from 'utils/ArrayUtil';
import {sysFetch} from 'utils/FetchUtil';

import {getStore} from 'store/globalStore';
import {setQueryParams, setQueryPath, refreshList, setPagination} from 'common/basic/reducers/ItemReducer'

class SubListView extends Component 
{
    static propTypes = 
    {
        storeName: PropTypes.string,
        items: PropTypes.array,
        total: PropTypes.number,
        current: PropTypes.number,
        pageSize: PropTypes.number,
        loading: PropTypes.bool,
        parentId: PropTypes.string,
        readonly: PropTypes.bool,
    };

    constructor(props) 
    {
        super(props);

        this.operationColumnWidth = '13%';

        this.storeName = this.props.storeName;
        this.queryPath = '';
        this.parentIdName = '';

        //list
        this.state = 
        {
            openAddModal: false,
            openInspectModal: false,
            openEditModal: false,
            selectedItem: {},
        };

        this.columns = [];

        this.modalWidth = 700;

        //add
        this.addViewModalName = '';
        this.addView = null;
        this.itemToAdd = {};
        this.addPath = '';

        this.successMsgAdd = '新增成功';
        this.errorMsgAdd = '新增失败';
        this.warningMsgAdd = '服务器错误';

        this.addAuthString = 'all';

        //inspect
        this.inspectViewModalName = '';
        this.inspectView = null;
        this.inspect = true;

        //edit
        this.editViewModalName = '';
        this.editView = null;
        this.editPath = '';
        this.itemToEdit = {};

        this.editAuthString = 'all';

        //delete
        this.deletePath = '';
        this.deleteAuthString = 'all';

        //files
        this.files = null;
    }

    componentWillMount()
    {
        getStore().dispatch(setQueryPath(this.props.storeName, this.queryPath));
    }

    componentDidMount()
    {
        this.queryItems();
    }

    queryItems = () =>
    {
        const parentIdName = this.parentIdName;

        let queryParams = {};
        queryParams[parentIdName] = this.props.parentId;

        getStore().dispatch(setQueryParams(this.props.storeName, queryParams));
    }

    handleOpenAdd = () =>
    {
        this.setState(
        {
            openAddModal: true
        });
    }

    handleCloseAdd = () =>
    {
        this.setState(
        {
            openAddModal: false
        });

        this.itemToAdd = {};
    }

    setItemToAdd = (item) =>
    {
        this.itemToAdd = item;
    }

    handleAdd = () =>
    {
        this.setState(
        {
            openAddModal: false
        });

        this.itemToAdd[this.parentIdName] = this.props.parentId;
        
        sysFetch(this.addPath, this.itemToAdd, (res) =>
        {
            let status = res.status;
            
            if(status == 'SUCCESS')
            {
                message.success(this.successMsgAdd);
                this.queryItems();
            }

            else if(status == 'FAILURE')
            {
                message.error(this.errorMsgAdd);
                message.error(res.message);
            }

            else
            {
                message.warning(this.warningMsgAdd);
            }

            this.itemToAdd = {};
        }, this.files)
    }

    handleDelete = (id) =>
    {
        sysFetch(this.deletePath, 
        {
            id: id
        }, (res) =>
        {
            let status = res.status;
            
            if(status == 'SUCCESS')
            {
                message.success('删除成功');
                this.queryItems();
            }

            else if(status == 'FAILURE')
            {
                message.error('删除失败');
                message.error(res.message);
            }

            else
            {
                message.warning('服务器错误');
            }
        });
    }

    handleBatchDelete = () =>
    {
        
    }

    handleOpenInspect = (props) =>
    {
        this.setState(
        {
            openInspectModal: true,
            selectedItem: props.item
        });
    }

    handleCloseInspect = () =>
    {
        this.setState(
        {
            openInspectModal: false
        });
    }

    handleOpenEdit = (props) =>
    {
        this.setState(
        {
            openEditModal: true,
            selectedItem: props.item
        });
    }

    handleCloseEdit = () =>
    {
        this.setState(
        {
            openEditModal: false
        });

        this.itemToEdit = {};
    }

    setItemToEdit = (item) =>
    {
        this.itemToEdit = item;
    }

    setFiles = (files) =>
    {
        this.files = files;
    }

    handleEdit = () =>
    {
        this.setState(
        {
            openEditModal: false
        });

        this.itemToEdit[this.parentIdName] =  this.props.parentId;
        sysFetch(this.editPath, this.itemToEdit, (res) =>
        {
            let status = res.status;
            
            if(status == 'SUCCESS')
            {
                replaceItemById(this.props.items, this.itemToEdit);
                message.success('修改成功');

                this.queryItems();
            }

            else if(status == 'FAILURE')
            {
                message.error('修改失败');
                message.error(res.message);
            }

            else
            {
                message.warning('服务器错误');
            }

            this.itemToEdit = {};
        }, this.files)
    }

    getOperationColumn = () =>
    {
        const handleOpenInspect = this.handleOpenInspect;
        const handleOpenEdit = this.handleOpenEdit;
        const handleDelete = this.handleDelete;

        const readonly = this.props.readonly;
        const inspect = this.inspect;
        
        return(
        {
            title: '操作',
            dataIndex: 'operate',
            width: readonly || !inspect ? 140 : 190,
            fixed: 'right',
            render(text, record, index) 
            {
                var props = 
                {
                    item: record
                };

                const editAuthString = record.canEdit == 'true' ? 'all' : 'none';
                const deleteAuthString = record.canDelete == 'true' ? 'all' : 'none';

                const EditButton = authWrap(
                    <a className='btn-edit' style={{ marginLeft: 8}} onClick={() => handleOpenEdit(props)}><Icon type='edit' style={{marginRight: 4}}/>修改</a>
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

                if(inspect)
                {
                    return(
                        readonly ? 
                        (
                            <div>
                                <a className='btn-inspect' style={{ marginLeft: 8}} onClick={() => handleOpenInspect(props)}><Icon type='info-circle-o' style={{marginRight: 4}}/>查看</a>
                            </div>
                        ) : (
                            <div>
                                <a className='btn-inspect' style={{ marginLeft: 8}} onClick={() => handleOpenInspect(props)}><Icon type='info-circle-o' style={{marginRight: 4}}/>查看</a>
                                <EditButton authString={editAuthString} />
                                <DeleteButton authString={deleteAuthString} />
                            </div>
                        )
                    )
                }
                else
                {
                    return(
                        readonly ? 
                        (
                            <div />
                        ) : (
                            <div>
                                <EditButton authString={editAuthString} />
                                <DeleteButton authString={deleteAuthString} />
                            </div>
                        )
                    )
                }
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

        const total = this.props.total;

        const pagination = 
        {
            total: total,
            showSizeChanger: true,
            onChange: this.onPageChange,
            onShowSizeCchange: this.onShowSizeChange,
            defaultCurrent: this.props.current,
            defaultPageSize: this.props.pageSize
        }

        const AddView = Form.create()(this.addView);
        const InspectView = Form.create()(this.inspectView);
        const EditView = Form.create()(this.editView);
        const width = this.modalWidth;

        const addAuthString = this.addAuthString;
        const deleteAuthString = this.deleteAuthString;

        const AddButton = authWrap(
            <Button className="btn-add" type="primary" icon="plus-circle-o" onClick={this.handleOpenAdd}>{'新增'}</Button>
        );
        const BatchDeleteButton = authWrap(
            <Button className="btn-batch-delete" type="primary" style={{ marginLeft: 8 }} icon="close-circle-o" onClick={this.handleBatchDelete}>{'批量删除'}</Button>
        );

        const operation = this.props.readonly ? <div /> : (
            <Row style={{'marginBottom': 10}}>
                <AddButton authString={addAuthString} />
                <BatchDeleteButton authString={deleteAuthString} />
            </Row>
        );

        return (
            <div>
                {operation}
                <Row>
                    <Spin size="large" spinning={this.props.loading} tip="加载中...请稍候">
                        <Table rowSelection={this.props.readonly ? null : rowSelection} columns={columns} dataSource={dataSource} bordered pagination={pagination} />
                    </Spin>
                </Row>

                <Modal title={this.addViewModalName} width={width} visible={this.state.openAddModal} onOk={this.handleAdd} onCancel={this.handleCloseAdd}>
                    <AddView setItemToAdd={this.setItemToAdd} setFiles={this.setFiles}/>
                </Modal>

                <Modal title={this.inspectViewModalName} width={width} visible={this.state.openInspectModal} onCancel={this.handleCloseInspect} footer={null}>
                    <InspectView item={this.state.selectedItem}/>
                </Modal>

                <Modal title={this.editViewModalName} width={width} visible={this.state.openEditModal} onOk={this.handleEdit} onCancel={this.handleCloseEdit}>
                    <EditView item={this.state.selectedItem} setItemToEdit={this.setItemToEdit} setFiles={this.setFiles} />
                </Modal>
            </div>
        )
    }
}

export default SubListView;