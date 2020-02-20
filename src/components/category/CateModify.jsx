import React from 'react';
import {
    Button,
    Form,
    Select,
    Input,
    Card,
    Col,
    Row,
    message

} from 'antd';
import { fetchApi } from '../../callApi'
import { addCate, updateCate } from '../../constants/api/category';
import BreadcrumbCustom from '../BreadcrumbCustom';


//更新完了还是更新
// 添加完了还是添加

const { Option } = Select;
let msg = ''
//接收默认数据
class CateModifyCon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            restrict: false //如果修改，不可修改类型。添加可修改
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        const { data } = this.state;
        const { form } = this.props;
        form.validateFields((err, values) => {
            let formData = new FormData();
            for (let props in values) {
                formData.append(props, values[props]);
            }
            let url, request = null;
            if (data && data.id) {
                url = updateCate(formData, data.id).url;
                request = updateCate(formData, data.id).request;
                msg = "更新"
            } else {
                url = addCate(formData).url;
                request = addCate(formData).request;
                if (!msg) {
                    msg = "添加"
                }
            }

            fetchApi(url, request)
                .then(res => res.json())
                .then(resData => {
                    if (!resData.error_code) {
                        message.success(msg + "成功")
                        if (msg === "添加") {
                            form.resetFields()
                        }
                    }

                })
                .catch(resData => {
                    message.error(msg + "失败,请检查网络环境后重试")
                })

        });
    };
    //如果有props的话初始化数据。
    componentDidMount = () => {
        const { state } = this.props.location
        if (state) {
            this.setState({
                data: state,
            })
        }
    }
    // 
    renderForm = () => {
        const { getFieldDecorator } = this.props.form;
        const { data } = this.state;
        return (
            <div>
                <Form.Item label="内容类型" >
                    {getFieldDecorator('contentType', {
                        rules: [{ required: true, message: '请选择内容类型' }],
                        initialValue: data && data.contentType ? parseInt(data.contentType) : 1
                    })(
                        <Select placeholder="请选择内容类型">
                            <Option value={1}>活动预告类</Option>
                            <Option value={2}>新闻公告类</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="排版类型" >
                    {getFieldDecorator('listType', {
                        rules: [{ required: true, message: '请选择排版类型' }],
                        initialValue: data && data.listType ? parseInt(data.listType) : 1
                    })(
                        <Select placeholder="请选择排版类型">
                            <Option value={1}>图文类型</Option>
                            <Option value={2}>文字类型</Option>
                        </Select>,
                    )}
                </Form.Item>
            </div>
        )
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { data } = this.state;
        return (
            <div>
                <BreadcrumbCustom first="栏目管理" second="栏目编辑" />
                <Row>
                    <Col span={18} offset={3}>
                        <Card style={{ margin: "30px" }} >
                            <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                                <Form.Item label="栏目标题">
                                    {getFieldDecorator('title', {
                                        rules: [{
                                            required: true,
                                            message: '请输入该栏目名称'
                                        }],
                                        initialValue: data && data.title ? data.title : ""
                                    })(
                                        <Input
                                            placeholder="请输入栏目标题"
                                        />
                                    )}
                                </Form.Item>
                                {this.renderForm()}
                                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create({ name: 'modify_cate' })(CateModifyCon);
