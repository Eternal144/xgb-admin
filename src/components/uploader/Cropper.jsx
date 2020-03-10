//包含图片上传及裁剪
import React, { Component } from 'react';
import CropperModal from './Crop';
import '../../style/cropper.scss';
import 'cropperjs/dist/cropper.css';



const MAX_FILE_SIZE = 8 * 1024 * 1024;

export default class ImgCropper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            modalFile: null,
            resultImgUrl: null,
        }
    }

    handleFileChange = e => {
        const file = e.target.files[0]
        if (file) {
            if (file.size <= MAX_FILE_SIZE) {
                this.setState(
                    {
                        modalFile: file // 先把上传的文件暂存在state中
                    },
                    () => {
                        this.setState({
                            modalVisible: true // 然后弹出modal
                        })
                    }
                )
            } else {
                console.log('文件过大')
            }
        }
    }

    handleGetresultImgUrl = (src) => {
        console.log("aaaa")
        console.log(src)
        // const str = URL.createObjectURL(blob);
        const { getLink } = this.props;
        getLink(src);
        // this.props.getLink()
        // this.setState({
        //     [key]: str
        // })
    }

    render() {
        const {
            modalVisible,
            modalFile,
            resultImgUrl,
        } = this.state
        return (
            <div className="cropper">
                <div className="half-area">
                    <label className="upload-input-label">
                        <span>上传图片</span>
                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            className="base-upload-input"
                            onChange={this.handleFileChange}
                        />
                    </label>
                    {/* <div className="img-container">
                        {resultImgUrl && (
                            <img
                                className="img"
                                src={resultImgUrl}
                                alt="resultImgUrl"
                            />
                        )}
                    </div> */}
                </div>
                {modalVisible && (
                    <CropperModal
                        wid={this.props.w}
                        hei={this.props.h}
                        uploadedImageFile={modalFile}
                        onClose={() => {
                            this.setState({ modalVisible: false })
                        }}
                        getLink={obj => this.handleGetresultImgUrl(obj)}
                    />
                )}
            </div>
        )
    }
}
