import React from 'react';
import { Form, Input, Icon, Button,Card} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import NaviAdd from './NaviAdd';
import NaviData from '../../test/Navi';
import NaviCardForm from './NaviCard';
//当个容器吧

let data = NaviData.data;
//在这里渲染已有数据，并且可以添加和修改
class NaviManage extends React.Component {
    handleAddItem  = ()=>{
        console.log("耶耶耶");
        // return <NaviCardForm data={{children:null}} length={0} />
        // return <h1></h1>
    }
  render() {
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
    return (
        //根据接口获取以后的
        <div>
            <BreadcrumbCustom first="导航栏管理"/>
                {data.length > 0 ? data.map((x,i)=>{
                  return <NaviCardForm data={x} length={data.length} />
                }) : null}
            <Card>
                {/* 在添加的时候直接修改state，增加一个状态。那个数据直接从fetch中拿取。 */}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.handleAddItem} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加导航
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
       </div>
    );
  }
}

export default NaviManage;