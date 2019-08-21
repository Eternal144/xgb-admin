import React, { Component } from 'react';
import {
    Form,
    Input,
    Icon,
    Select,
    Button,
    Card,
    Upload,
    message,
} from 'antd';
import LocalizedModal from '../../ui/Modals'
import { CONFIRM_MODIFY } from '../../../constants/common'
import './customize.css';
import { Collapse } from 'antd';
import { Skeleton } from 'antd';
import { fetchApi } from '../../../callApi';
import { getNaviInfo } from '../../../constants/api/navi';
import { showMessageList } from '../../../constants/api/banner';
import { notification } from 'antd';

const { Option, OptGroup } = Select;
const { Panel } = Collapse;
const noNaviNotification = () => {
    const args = {
        message: '提示',
        description:
            '当前二级栏目数为0，请先前往"导航栏管理"设置栏目',
        duration: 0,
    };
    notification.open(args);
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class BannerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNaviLoaded: false,
            isSaved: false,
            isEdit: true,
            navData: null,
            isNavChanged: true,
            titleList: null,
            isTitleListLoaded: false,
            loading: false,
        }
    }

    componentDidMount = () => {
        const { apiPath, request } = getNaviInfo();
        // console.log(fetchApi(apiPath, request))
        if (!this.state.isNaviLoaded) {
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    console.log(data.data)
                    this.setState({
                        navData: data.data,
                        isNaviLoaded: true,
                    })
                });
        }
        if (this.state.isNaviLoaded) {
            this.id = this.props.data.length;
        }
        if (this.state.isNavChanged) {
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


    listColumn(data) {
        let columns = [];
        // console.log(data[0].children[0].title);
        if (data[0].children.length > 0) {
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

    listTitleList(nav_id) {

    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    getTitle = (index, opt) => {
        let nav = this.props.data[index].nav_id;
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

    getOptions = (length) => {
        let OptionArr = [];
        for (let i = 0; i < length; i++) {
            OptionArr.push(<Option value={i + 1}>{i + 1}</Option>)
        }
        return OptionArr;
    }

    formIt = (data, len) => {
        const { getFieldValue } = this.props.form;
        const keys = getFieldValue('keys');
        return data.map((m, i) => {
            return this.getBanner(data, len, i);
        })
        // forms.push(this.getBanner(data, len, i));
    }

    handleSelect(value) {
        if (!this.state.isNavChanged) {
            this.setState({
                isNavChanged: true,
                titleList: value,
            })
        }
        console.log(value)
    }
    getBanner = (data, maxlen, index) => {
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
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Card className="banner-card">
                    <Form id={index} {...formItemLayout}>
                        <Form.Item label="标题">
                            {getFieldDecorator(`${data[index].title}`, {
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
                                <Select id={index + '-1'} key={index + '-1'} required="true" style={{ width: '20%' }} placeholder="请选择一个栏目"
                                    onChange={console.log(this.value)}
                                >
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
                                initialValue: this.getTitle(index, 2),
                            })(
                                <Select id={index + '-2'} key={index + '-2'} required="true" style={{ width: '40%' }} placeholder="请选择一篇文章">
                                    {/* <Option value="-1">请选择</Option> */}
                                    {this.state.isTitleListLoaded ? this.listTitleList(this.state.titleList) : null}
                                </Select>)
                            }
                        </Form.Item>
                        {/* 图片上传 */}
                        <Form.Item {...formItemLayout} label="标题图" >
                            {getFieldDecorator(`titlePic${index}`, {
                                rules: [{
                                    required: true,
                                }]
                            })(<Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {this.imageUrl ? <img src={this.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>)
                            }
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }

    render() {
        const { imageUrl } = this.state;
        console.log(this.state.titleList);
        // const { getFieldDecorator } = this.props.form;
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