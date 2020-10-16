import { Layout, Menu, Breadcrumb, Icon ,Button} from 'antd';
import React, {Component} from 'react';
import {connect} from "react-redux";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

 class Permission extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             //display: ['none','none','none','none','none','none','none'],
             display: ['', '', '', '', '', '', '','',''],
             choose_num: 0,
             CompanyName: '临城中联福石水泥有限公司',
             collapsed: false,
         };
     }

    onCollapse = collapsed => {

        this.setState({ collapsed });
    };
     onChangeKey = (e) => {
         this.props.onChange(e.key);
     };
    render() {
        return (

                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />

                    <Menu theme="light" defaultSelectedKeys={['0']} mode="inline"
                          style={{lineHeight: '60px', float: 'right'}}
                          onSelect={this.onChangeKey}>
                        <Menu.Item key="0">
                            <Icon type="pie-chart" />
                            <span>用户角色管理</span>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Icon type="desktop" />
                            <span>角色权限管理</span>
                        </Menu.Item>
                        <Menu.Item key="2" style={{textAlign: 'center',}}>
                            <Icon type="logout" />
                            <span ><a href="/" >退  出</a></span>
                        </Menu.Item>
                    </Menu>

                </Sider>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}

const mapDispathToProps = (dispatch) => {
    return {
    }//end return
}

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(Permission);
