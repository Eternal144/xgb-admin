import React, { Component } from 'react';
import { Form, Input, Icon, Select, Button, Card, Col, message, } from 'antd';
import './customize.css';
import { fetchApi } from '../../../callApi';
import { getCateLists } from '../../../constants/api/category'
import BannerModify from './BannerModify';
import { getBannerInfo } from '../../../constants/api/banner';


const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
}

class BannerList extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            catData: null,
            banData: null,
            isCatLoaded: false,
            isBannerLoaded: false,
        }
    }

    handleAddItem = () => {
        let data = this.state.banData;
        let lastData = data[data.length - 1];
        let newDataId = 0;
        let newRank = 0;
        if (lastData) {
            newDataId = lastData.id + 1;
            newRank = parseInt(lastData.rank);
        };
        data.push({
            "id": -1,
            "title": undefined,
            "rank": newRank + 1,
            "isnew": true,
        })
        this.setState({
            data: data,
        })
    }

    formIt = (bandata, catdata) => {
        let list = [];
        for (let i = 0; i < bandata.length; i++) {
            list.push(<BannerModify banData={bandata[i]} index={i} catData={catdata} />)
        }
        return list;
    }

    componentDidMount = () => {
        if (!this.state.isCatLoaded) {
            const { apiPath, request } = getCateLists();
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    console.log(data.data)
                    this.setState({
                        catData: data.data,
                        isCatLoaded: true,
                    })
                });
        }
        if (!this.state.isBannerLoaded) {
            const { apiPath, request } = getBannerInfo();
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    console.log(data.data)
                    this.setState({
                        banData: data.data,
                        isBannerLoaded: true,
                    })
                });
        }
    }


    render() {
        return (
            <div>
                {this.state.isBannerLoaded && this.state.isCatLoaded ? this.formIt(this.state.banData, this.state.catData) : null}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.handleAddItem} style={{ width: '60%' }}>
                            <Icon type="plus" /> 添加轮播图</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default BannerList;