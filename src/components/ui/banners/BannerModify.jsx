import React, { Component } from 'react';
import { Form, Input, Icon, Select, Button, Card, Col, message, } from 'antd';
import { showMessageList, addBanner, editBanner, delBanner } from '../../../constants/api/banner';
import { fetchApi } from '../../../callApi';
import ImgCropper from '../../uploader/Cropper';
import { getNavAllArticle } from '../../../constants/api/navi';

const { Option, OptGroup } = Select;
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

class BannerModify extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    listColumn(data) {
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

    handleColumnSelectChange = (columnValue) => {
        this.setState({ isListLoaded: false })
        let { apiPath, request } = getNavAllArticle(columnValue);
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(data => {
                let temp = [];
                let mes = data.data.message;
                for (let i = 0; i < mes.length; i++) {
                    temp.push(
                        <Option key={columnValue + "--" + mes[i].id} value={mes[i].id}>{mes[i].title}</Option>
                    )
                }
                this.setState({
                    isListLoaded: true,
                    mesList: temp,
                })
            });
    }

    //删除一项
    delItem = (i) => {
        const { apiPath, request } = delBanner(i);
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(data => {
                message.success(data.message);
            })
    }

    getColumnTitle(id) {
        let data = this.props.catData;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id)
                return data[i].title;
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let value = Object.keys(values);
            let i = this.props.index;
            console.log(value);
            let bindto = `Banner${i}`;
            let thisTitle = `title${i}`;
            let thisColumn = `column${i}`;
            let link = sessionStorage.getItem("imgUrl");
            if (this.props.banData.id === -1) {
                //这是个新增的！调用add
                //这里因为调用了cropper，将link改为了imglink，下同
                let { apiPath, request } = addBanner(link, values[thisTitle], values[thisColumn], values[i], i + 1);
                fetchApi(apiPath, request)
                    .then(res => res.json())
                    .then(data => {
                        if (data.error_code === 0) {
                            message.success(`添加成功`);
                        } else {
                            message.error(`添加失败`);
                        }
                    })
            } else {
                //这是个原有的！调用update
                // console.log('改了！' + this.props.data[i].id)
                let { apiPath, request } = editBanner(link, values[thisTitle], values[thisColumn], values[i], i + 1, this.props.banData.id);
                fetchApi(apiPath, request)
                    .then(res => res.json())
                    .then(data => {
                        if (data.error_code === 0) {
                            message.success(`修改成功`);
                        } else {
                            message.error(`修改失败`);
                        }
                    })
            }
        })
    }

    bannerConfig = (data, index) => {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card className="banner-card">
                    <Form id={"form" + index} {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="标题">
                            {getFieldDecorator(`title${index}`, {
                                rules: [
                                    {
                                        max: 20,
                                        message: '轮播图标题过长',
                                    },
                                    {
                                        required: true,
                                        message: '请输入轮播图标题！',
                                    },
                                ],
                                initialValue: data.title,
                            })(<Input placeholder="20字以内" hideRequiredMark="false" allowClear={`true`} style={{ width: '60%' }} />)
                            }
                        </Form.Item>

                        <Form.Item label="跳转文章选择">
                            {getFieldDecorator(`column${index}`, {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择一个栏目',
                                    },
                                ],
                                initialValue: this.getColumnTitle(data.nav_id),
                            })(
                                <Select id={index + '-1'} onChange={this.handleColumnSelectChange} key={index + '-1'} required="true" style={{ width: '20%' }} placeholder="请选择一个栏目">
                                    {/* <Option value="-1">请选择</Option> */}
                                    {this.props.catData ? this.listColumn(this.props.catData) : null}
                                </Select>
                            )}
                            {getFieldDecorator(`passage${index}`, {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择一篇文章',
                                    },
                                ],
                                // initialValue: this.getAtcTitle(index)
                            })(
                                <Select id={index + '-2'} key={index + '-2'} style={{ width: '40%' }} placeholder="请选择一篇文章">
                                    {/* <Option value="-1">请选择</Option> */}
                                    {this.state.isListLoaded ? this.state.mesList : null}
                                </Select>
                            )
                            }
                        </Form.Item>
                        <Col span={4}></Col>
                        <Col span={20}>
                            {/* 图片上传 */}
                            <ImgCropper w="1600" h="350" />
                        </Col>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button key={index} type="danger" htmlType="button" onClick={this.delItem.bind(this, data.id)}><Icon type="delete" />删除</Button>
                            <Button key={index} type="default" loading={this.state.isSaved} htmlType="submit"><Icon type="save" />保存修改</Button>
                        </Col>
                    </Form>
                </Card>
            </div >
        )
    }



    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        // console.log(this.props.banData)
        return (
            <div>
                {this.bannerConfig(this.props.banData, this.props.index)}
            </div>
        )
    }
}

const bannerModify = Form.create({ name: "bannerEdit" })(BannerModify);
export default bannerModify;