import React from 'react';
import {
    QueueAnim,
    Form,
    Input,
    Icon,
    Select,
    Button,
    Card,
    Col,
    message,
    Popconfirm
} from 'antd';
import LocalizedModal from '../ui/Modals'
import { CONFIRM_MODIFY, CONFIRM_ADD } from '../../constants/common'
import { fetchApi } from '../../callApi'

import { addNav, deleteNavi, updateNav } from '../../constants/api/navi'


const { Option } = Select;

const success = (content) => {
    message.success(content);
};
const error = (content) => {
    message.error(content);
}

const newChild = (idd, parents_idd, rankk) => {
    return {
        title: null,
        id: ++idd,
        parents_id: parents_idd,
        rank: ++rankk,
        listType: "1",
        contentType: "1",
        grade: "2",
    }
}
class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        }
    }

    add = () => { //新增一个儿子。
        const { data } = this.state;
        const lastChild = data.children[data.children.length - 1];
        let child;
        if (data.children.length === 0) {
            child = newChild(data.id, data.id, 0);
        } else {
            child = newChild(lastChild.id, lastChild.parents_id, lastChild.rank);
        }
        data.children.push(child);
        this.setState({
            data: data
        })
    };

    //在这里提交添加或者修改。

    handleSubmit = () => {
        const { data } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('rank', values.rank);
            formData.append('parents_id', 0);
            formData.append('grade', 1);
            data.title = values.title;
            data.rank = values.rank;
            if (!err) {
                //提交
                if (data.confirm === false) {
                    const { apiPath, request } = addNav(formData);
                    fetchApi(apiPath, request)
                        .then(res => res.json())
                        .then(resData => {
                            if (resData.error_code === 0) {
                                success("添加成功") //我添加一个一级标题的时候，要给我一个id。。。。这样方便我删除。不然我连删除的id都不知道。
                                this.setState({
                                    data: data,
                                })
                            } else {
                                error("添加失败")
                            }
                        })
                } else { //调用修改覆盖的接口。
                    const { data } = this.state;
                    data.rank = values.rank;
                    data.title = values.title;
                    delete values.rank;
                    delete values.title;
                    for (var i in values) { //i为key，values[i] 为value。感觉怪怪的，我怎么把数据给他？先整理出来吧。
                        let arr = i.split('-');
                        let s = arr[0];
                        let index = parseInt(arr[1]) - 1;
                        switch (s) {
                            case "title":
                                data.children[index].title = values[i];
                                break;
                            case "rank":
                                data.children[index].rank = values[i];
                                break;
                            case "contentType":
                                data.children[index].contentType = values[i];
                                break;
                            case "listType":
                                data.children[index].listType = values[i];
                                break;
                        }
                    }
                }
                // console.log(data);
                const { apiPath, request } = updateNav(data);
                fetchApi(apiPath, request)
                    .then(res => res.json())
                    .then(resData => {
                        // console.log(resData)
                        this.setState({
                            data: data
                        })
                        if (resData.error_code === 0) {
                            success("修改成功");
                        }
                    })
            }
        });
    };

    //在这里确认删除。分两种。
    confirmDelete = (index) => { //自己这边已经删除了
        const { data } = this.state; //在data里面进行删除。
        if (!data.children || data.children.length === 0) { //删除一级标题。
            const { apiPath, request } = deleteNavi(data.id);
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(resData => {
                    if (resData.error_code === 0) {
                        this.setState({
                            data: null
                        })
                        success("删除成功。")
                    } else {
                        error("删除失败")
                    }
                })
        } else { //某个儿子不见了
            const { apiPath, request } = deleteNavi(data.children[index].id);
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(resData => {
                    if (resData.error_code === 0) {
                        data.children.splice(index, 1);
                        this.setState({
                            data: data
                        })
                        success("删除成功。")
                    } else if (resData.error_code === 1) {
                        error(resData.tips);
                    }
                })
        }
    }
    cancel = () => {
        error('Click on No');
    }
    getOptions = (length) => {
        let OptionArr = [];
        for (let i = 0; i < length; i++) {
            OptionArr.push(<Option value={i + 1}>{i + 1}</Option>)
        }
        return OptionArr;
    }
    //label:标签
    //data:初始化数据
    //length:可选option的长度。
    //key:{
    //     title:  二级标题名称
    //     rank: 排序。
    // }
    //每一个Navigation都对应了一个index。用来在父元素中把自己删掉。自己也要把自己删掉。
    //自己为null。
    getNavigation = (label, data, length, key, index) => {
        const { getFieldDecorator } = this.props.form;
        const { children } = this.state.data;
        //当为一级标题，且二级标题数量不为0时。为fasle.
        let flag = true;
        if (label[0] === '一' && children.length > 0) {
            flag = false;
        }

        return (
            <div>
                <Form.Item label={label} >
                    {getFieldDecorator(`${key.title}`, {
                        rules: [
                            {
                                max: 10,
                                message: '导航栏名称过长',
                            },
                            {
                                required: true,
                                message: '请输入导航标题!',
                            },
                        ],
                        initialValue: data.title,
                    })(<Input placeholder="10字以内" style={{ width: '40%' }} />)}
                    {flag ?
                        <Popconfirm
                            title="Are you sure delete this task?"
                            onConfirm={this.confirmDelete.bind(this, index)}
                            onCancel={this.cancel}
                            okText="Yes"
                            cancelText="No">
                            <Icon type="close-circle" className="iconHover" style={{ marginLeft: "20px" }} />
                        </Popconfirm>
                        : null}
                </Form.Item>
                <Form.Item label="展示位置">
                    {getFieldDecorator(`${key.rank}`, {
                        rules: [
                            {
                                required: true,
                                message: '选择放置位置',
                            },
                        ],
                        initialValue: data.rank,
                    })(<Select style={{ width: '80px' }}>
                        {this.getOptions(length)}
                    </Select>)}
                </Form.Item>
            </div>
        )
    }
    //把所有的二级标题渲染出来即可。这些是二级标题，还要获取这些标题的点击事件。
    getSubordinates = (data) => {
        const { getFieldDecorator } = this.props.form;
        const { children } = data;
        return children.map((x, i) => {
            let label = `二级导航栏${data.rank}-${i + 1}`;
            let key = {
                title: `title-${i + 1}`,
                rank: `rank-${i + 1}`
            };
            const Com1 = this.getNavigation(label, x, children.length, key, i);
            const TypeChoose = <div>
                <Form.Item label='类型分类'>
                    {getFieldDecorator(`contentType-${i + 1}`, {
                        rules: [
                            {
                                required: true,
                                message: '选择导航类型',
                            },
                        ],
                        initialValue: data.contentType,
                    })(<Select style={{ width: '120px' }}>
                        <Option value="1">活动预告类</Option>
                        <Option value="2">新闻公告类</Option>
                    </Select>)}
                </Form.Item>
                <Form.Item label='排版分类'>
                    {getFieldDecorator(`listType-${i + 1}`, {
                        rules: [
                            {
                                required: true,
                                message: '选择导航类型',
                            },
                        ],
                        initialValue: data.listType,
                    })(<Select style={{ width: '120px' }}>
                        <Option value="1">文字类</Option>
                        <Option value="2">图文类</Option>
                    </Select>)}
                </Form.Item>
            </div>
            return (
                <div>
                    <Col className={"shadow"} >
                        {Com1}
                        {TypeChoose}
                    </Col>
                </div>
            )
        })
    }
    getSuperior = (data, length) => {
        let key = {
            title: 'title',
            rank: 'rank'
        }
        let label = `一级导航栏${data.rank}`
        return this.getNavigation(label, data, length, key);
    }
    confirmCont = (notify) => {
        return <LocalizedModal onConfirm={this.handleSubmit} data={notify} />
    }
    //添加新的导航栏。
    modelManage = (title) => {
        if (title === null) {
            return (<div style={{ marginTop: "20px" }}>
                <Col span={8} offset={16} style={{ textAlign: 'right' }}>
                    {this.confirmCont(CONFIRM_ADD)}
                </Col>

            </div>)
        } else { //该是添加成功了鸭
            return (<div style={{ marginTop: "20px" }}>
                <Col span={8} offset={8} >
                    <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                        <Icon type="plus" /> Add model
                </Button>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                    {this.confirmCont(CONFIRM_MODIFY)}
                </Col>
            </div>)
        }
    }

    render() {
        //   const { getFieldDecorator,getFieldValue } = this.props.form;
        const data = this.state.data;
        const length = this.props.length;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (

            data ? <div style={{ paddingTop: "20px" }}>
                <Card style={{ padding: "0 20%" }}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        {this.getSuperior(data, length)}
                        {data.children.length > 0 ? this.getSubordinates(data) : null}
                        {this.modelManage(data.title)}
                    </Form>
                </Card>
            </div> : null


        );
    }
}

const NaviCard = Form.create({ name: 'manage' })(RegistrationForm);
export default NaviCard;