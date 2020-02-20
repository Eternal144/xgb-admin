import React from 'react'
import {
    Table,
    Button,
    Card,

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
    //这里管理总数据
    // state = {
    //     data: [
    //         {
    //             "id": 2,
    //             "title": "学工研究",
    //             "grade": 1,
    //             "type": 2,
    //             "link": null,
    //             "parent_id": 0,
    //             "rank": 1,
    //             "children": [
    //                 {
    //                     "id": 5,
    //                     "title": "学习专栏",
    //                     "grade": 2,
    //                     "type": 0,
    //                     "link": "www.baidu.com",
    //                     "parent_id": 2,
    //                     "rank": 1,
    //                     "created_at": "2020-02-11 02:25:04",
    //                     "updated_at": null
    //                 },
    //                 {
    //                     "id": 6,
    //                     "title": "文件精读",
    //                     "grade": 2,
    //                     "type": 1,
    //                     "link": "/1/1/column?columnId=1",
    //                     "parent_id": 2,
    //                     "rank": 2,
    //                     "created_at": "2020-02-11 02:25:05",
    //                     "updated_at": null
    //                 },
    //             ]
    //         },
    //         {
    //             "id": 3,
    //             "title": "哈哈哈",
    //             "grade": 1,
    //             "type": 0,
    //             "link": "www.baidu.com",
    //             "parent_id": 0,
    //             "rank": 3,
    //             // "children": []
    //         },
    //         {
    //             "id": 4,
    //             "title": "一个内链",
    //             "grade": 1,
    //             "type": 1,
    //             "link": "/3/column?columnId=1",
    //             "parent_id": 0,
    //             "rank": 4,
    //             // "children": []
    //         },
    //     ]
    // }

    componentDidMount = () => {
        const { apiPath, request } = getNaviLists();
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(resData => {
                console.log(resData.data)
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
