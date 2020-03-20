import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import AllComponents from '../components';
import routesConfig from './config'; //在这里进行更改。
import queryString from 'query-string';

export default class CRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            routesConfig: routesConfig
        }
    }

    render() {
        const { routesConfig } = this.state;
        return (
            <Switch>
                {Object.keys(routesConfig).map(key =>
                    routesConfig[key].map(r => {
                        const route = r => {
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
                                            params[key] =
                                                params[key] && params[key].replace(reg, '');
                                        });
                                        props.match.params = { ...params };
                                        const merge = {
                                            ...props,
                                            query: queryParams
                                                ? queryString.parse(queryParams[0])
                                                : {},
                                        };
                                        // 重新包装组件
                                        const wrappedComponent = (
                                            <DocumentTitle title={r.title}>
                                                <Component {...merge} index={r.id} />
                                            </DocumentTitle>
                                        );
                                        return wrappedComponent
                                    }}
                                />
                            );
                        };
                        if (r.component) {
                            return route(r);
                        } else {
                            if (r.subs) { //应该是传id。哭了
                                return r.subs.map((r) => route(r));
                            }
                            return null
                        }
                    })
                )}
            </Switch>
        )
    }
}