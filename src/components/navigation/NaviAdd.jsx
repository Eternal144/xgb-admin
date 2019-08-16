


// import React from 'react';
// import { Form, Input, Icon, Button,Card} from 'antd';
// import NaviData from '../../test/Navi';
// //当个容器吧
// let id = 0;
// //在这里渲染已有数据，并且可以添加和修改。有一级和二级
// class NaviAdd extends React.Component {

//   add = () => {
//     if(this.props.addItem){
//         this.props.addItem(true);
//     }
//   };


//   render() {
//     const { getFieldDecorator, getFieldValue } = this.props.form;

//     // getFieldDecorator('keys', { initialValue: [] });
//     // const keys = getFieldValue('keys');
//     // const formItems = keys.map((k, index) => (
//     //   <Form.Item
//     //     {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
//     //     label={index === 0 ? 'Passengers' : ''}
//     //     required={false}
//     //     key={k}
//     //   >
//     //     {getFieldDecorator(`names[${k}]`, {
//     //       validateTrigger: ['onChange', 'onBlur'],
//     //       rules: [
//     //         {
//     //           required: true,
//     //           whitespace: true,
//     //           message: "Please input passenger's name or delete this field.",
//     //         },
//     //       ],
//     //     })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
//     //     {keys.length > 1 ? (
//     //       <Icon
//     //         className="dynamic-delete-button"
//     //         type="minus-circle-o"
//     //         // onClick={() => this.remove(k)}
//     //       />
//     //     ) : null}
//     //   </Form.Item>
//     // ));
//     return (
//         //根据接口获取以后的
//         <div>
            
//       </div>
//     );
//   }
// }

// const NaviCardForm = Form.create({ name: 'dynamic_form_item' })(NaviAdd);
// export default NaviCardForm;