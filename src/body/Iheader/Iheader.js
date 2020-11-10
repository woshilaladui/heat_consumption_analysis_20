import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import './Iheader.css';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { connect } from 'react-redux';
import * as actionCreators from '../home_app/store/actionCreators';
import CountDown from "../../countdown";
const SubMenu = Menu.SubMenu;

class Iheader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //display: ['none','none','none','none','none','none','none'],
            display: ['', '', '', '', '', '', '',''],
            choose_num: 0,
            CompanyName: '临城中联福石水泥有限公司',
        };
    } 

    onChangeKey = (e) => {
        this.props.onChange(e.key);
    };
    componentDidMount() {
        switch(window.localStorage.department){
            case '1':
                this.setState({
                    display: ['', 'none', '', '', '', 'none', '','none']
                    // display: ['', '', 'none', 'none', 'none', 'none', '','none']
                });
                break;
            case '2':
                this.setState({
                    display: ['', '', 'none', 'none', 'none', 'none', '','none']
                });
                break;
            default:
                break;
        }

    }

    componentWillReceiveProps(nextProps){ //接受初始display

        // this.setState({
        //     display: nextProps.display,
        //
        // })
    }
    //     fetch('/api/info', {
    //         method: 'post',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': window.localStorage.authorization,
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data['code'] === 0) {
    //                 if (window.localStorage.state === '1' && window.localStorage.type >= 1) {
    //                     switch (window.localStorage.type) {//对权限进行判定
    //                         case '1':
    //                             if (window.localStorage.department === '1')//化验室操作员
    //                                 switch (window.localStorage.section) {//科室分配
    //                                     case '1':
    //                                         this.setState({
    //                                             display: ['', 'none', '', '', '', 'none', 'none']
    //                                         });
    //                                         break;
    //                                     case '2':
    //                                         this.setState({
    //                                             display: ['', 'none', '', 'none', 'none', 'none', 'none']
    //                                         });
    //                                         break;
    //                                     case '3':
    //                                         this.setState({
    //                                             display: ['', 'none', 'none', '', 'none', 'none', 'none']
    //                                         });
    //                                         break;
    //                                     case '4':
    //                                         this.setState({
    //                                             display: ['', 'none', 'none', 'none', '', 'none', 'none']
    //                                         });
    //                                         break;
    //                                     default:
    //                                 }
    //                             else if (window.localStorage.department === '2')//中控室操作员
    //                                 this.setState({
    //                                     display: ['', '', 'none', 'none', 'none', 'none', 'none']
    //                                 })
    //                             break;
    //                         case '2':
    //                             this.setState({//总工程师
    //                                 display: ['', 'none', 'none', 'none', 'none', '', 'none']
    //                             });
    //                             break;
    //                         case '3':
    //                             if (window.localStorage.department === '1')//化验室主任
    //                                 this.setState({
    //                                     display: ['', 'none', '', '', '', '', 'none']
    //                                 })
    //                             else if (window.localStorage.department === '2')//中控室主任
    //                                 this.setState({
    //                                     display: ['', '', 'none', 'none', 'none', '', 'none']
    //                                 })
    //                             break;
    //                         case '4':
    //                             this.setState({
    //                                 display: ['', '', '', '', '', '', '']
    //                             });
    //                             break;
    //                         default:
    //                     }
    //                 }
    //             }
    //         })
    //         .catch(error => console.error('Error:', error))
    // }

    // handleLogout = () => {
    //     const jsonData = {
    //         'token': window.localStorage.token,
    //     };
    //     fetch("/api/logout", {
    //         method: 'POST',
    //         credentials: "include",
    //         body: JSON.stringify(jsonData),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': window.localStorage.authorization,
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data['code'] === 0) {//判定是否成功
    //                 window.localStorage.clear();
    //                 this.setState({
    //                     display: ['', 'none', 'none', 'none', 'none', 'none', '', 'none'],
    //                 });
    //                 this.onChangekey({"key": 0});
    //             }
    //         })
    //         .catch(error => console.error('Error:', error))
    // };

    render() {


        const {pageDisplay} = this.props;
        const {display} = this.state;

        return (
            <div className='iheader'>
                {/**图片盒子*/}
                 {/*<Link to="/">*/}
                    <a className="head_icon col-md-8 col-sm-8" href="">
                        <img src={require("../../img/logo.png")} alt=""/>
                    </a>
                    {/* <a className="head_companyName col-md-8 col-sm-8">{this.state.CompanyName}</a> */}
                 {/*</Link>*/}
                <Menu
                    mode="horizontal"
                    className="icon"
                    style={{lineHeight: '60px', float: 'right'}}
                    defaultSelectedKeys={['0']}
                    onSelect={this.onChangeKey}
                >
                    <Menu.Item ><a href='/'>返回首页</a>
                    </Menu.Item>
                    <Menu.Item className='header_menuItem submenu-title-wrapper' key="0"
                               style={{display: display[0]}}>
                        <Icon type="eye"/> 查看表单
                    </Menu.Item>

                    <SubMenu
                        key='sub1'
                        style={{display: display[1]}}
                        title={<span className="submenu-title-wrapper"><Icon type="experiment"/>中控室表格</span>}>
                        <Menu.ItemGroup title="水泥流程记录">
                        <Menu.Item className='header_menuItem' key="1">
                            烧成系统运行记录
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="2">
                            煤磨系统运行记录
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="3">
                            生料磨系统运行记录
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="4">
                            脱销系统运行记录
                        </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="生料">
                        <Menu.Item className='header_menuItem' key="5">
                            出磨生料荧光分析及配比记录
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="6">
                            入窑生料荧光分析及检测记录
                        </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="熟料">
                        <Menu.Item className='header_menuItem' key="7">
                            熟料荧光分析及检测记录
                        </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="测试">
                        <Menu.Item className='header_menuItem' key="8">
                            在线自动检测运行记录（排放物）
                        </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="日报表">
                        <Menu.Item className='header_menuItem' key="9">
                            中控室日报
                        </Menu.Item>
                        </Menu.ItemGroup>

                    </SubMenu>
                    <SubMenu
                        key='sub2'
                        style={{display: display[2]}}
                        title={<span className="submenu-title-wrapper"><Icon type="database"/>荧光分析</span>}>
                        <Menu.ItemGroup title="原材料">
                        <Menu.Item className='header_menuItem' key="10">
                            石灰石进厂原材料化学分析报告单
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="11">
                            砂岩进厂原材料化学分析报告单
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="12">
                            铁粉进厂原材料化学分析报告单
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="13">
                            煤灰(干)进厂粉原材料化学分析报告单
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="14">
                            煤灰(湿)进厂粉原材料化学分析报告单
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="15">
                            仓下原材料化学分析报告单
                        </Menu.Item>
                        </Menu.ItemGroup>
                        {/*<Menu.Item className='header_menuItem' key="16">*/}
                        {/*    仓下砂岩原材料化学分析报告单*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item className='header_menuItem' key="17">*/}
                        {/*    仓下粉煤灰原材料化学分析报告单*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item className='header_menuItem' key="18">*/}
                        {/*    仓下铁粉原材料化学分析报告单*/}
                        {/*</Menu.Item>*/}
                        <Menu.ItemGroup title="生料">
                        <Menu.Item className='header_menuItem' key="19">
                            出磨生料化学分析报告单
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="20">
                            入窑生料化学分析报告单
                        </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="熟料">
                        <Menu.Item className='header_menuItem' key="21">
                            出窑熟料全分析汇总表
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="22">
                            出厂熟料全分析汇总表
                        </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.Item className='header_menuItem' key="23">
                            控制室原始记录
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key='sub3'
                        style={{display: display[3]}}
                        title={<span className="submenu-title-wrapper"><Icon type="database"/>分析表格</span>}>
                        <Menu.ItemGroup title="原材料">
                        <Menu.Item className='header_menuItem' key="24">
                            石灰石原材料分析原始记录
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="25">
                            砂岩原材料分析原始记录
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="26">
                            铁粉原材料分析原始记录
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="27">
                            粉煤灰(干)原材料分析原始记录
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="28">
                            粉煤灰(湿)原材料分析原始记录
                        </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="生料">
                        <Menu.Item className='header_menuItem' key="29">
                            出磨生料分析原始记录
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="30">
                            入窑生料分析原始记录
                        </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="熟料">
                        <Menu.Item className='header_menuItem' key="31">
                            出窑熟料化学分析单
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="32">
                            出厂熟料化学分析单
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="33">
                            出窑熟料物理性能检测
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="34">
                            出厂熟料物理性能检测
                        </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="燃料/煤">
                        <Menu.Item className='header_menuItem' key="35">
                            进厂原燃材料水分
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="36">
                            神木工业分析原始记录
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="37">
                            煤粉工业分析原始记录
                        </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <SubMenu
                        key='sub4'
                        style={{display: display[4]}}
                        title={<span className="submenu-title-wrapper"><Icon type="database"/>化验室报表</span>}>
                        <Menu.Item className='header_menuItem' key="38">
                            化验室日报
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="39">
                            化验室周报
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="40">
                            化验室月报
                        </Menu.Item>
                        <Menu.Item className='header_menuItem' key="41">
                            化验室年报
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key='sub5'
                        style={{display: display[5]}}
                        title={<span className="submenu-title-wrapper"><Icon type="database"/>电量表格</span>}
                    >
                        <Menu.Item className="header_menuItem" key="44">
                            每月电量表
                        </Menu.Item>
                        <Menu.Item className="header_menuItem" key="45">
                            35KW表
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item className='header_menuItem' key="42" style={{display: display[6]}}>
                        <Icon type="setting"/>设置合格标准
                    </Menu.Item>
                    {/*<Menu.Item className='header_menuItem' key="43" style={{display:pageDisplay[6]}}>*/}
                    {/*    <Icon type="team"/>员工管理*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item className='header_menuItem' key="46" style={{display:display[7]}}>
                        <Icon type="team"/>日志
                    </Menu.Item>
                    {
                        <Menu.Item className='header_menuItem' key="" >
                            <CountDown />
                        </Menu.Item>
                    }
                </Menu>
            </div>
        )
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        pageDisplay:state.getIn(['home_app', 'pageDisplay']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
    }//end return
}

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(Iheader);