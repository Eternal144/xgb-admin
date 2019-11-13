import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import CateList from './CateList'



class CateListContainer extends React.Component {
    render() {
        return (
            <div>
                <Button type="primary" className="right-btn" onClick={this.handleAddItem}><Link to="/app/category/modify">添加栏目</Link></Button>
                <div class="clear"></div>
                <CateList />
            </div>
        )
    }
    // componentDidMount() {

    // }
    //跳转到栏目添加或者编辑页
    handleAddItem = () => {
        console.log("aa");
    }
}

export default CateListContainer;