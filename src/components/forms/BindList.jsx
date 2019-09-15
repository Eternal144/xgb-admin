import React, { Component } from 'react';
import { Form, Select, Button, Icon, Col, Popconfirm, Input, Skeleton, message, Row } from 'antd';
import { fetchApi } from '../../callApi';
import { getArticleTitle } from '../../constants/api/navi';
import './customize.css';
import Uploader from '../uploader/UpLoader';
import { updateLowwer, addlowwer, lowwerModelPreview, upperModelPreview, messageList, updateUpper, } from '../../constants/api/model';
// import { getFileItem } from 'antd/lib/upload/utils';
const { Option, OptGroup } = Select;
const confirmSaveText = '是否保存设置?';

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
let id = 0;

//id是以啥为依据的呀？
const newChild = (idd) => {
    return {
        id: idd,
        content1: null,
        content2: null,
        picture: null,
        mes_id: null,
        mes_title: null
    }
}

// 主要
class BindMan extends Component {
    constructor(props) {
        super(props);
        const { bindInfo } = this.props
        const { children } = bindInfo;
        this.state = {
            navId: null,
            isNaviLoaded: false,
            isListLoaded: false,
            articleData: null,
            moduleData: bindInfo,
            subIdRecord: children && children.length > 0 ? parseInt(children[children.length - 1].nav_id) : parseInt(bindInfo.nav_id)
        }
    }
    //渲染该二级标题下所有文章题目。

    //获取可选文章title
    getArtiTitle = (id) => {
        const { apiPath, request } = getArticleTitle(id);
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(data => {
                if (data.error_code === 0) {
                    this.setState({
                        articleData: data.data
                    })
                }
            })
    }

    noNaviNotification = () => {
        message.error("栏目列表获取失败");
    }
    //obj.nav_id
    remove = (id) => {
        const { moduleData } = this.state;
        this.setState({
            moduleData: this.resetModuleData()
        }, () => {
            console.log(id);
            console.log(moduleData);
            let arr = moduleData;
            arr.children = moduleData.children.filter((obj) => {
                return parseInt(obj.id) !== parseInt(id)
            })
            console.log(arr);
            this.setState({
                moduleData: arr
            })
        })
    };


    //两边都要更新。
    add = () => {
        const { moduleData, subIdRecord } = this.state;
        let id = subIdRecord + 1;
        let child = newChild(id);
        this.setState({
            subIdRecord: id
        })
        moduleData.children.push(child);
        this.setState({
            moduleData
        })
    };

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

    articleList = (data) => {
        if (data === null) {
            return null;
        }
        let columns = [];
        if (data.length > 0) {
            data.map((obj, id) => {
                columns.push(
                    <Option key={obj.title} value={obj.id}  >{obj.title}</Option>
                )
            })
        }
        return columns;
    }

    //在这里一并更新mes_title
    resetModuleData = () => {
        const { type } = this.props
        const { getFieldsValue } = this.props.form;
        const { moduleData, articleData } = this.state;
        let values = getFieldsValue();
        if (typeof (values.nav_id) === 'number') {
            moduleData.nav_id = values.nav_id;
        }
        moduleData.description = values.description;
        moduleData.model = type;
        delete values.nav_id;
        delete values.description;
        let arr = [];
        let index;
        for (let s in values) {
            arr = s.split('-');
            index = parseInt(arr[0]);
            switch (arr[1]) {
                case "content1":
                    moduleData.children[index].content1 = values[s];
                    break;
                case "content2":
                    moduleData.children[index].content2 = values[s];
                    break;
                case "mes_id":
                    if (typeof (values[s]) === 'number') {
                        moduleData.children[index].mes_id = values[s];
                        articleData.map((obj, i) => {
                            if (obj.id === values[s]) {
                                moduleData.children[index].mes_title = obj.title;
                            }
                        })
                    }
                    break;
            }
        }
        return moduleData;
    }

    //初始mes_id指向的并不是mesID。而是文章内容。后来进行选择了才会变。所以在提交的时候要进行处理。
    // 如果是一个字符串而不是数字，则不改变原有值。否则进行更新。
    handleSubmit = () => {
        this.setState({
            moduleData: this.resetModuleData()
        }, () => {
            //执行真正的删除。
        })

        // let pic = sessionStorage.getItem('picpath');
        // console.log(pic);
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
    }
    handlegetLink = (src) => {
        console.log("接收到后台返回的数据了。")
        console.log(src);
    }
    // handleChange = (e) => {
    //     console.log(e.target.value);
    // }
    imageDisplay = (obj) => {
        if (obj && obj.picture) {
            return <img src={obj.picture} alt="有图啦" />
        } else {
            return <Uploader getLink={this.handlegetLink} type="image" bindTo={"MessageCover"} />
        }
    }

    getItems = () => {
        const { type } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { articleData, moduleData } = this.state; //详细信息？
        const { children } = moduleData
        const itemArr = [];
        console.log(children);
        children.map((key, index) => {
            itemArr.push(
                <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '内容控制' : ''}
                    required={false}
                    key={key.id}

                >
                    <div className="dynamic-box">
                        <Row>
                            <div>PART {index + 1}:</div>
                            {this.imageDisplay()}
                        </Row>
                        {getFieldDecorator(`${index}-content1`, {
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
                            initialValue: key.content1
                        })(<Input placeholder="请填写第一段描述性文字,35字以内" style={{ width: '100%', marginRight: 8 }} />)}

                        {
                            type === 1 ? getFieldDecorator(`${index}-content2`, {
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
                                initialValue: key.content2
                            })(<Input placeholder="请填写第二段描述性文字,35字以内" style={{ width: '100%', marginRight: 8 }} />) : null
                        }

                        {getFieldDecorator(`${index}-mes_id`, {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择一篇文章',
                                },
                            ],
                            initialValue: key.mes_title
                        })(
                            <Select style={{ width: '90%' }} placeholder="请选择一篇文章">
                                {articleData ? this.articleList(articleData) : null}
                            </Select>
                        )}
                        {children.length > 0 ? (
                            <Button style={{ width: '10%' }} onClick={() => this.remove(index)}>
                                <Icon className="dynamic-delete-button" type="minus-circle-o" />
                            </Button>
                        ) : null}
                    </div>

                </Form.Item>
            )
        })
        return itemArr;

    }

    //当二级标题框。更新了栏目全清空好吧？
    handleNavOnchange = (id) => {
        const { setFieldsValue, getFieldValue } = this.props.form;
        const { moduleData } = this.state;
        moduleData.nav_id = id;
        moduleData.articleData = null;
        moduleData.description = null;
        moduleData.children = null;
        this.setState({
            navId: id,
            articleData: null,
            moduleData: moduleData,
        })
        setFieldsValue({
            description: null,
        })
        this.getArtiTitle(id);
    }

    componentDidMount = () => {
        const { nav_id } = this.props.bindInfo;
        if (nav_id) {
            this.getArtiTitle(nav_id);
        }
    }
    handleChange = () => {
        this.setState({
            moduleData: this.resetModuleData()
        })
    }
    //根据child来渲染。
    getSubDetails = () => {
        const { getFieldDecorator } = this.props.form;
        const { type } = this.props;
        const { articleData, moduleData, subIdRecord } = this.state; //详细信息？
        const { children } = moduleData
        let childArr = [];
        console.log(children)
        //根据本地数据渲染。删除的时候根据id删除。
        children.map((obj, index) => {
            childArr.push((<Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '内容控制' : ''}
                required={false}
                key={index}
            >
                <div className="dynamic-box">
                    <Row>
                        <div>PART {index + 1}:</div>
                        {this.imageDisplay()}
                    </Row>
                    {getFieldDecorator(`${index}-content1`, {
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
                        initialValue: obj.content1
                    })(<Input placeholder="请填写第一段描述性文字,35字以内" style={{ width: '100%', marginRight: 8 }} />)}

                    {
                        type === 1 ? getFieldDecorator(`${index}-content2`, {
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
                            initialValue: obj.content2
                        })(<Input placeholder="请填写第二段描述性文字,35字以内" style={{ width: '100%', marginRight: 8 }} />) : null
                    }
                    {/* 但是在保存的时候还是需要id的呀 */}
                    {getFieldDecorator(`${index}-mes_id`, {
                        rules: [
                            {
                                required: true,
                                message: '请选择一篇文章',
                            },
                        ],
                        initialValue: obj.mes_title
                    })(
                        <Select style={{ width: '90%' }} placeholder="请选择一篇文章" >
                            {articleData ? this.articleList(articleData) : null}
                        </Select>
                    )}
                    {/* 这个时候里面的值都是空的。 */}
                    <Button style={{ width: '10%' }} onClick={() => this.remove(obj.id)}>
                        <Icon className="dynamic-delete-button" type="minus-circle-o" />
                    </Button>
                </div>
            </Form.Item>))
        })
        return childArr;
    }
    //根据children渲染。
    render() {
        const { getFieldDecorator } = this.props.form;
        const { type, navData } = this.props;
        const { moduleData } = this.state; //详细信息？
        return (
            <div>
                <Form {...formItemLayout}  >
                    <Form.Item label='栏目选择'>
                        {getFieldDecorator(`nav_id`, {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择栏目',
                                },
                            ],
                            initialValue: moduleData ? moduleData.nav_name : null
                        })(<Select required="true" style={{ width: '40%' }} placeholder="请选择一个栏目" onChange={this.handleNavOnchange}>
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
                            initialValue: moduleData ? moduleData.description : null
                        })(
                            <Input style={{ width: '60%' }} placeholder="35字以内(选填)" onChange={this.handleChange} >
                            </Input>
                        )
                        }
                    </Form.Item> : null}
                    {moduleData && moduleData.children ? this.getSubDetails() : null}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}><Icon type="plus" /></Button>
                    </Form.Item>
                    <Form.Item>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Popconfirm placement="top" title={confirmSaveText} onConfirm={this.handleSubmit} okText="确定" cancelText="取消">
                                <Button type="primary"><Icon type="save" />保存修改</Button>
                            </Popconfirm>
                        </Col>
                    </Form.Item>
                </Form >
            </div>
        )
    }
}


const BindList = Form.create()(BindMan);

export default BindList;