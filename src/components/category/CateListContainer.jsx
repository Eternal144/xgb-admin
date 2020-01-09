import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import { addCate } from '../../constants/api/navi';
import { fetchApi } from '../../callApi';
import CateList from './CateList'
import BreadcrumbCustom from '../BreadcrumbCustom';


class CateListContainer extends React.Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="栏目列表" />
                <Button type="primary" className="right-btn" onClick={this.handleAddItem}><Link to="/app/category/modify">添加栏目</Link></Button>
                <div className="clear"></div>
                <CateList />
            </div>
        )
    }
}

export default CateListContainer;