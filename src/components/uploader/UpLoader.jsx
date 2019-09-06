// 上传组件，具有附件和图片上传两个功能
// 'type'[string](必要)，type="image"对应图片上传，type="file"对应附件上传
// 'bindTo'[string](必要)，与当前所使用的父表单相挂钩，当一个页面具有多个<Uploader>组件shi，该值应保证互不相等
// 'necessary'[boolean](可选，默认为false)，是否为表单必填项
// 'diaLabel'[boolean](可选，默认false)，是否展示表单文本

import React, { Component } from 'react';
import { Form, Upload, Button, Icon, message, Col, Row, Tooltip } from 'antd';
// import ContentLoader from 'react-content-loader';

const switchModel = (type, file) => {
    if (type === "image") {
        return ({
            "url": "https://xuegong.twtstudio.com/api/uploadPic",
            "text": "上传图片",
        });
    } else if (type === "file") {
        return ({
            "url": "https://xuegong.twtstudio.com/api/uploadApp",
            "text": "上传附件",
        });
    }
}

// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

class UpLoaderModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imgPath: null,
        }
        Object.assign(this.state, this.props);
    }

    beforeImageUpload(file) {
        let isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt8M = file.size / 1024 / 1024 < 8;
        if (!isJpgOrPng) {
            message.error('请上传JPG/PNG格式的图片文件!');
        }
        if (!isLt8M) {
            message.error('文件大小请勿超过8MB');
        }
        return isJpgOrPng && isLt8M;
    }

    beforeFileUpload(file) {
        const limit = file.size / 1024 / 1024 < 8;
        if (!limit) {
            message.error('文件大小请勿超过8MB');
        }
        return limit;
    }

    render() {
        // console.log(this.state.path);
        const imageReqSettings = {
            name: 'file',
            action: switchModel(this.props.type).url,
            beforeUpload: this.beforeImageUpload,
            listType: 'picture',
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    //文件上传中
                }
                if (info.file.status === 'done') {
                    // this.props.getfilePath(info.file.response.data.path);
                    // this.props.geticonPath(info.file.response.data.icon);
                    message.success(`图片上传成功：${info.file.name}`);
                } else if (info.file.status === 'error') {
                    message.error(`图片上传失败：${info.file.name}`);
                }
                // let fileList = [...info.fileList];
            },
        }
        const fileReqSettings = {
            name: 'file',
            action: switchModel(this.props.type).url,
            beforeUpload: this.beforeFileUpload,
            listType: 'text',
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`文件上传成功：${info.file.name}`);
                    this.props.GetPath();
                } else if (info.file.status === 'error') {
                    message.error(`文件上传失败：${info.file.name}`);
                }
            },
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Form.Item label={this.props.disLabel ? null : switchModel(this.props.type).text} >
                {this.props.type === "image" ?
                    <div>
                        {getFieldDecorator(`image${this.props.bindTo}`, {
                            rules: [
                                {
                                    required: this.props.necessary,
                                    message: '请选择一个图片',
                                },
                            ],
                        })(
                            <Row>
                                <Col span={8}>
                                    <Upload {...imageReqSettings} >
                                        <Tooltip placement="top" title="小于8MB的图片 格式为jpg/png">
                                            <Button><Icon type={this.state.loading ? "loading" : "upload"} />上传图片</Button>
                                        </Tooltip>
                                    </Upload>
                                </Col>
                            </Row>
                        )}
                    </div>
                    : null}
                {this.props.type === "file" ?
                    <div>
                        {getFieldDecorator(`file${this.props.bindTo}`, {
                            rules: [
                                {
                                    required: this.props.necessary,
                                    message: '请选择一个文件',
                                },
                            ],
                        })(
                            <Row>
                                <Col span={8}>
                                    <Upload {...fileReqSettings}>
                                        <Tooltip placement="top" title="小于8MB的文件 格式不限">
                                            <Button><Icon type={this.state.loading ? "loading" : "upload"} />上传附件</Button>
                                        </Tooltip>
                                    </Upload>
                                </Col>
                            </Row>
                        )}
                    </div>
                    : null}
            </Form.Item>
        )
    }
}

const UpLoader = Form.create({ name: "uploadModel" })(UpLoaderModel);
export default UpLoader;  