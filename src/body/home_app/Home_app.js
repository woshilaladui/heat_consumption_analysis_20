import React from "react";
import {Layout} from 'antd';
import Iheader from '../Iheader/Iheader';
import MainComponent from '../bodys/MainComponent';

const {Header, Content, Footer} = Layout;

export default class Home_app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choose_num: 0,
        }
    }

    onChangeNum(e) {
        this.setState({
            choose_num: e
        });
        console.log(e);
    }

    /**判定权限，分配菜单和其他页面的显示**/
    componentWillMount() {
        fetch('/api/info', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'authorization': window.localStorage.authorization,
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data['code'] === 0) {
                    /**判定菜单的显示状况**/
                    if (window.localStorage.state === '1' && window.localStorage.type >= 1) {
                        switch (window.localStorage.type) {//对权限进行判定
                            case '1':
                                if (window.localStorage.department === '1')//化验室操作员
                                    switch (window.localStorage.section) {//科室分配
                                        case '1':
                                            this.setState({
                                                display: ['', 'none', '', '', '', 'none', 'none'],
                                                // table_type:[false,'','','','',''],
                                            });
                                            break;
                                        case '2':
                                            this.setState({
                                                display: ['', 'none', '', 'none', 'none', 'none', 'none']
                                            });
                                            break;
                                        case '3':
                                            this.setState({
                                                display: ['', 'none', 'none', '', 'none', 'none', 'none']
                                            });
                                            break;
                                        case '4':
                                            this.setState({
                                                display: ['', 'none', 'none', 'none', '', 'none', 'none']
                                            });
                                            break;
                                        default:
                                    }
                                else if (window.localStorage.department === '2')//中控室操作员
                                    this.setState({
                                        display: ['', '', 'none', 'none', 'none', 'none', 'none']
                                    })
                                break;
                            case '2':
                                this.setState({//总工程师
                                    display: ['', 'none', 'none', 'none', 'none', '', 'none']
                                });
                                break;
                            case '3':
                                if (window.localStorage.department === '1')//化验室主任
                                    this.setState({
                                        display: ['', 'none', '', '', '', '', 'none']
                                    })
                                else if (window.localStorage.department === '2')//中控室主任
                                    this.setState({
                                        display: ['', '', 'none', 'none', 'none', '', 'none']
                                    })
                                break;
                            case '4':
                                this.setState({
                                    display: ['', '', '', '', '', '', '']
                                });
                                break;
                            default:
                        }
                    }
                }
                else
                    this.props.history.push('/')
            })
            .catch(error => {
                console.error('Error:', error)
            })
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