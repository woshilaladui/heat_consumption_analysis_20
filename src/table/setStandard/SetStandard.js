import React, {Component} from 'react';
import ButtonConfirmationBox from './components/ButtonComfirmBox';
import TimeShow from './components/TimeShow';
import StandardForm from './components/StandardForm';
import 'antd/dist/antd.css';
import './SetStandard.css';
import moment from 'moment';
import {SetStandardFormat} from '../../package/Format'


export default class SetStandard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format('YYYY-MM-DD'),
            t_name_list:
                [
                    'RMA_SHS', 'RMA_SY', "RMA_TF", "RMA_FMHg",
                    'RMA_FMHs', 'CRM', 'RMC', 'KAS',
                    'FAS', 'CRO',
                ],
            startValue: [[], [], [], [], [], [], [], [], [], [],],//从数据库获取的标准
            endValue: [[], [], [], [], [], [], [], [], [], [],],//从数据库获取的标准误差
            person: window.localStorage.name,//传入的登录人员
            username: [],//历史数据填入人员
            time: [],//历史数据填入时间
            tableChose: 0,//选择的表格
            reason: [[], [], [], [], [], [], [], [], [], [],],
        }
    }

    //判定是否已登录，是否有权限
    componentWillMount() {
        fetch('/api/JudgeOnline', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'authorization': window.localStorage.authorization,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data['code'] === 0) {
                }
                else {
                    this.props.history.push('/');
                }
            })
            .catch(error => console.error('Error:', error))
    }

    componentDidMount() {
        const t_name_list = this.state.t_name_list
        const {startValue, endValue, username, time, reason} = this.state
        for (let i = 0; i < t_name_list.length; i++) {
            const t_name = {'t_name': t_name_list[i]};

            console.log(JSON.stringify(t_name));

            fetch("/api/standard/query", {
                method: 'POST',
                body: JSON.stringify(t_name), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.authorization,
                }
            })
                .then(res => res.json())
                .then(data => {
                        if (data['code'] === 0 && data['standard']['t_name'] === t_name['t_name']) { //判定是否成功
                            const arr = SetStandardFormat(data['standard'], startValue, endValue, username, time, reason, i)
                            this.setState({
                                startValue: arr[0],
                                endValue: arr[1],
                                username: arr[2],
                                time: arr[3],
                                reason: arr[4],
                            });
                        }
                    }
                )
                .catch(error => console.error('Error:', error))
        }

    }

    /**表格选择**/
    handleTableChose(x) {
        this.setState({
            tableChose: x//x代表选择的表格
        });
    }

    /**onRef控制子组件提交表单**/
    onRef = (ref) => {
        this.BottomForm = ref;
    };
    /**点击提交数据**/
    handleSubmit = () => {
        this.BottomForm.postToHome();
    };

    /***返回按钮事件 ***/
    returnBack = () => {
        this.props.history.push("/index");
    };

    render() {
        return (
            <div style={{margin: '30px 30px 30px 30px'}}>
                <h1 align="center">设置标准值</h1>
                {/*表单最上的时间及人员显示*/}
                <TimeShow person={this.state.person} handleTableChose={this.handleTableChose.bind(this)}/>
                <div style={{
                    border: '2px solid black',
                    margin: '0px 20px 0px 20px'
                }}>
                    {/*表单数据部分*/}
                    <StandardForm onRef={this.onRef}
                                  authorization={this.state.authorization}
                                  //只传对应表格的起始值，终点值，姓名，时间，原因
                                  startValue={this.state.startValue[this.state.tableChose]}
                                  endValue={this.state.endValue[this.state.tableChose]}
                                  tableChose={this.state.tableChose}
                                  username={this.state.username[this.state.tableChose]}
                                  time={this.state.time[this.state.tableChose]}
                                  reason={this.state.reason[this.state.tableChose]}
                                  date={this.state.date}
                                  t_name_list={this.state.t_name_list}
                    />
                </div>
                <div
                    style={{
                        float: "right",
                        margin: "0px 50px 20px 0px",
                        display: "inline-block"
                    }}
                >
                    <ButtonConfirmationBox type="primary" buttonText="提交" action={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}