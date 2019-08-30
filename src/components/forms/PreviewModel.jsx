import React, { Component } from 'react';
import { Card, Skeleton } from 'antd';
import ContentLoader from 'react-content-loader';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    switchModel = (x) => {
        if (x === "A") {
            return (
                <div>
                    <p className="model-title m-1">{this.props.data.title}</p>
                    <ContentLoader ariaLabel="模块A" height={305} width={370} speed={0} primaryColor="#f3f3f3">
                        <rect x="6" y="49" rx="0" ry="0" width="325" height="47" />
                        <rect x="6" y="102" rx="0" ry="0" width="58" height="17" />
                        <rect x="6" y="124" rx="0" ry="0" width="328" height="18" />
                        <rect x="6" y="145" rx="0" ry="0" width="328" height="18" />
                        <rect x="6" y="166" rx="0" ry="0" width="328" height="18" />
                        <rect x="6" y="187" rx="0" ry="0" width="328" height="18" />
                        <rect x="6" y="208" rx="0" ry="0" width="328" height="18" />
                        <rect x="6" y="229" rx="0" ry="0" width="328" height="18" />
                        <rect x="6" y="250" rx="0" ry="0" width="328" height="18" />
                        <rect x="6" y="271" rx="0" ry="0" width="328" height="18" />
                    </ContentLoader>
                </div>
            )
        } else if (x === "B") {
            return (
                <div className="grey-bg">
                    <p className="model-title m-2">{this.props.data.title}</p>
                    <ContentLoader ariaLabel="模块B" height={305} width={578} speed={0} primaryColor="#ffffff">
                        <rect x="24" y="26" rx="0" ry="0" width="185" height="252" />
                        <rect x="237" y="67" rx="0" ry="0" width="70" height="19" />
                        <rect x="237" y="100" rx="0" ry="0" width="318" height="51" />
                        <rect x="237" y="161" rx="0" ry="0" width="318" height="72" />
                        <rect x="237" y="241" rx="0" ry="0" width="58" height="20" />
                    </ContentLoader>
                </div>
            )
        } else if (x === "C") {
            return (
                <div>
                    <p className="model-title m-3">{this.props.data.title}</p>
                    <ContentLoader ariaLabel="模块C" height={489} width={362} speed={0} primaryColor="#f3f3f3">
                        <rect x="0" y="41" rx="0" ry="0" width="75" height="60" />
                        <rect x="0" y="110" rx="0" ry="0" width="75" height="60" />
                        <rect x="0" y="180" rx="0" ry="0" width="75" height="60" />
                        <rect x="0" y="250" rx="0" ry="0" width="75" height="60" />
                        <rect x="0" y="318" rx="0" ry="0" width="75" height="60" />
                        <rect x="80" y="41" rx="0" ry="0" width="213" height="27" />
                        <rect x="80" y="110" rx="0" ry="0" width="213" height="27" />
                        <rect x="80" y="180" rx="0" ry="0" width="213" height="27" />
                        <rect x="80" y="250" rx="0" ry="0" width="213" height="27" />
                        <rect x="80" y="318" rx="0" ry="0" width="213" height="27" />
                        <rect x="80" y="75" rx="0" ry="0" width="165" height="24" />
                        <rect x="80" y="145" rx="0" ry="0" width="165" height="24" />
                        <rect x="80" y="215" rx="0" ry="0" width="165" height="24" />
                        <rect x="80" y="285" rx="0" ry="0" width="165" height="24" />
                        <rect x="80" y="355" rx="0" ry="0" width="165" height="24" />
                        <rect x="0" y="403" rx="0" ry="0" width="102" height="28" />
                    </ContentLoader>
                </div>
            )
        } else if (x === "D") {
            return (
                <div>
                    <p className="model-title m-4">{this.props.data.title}</p>
                    <ContentLoader ariaLabel="模块D" height={489} width={587} speed={0} primaryColor="#f3f3f3">
                        <rect x="0" y="43" rx="0" ry="0" width="175" height="138" />
                        <rect x="203" y="43" rx="0" ry="0" width="175" height="138" />
                        <rect x="406" y="43" rx="0" ry="0" width="175" height="138" />
                        <rect x="0" y="270" rx="0" ry="0" width="175" height="138" />
                        <rect x="203" y="270" rx="0" ry="0" width="175" height="138" />
                        <rect x="406" y="270" rx="0" ry="0" width="175" height="138" />
                        <rect x="0" y="195" rx="0" ry="0" width="178" height="34" />
                        <rect x="203" y="195" rx="0" ry="0" width="178" height="34" />
                        <rect x="406" y="195" rx="0" ry="0" width="178" height="34" />
                        <rect x="0" y="422" rx="0" ry="0" width="178" height="34" />
                        <rect x="203" y="422" rx="0" ry="0" width="178" height="34" />
                        <rect x="406" y="422" rx="0" ry="0" width="178" height="34" />
                        <rect x="0" y="238" rx="0" ry="0" width="44" height="8" />
                        <rect x="203" y="238" rx="0" ry="0" width="44" height="8" />
                        <rect x="406" y="238" rx="0" ry="0" width="44" height="8" />
                        <rect x="0" y="470" rx="0" ry="0" width="44" height="6" />
                        <rect x="203" y="470" rx="0" ry="0" width="44" height="6" />
                        <rect x="406" y="470" rx="0" ry="0" width="44" height="6" />
                    </ContentLoader>
                </div>
            )
        }
    }
    render() {
        return (
            <Card className="model-box">
                {this.switchModel(this.props.model)}
            </Card>
        )
    }
}

export default Preview;