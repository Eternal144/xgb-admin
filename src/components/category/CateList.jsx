import React from 'react';
import { Table, Card, Button, Spin, message } from 'antd';
import { Link } from 'react-router-dom'
import { fetchApi } from '../../callApi'
import { getCateLists, deleteCate } from '../../constants/api/category';
const { Column } = Table;

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
            <Card style={{ minHeight: "600px" }} >
                {data ? <Table dataSource={data} title={() => "栏目列表"} bordered>
                    <Column title="标题" dataIndex="title" key="title" />
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
                </Table> : <Spin size="large" style={{ marginTop: "200px" }} />}
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
        const { data } = this.state
        fetchApi(url, request)
            .then(res => res.json())
            .then(resData => {
                if (!resData.error_code) {
                    let newCate = data.filter((x, i) => {
                        return parseInt(x.id) !== parseInt(id)
                    })
                    this.setState({
                        data: newCate
                    })
                    message.success("删除成功")
                }

            })
            .catch(resData => {
                message.error("删除失败")
            })
    }
}

export default CateList;