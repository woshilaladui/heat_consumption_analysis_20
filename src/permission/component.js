import React, {Component} from "react";
import '../body/bodys/MainComponent.css';
import {Layout} from 'antd';
import UserRole from './userRole/userRole';
import RolePermission from './rolePermission'


const {Header, Content, Footer} = Layout;



export default class AppIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // choose_num: this.props.choose,
            choose_arr: [
                <UserRole/>,
                <RolePermission/>
            ],
        }

    }

    componentWillMount() {

    }
    // render() {
    //     return (
    //
    //         <Layout>
    //             <Content style={{margin: '0 1% 0 1%', overflow: 'auto', backgroundColor: 'white'}}>
    //                 {this.state.choose_arr[this.props.choose]}
    //             </Content>
    //         </Layout>
    //
    //     );
    // }
    render() {
        return (
            <Layout>

                <Content style={{margin: '1%', overflow: 'auto'}}>
                    <div style={{padding: 24, background: '#fff', height: '100%'}}>
                        <div className="choose">
                            {this.state.choose_arr[this.props.choose]}
                        </div>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center', color: 'white', backgroundColor: 'black'}}>
                    SmartLab Design ©2018 Powered By 武汉理工大学智能技术实验室
                </Footer>
            </Layout>
        )
    }
}
