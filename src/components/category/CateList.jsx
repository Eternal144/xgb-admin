import React from 'react';
import { Table, Card, Button } from 'antd';
import { Link } from 'react-router-dom'
const { Column } = Table;


//这里的图文类型和文字类型没有经过验证
const data = [
    {
        key: '1',
        title: "学工之家",
        type: 0, //如果为0 就为链接
        content_type: 0,
        list_type: 0,
        link: "www.baidu.com",
    },
    {
        key: '2',
        title: "海鲜芝士焗饭",
        type: 1, //如果为0 就为链s接
        content_type: 1,
        list_type: 1
    },
    {
        key: '3',
        title: "学工之家",
        type: 1, //如果为0 就为链接
        content_type: 0,
        list_type: 0,
    },

];

class CateList extends React.Component {

    getPath = (i) => {
        return {
            pathname: '/app/category/modify',
            state: data[i]
        }
    }


    render() {
        return (
            <Card>
                <Table dataSource={data} title={() => "栏目列表"} bordered>
                    <Column title="标题" dataIndex="title" key="title" />
                    <Column title="栏目类型" dataIndex="type" key="type" render={(text, record) => {
                        if (parseInt(record.type) === 0) {
                            return "栏目";
                        } else {
                            return "链接";
                        }
                    }} />
                    <Column title="内容类型" dataIndex="content_type" key="content_type" render={(text, record) => {
                        let n = parseInt(record.content_type);
                        if (n === 1) {
                            return "活动预告类";
                        } if (n === 0) {
                            return "无类型"
                        } else {
                            return "新闻公告类";
                        }
                    }} />
                    <Column title="排版类型" dataIndex="list_type" key="list_type" render={(text, record) => {
                        let n = parseInt(record.list_type);
                        if (n === 1) {
                            return "图文类型"
                        } if (n === 0) {
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
                                {/* {console.log(i)} */}
                                <Button size="small" type="primary"><Link to={this.getPath(i)}>修改</Link></Button>
                                <Button size="small" type="primary">删除</Button>
                            </span>
                        )}
                    />
                </Table>
            </Card >
        )
    }
    componentDidMount() {

    }
}

export default CateList;