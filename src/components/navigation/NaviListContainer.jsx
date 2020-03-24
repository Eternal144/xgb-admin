import React from 'react'
import {
    Button,
} from 'antd';
import NaviList from './NaviList'
import BreadcrumbCustom from '../BreadcrumbCustom';
import NaviAddForm from './NaviAddForm'
import { getNaviLists } from '../../constants/api/navi';
import { fetchApi } from '../../callApi';
// 0: 链接
// 1: 文章列表
// 2: 父节点

export default class NaviListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false
        }
    }

    componentDidMount = () => {
        const { apiPath, request } = getNaviLists();
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(resData => {
                // console.log(resData.data)
                this.setState({
                    data: resData.data
                })
            })
    }

    handleVisiable = () => {
        this.setState({
            visible: true
        })
    }

    handleUpdate = (newNav) => {
        const { data } = this.state
        data.push(newNav)
        this.setState({
            data: data
        })
    }

    handleCancelVisible = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const { data, visible } = this.state;
        return (
            <div>
                <BreadcrumbCustom first="导航栏列表" />
                <Button type="primary" className="right-btn" onClick={this.handleVisiable}>添加导航</Button>
                <div className="clear"></div>
                <NaviList data={data} />
                <NaviAddForm visible={visible} id={data.length + 1} cancel={this.handleCancelVisible} update={this.handleUpdate} />
            </div>
        );
    }
}
