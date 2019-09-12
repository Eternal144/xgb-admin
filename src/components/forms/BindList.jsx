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
        this.props.form.validateFields((err, values) => {
            console.log(values);
            // if (!err) {
            //     let reqinfo = new FormData();
            //     reqinfo.append('nav_id', values.bindItModelA);
            //     reqinfo.append('mes_id', values.TopModelA);
            //     let { apiPath, request } = updateUpper(reqinfo, 1);
            //     fetchApi(apiPath, request)
            //         .then(res => res.json())
            //         .then(data => {
            //             if (data.error_code === 0) {
            //                 message.success("保存成功");
            //             } else {
            //                 message.error("保存失败");
            //             }
            //         })
            // }
        })
    }

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
        const { navData } = this.state;
        const { type, bindInfo } = this.props;
        console.log(bindInfo); //直到有数据
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '内容控制' : ''}
                required={false}
                key={k}
            >
                <div className="dynamic-box">
                    <Row>
                        <div>PART {index + 1}:</div>
                    </Row>
                    {getFieldDecorator(`${index}-con_1`, {
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

                    {
                        type === 1 ? getFieldDecorator(`${index}-con_2`, {
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
                        })(<Input placeholder="请填写第二段描述性文字,35字以内" style={{ width: '100%', marginRight: 8 }} />) : null
                    }

                    {getFieldDecorator(`${index}-mes_id`, {
                        rules: [
                            {
                                required: true,
                                message: '请选择一篇文章',
                            },
                        ],
                    })(
                        <Select style={{ width: '90%' }} placeholder="请选择一篇文章">
                            {this.state.isListLoaded ? this.state.mesList : null}
                        </Select>
                    )}
                    {keys.length > 0 ? (
                        <Button style={{ width: '10%' }} onClick={() => this.removeE(k)}>
                            <Icon className="dynamic-delete-button" type="minus-circle-o" />
                        </Button>
                    ) : null}
                </div>

            </Form.Item>
        ));

        return (
            <div>
                <Form {...formItemLayout} >
                    <Form.Item label='栏目选择'>
                        {getFieldDecorator(`nav_id`, {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择栏目',
                                },
                            ],
                            // initialValue: bindInfo ? bindInfo.title : null,
                        })(<Select required="true" style={{ width: '40%' }} placeholder="请选择一个栏目" onChange={this.handleOnchange}>
                            {navData ? this.listColumn(navData) : null}
                        </Select>)}
                    </Form.Item>
                    {type === 1 ? <Form.Item label="栏目描述">
                        {getFieldDecorator(`description`, {
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
                    </Form.Item> : null}


                    {formItems}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.addE} style={{ width: '60%' }}><Icon type="plus" /></Button>
                    </Form.Item>
                    <Form.Item>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Popconfirm placement="top" title={confirmSaveText} onConfirm={this.confirmSave} okText="确定" cancelText="取消">
                                <Button type="primary"><Icon type="save" />保存修改</Button>
                            </Popconfirm>
                        </Col>
                    </Form.Item>
                </Form >
            </div>
        )
    }
}


const BindList = Form.create('Bind')(BindMan);

export default BindList;