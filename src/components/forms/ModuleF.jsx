//用来标识模块F
//用来标识模块E
import React, { Component } from 'react';
import {  Form } from 'antd';


class ModuleOfE extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div> 啊啊 </div>
        )
    }
}

const ModuleE = Form.create()(ModuleOfE)
export default ModuleE;