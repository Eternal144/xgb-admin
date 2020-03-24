/**
 * Created by hao.cheng on 2017/4/26.
 */
import React from 'react';
import { Carousel } from 'antd';
import 'rc-banner-anim/assets/index.css';
import './customize.css';
import { Spin } from 'antd';
// import { url } from 'inspector';
class AutoPlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let data = this.props.bannerData;
        let elements = [];
        if (this.props.isLoaded) {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    elements.push(
                        <div className="bg-element" key="BgElement" style={{ backgroundImage: `url(${"https://xuegong.twt.edu.cn/" + data[i].picture})` }}>
                            <img key="bg-img" className="bg-img" alt="轮播图预览" src={"https://xuegong.twt.edu.cn/" + data[i].picture} />
                        </div>
                    )
                }
            }
        } else {
            elements.push(
                <Spin key="spinner" />
            )
        }
        return (
            <Carousel autoplay>
                {elements}
            </Carousel>
        );
    }
}

export default AutoPlay;