import React, { Component } from 'react';
import { Form } from 'antd';
import BindList from './BindList';
import { lowwerModelPreview } from "../../constants/api/model";
import { fetchApi } from '../../callApi';


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
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: null
    //     }
    // }
    // componentDidMount = () => {
    //     const { type } = this.props;
    //     let { apiPath, request } = lowwerModelPreview(type);
    //     fetchApi(apiPath, request)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data.error_code === 0) {
    //                 this.setState({
    //                     data: data.data
    //                 })
    //             }
    //         })
    // }

    render() {
        // const { data } = this.state
        // const { type, navData } = this.props
        return (
            <div>
                {/* {data ? <BindList type={type} navData={navData} bindInfo={this.state.data} isReady={this.props.isReady} /> : null} */}
            </div>
        )
    }
}

const ModelManager = Form.create()(ModelMan);

export default ModelManager;