import React from 'react'
import {
    Form,
    Input,
    Select,
    Modal,
    Radio
} from 'antd';
import { parse } from 'url';

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
    return null;
}

class NaviAdd extends React.Component {
    state = {
        type: null,
    }
    //把数据整合然后发送。
    submit = () => {

    }

    //获取选项。
    getOptions = () => {

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
    //e.target.value
    handleChange = (e) => {
        this.setState({
            type: e.target.value
        })

    }

    renderDetails = () => {
        const { getFieldDecorator } = this.props.form;
        const { type } = this.state;
        if (type === 0) {
            return (
                <div>
                    <Form.Item label="链接">
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
        } else if (type === 1) {//直接绑定文章列表
            return (
                <div>
                    <Form.Item label="绑定栏目">
                        {getFieldDecorator('link', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入该导航绑定的栏目!',
                                },
                            ],
                        })(<Select >
                            {this.getOptions()}
                        </Select>)}
                    </Form.Item>
                </div>
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
                    {/* {console.log(this.props.form)} */}
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
                                <Radio value={0}>链接</Radio>
                                <Radio value={1}>文章列表</Radio>
                                <Radio value={2}>父节点</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    {this.renderDetails()}

                    {/* <Form.Item label="title">
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入导航标题!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item> */}
                </Form>
            </Modal>
        );
    }
}

export default Form.create({ name: 'AddNavi' })(NaviAdd);