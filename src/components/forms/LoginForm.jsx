/**
 * Created by hao.cheng on 2017/4/14.
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        // const formItemLayout = {
        //     labelCol: {
        //       xs: { span: 24 },
        //       sm: { span: 4 },
        //     },
        //     wrapperCol: {
        //       xs: { span: 24 },
        //       sm: { span: 20 },
        //     },
        //   };
        //   const formItemLayoutWithOutLabel = {
        //     wrapperCol: {
        //       xs: { span: 24, offset: 0 },
        //       sm: { span: 20, offset: 4 },
        //     },
        //   };
        return (
            <div style={{marginTop:"30px"}}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                    <FormItem>
                        {getFieldDecorator('previous', {
                            rules: [{ required: true, message: '请输入旧密码!' }],
                        })(
                            <Input placeholder="请输入旧密码"  />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input type="password" placeholder="请输入密码"  />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('confirmPass', {
                            rules: [{ required: true, message: '请再次输入新密码!' }],
                        })(
                            <Input  type="password" placeholder="请再次输入新密码"  />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '30%'}}>
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