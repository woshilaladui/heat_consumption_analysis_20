import React, {Component} from 'react';
import './Bottom.css';

export default class Ibottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            WXview: "none",
            SJview: "none"
        }
    }

    onShowWX() {
        this.setState({
            WXview: "block"
        })
    }

    onHideWX() {
        this.setState({
            WXview: "none"
        })
    }

    onShowSJ() {
        this.setState({
            SJview: "block"
        })
    }

    onHideSJ() {
        this.setState({
            SJview: "none"
        })
    }

    render() {
        return (

            <div id="about">
                <footer id='footer'>
                    <div className="footer-wrap">
                        <div className="ant-row">
                            <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6">
                                <div className="footer-center"><h2><span>相关链接</span></h2>
                                    <div><a href="http://i.whut.edu.cn/">武汉理工大学</a><span> - </span>这里用来简单介绍前面的链接</div>
                                    <div><a href="http://www.craes.cn/">中国环境科学研究院</a></div>
                                    <div><a href="http://www.ccement.com/">中国水泥网</a><span> - </span>水泥行业的信息资讯平台</div>
                                    <div><a href="http://www.dcement.com/">数字水泥网</a></div>
                                    <div><a target="_blank" rel="noopener noreferrer" href="https://index.ccement.com/"><span>水泥价格指数</span></a><span> - </span>本页为新建页面跳转外链
                                    </div>
                                    <div><a href="#">科技基础性工作专题网站</a>
                                    </div>
                                </div>
                            </div>
                            <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6">
                                <div className="footer-center"><h2><span>行业相关</span></h2>
                                    <div><a href="#"><span>国家行业政策</span></a></div>
                                    <div><a href="#"><span>行业标准和规范</span></a></div>
                                </div>
                            </div>
                            <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6">
                                <div className="footer-center"><h2><span>帮助</span></h2>
                                    <div><a href="#"><span>更新记录</span></a></div>
                                    <div><a href="#"><span>常见问题</span></a>
                                    </div>
                                    <div><a href="#"><span>在线讨论 (中文)</span></a>
                                    </div>
                                    <div><a href="#"><span>在线讨论 (English)</span></a>
                                    </div>
                                    <div><a href="#"><span>讨论列表</span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6">
                                <div className="footer-center"><h2><span>联系我们</span></h2>
                                    <div>
                                        <i style={{color: 'white'}} className="iconfont icon-dianhua" target="_blank"
                                           rel="noopener noreferrer"
                                           href="https://weibo.com/"/>
                                        <span> - </span><span>邮箱：linchengfushi163@.com</span>
                                    </div>
                                    {/*<div>*/}
                                        {/*<a*/}
                                            {/*className="iconfont icon-weixin"*/}
                                            {/*target="_blank"*/}
                                            {/*rel="noopener noreferrer"*/}
                                            {/*href="https://weibo.com/"*/}
                                            {/*style={{color: "white"}}*/}
                                            {/*onMouseOver={() => {*/}
                                                {/*this.onShowWX()*/}
                                            {/*}}*/}
                                            {/*onMouseOut={() => {*/}
                                                {/*this.onHideWX()*/}
                                            {/*}}*/}
                                        {/*/>*/}
                                        {/*<span> - </span><span>微信二维码</span>*/}
                                        {/*<li className="weixin" style={{display: this.state.WXview}}>*/}
                                        {/*</li>*/}
                                    {/*</div>*/}
                                    <div><a className="iconfont"/><span> - 联系电话：0319-3709995</span>
                                    </div>
                                    <div><a className="iconfont"/><span> - 地址：河北省邢台市临城县黑城乡祁村村北</span>
                                    </div>

                                    <div><a className="iconfont"/><span> - 传真：0319-3709996</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-bar">
                        SmartLab Design ©2018 Powerd By
                        <a target="_blank" rel="noopener noreferrer"
                           href="https://www.baidu.com"
                           style={{color: 'hsla(0,0%,100%,.65)'}}> 武汉理工大学智能技术实验室</a>
                    </div>
                </footer>
            </div>

        )
    }
}