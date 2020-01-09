import React from 'react';
import { Table, Card, Button } from 'antd';
import { Link } from 'react-router-dom'
import { fetchApi } from '../../callApi'
import { getCateLists, deleteCate } from '../../constants/api/category';
const { Column } = Table;
//这里的图文类型和文字类型没有经过验证
// const data = [
//     {
//         rank: '1',
//         title: "学工之家",
//         type: 0, //如果为0 就为链接
//         contentType: 0,
//         listType: 0,
//         link: "www.baidu.com",
//     },
//     {
//         rank: '2',
//         title: "海鲜芝士焗饭",
//         type: 1, //如果为0 就为链s接
//         contentType: 1,
//         listType: 1
//     },
//     {
//         rank: '3',
//         title: "学工之家",
//         type: 1, //如果为0 就为链接
//         contentType: 0,
//         listType: 0,
//     },
// ];
// let dd;

class CateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    getPath = (i) => {
        const { data } = this.state;
        return {
            pathname: '/app/category/modify',
            state: data[i]
        }
    }

    render() {
        const { data } = this.state;
        return (
            <Card>
                <Table dataSource={data} title={() => "栏目列表"} bordered>
                    <Column title="标题" dataIndex="title" key="title" />
                    <Column title="栏目类型" dataIndex="type" key="type" render={(text, record) => {
                        if (parseInt(record.type) === 0) {
                            return "文章列表";
                        } else {
                            return "链接";
                        }
                    }} />
                    <Column title="内容类型" dataIndex="contentType" key="contentType" render={(text, record) => {
                        let n = parseInt(record.contentType);
                        if (n === 1) {
                            return "活动预告类";
                        } if (n === -1) {
                            return "无类型"
                        } else {
                            return "新闻公告类";
                        }
                    }} />
                    <Column title="排版类型" dataIndex="listType" key="listType" render={(text, record) => {
                        let n = parseInt(record.listType);
                        if (n === 1) {
                            return "图文类型"
                        } if (n === -1) {
                            return "无类型"
                        } else {
                            return "文字类型"
                        }
                    }} />
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record, i) => (
                            <span>
                                <Button size="small" type="primary"><Link to={this.getPath(i)}>修改</Link></Button>
                                <Button size="small" type="primary" onClick={() => this.handleDelete(record.id)}>删除</Button>
                            </span>
                        )}
                    />
                </Table>
            </Card >
        )
    }
    componentDidMount = () => {
        let { apiPath, request } = getCateLists();
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.data
                })
            })
    }

    handleDelete = (id) => {
        let { url, request } = deleteCate(id);
        fetchApi(url, request)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
}

export default CateList;