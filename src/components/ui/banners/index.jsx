/**
 * Created by hao.cheng on 2017/4/26.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
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
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                this.setState({
                    data: data.data,
                    isLoaded: true,
                })
            });
    }
    handleAddItem = () => {
        let { data } = this.state;
        let lastData = data[data.length - 1];
        let newDataId = lastData.id + 1;
        data.push({

        })
        this.setState({
            data: data,
        })
    }

    render() {
        let data = this.state.data;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="UI" second="轮播图" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="预览" bordered={false}>
                                <AutoPlay bannerData={data} isLoaded={this.state.isLoaded} />
                            </Card>
                            <Card className="banner-edit-card" title="轮播图编辑" bordered={false}>
                                <ShowBanner bannerData={data} isLoaded={this.state.isLoaded} />
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