/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import { Spin, Switch, Button, Table, Tabs } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import picture from '../../style/imgs/list-preview.jpg';
import { fetchApi } from '../../callApi';
import { getSecNaviList, getmessageList } from '../../constants/api/navi'
const { TabPane } = Tabs;

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
]
// activityTime: "2019 - 2 -2",
// releaseTime: '2019 - 1 - 1',

const root = "https://xuegong.twtstudio.com/";
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};
const TextData = (introduce)=>{
    return introduce.map((key,i)=>{
        const {id,created_at,title} = key;
        return{
            key:id,
            releaseTime:created_at,
            title:title,
            edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
        }
    })
}

const ActiData = (introduce)=>{
    return introduce.map((key,i)=>{
        const {id, created_at,title,start_time} = key
        return{
            key:id,
            activityTime:created_at,
            releaseTime:start_time,
            title:title,
            edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
        }
    })
}

const PicData = (introduce)=>{
    return introduce.map((key,i)=>{
        const {id, icon, created_at,title,content} = key; 
        let src = `${root}${icon}`;
        console.log(src);
        return{
            key:id,
            pic:<img alt="缩略图" src={`${root}${icon}`} width="89" height="63" />,
            activityTime:"活动时间",
            releaseTime:created_at,
            title:title,
            abstract:content,
            edit: <div><Button type="default">编辑</Button><Button type="danger">删除</Button></div>,
        }
    })
}

class Src extends React.Component {
    constructor(props){
        super(props);
        this.state={
            sideMenu: null, 
            introduct: [] //是一个存储右边数据的数组。如果有就直接拿。没有就请求。
        }
    }
    componentDidMount(){ //获取sideMenu和第一个数组的信息。
        const {apiPath, request} = getSecNaviList(this.props.index);
        fetchApi(apiPath,request)
        .then(res=>res.json())
        .then(data=>{ //用来更新侧边栏。根据类型来调用Table三种Tabel
            this.setState({
                sideMenu:data.data
            })
            const { sideMenu } = this.state; //获取请求第一个二级导航的简介信息。
            let firstID = sideMenu[0].id;
            const { apiPath, request } = getmessageList(firstID, 1);
            fetchApi(apiPath, request)
            .then(res=>res.json())
            .then(data=>{ //有数据了。更新第一个的数据。
                let arr = [];
                arr[0] = data.data.message; 
                this.setState({
                    introduct: arr
                })
            })
        })
    }

    onChange = (pagination, filters, sorter)=> {
        console.log('params', pagination, filters, sorter);
    }
    TextTab = (value,i,data)=>{ //每次都要发网络请求？也可以。试一下叭。key用的四序号
        return (
            <TabPane tab={value.title} key={i}> 
                <Table columns={columns1} bordered dataSource={data} onChange={this.onChange} rowSelection={rowSelection} />
            </TabPane>
        )
    }
    
    ActiTab = (value,i,data)=>{
        return(
            <TabPane tab={value.title} key={i}>
                <Table columns={columns2} bordered dataSource={data} onChange={this.onChange} rowSelection={rowSelection} />
            </TabPane>
        )
    }

    PicTab = (value,i,data)=>{
        return(
            <TabPane tab={value.title} key={i}>
                <Table columns={columns3} bordered dataSource={data} onChange={this.onChange} rowSelection={rowSelection} />
            </TabPane> 
        )
    }

    renderSideMenu(){
        const { sideMenu,introduct } = this.state;
        console.log(introduct);
        return sideMenu.map((key,i)=>{ // key是一个对象
            let index = i+1;
            let data;
            let listType = parseInt(key.listType);
            let contentType = parseInt(key.contentType);
            if(listType === 2){ //图文类
                console.log("图文类")
                if(introduct[i] !== undefined){
                    data = PicData(introduct[i]);
                    return this.PicTab(key,index,data);
                }else{
                    return this.PicTab(key,index,null);
                }
            }else if(contentType === 1){ //活动类
                console.log("活动类")
                if(introduct[i] !== undefined){
                    data = ActiData(introduct[i]);
                    return this.ActiTab(key, index, data);
                }else{
                    return this.ActiTab(key, index, null)
                }
            }else{
                console.log("文字类")
                if(introduct[i] !== undefined){
                    data = TextData(introduct[i]);
                    return this.TextTab(key, index, data);
                }else{
                    return this.TextTab(key, index, null);
                }
            }
        })
    }
    callback = (key)=>{ //key为下标。
        let { introduct, sideMenu } = this.state;

        if( introduct[key-1] === undefined ){
            console.log("这个的数据没有呀")
            const {apiPath, request} = getmessageList(sideMenu[key-1].id,1);
            fetchApi(apiPath, request)
            .then(res=>res.json())
            .then(data=>{
                introduct[key-1] = data.data.message;
                console.log(introduct);
                this.setState({
                    introduct:introduct
                })
            })
        }
    }
    render() {
        const { sideMenu } = this.state;
        return (
            <div>
                <BreadcrumbCustom first="资源管理" />
                <Tabs defaultActiveKey="1" tabPosition="left" onChange={this.callback}>
                    {sideMenu ? this.renderSideMenu() : <Spin tip="Loading..." size="large" />}
                </Tabs>
            </div>
        )
    }
}

export default Src;