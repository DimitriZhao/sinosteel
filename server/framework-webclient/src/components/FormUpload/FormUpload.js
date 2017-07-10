import React, {Component, PropTypes} from 'react';

import {Upload, Button, Icon, message, Modal} from 'antd';
const confirm = Modal.confirm;

import "./FormUpload.scss";

import {getStore} from 'STORE/globalStore';
import {downloadFileService} from 'services';

import {sysFetch, getAuthParams} from 'utils/FetchUtil';
import {addKey} from 'utils/ArrayUtil';

import {refreshList} from 'common/basic/reducers/ItemReducer'

export default class FormUpload extends Component
{
	static propTypes =
	{
		fileList: PropTypes.array,
		attachmentOnly: PropTypes.bool,
		deletePath: PropTypes.string,
		storeName: PropTypes.string
	}

	static defaultProps =
	{
		attachmentOnly: false
	}

	constructor(props)
	{
		super(props);

		let fileList = this.props.fileList || [];
		fileList = this.formatFileList(fileList);

		this.state = 
		{
			fileList: fileList
		}
	}

	componentWillReceiveProps(nextProps)
	{
	    if ('value' in nextProps && !this.state.fileList.length) 
	    {
	      	const value = this.formatFileList(nextProps.value);

	      	this.setState(
	      	{ 
	      		fileList: value
	      	});
	    }
	}

	beforeUpload = (file) =>
	{
		if(file.size > 5 * 1024 * 1024)
		{
			message.error("附件大小超过5MB");
			return false;
		}

		const fileList = this.state.fileList;
		let totalSize = file.size;
		for(const tempFile of fileList)
		{
			totalSize = totalSize + tempFile.size;
		}

		if(totalSize > 20 * 1024 * 1024)
		{
			message.error("附件总大小超过20MB");
			return false;
		}

		fileList.push(file);
		this.setState(
		{
			fileList: fileList
		});

		const onChange = this.props.onChange;
		if(onChange)
		{
			onChange(fileList.filter(file => 
			{
				return !file.id
			}));
		}

		return false;
	}

	removeFile = (file) =>
	{
		const fileList = this.state.fileList.filter(temp => 
		{
			return temp.uid != file.uid
		});

		this.setState(
		{
			fileList: fileList
		});
	}

	onRemove = (file) =>
	{
		const {deletePath, storeName} = this.props;
		const removeFile = this.removeFile;

		if(file.id)
		{
			confirm(
            {
                title: '确认删除该附件?',
                content: '',
                onOk: () => 
                {
                    const sysUser = getStore().getState().system.sysUser;
					const queryParams = 
					{
						id: file.id,
						userId: sysUser.id
					}

					sysFetch(deletePath, queryParams, (res) =>
					{
						const status = res.status;

						if(status == 'SUCCESS')
						{
							message.success('删除附件成功');

							getStore().dispatch(refreshList(storeName));
							removeFile(file);
						}	
						else
						{
							message.error('删除附件失败');
						}
					});
                }
            });   
		}
		else
		{
			removeFile(file);
		}
	}

	formatFileList(resources)
	{
		let fileList = [];

		if(resources && resources.length)
		{
			const authParams = getAuthParams();

			for(var i = 0; i < resources.length; i++)
        	{
        		var resource = resources[i];

        		var file =
        		{
        			uid: resource.id,
        			id: resource.id || '',
        			name: resource.fileName,
        			url: downloadFileService + '?username=' + authParams.username + '&clientDigest=' + authParams.clientDigest + "&id=" + resource.id,
        			status: 'done'
        		}

        		fileList.push(file);
        	}
		}

		return fileList;
	}

	render()
	{
		const sysUser = getStore().getState().system.sysUser;

		const attachmentOnly = this.props.attachmentOnly;

		const props = 
		{
			action: '',
			fileList: this.state.fileList,
			beforeUpload: this.beforeUpload,
			onRemove: attachmentOnly ? false : this.onRemove,
			data:
			{
				path: sysUser.id
			}
		}

		const content = this.props.attachmentOnly ? null : <Button type="ghost"><Icon type="upload" /> 点击上传附件 </Button>

		return(
			<Upload className="formUpload" {...props}>
				{content}
			</Upload>
		);
	}
}