import React from 'react';
import {
    Form,
    Input,
    Icon,
    Select,
    Button,
    Card,
    Col,
    message
  } from 'antd';
  import LocalizedModal from '../ui/Modals'
  import {CONFIRM_MODIFY, CONFIRM_ADD} from '../../constants/common'
  import { fetchApi } from '../../callApi'
  import { addSuperior, addNav, deleteNavi } from '../../constants/api/navi'


const { Option } = Select;

const success = (content) => {
    message.success(content);
};
const error = (content)=>{
    message.error(content);
}
const newChild =(idd,parents_idd,rankk)=> {
    return{

        title: null,
        id: ++idd,
        parents_id: parents_idd,
        rank: ++rankk,
        listType: "1",
        contentType: "1",
        grade: "2",
    }

}
class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }
    componentDidMount = () => {
        this.id = this.props.data.children.length;
    }
    add = () => { //新增一个儿子。
        const { data } = this.state;
        const lastChild = data.children[data.children.length - 1];
        let child;
        if (data.children.length === 0) {
            child = newChild(data.id, data.id, 0);
        } else {
            child = newChild(lastChild.id, lastChild.parents_id, lastChild.rank);
        }

        data.children.push(child);
        this.setState({
            data: data
        })

    };

    //在这里提交添加或者修改。

    handleSubmit = () => {
        const { data } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {

            let formData = new FormData();
            formData.append('title',values.title);
            formData.append('rank',values.rank);
            formData.append('parents_id',0);
            formData.append('grade',1);
        if (!err) {
            //提交
            if(data.confirm === false){
                const { apiPath, request } = addNav(formData);
                fetchApi(apiPath,request)
                .then(res=>res.json())
                .then(data=>{
                    if(data.error_code === 0){
                        success("添加成功")
                    }else{
                        error("添加失败")
                    }
                })
            }else{ //调用修改覆盖的接口。

            }

        }
        });
    };
    //可能是一级可能是二级。随便删吧，我已经限制了id
    handleDelete = ()=>{
        const { data } = this.state;
        const { apiPath, request } = deleteNavi(data.id);
        fetchApi( apiPath, request)
        .then(data=>data.json())
        .then(data=>{
            console.log(data);
        })
    }
    getOptions = (length)=>{
        let OptionArr = [];
        for (let i = 0; i < length; i++) {
            OptionArr.push(<Option value={i + 1}>{i + 1}</Option>)
        }
        return OptionArr;
    }
    //label:标签
    //data:初始化数据
    //length:可选option的长度。
    //key:{
    //     title:  二级标题名称
    //     rank: 排序。
    // }
    getNavigation = (label, data, length, key) => {
        const { getFieldDecorator } = this.props.form;
        const { children } = this.state.data;
        //当为一级标题，且二级标题数量不为0时。为fasle.
        let flag = true;
        if (label[0] === '一' && children.length > 0) {
            flag = false;
        }

        return (
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
                {flag ? <Icon type="close-circle" onClick={this.handleDelete} className="iconHover" style={{marginLeft:"20px"}} /> : null}
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
    //把所有的二级标题渲染出来即可。
    getSubordinates = (data) => {
        const { getFieldDecorator } = this.props.form;
        const { children } = data;
        return children.map((x, i) => {
            let label = `二级导航栏${data.rank}-${i + 1}`;
            let key = {
                title: `${i + 1}title`,
                rank: `${i + 1}rank`
            };
            const Com1 = this.getNavigation(label, x, children.length, key);
            const TypeChoose = <div>
                <Form.Item label='类型分类'>
                    {getFieldDecorator(`contentType-${i + 1}`, {
                        rules: [
                            {
                                required: true,
                                message: '选择导航类型',
                            },
                        ],
                        initialValue: data.contentType,
                    })(<Select style={{ width: '120px' }}>
                        <Option value="1">活动预告类</Option>
                        <Option value="2">新闻公告类</Option>
                    </Select>)}
                </Form.Item>
                <Form.Item label='排版分类'>
                    {getFieldDecorator(`listType-${i + 1}`, {
                        rules: [
                            {
                                required: true,
                                message: '选择导航类型',
                            },
                        ],
                        initialValue: data.listType,
                    })(<Select style={{ width: '120px' }}>
                        <Option value="1">文字类</Option>
                        <Option value="2">图文类</Option>
                    </Select>)}
                </Form.Item>
            </div>
            return (
                <div>
                    <Col className={"shadow"} >
                        {Com1}
                        {TypeChoose}
                    </Col>
                </div>
            )
        })
    }
    getSuperior = (data, length) => {
        let key = {
            title: 'title',
            rank: 'rank'
        }
        let label = `一级导航栏${data.rank}`
        return this.getNavigation(label, data, length, key);
    }
    confirmCont = (notify) => {
        return <LocalizedModal onConfirm={this.handleSubmit} data={notify} />
    }
    //添加新的导航栏。
    modelManage = (title) => {
        if (title === null) {
            return (<div style={{ marginTop: "20px" }}>
                <Col span={8} offset={16} style={{ textAlign: 'right' }}>
                    {this.confirmCont(CONFIRM_ADD)}
                </Col>

            </div>)
        } else {
            return (<div style={{ marginTop: "20px" }}>
                <Col span={8} offset={8} >
                    <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                        <Icon type="plus" /> Add model
                </Button>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                    {this.confirmCont(CONFIRM_MODIFY)}
                </Col>
            </div>)
        }
    }

    render() {
        //   const { getFieldDecorator,getFieldValue } = this.props.form;
        const data = this.props.data;
        const length = this.props.length;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div style={{ paddingTop: "20px" }}>
                <Card style={{ padding: "0 20%" }}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        {this.getSuperior(data, length)}
                        {/* 渲染所有的二级标题 */}
                        {data.children.length > 0 ? this.getSubordinates(data) : null}
                        {this.modelManage(data.title)}
                    </Form>
                </Card>
            </div>
        );
    }
}

const NaviCard = Form.create({ name: 'manage' })(RegistrationForm);
export default NaviCard;