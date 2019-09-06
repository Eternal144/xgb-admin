import React, { Component } from 'react';
import { Form, Select, Button, Icon, Col, Popconfirm, Input, Skeleton, message, Row } from 'antd';
import { fetchApi } from '../../callApi';
import { getNaviInfo } from '../../constants/api/navi';
import './customize.css';
import Uploader from '../uploader/UpLoader';
import { updateLowwer, addlowwer, lowwerModelPreview, upperModelPreview, messageList, updateUpper } from '../../constants/api/model';
const { Option, OptGroup } = Select;
const confirmSaveText = '是否保存设置?';
const queue = ["ModelA", "ModelB", "ModelC", "ModelD"];
let id = 0;

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
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};


// 主要
class BindMan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNaviLoaded: false,
            navData: null,
            isListLoaded: false,
            mesList: [],
        }
    }

    componentDidMount = () => {
        // console.log(fetchApi(apiPath, request))
        if (!this.state.isNaviLoaded) {
            let { apiPath, request } = getNaviInfo();
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    // console.log(data.data)
                    this.setState({
                        navData: data.data,
                        isNaviLoaded: true,
                    })
                });
        }
    }

    noNaviNotification() {
        message.error("栏目列表获取失败");
    }

    removeE = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    addE = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    removeG = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    addG = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    removeH = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    addH = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleColumnSelectChange = (columnValue) => {
        this.setState({ isListLoaded: false })
        let { apiPath, request } = messageList(columnValue);
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(data => {
                let temp = [];
                for (let i = 0; i < data.data.length; i++) {
                    temp.push(
                        <Option key={columnValue + "--" + data.data[i].id} value={data.data[i].id}>{data.data[i].title}</Option>
                    )
                }
                this.setState({
                    isListLoaded: true,
                    mesList: temp,
                })
            });
    }

    listColumn(data) {
        let columns = [];
        // console.log(data[0].children[0].title);
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let opts = [];
                for (let j = 0; j < data[i].children.length; j++) {
                    opts.push(
                        <Option key={data[i].children[j].rank + '-' + data[i].children[j].id} value={data[i].children[j].id}>{data[i].children[j].title}</Option>
                    )
                }
                columns.push(
                    <OptGroup label={data[i].title}>{opts}</OptGroup>
                )
            }
        } else {
            return this.noNaviNotification();
        }
        return columns;
    }

    confirmSave = () => {
        const type = this.props.fromModel;
        if (type === "ModelA") {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    //此处用fetch提交绑定信息,A-D下同
                    //values.bindItModelA [int] 模块A绑定栏目nav_id
                    //values.TopModelA [int] 模块A置顶文章mes_id
                    let reqinfo = new FormData();
                    reqinfo.append('nav_id', values.bindItModelA);
                    reqinfo.append('mes_id', values.TopModelA);
                    let { apiPath, request } = updateUpper(reqinfo, 1);
                    fetchApi(apiPath, request)
                        .then(res => res.json())
                        .then(data => {
                            if (data.error_code === 0) {
                                message.success("保存成功");
                            } else {
                                message.error("保存失败");
                            }
                        })
                }
            })
        } else if (type === "ModelB") {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let reqinfo = new FormData();
                    reqinfo.append('nav_id', values.bindItModelB);
                    reqinfo.append('mes_id', values.TopModelB);
                    let { apiPath, request } = updateUpper(reqinfo, 2);
                    fetchApi(apiPath, request)
                        .then(res => res.json())
                        .then(data => {
                            if (data.error_code === 0) {
                                message.success("保存成功");
                            } else {
                                message.error("保存失败");
                            }
                        })
                }
            })
        } else if (type === "ModelC") {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let reqinfo = new FormData();
                    reqinfo.append('nav_id', values.bindItModelC);
                    reqinfo.append('mes_id', values.TopModelC);
                    let { apiPath, request } = updateUpper(reqinfo, 3);
                    fetchApi(apiPath, request)
                        .then(res => res.json())
                        .then(data => {
                            if (data.error_code === 0) {
                                message.success("保存成功");
                            } else {
                                message.error("保存失败");
                            }
                        })
                }
            })
        } else if (type === "ModelD") {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let reqinfo = new FormData();
                    reqinfo.append('nav_id', values.bindItModelD);
                    reqinfo.append('mes_id', values.TopModelD);
                    let { apiPath, request } = updateUpper(reqinfo, 4);
                    fetchApi(apiPath, request)
                        .then(res => res.json())
                        .then(data => {
                            if (data.error_code === 0) {
                                message.success("保存成功");
                            } else {
                                message.error("保存失败");
                            }
                        })
                }
            })
        } else if (type === "ModelE") {

        } else if (type === "ModelF") {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let reqinfo = new FormData();
                    reqinfo.append('content1', values.modelF[1]);
                    reqinfo.append('description', values.modelF[2]);
                    let { apiPath, request } = updateLowwer(reqinfo, 2, this.props.bindInfo.id);
                    fetchApi(apiPath, request)
                        .then(res => res.json())
                        .then(data => {

                        });
                }
            });
        } else if (type === "ModelG") {

        } else if (type === "ModelH") {

        }
    }
    // handleSubmit = () => {
    //     let bindInfo = this.props.form.getFieldsValue();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             message.success(`绑定至${bindInfo.bindItModelA}`)
    //         }
    //     })
    // }

    modelTitle = () => {
        if (this.props.isReady === true) {
            if (queue.indexOf(this.props.fromModel) > -1) {
                return this.props.bindInfo.title;
            } else {
                return this.props.bindInfo[0].nav_name;
            }
        } else {
            return null;
        }
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        //模块E动态表单
        const formEItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '内容控制' : ''}
                required={false}
                key={k}
            >
                <div className="dynamic-box">
                    <Row>
                        <div>PART {index + 1}:</div>
                        <Uploader labelReq={false} type="image" bindTo={`E` + index} disLabel={true} />
                    </Row>
                    {getFieldDecorator(`modelE1[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "请填写第一段描述性文字",
                            },
                            {
                                max: 35,
                                message: '字数超过上限，请酌情删减'
                            },
                        ],
                    })(<Input placeholder="请填写第一段描述性文字,35字以内" style={{ width: '100%', marginRight: 8 }} />)}
                    {getFieldDecorator(`modelE2[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "请填写第二段描述性文字",
                            },
                            {
                                max: 35,
                                message: '字数超过上限，请酌情删减'
                            },
                        ],
                    })(<Input placeholder="请填写第二段描述性文字,35字以内" style={{ width: '100%', marginRight: 8 }} />)}
                    {getFieldDecorator(`E${index + 1}`, {
                        rules: [
                            {
                                required: true,
                                message: '请选择一篇文章',
                            },
                        ],
                    })(
                        <Select style={{ width: '90%' }} placeholder="请选择一篇文章">
                            {/* <Option value="-1">请选择</Option> */}
                            {this.state.isListLoaded ? this.state.mesList : null}
                        </Select>
                    )}
                    {keys.length > 1 ? (
                        <Button style={{ width: '10%' }} onClick={() => this.removeE(k)}>
                            <Icon className="dynamic-delete-button" type="minus-circle-o" />
                        </Button>
                    ) : null}
                </div>

            </Form.Item>
        ));

        //模块G动态表单
        const formGItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '内容控制' : ''}
                required={false}
                key={k}
            >
                <div className="dynamic-box">
                    <Row>
                        <div>PART {index + 1}:</div>
                        <Uploader labelReq={false} type="image" bindTo={`E` + index} disLabel={true} />
                    </Row>
                    {getFieldDecorator(`modelG1[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "请填写描述性文字",
                            },
                            {
                                max: 35,
                                message: '字数超过上限，请酌情删减'
                            },
                        ],
                    })(<Input placeholder="请填写第一段描述性文字,35字以内" style={{ width: '100%', marginRight: 8 }} />)}
                    {getFieldDecorator(`G${index + 1}`, {
                        rules: [
                            {
                                required: true,
                                message: '请选择一篇文章',
                            },
                        ],
                    })(
                        <Select style={{ width: '90%' }} placeholder="请选择一篇文章">
                            {/* <Option value="-1">请选择</Option> */}
                            {this.state.isListLoaded ? this.state.mesList : null}
                        </Select>
                    )}
                    {keys.length > 1 ? (
                        <Button style={{ width: '10%' }} onClick={() => this.removeG(k)}>
                            <Icon className="dynamic-delete-button" type="minus-circle-o" />
                        </Button>
                    ) : null}
                </div>
            </Form.Item>
        ));

        //模块H动态表单
        const formHItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '内容控制' : ''}
                required={false}
                key={k}
            >
                <div className="dynamic-box">
                    <Row>
                        <div>PART {index + 1}:</div>
                        <Uploader labelReq={false} type="image" bindTo={`E` + index} disLabel={true} />
                    </Row>
                    {getFieldDecorator(`modelH1[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "请填写描述性文字",
                            },
                            {
                                max: 35,
                                message: '字数超过上限，请酌情删减'
                            },
                        ],
                    })(<Input placeholder="请填写第一段描述性文字,35字以内" style={{ width: '100%', marginRight: 8 }} />)}
                    {getFieldDecorator(`H${index + 1}`, {
                        rules: [
                            {
                                required: true,
                                message: '请选择一篇文章',
                            },
                        ],
                    })(
                        <Select style={{ width: '90%' }} placeholder="请选择一篇文章">
                            {/* <Option value="-1">请选择</Option> */}
                            {this.state.isListLoaded ? this.state.mesList : null}
                        </Select>
                    )}
                    {keys.length > 1 ? (
                        <Button style={{ width: '10%' }} onClick={() => this.removeG(k)}>
                            <Icon className="dynamic-delete-button" type="minus-circle-o" />
                        </Button>
                    ) : null}
                </div>
            </Form.Item>
        ));



        // console.log(this.props.isReady);
        return (
            <div>
                {this.state.isNaviLoaded ?
                    <Form {...formItemLayout} >
                        {this.props.fromModel !== "ModelF" ?
                            <Form.Item label="栏目选择">
                                {getFieldDecorator(`bindIt${this.props.fromModel}`, {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择一个栏目',
                                        },
                                    ],
                                    initialValue: this.modelTitle(),
                                })(
                                    <Select required="true" style={{ width: '30%' }} placeholder="请选择一个栏目" onChange={this.handleColumnSelectChange}>
                                        {/* <Option value="-1">请选择</Option> */}
                                        {this.state.isNaviLoaded ? this.listColumn(this.state.navData) : null}
                                    </Select>
                                )}
                            </Form.Item> : null
                        }
                        {/* 通用模块 */}
                        {
                            queue.indexOf(this.props.fromModel) > -1 ?
                                <Form.Item label="置顶文章" extra="如未选择，则默认为最新文章">
                                    {getFieldDecorator(`Top${this.props.fromModel}`, {
                                        rules: [
                                            {
                                                required: false,
                                                message: '请选择一篇文章',
                                            },
                                        ],
                                    })(
                                        <Select style={{ width: '60%' }} placeholder="请选择一篇文章">
                                            {/* <Option value="-1">请选择</Option> */}
                                            {this.state.isListLoaded ? this.state.mesList : null}
                                        </Select>
                                    )}
                                </Form.Item> : null
                        }
                        {/* 模块E表单 */}
                        {
                            this.props.fromModel === "ModelE" ?
                                <div>
                                    <Form.Item label="栏目描述">
                                        {getFieldDecorator(`Description${this.props.fromModel}`, {
                                            rules: [
                                                {
                                                    max: 35,
                                                    message: '描述过长,请酌定删减',
                                                },
                                            ],
                                            // initialValue: this.props.bindInfo[0].description,
                                        })(
                                            <Input style={{ width: '60%' }} placeholder="35字以内(选填)">
                                            </Input>
                                        )
                                        }
                                    </Form.Item>
                                    {formEItems}
                                    <Form.Item {...formItemLayoutWithOutLabel}>
                                        <Button type="dashed" onClick={this.addE} style={{ width: '60%' }}><Icon type="plus" /></Button>
                                    </Form.Item>
                                </div>
                                : null
                        }
                        {/* 模块F表单 */}
                        {
                            this.props.fromModel === "ModelF" ? <div>
                                <Form.Item label="文字标题">
                                    {getFieldDecorator(`modelF[1]`, {
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "请填写文字标题",
                                            },
                                            {
                                                max: 35,
                                                message: '字数超过上限，请酌情删减'
                                            },
                                        ],
                                        // initialValue: this.props.bindInfo[0].content1,
                                    })(<Input placeholder="请填写文字标题,35字以内" style={{ width: '60%', marginRight: 8 }} />)}

                                </Form.Item>
                                <Form.Item label="跳转链接">
                                    {getFieldDecorator(`modelF[2]`, {
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "请填写跳转链接",
                                            },
                                        ],
                                        // initialValue: this.props.bindInfo[0].description,
                                    })(<Input placeholder="请填写跳转链接" style={{ width: '60%', marginRight: 8 }} />)}
                                </Form.Item>
                            </div> : null
                        }
                        {/* 模块G表单 */}
                        {
                            this.props.fromModel === "ModelG" ? <div>
                                {formGItems}
                                <Form.Item {...formItemLayoutWithOutLabel}>
                                    <Button type="dashed" onClick={this.addG} style={{ width: '60%' }}><Icon type="plus" /></Button>
                                </Form.Item>
                            </div> : null
                        }
                        {/* 模块H表单 */}
                        {
                            this.props.fromModel === "ModelH" ? <div>
                                {formHItems}
                                <Form.Item {...formItemLayoutWithOutLabel}>
                                    <Button type="dashed" onClick={this.addH} style={{ width: '60%' }}><Icon type="plus" /></Button>
                                </Form.Item>
                            </div> : null
                        }

                        <Form.Item>
                            {/* <Button onClick={this.handleSubmit}>保存修改</Button> */}
                            <Col span={24} style={{ textAlign: 'right' }}>
                                {/* <Popconfirm placement="top" title={confirmClearText} onConfirm={this.confirmClear()} okText="确定" cancelText="取消">
                        <Button type="danger"><Icon type="undo" />清除</Button>
                    </Popconfirm> */}
                                <Popconfirm placement="top" title={confirmSaveText} onConfirm={this.confirmSave} okText="确定" cancelText="取消">
                                    <Button><Icon type="save" />保存修改</Button>
                                </Popconfirm>
                            </Col>
                        </Form.Item>
                    </Form > : <Skeleton active />
                }
            </div>
        )
    }
}


const BindList = Form.create('Bind')(BindMan);

export default BindList;