import React from 'react';
import {
    Button,
    Form,
    Select,
    Card,
    Table,
} from 'antd';
import NaviModifyList from './NaviModify'

class NaviModifyCon extends React.Component {
    state = {
        visible: true
    }
    handleVisiable = () => {
        this.setState({
            visible: true
        })
    }

    handleCancelVisible = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const { state } = this.props.location;
        return (
            <div>
                {state === undefined ? <h1>请选择一个导航进行编辑</h1> : <NaviModifyList data={state} />}
            </div>
        )
    }

}

export default Form.create({ name: 'modify_container' })(NaviModifyCon);
