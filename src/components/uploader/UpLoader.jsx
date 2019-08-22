import React, { Component } from 'react';
import { Form, Upload, Button, Icon } from 'antd';

let path = null;

const reqUrl = (type) => {
    if (type === "image") {
        return "https://xuegong.twtstudio.com/api/uploadPic";
    } else if (type === "file") {
        return "https://xuegong.twtstudio.com/api/uploadApp";
    }
}

const reqSettings = {
    action: reqUrl,
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },


}

class UpLoaderModel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    switchLabel = (type) => {
        if (type === "image") {
            return "上传图片";
        } else if (type === "file") {
            return "上传附件";
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form.Item label={this.switchLabel(this.props.type)} >
                {this.props.type === "image" ?
                    <div>
                        {getFieldDecorator(`image${this.props.bindTo}`, {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择一个图片',
                                },
                            ],
                        })(
                            <Upload {...reqSettings}>

                            </Upload>
                        )}
                    </div>
                    : null}
                {this.props.type === "file" ?
                    <div>
                        {getFieldDecorator(`file${this.props.bindTo}`, {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择一个文件',
                                },
                            ],
                        })(
                            <Upload {...reqSettings}>

                            </Upload>
                        )}
                    </div>
                    : null}
            </Form.Item>
        )
    }
}


const UpLoader = Form.create({ name: "uploadModel" })(UpLoaderModel);
export default UpLoader;
export const FilePath = () => {
    return (path);
};