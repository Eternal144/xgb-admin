import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
import {Card,Input,Button,Form, Select,DatePicker,TimePicker,Upload,Icon,message} from 'antd'
import BreadcrumbCustom from '../BreadcrumbCustom';
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select;
const { MonthPicker } = DatePicker;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
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
class EditorDemo extends React.Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null),
        loading:false
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
    async componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        // const htmlContent = await fetchEditorContent()
        // // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        // this.setState({
        //     editorState: BraftEditor.createEditorState(htmlContent)
        // })
    }

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        //const result = await saveEditorContent(htmlContent)
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    render () {
        const { editorState } = this.state
        const { getFieldDecorator,getFieldValue } = this.props.form
        const PlaceDefault = "50字以内（若缺省则取正文前50字）"
        const formItemLayout = {
            labelCol:{
                xs:{span:24},
                sm:{span:4,offset:4}
            },
            wapperCol:{
                xs:{span:24},
                sm:{span:16}
            }
        }
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
          const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const { imageUrl } = this.state;
        return (
            <div className="my-component">
                <BreadcrumbCustom first="发帖编辑" />
                <Card>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item  {...formItemLayout} label="所属栏目" >
                        {getFieldDecorator('section',{
                            rules:[{
                                required: true,
                                message: "请选择栏目"
                            }],
                        })(<Select style={{width:"20%"}} >
                            <Option value="1">啊啊啊</Option>
                            <Option value="2">哦哦哦</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="标题名称">
                        {getFieldDecorator('title',{
                            rules:[{
                                required: true,
                                message: "请输入标题",
                                max: 35
                            }],
                        })(<Input placeholder="35字以内" style={{width:"40%"}} />)
                        }
                    </Form.Item>
                    <Form.Item  {...formItemLayout} label="活动日期">
                        {getFieldDecorator('date',{
                            rules:[{
                                required:true,
                            },],
                        })(<DatePicker style={{width:"40%"}} />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="活动时间">
                        {getFieldDecorator('time',{
                            rules:[{
                                required:true,
                            }]
                        })(<TimePicker style={{width:"40%"}} />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="活动地点" >
                        {getFieldDecorator('place',{
                            rules:[{
                                required:false,
                                max:50
                            }]
                        })(<Input placeholder={PlaceDefault} style={{width:"40%"}} />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="人物介绍">
                        {getFieldDecorator('people',{
                            rules:[{
                                required:false,
                                max:50
                            }]
                        })(<Input placeholder={PlaceDefault} style={{width:"40%"}} />)}
                    </Form.Item>

                    <Form.Item  {...formItemLayout} label="补充说明">
                        {getFieldDecorator('tips',{
                            rules:[{
                                required:false,
                                max:50
                            }]
                        })(<Input placeholder={PlaceDefault} style={{width:"40%"}} />)}
                    </Form.Item> 
                    <Form.Item  {...formItemLayout} label="附件">
                        {getFieldDecorator('attachment',{
                            rules:[{
                                required:false,
                            }]
                        })(<Upload {...props}>
                            <Button type="upload" > Upload</Button>（支持格式为word，excel，pdf，压缩包）
                            </Upload>
                        )}
                    </Form.Item> 
                    <Form.Item {...formItemLayout} label="标题图" >
                        {getFieldDecorator('titlePic',{
                            rules:[{
                                required: false,
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
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                          </Upload>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="正文">
                        {getFieldDecorator('article',{
                            rules:[{
                                required: true,
                            }]
                        })()

                        }
                    </Form.Item> 
                </Form>
                
                </Card>
            </div>
        )

    }

}
export default Form.create()(EditorDemo)