import React, { Component } from 'react';
import { Form } from 'antd';
import BindList from './BindList';


// const formItemLayout = {
//     labelCol: {
//         xs: { span: 24 },
//         sm: { span: 4 },
//     },
//     wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 20 },
//     },
// };

class ModelMan extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    switchModel = (type) => {
        return (
            <div>
                <BindList type={type} bindInfo={this.props.bindInfo} isReady={this.props.isReady} />
            </div>
        )
    }

    render() {
        // console.log(this.props.bindInfo)
        const { bindInfo, type } = this.props;
        return (
            <div>
                {this.switchModel(type)}
            </div>
        )
    }
}

const ModelManager = Form.create()(ModelMan);

export default ModelManager;