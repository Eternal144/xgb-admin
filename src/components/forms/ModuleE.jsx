// //用来标识模块E
// import React, { Component } from 'react';
// import Uploader from '../uploader/UpLoader';
// import { Form, Select, Button, Icon, Col, Popconfirm, Input, Skeleton, message, Row } from 'antd';

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
// const formItemLayoutWithOutLabel = {
//     wrapperCol: {
//         xs: { span: 24, offset: 0 },
//         sm: { span: 20, offset: 4 },
//     },
// };
// const { Option, OptGroup } = Select;
// let id = 0;

// class ModuleOfE extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             navData: null,
//         }
//     }

//     removeE = (k) => {
//         const { form } = this.props;
//         const keys = form.getFieldValue('keys');
//         if (keys.length === 1) {
//             return;
//         }

//         form.setFieldsValue({
//             keys: keys.filter(key => key !== k),
//         });
//     };

//     addE = () => {
//         const { form } = this.props;
//         const keys = form.getFieldValue('keys');
//         const nextKeys = keys.concat(id++);
//         form.setFieldsValue({
//             keys: nextKeys,
//         });
//     };
//     listColumn(data) {
//         let columns = [];
//         // console.log(data[0].children[0].title);
//         if (data.length > 0) {
//             for (let i = 0; i < data.length; i++) {
//                 let opts = [];
//                 for (let j = 0; j < data[i].children.length; j++) {
//                     opts.push(
//                         <Option key={data[i].children[j].rank + '-' + data[i].children[j].id} value={data[i].children[j].id}>{data[i].children[j].title}</Option>
//                     )
//                 }
//                 columns.push(
//                     <OptGroup label={data[i].title}>{opts}</OptGroup>
//                 )
//             }
//         } else {
//             return this.noNaviNotification();
//         }
//         return columns;
//     }

//     render() {
//         const { getFieldDecorator, getFieldValue } = this.props.form;
//         getFieldDecorator('keys', { initialValue: [] });
//         const keys = getFieldValue('keys');
//         console.log(keys);

//         return (

//         )
//     }
// }

// const ModuleE = Form.create()(ModuleOfE)
// export default ModuleE;