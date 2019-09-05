// import React from 'react';
// import { Row, Col, Card, Spin, Alert, Switch, Button, Table, Tabs } from 'antd';
// import BreadcrumbCustom from '../BreadcrumbCustom';
// const { TabPane } = Tabs;

// const columns = [
//     {
//         title: '发布时间',
//         dataIndex: 'releaseTime',
//     },
//     {
//         title: '标题',
//         dataIndex: 'title',
//     },
//     {
//         title: '',
//         dataIndex: 'edit',
//         width: '200px',
//     },
// ];
// const data = [
//     {
//         key: "1",
//         releaseTime: '2019 - 1 - 1',
//         title: '我是文章标题',
//         edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
//     },
//     {
//         key: "2",
//         releaseTime: '2018 - 1 - 1',
//         title: '我是文章标题',
//         edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
//     },
//     {
//         key: "3",
//         releaseTime: '2017 - 1 - 1',
//         title: '我是文章标题',
//         edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
//     },
//     {
//         key: "4",
//         releaseTime: '2019 - 1 - 1',
//         title: '我是文章标题',
//         edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
//     },
//     {
//         key: "5",
//         releaseTime: '2018 - 1 - 1',
//         title: '我是文章标题',
//         edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
//     },
// ];
// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
//     getCheckboxProps: record => ({
//         disabled: record.name === 'Disabled User', // Column configuration not to be checked
//         name: record.name,
//     }),
// };