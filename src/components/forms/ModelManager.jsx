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
        // if (type === "A") {
        //     return (
        //         <div>
        //             <BindList fromModel={"Model" + type} />
        //         </div>
        //     );
        // } else if (type === "B") {
        //     return (
        //         <div>
        //             <BindList fromModel={"Model" + type} />
        //         </div>
        //     );
        // } else if (type === "C") {
        //     return (
        //         <div>
        //             <BindList fromModel={"Model" + type} />
        //         </div>
        //     );
        // } else if (type === "D") {
        //     return (
        //         <div>
        //             <BindList fromModel={"Model" + type} />
        //         </div>
        //     );
        // } else if (type === "E") {
        //     return (
        //         <div>
        //             <BindList fromModel={"Model" + type} />
        //         </div>
        //     );
        // } else if (type === "F") {
        //     return (
        //         <div>
        //             <BindList fromModel={"Model" + type} />
        //         </div>
        //     );
        // } else if (type === "G") {
        //     return (
        //         <div>
        //             <BindList fromModel={"Model" + type} />
        //         </div>
        //     );
        // } else if (type === "H") {
        //     return (
        //         <div>
        //             <BindList fromModel={"Model" + type} />
        //         </div>
        //     );
        // }
        return (
            <div>
                <BindList fromModel={"Model" + type} bindInfo={this.props.bindInfo} isReady={this.props.isReady} />
            </div>
        )
    }

    render() {
        return (
            this.switchModel(this.props.modelType)
        )
    }
}

const ModelManager = Form.create()(ModelMan);

export default ModelManager;