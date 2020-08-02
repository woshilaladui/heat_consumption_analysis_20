import React, {Component} from 'react';
import {Form, Icon, Input, Button, message, Layout,} from 'antd';
import $ from 'jquery';
import {Mark} from "./http/constant/Constant";
import {deepCopy} from "./Helper/Copy";


const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;


export default class LoginDemo extends Component {

    getVerificationPhoto() {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp = new XMLHttpRequest();
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("verificationImg").src = "http://101.200.149.190/caiji_v4.1/verification";
                //拿到html的doom结点进行更新src操作
            }
        };
        xmlhttp.open("GET", "http://101.200.149.190/caiji_v4.1/verification", true);
        xmlhttp.send();
    }

    login() {
        var username = $("#username").val();
        var password = $("#password").val();
        var captchaCode = $("#captchaCode").val();
        if (username === "" || password === "") {
            alert('用户名或密码不能为空');
            return;
        }
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('captchaCode', captchaCode);
        fetch("http://101.200.149.190/caiji_v4.1/authentication", {
            method: "POST",
            body: formData, // data can be `string` or {object}!
            credentials:"include",
            headers: {
                //"Content-Type": "application/json",
                "Cookie": "SESSION=ZTZjYmYyMWYtOTA0OC00NjEyLTg3YWUtYjQyYmZlN2MzMTVm"

            }
        })
            .then(res => {
                return res.json()
            })

            .then(data => {
                console.log('dateerrosss')
                console.log(data)
                console.log('dateroorsss')


            })
            .catch(function (error) {
// 处理 getJSON 和 前一个回调函数运行时发生的错误
                console.log('发生错误！', error);
            })
        // $.ajax({
        //     type: "POST",
        //     headers: {
        //         "Cookie": "SESSION=NGY3NjI2NWYtNTk4Yi00YjRmLTljZWUtZGVhODI0YzI1Nzc4"
        //     },
        //     url: "http://101.200.149.190/caiji_v4.1/authentication",
        //     data: {
        //         "username": username,
        //         "password": password,
        //         "captchaCode": captchaCode,
        //     },
        //     success: function (json) {
        //         if (json.isok) {
        //             window.href = json.data;
        //         } else {
        //             alert(json.message)
        //         }
        //
        //     },
        //     error: function (e) {
        //         console.log(e.responseText);
        //     }
        // });
    }

// window.onload = function () {
//     var kaptchaImg = document.getElementById("kaptcha");
//
//     kaptchaImg.onclick = function () {
//         kaptchaImg.src = "/kaptcha?" + Math.floor(Math.random() * 100)
//     }
// };
    render() {


        return (
            <div>
                <h1>字母哥业务系统登录</h1>
                <form action="/login" method="post">
                    <span>用户名称</span><input type="text" name="uname" id="username"/>
                    <span>用户密码</span><input type="password" name="pword" id="password"/>
                    <span>验证码</span><input type="text" name="captchaCode" id="captchaCode"/>
                    <img id="verificationImg" src="http://101.200.149.190/caiji_v4.1/verification" alt="图片"
                         onClick={this.getVerificationPhoto}
                    />
                    <input type="button" onClick={this.login} value="登陆"/>
                    <label><input type="checkbox" name="remember-me" id="remember-me"/>记住密码</label>
                </form>

            </div>
        );

    }
}



