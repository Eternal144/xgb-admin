/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Spin, Select, Button, Table, Tabs, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import picture from '../../style/imgs/list-preview.jpg';
import LocalizedModal from '../ui/Modals';
import { CONFIRM_JUMP, CONFIRM_DELETE } from '../../constants/common';
import { fetchApi } from '../../callApi';
import { getSecNaviList, getNavAllArtivle, getNaviInfo } from '../../constants/api/navi';
import { removeArticle, deleteArticle } from '../../constants/api/source';
const { TabPane } = Tabs;
const { Option, OptGroup } = Select;
const success = (content) => {
    message.success(content);
};
const error = (content) => {
    message.error(content);
}
//columns是不变的。
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
        width: "100px",
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
        width: '400px',
    },
    {
        title: '',
        dataIndex: 'edit',
        width: '200px',
    },
]

const root = "https://xuegong.twtstudio.com/";


class Src extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseArticleId: null,
            chooseNavId: null, //选择跳转的id。
            navData: null,
            sideMenu: null,
            introduct: [], //是一个存储右边数据的数组。如果有就直接拿。没有就请求。
            subordNavID: null, //二级标题ID
            subordNavIndex: null
        }
    }

    listColumn(data) {
        let columns = [];
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let opts = [];
                for (let j = 0; j < data[i].children.length; j++) {
                    opts.push(
                        <Option key={data[i].children[j].rank + '-' + data[i].children[j].id} value={data[i].children[j].id}>{data[i].children[j].title}</Option>
                    )
                }
                columns.push(
                    <OptGroup label={data[i].title}>{opts}</OptGroup>
                )
            }
        } else {
            return this.noNaviNotification();
        }
        return columns;
    }

    componentDidMount() { //获取sideMenu和第一个数组的信息。
        const { apiPath, request } = getSecNaviList(this.props.index);
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(data => { //用来更新侧边栏。根据类型来调用Table三种Tabel
                // console.log(data);
                this.setState({
                    sideMenu: data.data
                })
                const { sideMenu } = this.state; //获取请求第一个二级导航的简介信息。
                let firstID = sideMenu[0].id;
                //默认获取第一页的信息。 ??? 
                const { apiPath, request } = getNavAllArtivle(firstID);
                fetchApi(apiPath, request)
                    .then(res => res.json())
                    .then(data => { //有数据了。更新第一个二级导航的数据。
                        // console.log(data)
                        let arr = [];
                        arr[0] = data.data;
                        this.setState({
                            introduct: arr,
                            subordNavID: sideMenu[0].id,
                            subordNavIndex: 0
                        })
                    })
            })
        let api = getNaviInfo().apiPath;
        let quest = getNaviInfo().request;
        fetchApi(api, quest)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    navData: data.data,
                })
            });
    }


    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(selectedRowKeys);
            this.setState({
                chooseArticleId: selectedRowKeys
            })
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    TextData = (introduce) => {
        const { subordNavID } = this.state
        return introduce.message.map((key, i) => {
            const { id, created_at, title } = key;
            let data = {
                navID: subordNavID,
                articleID: id
            }
            let path = {
                pathname: introduce.contentType === "1" ? "/app/edit/activity" : '/app/edit/news',
                state: data
            }
            return {
                key: id,
                releaseTime: created_at,
                title: title,
                edit: <div style={{ textAlign: "center" }}><Link to={path}><Button type="default">编辑</Button></Link></div>,
            }
        })
    }

    ActiData = (introduce) => {
        const { subordNavID } = this.state
        return introduce.message.map((key, i) => {
            const { id, created_at, title, start_time } = key
            let data = {
                navID: subordNavID,
                articleID: id
            }
            let path = {
                pathname: introduce.contentType === "1" ? "/app/edit/activity" : '/app/edit/news',
                state: data
            }
            return {
                key: id,
                activityTime: created_at,
                releaseTime: start_time,
                title: title,
                edit: <div style={{ textAlign: "center" }}><Link to={path}><Button type="default">编辑</Button></Link></div>,
            }
        })
    }
    PicData = (introduce) => {
        const { subordNavID } = this.state
        return introduce.message.map((key, i) => {
            const { id, icon, created_at, title, content } = key;
            let str = `${root}${icon}`;
            let data = {
                navID: subordNavID,
                articleID: id
            }
            let path = {
                pathname: introduce.contentType === "1" ? "/app/edit/activity" : '/app/edit/news',
                state: data
            }
            return {
                key: id,
                pic: <img alt="缩略图" src={str} width="89" height="63" />,
                activityTime: "活动时间",
                releaseTime: created_at,
                title: title,
                abstract: content,
                edit: <div style={{ textAlign: "center" }}><Link to={path}><Button type="default">编辑</Button></Link></div>,
            }
        })
    }

    Tab = (value, i, data) => { //每次都要发网络请求？也可以。试一下叭。key用的四序号
        return (
            <TabPane tab={value.title} key={i}>
                <Table columns={columns1} bordered dataSource={data} onChange={this.callback} rowSelection={this.rowSelection} />
            </TabPane>
        )
    }


    //introduct包含所有的二级导航的信息。
    renderSideMenu() {
        const { sideMenu, introduct } = this.state;
        return sideMenu.map((key, i) => { // key是一个对象
            let data;
            let listType = parseInt(key.listType);
            let contentType = parseInt(key.contentType);
            if (listType === 2) { //图文类
                if (introduct[i] && introduct[i].message !== undefined) {
                    data = this.PicData(introduct[i]);
                    return this.Tab(key, i, data, columns3);
                } else {
                    return this.Tab(key, i, null, columns3);
                }
            } else if (contentType === 1) { //活动类
                if (introduct[i] && introduct[i].message !== undefined) {
                    data = this.ActiData(introduct[i]);
                    return this.Tab(key, i, data, columns2);
                } else {
                    return this.Tab(key, i, null, columns2)
                }
            } else {
                if (introduct[i] && introduct[i].message !== undefined) {
                    data = this.TextData(introduct[i]);
                    return this.Tab(key, i, data, columns1);
                } else {
                    return this.Tab(key, i, null, columns1);
                }
            }
        })
    }

    callback = (key) => { //key为下标。二级标题id。
        // console.log(key)
        let { introduct, sideMenu } = this.state;
        if (sideMenu[key]) {
            this.setState({
                subordNavID: sideMenu[key].id,
            })
        }
        this.setState({
            subordNavIndex: key
        })
        // console.log(sideMenu[key]);
        // console.log(sideMenu[key].id);
        // console.log(introduct);
        if (!introduct[key] || introduct[key].message === undefined) {
            const { apiPath, request } = getNavAllArtivle(sideMenu[key].id);
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    introduct[key] = data.data;
                    this.setState({
                        introduct: introduct
                    })
                })
        }
    }

    handleSelect = (value) => { //更新要跳转的文章。
        // console.log(value);
        this.setState({
            chooseNavId: value
        })
    }

    handleJump = () => { //确认跳转。获取选择栏目。this.props.index。我得获得一个所处的index
        const { chooseNavId, chooseArticleId, subordNavID, introduct, subordNavIndex } = this.state
        if (chooseArticleId === null) {
            error("请选择文章")
        } else if (chooseNavId === null) {
            error("请选择跳转栏目");
        } else {
            const { apiPath, request } = removeArticle(subordNavID, chooseNavId, chooseArticleId)
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    if (data.error_code === 0) {
                        introduct[subordNavIndex].message = introduct[subordNavIndex].message.filter((obj) => {
                            for (let i of chooseArticleId) {
                                if (obj.id === i) {
                                    return false
                                }
                            }
                            return true
                        })
                        this.setState({
                            introduct: introduct
                        })
                    }
                })
        }
    }

    handleDelete = () => { //确认删除。
        const { introduct, subordNavID, chooseArticleId, subordNavIndex } = this.state;
        if (chooseArticleId === null) {
            error("请选择文章")
        } else {
            const { apiPath, request } = deleteArticle(subordNavID, chooseArticleId)//选中的文章id。根据id来删除
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    if (data.error_code === 0) {
                        introduct[subordNavIndex].message = introduct[subordNavIndex].message.filter((obj) => {
                            for (let i of chooseArticleId) {
                                if (obj.id === i) {
                                    return false
                                }
                            }
                            return true
                        })
                        this.setState({
                            introduct: introduct
                        })
                        success("删除成功")
                    }
                })
        }
    }
    confirmJump = (notify) => {
        return <LocalizedModal onConfirm={this.handleJump} data={notify} />
    }
    confirmDelete = (notify) => {
        return <LocalizedModal onConfirm={this.handleDelete} data={notify} />
    }
    render() {
        const { sideMenu, navData, introduct, subordNavIndex } = this.state;
        return (
            <div>
                <BreadcrumbCustom first="资源管理" />
                <div>
                    <Tabs defaultActiveKey="0" tabPosition="left" onChange={this.callback}>
                        {sideMenu ? this.renderSideMenu() : <Spin tip="Loading..." size="large" />}
                    </Tabs>
                </div>
                <div className={introduct[subordNavIndex] && introduct[subordNavIndex].message.length > 0 ? "resource-jump" : "resource-margin"} >
                    <Col span={4} offset={3}>
                        <label>移动到：</label>
                        <Select id={1} style={{ width: "60%" }} onChange={this.handleSelect} key={1} required="true" placeholder="请选择一个栏目" >
                            {navData ? this.listColumn(navData) : null}
                        </Select>
                    </Col>
                    <Col span={2}>
                        {this.confirmJump(CONFIRM_JUMP)}
                    </Col>
                    <Col span={2}>
                        {this.confirmDelete(CONFIRM_DELETE)}
                    </Col>
                </div>
            </div>
        )
    }
}

export default Src;