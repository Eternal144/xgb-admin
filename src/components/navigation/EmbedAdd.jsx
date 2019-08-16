// import React from 'react';
// import { Form, Input, Icon, Button,Card} from 'antd';
// import NaviData from '../../test/Navi';
// //当个容器吧
// let id = 0;
// //在这里渲染已有数据，并且可以添加和修改。有一级和二级
// class EmbedAdd extends React.Component {

//   add = () => {
//     const { form } = this.props;
//     // can use data-binding to get
//     const keys = form.getFieldValue('keys');
//     const nextKeys = keys.concat(id++);
//     // can use data-binding to set
//     // important! notify form to detect changes
//     form.setFieldsValue({
//       keys: nextKeys,
//     });
//   };

// //   handleSubmit = e => {
// //     e.preventDefault();
// //     this.props.form.validateFields((err, values) => {
// //       if (!err) {
// //         const { keys, names } = values;
// //         console.log('Received values of form: ', values);
// //         console.log('Merged values:', keys.map(key => names[key]));
// //       }
// //     });
// //   };

//   render() {
//     return (
//         //根据接口获取以后的
//         <div>
//           <Form onSubmit={this.handleSubmit}>
                    
//           </Form>
//       </div>
//     );
//   }
// }

// const EmbedAddForm = Form.create({ name: 'register' })(EmbedAdd);
// export default EmbedAddForm;