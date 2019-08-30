/**
 * Created by hao.cheng on 2017/4/26.
 */
import React from 'react';
import { Row, Col, Card, Form, Button, Icon } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import AutoPlay from './AutoPlay';
import { fetchApi } from '../../../callApi';
import { getBannerInfo } from '../../../constants/api/banner';
import { BackTop } from 'antd';
import './customize.css';
import ShowBanner from './ShowBanner';

// import Custom from './Custom';

class Banners extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoaded: false,
        }
    }
    componentDidMount() {
        const { apiPath, request } = getBannerInfo();
        // console.log(fetchApi(apiPath, request))
        if (!this.state.isLoaded) {
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    // console.log(data.data)
                    this.setState({
                        data: data.data,
                        isLoaded: true,
                    })
                });
        }
    }
    handleAddItem = () => {
        let { data } = this.state;
        let lastData = data[data.length - 1];
        let newDataId = lastData.id + 1;
        data.push({
            "id": lastData.id + 1,
            "title": null,
            "rank": parseInt(lastData.rank) + 1,

        })
        this.setState({
            data: data,
        })
    }

    render() {
        let data = this.state.data;
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="轮播图管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="预览" bordered={false} className="borderless">
                                <AutoPlay bannerData={data} isLoaded={this.state.isLoaded} />
                            </Card>
                            <Card className="banner-edit-card" title="编辑" bordered={false}>
                                <ShowBanner data={data} isLoaded={this.state.isLoaded} />
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Item {...formItemLayoutWithOutLabel}>
                                        <Button type="dashed" onClick={this.handleAddItem} style={{ width: '60%' }}>
                                            <Icon type="plus" /> 添加轮播图</Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <BackTop />
            </div>
        )
    }
}

export default Banners;