import React from 'react';
import {
    Form,
    Input,
    Icon,
    Select,
    Button,
    Card,
  } from 'antd';
  import LocalizedModal from '../ui/Modals'
  import {CONFIRM_MODIFY} from '../../constants/common'
 
  
const { Option } = Select;
class RegistrationForm extends React.Component {
    componentDidMount = ()=>{
        this.id = this.props.data.children.length;
        console.log(`初始化完成后里面的this.is${this.id}`)
    }
    add = ()=>{
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        console.log(`add里面的this.is${this.id}`)
        const nextKeys = keys.concat(++this.id);
        form.setFieldsValue({
        keys: nextKeys,
        });
    };
      
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    };

    handleConfirm = ()=>{
        
    }
    getOptions = (length)=>{
        let OptionArr = [];
        for(let i = 0; i < length; i++){
            OptionArr.push(<Option value={i+1}>{i+1}</Option>)
        }
        return OptionArr;
    }
      
    getNavigation = (label,data,length,key)=>{
        const { getFieldDecorator } = this.props.form;
        return (
        <div>
            <Form.Item label={label}>
                {getFieldDecorator(`${key.title}`, {
                    rules: [
                        {
                            max:10,
                            message:'导航栏名称过长',
                        },
                        {
                            required: true,
                            message: '请输入导航标题!',
                        },
                    ],
                    initialValue:data.title,
                })(<Input placeholder="10字以内" style={{ width: '60%' }}/>)}
            </Form.Item>
  
            <Form.Item label="展示位置">
                {getFieldDecorator(`${key.rank}`, {
                    rules: [
                    {
                        required: true,
                        message: '选择放置位置',
                    },
                    ],
                    initialValue:data.rank,
                })(<Select style={{ width: '80px' }}>
                {this.getOptions(length)}
            </Select>)}
            </Form.Item>
        </div>
            )
      }
      //子导航们
    getSubordinates = (data)=>{
        const { getFieldValue } = this.props.form;
        const keys = getFieldValue('keys');
        const len = keys.length > 0 ? keys[keys.length-1] : 0;
        const { children } = data;
        let length = Math.max(len,children.length);
        return children.map((x,i)=>{
            let label = `二级导航栏${data.rank}-${i+1}`;
            let key={
                title:`${i+1}title`,
                rank:`${i+1}rank`
            };
            return this.getNavigation(label,x,length,key);
        })
    }
    getSuperior = (data,length)=>{
        let key={
            title:'title',
            rank:'rank'
        }
        let label = `一级导航栏${data.rank}`
        return this.getNavigation(label,data,length,key);
    }
    //在这里用redux改变状态。调用确认框。显示她检测到点击后这个返回这个点击值给这个页面并且submit。
    render() {
      const { getFieldDecorator,getFieldValue } = this.props.form;
      const data = this.props.data;
      const length = this.props.length;
    //   let id = 0;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };

    getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        let childData={
            rank:null,
            title:null
        };
        let len = keys[keys.length-1];
        //居然累加了？？？
        // console.log(keys);
        const formItems = keys.map((k, index) => {
             let label = `二级导航栏${data.rank}-${k}`;
             let key={
                 title:`${k}title`,
                 rank:`${k}rank`
             }
            return this.getNavigation(label,childData,len,key)
        }
    );
    return (
        <div style={{ padding:'30px' }}>
            <Card >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    {this.getSuperior(data,length)}
                    <Form.Item label='类型分类'>
                    {getFieldDecorator('contentType', {
                        rules: [
                        {
                            required: true,
                            message: '选择导航类型',
                        },
                        ],
                        initialValue:data.contentType,
                    })(<Select style={{ width: '120px' }}>
                        <Option value="1">活动预告类</Option>
                        <Option value="2">新闻公告类</Option>
                    </Select>)}
                    </Form.Item>

                    <Form.Item label='排版分类'>
                    {getFieldDecorator('listType', {
                        rules: [
                        {
                            required: true,
                            message: '选择导航类型',
                        },
                        ],
                        initialValue:data.listType,
                    })(<Select style={{ width: '120px' }}>
                        <Option value="1">文字类</Option>
                        <Option value="2">图文类</Option>
                    </Select>)} 
                    
                    </Form.Item>
                    {data.children.length > 0 ? this.getSubordinates(data):null}
                    <div>
                        {formItems}
                        <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus" /> Add model
                        </Button>
                        </Form.Item>
                    </div>
                    <Form.Item style={{textAlign:'right'}}>
                        {/* <Button type="primary" htmlType="submit">
                        确定
                        </Button> */}
                        <LocalizedModal onConfirm={this.handleConfirm} content={CONFIRM_MODIFY} />
                    </Form.Item>
            </Form>
        </Card>
    </div>
    );
}
}
  
const NaviCard = Form.create({ name: 'manage' })(RegistrationForm);
export default NaviCard;