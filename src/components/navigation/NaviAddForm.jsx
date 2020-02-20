import React from 'react'
import {
    Form,
    Input,
    Select,
    Modal,
    Radio
} from 'antd';
import { getCateLists } from '../../constants/api/category'
import { fetchApi } from '../../callApi';

const { Option } = Select;

//新增都要在本地保持一致性。添加完了就返回给我正确的。
// const getObj = () => {
//     return {
//         title: null,
//         type:f null,
//         parent_id: -1,
//         link: null,
//     }
// }

const formatData = (values) => {
    console.log(formatData)
    return null;
}


class NaviAdd extends React.Component {
    base = `/${this.props.id}/`
    state = {
        type: null,
        ctgs: null,
        content: this.base,
    }
    //把数据整合然后发送。
    submit = () => {

    }

    //获取选项。
    getOptions = () => {
        const { ctgs } = this.state;
        let columns = [];
        if (ctgs.length > 0) {
            for (let i = 0; i < ctgs.length; i++) {
                columns.push(
                    <Option value={ctgs[i].id}>{ctgs[i].title}</Option>
                )
            }
        }
        return columns;
    }
    handleSubmit = () => {
        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                let data = formatData(values);
                if (this.props.naviAdd) {
                    this.props.naviAdd(data);
                }
            }
        })
    }

    handleCancel = () => {
        if (this.props.cancel) {
            this.props.cancel();
        }
    }
    //导航类型改变
    handleChange = (e) => {
        this.setState({
            type: e.target.value
        })

    }

    // 绑定栏目改变
    handleCateChange = (e) => {
        this.setState({
            content: `${this.base}column?columnId=${e}`
        })
    }
    componentDidMount = () => {
        const { apiPath, request } = getCateLists()
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(resData => {
                if (!resData.error_code) {
                    this.setState({
                        ctgs: resData.data
                    })
                }
            })
    }
    renderDetails = () => {
        const { getFieldDecorator } = this.props.form;
        const { type, content } = this.state;
        if (type === 0) { //外链
            return (
                <div>
                    <Form.Item label="链接内容">
                        {getFieldDecorator('link', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入链接!',
                                },
                            ],
                        })(<Input placeholder="请输入链接" />)}
                    </Form.Item>
                </div>
            )
        } else if (type === 1) {//直接绑定文章列表,先请求栏目列表。
            return (
                <div>
                    <Form.Item label="内容">
                        {getFieldDecorator('link', {
                        })(<div className="ant-form-text">{content}</div>)}
                    </Form.Item>
                    <Form.Item label="绑定栏目">
                        {getFieldDecorator('cate', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入该导航绑定的栏目!',
                                },
                            ],
                        })(<Select onChange={this.handleCateChange} >
                            {this.getOptions()}
                        </Select>)}
                    </Form.Item>
                </div >
            )
        } else { //父节点型
            return null;
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };

        return (
            <Modal
                title="添加导航"
                centered
                visible={visible}
                onOk={() => this.handleSubmit()}
                onCancel={() => this.handleCancel()}
                okText="添加"
                cancelText="取消"
            >
                <Form {...formItemLayout} onSubmit={this.submit}>
                    <Form.Item label="导航标题">
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入导航标题!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="导航类型" >
                        {getFieldDecorator('type', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入导航标题!',
                                },
                            ],
                        })(
                            <Radio.Group onChange={this.handleChange}>
                                <Radio value={0}>外链</Radio>
                                <Radio value={1}>栏目</Radio>
                                <Radio value={2}>父节点</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    {this.renderDetails()}
                </Form>
            </Modal>
        );
    }
}

export default Form.create({ name: 'AddNavi' })(NaviAdd);