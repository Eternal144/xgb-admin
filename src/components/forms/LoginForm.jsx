import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { fetchApi } from '../../callApi';
import { getModify } from '../../constants/api/login';
const FormItem = Form.Item;


class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.password !== values.confirmPass) {
                    message.error("两次密码输入不一致！请重新输入")
                } else {
                    const { apiPath, request } = getModify(this.props.user, values.previous, values.password);
                    fetchApi(apiPath, request)
                        .then(res => res.json())
                        .then(data => {
                            if (data.error_code === 0) {
                                message.success("修改成功！请牢记新密码");
                            } else {
                                message.error("修改失败！请检查密码是否正确");
                            }
                        })
                }
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ marginTop: "30px" }}>
                <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
                    <FormItem>
                        {getFieldDecorator('previous', {
                            rules: [{ required: true, message: '请输入旧密码!' }],
                        })(
                            <Input placeholder="请输入旧密码" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input type="password" placeholder="请输入密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('confirmPass', {
                            rules: [{ required: true, message: '请再次输入新密码!' }],
                        })(
                            <Input type="password" placeholder="请再次输入新密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '30%' }}>
                            确定
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;