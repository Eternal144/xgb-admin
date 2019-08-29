/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
// import EchartsViews from './EchartsViews';
// import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import AccountFrom from '../forms/LoginForm';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }

    getTimeState = () => {
        let timeNow = new Date();
        let hours = timeNow.getHours();
        let text = ``;
        if (hours >= 0 && hours <= 10) {
            text = `早上好！`;
        } else if (hours > 10 && hours <= 14) {
            text = `中午好！`;
        } else if (hours > 14 && hours <= 18) {
            text = `下午好！`;
        } else if (hours > 18 && hours <= 24) {
            text = `晚上好！`;
        }
        return text;
    }

    handleToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    render() {
        return (
            <div >
                <BreadcrumbCustom first="账户管理" />
                <Row type="flex" justify="space-around" align="middle">
                    <Col md={4} offset={6}>
                        <span className="avatar">
                            <img src={b1} alt="头像" style={{ width: "150px" }} />
                        </span>
                    </Col>
                    <Col md={14}>
                        <h2>{sessionStorage.getItem("username")}，{this.getTimeState()}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col offset={10}>
                        <Button type="primary" onClick={this.handleToggle} >修改密码</Button>
                        {this.state.toggle ? <AccountFrom user={sessionStorage.getItem('username')} /> : null}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard;