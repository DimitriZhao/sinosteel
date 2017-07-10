import {getStore} from 'store/globalStore';

export const getAuthParams = () =>
{
    const systemStore = getStore().getState().system;
    if(!systemStore)
    {
        return;
    }

    var sysUser = systemStore.sysUser;
    if(!sysUser)
    {
        return;
    }
    
    return( 
    {
        username: sysUser.username,
        clientDigest: sysUser.clientDigest
    })
}

//封装fetch方法，让fetch自动携带user信息
/* DEPRECATED */
/*
export const sysFetch = (service, request, callback, files) =>
{
	const systemStore = getStore().getState().system;
	if(!systemStore)
	{
		return;
	}

	var sysUser = systemStore.sysUser;
	if(!sysUser)
	{
		return;
	}

	const serviceWithAuth = service + '?username=' + sysUser.username + '&clientDigest=' + sysUser.clientDigest;

    let contentType = "application/json"
    if(files)
    {
        contentType = "multipart/form-data"
    }

    let body = request && request != '' ? JSON.stringify(request) : '';
    if(files)
    {
        let data = new FormData();

        data.append('params', body == '' ? null : body);

        for(var i = 0; i < files.length; i++)
        {
            data.append('file' + i, files[i]);
        }

        data.append('totalFiles', files.length);

        body = data;
    }

	fetch(serviceWithAuth, 
    {
        method: "POST",
        mode: "cors",
        body: body
    })
    .then((res) => 
    {
        if(res.ok)
        {
            return res.json();
        }
        else
        {
            return Promise.reject();
        }
    })
    .then((res) =>
    {
        callback(res);
    });
}
*/

export const sysFetch = (service, request, callback, files) =>
{
    let username = '';
    let clientDigest = '';

    const systemStore = getStore().getState().system;
    if(systemStore)
    {
        var sysUser = systemStore.sysUser;
        if(sysUser)
        {
            username = sysUser.username;
            clientDigest = sysUser.clientDigest;
        }
    }
    
    const serviceWithAuth = service + '?username=' + username + '&clientDigest=' + clientDigest;

    let data = new FormData();
    data.append('params', request && request != '' ? JSON.stringify(request) : null);

    if(files)
    {
        for(var i = 0; i < files.length; i++)
        {
            data.append('file' + i, files[i]);
        }

        data.append('totalFiles', files.length);
    }

    fetch(serviceWithAuth, 
    {
        method: "POST",
        body: data
    })
    .then((res) => 
    {
        if(res.ok)
        {
            return res.json();
        }
        else
        {
            return Promise.reject();
        }
    })
    .then((res) =>
    {
        callback(res);
    });
}