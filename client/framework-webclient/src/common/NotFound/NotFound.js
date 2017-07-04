import React, { Component } from 'react'
import { message } from 'antd'

const error = function () 
{
    message.error('找不到该页面！')
}

export default class NotFound extends Component 
{
    static contextTypes = 
    {
        router: React.PropTypes.object.isRequired
    }

    componentWillMount() 
    {
        error()
        let timer = setTimeout(() => 
        {
          this.context.router.replace('/')
          clearTimeout(timer)
        }, 2000)
    }

    render () 
    {
        return null
    }
}
