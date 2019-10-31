/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connectAlita } from 'redux-alita';
import { fetchApi } from '../../callApi';
import { getLogin } from '../../constants/api/login';

const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        }
    }

    componentDidMount() {
        const { setAlitaState } = this.props;
        setAlitaState({ stateName: 'auth', data: null });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { apiPath, request } = getLogin(values.userName, values.password);
            if (!err) {
                fetchApi(apiPath, request)
                    .then(res => res.json())
                    .then(data => {
                        const { setAlitaState } = this.props;
                        if (data.error_code === 0) {
                            sessionStorage.setItem('username', values.userName);
                            setAlitaState({ funcName: 'admin', stateName: 'auth' });
                            const { auth: nextAuth = {}, history } = this.props;
                            history.push('/app/dashboard/index');
                        } else {
                            message.error("用户名或密码错误，请检查")
                        }
                    })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>学工部后台管理系统</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                                // initialValue: 'test'
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                                // initialValue: '123456'
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )} */}
                            {/* <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span> */}
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                                登录
                            </Button>
                            {/* <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span >或 现在就去注册!</span>
                                <span onClick={this.gitHub} ><Icon type="github" />(第三方登录)</span>
                            </p> */}
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connectAlita(['auth'])(Form.create()(Login));