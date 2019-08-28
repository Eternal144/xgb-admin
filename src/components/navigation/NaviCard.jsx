import React from 'react';
import {
    Form,
    Input,
    Icon,
    Select,
    Button,
    Card,
    Col,
    Row
  } from 'antd';
  import LocalizedModal from '../ui/Modals'
  import {CONFIRM_MODIFY} from '../../constants/common'
  import {fetchApi} from '../../callApi'
  import {addNav} from '../../constants/api/navi'
 
  
const { Option } = Select;
class RegistrationForm extends React.Component {
    componentDidMount = ()=>{
        this.id = this.props.data.children.length;
    }
    add = ()=>{
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
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
        console.log(label.charAt(0));
        let ch = label.charAt(0);
        const Superior =  //不带阴影。
            <div>
                <Form.Item label={label} >
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
                })(<Input placeholder="10字以内" style={{ width: '40%' }}/>)}
                <Icon type="close-circle" className="iconHover" style={{marginLeft:"20px"}} />
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
        const Subordinate = 
        <Col  className={"shadow"} >
            {Superior}
        </Col>
        return (
        <div >
            {ch === "一"  ?  Superior : Subordinate}
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
    
    render() {
      const { getFieldDecorator,getFieldValue } = this.props.form;
      const data = this.props.data;
      const length = this.props.length;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8},
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16},
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 18},
        },
      };

    getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        let childData={
            rank:null,
            title:null
        };
        let len = keys[keys.length-1];
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
        <div style={{paddingTop:"20px"}}>
            <Card style={{padding:"0 20%"}}>
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
                    {formItems}
                    <div style={{marginTop:"20px"}}>
                        <Col span={8} offset={8} >
                            <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                                <Icon type="plus" /> Add model
                            </Button>
                        </Col>
                        <Col span={8} style={{textAlign:'right'}}>
                        <LocalizedModal onConfirm={this.handleConfirm} content={CONFIRM_MODIFY} />
                        </Col>
                    </div>
            </Form>
        </Card>
    </div>
    );
}
}
  
const NaviCard = Form.create({ name: 'manage' })(RegistrationForm);
export default NaviCard;