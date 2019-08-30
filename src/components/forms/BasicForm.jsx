/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, BackTop, Skeleton, notification } from 'antd';
import LoginForm from './LoginForm';
import ModalForm from './ModalForm';
import HorizontalForm from './HorizontalForm';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Collapse, Result } from 'antd';
import './customize.css';
import Preview from './PreviewModel';
import { lowwerModelPreview, upperModelPreview } from '../../constants/api/model';
import { fetchApi } from '../../callApi';
import ModelManager from "./ModelManager";
import ModelHelp from './help';

const { Panel } = Collapse;
const FormItem = Form.Item;
const Option = Select.Option;

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
            modelA: null,
            modelB: null,
            modelC: null,
            modelD: null,
            modelE: null,
            modelF: null,
            modelG: null,
            modelH: null,
            isModelEReady: false,
            isModelFReady: false,
            isModelGReady: false,
            isModelHReady: false,
            readyUpperModel: false,
            isUpperLoaded: false,
            isLowwerLoaded: false,
            bindInfo: null,
        }
    }

    componentDidMount = () => {
        if (!this.state.isUpperLoaded) {
            let { apiPath, request } = upperModelPreview();
            fetchApi(apiPath, request)
                .then(res => res.json())
                .then(data => {
                    if (data.data.length === 4) {
                        this.setState({
                            readyUpperModel: true,
                        })
                    }
                    this.setState({
                        modelA: data.data[0],
                        modelB: data.data[1],
                        modelC: data.data[2],
                        modelD: data.data[3],
                        isUpperLoaded: true,
                    })
                });
        }
        if (!this.state.isLowwerLoaded) {
            for (let i = 1; i < 5; i++) {
                let { apiPath, request } = lowwerModelPreview(i);
                fetchApi(apiPath, request)
                    .then(res => res.json())
                    .then(data => {
                        if (data.error_code === 0 && data.data.length > 0) {
                            if (i === 1) {
                                this.setState({
                                    modelE: data.data,
                                    isModelEReady: true,
                                })
                            } else if (i === 2) {
                                this.setState({
                                    modelF: data.data,
                                    isModelFReady: true,
                                })
                            } else if (i === 3) {
                                this.setState({
                                    modelG: data.data,
                                    isModelGReady: true,
                                })
                            } else if (i === 4) {
                                this.setState({
                                    modelH: data.data,
                                    isModelHReady: true,
                                })
                            }
                        }
                    })
            };
        }
    }

    render() {
        return (
            <div>
                <BreadcrumbCustom first="模块管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Collapse bordered={false}>
                                <Panel header="效果预览" key="model-preview">
                                    {this.state.readyUpperModel && this.state.isUpperLoaded ?
                                        <div>
                                            <Col span={9}>
                                                <Preview model="A" data={this.state.modelA} />
                                            </Col>
                                            <Col span={15}>
                                                <Preview model="B" data={this.state.modelB} />
                                            </Col>
                                            <Col span={9}>
                                                <Preview model="C" data={this.state.modelC} />
                                            </Col>
                                            <Col span={15}>
                                                <Preview model="D" data={this.state.modelD} />
                                            </Col>
                                        </div>
                                        : <Result title="有必要的设置未完成,请检查" extra="完成后此信息自动消失" />}
                                </Panel>
                            </Collapse>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Card className="banner-edit-card" title="管理模块A" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(0)}><Icon type="info-circle" />帮助</Button>}>
                                        <ModelManager modelType="A" bindInfo={this.state.modelA} isReady={this.state.isUpperLoaded} />
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card className="banner-edit-card" title="管理模块B" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(1)}><Icon type="info-circle" />帮助</Button>}>
                                        <ModelManager modelType="B" bindInfo={this.state.modelB} isReady={this.state.isUpperLoaded} />
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card className="banner-edit-card" title="管理模块C" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(2)}><Icon type="info-circle" />帮助</Button>}>
                                        <ModelManager modelType="C" bindInfo={this.state.modelC} isReady={this.state.isUpperLoaded} />
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card className="banner-edit-card" title="管理模块D" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(3)}><Icon type="info-circle" />帮助</Button>}>
                                        <ModelManager modelType="D" bindInfo={this.state.modelD} isReady={this.state.isUpperLoaded} />
                                    </Card>
                                </Col>
                            </Row>
                            <Card className="banner-edit-card" title="管理模块E" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(4)}><Icon type="info-circle" />帮助</Button>}>
                                <ModelManager modelType="E" bindInfo={this.state.modelE} isReady={this.state.isModelEReady} />
                            </Card>
                            <Card className="banner-edit-card" title="管理模块F" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(5)}><Icon type="info-circle" />帮助</Button>}>
                                <ModelManager modelType="F" bindInfo={this.state.modelF} isReady={this.state.isModelFReady} />
                            </Card>
                            <Card className="banner-edit-card" title="管理模块G" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(6)}><Icon type="info-circle" />帮助</Button>}>
                                <ModelManager modelType="G" bindInfo={this.state.modelG} isReady={this.state.isModelGReady} />
                            </Card>
                            <Card className="banner-edit-card" title="管理模块H" bordered={false} extra={<Button type="link" size="small" onClick={() => openNotification(7)}><Icon type="info-circle" />帮助</Button>}>
                                <ModelManager modelType="H" bindInfo={this.state.modelH} isReady={this.state.isModelHReady} />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <BackTop />
            </div>
        )
    }
}

const BasicForm = Form.create()(BasicForms);
export default BasicForm;
