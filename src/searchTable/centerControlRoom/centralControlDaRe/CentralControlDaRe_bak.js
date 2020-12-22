import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";
import moment from "moment";

// 中控室日报表
export default class OnlineAutoDetOpRe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riqi: moment().format("YYYY-MM-DD"),
            timeChose: 0, //选择的班次 0代表1-7 1代表8-15 2代表16-23
            standard: [], //从数据库获取的标准
            formData: [
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
            ], //表格数据
            person: "NS_CDR" //传入的值班人员
        };
    }

    /**onRef控制子组件提交表单**/
    onRef = ref => {
        this.BottomForm = ref;
    };

    /**点击提交数据**/
    handleSubmit = () => {
        this.BottomForm.postAllToHome();
    };

    /**
     * 响应班次变化
     **/
    handleTimeChose(x) {
        this.setState({
            timeChose: x
        });
    }

    returnBack = () => {
        this.props.history.push("/index");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
        fetch('/api/HuaYS/check', {
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
                    this.props.history.push('/index');
                }
            })
            .catch(error => console.error('Error:', error))
    }

    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const riqi = this.state.riqi;
        const jsondata = {
            startdate: riqi,
            starthour: 0,
            enddate: riqi,
            endhour: 23,
            t_name: "RYS",
            t_type: 0
        };
        fetch("/api/HuaYS/query", {
            method: "POST",
            body: JSON.stringify(jsondata), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json",
                'authorization': window.localStorage.authorization,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data['code'] === 0) {//判定是否成功
                    let upperData = this.state.formData;
                    for (let i = 0; i < data['data'].length; i++) {
                        if (data['data'][i]['t_type'] === 1 && data['data'][i]['t_name'] === 'RYS') { //类型为1是上表数据
                            let t_data = data['data'][i]['t_data'];//取出data中的数据
                            let str = t_data.split(',');//去除数据中的string逗号
                            let a = [];//临时的number数据数组
                            for (let i = 0; i < str.length; i++)//将string转换成number
                                a[i] = parseFloat(str[i]);
                            data['data'][i]['t_data'] = a;//数据数组归还给data
                            const hour = data['data'][i]['hour'];//按小时排序把数据传给upperdata
                            upperData[hour] = data['data'][i];
                        }
                    }
                    console.log(upperData)
                    this.setState({//传值给upperData
                        upperData: upperData,
                        person: window.localStorage.name,
                    });
                }
            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

        /**从服务器获取指标**/
        const t_name = {t_name: "RYS"};
        fetch("/api/standard/query", {
            method: "POST",
            body: JSON.stringify(t_name), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json",
                'authorization': window.localStorage.authorization,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data["code"] === 0 && data["standard"]["t_name"] === "RYS") {
                    //判定是否成功
                    let zhi = data["standard"]["standard"]; //去除指标的逗号
                    const standard = zhi.split(",");
                    let a = [];
                    for (let i = 0; i < standard.length; i++)
                        a[i] = parseFloat(standard[i]);
                    this.setState({
                        standard: a
                    });
                }
            })
            .catch(error => console.error("Error:", error))
            .then(response => console.log("Success:", response));
    }

    render() {
        const standard = [];
        standard[12] = this.state.standard[0];
        standard[13] = this.state.standard[1];
        standard[14] = this.state.standard[2];
        return (
            <Fragment style = {{width:"100%",height:"100%"}}>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">中控室日报表</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow
                        person={this.state.person}
                        handleTimeChose={this.handleTimeChose.bind(this)}
                    />
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                        {/*表单上半部分*/}
                        <UpperForm
                            onRef={this.onRef}
                            standard={standard}
                            timeChose={this.state.timeChose}
                            person={this.state.person}
                            upperData={this.state.formData}
                            riqi={this.state.riqi}
                        />
                    </div>
                </div>
                <div
                    style={{
                        float: "right",
                        margin: "0px 50px 20px 0px",
                        display: "inline-block"
                    }}
                >
                    <ButtonConfirmationBox
                        type="primary"
                        buttonText="提交"
                        action={this.handleSubmit}
                    />
                </div>
            </Fragment>
        );
    }
}