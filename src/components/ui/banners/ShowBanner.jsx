import React, { Component } from 'react';
import {
    Form,
    Input,
    Icon,
    Select,
    Button,
    Card,
    Upload,
    Modal,
    Col,
    message,
} from 'antd';
import LocalizedModal from '../../ui/Modals'
import { CONFIRM_MODIFY } from '../../../constants/common'
import './customize.css';
import { Collapse } from 'antd';
import { Skeleton } from 'antd';
import { fetchApi } from '../../../callApi';
import { getNaviInfo } from '../../../constants/api/navi';
import { showMessageList, addBanner, editBanner, delBanner } from '../../../constants/api/banner';
import { messageList } from '../../../constants/api/model';
import { notification } from 'antd';
import UpLoader from '../../uploader/UpLoader';
const FileUpLoader = UpLoader;
const { Option, OptGroup } = Select;
const { Panel } = Collapse;

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

class BannerForm extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            isNaviLoaded: false,
            //加载栏目名称
            isSaved: false,
            //表单是否提交
            navData: null,
            //栏目名称
            isNavChanged: false,
            //选择栏目
            titleList: 0,
            //栏目下的文章列表id
            isTitleListLoaded: false,
            //栏目下的文章列表加载状态
            submitId: null,
        }
    }

    componentDidMount = () => {
        // console.log(fetchApi(apiPath, request))
        if (!this.state.isNaviLoaded) {
            const { apiPath, request } = getNaviInfo();
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
        if (this.state.isNaviLoaded) {
            this.id = this.props.data.length;
        }
        if (this.state.isNavChanged && this.state.isNavChanged) {
            const { apiPath, request } = showMessageList(this.state.titleList);
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    // console.log(data.data)
                    this.setState({
                        isNavChanged: false,
                        isTitleListLoaded: true,
                        titleList: data.data,
                    })
                });
        }
    }

    noNaviNotification() {
        message.error("栏目列表获取失败");
    }

    imgList = () => {
        let list = [];
        if (this.props.isLoaded) {
            for (let i = 0; i < this.props.data.length; i++) {
                if (this.props.data[i].picture > 0) {
                    list.push({
                        "url": "https://xuegong.twtstudio.com/" + this.props.data[i].picture,
                    });
                }
            }
        }
        return list;
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


    //获取栏目对应的文章列表并展示
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

    //用nav_id匹配对应的栏目名称或
    getTitle = (index, opt) => {
        let nav = this.props.data[index].nav_id;//nav_id
        let pas = this.props.data[index].mes_id;
        if (opt === 1) {
            for (let i = 0; i < this.state.navData.length; i++) {
                for (let j = 0; j < this.state.navData[i].children.length; j++) {
                    if (this.state.navData[i].children[j].id.toString() === pas) {
                        return this.state.navData[i].children[j].title;
                    }
                }
            }
        } else if (opt === 2) {

        }
    }

    formIt = (data, len) => {
        const { getFieldValue } = this.props.form;
        const keys = getFieldValue('keys');
        return data.map((m, i) => {
            sessionStorage.removeItem(`Banner${i}picpath`);
            sessionStorage.removeItem(`Banner${i}iconpath`);
            return this.getBanner(m, data, len, i);
        })
        // forms.push(this.getBanner(data, len, i));
    }


    delItem = (i) => {
        const { apiPath, request } = delBanner(i);
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(data => {
                message.success("删除成功");
            })
    }

    //由于表单设计缺陷，此处过于暴力，待优化
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let value = Object.keys(values);
            let len = value.length / 3;
            for (let i = 0; i < len; i++) {
                let keyName = `passage${i}`
                for (let j in values) {
                    if (j === keyName && values[j]) {
                        //看看是哪个修改过了
                        console.log('I GET IT ! ' + i);
                        // const { apiPath, request }
                    }
                }
            }
            // console.log(len);
            console.log(values);
        }
        )
    };

    getBanner = (m, data, maxlen, index) => {
        // console.log(this.getTitle(index, 1));
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
        const { imageUrl } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Card className="banner-card">
                    <Form id={"form" + index} {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="标题">
                            {getFieldDecorator(`Banner${index}`, {
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
                                initialValue: data[index].title,
                            })(<Input placeholder="20字以内" hideRequiredMark="false" allowClear={`true`} style={{ width: '60%' }} />)
                            }
                        </Form.Item>

                        <Form.Item label="跳转文章选择">
                            {getFieldDecorator(`title${index}`, {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择一个栏目',
                                    },
                                ],
                                initialValue: this.getTitle(index, 1),
                            })(
                                <Select id={index + '-1'} onChange={this.handleColumnSelectChange} key={index + '-1'} required="true" style={{ width: '20%' }} placeholder="请选择一个栏目">
                                    {/* <Option value="-1">请选择</Option> */}
                                    {this.state.isNaviLoaded ? this.listColumn(this.state.navData) : null}
                                </Select>
                            )}
                            {getFieldDecorator(`passage${index}`, {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择一篇文章',
                                    },
                                ],
                            })(
                                <Select id={index + '-2'} key={index + '-2'} style={{ width: '40%' }} placeholder="请选择一篇文章">
                                    {/* <Option value="-1">请选择</Option> */}
                                    {this.state.isListLoaded ? this.state.mesList : null}
                                </Select>
                            )
                            }
                        </Form.Item>

                        {/* 图片上传 */}
                        {/* -------------------------------------------------------------------------------- */}
                        <FileUpLoader type="image" bindTo={"Banner" + index} necessary={true} />
                        {/* -------------------------------------------------------------------------------- */}
                        {/* 图片上传 */}
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button key={index} type="danger" htmlType="button" onClick={this.delItem.bind(this, data[index].id)}><Icon type="delete" />删除</Button>
                            <Button key={index} type="default" loading={this.state.isSaved} htmlType="submit"><Icon type="save" />保存修改</Button>
                        </Col>
                    </Form>
                </Card>
            </div >
        )
    }

    render() {
        // console.log("iconpath:" + iconPath);
        let data = this.props.data;
        // console.log(data);
        return (
            <div>
                {this.props.isLoaded && this.state.isNaviLoaded ? this.formIt(data, data.length) : <Skeleton active />}
            </div>
        )
    }
}

const ShowBanner = Form.create({ name: "bannerEdit" })(BannerForm);
export default ShowBanner;