import CoreLayout from 'layouts/CoreLayout'
import CoreLayoutContainer from 'containers/CoreLayoutContainer'

import AppContainer from 'containers/AppContainer'

import React from 'react'

import {setStore} from 'STORE/globalStore'

import Animate from 'rc-animate'

import Blank from './Blank';

import LoginContainer from './Login';

import tabsmap from 'routes/tabsmap';

// 配置路由
export const createRoutes = (store) => 
{
    return(
    {
        path        : '/',
        component   : Blank,
        // 子路由不进行模块分割
        childRoutes : 
        [
            {
                path        : '/login',
                component   : LoginContainer(store)
            },
            {
                path        : '/index',
                component   : CoreLayoutContainer(store)
            }
        ]

        /*
        path        : '/',
        component   : Blank,
        // 子路由不进行模块分割
        childRoutes : 
        [
            {
                path        : '/login',
                component   : LoginContainer(store)
            },
            {
                path        : '/index',
                component   : CoreLayoutContainer(store),
                indexRoute  : Home,
                // 子路由不进行模块分割
                childRoutes : 
                [
                    Project,
                    Personnel,
                    Journal,
                    Contract,
                    System
                ]
            }
        ]
        */
        
        //可将每个路由子模块切割成chunk加载，实现按需加载对应模块

      /*
        getChildRoutes (location, cb) {
          require.ensure([], (require) => {
            cb(null, [
              require('./Project'),
              // 强制“刷新”页面的 hack
              { path: 'redirect', component: require('COMPONENT/Redirect').default },
              // 无路由匹配的情况一定要放到最后，否则会拦截所有路由
              { path: '*', component: require('COMPONENT/NoFound').default }
            ])
          })
        }*/
        
    })
}

export default createRoutes
