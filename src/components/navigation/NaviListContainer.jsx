import React from 'react'
import {
    Table,
    Button,
    Card,
} from 'antd';
import NaviList from './NaviList'
import BreadcrumbCustom from '../BreadcrumbCustom';
import NaviAddForm from './NaviAddForm'


// 0: 链接
// 1: 文章列表
// 2: 父节点

export default class NaviListContainer extends React.Component {
    //这里管理总数据
    state = {
        data: [
            {
                key: 1,
                title: 'John Brown',
                type: 1,
                parent_id: -1,
                content: null, //文章列表：栏目id； link：string
                children: [{
                    key: '8',
                    title: '薯条',
                    parent_id: 2,
                    type: 0,
                    content: "4"
                }]
            },
            {
                key: 3,
                title: 'Jim Green',
                type: 0,
                content: "www.baidu.com",
                parent_id: -1,
            },
            {
                key: 2,
                title: 'Joe Blackaaaa',
                type: 2,
                parent_id: -1,
                content: null,
                children: [{
                    key: '5',
                    title: '薯条',
                    parent_id: 2,
                    type: 0,
                    content: "www.baidu.com"
                },
                {
                    key: 6,
                    title: '炸鸡',
                    parent_id: 2,
                    type: 1,
                    content: "3",
                },
                {
                    key: 7,
                    title: '汉堡包',
                    parent_id: 2,
                    type: 0,
                    content: "www.xiaojing.com"
                },
                ]
            },
            {
                key: 4,
                title: 'Joe Black',
                type: 1,
                parent_id: -1,
                content: 4
            },
        ],
        visible: false
    }
    handleVisiable = () => {
        this.setState({
            visible: true
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
                <NaviAddForm visible={visible} cancel={this.handleCancelVisible} naviAdd={this.handleNaviAdd} />
            </div>
        );
    }
}
