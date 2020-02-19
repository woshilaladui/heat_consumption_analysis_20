import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home_app from "../body/home_app/Home_app";
import user from "../body/user/user";
import Home from "../homePage/home/Home";
import Login from "../login/Login";
import Reg from "../reg/reg";

export default class AppRouter extends Component {

    render() {
        return (
            <Router>
                <div>
                    {/* <Route path='/' exact render={() => (
                        <Redirect to='/index'/>
                    )}/> */}
                    <Route exact path="/" component={Home}/>
                    <Route path="/table" component={Home_app}/>
                    <Route path="/user" component={user}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/reg" component={Reg}/>

                    {/* <Route path="/login" component={Login}/>
                    <Route path="/RuYaoSLYCLHXFXBGD" component={RuYaoSLYCLHXFXBGD} onEnter={this.isLogin} />
                    <Route path="/ChuMoSLYCLHXFXBGD" component={ChuMoSLYCLHXFXBGD} onEnter={this.isLogin}/>
                    <Route path="/KongZhiShiYSJL" component={KongZhiShiYSJL} onEnter={this.isLogin}/>
                    <Route path="/ShengShuYLQFXHZB" component={ShengShuYLQFXHZB} onEnter={this.isLogin}/>
                    <Route path="/ZhongKongSSCXTJL" component={ZhongKongSSCXTJL} onEnter={this.isLogin}/>
                    <Route path="/ZhongKongSSCXTJLX2" component={ZhongKongSSCXTJLX2} onEnter={this.isLogin}/>
                    <Route path="/UserManage" component={UserManage} onEnter={this.isLogin}/>
                    <Route path="/BiaoZhun" component={BiaoZhun} onEnter={this.isLogin}/>
                    <Route path="/ChaKan" component={ChaKan} onEnter={this.isLogin}/>
                    <Route path="/reg" component={Registration} onEnter={this.isLogin}/> */}
                </div>
            </Router>
        );
    }
}