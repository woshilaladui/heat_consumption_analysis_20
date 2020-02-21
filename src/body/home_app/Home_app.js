import React from "react";
import {Layout} from 'antd';
import Iheader from '../Iheader/Iheader';
import MainComponent from '../bodys/MainComponent';

import {requestCheckPermission} from "../../http/request/RequestUser";
import {State,AUTHORITY,DUTY,Department} from "../../http/constant/Constant"


const {Header, Content, Footer} = Layout;

export default class Home_app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choose_num: 0,
            a:{}
        }
    }

    onChangeNum(e) {
        this.setState({
            choose_num: e
        });
        console.log(e);
    }


    //@author zm
    showDisplay(permission){


        if(//TODO 加密本地信息
            permission.username === window.localStorage.username &&
            permission.state == window.localStorage.state == State.IN &&
            permission.department == window.localStorage.department &&
            permission.duty == window.localStorage.duty &&
            permission.authority == window.localStorage.authority
        ){//本地信息没有修改



            if(permission.authority === AUTHORITY.AUTHORITY_MANAGER){//总经理
                this.setState({
                    display: ['', '', '', '', '', '', '']
                })
            }else {
                switch (permission.department) {//校验属于哪个部门
                    case Department.DEPARTMENT_NONE://无部门
                        this.setState({
                            display: ['none', 'none', 'none', 'none', 'none', 'none', 'none']
                        });
                        break;
                    case Department.DEPARTMENT_HUAYS://化验室
                        //继续校验 该用户的具体职务

                        switch (permission.duty) {
                            case DUTY.DUTY_ZK_MANAGER://化验室主任
                                this.setState({
                                    display: ['', 'none', '', '', '', '', '']
                                });
                                break;
                            case DUTY.DUTY_EMPLOYEE_YG_ANALYST://化验室荧光分析员
                                this.setState({
                                    display: ['none', 'none', '', 'none', 'none', 'none', '']
                                });
                                break;
                            case DUTY.DUTY_EMPLOYEE_YG_OPERATOR://化验室荧光控制员
                                this.setState({
                                    display: ['none', 'none', '', 'none', 'none', 'none', '']
                                });
                                break;

                            case DUTY.DUTY_EMPLOYEE_HYS_ANALYST://化验室分析员
                                this.setState({
                                    display: ['none', 'none', 'none', '', 'none', 'none', '']
                                });
                                break;

                            case DUTY.DUTY_EMPLOYEE_HYS_OPERATOR://化验室物检员
                                this.setState({
                                    display: ['none', 'none', 'none', '', 'none', 'none', '']
                                });
                                break;
                            default:
                                this.setState({
                                    display: ['none', 'none', 'none', 'none', 'none', 'none', 'none']
                                });
                        }


                        break;
                    case Department.DEPARTMENT_ZHKONGKS://中控室

                        switch (permission.duty) {
                            case DUTY.DUTY_ZK_MANAGER://中控主任
                                this.setState({
                                    display: ['', '', 'none', 'none', 'none', '', '']
                                });
                                break;
                            case DUTY.DUTY_ZK_ENGINEER://总工程师
                                //可以查看中控室的所有表格，拥有中控室部门的所有查看权限。
                                this.setState({
                                    display: ['', '', 'none', 'none', 'none', '', '']
                                });
                                break;
                            case DUTY.DUTY_EMPLOYEE_ZK_OPERATOR:
                                this.setState({
                                    display: ['', '', 'none', 'none', 'none', 'none', 'none']
                                });
                                break;
                            case DUTY.DUTY_EMPLOYEE_SD_OPERATOR:
                                this.setState({
                                    display: ['', '', 'none', 'none', 'none', 'none', 'none']
                                });
                                break;
                            default:

                                break;
                        }

                        break;
                    case Department.DEPARTMENT_XINGZS://行政部门
                        this.setState({
                            display: ['none', 'none', 'none', 'none', 'none', 'none', '']
                        });
                        break;
                }
            }




        }else {

            this.setState({
                display: ['none', 'none', 'none', 'none', 'none', 'none', 'none']
            })
        }

    }

    /**判定权限，分配菜单和其他页面的显示**/
    componentWillMount() {


        requestCheckPermission()
            .then((permission)=>{


                this.showDisplay(permission)
        })


        // fetch('/api/info', {
        //     method: 'post',
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'authorization': window.localStorage.authorization,
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         if (data['code'] === 0) {
        //             /**判定菜单的显示状况**/
        //             if (window.localStorage.state === '1' && window.localStorage.type >= 1) {
        //                 switch (window.localStorage.type) {//对权限进行判定
        //                     case '1':
        //                         if (window.localStorage.department === '1')//化验室操作员
        //                             switch (window.localStorage.section) {//科室分配
        //                                 case '1':
        //                                     this.setState({
        //                                         display: ['', 'none', '', '', '', 'none', 'none'],
        //                                         // table_type:[false,'','','','',''],
        //                                     });
        //                                     break;
        //                                 case '2':
        //                                     this.setState({
        //                                         display: ['', 'none', '', 'none', 'none', 'none', 'none']
        //                                     });
        //                                     break;
        //                                 case '3':
        //                                     this.setState({
        //                                         display: ['', 'none', 'none', '', 'none', 'none', 'none']
        //                                     });
        //                                     break;
        //                                 case '4':
        //                                     this.setState({
        //                                         display: ['', 'none', 'none', 'none', '', 'none', 'none']
        //                                     });
        //                                     break;
        //                                 default:
        //                             }
        //                         else if (window.localStorage.department === '2')//中控室操作员
        //                             this.setState({
        //                                 display: ['', '', 'none', 'none', 'none', 'none', 'none']
        //                             })
        //                         break;
        //                     case '2':
        //                         this.setState({//总工程师
        //                             display: ['', 'none', 'none', 'none', 'none', '', 'none']
        //                         });
        //                         break;
        //                     case '3':
        //                         if (window.localStorage.department === '1')//化验室主任
        //                             this.setState({
        //                                 display: ['', 'none', '', '', '', '', 'none']
        //                             })
        //                         else if (window.localStorage.department === '2')//中控室主任
        //                             this.setState({
        //                                 display: ['', '', 'none', 'none', 'none', '', 'none']
        //                             })
        //                         break;
        //                     case '4':
        //                         this.setState({
        //                             display: ['', '', '', '', '', '', '']
        //                         });
        //                         break;
        //                     default:
        //                 }
        //             }
        //         }
        //         else{
        //             //this.props.history.push('/')
        //         }
        //
        //     })
        //     .catch(error => {
        //         console.error('Error:', error)
        //     })
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header style={{backgroundColor: 'white'}}>
                        <Iheader choose={this.state.choose_num} onChange={this.onChangeNum.bind(this)}
                                 display={this.state.display}
                        />
                    </Header>
                </Layout>
                <Layout>
                    <Content style={{margin: '1% 1% 0 1%', overflow: 'auto', backgroundColor: 'white'}}>
                        <MainComponent choose={this.state.choose_num}/>
                    </Content>
                </Layout>
            </div>
        )
    }
}