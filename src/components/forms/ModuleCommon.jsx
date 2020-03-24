import React, { Component } from 'react';
import { Select, Form, Button, message } from 'antd';
import { fetchApi } from '../../callApi';
import { getArticleTitle } from '../../constants/api/navi';
import { updateUpper } from '../../constants/api/model'


const success = (content) => {
    message.success(content);
};
const error = (content) => {
    message.error(content);
}
//直接作为一个表格。
const { Option, OptGroup } = Select;
class Module extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subordData: null,
            navId: this.props.bindInfo.nav_id,
            articleId: this.props.bindInfo.mes_id,
        }
    }
    componentDidMount = () => {
        const { bindInfo } = this.props;
        // console.log(bindInfo)
        this.handleOnchange(bindInfo.nav_id);
    }

    listColumn = (data) => {
        if (data === null) {
            return null;
        }
        let columns = [];
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                columns.push(
                    <Option key={data[i].rank + '-' + data[i].id} value={data[i].id}>{data[i].title}</Option>
                )
            }
        }
        return columns;
    }

    titleColumn = (data) => { //更新titleColumn的初始值。
        if (data === null) {
            return null;
        }
        let columns = [];
        if (data.length > 0) {
            data.map((obj, id) => {
                columns.push(
                    <Option key={obj.id} value={obj.id} >{obj.title}</Option>
                )
            })
        }
        return columns;
    }

    //初始值也应该变。
    handleOnchange = (id) => {
        // console.log(id);
        const { navId } = this.state;
        const { apiPath, request } = getArticleTitle(id);
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(data => {
                if (data.error_code === 0) {
                    this.setState({
                        subordData: data.data,
                        navId: id
                    })
                    if (id !== navId) { //选择了不同的，刷新表单信息。
                        this.props.form.setFieldsValue({
                            article_title: data.data.length > 0 ? data.data[0].title : null,
                        })
                        this.setState({
                            articleId: data.data.length > 0 ? data.data[0].id : null
                        })
                    }
                }
            })
    }

    handleArticleChange = (id) => {
        // console.log(id);
        this.setState({
            articleId: id
        })
    }

    handleSubmit = () => {
        const { navId, articleId } = this.state;
        const { type } = this.props;
        let formData = new FormData();
        formData.append("nav_id", navId);
        formData.append("mes_id", articleId);
        console.log(navId);
        console.log(articleId);
        this.props.form.validateFieldsAndScroll((err, values) => { //还需要获取文章id鸭。
            if (!err) {
                const { apiPath, request } = updateUpper(type, formData);
                // console.log(request)
                fetchApi(apiPath, request)
                    .then(res => res.json())
                    .then(data => {
                        // 更新成功也要改现在的值。
                        if (data.error_code === 0) {
                            success("更新成功");
                        } else {
                            error("更新失败");
                        }
                    })
            }
        })
    }

    render() {
        const bindInfo = this.props.bindInfo;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4, offset: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const { navData } = this.props;
        const { subordData } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label='栏目选择'>
                        {getFieldDecorator(`nav_id`, {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择栏目',
                                },
                            ],
                            initialValue: bindInfo ? bindInfo.title : null,
                        })(<Select required="true" style={{ width: '40%' }} placeholder="请选择一个栏目" onChange={this.handleOnchange}>
                            {navData ? this.listColumn(navData) : null}
                        </Select>)}
                    </Form.Item>

                    <Form.Item label='置顶文章'>
                        {getFieldDecorator(`article_title`, {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择一篇置顶文章',
                                },
                            ],
                            initialValue: bindInfo ? bindInfo.mes_title : null
                        })(<Select required="true" style={{ width: '60%' }} placeholder="请选择置顶文章" onChange={this.handleArticleChange}>
                            {subordData ? this.titleColumn(subordData) : null}
                        </Select>)}
                    </Form.Item>
                    <Button type="default" htmlType="submit" style={{ float: "right" }}>确认提交</Button>
                </Form>
            </div >
        )
    }
}


const ModuleCommon = Form.create()(Module);
export default ModuleCommon;