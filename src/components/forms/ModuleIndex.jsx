import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, BackTop, Skeleton, notification,
    Spin
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import './customize.css';
import { getCateLists } from '../../constants/api/category';
import { upperModelPreview } from '../../constants/api/model';
import { fetchApi } from '../../callApi';
import ModuleCommon from "./ModuleCommon";
import ModelHelp from './help';
import ModuleManager from './ModuleManager';


const openNotification = (index) => {
    const key = `open${Date.now()}`;
    const btn = (
        <Button type="primary" size="small" onClick={() => notification.close(key)}>
            知道了
        </Button>
    );
    notification.open({
        message: "使用说明",
        description: <div>
            <p>名称：{ModelHelp[index].name}<br />
                类型：{ModelHelp[index].type}<br />
                包含：{ModelHelp[index].include}<br />
                备注：{ModelHelp[index].tip}</p>
        </div>,
        btn,
        key,
        duration: 0,
        icon: <Icon type="info-circle" />,
    });
};

class BasicForms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commonModuleData: null,
            modelA: null,
            modelB: null,
            modelC: null,
            modelD: null,
            // lowwerModuleData: [],
            isModelEReady: false,
            isModelFReady: false,
            isModelGReady: false,
            isModelHReady: false,
            readyUpperModel: false,
            isUpperLoaded: false,
            isLowwerLoaded: false,
            bindInfo: null,
            navData: null,
        }
    }

    componentDidMount = () => {
        let obj = upperModelPreview();
        fetchApi(obj.apiPath, obj.request)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.error_code === 0) {
                    this.setState({
                        commonModuleData: data.data,
                    })
                }
            })
        let { apiPath, request } = getCateLists();
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    navData: data.data,
                })
            });
    }
    render() {
        const { commonModuleData, navData } = this.state;
        // console.log(commonModuleData, navData)
        return (
            <div>
                <BreadcrumbCustom first="模块管理" />
                {(commonModuleData && navData) ?
                    <Row gutter={16}>
                        <Col className="gutter-row" md={24}>
                            <div className="gutter-box">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Card className="banner-edit-card" title="管理模块A" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(0)}><Icon type="info-circle" />帮助</Button>}>
                                            <ModuleCommon type={1} bindInfo={commonModuleData[0]} navData={navData} isReady={this.state.isUpperLoaded} />
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        {commonModuleData ? <Card className="banner-edit-card" title="管理模块B" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(1)}><Icon type="info-circle" />帮助</Button>}>
                                            <ModuleCommon type={2} bindInfo={commonModuleData[1]} navData={navData} isReady={this.state.isUpperLoaded} />
                                        </Card> : null}
                                    </Col>
                                    <Col span={12}>
                                        {commonModuleData ? <Card className="banner-edit-card" title="管理模块C" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(2)}><Icon type="info-circle" />帮助</Button>}>
                                            <ModuleCommon type={3} bindInfo={commonModuleData[2]} navData={navData} isReady={this.state.isUpperLoaded} />
                                        </Card> : null}

                                    </Col>
                                    <Col span={12}>
                                        {commonModuleData ? <Card className="banner-edit-card" title="管理模块D" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(3)}><Icon type="info-circle" />帮助</Button>}>
                                            <ModuleCommon type={4} bindInfo={commonModuleData[3]} navData={navData} isReady={this.state.isUpperLoaded} />
                                        </Card> : null}
                                    </Col>
                                </Row>
                                <Card className="banner-edit-card" title="管理模块E" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(4)}><Icon type="info-circle" />帮助</Button>}>
                                    <ModuleManager type={1} navData={navData} isReady={this.state.isModelEReady} />
                                </Card>
                                <Card className="banner-edit-card" title="管理模块G" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(6)}><Icon type="info-circle" />帮助</Button>}>
                                    <ModuleManager type={3} navData={navData} isReady={this.state.isModelGReady} />
                                </Card>
                                <Card className="banner-edit-card" title="管理模块H" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(7)}><Icon type="info-circle" />帮助</Button>}>
                                    <ModuleManager type={4} navData={navData} isReady={this.state.isModelHReady} />
                                </Card>
                            </div>
                        </Col>
                    </Row> : <Spin size="large" />
                }
                <BackTop />
            </div>
        )
    }
}

const ModelIndex = Form.create()(BasicForms);
export default ModelIndex;
