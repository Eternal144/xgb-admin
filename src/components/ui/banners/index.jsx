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
import BannerList from './BannerList';

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
                    // console.log(data)
                    this.setState({
                        data: data.data,
                        isLoaded: true,
                    })
                });
        }
    }

    render() {
        let data = this.state.data;
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        const { isLoaded } = this.state
        // console.log(isLoaded)
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
                                <BannerList data={data} isLoaded={this.state.isLoaded} />

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