/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import AllComponents from '../components';
import routesConfig from './config'; //在这里进行更改。
import queryString from 'query-string';
import {fetchApi} from '../callApi'
import { getNaviInfo } from '../constants/api/navi'

export default class CRouter extends Component {
    // constructor(props){
    //     super(props)
    //     this.state={
    //         routesConfig:routesConfig
    //     }
    // }
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    requireLogin = (component, permission) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        if (process.env.NODE_ENV === 'production' && !permissions) { // 线上环境判断是否登录
            return <Redirect to={'/login'} />;
        }
        return permission ? this.requireAuth(permission, component) : component;
    };
    getObject = ()=>{

    }
    componentDidMount = ()=>{
        // console.log(Object.keys(routesConfig));
        // const { apiPath, request } = getNaviInfo();
        // fetchApi(apiPath,request)
        // .then(res=>res.json())
        // .then(data=>{
        //     // const data = data.data;
        //     // data.map((key,i)=>{

        //     // })
        //     // let { routesConfig } = this.state;
        //     // routesConfig.menus[1].subs[1] = 
        //     // { 
        //     //     key: '/app/resource', title: '按钮', component: 'Buttons',
        //     //     subs:'/app/resource1',title:'按钮2',compoennt: 'Icons'
        //     // };
           
        //     this.setState({
        //         routesConfig : routesConfig
        //     })
        //     //把一级标题和二级标题插进去。
        //     // console.log(this.state.routesConfig)
        // })
    }
    render() {
        // const {routesConfig} = this.state;
        const route = r => {
            // console.log(r);
            const Component = AllComponents[r.component];
            return (
                <Route
                    key={r.route || r.key}
                    exact
                    path={r.route || r.key}
                    render={props => {
                        const reg = /\?\S*/g;
                        // 匹配?及其以后字符串
                        const queryParams = window.location.hash.match(reg);
                        // 去除?的参数
                        const { params } = props.match;
                        Object.keys(params).forEach(key => {
                            params[key] = params[key] && params[key].replace(reg, '');
                        });
                        props.match.params = { ...params };
                        const merge = { ...props, query: queryParams ? queryString.parse(queryParams[0]) : {} };
                        // 重新包装组件
                        const wrappedComponent = (
                            <DocumentTitle title={r.title}>
                                <Component {...merge} user={this.props.auth} />
                            </DocumentTitle>
                        )
                        return r.login
                            ? wrappedComponent
                            : this.requireLogin(wrappedComponent, r.auth)
                    }}
                />
            )
        }
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key => //第一个key为menu
                        routesConfig[key].map(rr => { 
                            return rr.component ? route(rr) : 
                            rr.subs.map(a=>{
                                return a.component ? route(a) : a.subs.map(b => {route(b);});
                            })
                            
                        })
                    )
                }

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}