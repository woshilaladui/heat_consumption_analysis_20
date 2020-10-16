import React from "react";
import {Layout, message} from 'antd';
import Iheader from '../Iheader/Iheader';
import MainComponent from '../bodys/MainComponent';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';


const {Header, Content} = Layout;

class Home_app extends React.Component {
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
    }


    /**判定权限，分配菜单和其他页面的显示**/
    componentWillMount() {

        //const {requestFlag,getUserPermission} = this.props;

        // if(requestFlag){
        //     getUserPermission();
        // }
        let tokenID = window.localStorage.token;
        if (tokenID === null || tokenID === '' || tokenID === undefined) {
            window.location.href='/';
            message.info('token错误，请重新登录')

        }

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

//定义映射
const mapStateToProps = (state) => {
    return {
        permission:state.getIn(['home_app', 'permission']),
        //requestFlag:state.getIn(['home_app', 'requestFlag']),
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        /*getUserPermission(){
            dispatch(actionCreators.getUserPermission({}))
        }*/
    }//end return
}

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(Home_app);