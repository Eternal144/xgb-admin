import React, { Component } from 'react';
import { Row, Col, Card, Form, Input } from 'antd';
import './customize.css';
import { Collapse } from 'antd';
import { Skeleton } from 'antd';

const { Panel } = Collapse;

class ShowBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSaved: false,
            isEdit: true,
        }
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        let elements = [];
        let data = this.props.bannerData;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        if (this.props.isLoaded) {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    elements.push(
                        <Panel header={"轮播图" + data[i].rank} key={data[i].rank}>
                            {this.state.isEdit ?
                                <Form {...formItemLayout}>
                                    <Form.Item label="标题">
                                        <Input defaultValue={data[i].title} hideRequiredMark="false" allowClear="true" style={{ width: '60%' }} />
                                    </Form.Item>
                                    <Form.Item label="跳转文章选择">
{}
                                    </Form.Item>
                                </Form> :
                                <Form {...formItemLayout}>
                                    <Form.Item label="标题">
                                        <Input defaultValue={data[i].title} disabled="true" style={{ width: '60%' }} />
                                    </Form.Item>
                                </Form>
                            }
                        </Panel>
                    )
                }
            }
        }
        return (
            <div>
                {this.props.isLoaded ? null : <Skeleton active />}
                <Collapse accordion>
                    {elements}
                </Collapse>
            </div>
        )
    }
}

export default ShowBanner;