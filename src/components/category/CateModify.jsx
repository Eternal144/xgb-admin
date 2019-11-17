import React from 'react';
import {
    Button,
    Form,
    Select,
    Radio,
    Input,
    Card,
    Col,
    Row

} from 'antd';
import { Link } from 'react-router-dom'
import BreadcrumbCustom from '../BreadcrumbCustom';


const { Option } = Select;
//接收默认数据
class CateModifyCon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkType: null,
            data: null,
            restrict: false //如果修改，不可修改类型。添加可修改
        }
    }
    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //         }
    //     });
    // };
    //如果有props的话初始化数据。
    componentDidMount = () => {
        const { state } = this.props.location
        // let state = {
        //     key: '1',
        //     title: "学工之家",
        //     type: 1, //如果为0 就为链接
        //     content_type: 1,
        //     list_type: 2,
        //     link: "www.baidu.com",
        // }

        if (state) {
            this.setState({
                data: state,
                checkType: state.type,
                restrict: true
            })
        }
        //初始化表格数据。
    }
    handleSelectChange = (e) => {
        this.setState({
            checkType: e.target.value
        })
    }

    renderForm = () => {
        const { getFieldDecorator } = this.props.form;
        const { checkType, data } = this.state;
        if (checkType !== null) {
            if (parseInt(checkType) === 1) {
                return (
                    <div>
                        <Form.Item label="内容类型" >
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: '请选择内容类型' }],
                                initialValue: data && data.content_type
                            })(
                                <Select placeholder="请选择内容类型">
                                    <Option value={1}>活动预告类</Option>
                                    <Option value={2}>新闻公告类</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="排版类型" >
                            {getFieldDecorator('list', {
                                rules: [{ required: true, message: '请选择排版类型' }],
                                initialValue: data && data.list_type
                            })(
                                <Select placeholder="请选择排版类型">
                                    <Option value={1}>图文类型</Option>
                                    <Option value={2}>文字类型</Option>
                                </Select>,
                            )}
                        </Form.Item>
                    </div>
                )
            } else {
                return <Form.Item label="链接">
                    {getFieldDecorator('link', {
                        rules: [{
                            required: true,
                            message: '请输入链接'
                        }],
                        initialValue: data && data.link
                    })(
                        <Input
                            placeholder="请输入链接"
                        />,
                    )}
                </Form.Item>
            }
        }
        return null;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { restrict, data } = this.state;
        return (
            <div>
                <BreadcrumbCustom first="栏目编辑" />
                <Row>
                    <Col span={18} offset={3}>

                        <Card style={{ margin: "30px" }} >
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label="栏目标题">
                                    {getFieldDecorator('title', {
                                        rules: [{
                                            required: true,
                                            message: '请输入该栏目名称'
                                        }],
                                        initialValue: data && data.title
                                    })(
                                        <Input
                                            placeholder="请输入栏目标题"
                                        />,
                                    )}
                                </Form.Item>

                                {restrict ? <Form.Item label="选择栏目类型">
                                    {getFieldDecorator('type', {
                                        rules: [{
                                            required: true
                                        }],
                                        initialValue: 0
                                    })(
                                        <Radio.Group disabled={true} >
                                            <Radio value={0} >链接</Radio>
                                            <Radio value={1}>文章列表</Radio>
                                        </Radio.Group>,
                                    )}
                                </Form.Item> :
                                    <Form.Item label="选择栏目类型">
                                        {getFieldDecorator('type', {
                                            rules: [{
                                                required: true
                                            }]
                                        })(
                                            <Radio.Group onChange={this.handleSelectChange}>
                                                <Radio value={0} >链接</Radio>
                                                <Radio value={1}>文章列表</Radio>
                                            </Radio.Group>,
                                        )}
                                    </Form.Item>
                                }

                                {/* 判断该栏目类型，
                    如果是文章列表，就选择类型
                    如果是链接，可以直接改链接
                     */}
                                {this.renderForm()}
                                {/* <Form.Item label="Switch">
                    {getFieldDecorator('switch', { valuePropName: 'checked' })(<Switch />)}
                </Form.Item> */}

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
        );
    }


}

export default Form.create({ name: 'modify_cate' })(CateModifyCon);
