/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import { Row, Col, Card, Spin, Alert, Switch, Button, Table, Tabs } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import picture from '../../style/imgs/list-preview.jpg';
const { TabPane } = Tabs;


const columns1 = [
    {
        title: '发布时间',
        dataIndex: 'releaseTime',
    },
    {
        title: '标题',
        dataIndex: 'title',
    },
    {
        title: '',
        dataIndex: 'edit',
        width: '200px',
    },
];

const columns2 = [
    {
        title: '活动时间',
        dataIndex: 'activityTime',
    },
    {
        title: '发布时间',
        dataIndex: 'releaseTime',
    },
    {
        title: '标题',
        dataIndex: 'title',
    },
    {
        title: '',
        dataIndex: 'edit',
        width: '200px',
    },
];

const columns3 = [
    {
        title: '缩略图',
        dataIndex: 'pic',
        width:"100px",
    },
    {
        title: '发布时间',
        dataIndex: 'releaseTime',
    },
    {
        title: '标题',
        dataIndex: 'title',
    },
    {
        title: '摘要',
        dataIndex: 'abstract',
        width:'400px',
    },
    {
        title: '',
        dataIndex: 'edit',
        width: '200px',
    },
];
const data1 = [
    {
        key: "1",
        releaseTime: '2019 - 1 - 1',
        title: '我是文章标题',
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "2",
        releaseTime: '2018 - 1 - 1',
        title: '我是文章标题',
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "3",
        releaseTime: '2017 - 1 - 1',
        title: '我是文章标题',
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "4",
        releaseTime: '2019 - 1 - 1',
        title: '我是文章标题',
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "5",
        releaseTime: '2018 - 1 - 1',
        title: '我是文章标题',
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
];

const data2 = [
    {
        key: "1",
        activityTime: "2019 - 2 -2",
        releaseTime: '2019 - 1 - 1',
        title: '我是文章标题',
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "2",
        activityTime: "2019 - 2 -2",
        releaseTime: '2018 - 1 - 1',
        title: '我是文章标题',
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "3",
        activityTime: "2019 - 2 -2",
        releaseTime: '2017 - 1 - 1',
        title: '我是文章标题',
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "4",
        activityTime: "2019 - 2 -2",
        releaseTime: '2019 - 1 - 1',
        title: '我是文章标题',
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "5",
        activityTime: "2019 - 2 -2",
        releaseTime: '2018 - 1 - 1',
        title: '我是文章标题',
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
];

const data3 = [
    {
        key: "1",
        pic: <img alt="缩略图" src={picture} width="89" height="63" />,
        activityTime: "2019 - 2 -2",
        releaseTime: '2019 - 1 - 1',
        title: '我是文章标题',
        abstract:"我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文...",
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "2",
        pic: <img alt="缩略图" src={picture} width="89" height="63" />,
        activityTime: "2019 - 2 -2",
        releaseTime: '2018 - 1 - 1',
        title: '我是文章标题',
        abstract:"我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文...",
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "3",
        pic: <img alt="缩略图" src={picture} width="89" height="63" />,
        activityTime: "2019 - 2 -2",
        releaseTime: '2017 - 1 - 1',
        title: '我是文章标题',
        abstract:"我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文...",
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
    {
        key: "4",
        pic: <img alt="缩略图" src={picture} width="89" height="63" />,
        activityTime: "2019 - 2 -2",
        releaseTime: '2019 - 1 - 1',
        title: '我是文章标题',
        abstract:"我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文我是文章正文...",
        edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

class Src extends React.Component {


    render() {
        function onChange(pagination, filters, sorter) {
            console.log('params', pagination, filters, sorter);
        }
        return (
            <div>
                <BreadcrumbCustom first="资源管理" />
                <Tabs defaultActiveKey="1" tabPosition="left">
                    <TabPane tab={`Tab-1`} key="1">
                        <Table columns={columns1} bordered dataSource={data1} onChange={onChange} rowSelection={rowSelection} />
                        {/* 文字列表 */}
                    </TabPane>
                    <TabPane tab={`Tab-2`} key="2">
                        <Table columns={columns2} bordered dataSource={data2} onChange={onChange} rowSelection={rowSelection} />
                        {/* 活动列表 */}
                    </TabPane>
                    <TabPane tab={`Tab-3`} key="3">
                        <Table columns={columns3} bordered dataSource={data3} onChange={onChange} rowSelection={rowSelection} />
                        {/* 图文列表 */}
                    </TabPane>
                </Tabs>


            </div>
        )
    }
}

export default Src;