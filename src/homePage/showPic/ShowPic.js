import React from "react";
import "./ShowPic.css";
import BannerAnim, {Element} from 'rc-banner-anim';
// import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import img1 from "../../img/image/01.jpg";
import img3 from "../../img/image/03.jpg";



const BgElement = Element.BgElement;

let imgArray = [
    img1,img3
];

export default class IShowPic extends React.Component {


  render() {
    return (
        <BannerAnim prefixCls="banner-user"
        id="hero"
        autoPlaySpeed={5000} autoPlay
        dragPlay={false}
            >
            <Element
                onClick={this.handleClick1}
                prefixCls="banner-user-elem"
                key="0"
            >
                <BgElement
                    key="bg"
                    className="bg1"
                    style={{
                        backgroundImage:`url(${imgArray[0]})`,
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                    }}
                />
                {/* <TweenOne className="banner-user-title" animation={{y: 30, opacity: 0, type: 'from'}}>
                    {this.state.intro[0]}
                </TweenOne> */}
                {/***这里可以加二级标题，用作解释***/}
                {/*<TweenOne className="banner-user-text" animation={{y: 30, opacity: 0, type: 'from', delay: 100}}>*/}
                {/*The Fast Way Use Animation In React*/}
                {/*</TweenOne>*/}
            </Element>
            <Element
                onClick={this.handleClick2}
                prefixCls="banner-user-elem"
                key="1"
            >
                <BgElement
                    key="bg"
                    className="bg2"
                    style={{
                        backgroundImage: `url(${imgArray[1]})`,
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                    }}
                />
                {/* <TweenOne className="banner-user-title" animation={{y: 30, opacity: 0, type: 'from'}}>
                    {this.state.intro[1]}
                </TweenOne> */}
                {/***这里可以加二级标题，用作解释***/}
                {/*<TweenOne className="banner-user-text" animation={{y: 30, opacity: 0, type: 'from', delay: 100}}>*/}
                {/*The Fast Way Use Animation In React*/}
                {/*</TweenOne>*/}
            </Element>
            {/* <Element
                onClick={this.handleClick3}
                prefixCls="banner-user-elem"
                key="2"
            >
                <BgElement
                    key="bg"
                    className="bg3"
                    style={{
                        backgroundImage: `url(${imgArray[2]})`,
                    }}
                /> */}
                {/* <TweenOne className="banner-user-title" animation={{y: 30, opacity: 0, type: 'from'}}>
                    {this.state.intro[2]}
                </TweenOne> */}
                {/***这里可以加二级标题，用作解释***/}
                {/*<TweenOne className="banner-user-text" animation={{y: 30, opacity: 0, type: 'from', delay: 100}}>*/}
                {/*The Fast Way Use Animation In React*/}
                {/*</TweenOne>*/}
            {/* </Element> */}
            {/* <Element
                onClick={this.handleClick4}
                prefixCls="banner-user-elem"
                key="3"
            >
                <BgElement
                    key="bg"
                    className="bg4"
                    style={{
                        backgroundImage: `url(${imgArray[3]})`,
                    }}
                /> */}
                {/* <TweenOne className="banner-user-title" animation={{y: 30, opacity: 0, type: 'from'}}>
                    {this.state.intro[3]}
                </TweenOne> */}
                {/***这里可以加二级标题，用作解释***/}
                {/*<TweenOne className="banner-user-text" animation={{y: 30, opacity: 0, type: 'from', delay: 100}}>*/}
                {/*The Fast Way Use Animation In React*/}
                {/*</TweenOne>*/}
            {/* </Element> */}
            {/* <Element
                onClick={this.handleClick5}
                prefixCls="banner-user-elem"
                key="4"
            >
                <BgElement
                    key="bg"
                    className="bg5"
                    style={{
                        backgroundImage: `url(${imgArray[4]})`,
                    }}
                /> */}
                {/* <TweenOne className="banner-user-title" animation={{y: 30, opacity: 0, type: 'from'}}>
                    {this.state.intro[4]}
                </TweenOne> */}
                {/***这里可以加二级标题，用作解释***/}
                {/*<TweenOne className="banner-user-text" animation={{y: 30, opacity: 0, type: 'from', delay: 100}}>*/}
                {/*The Fast Way Use Animation In React*/}
                {/*</TweenOne>*/}
            {/* </Element> */}
            </BannerAnim>
        );
  }
}