import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
import { Card, Input, Button, Form, Select, DatePicker, TimePicker, Upload, Icon, message, Row, Col } from 'antd'
import BreadcrumbCustom from '../BreadcrumbCustom';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import FileUpLoader from '../uploader/UpLoader';
import { fetchApi } from '../../callApi';
import { getCategory } from '../../constants/api/category';
import { postNewsMessage, editNewsMessage, editMessage } from '../../constants/api/edit';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import Table from 'braft-extensions/dist/table';

const { Option, OptGroup } = Select;
const { MonthPicker } = DatePicker;

let fList = [], pList = [];

class EditorDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: null,
            loading: false,
            isNaviLoaded: false,
            catData: null,
            imgpath: null,
            filepath: null,
            //初始化文章信息
            initialColumn: null,
            initialTitle: null,
            initialJournalist: null,
            initialFile: null,
            initialImage: null,
            editorState: BraftEditor.createEditorState(''),
            flist: null,
            imglist: null,
            iconlist: null,
        }
    }

    noNaviNotification() {
        message.error("栏目列表获取失败");
    }

    myUploadFn = (param) => {
        //富文本编辑器媒体库文件的上传
        const serverURL = 'https://xuegong.twt.edu.cn/api/uploadPic';
        const xhr = new XMLHttpRequest;
        const fd = new FormData();
        const successFn = (res) => {
            var json = JSON.parse(xhr.responseText)
            param.success({
                url: 'https://xuegong.twt.edu.cn/' + json.data.path,
                meta: {
                    //相关配置
                }
            })
        }
        const progressFn = (event) => {
            //上传进度
            param.progress(event.loaded / event.total * 100)
        }
        const errorFn = (res) => {
            //上传出错
            param.error({
                mes: '上传失败',
            })
        }

        xhr.upload.addEventListener("progress", progressFn, false)
        xhr.addEventListener("load", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)
        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        xhr.send(fd)
    }

    async componentDidMount() {
        if (!this.state.isNaviLoaded) {
            const { apiPath, request } = getCategory();
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    // console.log(data.data)
                    this.setState({
                        catData: data.data,
                        isNaviLoaded: true,
                    })
                });
            if (this.props.location.state) {
                const { apiPath, request } = editMessage(this.props.location.state.navID, this.props.location.state.articleID);
                fetchApi(apiPath, request)
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        this.setState({
                            initialId: data.data.message.id,
                            initialColumn: data.data.message.nav_id,
                            initialTitle: data.data.message.title,
                            initialJournalist: data.data.message.remark,
                            initialFile: data.data.message.files,
                            initialImage: data.data.message.picture,
                        });
                        setTimeout(() => {
                            this.props.form.setFieldsValue({
                                content: BraftEditor.createEditorState(data.data.message.content)
                            })
                        }, 300)
                    });
            }
        }
    }

    submitContent = async () => {
        const htmlContent = this.state.editorState.toHTML()
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    listColumn(data) {
        let columns = [];
        if (data.length > 0) {
            let opts = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].listType === "2")
                    opts.push(
                        <Option value={data[i].id}>{data[i].title}</Option>
                    )
            }
            columns.push(
                <OptGroup>{opts}</OptGroup>
            )
        } else {
            return this.noNaviNotification();
        }
        return columns;
    }

    buildPreviewHtml() {
        return `
          <!Doctype html>
          <html>
            <head>
              <title>文章预览</title>
              <style>
                html,body{
                  height: 100%;
                  margin: 0;
                  padding: 0;
                  overflow: auto;
                  background-color: #f1f2f3;
                }
                .container{
                  box-sizing: border-box;
                  width: 1000px;
                  max-width: 100%;
                  min-height: 100%;
                  margin: 0 auto;
                  padding: 30px 20px;
                  overflow: hidden;
                  background-color: #fff;
                  border-right: solid 1px #eee;
                  border-left: solid 1px #eee;
                }
                .container img,
                .container audio,
                .container video{
                  max-width: 100%;
                  height: auto;
                }
                .container p{
                  white-space: pre-wrap;
                  min-height: 1em;
                }
                .container pre{
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-radius: 5px;
                }
                .container blockquote{
                  margin: 0;
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-left: 3px solid #d1d1d1;
                }
              </style>
            </head>
            <body>
              <div class="container">${this.state.editorState.toHTML()}</div>
            </body>
          </html>
        `
    }

    preview = () => {
        if (window.previewWindow) {
            window.previewWindow.close()
        }
        window.previewWindow = window.open()
        window.previewWindow.document.write(this.buildPreviewHtml())
        window.previewWindow.document.close()
    }

    handleSubmit = e => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values)
                // console.log(this.state.editorState.toHTML())
                let imglink = null;
                let appendix = null;
                let icon = null;
                if (this.state.initialImage) {
                    imglink = this.state.initialImage[0].url;
                }

                //这里处理一下link
                if (this.state.imglist) {

                    if (this.state.imglist.length > 3) {
                        imglink = this.state.imglist[1];
                        for (let index = 2; index < this.state.imglist.length; index += 2) {
                            imglink += '@';
                            imglink += this.state.imglist[index];
                        }
                    } else {
                        imglink = this.state.imglist[1];
                    }
                }

                if (this.state.imglist) {
                    if (this.state.imglist.length > 3) {
                        icon = this.state.imglist[1];
                        for (let index = 3; index < this.state.imglist.length; index += 2) {
                            icon += '@';
                            icon += this.state.imglist[index];
                        }
                    } else {
                        icon = this.state.imglist[1];
                    }
                }
                if (this.state.flist) {
                    if (this.state.flist.length > 2) {
                        appendix = this.state.flist[1];
                        for (let index = 2; index < this.state.flist.length; index++) {
                            appendix += '@';
                            appendix += this.state.flist[index];
                        }
                    } else {
                        appendix = this.state.flist[1];
                    }
                }
                // console.log(imglink);
                // console.log(appendix);
                if (this.props.location.state) {
                    //保存编辑文章
                    // console.log("保存修改");
                    const { apiPath, request } = editNewsMessage(this.state.initialId, values.section, values.title, imglink, icon, this.state.editorState.toHTML(), appendix, values.journalist);
                    fetchApi(apiPath, request)
                        .then(res => res.json())
                        .then(data => {
                            if (data.error_code === 0) {
                                message.success("文章发表成功");
                            } else {
                                message.error("文章发布失败，请检查网络");
                            }
                        });
                    // console.log('Received values of form: ', values);
                } else {
                    //发布新文章
                    // console.log("发布新闻");
                    const { apiPath, request } = postNewsMessage(values.section, values.title, imglink, icon, this.state.editorState.toHTML(), appendix, values.journalist);
                    fetchApi(apiPath, request)
                        .then(res => res.json())
                        .then(data => {
                            if (data.error_code === 0) {
                                message.success("文章发表成功");
                            } else {
                                message.error("文章发布失败，请检查网络");
                            }
                        });
                    // console.log('Received values of form: ', values);
                }
            }
        });
    }

    handlegetFile = (src) => {
        //在此处接收uploader返回的链接列表，并更新state
        // console.log("接收到后台返回的数据了。")
        // console.log(src);
        this.setState({
            flist: src,
        })
    }

    handlegetImage = (src) => {
        //在此处接收uploader返回的链接列表，并更新state
        // console.log("接收到后台返回的数据了。")
        // console.log(src);
        this.setState({
            imglist: src,
        })
    }

    render() {
        let appendixList = sessionStorage.getItem('filepath');
        // console.log(appendixList);
        // console.log(this.props.location.state);
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const PlaceDefault = "50字以内（若缺省则取正文前50字）";
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4, offset: 4 }
            },
            wapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        const { imageUrl } = this.state;
        // 定义富文本编辑器功能
        const editorControls = ['undo', 'redo', 'separator',
            'font-size', 'line-height', 'letter-spacing', 'separator',
            'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
            'superscript', 'subscript', 'remove-styles', 'separator', 'text-indent', 'text-align', 'separator',
            'headings', 'list-ul', 'list-ol', 'separator', 'separator', 'hr', 'separator', 'media', 'separator', 'clear', 'fullscreen'];
        const tableOption = {
            defaultColumns: 3, // 默认列数
            defaultRows: 3, // 默认行数
            withDropdown: false, // 插入表格前是否弹出下拉菜单
            exportAttrString: 'table', // 指定输出HTML时附加到table标签上的属性字符串
        };
        BraftEditor.use(Table(tableOption));
        const extendControls = [
            // {
            //     key: 'add-table',
            //     type: 'button',
            //     text: '表格',
            // },
            {
                key: 'custom-button',
                type: 'button',
                text: '预览',
                onClick: this.preview,
            }
        ];

        return (
            <div className="my-component">
                <BreadcrumbCustom first="发帖编辑" />
                <Card>
                    <Form onSubmit={this.handleSubmit} {...formItemLayout}  >
                        <Form.Item>
                            <Col span={20} style={{ textAlign: 'right' }}>
                                <Button size="default" type="default" htmlType="submit" >保存</Button>
                            </Col>
                        </Form.Item>
                        <Form.Item label="所属栏目" >
                            {getFieldDecorator('section', {
                                rules: [{
                                    required: true,
                                    message: "请选择栏目"
                                }],
                                initialValue: this.state.initialColumn,
                            })(
                                <Select key="editNewsCat" required="true" style={{ width: '20%' }} placeholder="请选择一个栏目">
                                    {this.state.isNaviLoaded ? this.listColumn(this.state.catData) : null}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="标题名称">
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: "请输入标题",
                                },
                                {
                                    max: 35,
                                    message: "标题名称过长,请酌情删减",
                                }
                                ],
                                initialValue: this.state.initialTitle,
                            })(<Input placeholder="35字以内" style={{ width: "40%" }} />)
                            }
                        </Form.Item>

                        <Form.Item label="记者" >
                            {getFieldDecorator('journalist', {
                                rules: [{
                                    required: true,
                                }, {
                                    max: 20,
                                    message: "文本过长,请酌情删减",
                                }],
                                initialValue: this.state.initialJournalist,
                            })(<Input placeholder={"不超过20字"} style={{ width: "40%" }} />)}
                        </Form.Item>
                        {/* 附件上传 */}
                        <FileUpLoader type="file" bindTo={"MessageEdit"} numberLimit={5} getLink={this.handlegetFile} initialData={this.state.initialFile} />
                        {/* 图片上传 */}
                        <FileUpLoader type="image" bindTo={"MessageCover"} numberLimit={1} getLink={this.handlegetImage} initialData={this.state.initialImage} />
                        <Row>
                            <Col span={16} offset={4}>
                                <Form.Item>
                                    {getFieldDecorator('content', {
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true,
                                            validator: (_, value, callback) => {
                                                if (value.isEmpty()) {
                                                    callback('请输入一个正文');
                                                } else {
                                                    callback();
                                                }
                                            }
                                        }],
                                    })(
                                        <BraftEditor media={{ uploadFn: this.myUploadFn }} value={this.state.editorState} className="my-editor" controls={editorControls} onChange={this.handleEditorChange} extendControls={extendControls} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Col span={20} style={{ textAlign: 'right' }}>
                            <Button size="default" type="default" htmlType="submit" >保存</Button>
                        </Col>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(EditorDemo)