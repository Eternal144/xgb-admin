//包含图片上传及裁剪
import React, { Component } from 'react';
import Cropper from 'react-cropper';
import PropTypes from 'prop-types';
import 'cropperjs/dist/cropper.css';
import { uploadPic } from '../../constants/api/upload';
import { fetchApi } from '../../callApi';
import '../../style/cropper.less';
import { notification } from 'antd';

const MAX_FILE_SIZE = 8 * 1024 * 1024;

class CropperModal extends Component {
    static propTypes = {
        uploadedImageFile: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            src: null,
        }
    }

    componentDidMount() {
        const fileReader = new FileReader()
        fileReader.onload = e => {
            const dataURL = e.target.result
            this.setState({ src: dataURL })
        }

        fileReader.readAsDataURL(this.props.uploadedImageFile)
    }

    handleSubmit = () => {
        if (!this.state.submitting) {
            let filename = this.props.uploadedImageFile.name;
            console.log('上传图片中');
            this.cropper.getCroppedCanvas().toBolb(
                async bolb => {
                    const { apiPath, requset } = uploadPic(bolb);
                    this.setState({ submitting: true });
                    fetchApi(apiPath, requset)
                        .then(res => res.json())
                        .then(
                            data => {
                                this.props.onUploadedFile(data.data.path);
                                this.setState({ submitting: false });
                                this.props.onClose();
                            }
                        )
                }
            )
        }
    }

    render() {
        let wid = 1, hei = 1;
        if (this.props.w) wid = this.props.w;
        if (this.props.h) hei = this.props.h;
        return (
            <div className="cropper-model">
                <div className="modal-panel">
                    <div className="cropper-container-container">
                        <div className="cropper-container">
                            <Cropper
                                src={this.state.src}
                                className="cropper"
                                ref={cropper => (this.cropper = cropper)}
                                viewMode={1}
                                zoomable={false}
                                aspectRatio={wid / hei}
                                guides={false}
                                preview=".cropper-preview"
                            />
                        </div>
                        <div className="preview-container">
                            <div className="cropper-preview" />
                        </div>
                    </div>
                    <div className="button-row">
                        <div className="submit-button" onClick={this.handleSubmit}>提交</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default class ImgCropper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalFile: null,
            resultImgUrl: null,
            modalVisible: false,
        }
    }

    handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            if (file.size <= MAX_FILE_SIZE) {
                this.setState({
                    modalFile: file,
                })
            } else {
                console.log('文件过大')
            }
        }
    }

    handleGetResultImgUrl = key => bolb => {
        const str = URL.createObjectURL(bolb)
        this.setState({
            [key]: str,
        })
    }

    render() {
        const {
            modalFile,
            resultImgUrl,
            modalVisible
        } = this.state;
        return (
            <div className="img-cropper">
                <label className="upload-input">
                    <span>上传图片</span>
                    <input type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        className="upload-button"
                        onChange={this.handleFileChange}
                    />
                </label>
                <div className="img-container">
                    <img
                        className="img-preview"
                        src={resultImgUrl}
                        alt="resultUrl"
                    />
                </div>
                <CropperModal
                    uploadedImageFile={modalFile}
                    onClose={() => {
                        this.setState({ classModalVisible: false })
                    }}
                    onSubmit={this.handleGetResultImgUrl('classResultImgUrl')}
                    w={this.props.w}
                    h={this.props.h}
                />
            </div>
        )
    }
}