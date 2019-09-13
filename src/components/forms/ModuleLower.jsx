//用来标识模块G和H。他俩长的一样。//用来标识模块E
import React, { Component } from 'react';
import { form, Form } from 'antd';


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