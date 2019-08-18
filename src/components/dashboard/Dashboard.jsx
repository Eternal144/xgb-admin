/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import AccountFrom from '../forms/LoginForm';


class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            toggle:false
        }
    }
    handleToggle = ()=>{
        this.setState({
            toggle:!this.state.toggle
        })
    }
    render() {
        return (
            <div >
                <BreadcrumbCustom />
                <Row  type="flex" justify="space-around" align="middle">
                <Col md={4} offset={6}>
                    <span className="avatar">
                        <img src={b1} alt="头像" style={{width:"150px"}} />
                    </span>
                </Col>
                <Col md={14}>
                    <h2>Hi,芝麻糊</h2>
                </Col>
                </Row>
                <Row>
                    <Col offset={10}>
                        <Button type="primary" onClick={this.handleToggle} >修改密码</Button>
                        {this.state.toggle ? <AccountFrom /> : null}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard;