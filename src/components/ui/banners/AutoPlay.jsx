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
        // console.log(data);
        if (this.props.isLoaded) {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    elements.push(
                        <div className="bg-element" key="BgElement" style={{ backgroundImage: `url(${"https://xuegong.twtstudio.com/" + data[i].picture})` }}>
                            <img key="bg-img" className="bg-img" alt="轮播图预览" src={"https://xuegong.twtstudio.com/" + data[i].picture} />
                            {/* <div className="bg-text">{data[i].title}</div> */}
                            {/* <div className="bg-info">
                                <p>{"第" + data[i].rank + "张"}</p>
                            </div> */}
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